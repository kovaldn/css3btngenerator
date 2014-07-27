(function(){

    var app = {
        //переменные
        var: {
            $btn: $('#result_btn'), //кнопка которую будем менять
            cur_data : {}, //текущие параметры
            //настройки по умолчанию
            default: {
                'btn-text' : 'Loft Blog',
                'font-size': '20px',
                'color': '#ffffff',
                'height': 70,
                'background': '#AC9E91',
                'border-radius': 8,
                'border-width': 4,
                'border-color': '#000000',
                'border-style': 'solid',
                '__btn-class': 'css3-button'
            },                        
            //элементы с которыми будем работаь (бегунки и пр.)
            $btn_text: $('#option-btn-text'),
            $border_radius: $('#option-border-radius'),
            $border_radius_adv: $('.option-border-radius-adv'),
            $border_size: $('#option-border-size'),
            $border_color: $('#option-border-color'),
            $border_style: $('#option-border-style')
        },
        init: function(){
            //текущие параметры = по умолчанию
            app.var.cur_data = app.var.default;
            //инициализируем бегунки
            app.var.$border_radius.slider({
                range: "min",min: 0,max: 40,step: 1,
                value: app.var.default['border-radius']
            });
            $('#value-option-border-radius').text(app.var.default['border-radius'] + 'px');
            app.var.$border_size.slider({
                range: "min", min: 0,max: 40,step: 1,
                value: app.var.default['border-width']
            });
            $('#value-option-border-size').text(app.var.default['border-width'] + 'px');
            //доп.бегунки
            $('.option-slide-adv').slider();
            //колорпикеры
            app.colorpicker();
            //применим по умолчанию настройки
            app.get_html();
            app.get_css();
            app.var.$btn.css(app.var.default);
            //навешиваем события
            app.events();
        },
        //слушатели событий
        events: function(){
            app.var.$border_radius.on( 'slide', app.option_border_radius);
            app.var.$border_size.on( 'slide', app.option_border_width);
            app.var.$border_style.on('change', app.option_border_style);
            app.var.$border_color.on('change', app.option_border_color);
            app.var.$btn_text.on('keyup', app.option_set_text);
            app.var.$border_radius_adv.on('slide', app.option_border_radius_adv);
            //кнопка раширененого режима
            $('.change-advanced').on('click', app.advanced_mode);
        },
        //обработка всех колорпикеров
        colorpicker: function(){
            $('.preview-color').each(function(){
                var $preview_color = $(this);
                $preview_color.css('background', app.var.default['border-color']);
                var default_value = $preview_color.data('value');
                $preview_color.ColorPicker({
                    color: (default_value in app.var.default) ? app.var.default[default_value] : '#000000',
                    onChange: function (hsb, hex, rgb) {
                        $preview_color.css('background-color', '#' + hex);
                        $preview_color.next('input:hidden').val('#' + hex).change();
                    }
                });
            });
        },
        //изменнеие border-radius
        option_border_radius: function(e, ui){
            var val = ui.value;
            $('#value-option-border-radius').text(val + 'px');
            var css = {
                'border-radius': val + 'px'
            };
            app.var.cur_data['border-radius'] = val;
            app.var.$btn.css(css);
            app.get_css();
        },
        //изменение border-radius раширенный режим
        option_border_radius_adv: function(e, ui){
            var $options = app.var.$border_radius_adv;
            if(e === 'on'){ //e == 'on' - вызов при показе раширенного режима, чтобы утановить настройки и текущее значение
                $options.each(function(){
                    $(this).slider({
                        min: 0, max: 40, step: 1,
                        value: app.var.cur_data['border-radius']
                    });
                    var data_name = $(this).data('name');
                    $('.value[data-name='+ data_name +']').text(app.var.cur_data['border-radius'] + 'px');
                });
                return false;
            }else if( e === 'off'){ //e == 'off' - вызов при скрытии раширенного режима, чтобы утановить значение как было
                app.var.cur_data['border-radius'] = parseInt($('#value-option-border-radius').text());
                return false;
            }
            //получим данные со всех бегунков
            var data = {
                topleft: $options.filter('[data-name=topleft]').slider('value'),
                topright: $options.filter('[data-name=topright]').slider('value'),
                botright: $options.filter('[data-name=botright]').slider('value'),
                botleft: $options.filter('[data-name=botleft]').slider('value')
            };
            //обновим текущее т.к. не совпадает
            var cur_data_name = $(e.target).data('name');
            data[cur_data_name] = ui.value;
            app.var.cur_data['border-radius'] = data;
            //простроим css и обновим текстовое значене бегунков из объекта data
            var css = {'border-radius' : ''};
            for(name in data){
                css['border-radius'] += ' ' + data[name] + 'px';
                $('.value[data-name='+ name +']').text(data[name] + 'px');
            }
            app.var.$btn.css(css);
            app.var.$btn.css(css);
            app.get_css();
        },
        //изменнеие border-width
        option_border_width: function(e, ui){
            var val = ui.value;
            $('#value-option-border-size').text(val + 'px');
            var css = {
                'border-width': val + 'px'
            };
            app.var.cur_data['border-width'] = val;
            app.var.$btn.css(css);
            app.get_css();
        },
        //изменение border-style
        option_border_style: function(){
            var val = $(this).val();
            var css = {
                'border-style': val
            };
            app.var.cur_data['border-style'] = val;
            app.var.$btn.css(css);
            app.get_css();
        },
        //измменение border-color
        option_border_color: function(){
            var val = $(this).val();
            var css = {
                'border-color': val
            };
            app.var.cur_data['border-color'] = val;
            app.var.$btn.css(css);
            app.get_css();
        },
        //изменение текста кнопки
        option_set_text: function(){
            app.var.cur_data['btn-text'] = $(this).val();
            app.get_html();
        },
        //раширенный режим
        advanced_mode: function(){
            //отображаем блок расширенной настрока, скраываем обычный
            var data_show = $(this).data('show');
            var data_hide = $(this).data('hide');
            var $parent = $('[data-obj='+ data_hide +']');
            $parent.slideUp();
            $('[data-obj='+ data_show +']').slideDown();
            //вызываем функцию настройки доп.бегунков из data-fun
            var data_fun = $(this).data('fun');
            if(data_fun in app){
                var param = '';
                if($(this).hasClass('show-on')){
                    param = 'on';
                    $(this).parent().find('.show-off').show();
                    $(this).hide();
                }else{
                    param = 'off';
                    $(this).parent().find('.show-on').show();
                    $(this).hide();
                }
                app[data_fun](param);
            }
        },
        //получить html
        get_html: function(){
            var val = app.var.cur_data['btn-text'];
            app.var.$btn.text(val);
            $('#code-html').text('<button class="'+ app.var.cur_data['__btn-class'] +'">' + val + '</button>');
            Prism.highlightAll();
        },
        //получить готовый css
        get_css: function(){
            var data = this.var.cur_data;
            var str = '';
            if( data['border-width'] > 0 ){
                str += 'border: ' + data['border-style'] + ' ' + data['border-width'] + 'px ' + data['border-color'] + ";\n";
            }
            if(!$.isPlainObject(data['border-radius']) && data['border-radius'] > 0){
                str += 'border-radius: ' + data['border-radius'] + "px;\n";
            }else if ($.isPlainObject(data['border-radius'])){
                str += 'border-radius: ' + data['border-radius'].topleft + "px ";
                str += data['border-radius'].topright + "px ";
                str += data['border-radius'].botleft + "px ";
                str += data['border-radius'].botright + "px;\n";
            }
            //console.log(this.var.cur_data);
            //console.log(str);
            $('#code-css').text(str);
            Prism.highlightAll();
        }
    }

   app.init();
}());

$(document).ready(function(){
    $('.change-advanced').tooltip({
        template: '<div class="tooltip ch-advanced" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
    })
    $acc = $('#accordion');
    $acc.on('shown.bs.collapse', function(){
        $acc.find('.panel-heading').removeClass('active');
        $acc.find('.collapse.in').prev('.panel-heading').addClass('active');
    });
});