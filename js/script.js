let ship = $('.ship'),windowWidht = WindowWidhtGet(),shipWidht = 100,windowHeight = WindowHeightGet(),shipHeight = 100,
    time = 0, speed = 1, countMeteor = 0, countMeteorArr = [], removeKadr;
let VectorLeft = 0, VectorRight = 0, VectorTop = 0, VectorBottom = 0;
let Level1 = [
    {
        time:100,
        coordinates:[10,20],
        end:false
    },
    {
        time:500,
        coordinates:[40,60],
        end:false
    },
    {
        time:800,
        end:true
    }
];
$('.StartButton').click(function () { 
    $('.SceneGame').fadeIn(1000);
    $('.SceneStart').fadeOut(1000);
    removeKadr = setInterval(kadr,20);
});

$(document).keydown(function (e) { 
    const offset = ship.offset();
    if(e.keyCode == 68||e.keyCode == 39){
        VectorRight = 1;
    }
    if(e.keyCode == 65||e.keyCode == 37){
        VectorLeft = 1;
    }
    if(e.keyCode == 87||e.keyCode == 38){
        VectorTop = 1;
    }
    if(e.keyCode == 83||e.keyCode == 40){
        VectorBottom = 1;
    }
});
$(document).keyup(function (e) { 
    if(e.keyCode == 68||e.keyCode == 39){
        VectorRight = 0;
    }
    if(e.keyCode == 65||e.keyCode == 37){
        VectorLeft = 0;
    }
    if(e.keyCode == 87||e.keyCode == 38){
        VectorTop = 0;
    }
    if(e.keyCode == 83||e.keyCode == 40){
        VectorBottom = 0;
    }
});

function kadr(){
    time++;
    ShipMove();//Движение корабля
    SpaunMeteor(Level1,time);//Спаун метеоритов
    MoveMeteor();//Движет метеориты
}
function ShipMove(){
    const offset = ship.offset();
    if(offset.left<2){VectorLeft = 0}
    if(offset.left>windowWidht-shipWidht-10){VectorRight = 0}
    if(offset.top<2){VectorTop = 0}
    if(offset.top> windowHeight - shipHeight - 10){VectorBottom = 0}
    ship.offset({
        left: offset.left + (VectorRight - VectorLeft)*10,
        top: offset.top + (VectorBottom - VectorTop)*10
    });
}

function SpaunMeteor(level,time){
    for (const key in level) {
        if (time==level[key].time){
            if(level[key].end){PlayerVinner();return};
            level[key]['coordinates'].forEach(e => {
                $('#GamePole').append(`<div class="Meteor" style="left: ${e}vw;" id="${countMeteor}"></div>`);
                countMeteorArr[countMeteor] = countMeteor;
                countMeteor++;
            });
            return
        }
    }
}

function deleteMeteor(n){
    countMeteorArr[n] = -1;
    $('#'+n).remove();
}

function MoveMeteor(){
    countMeteorArr.forEach(e => {
        if(e!=-1){
        const meteor = $('#'+e);
        const offset = meteor.offset().top + speed;
        if(offset>windowHeight){deleteMeteor(e)}
        else{
        meteor.css('top',`${offset}px`)
        }
        }
    });
}

function PlayerVinner(){
    clearInterval(removeKadr);
    $('.SceneGame').fadeOut(1000);
    $('.SceneVin').fadeIn(1000);
}

function WindowWidhtGet(){
    return $(window).width();
}
function WindowHeightGet(){
    return $(window).height();
}