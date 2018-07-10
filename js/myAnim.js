var Anim = {
    lib: function(img, animType) {
        $(img).addClass("animated");
        $(img).addClass(animType);
        setTimeout(function () {
            $(img).removeClass("animated");
            $(img).removeClass(animType);
        }, 1000);
    },
    
    rotate: function(idImg, time, degrees) {
        idImg.attr('style', 'visibility: visible; transition-duration: '+time+'s; transition-property: transform; transform: rotate('+degrees+'deg);  -webkit-transform: rotate('+degrees+'deg);');
    },
    
    initPlayer: function(){
        var container = document.getElementById('main-player');
        var code = '<div id="player1">'+
                '<div id="block1">'+
                '<a target="_blank"> <img id="cartoon1" border="0" /> </a>'+
                '</div>'+
            '</div>'+
            '<div id="dialog-1-container">'+
                '<div id="dialog1">'+
                    '<div id="dialog-1-text">'+
                        '<p id="text1"></p>'+
                    '</div>'+
                '</div>'+
            '</div>'+
            '<div id="player2">'+
                '<div id="block2">'+
                    '<a target="_blank"> <img id="cartoon2" border="0" /> </a>'+
                '</div>'+
            '</div>'+
            '<div id="dialog-2-container">'+
                '<div id="dialog2">'+
                    '<div id="dialog-2-text">'+
                        '<p id="text2"></p>'+
                    '</div>'+
                '</div>'+
            '</div>';
        
        container.innerHTML = code;
    },

    class: function(className, animName, delay){
        var time = 0;
        className.each(function(){
            time += delay;
            var elem = $(this);
            setTimeout(function(){
                Anim.lib( elem, animName );
            }, time);
        });
    }
}