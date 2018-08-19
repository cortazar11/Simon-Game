var audio1=new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
var audio2=new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
var audio3=new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
var audio4=new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");

var wrong=new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");

audio1.volume=1;
audio1.playbackRate=0.5;

audio2.volume=1;
audio2.playbackRate=0.5;

audio3.volume=1;
audio3.playbackRate=0.5;

audio4.volume=1;
audio4.playbackRate=0.5;

wrong.volume=1;
wrong.playbackRate=0.5;

var sounds=[audio1,audio2,audio3,audio4];
var colors=["green","red","yellow","blue"];
var classes=["bg_green_light","bg_red_light","bg_yellow_light","bg_blue_light"];

// Global Variables to put on/off and start the game
var turnOn=false;
var start=false;
var strict=false;

// Arrays computer
arrComputer=[];

// Global variables for the game
var times=1;
var count=1;

// Global variables form the clock
var secs=8;
var clock=false;

$(document).ready(function(){

  /******************************Bloc for Repetition*********************************/
  function countdown(){
          if(clock==true){
              secs--;
              console.log("secs: "+secs);
              var timer=setTimeout(countdown,1000);
              if(secs==0){
                        clearTimeout(timer);
                        noEvent();
                    }
          }
    }
  
  /************************************ Function for no Event***************************************************/

  function noEvent(){
        var count=10;
        var timer1=setInterval(function(){
            $("p.countLines").text("!!").toggle();
            wrong.play();
            if(count==0){
              clearInterval(timer1);
              $("p.countLines").text(times).toggle();
              var index=0;
              countNew=times;
              var timer2=setInterval(function(){
                    action(arrComputer[index]);
                    index++;
                    countNew--;
                    if(countNew==0){
                        clearInterval(timer2);
                        clock=true;
                        secs=8;
                        countdown();
                        console.log("clock: "+clock+" ;secs"+secs);
                          }
                    },1000)
                  }
            count--;
          },200)
      }

  /************************************* function for Action ************************************************/

  function action(input){
      if(turnOn==true && start==true ){
        $("p.countLines").text(times.toLocaleString('en-US',{minimumIntegerDigits:2})).show();
        var rand=input;
        sounds[rand].play();
        $("#"+colors[rand]).addClass(classes[rand]);
        var timer1=setTimeout(function(){
              $("#"+colors[rand]).removeClass(classes[rand]);
          },1000)
        } else {
              return;
            }
      }

  /*************************************Function to do game t times ******************************************/

  function actionGame(){
    console.log("count: "+count);
      if(turnOn==true && start==true){
           var timer1=setInterval(function(){
              var rand=Math.floor(Math.random()*4);
              arrComputer.push(rand);
              action(rand);
              count--;
              if(count==0 /*|| turnOn==false*/){
                clearInterval(timer1);
                clock=true;
                secs=8;
                countdown();
              } 
          },1000)
        } else {
        return;
      }
  }

/********************************Function to turn on game************************************************/
  $("#onOff").click(function(){
      if(turnOn==false){
      turnOn=true;
      //count=1;
      console.log("turnOn: "+turnOn);
      $("#on").removeClass("bg_on");
      $("#off").addClass("bg_on");
      $("p.countLines").text("- -").show();
    } else /*turnOn==true*/{
      turnOn=false;
      start=false;
      arrComputer=[];
      times=1;
      count=1;
      clock=false;
      $("p.countLines").hide();
      console.log("turnOn: "+turnOn);
      $("#on").addClass("bg_on");
      $("#off").removeClass("bg_on");
          }
    })

  /*******************************Function to start the game **************************************************************/

  function startAction(){
          start=true;
          arrComputer=[];
          times=1
          count=1;
          var countDown=6;
          var timer=setInterval(function(){
              $("p.countLines").toggle();
              if(countDown==0 || turnOn==false){
                $("p.countLines").text("- -").show();
                clearInterval(timer);
                actionGame();
              }
              countDown--;
            },500)
     
        }

  /*********************************************Start ***********************************************************************/


	$("#start").on("click",function(){
        if(turnOn==true){
          if(start==false){
            start=true;
            startAction();
          } else /*start==true*/{
            start=false;
            $("p.countLines").text("- -").show();
            setTimeout(function(){
                startAction();
            },5000)
              }
          }
    })

  /********************************************* Strict ************************************************************/

  $("#strict").click(function(){
      if(turnOn==true){
        if(strict==false){
          strict=true;
          console.log("turnOn: "+turnOn+" strict: "+strict);
          $("#strictLight").css("background-color","red");
        } else /*strict==true*/{
              strict=false;
              $("#strictLight").css("background-color","#422217");
        }
      }
  })

    /************************************* Interactivity of User *****************************************************************/
    var index=0;
    $("div.internalSemi").click(function(){
      if(turnOn==true && start==true ){
        
        var rand=colors.indexOf(this.id);
        var check=(arrComputer[index]==rand);
        
        if(check==true){
          sounds[rand].play();
          $("#"+colors[rand]).addClass(classes[rand]);
          var timer1=setTimeout(function(){
            $("#"+colors[rand]).removeClass(classes[rand]);
            },1000)
          index++;

        } else /*(check==false)*/{
          clock=false;
          console.log("clock: "+clock);
          wrong.play();
          if(strict==false){
              noEvent();
              
          } else /*strict==true*/{
            $("p.countLines").text("- -").show();
            startAction();
          }
        }

        if(check==true && arrComputer.length==index){
              times++;
              count=times;
              arrComputer=[];
              index=0;
              setTimeout(function(){
                  actionGame();
              },1000)
              clock=false;
              console.log("clock: "+clock);
          }

      }
    })


})