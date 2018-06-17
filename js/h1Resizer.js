

    function scrollUpdate(){
        var fontsize = Math.max(130 - getScrollTop(), 50);
        document.getElementById('solias').style.fontSize = (Math.max(130 - getScrollTop(), 70) + 'px');
        document.getElementById('boligstyling').style.fontSize = (Math.max(50 - getScrollTop()/2, 20) + 'px');
    }

    function getScrollTop() {
        return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    }