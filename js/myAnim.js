var Anim = {
    lib: function(img, animType) {
        $(img).addClass("animated");
        $(img).addClass(animType);
        setTimeout(function () {
            $(img).removeClass("animated");
            $(img).removeClass(animType);
        }, 1000);
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