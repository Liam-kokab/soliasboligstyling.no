/**
 * Created by Liam Kokab
 */

/**----------------------------------------------------------------*/

//update this with number of images
//image names {0.jpg .. n.jpg}
var numberOfImg = 45;

//how fast the image fade, bigger number will make the animation to go faster.
//smaller number vil make the animation to take longer.
var AnimationTime = 0.01;

//how long each image will stay om. in millie second. 3000 = 3 sec
var imageViewTime = 3000;


//don't change anything farther down!!
//----------------------------------------------------------------//
/**---------------------------------------------------------------*/
var lastLoaded = 0;
var lastShown = 0;
var play = true;
var firstInit = true;

function init() {
    if(firstInit){
        load(1);
        firstInit = false;
        if(play) goPlay();
    }
}

function load(i){
    var imgHtml = "";
    while(i < lastShown + 7 && i <= numberOfImg){
        imgHtml += "<img src='./imgViewerImages/" + i + ".jpg' id='Image" + i + "' class='mainImage' style='display: none'>";
        lastLoaded = i++;
    }
    document.getElementById("imgDiv").innerHTML += imgHtml;
}

function changeImg() {
    var view = lastShown + 1;
    if(view > lastLoaded){
        view = 0;
    }
    var vi = document.getElementById("Image" + view);
    vi.style.display = 'inherit';
    vi.style.zIndex = 100;
    if(play){
        changeImgAnimation(lastShown, 1.0);
    }else{
        document.getElementById("Image" + lastShown).style.display = 'none';
    }
    lastShown = view;
    if(lastShown > lastLoaded - 6 && numberOfImg != lastLoaded) load(lastLoaded + 1);
}

function changeImgAnimation(p, o) {
    var pre = document.getElementById("Image" + p);
    pre.style.zIndex = 200;
    //pre.style.position = "absolute";
    setTimeout(function () {
        if(o > 0.001){
            pre.style.opacity = o;
            changeImgAnimation(p, o - AnimationTime);
        }else{
            pre.style.display = 'none';
            //pre.style.position = 'inherit';
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