# ya-2017

1) 1_cards/trip-api.js, входные и выходные данные описаны внутри файла.
TRIP_get(array) - получение отсортированных карточек и готового текста
TRIP_translate(object) - создание описания на английском языке для конкретного объекта

2) 2_dom/dom-fw.js, работает аналогично всеми известному jquery.
Реализованы следующие функции:
$('...') - выборка dom-элементов с поддержкой css синтаксиса
$('...').size - возвращание количества найденных по селектору элементов
addClass, removeClass, toggleClass, hasClass - одноименные функции для работы с классами
on, off - добавление/удаление обработчиков событий
attr, remAttr, hasAttr - функции, работающие с атрибутами
val - устанавливает/получает значение поля value
html - изменяет/получает html-код
add - добавляет строку в конец html-кода
css - задает стили для элементов [example: $("#title).css({ color: "red" });]
show, hide, toggle - изменение свойства display
click - псевдоним для $('...').on("click", func, false);

Некоторые "служебные" вещи:
$.each(arr, func) - выполнение func для всех элементов arr
$.get(var_or_func) - получение значения после выполнения переданной функции или возвращение значения переменной

P.S. Все функции (кроме $), которые требуют строку на вход, принимают также функции:
$('...').val(function(){
  return "test me";
});