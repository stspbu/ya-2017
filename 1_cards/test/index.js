function test() {
    var cards = [
        {
            id: "CF12IV",
            seat: "3F",
            type: "flight",
            from: "Washington",
            to: "Vienna"
        }, {
            id: "98C",
            seat: "21B",
            type: "train",
            from: "Saint-Petersburg",
            to: "Kiev"
        }, {
            type: "taxi",
            from: "Moscow",
            to: "Saint-Petersburg"
        }, {
            type: "train",
            from: "Vienna",
            to: "Berlin"
        }, {
            id: "N14C9V",
            type: "flight",
            from: "Kiev",
            to: "Helsinki"
        }, {
            type: "cruise",
            from: "Helsinki",
            to: "New-York"
        }, {
            type: "bus",
            from: "New-York",
            to: "New-York Hotel"
        }, {
            type: "flight",
            baggage: "127",
            seat: "11D",
            from: "London",
            to: "Washington"
        }, {
            type: "walk",
            from: "New-York Hotel",
            to: "New-York Airport"
        }, {
            id: "KJ4V51",
            type: "flight",
            gate: "19",
            seat: "6A",
            baggage: "312",
            from: "New-York Airport",
            to: "London"
        }
    ];

    document.write("<h1>Unsorted cards:</h1>");
    printArray(cards);

    var apiResult = TRIP_get(cards);
    if (apiResult["status"] != 0) {
        document.write("<h2>Error: " + apiResult["error"] + " [" + apiResult["status"] + "]" + "</h2>");
        return;
    }

    document.write("<h1>Sorted cards:</h1>");
    cards = apiResult["items"];
    printArray(cards);

    document.write("<h1>Text data:</h1><ul>");
    text = apiResult["text"];
    text.forEach(function (item) {
        document.write("<li>" + item + "</li>");
    });
    document.write("</ul>");
}

function printArray(arr) {
    arr.forEach(function (item) {
        document.write("<div>" + JSON.stringify(item) + "</div>");
    });
}

test();