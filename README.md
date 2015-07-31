## Инициализация

~~~
HOT_KEY.init();
~~~

## Добавление callback на нажатие клавиши

~~~
HOT_KEY.events.add('e', function(){
    console.log('Нажата клавиша E');
});
~~~
или
~~~
$('body').on('hot_key.e', function(){
    console.log('Нажата клавиша E');
});
~~~

## Добавление единственного события на клавишу

~~~
HOT_KEY.events.add('e', function () {
    console.log('Событие до (не сработает)');
});
HOT_KEY.events.addOnce('e', function () {
    console.log('Единственное событие');
});
HOT_KEY.events.add('e', function () {
    console.log('Событие после (не сработает)');
});

~~~

## Инициализация с изменением управляющих клавиш

~~~
var controls = {
    ctrlKey: false,
    altKey: true,
    shiftKey: false
};

HOT_KEY.init(controls);
~~~

