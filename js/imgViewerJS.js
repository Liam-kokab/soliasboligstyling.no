/**
 * Created by Liam Kokab
 */

/**----------------------------------------------------------------*/
//how fast the image fade, bigger number will make the animation to go faster.
//smaller number vil make the animation to take longer.
var AnimationTime = 0.01;

//how long each image will stay om. in millie second. 3000 = 3 sec
var imageViewTime = 3000;

//----------------------------------------------------------------//
//----------------------------------------------------------------//
var numberOfImg = 8;
var lastLoaded = 0;
var doneloading = 0;
var lastShown = 0;
var play = true;
var firstInit = true;
var ready1 = false;

function init() {
    if(!firstInit) return;
    if(!ready1){
        timer = true;
        reTryInit();
        return;
    }
    numberOfImg = read();
    load(1);
    firstInit = false;
    if(play) goPlay();   
}
function reTryInit(){
    setTimeout(function () {
        timer = false;
        init();
    }, 100);
}
function ready(){
    ready1 = true;
}
function read() {
    var oFrame = document.getElementById("fromFile");
    var text = oFrame.contentWindow.document.body.childNodes[0].innerHTML;
    var rooms = text.split("|");
    for (var i = 0; i< rooms.length; i++ ){
        if(rooms[i].indexOf(roomName) > -1) {
            var thisRoom = rooms[i].split(":");
            return parseInt(thisRoom[1]);
        }
    }
}
function imageloaded(){
    doneloading++;
}


function load(i){
    if(lastLoaded > doneloading + 3) {
        setTimeout(function () {
            load(i);
            return;
        }, 50);
        return;
    }
    var imgHtml = "";
    while(i < lastShown + 7 && i < numberOfImg){
        imgHtml += "<img src='./imgViewerImages/" + i + ".jpg' onload='imageloaded()' id='Image" + i + "' class='mainImage' style='display: none'>";
        lastLoaded = i++;
    }
    document.getElementById("imgDiv").innerHTML += imgHtml;
}

function changeImg() {
    var view = lastShown + 1;
    if(view == numberOfImg) view = 0;
    if(view+1 > doneloading) return;
    
    var vi = document.getElementById("Image" + view);
    vi.style.display = 'inherit';
    vi.style.zIndex = 100;
    
    changeImgAnimation(lastShown, 1.0);
    
    lastShown = view;
    if(lastShown > lastLoaded - 6 && numberOfImg != lastLoaded) load(lastLoaded + 1);
}

function changeImgAnimation(p, o) {
    var pre = document.getElementById("Image" + p);
    pre.style.zIndex = 200;
    setTimeout(function () {
        if(o > 0.001){
            pre.style.opacity = o;
            changeImgAnimation(p, o - AnimationTime);
        }else{
            pre.style.display = 'none';
            pre.style.opacity = 1.0;
        }
    }, 10);
}

function goPlay() {
    setTimeout(function () {
        if(play){
            changeImg();
            goPlay();
        }
    }, imageViewTime);
}