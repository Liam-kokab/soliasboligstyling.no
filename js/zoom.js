/**
 * Created by Liam-S on 17.01-2018.
 */
var inZoom = false;
var room;
var numOfImg;
var firstInit = true;
var divGird;
var lastImgLoaded = 7;
var done = false;
var imgNeedToLoad = 8;

function imageLoaded(){
    imgNeedToLoad--;
    if(imgNeedToLoad < 1){
        scrollUpdate();
        document.getElementById('loeadingImg').style.display = 'none';
    }
}

function zoomIn(url) {
    if(inZoom) return;
    document.getElementById('zoomImg').src = url;
    document.getElementById('imgBack').style.display = 'inherit';
    inZoom = true;

}

function zoomOut() {
    if(!inZoom) return;
    document.getElementById('imgBack').style.display = 'none';
    inZoom = false;
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
        return '<img src="./img/' + room + '/' + lastImgLoaded + '.jpg" class="thumbnails" onload="imageLoaded()" onclick="zoomIn(\'./img/' + room + '/' + lastImgLoaded + '.jpg\')">';
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
