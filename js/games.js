var Games = {
    sort: function(param) {
        var content = param['content'];
        var appedned = param['div'];
        var sortTitle = [
            'Отсортируй в правильном порядке',
            'Сөздерді дұрыс ретімен орналастыр',
        ];

        var text = null;
        switch (res.lang) {
            case 0:
                text = content.ru.split(' ');
                break;
            case 1:
                text = content.kz.split(' ');
                break;
            case 2:
                text = content.en.split(' ');
                break;
        }

        function start() {
            var code = [];

            String.prototype.replaceAll = function(search, replacement) {
                var target = this;
                return target.split(search).join(replacement);
            };

            for (var i = 0; i < text.length; i++) {
                code.push('<div class="g-sort">' + text[i] + '</div>');
            }
            code.sort(function() {
                return 0.5 - Math.random();
            });

            $('#' + appedned).append('<div id="g-sort-container" class="center">' +
                '<div id="g-sort-title">' + sortTitle[res.lang] + '<img id="g-sort-sound" class="button" src="images/text/sound.png">'+'</div>' +
                '<div id="g-sort-box"></div></div>');

            $('#g-sort-box').html(code);
        }
        start();

        $('#g-sort-box').sortable({
            stop: function() {
                var old = text.join('').toUpperCase();

                if (old == $(this).text().replaceAll(' ', '').toUpperCase()) {
                    Anim.class($('.g-sort'), 'bounceIn', 100)
                    mySound.trueSound();

                    setTimeout(function() {
                        Anim.lib($('#g-sort-container'), 'bounceOutLeft');

                        setTimeout(function() {
                            $('#g-sort-container').remove();
                            onFinish = param['onFinish'];
                            onFinish()
                        }, 1000)
                    }, 1000)

                }
            }
        });

        $('#g-sort-container').draggable();

        mySound.stop();
        mySound.play([
            'sounds/pray/ru/'+localStorage.getItem('currentLevel')+'.mp3',
            'sounds/pray/kz/'+localStorage.getItem('currentLevel')+'.mp3',
            'sounds/pray/en/'+localStorage.getItem('currentLevel')+'.mp3',
        ]);

        $('#g-sort-sound').click(function(){
            mySound.stop();
            mySound.play([
            'sounds/pray/ru/'+localStorage.getItem('currentLevel')+'.mp3',
            'sounds/pray/kz/'+localStorage.getItem('currentLevel')+'.mp3',
            'sounds/pray/en/'+localStorage.getItem('currentLevel')+'.mp3',
        ]);           
        });
    },

    list: function(param) {
        var content = param['content'];
        var appedned = param['div'];
        var listTitle = [
            'Отсортируй в правильном порядке',
            'Сөздерді дұрыс ретімен орналастыр',
        ];
        var text = null;
        switch (res.lang) {
            case 0:
                text = content.ru;
                break;
            case 1:
                text = content.kz;
                break;
            case 2:
                text = content.en;
                break;
        }

        var randNums = [];
        var trueVars = [];

        function getRand() {
            var tempRand = text.split(' ');
            for (var i = 1; i < tempRand.length - 1; i++) {
                tempRand[i] = i;
            }

            tempRand.sort(function() {
                return 0.5 - Math.random();
            });

            for (var i = 0; i < tempRand.length / 2; i++) {
                randNums.push(tempRand[i]);
            }
        }

        function start() {
            getRand();
            var code = [];
            text = text.split(' ');
            var optionCode = [];

            function option(num) {
                optionCode.push('<option value="option">' + text[num - 1] + '</option>');
                optionCode.push('<option value="option">' + text[num] + '</option>');
                optionCode.push('<option value="option">' + text[num + 1] + '</option>');
                trueVars.push(text[num]);

                optionCode.sort(function() {
                    return 0.5 - Math.random();
                });

                code.push('<div class="g-select-box">' +
                    '<select id="select" value="asd">' +
                    optionCode[0] +
                    optionCode[1] +
                    optionCode[2] +
                    '</select>' +
                    '</div>');
                optionCode = [];
            }


            trueVars = [];
            for (var i = 0; i < text.length; i++) {
                var check = true;
                for (var j = 0; j < randNums.length; j++) {
                    if (i == randNums[j]) {
                        check = false;
                    }
                }

                if (check) {
                    code.push('<div class="s-text">' + text[i] + '</div>');
                } else {
                    option(i);
                }

            }
            $('#' + appedned).append('<div id="g-select-container" class="center">' +
                '<div id="g-select-title">' + listTitle[res.lang] + '<img id="g-select-sound" class="button" src="images/text/sound.png">'+'</div>' +
                '<div id="g-select-game"></div></div>');
            $('#g-select-game').html(code);
            $('#g-select-game').append('<div id="s-check" class="button">Проверить</div>')
            Anim.lib($('#g-select-container'), 'bounceInRight');
        }
        start();

        $('select').selectric({
            nativeOnMobile: false,
        });

        $('#s-check').click(function() {
            var myVar = [];
            $('.label').each(function() {
                myVar.push($(this).text());
            })

            if (trueVars[0] == myVar[0] && trueVars[1] == myVar[1] && trueVars[2] == myVar[2]) {
                Anim.class($('.label'), 'bounceIn', 100);
                Anim.class($('.s-text'), 'bounceIn', 100);
                mySound.trueSound();

                Anim.lib($('#g-select-container'), 'bounceOutLeft');
                setTimeout(function() {
                    $('#g-select-container').remove();
                    onFinish = param['onFinish'];
                    onFinish()
                }, 1000)
            } else {
                Anim.class($('.label'), 'shake', 100);
                mySound.falseSound();
            }
        });

        $('#g-select-container').draggable();
        mySound.stop();
        mySound.play([
            'sounds/pray/ru/'+localStorage.getItem('currentLevel')+'.mp3',
            'sounds/pray/kz/'+localStorage.getItem('currentLevel')+'.mp3',
            'sounds/pray/en/'+localStorage.getItem('currentLevel')+'.mp3',
        ]);

        $('#g-select-sound').click(function(){
            mySound.stop();
            mySound.play([
            'sounds/pray/ru/'+localStorage.getItem('currentLevel')+'.mp3',
            'sounds/pray/kz/'+localStorage.getItem('currentLevel')+'.mp3',
            'sounds/pray/en/'+localStorage.getItem('currentLevel')+'.mp3',
        ]);           
        });
    },

    button: function(param) {
        var content = param['content'];
        var appedned = param['div'];
        var clickText = ['Колличесто лищних слов:', 'Артық сөз саны:', 'Number of excess words:'];
        var clickTitle = [
            'Путем клика удали лищние слова',
            'Сөздерді басу арқылы артығын алып таста',
        ];
        var textGlobal = null;
        switch (res.lang) {
            case 0:
                textGlobal = content.ru;
                break;
            case 1:
                textGlobal = content.kz;
                break;
            case 2:
                textGlobal = content.en;
                break;
        }

        var randNum = [];

        function start() {
            var code = '';
            var text = textGlobal.slice();
            text = text.split(' ');
            randNum = [];
            setRandNum(text);

            var randText = text.slice();

            randText.sort(function() {
                return 0.5 - Math.random();
            });

            var lengthTemp = Math.round(text.length / 2);
            for (var i = 0; i < lengthTemp; i++) {
                text.splice(randNum[i], 0, randText[i]);
            }

            for (var i = 0; i < text.length; i++) {
                code += '<div class="g-button button shadow">' + text[i] + '</div>';
            }


            $('#' + appedned).append('<div id="g-button-box"></div>');
            $('#g-button-box').html('<div id="g-button-box-text" class="center">'+
                '<div id="g-button-title">'+clickTitle[res.lang]+'<img id="g-button-sound" class="button" src="images/text/sound.png">'+'</div>'+
                '<div id="g-button-container"></div></div>' +
                '<div id="g-button-check" class="button">Проверить</div>' +
                '<div id="g-info"></div>');
            $('#g-button-container').html(code);

            String.prototype.replaceAll = function(search, replacement) {
                var target = this;
                return target.split(search).join(replacement);
            };



            function buttons() {
                var clicCount = 0;
                $('.g-button').click(function() {
                    var elem = $(this);
                    elem.remove();
                    lengthTemp--;

                    setInfoText(lengthTemp);
                });

                $('#g-button-check').click(function() {
                    var newText = '';
                    $('.g-button').each(function() {
                        newText += $(this).text();
                    });

                    if (textGlobal.replaceAll(' ', '') == newText) {
                        mySound.trueSound();
                        Anim.class($('.g-button'), 'bounceIn', 100);

                        setTimeout(function() {
                            Anim.lib($('#g-button-box'), 'bounceOutLeft');
                            setTimeout(function() {
                                $('#g-button-box').remove();
                                onFinish = param['onFinish'];
                                onFinish()
                            }, 1000)
                        }, 1000)

                    } else {
                        mySound.falseSound();
                        $('#g-button-check').unbind();
                        start();
                        Anim.class($('.g-button'), 'shake', 100);
                    }
                });
            }

            buttons();
            setInfoText(lengthTemp);
        }

        start();

        function setRandNum(text) {
            var arr = [];
            for (var i = 0; i < text.length; i++) {
                arr.push(i);
            }

            arr.sort(function() {
                return 0.5 - Math.random();
            });

            console.log(arr);

            randNum = arr;
        }

        function setInfoText(num) {
            $('#g-info').text(clickText[res.lang] + ' ' + num);
        }

        mySound.stop();
        mySound.play([
            'sounds/pray/ru/'+localStorage.getItem('currentLevel')+'.mp3',
            'sounds/pray/kz/'+localStorage.getItem('currentLevel')+'.mp3',
            'sounds/pray/en/'+localStorage.getItem('currentLevel')+'.mp3',
        ]);
        mySound.play([
            'sounds/pray/ru/'+localStorage.getItem('currentLevel')+'.mp3',
            'sounds/pray/kz/'+localStorage.getItem('currentLevel')+'.mp3',
            'sounds/pray/en/'+localStorage.getItem('currentLevel')+'.mp3',
        ]);
        $('#g-button-sound').click(function(){
            mySound.stop();
            mySound.play([
            'sounds/pray/ru/'+localStorage.getItem('currentLevel')+'.mp3',
            'sounds/pray/kz/'+localStorage.getItem('currentLevel')+'.mp3',
            'sounds/pray/en/'+localStorage.getItem('currentLevel')+'.mp3',
        ]);           
        });
    },

    text: function(param) {
        var title = param['title'];
        var content = param['content'];
        var appedned = param['div'];
        var soundSrc = param['soundSrc'];

        $('#g-text-container').remove();
        $('#' + appedned).append('<div id="g-text-container" class="center">' +
            '<img id="g-text-play" class="button" src="images/text/play.png">' +
            '<div id="g-text-box">' +
            '<div id="g-text-title">Title</div></div>' +
            '<div id="g-text-img">'+
            '<img id="g-text-zoom" class="button" src="images/text/zoom.png">' +
            '<img id="g-text-exit" class="button" src="images/text/exit.png">' +
            '</div></div>');

        var contentText = null;
        var titleText = null;
        switch (res.lang) {
            case 0:
                contentText = content.ru.split(' ');
                titleText = title.ru;
                break;
            case 1:
                contentText = content.kz.split(' ');
                titleText = title.kz;
                break;
            case 2:
                contentText = content.en.split(' ');
                titleText = title.en;
                break;
        }

        function textAnim() {
            var code = '';
            for (var i = 0; i < contentText.length; i++) {
                code += '<div class="g-content">' + contentText[i] + '</div>';
            }
            $('#g-text-content').remove();
            $('#g-text-box').append('<div id="g-text-content"></div>');
            $('#g-text-content').html(code);

            var timeCounter = 50;
            $('.g-content').each(function() {
                var elem = $(this);

                timeCounter += 50;
                setTimeout(function() {
                    elem.css('visibility', 'visible');
                }, timeCounter)
            });

            Anim.class($('.g-content'), 'bounceIn', 50);
        }

        Anim.lib($('#g-text-container'), 'fadeInUp');
        $('#g-text-title').html(titleText);

        $('#g-text-play').click(function() {
            $('#g-text-container').animate({
                height: '300px'
            }, 500, function() {
                textAnim();
                mySound.stop();
                mySound.play([
                    'sounds/history/ru/'+localStorage.getItem('currentLevel')+'.mp3',
                    'sounds/history/kz/'+localStorage.getItem('currentLevel')+'.mp3',
                    'sounds/history/en/'+localStorage.getItem('currentLevel')+'.mp3',
                ]);
            });

            $('#g-text-play').attr('src', 'images/text/pause.png');
            $('#g-text-img').css('visibility', 'visible');
            $('#g-text-play').unbind();
            pauseFirst();
        })

        function pauseFirst() {

            $('#g-text-play').click(function() {
                $('#g-text-play').attr('src', 'images/text/play.png');
                mySound.stop();
                $('#g-text-play').unbind();
                pauseSecond();
            })
        };

        function pauseSecond() {

            $('#g-text-play').click(function() {
                mySound.stop();
                mySound.play([
                    'sounds/history/ru/'+localStorage.getItem('currentLevel')+'.mp3',
                    'sounds/history/kz/'+localStorage.getItem('currentLevel')+'.mp3',
                    'sounds/history/en/'+localStorage.getItem('currentLevel')+'.mp3',
                ]);

                $('#g-text-play').attr('src', 'images/text/pause.png');
                $('#g-text-play').unbind();
                pauseFirst();
            })
        };

        $('#g-text-exit').click(function() {
            Anim.lib($('#g-text-container'), 'bounceOutLeft');

            setTimeout(function() {
                $('#g-text-container').remove();
                onFinish = param['onFinish'];
                onFinish()
            }, 1000)
        })

        
        $('#g-text-zoom').click(function(){
            if( $(this).hasClass('g-text-zoom') == false ){
                $(this).addClass( 'g-text-zoom' );
                $('#g-text-container').animate({
                    height: '780px',
                }, 1000);
                $('#g-text-content').animate({
                    height: '700px',
                }, 1000);
                $(this).attr('src', 'images/text/zoom2.png');
            }else{
                $(this).attr('src', 'images/text/zoom.png');
                $(this).removeClass( 'g-text-zoom' );
                $('#g-text-container').animate({
                    height: '380px',
                }, 1000);
                $('#g-text-content').animate({
                    height: '300px',
                }, 1000);
            }
            
        });

        $('#g-text-container').draggable();

        mySound.stop();
        mySound.play([
            'sounds/title/ru/'+localStorage.getItem('currentLevel')+'.mp3',
            'sounds/title/kz/'+localStorage.getItem('currentLevel')+'.mp3',
            'sounds/title/en/'+localStorage.getItem('currentLevel')+'.mp3',
        ]);
    },

}


