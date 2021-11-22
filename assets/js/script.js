var btnStart = document.querySelector("#btn-start");



var time = 3;

var start = function(){

    //start timer
    var myTimer = setInterval(function(){
        console.log(time);
        time--;
        if(time === 0){
            clearInterval(myTimer);
        }
    },1000);

    //create question
    

}







btnStart.addEventListener("click",start);