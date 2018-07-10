var MyVideo = function(){
    return{
        name: '',

        play: function (param) { 
            this.name = 'video-'+ Math.round( Math.random()*100);
            var videoPlayer = document.getElementById( param['divId'] );
            var videoControls = '';
            if( param['controls']==true ){
                videoControls = 'controls';
            }

            $( '#' + param['divId'] ).attr('style', 'visibility: visible');
            
            var code = '<div id="video-container"><video '+videoControls+' id="'+this.name+'" width="' + param['width'] + '" height="' + param['height'] + '"><source src="' + param['src'] + '" type="video/' + param['type'] + '"></video></div>';           
            videoPlayer.innerHTML = code;  
            
            if( param['onExit']!=null ){ //Кнопка X для закрытия
                $('#video-container').append('<div id="video-exit" class="button"></div>');
                $('#video-exit').click(function(){
                    onExit = param['onExit'];
                    onExit();
                })
            }

            this.playVideo(param['loop']);    //повтор
            
            if(param['next']!=null){ //Нажатие на видео
                $("#"+this.name).on('pause',function(){
                    next = param['next'];
                    next();
                });       
            }
        }, 
        
        playVideo: function (loop) {
            var video = document.getElementById(this.name);
            video.play();
            video.loop = loop;   
        }, 
        
        pause: function(){
            console.log('pause')
            var video = document.getElementById(this.name);
            video.pause();
        },

        replay: function(param){
            console.log('replay')
            var video = document.getElementById(this.name);
            video.play();            
            video.loop = param['loop']; 
        },
    }

    
}