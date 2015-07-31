/**
 * Библиотека для работы с горячими клавишами
 *
 * Author: Koksharov Sergey <info@sharoff.org>
 *
 * Использование:
 *
 * Добавляем событие при загрузке страницы:
 * HOT_KEY.init();
 *
 * Добавляем событие на нажатие клавишы CONTROL_KEY + N
 * HOT_KEY.events.add('N', function () {
 *      console.log('Кликнули на CTRL + N');
 * });
 *
 * Можно навесить событие на body
 *
 * $('body')
 *      .on('hot_key.n', function(){
 *          console.log('Кликнули на CTRL + N');
 *      });
 *
 * @type {{control_key: string, association: {from: string, to: string}, init: Function, replaceAssociation: Function, events: {listeners: {}, fire: Function, add: Function, addOnce: Function}, getKey: Function, checkControlPress: Function}}
 */

var HOT_KEY = {

    // Доступные кнопки ctrl, alt, shift
    controls: {
        ctrlKey: false,
        altKey: true,
        shiftKey: true
    },
    association: {
        from: 'йцукенгшщзфывапролдячсмить',
        to: 'qwertyuiopasdfghjklzxcvbnm'
    },

    init: function (controls, association) {
        var _self = this,
            body = $('body');

        _self.replaceAssociation();

        if ('object' == typeof(controls) && controls.length > 0) {
            _self.controls = $.extend({}, _self.controls, controls);
        }

        if ('object' == typeof(association) && association.length > 0 && 'string' == typeof(association.from) && 'string' == typeof(association.to)) {
            _self.association = association;
        }

        body
            .on('keypress', function (e) {
                if (_self.checkControlPress(e)) {
                    var key = _self.getKey(e);
                    _self.events.fire(key);
                }
            });
    },

    replaceAssociation: function () {
        var _self = this;
        _self.association.from = $.merge($.merge([], _self.association.from.toUpperCase().split('')), _self.association.from.toLocaleLowerCase().split(''));
        _self.association.to = $.merge($.merge([], _self.association.to.toLocaleLowerCase().split('')), _self.association.to.toLocaleLowerCase().split(''));
    },

    events: {

        listeners: {},

        fire: function (key) {
            var _self = this,
                key = key.toLowerCase(),
                callbacks = _self.listeners[key],
                body = $('body');

            if ('undefined' != typeof(callbacks)) {
                if ('object' == typeof(callbacks)) {
                    for (i in callbacks) {
                        callbacks[i].call();
                    }
                } else {
                    callbacks.call();
                }
            }

            body.trigger('hot_key.' + key);
        },

        add: function (key, callback) {
            var _self = this,
                key = key.toLowerCase();

            if ('undefined' == typeof(_self.listeners[key]) || 'object' == typeof(_self.listeners[key])) {
                if ('undefined' == typeof(_self.listeners[key])) {
                    _self.listeners[key] = [];
                }
                _self.listeners[key][parseInt(_self.listeners[key].length)] = callback;
            }
        },

        addOnce: function (key, callback) {
            var _self = this;
            _self.listeners[key] = callback;
        }
    },

    getKey: function (event) {
        var _self = this,
            key = event.key,
            index = _self.association.from.indexOf(key);

        if (index >= 0) {
            key = _self.association.to[index];
        }
        return key;
    },

    checkControlPress: function (event) {
        var _self = this;
        if (_self.controls.shiftKey == event.shiftKey && _self.controls.ctrlKey == event.ctrlKey && _self.controls.altKey == event.altKey) {
            return true;
        }
        return false;
    }

};