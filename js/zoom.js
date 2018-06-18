/**
 * Created by Liam.k on 17.01-2018.
 * fix scroll on zoomed img
 * fix swap
 */
var inZoom = false;
var numOfImg = 0;
var firstInit = true;
var divGird;
var lastImgLoaded = 7;
var done = false;
var imgNeedToLoad = 8;
var justChanged = false;
var lastZoomedImgRoom = null;
var lastZoomedImgNum = 0;
var ready1 = false;

function nextImg(i){
    if (lastZoomedImgRoom == null) return;
    ZoomOutControll();
    if(lastZoomedImgNum == numOfImg && i > 0) lastZoomedImgNum = 0;
    else if (lastZoomedImgNum == 0 && i < 0) lastZoomedImgNum = numOfImg;
    else lastZoomedImgNum = lastZoomedImgNum + i;
    document.getElementById('zoomImg').src = './img/' + roomName + '/' + lastZoomedImgNum + '.jpg';
    
}

function ZoomOutControll() {
    justChanged = true;
        setTimeout(function () {
            justChanged = false;
        }, 300); 
}

function zoomIn(roomName, i) {
    document.getElementById("body").style.overflow = 'hidden';
    document.getElementById('zoomImg').src = './img/' + roomName + '/' + i + '.jpg';
    document.getElementById('imgBack').style.display = 'inherit';
    inZoom = true;
    lastZoomedImgNum = i;
    lastZoomedImgRoom = roomName;
}

function zoomOut() {
    if(justChanged || !inZoom) return;
    document.getElementById("body").style.overflow = 'auto';
    document.getElementById('imgBack').style.display = 'none';
    inZoom = false;
    lastZoomedImg = null;
}

function imageLoaded(){
    imgNeedToLoad--;
    if(imgNeedToLoad < 1){
        scrollUpdate();
        document.getElementById('loeadingImg').style.display = 'none';
    }
}

function ready(){
    ready1 = true;
}

function reTryInit(){
    setTimeout(function () {
        timer = false;
        init();
    }, 100);
}

var timer = false;
function init() {
    //console.log("roomName: "+ roomName);
    //console.log("lastRoom: "+ lastRoom);
    if(!firstInit) return;
    if(timer) return;
    if(!ready1){
        timer = true;
        reTryInit();
        return;
    }
    firstInit = false;
    numOfImg = read();
    console.log(numOfImg + ", for: " + roomName);
    //numOfImg = 20;
    divGird = document.getElementById('imgGrid');
    scrollUpdate();
    
    
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

function scrollUpdate() {
    if(firstInit) return;
    //title resize
    document.getElementById('solias').style.fontSize = (Math.max(130 - getScrollTop(), 70) + 'px');
    document.getElementById('boligstyling').style.fontSize = (Math.max(50 - getScrollTop()/2, 20) + 'px');
    
    if(imgNeedToLoad > 0) {
        document.getElementById('loeadingImg').style.display = 'inherit';
        return;
    }
    var thumbnailsHeight = document.getElementById('thumbnails').clientHeight;
    if(!done && (getDocumentHeight() - window.innerHeight) < (getScrollTop() + thumbnailsHeight)){
        var newHtlm = "";
        for(var i=0; i<4; i++){
            newHtlm += getHtml();
        }
        imgNeedToLoad = lastImgLoaded +1;
        updatePage(newHtlm);
        scrollUpdate();
    }
}

function updatePage(html) {
    if(html != null)
        divGird.innerHTML += html;
}

function getHtml() {
    lastImgLoaded++;
    if(lastImgLoaded < numOfImg)
        return '<img src="./img/' + roomName + '/' + lastImgLoaded + '.jpg" class="thumbnails" onload="imageLoaded()" onclick="zoomIn(\'' + roomName + '\', ' + lastImgLoaded + ')">';
    done = true;
    return "";
}

function getDocumentHeight() {
    var body = document.body;
    var html = document.documentElement;

    return Math.max(
        body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight
    );
}
function getScrollTop() {
    return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
}
