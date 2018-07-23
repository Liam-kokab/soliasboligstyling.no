function getimageNumber(roomName){
    switch(roomName) {
        case 'main':
            return 45;        
        case 'bad':
            return 38;
        case 'kjokken':
            return 12;
        case 'soverom':
            return 21;
        case 'stue':
            return 46;
        default:
            return 8;
    }
}
//main:45|bad:38|kjokken:12|soverom:21|stue:46