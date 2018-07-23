var inZoom = false;
var divGird;
var lastImgLoaded = 7;
var done = false;
var imgNeedToLoad = 0;
var justChanged = false;
var lastZoomedImgRoom = null;
var lastZoomedImgNum = 0;
var initDone = false;
var rooms = {
    name : ['main', 'bad', 'kjokken', 'soverom', 'stue'],
    count: [8, 8, 8, 8, 8] 
};

//main:45|bad:38|kjokken:12|soverom:21|stue:46
function init(){
    divGird = document.getElementById('imgGrid');   

    for(i = 0; i<rooms.name.length; i++){
        rooms.count[i] = getimageNumber(rooms.name[i]);
    }
    initDone = true;
    scrollUpdate();
}

/*Scroll functions
* addes images on scroll 
* controls logo size
*/
function scrollUpdate() {
    if(!initDone) return;
    //title resize
    document.getElementById('solias').style.fontSize = (Math.max(130 - getScrollTop(), 70) + 'px');
    document.getElementById('boligstyling').style.fontSize = (Math.max(50 - getScrollTop()/2, 20) + 'px');
    
    //image loading
    if(imgNeedToLoad > 0 && !done) {
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

posInnObj = 0;
currentImgNum = 3;
roomsDoneLoading = 0;
function getHtml() {
    if(posInnObj >= rooms.name.length){
        posInnObj = 0;
        currentImgNum++;
    }
    if(currentImgNum >= rooms.count[posInnObj]){
        posInnObj++;
        roomsDoneLoading++;
        if(roomsDoneLoading >= rooms.name.length){
            done = true;
            console.log('done!!');
            return "";
        }
        return getHtml();
    }
    roomsDoneLoading = 0;
    lastImgLoaded++;
    var h = '<img src="./img/' + rooms.name[posInnObj] + '/' + currentImgNum + '.jpg" class="thumbnails" onload="imageLoaded()" onclick="zoomIn(\'' + rooms.name[posInnObj] + '\', ' + currentImgNum + ')">';
    posInnObj++;
    return h;
}


//loading Images functions
function imageLoaded(){
    imgNeedToLoad--;
    if(imgNeedToLoad < 1){
        scrollUpdate();
        document.getElementById('loeadingImg').style.display = 'none';
    }
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