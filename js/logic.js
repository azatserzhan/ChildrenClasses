jQuery(document).ready(function() {
    var anim = setInterval(function() {
        if (gameAction.loaded == 1) {
            $('body').addClass('loaded');
            $('h1').css('color', '#222222');
            //$('#loader-wrapper').remove();
            clearInterval(anim);
        }
    }, 500);
});

window.onload = function() {
    gameAction.loaded = 1;
    gameAction.start();
};


var gameAction = {
    loaded: 0,

    start: function() {
        this.startAnim();
        gameAction.startGame();
    },

    startGame: function() {
        var gameArr = [
            gameOne, gameTwo, gameTh, gameFour, gameFive, gameSix, gameSeven,
            gameEight, gameNine, gameTen,
            game11, game12, game13, game14, game15, game16, game17, game18,
            game19, game20,
        ];


        localStorage.setItem('currentLevel', 1);
        var id = 1;
        res.lang = 0;
        try { id = localStorage.getItem('currentLevel'); } catch (e) {}
        var obj = new gameArr[id * 1 - 1];
        obj.play({ id: id * 1 });

        this.menuInit(gameArr);
        this.langButton(gameArr);
    },

    startAnim: function() {
        Anim.lib($('#background'), 'fadeIn');
        $('#background').attr('style', 'visibility: visible');
        setResizeble();

        $('#menu-container').animate({
            margin: '0 0 0 200px'
        }, 1000, function() {
            $(this).animate({ margin: '0 0 0 0px' }, 1000);
        });
    },

    menuInit: function(gameArr) {
        var count = 0;
        var nameArr = [
            'game_1_title', 'game_2_title', 'game_3_title', 'game_4_title', 'game_5_title',
            /*'game_6_title',*/
                        'game_7_title',
            'game_8_title', 'game_9_title', 'game_10_title', 'game_11_title',
            /*'game_12_title',
                        'game_13_title','game_14_title',*/
            'game_15_title', /*'game_16_title','game_17_title','game_18_title',*/
            'game_19_title', /*'game_20_title',*/
        ];
        $('.level-name').each(function() {
            var elem = $(this);
            switch (res.lang) {
                case 0:
                    elem.html(res[nameArr[count]].ru);
                    break;
                case 1:
                    elem.html(res[nameArr[count]].kz);
                    break;
                case 2:
                    elem.html(res[nameArr[count]].en);
                    break;
            }
            count++;
        });

        $('.level-container').click(function() {
            mySound.stop();
            $('#g-sort-container, #g-select-container, #g-button-box').remove();
            var obj = new gameArr[$(this).attr('key') * 1 - 1];
            obj.play({ id: $(this).attr('key') * 1 });
            localStorage.setItem('currentLevel', $(this).attr('key'));
        });
    },

    langButton: function(gameArr) {
        
        $('#change-lang').attr('src', 'images/text/lang/' + res.lang + '.png');
        $('#change-lang').attr('key', res.lang);
        $('#change-lang').click(function() {
            mySound.stop();
            var elem = $(this);
            switch (elem.attr('key')) {
                case '0':
                    elem.attr('src', 'images/text/lang/1.png');
                    elem.attr('key', '1');
                    res.lang = 1;
                    break;
                case '1':
                    elem.attr('src', 'images/text/lang/2.png');
                    elem.attr('key', '2');
                    res.lang = 2;
                    break;
                case '2':
                    elem.attr('src', 'images/text/lang/0.png');
                    elem.attr('key', '0');
                    res.lang = 0;
                    break;
            }

            mySound.stop();
            $('#g-sort-container, #g-select-container, #g-button-box').remove();
            var id = 1;
            try { id = localStorage.getItem('currentLevel'); } catch (e) {}
            var obj = new gameArr[id * 1 - 1];
            obj.play({ id: id * 1 });

            gameAction.menuInit(gameArr);
        });
    },


    end: function() {
        Level.setLevel(gameAction.numberLevel, gameAction.life);
        Results.getRuslts(gameAction.life, gameAction.numberLevel);
        $('#timer-line-2').clearQueue();
        $('#timer-line-2').stop();
        $('#timer-line-2').css('width', (gameAction.timer * 1121) / mySound.oldTime + 'px');
        mySound.end = true;
    },
};


