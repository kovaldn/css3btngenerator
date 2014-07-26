(function(){

    var app = {
        /*---переменные---*/
        var: {
            $btn: $('#result_btn'), //кнопка которую будем менять
            cur_data : {}, //текущие параметры
            //настройки по умолчанию
            default: {
                'btn_text' : 'Loft Blog',
                'font-size': '20px',
                'color': '#ffffff',
                'height': 70,
                'width': 150,
                'background': '#AC9E91',
                'border-radius': 15,
                'border-width': 15,
                'border-color': '#000000',
                'border-style': 'dotted'
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
            this.var.cur_data = this.var.default;
            //инициализируем бегунки
            this.var.$border_radius.slider({
                range: "max",min: 0,max: 40,step: 1,
                value: this.var.default['border-radius']
            });
            this.var.$border_size.slider({
                range: "max", min: 0,max: 40,step: 1,
                value: this.var.default['border-width']
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

            //навешиваем события
            this.events();
            //применим настройки по умолчанию
            this.set_default();
        },
        //слушатели событий
        events: function(){
            this.var.$border_radius.on( "slide", this.option_border_radius);
            this.var.$border_size.on( "slide", this.option_border_width);
            this.var.$border_style.on('change', this.option_border_style);
            this.var.$border_color.on('change', this.option_border_color);
            this.var.$btn_text.on('keyup', this.option_set_text)
        },
        //установка по умолчанию
        set_default: function(){
            var options = this.var.default;
            this.var.$btn.html(options.btn_text).css(options);
            //val(options['border-color'])
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
            //app.get_css();
        },
        //изменение border-style
        option_border_style: function(){
            var val = $(this).val();
            var css = {
                'border-style': val
            };
            app.var.cur_data['border-style'] = val;
            app.var.$btn.css(css);
            //app.get_css();
        },
        //измменение border-color
        option_border_color: function(){
            var val = $(this).val();
            var css = {
                'border-color': val
            };
            app.var.cur_data['border-color'] = val;
            app.var.$btn.css(css);
            //app.get_css();
        },
        //изменение текста кнопки
        option_set_text: function(){
            var val = $(this).val();
            app.var.$btn.text(val);
            //app.get_heml();
        },
        //получить готовый css
        get_css: function(property, x1, x2, x3, x4){

            //var str = '';
            /*$.each(this.var.cur_data, function(i, el){
                $.each(el, function(property, value){
                    str += property + ': ' + value + ";\n"
                });
            });*/
            console.log(this.var.cur_data);
        }
    }

   app.init();
}());