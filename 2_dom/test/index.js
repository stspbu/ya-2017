$('#opt-text').click(function () {
    $('#top').css({
        color: this.checked ? "red" : "black"
    });
});

$('#opt-bg').click(function () {
    $('#top').css({
        "background-color": this.checked ? "black" : "white"
    });
});

$('#opt-vis').click(function(){
    $('#inp1').toggle();
});

$('#opt-class').click(function () {
    $('#top').toggleClass("super");
});

var hoverFunc = function(){
    alert("It works!");
};

$('#opt-hover').click(function(){
    if(this.checked)
        $("#title").on('mouseover', hoverFunc);
    else
        $("#title").off('mouseover', hoverFunc);
});

$('#opt-add').click(function(){
    $("#footer").add('<div><input class="hidden-btn" type="button" name="options" value="Hi, hide me!" onclick="$(this).hide();"/></div>');
});

$('#opt-show').click(function(){
    $('.hidden-btn').show();
    alert('All the buttons are shown!');
});

$('#inp1').on("focusout", function(){
    var elem = $(this);
    if(elem.val())
        alert('Hello, ' + $(this).val() + '!');
    else
        alert('Hey! Introduce yourself!');
});