var gameOne = function() {
    return {
        play: function(param) {
            $('#g-img').attr('src', 'images/game/img/' + param.id + '.jpg');
            localStorage.setItem('currentLevel', param.id);
            Games.text({
                title: {
                    ru: res.game_1_title.ru,
                    kz: res.game_1_title.kz,
                    en: res.game_1_title.en,
                },
                content: {
                    ru: res.game_1_content.ru,
                    kz: res.game_1_content.kz,
                    en: res.game_1_content.en,
                },
                div: 'game',
                onFinish: function() {
                    Games.list({
                        content: {
                            ru: res.game_1_g_content.ru,
                            kz: res.game_1_g_content.kz,
                            en: res.game_1_g_content.en,
                        },
                        div: 'game',
                        onFinish: function() {
                            var obj = new gameTwo();
                            obj.play({ id: 2 });
                        }
                    });

                }
            });

        }
    };
};
var gameTwo = function() {
    return {
        play: function(param) {
            $('#g-img').attr('src', 'images/game/img/' + param.id + '.jpg');
            localStorage.setItem('currentLevel', param.id);

            Games.text({
                title: {
                    ru: res.game_2_title.ru,
                    kz: res.game_2_title.kz,
                    en: res.game_2_title.en,
                },
                content: {
                    ru: res.game_2_content.ru,
                    kz: res.game_2_content.kz,
                    en: res.game_2_content.en,
                },
                div: 'game',
                onFinish: function() {
                    Games.button({
                        content: {
                            ru: res.game_2_g_content.ru,
                            kz: res.game_2_g_content.kz,
                            en: res.game_2_g_content.en,
                        },
                        div: 'game',
                        onFinish: function() {
                            var obj = new gameTh();
                            obj.play({ id: 3 });
                        }
                    });

                }
            });

        }
    };
};
var gameTh = function() {
    return {
        play: function(param) {
            $('#g-img').attr('src', 'images/game/img/' + param.id + '.jpg');
            localStorage.setItem('currentLevel', param.id);
            Games.text({
                title: {
                    ru: res.game_3_title.ru,
                    kz: res.game_3_title.kz,
                    en: res.game_3_title.en,
                },
                content: {
                    ru: res.game_3_content.ru,
                    kz: res.game_3_content.kz,
                    en: res.game_3_content.en,
                },
                div: 'game',
                onFinish: function() {
                    Games.sort({
                        content: {
                            ru: res.game_3_g_content.ru,
                            kz: res.game_3_g_content.kz,
                            en: res.game_3_g_content.en,
                        },
                        div: 'game',
                        onFinish: function() {
                            var obj = new gameFour();
                            obj.play({ id: 4 });
                        }
                    });

                }
            });

        }
    };
};
var gameFour = function() {
    return {
        play: function(param) {
            $('#g-img').attr('src', 'images/game/img/' + param.id + '.jpg');
            localStorage.setItem('currentLevel', param.id);
            Games.text({
                title: {
                    ru: res.game_4_title.ru,
                    kz: res.game_4_title.kz,
                    en: res.game_4_title.en,
                },
                content: {
                    ru: res.game_4_content.ru,
                    kz: res.game_4_content.kz,
                    en: res.game_4_content.en,
                },
                div: 'game',
                onFinish: function() {
                    Games.list({
                        content: {
                            ru: res.game_4_g_content.ru,
                            kz: res.game_4_g_content.kz,
                            en: res.game_4_g_content.en,
                        },
                        div: 'game',
                        onFinish: function() {
                            var obj = new gameFive();
                            obj.play({ id: 5 });
                        }
                    });

                }
            });

        }
    };
};
var gameFive = function() {
    return {
        play: function(param) {
            $('#g-img').attr('src', 'images/game/img/' + param.id + '.jpg');
            localStorage.setItem('currentLevel', param.id);
            Games.text({
                title: {
                    ru: res.game_5_title.ru,
                    kz: res.game_5_title.kz,
                    en: res.game_5_title.en,
                },
                content: {
                    ru: res.game_5_content.ru,
                    kz: res.game_5_content.kz,
                    en: res.game_5_content.en,
                },
                div: 'game',
                onFinish: function() {
                    Games.button({
                        content: {
                            ru: res.game_5_g_content.ru,
                            kz: res.game_5_g_content.kz,
                            en: res.game_5_g_content.en,
                        },
                        div: 'game',
                        onFinish: function() {
                            var obj = new gameSix();
                            obj.play({ id: 6 });
                        }
                    });

                }
            });

        }
    };
};
var gameSix = function() {
    return {
        play: function(param) {
            $('#g-img').attr('src', 'images/game/img/' + param.id + '.jpg');
            localStorage.setItem('currentLevel', param.id);
            Games.text({
                title: {
                    ru: res.game_6_title.ru,
                    kz: res.game_6_title.kz,
                    en: res.game_6_title.en,
                },
                content: {
                    ru: res.game_6_content.ru,
                    kz: res.game_6_content.kz,
                    en: res.game_6_content.en,
                },
                div: 'game',
                onFinish: function() {
                    Games.sort({
                        content: {
                            ru: res.game_6_g_content.ru,
                            kz: res.game_6_g_content.kz,
                            en: res.game_6_g_content.en,
                        },
                        div: 'game',
                        onFinish: function() {
                            var obj = new gameSeven();
                            obj.play({ id: 7 });
                        }
                    });

                }
            });

        }
    };
};
var gameSeven = function() {
    return {
        play: function(param) {
            $('#g-img').attr('src', 'images/game/img/' + param.id + '.jpg');
            localStorage.setItem('currentLevel', param.id);
            Games.text({
                title: {
                    ru: res.game_7_title.ru,
                    kz: res.game_7_title.kz,
                    en: res.game_7_title.en,
                },
                content: {
                    ru: res.game_7_content.ru,
                    kz: res.game_7_content.kz,
                    en: res.game_7_content.en,
                },
                div: 'game',
                onFinish: function() {
                    Games.list({
                        content: {
                            ru: res.game_7_g_content.ru,
                            kz: res.game_7_g_content.kz,
                            en: res.game_7_g_content.en,
                        },
                        div: 'game',
                        onFinish: function() {
                            var obj = new gameEight();
                            obj.play({ id: 8 });
                        }
                    });

                }
            });

        }
    };
};
var gameEight = function() {
    return {
        play: function(param) {
            $('#g-img').attr('src', 'images/game/img/' + param.id + '.jpg');
            localStorage.setItem('currentLevel', param.id);
            Games.text({
                title: {
                    ru: res.game_8_title.ru,
                    kz: res.game_8_title.kz,
                    en: res.game_8_title.en,
                },
                content: {
                    ru: res.game_8_content.ru,
                    kz: res.game_8_content.kz,
                    en: res.game_8_content.en,
                },
                div: 'game',
                onFinish: function() {
                    Games.button({
                        content: {
                            ru: res.game_8_g_content.ru,
                            kz: res.game_8_g_content.kz,
                            en: res.game_8_g_content.en,
                        },
                        div: 'game',
                        onFinish: function() {
                            var obj = new gameNine();
                            obj.play({ id: 9 });
                        }
                    });

                }
            });

        }
    };
};
var gameNine = function() {
    return {
        play: function(param) {
            $('#g-img').attr('src', 'images/game/img/' + param.id + '.jpg');
            localStorage.setItem('currentLevel', param.id);
            Games.text({
                title: {
                    ru: res.game_9_title.ru,
                    kz: res.game_9_title.kz,
                    en: res.game_9_title.en,
                },
                content: {
                    ru: res.game_9_content.ru,
                    kz: res.game_9_content.kz,
                    en: res.game_9_content.en,
                },
                div: 'game',
                onFinish: function() {
                    Games.sort({
                        content: {
                            ru: res.game_9_g_content.ru,
                            kz: res.game_9_g_content.kz,
                            en: res.game_9_g_content.en,
                        },
                        div: 'game',
                        onFinish: function() {
                            var obj = new gameTen();
                            obj.play({ id: 10 });
                        }
                    });

                }
            });

        }
    };
};
var gameTen = function() {
    return {
        play: function(param) {
            $('#g-img').attr('src', 'images/game/img/' + param.id + '.jpg');
            localStorage.setItem('currentLevel', param.id);
            Games.text({
                title: {
                    ru: res.game_10_title.ru,
                    kz: res.game_10_title.kz,
                    en: res.game_10_title.en,
                },
                content: {
                    ru: res.game_10_content.ru,
                    kz: res.game_10_content.kz,
                    en: res.game_10_content.en,
                },
                div: 'game',
                onFinish: function() {
                    Games.list({
                        content: {
                            ru: res.game_10_g_content.ru,
                            kz: res.game_10_g_content.kz,
                            en: res.game_10_g_content.en,
                        },
                        div: 'game',
                        onFinish: function() {
                            var obj = new game11();
                            obj.play({ id: 11 });
                        }
                    });

                }
            });

        }
    };
};

