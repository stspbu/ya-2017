/*
 * Входные данные - массив:
 *  [{
 *      type: "value",
 *      from: "value",
 *      to: "value",
 *      ...
 *  }, ...]
 * каждый его элемент обязательно содержит 3 поля: type(тип перемещения), from(откуда едем/летим/идем и т.п.), to(куда)
 * остальные параметры зависят от заданного значения для ключа type:
 *
 * train: id, seat
 * flight: id, gate, seat, baggage
 * airport bus: seat
 * bus: seat
 * walk: -
 */

/*
 * Выходные данные - объект:
 *  {
 *      status: value,
 *      ...
 *  }
 * здесь всегда присутствует поле "status", если "status" != 0, то произошла ошибка, её описание содержится в "error"
 * если ошибок нет, то в "items" будет отсортированный массив карточек (см. входные данные),
 * а в "text" - массив соответствующих им строк на английском языке
 *
 * status = 1: ошибка в формате входных данных
 * status = 2: ошибка, связанная с указанной информацией
 */


/*
 * глаголы к типам перемещения (<Word> train from ... to ...)
 * если указан null, то type встанет на место verb (<Walk> from ... to ...)
 * если типа нет в списке - используется значение поля default
 */
var TRIP_typeWord = {
    "walk": null,
    "default": "take"
};

/*
 * дополнительные поля информации для каждого из видов перемещения, в общем случае добавляются в конце предложения
 * если же id стоит первым в массиве, то значение по этому ключу вставляется сразу после type: Take train <id> from...
 */
var TRIP_typeRequire = {
    "train": ["id", "seat"],
    "flight": ["id", "gate", "seat", "baggage"],
    "airport bus": ["seat"],
    "bus": ["seat"]
};

/*
 * фразы по умолчанию, если дополнительная информация для данного типа не была передана
 */
var TRIP_infoDefault = {
    "seat": "no seat assignment",
    "baggage": "baggage will be automatically transferred from your last leg"
};

/*
 * текст перед дополнительной информацией: <Prefix> X.
 * если соответствующего ключа здесь нет, то текстом будет сам ключ: <Seat> Y.
 */
var TRIP_infoPrefix = {
    "baggage": "Baggage drop at ticket counter"
};

function TRIP_get(cards) {
    if (!TRIP_isArray(cards) || cards.length <= 0) return TRIP_error("invalid input array", 1);

    var from = new Map();
    var to = new Map();

    for (var i = 0; i < cards.length; i++) {
        if(TRIP_isEmpty(cards[i])){
            return TRIP_error("card #" + (i+1) + " is empty or undefined", 1);
        }
        else if(!cards[i].hasOwnProperty("type") || !cards[i].hasOwnProperty("from") || !cards[i].hasOwnProperty("to")){
            return TRIP_error("card #" + (i+1) + " has no required properties", 1);
        }
        else if (cards[i]["from"] == cards[i]["to"]) {
            return TRIP_error("card #" + (i + 1) + " has wrong destination", 2);
        }
        else if (from.has(cards[i]["from"]) || to.has(cards[i]["to"]))
            return TRIP_error("non-deterministic path", 2);

        to.set(cards[i]["to"], cards[i]);
        from.set(cards[i]["from"], cards[i]);

        if (to.has(cards[i]["from"])) {
            from.set(cards[i]["from"], to.get(cards[i]["from"]));
            to.set(cards[i]["from"], cards[i]);
        }

        if (from.has(cards[i]["to"])) {
            to.set(cards[i]["to"], from.get(cards[i]["to"]));
            from.set(cards[i]["to"], cards[i]);
        }
    }

    var current = null;
    var error = cards.some(function (item) {
        if (from.get(item["from"]) == item) {
            if (current != null) return true;
            current = from.get(item["from"]);
        }
    });

    if (current == null || error)
        return TRIP_error("non-deterministic path", 2);

    var resultCards = [], text = [];
    for (var j = 0; j < i; j++) {
        resultCards.push(current);
        text.push(TRIP_translate(current));
        current = to.get(current["to"]);
    }

    return {
        "text": text,
        "items": resultCards,
        "status": 0
    };
}

function TRIP_translate(item) {
    var strBegin = "", type = item["type"], i = 0, str = "", verb, set;

    if (TRIP_typeWord.hasOwnProperty(type)) {
        if (TRIP_typeWord[type] != null)
            strBegin += TRIP_typeWord[type] + " ";
        else verb = true;
    } else strBegin += TRIP_typeWord["default"] + " ";

    var strFrom = "from" + " " + item["from"];
    str += "to" + " " + item["to"] + ".";

    if (TRIP_typeRequire.hasOwnProperty(type)) {
        if (TRIP_typeRequire[type][0] == "id" && item.hasOwnProperty("id")) {
            strBegin += type + " " + item["id"] + " ";
            set = true;
            i = 1;
        }

        for (i; i < TRIP_typeRequire[type].length; i++) {
            var info = TRIP_typeRequire[type][i];

            if (item.hasOwnProperty(info)) {
                str += " ";
                if (TRIP_infoPrefix.hasOwnProperty(info))
                    str += TRIP_infoPrefix[info].capitalize() + " " + item[info];
                else
                    str += info.capitalize() + " " + item[info];
                str += ".";
            } else if (TRIP_infoDefault.hasOwnProperty(info))
                str += " " + TRIP_infoDefault[info].capitalize() + ".";
        }
    }

    if (!set) strBegin += (verb ? "" : "the ") + type + " ";

    if (Math.round(Math.random() + 0.15))    // more "Take ..."
        str = strBegin + strFrom + " " + str;
    else str = strFrom + ", " + strBegin + str;

    return str.capitalize();
}

function TRIP_error(err, code) {
    return {
        "error": err,
        "status": code
    };
}

function TRIP_isArray(obj){
    return obj != null && obj.constructor === Array;
}

function TRIP_isEmpty(obj) {
    if(obj == null) return true;

    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};