/*Games.sort({
                content: {
                    ru: '«О сын духа!',
                    kz: 'kz1 kz2 kz3 kz4 kz5',
                    en: 'en1 en2 en3 en4 en5',
                },
                div: 'game',
                onFinish: function(){
                    console.log('Finish');
                }
            }); */

/*Games.list({
    content: {
        ru: 'ru1 ru2 ru3 ru4 ru5',
        kz: 'kz1 kz2 kz3 kz4 kz5',
        en: 'en1 en2 en3 en4 en5',
    },
    div: 'game',
    onFinish: function(){
        console.log('Finish Sort');
    }
});*/

/*Games.button({
    content: {
        ru: 'ru1 ru2 ru3 ru4 ru5 ru6 ru7',
        kz: 'kz1 kz2 kz3 kz4 kz5',
        en: 'en1 en2 en3 en4 en5',
    },
    div: 'game',
    onFinish: function(){
        console.log('Finish Sort');
    }
});*/

/*Games.text({
    title: {
        ru: 'Чиста сердце',
        kz: 'kz1',
        en: 'en1',
    },
    content: {
        ru: 'Абдул-Баха всегда мог сказать, что у человека на сердце, и очень любил людей с чистым и сияющим сердцем. Как-то раз одной женщине выпала честь быть приглашенной на обед к Абдул-Баха. Когда она сидела за столом и слушала его мудрые слова, она посмотрела на стакан воды, стоящий перед ней, и подумала: «Ах, если бы Абдул Баха взял мое сердце, очистил его от всех земных желаний и наполнил бы его Божественной любовью и пониманием так же, как это можно сделать вот с этим стаканом воды!» Эта мысль быстро промелькнула в ее голове, и она ничего не сказала об этом. Но вскоре случилось нечто, отчего она поняла, что Абдул-Баха знает, о чем она думает. Во время беседы Он вдруг остановился, подозвал слугу и сказал ему несколько слов по-персидски. Слуга тихо подошел к ней, взял ее стакан, опустошил его и поставил на место перед ней Через некоторое время Абдул-Баха, продолжая разговор, взял со стола кувшин с водой и непринужденно, не спеша, наполнил стакан этой женщины. Никто не заметил, что произошло, но она знала, что Абдул-Баха ответил на желание ее сердца. Она наполнилась радостью, она знала теперь, что для Абдул-Баха сердца и умы людей подобны открытой книге, и Он читает их с великой любовью и добротой.',
        kz: 'kz1 kz2 kz3 kz4 kz5',
        en: 'en1 en2 en3 en4 en5',
    },
    div: 'game',
    onFinish: function(){
        
    }
});*/