var game11 = function() {
    return {
        play: function(param) {
            $('#g-img').attr('src', 'images/game/img/' + param.id + '.jpg');
            localStorage.setItem('currentLevel', param.id);
            Games.text({
                title: {
                    ru: res.game_11_title.ru,
                    kz: res.game_11_title.kz,
                    en: res.game_11_title.en,
                },
                content: {
                    ru: res.game_11_content.ru,
                    kz: res.game_11_content.kz,
                    en: res.game_11_content.en,
                },
                div: 'game',
                onFinish: function() {
                    Games.list({
                        content: {
                            ru: res.game_11_g_content.ru,
                            kz: res.game_11_g_content.kz,
                            en: res.game_11_g_content.en,
                        },
                        div: 'game',
                        onFinish: function() {
                            var obj = new game12();
                            obj.play({ id: 12 });
                        }
                    });

                }
            });

        }
    };
};
var game12 = function() {
    return {
        play: function(param) {
            $('#g-img').attr('src', 'images/game/img/' + param.id + '.jpg');
            localStorage.setItem('currentLevel', param.id);
            Games.text({
                title: {
                    ru: res.game_12_title.ru,
                    kz: res.game_12_title.kz,
                    en: res.game_12_title.en,
                },
                content: {
                    ru: res.game_12_content.ru,
                    kz: res.game_12_content.kz,
                    en: res.game_12_content.en,
                },
                div: 'game',
                onFinish: function() {
                    Games.button({
                        content: {
                            ru: res.game_12_g_content.ru,
                            kz: res.game_12_g_content.kz,
                            en: res.game_12_g_content.en,
                        },
                        div: 'game',
                        onFinish: function() {
                            var obj = new gameTh();
                            obj.play({ id: 13 });
                        }
                    });

                }
            });

        }
    };
};
var game13 = function() {
    return {
        play: function(param) {
            $('#g-img').attr('src', 'images/game/img/' + param.id + '.jpg');
            localStorage.setItem('currentLevel', param.id);
            Games.text({
                title: {
                    ru: res.game_13_title.ru,
                    kz: res.game_13_title.kz,
                    en: res.game_13_title.en,
                },
                content: {
                    ru: res.game_13_content.ru,
                    kz: res.game_13_content.kz,
                    en: res.game_13_content.en,
                },
                div: 'game',
                onFinish: function() {
                    Games.sort({
                        content: {
                            ru: res.game_13_g_content.ru,
                            kz: res.game_13_g_content.kz,
                            en: res.game_13_g_content.en,
                        },
                        div: 'game',
                        onFinish: function() {
                            var obj = new gameFour();
                            obj.play({ id: 14 });
                        }
                    });

                }
            });

        }
    };
};
var game14 = function() {
    return {
        play: function(param) {
            $('#g-img').attr('src', 'images/game/img/' + param.id + '.jpg');
            localStorage.setItem('currentLevel', param.id);
            Games.text({
                title: {
                    ru: res.game_14_title.ru,
                    kz: res.game_14_title.kz,
                    en: res.game_14_title.en,
                },
                content: {
                    ru: res.game_14_content.ru,
                    kz: res.game_14_content.kz,
                    en: res.game_14_content.en,
                },
                div: 'game',
                onFinish: function() {
                    Games.list({
                        content: {
                            ru: res.game_14_g_content.ru,
                            kz: res.game_14_g_content.kz,
                            en: res.game_14_g_content.en,
                        },
                        div: 'game',
                        onFinish: function() {
                            var obj = new gameFive();
                            obj.play({ id: 15 });
                        }
                    });

                }
            });

        }
    };
};
var game15 = function() {
    return {
        play: function(param) {
            $('#g-img').attr('src', 'images/game/img/' + param.id + '.jpg');
            localStorage.setItem('currentLevel', param.id);
            Games.text({
                title: {
                    ru: res.game_15_title.ru,
                    kz: res.game_15_title.kz,
                    en: res.game_15_title.en,
                },
                content: {
                    ru: res.game_15_content.ru,
                    kz: res.game_15_content.kz,
                    en: res.game_15_content.en,
                },
                div: 'game',
                onFinish: function() {
                    Games.button({
                        content: {
                            ru: res.game_15_g_content.ru,
                            kz: res.game_15_g_content.kz,
                            en: res.game_15_g_content.en,
                        },
                        div: 'game',
                        onFinish: function() {
                            var obj = new gameSix();
                            obj.play({ id: 16 });
                        }
                    });

                }
            });

        }
    };
};
var game16 = function() {
    return {
        play: function(param) {
            $('#g-img').attr('src', 'images/game/img/' + param.id + '.jpg');
            localStorage.setItem('currentLevel', param.id);
            Games.text({
                title: {
                    ru: res.game_16_title.ru,
                    kz: res.game_16_title.kz,
                    en: res.game_16_title.en,
                },
                content: {
                    ru: res.game_16_content.ru,
                    kz: res.game_16_content.kz,
                    en: res.game_16_content.en,
                },
                div: 'game',
                onFinish: function() {
                    Games.sort({
                        content: {
                            ru: res.game_16_g_content.ru,
                            kz: res.game_16_g_content.kz,
                            en: res.game_16_g_content.en,
                        },
                        div: 'game',
                        onFinish: function() {
                            var obj = new gameSeven();
                            obj.play({ id: 17 });
                        }
                    });

                }
            });

        }
    };
};
var game17 = function() {
    return {
        play: function(param) {
            $('#g-img').attr('src', 'images/game/img/' + param.id + '.jpg');
            localStorage.setItem('currentLevel', param.id);
            Games.text({
                title: {
                    ru: res.game_17_title.ru,
                    kz: res.game_17_title.kz,
                    en: res.game_17_title.en,
                },
                content: {
                    ru: res.game_17_content.ru,
                    kz: res.game_17_content.kz,
                    en: res.game_17_content.en,
                },
                div: 'game',
                onFinish: function() {
                    Games.list({
                        content: {
                            ru: res.game_17_g_content.ru,
                            kz: res.game_17_g_content.kz,
                            en: res.game_17_g_content.en,
                        },
                        div: 'game',
                        onFinish: function() {
                            var obj = new gameEight();
                            obj.play({ id: 18 });
                        }
                    });

                }
            });

        }
    };
};
var game18 = function() {
    return {
        play: function(param) {
            $('#g-img').attr('src', 'images/game/img/' + param.id + '.jpg');
            localStorage.setItem('currentLevel', param.id);
            Games.text({
                title: {
                    ru: res.game_18_title.ru,
                    kz: res.game_18_title.kz,
                    en: res.game_18_title.en,
                },
                content: {
                    ru: res.game_18_content.ru,
                    kz: res.game_18_content.kz,
                    en: res.game_18_content.en,
                },
                div: 'game',
                onFinish: function() {
                    Games.button({
                        content: {
                            ru: res.game_18_g_content.ru,
                            kz: res.game_18_g_content.kz,
                            en: res.game_18_g_content.en,
                        },
                        div: 'game',
                        onFinish: function() {
                            var obj = new gameNine();
                            obj.play({ id: 19 });
                        }
                    });

                }
            });

        }
    };
};
var game19 = function() {
    return {
        play: function(param) {
            $('#g-img').attr('src', 'images/game/img/' + param.id + '.jpg');
            localStorage.setItem('currentLevel', param.id);
            Games.text({
                title: {
                    ru: res.game_19_title.ru,
                    kz: res.game_19_title.kz,
                    en: res.game_19_title.en,
                },
                content: {
                    ru: res.game_19_content.ru,
                    kz: res.game_19_content.kz,
                    en: res.game_19_content.en,
                },
                div: 'game',
                onFinish: function() {
                    Games.sort({
                        content: {
                            ru: res.game_19_g_content.ru,
                            kz: res.game_19_g_content.kz,
                            en: res.game_19_g_content.en,
                        },
                        div: 'game',
                        onFinish: function() {
                            var obj = new gameTen();
                            obj.play({ id: 110 });
                        }
                    });

                }
            });

        }
    };
};
var game20 = function() {
    return {
        play: function(param) {
            $('#g-img').attr('src', 'images/game/img/' + param.id + '.jpg');
            localStorage.setItem('currentLevel', param.id);
            Games.text({
                title: {
                    ru: res.game_20_title.ru,
                    kz: res.game_20_title.kz,
                    en: res.game_20_title.en,
                },
                content: {
                    ru: res.game_20_content.ru,
                    kz: res.game_20_content.kz,
                    en: res.game_20_content.en,
                },
                div: 'game',
                onFinish: function() {
                    Games.list({
                        content: {
                            ru: res.game_20_g_content.ru,
                            kz: res.game_20_g_content.kz,
                            en: res.game_20_g_content.en,
                        },
                        div: 'game',
                        onFinish: function() {
                            location.href = '../menu.html';
                        }
                    });

                }
            });

        }
    };
};