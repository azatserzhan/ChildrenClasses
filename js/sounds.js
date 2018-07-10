var soundBG;
var sound;
var soundArr = [];

var mySound = {
    //Вызов звуков
    play: function(src) {

        if (localStorage.getItem('soundSfx') == 'true') {            
            try {
                var language = localStorage.getItem('language');
                if (language == 'kz') {
                    src = src[1];
                } else {
                    src = src[0];
                }    

                sound = new Audio(src);
                console.log('play src: ', src)
                sound.play();  
                soundArr.push(sound);                
            } catch (e) {
                console.log('sounds.js файл не найден');
            }
        }
    },

    playBackgroundSound: function() {
        try {
            soundBG.pause();
        } catch (e) {}
        soundBG = new Audio(mySound.bgSrc);
        soundBG.volume = 0.01; //0.05
        soundBG.loop = true;

        if (localStorage.getItem('soundBg') == 'true') {
            soundBG.play();
        }
    },

    bgSrc: '',

    menuBtnHref: '',

    stop: function() {
        for(var i=0; i<soundArr.length; i++){
            soundArr[i].pause();
        }    
    },

    stopBG: function() {
        soundBG.pause();
    },

    playBgSound: function() {
        soundBG.play();
    },

    info: [],

    //Кнопки меню в играх
    initMenuGame: function() {
        mySound.loadJsCssFile('../../libs/css/sounds.css', 'css');
        mySound.setCodeDiv();
        mySound.buttonState();
        mySound.buttonEvent();
        mySound.buttonAnimate();
        mySound.playBackgroundSound();
        $('#lang-btn').hide();
        $('#stats-btn').hide();
        mySound.buttonSounds();

        setTimeout(function(){
            if(gameAction.showStartText){
                Results.getAutoStart(mySound.info);       
            }

            if(gameAction.lifeSystem == false){
                $('#life-container').hide();  
            }

            if(gameAction.timerSystem == false){
                $('#timer-container').hide();                  
            }

            if(gameAction.helpSystem != true){
                $('#help-btn').hide();                  
            }
            
        },100);     
        
        
    },

    hovered: function(param){
        if(gameAction.hover!=null){
            $( "#game" ).append( '<div id="hovered">'+
                                    '<div id="hover-title"></div>'+
                                 '</div>' );          
        }
        if( gameAction.hoverContent!=null ){
            $( "#hovered" ).append( '<div id="hover-content"></div>' );  
        }
        
        $('.hovered').hover(function(){
            var top = $(this).css('top');
            var left = $(this).css('left');

            $('#hover-title').html( gameAction.hover[ $(this).attr('key') ][res.lang] );
            try{
                $('#hover-content').html( gameAction.hoverContent[ $(this).attr('key') ][res.lang] ); }catch(e){}
            $('#hovered').attr('style', ' display: inline; top: '+top+'; left: '+left);

            hover = param['hover'];
            hover();
        })

        $('.hovered').mouseleave(function(){
            $('#hovered').attr('style', 'display: none;');
        });
    },

    buttonSounds: function() {
        setTimeout(function() {
            $('.button').click(function() {
                mySound.play(['../sounds/click.mp3', '../sounds/click.mp3']);
            })
        }, 1000);
    },

    setCodeDiv: function() {
        var elem = document.getElementById('menu-container');
        var elemClass = '';
        if (localStorage.getItem('language') == 'kz') {
            elemClass = 'language-kz';
        } else {
            elemClass = 'language-ru';
        }
        var code = /*'<div id="sound-sfx-btn" class="button"></div>' +*/
            '<div id="menu-btn" class="button"></div>' +
            /*'<div id="info-btn" class="button"></div>' +
            '<div id="help-btn" class="button"></div>' +
            '<div id="life-container"></div>' +
            '<div id="timer-container"></div>' +
            '<div id="feed-btn" class="button"></div>' +
            '<div id="stats-btn" class="button"></div>' +*/
            '<div id="lang-btn" class="' + elemClass + ' button"></div></div>';
        elem.innerHTML = code;

        var avatar = 0;
        if( localStorage.getItem('avatar')!=null ){
            avatar = localStorage.getItem('avatar');
        }
        $('#life-container').html('<div class="my-life"></div>' + 
            '<div class="my-life"></div>' + 
            '<div class="my-life"></div>' + 
            '<img id="my-life-avatar-bg" src="../../libs/images/menu/avatar/man-2/bg.png">' +
            '<img id="my-life-avatar" src="../../libs/images/menu/avatar/man-2/'+avatar+'.png">');

        $('#timer-container').html('<div id="timer-text"></div>'+
            '<div id="timer-line-1"></div>'+
            '<div id="timer-line-2"></div>');
    },



    buttonEvent: function() {
        var temp = true;
        var infoSate = false;

        $('#sound-sfx-btn').click(function() {
            var temp = localStorage.getItem('soundSfx');
            if (temp == "true") {
                localStorage.setItem('soundBg', "false");
                localStorage.setItem('soundSfx', "false");
                //$('#sound-sfx-btn').attr('style', 'background-position: -161px 0px;');
                $(this).removeClass('sound-on');
                $(this).addClass('sound-off');
                mySound.stopBG();
            } else {
                localStorage.setItem('soundBg', "true");
                localStorage.setItem('soundSfx', "true");
                //$('#sound-sfx-btn').attr('style', 'background-position: -98px 0px;');
                $(this).removeClass('sound-off');
                $(this).addClass('sound-on');
                mySound.playBgSound();
            }
            mySound.animateUnivesal(this, 'bounceIn');
            mySound.play(['../sounds/menu/button.mp3', '../sounds/menu/button.mp3']);
        });

        $('#menu-btn').click(function() {
            mySound.animateUnivesal($('#menu-btn'), 'bounceIn');
            mySound.animateUnivesal($('#background'), 'fadeOut');
            setTimeout(function() {
                location.href = mySound.menuBtnHref;
                window.parent.location.replace( mySound.menuBtnHref );
            }, 900);
            mySound.play(['../sounds/menu/button.mp3', '../sounds/menu/button.mp3']);
        });

        $('#info-btn').click(function() {
            if (localStorage.getItem('language') == 'ru') {
                Results.getInfo(mySound.info[0][0], mySound.info[1][0], mySound.info[2][0], mySound.info[3][0]);

            } else {
                Results.getInfo(mySound.info[0][1], mySound.info[1][1], mySound.info[2][1], mySound.info[3][1]);
            }

            $('#pop-up-window').attr('style', 'visibility: visible');
            $('#info-box').attr('style', 'visibility: visible');
            $('#pop-up-window').show();
            $('#info-box').show();

            Anim.lib($('#info-box'), 'fadeInRight')
            infoSate = true;
        });

        $('#help-btn').click(function() {
            infoSate = true;
            $('#pop-up-window').attr('style', 'visibility: visible');
            $('#help-box').attr('style', 'visibility: visible');

            Results.getHelp();
        });


        $('#pop-up-window').click(function() {
            if (infoSate) {
                setTimeout(function() {
                    $('#pop-up-window').hide();
                    $('#info-box').hide();
                    $('#help-box').hide();
                    infoSate = false;
                }, 1000)

                Anim.lib($('#info-box'), 'fadeOutRight')
                Anim.lib($('#help-box'), 'fadeIut')
            }
        })

        $('#feed-btn').click(function() {
            location.href = 'http://der.nis.edu.kz/feedback2/index.html?id=' + res.feed_back_id;
        });
    },


    buttonState: function() {
        mySound.bgSrc = '../sounds/background/custom.mp3';
        mySound.menuBtnHref = '../menu.html';

        /*if (localStorage.getItem('soundBg') != 'true') {
            //$('#sound-bg-btn').attr('style', 'background: url(../images/menu/sound_bg_off.png) no-repeat center;');

            $('#sound-sfx-btn').addClass('sound-off');
        }else{
            $('#sound-sfx-btn').addClass('sound-on');
        }*/

        if (localStorage.getItem('soundSfx') != 'true') {
            //$('#sound-sfx-btn').attr('style', 'background-position: -254px 0px;');
            $('#sound-sfx-btn').addClass('sound-off');
            $('#sound-sfx-btn').removeClass('sound-on');
        }else{
            $('#sound-sfx-btn').addClass('sound-on');
            $('#sound-sfx-btn').removeClass('sound-off');
        }
    },



    //Кнопка меню вне играх
    initMenu: function() {
        mySound.loadJsCssFile('../libs/css/sounds.css', 'css');
        mySound.setCodeDiv();
        mySound.buttonState2();
        mySound.buttonEvent2();
        mySound.buttonAnimate();
        mySound.playBackgroundSound();
        $('#info-btn').hide();
        $('#help-btn').hide();
    },

    buttonEvent2: function() {
        $('#sound-sfx-btn').click(function() {
            var temp = localStorage.getItem('soundSfx');
            if (temp == "true") {
                localStorage.setItem('soundSfx', "false");
                localStorage.setItem('soundBg', "false");
                $(this).removeClass('sound-on');
                $(this).addClass('sound-off');
                //$('#sound-sfx-btn').attr('style', 'background-position: -254px 0px;');
                mySound.stopBG();
            } else {
                localStorage.setItem('soundSfx', "true");
                localStorage.setItem('soundBg', "false");
                //$('#sound-sfx-btn').attr('style', 'background-position: -158px 0px;');
                $(this).removeClass('sound-off');
                $(this).addClass('sound-on');
                mySound.playBgSound();

            }
            mySound.animateUnivesal(this, 'bounceIn');
            mySound.play(['sounds/menu/button.mp3', 'sounds/menu/button.mp3']);
        });

        $('#menu-btn').click(function() {
            mySound.animateUnivesal($('#menu-btn'), 'bounceIn');
            mySound.animateUnivesal($('#background'), 'fadeOut');
            setTimeout(function() {
                location.href = mySound.menuBtnHref;
            }, 900);
            mySound.play(['sounds/menu/button.mp3', 'sounds/menu/button.mp3']);
        });

        $('#feed-btn').click(function() {
            location.href = 'http://der.nis.edu.kz/feedback2/index.html?id=' + res.feed_back_id;
        });

        $('#stats-btn').click(function() {
            window.parent.location.replace( '../../Statistics/index.html' );
        });

        $('#lang-btn').click(function() {
            if (localStorage.getItem('language') == 'kz') {
                $('#lang-btn').removeClass().addClass('language-ru');
                localStorage.setItem('language', 'ru');
                resetText(0);
            } else {
                $('#lang-btn').removeClass().addClass('language-kz');
                localStorage.setItem('language', 'kz');
                resetText(1);
            }

            /*Menu*/
            //gameAction.setLanguage();

            if(gameAction.showHoverText!=null){
                gameAction.showHoverText();
            }
        });
    },


    buttonState2: function() {
        mySound.bgSrc = 'sounds/background/custom.mp3';
        mySound.menuBtnHref = 'menu.html';

        if (localStorage.getItem('soundSfx') != 'true') {
            $('#sound-sfx-btn').addClass('sound-off');
        }else{
            $('#sound-sfx-btn').addClass('sound-on');
        }
    },


    buttonAnimate: function() {
        mySound.animateUnivesal($('#sound-bg-btn'), 'bounceIn');
        mySound.animateUnivesal($('#sound-sfx-btn'), 'bounceIn');
        mySound.animateUnivesal($('#menu-btn'), 'bounceIn');
        mySound.animateUnivesal($('#feed-btn'), 'bounceIn');
        mySound.animateUnivesal($('#lang-btn'), 'bounceIn');
        try {
            mySound.animateUnivesal($('#info-btn'), 'bounceIn');
        } catch (e) {}

    },


    //звуки
    trueSound: function() {
        mySound.play(['../sounds/true.mp3', '../sounds/true.mp3']);
    },

    falseSound: function() {
        mySound.play(['../sounds/false.mp3', '../sounds/false.mp3']);
        this.lifeShow( gameAction.life )
    },

    lifeShow: function(life){
        if(gameAction.lifeSystem){
            for(var i=0; i<=life; i++){
                $('.my-life:eq('+life+')').attr('style', 'background: url(../images/menu/life/0.png)no-repeat center center');    
            }    
        }                
    },

    //Вызов таймера
    oldTime: 0,
    end: false,
    getTimer: function(){
        this.oldTime = gameAction.timer;
        $('#timer-line-2').animate({ width: '0px'}, (this.oldTime+2)*1000);

        setTextTimer();
        function setTextTimer(){
            setTimeout(function(){
                if( gameAction.timer >= 0 && mySound.end!=true &&
                    $('#autoStart-box').is(":visible")==false){
                    var num = (gameAction.timer * 1121)/mySound.oldTime;

                    $('#timer-text').text( gameAction.timer );
                    gameAction.timer--;    

                    return setTextTimer();
                }else{
                    if( $('#result-container').is(":visible")==false && 
                        $('#autoStart-box').is(":visible")==false ){
                        gameAction.life=0;
                        gameAction.end();    
                    }                    
                }
            },1000);

            if(gameAction.timer<6){
                $('#timer-text').removeClass('timer-standart')
                $('#timer-text').addClass('timer-gloomy')
                $('#timer-line-2').attr('style','background-color:#fd460d')
            }else{
                $('#timer-text').addClass('timer-standart')
                $('#timer-text').removeClass('timer-gloomy')
            }


        }

    },


    //Дополнительные функции
    animateUnivesal: function(img, animType) {
        $(img).addClass("animated");
        $(img).addClass(animType);
        setTimeout(function() {
            $(img).removeClass("animated");
            $(img).removeClass(animType);
        }, 1000);
    },

    loadJsCssFile: function(filename, filetype) {
        if (filetype == "js") { //if filename is a external JavaScript file
            var fileref = document.createElement('script')
            fileref.setAttribute("type", "text/javascript")
            fileref.setAttribute("src", filename)
        } else if (filetype == "css") { //if filename is an external CSS file
            var fileref = document.createElement("link")
            fileref.setAttribute("rel", "stylesheet")
            fileref.setAttribute("type", "text/css")
            fileref.setAttribute("href", filename)
        }
        if (typeof fileref != "undefined") document.getElementsByTagName("head")[0].appendChild(fileref)
    },
}