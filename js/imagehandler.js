var inZoom = false;
var divGird;
var lastImgLoaded = 7;
var done = false;
var imgNeedToLoad = 0;
var justChanged = false;
var lastZoomedImgRoom = null;
var lastZoomedImgNum = 0;
var lastZoomedImgRoomNum = 0;
var initDone = false;
var rooms = {
    name : ['main', 'bad', 'kjokken', 'soverom', 'stue'],
    count: [8, 8, 8, 8, 8] 
};

//Zoom Functions
function nextImg(i){
    if (lastZoomedImgRoom == null) return;
    ZoomOutControll();
    lastZoomedImgRoomNum = rooms.name.indexOf(lastZoomedImgRoom);
    getNextImage(i);
    lastZoomedImgRoom = rooms.name[lastZoomedImgRoomNum];
    document.getElementById('zoomImg').src = './img/' + lastZoomedImgRoom + '/' + lastZoomedImgNum + '.jpg';
    
}
function getNextImage(i){
    lastZoomedImgRoomNum += i;
    if(lastZoomedImgRoomNum >= rooms.name.length){
        lastZoomedImgRoomNum = 0;
        lastZoomedImgNum++;
    }else if(lastZoomedImgRoomNum < 0) {
        lastZoomedImgRoomNum = rooms.name.length - 1;
        lastZoomedImgNum--;
        if(lastZoomedImgNum < 0){
            max = 0;
            for(j=0;j<rooms.name.length;j++){
                if(max <= rooms.count[j]){
                    lastZoomedImgRoomNum = j;
                    lastZoomedImgNum = rooms.count[j] - 1;
                }
            }
        }
    }
    if(lastZoomedImgNum >= Math.max(...rooms.count)){
        lastZoomedImgNum = 0;
        lastZoomedImgRoomNum = 0;
    }
    if(lastZoomedImgNum >= rooms.count[lastZoomedImgRoomNum]){
        getNextImage(i);
        return;
    }

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
    if(!toucheExit ) document.getElementById("body").style.overflow = 'auto';
    else{
        setTimeout(function () {
            document.getElementById("body").style.overflow = 'auto';
            toucheExit = false;
        }, 400); 
    }
    document.getElementById('imgBack').style.display = 'none';
    inZoom = false;
    lastZoomedImg = null;
}
//image change on key or swipe
window.onkeyup = function(e) {
    if(!inZoom) return;
    var key = e.keyCode ? e.keyCode : e.which;
    
    if (key == 39 || key == 13)nextImg(1);
    else if (key == 37) nextImg(-1);
    else if(key == 27) zoomOut();
 } 

 document.addEventListener('touchstart', handleTouchStart, false);        
 document.addEventListener('touchmove', handleTouchMove, false);
 
 var xDown = null;                                                        
 var yDown = null;                                                        
 var toucheExit = false;
 function handleTouchStart(evt) {                                         
     xDown = evt.touches[0].clientX;                                      
     yDown = evt.touches[0].clientY;                                      
 }                                              
 
 function handleTouchMove(evt) {
     if ( ! xDown || ! yDown ) {
         return;
     }
 
     var xUp = evt.touches[0].clientX;                                    
     var yUp = evt.touches[0].clientY;
 
     var xDiff = xDown - xUp;
     var yDiff = yDown - yUp;
 
     if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
         if ( xDiff > 0 ) {
             nextImg(1);
         } else {
             nextImg(-1);
         }                       
     } else {
         toucheExit = true;
         zoomOut();                                                                
     }
     /* reset values */
     xDown = null;
     yDown = null;                                             
 }




//image loading functions
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