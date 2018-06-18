/**
 * Created by Liam.k on 17.01-2018.
 * fix scroll on zoomed img
 * fix swap
 */
var inZoom = false;
var room;
var numOfImg;
var firstInit = true;
var divGird;
var lastImgLoaded = 7;
var done = false;
var imgNeedToLoad = 8;
var justChanged = false;
var justChangedTime = 2;
var lastZoomedImgRoom = null;
var lastZoomedImgNum = 0;

function nextImg(i){
    if (lastZoomedImgRoom == null) return;
    justChanged = true;
    if(lastZoomedImgNum == numOfImg && i > 0) lastZoomedImgNum = 0;
    else if (lastZoomedImgNum == 0 && i < 0) lastZoomedImgNum = numOfImg;
    else lastZoomedImgNum = lastZoomedImgNum + i;
    document.getElementById('zoomImg').src = './img/' + room + '/' + lastZoomedImgNum + '.jpg';
    ZoomOutControll();
}

function ZoomOutControll() {
    if (!justChanged) return;
    if(justChangedTime > 0){
        setTimeout(function () {
            justChangedTime--;
            ZoomOutControll();
        }, 100);
    }else{
        justChanged = false;
        justChangedTime = 2;
        console.log("done");
    }
}

function imageLoaded(){
    imgNeedToLoad--;
    if(imgNeedToLoad < 1){
        scrollUpdate();
        document.getElementById('loeadingImg').style.display = 'none';
    }
}

function zoomIn(room, i) {
    if(inZoom) return;
    document.getElementById('zoomImg').src = './img/' + room + '/' + i + '.jpg';
    document.getElementById('imgBack').style.display = 'inherit';
    inZoom = true;
    lastZoomedImgNum = i;
    lastZoomedImgRoom = room;
    disableScroll();
}

function zoomOut() {
    enableScroll();
    if(!inZoom || justChanged) return;
    document.getElementById('imgBack').style.display = 'none';
    inZoom = false;
    lastZoomedImg = null;
}

function init(roomName, NumberOfImages) {
    if(firstInit){
        room = roomName;
        numOfImg = NumberOfImages;
        divGird = document.getElementById('imgGrid');
        scrollUpdate();
        firstInit = false;
    }
}

function scrollUpdate() {
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
        return '<img src="./img/' + room + '/' + lastImgLoaded + '.jpg" class="thumbnails" onload="imageLoaded()" onclick="zoomIn(\'' + room + '\', ' + lastImgLoaded + ')">';
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
