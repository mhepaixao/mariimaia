$(function() {

   firstPhotoFlag = false;

   photoCenterPoint = getPhotoCenterPoint();

   $("#photo_container").mouseenter(function() {
      if(isMessageInPhoto() == true){
         $("#photo_container").html("<img class=\"photo_fade\" src=\"photos/center.jpg\"></img>");

         $(".photo_fade").fadeIn(2000);
         $("#statement").fadeIn(4000, function(){
            firstPhotoFlag = true;
         });

      }
   });

   function isMessageInPhoto(){
      if($("#photo_container").html().indexOf("Can") > - 1){
         return true;
      }
   }

   $(document).mousemove(function(mouse){
      if(firstPhotoFlag == true){

         if(isMouseOffCenter(mouse) == true){

            var angle = getAngleBetweenTwoPoints(photoCenterPoint.x, photoCenterPoint.y, mouse.pageX, mouse.pageY)

            if(isAngleRight(angle) == true){
               $("#photo_container").html("<img class=\"photo\" src=\"photos/right.jpg\"></img>");
               //$("#photo_container").html("right");
            }
            else if(isAngleUp(angle) == true){
               $("#photo_container").html("<img class=\"photo\" src=\"photos/up.jpg\"></img>");
               //$("#photo_container").html("up");
            }
            else if(isAngleLeft(angle) == true){
               $("#photo_container").html("<img class=\"photo\" src=\"photos/left.jpg\"></img>");
               //$("#photo_container").html("left");
            }
            else if(isAngleDown(angle) == true){
               $("#photo_container").html("<img class=\"photo\" src=\"photos/down.jpg\"></img>");
               //$("#photo_container").html("down");
            }
         }
         else{
            $("#photo_container").html("<img class=\"photo\" src=\"photos/center.jpg\"></img>");
         }
      }
   });

   function getPhotoCenterPoint(){
      var photoCenterPoint = {x: null, y: null};

      var photoContainerOffset = $("#photo_container").offset();
      photoCenterPoint.x = photoContainerOffset.left + ($("#photo_container").width() / 2);
      photoCenterPoint.y = photoContainerOffset.top + ($("#photo_container").height() / 2);

      return photoCenterPoint;
   }

   function isMouseOffCenter(mouse){
      var result = true;

      xLimit = $("#photo_container").width() / 2;
      yLimit = $("#photo_container").height() / 2;
      if(between(mouse.pageX, photoCenterPoint.x - xLimit, photoCenterPoint.x + xLimit) && 
         between(mouse.pageY, photoCenterPoint.y - yLimit, photoCenterPoint.y + yLimit)){

         result = false;
      }

      return result;
   }

   function getAngleBetweenTwoPoints(x1, y1, x2, y2){
      var angle = -1 * Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

      if(angle < 0){
         angle += 360;
      }

      return angle;
   }

   function getAngleBetweenTwoPointsInRadians(x1, y1, x2, y2){
      return Math.atan2(y2 - y1, x2 - x1);
   }

   function isAngleRight(angle){
      result = false;

      if(between(angle, 0, 45) || between(angle, 315, 360)){
         result = true;
      }

      return result;
   }

   function isAngleUp(angle){
      result = false;

      if(between(angle, 45, 135)){
         result = true;
      }

      return result;
   }
   
   function isAngleLeft(angle){
      result = false;

      if(between(angle, 135, 225)){
         result = true;
      }

      return result;
   }

   function isAngleDown(angle){
      result = false;

      if(between(angle, 225, 315)){
         result = true;
      }

      return result;
   }

   function between(x, min, max) {
      return (x >= min) && (x <= max);
   }
});
