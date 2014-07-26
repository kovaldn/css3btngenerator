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
            app.var.$border_size.slider({
                range: "min", min: 0,max: 40,step: 1,
                value: app.var.default['border-width']
            });
            //колорпикер
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
            //применим по умолчанию настройки
            app.get_html();
            app.get_css();
            app.var.$btn.css(app.var.default);
            //навешиваем события
            app.events();
        },
        //слушатели событий
        events: function(){
            app.var.$border_radius.on( "slide", app.option_border_radius);
            app.var.$border_size.on( "slide", app.option_border_width);
            app.var.$border_style.on('change', app.option_border_style);
            app.var.$border_color.on('change', app.option_border_color);
            app.var.$btn_text.on('keyup', app.option_set_text)
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
        //получить html
        get_html: function(){
            var val = app.var.cur_data['btn-text'];
            app.var.$btn.text(val);
            $('#code-html').text('<button class="'+ app.var.cur_data['__btn-class'] +'">' + val + '</button>');
            Prism.highlightAll();
        },
        //получить готовый css
        get_css: function(property, x1, x2, x3, x4){
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
    $acc = $('#accordion');
    $acc.on('shown.bs.collapse', function(){
        $acc.find('.panel-heading').removeClass('active');
        $acc.find('.collapse.in').prev('.panel-heading').addClass('active');
    });
});