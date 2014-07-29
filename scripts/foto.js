$(function() {

   firstPhotoFlag = false;

   photoCenterPoint = getPhotoCenterPoint();

   $("#photo_container").mouseenter(function() {
      $("#statement").fadeIn(4000, function(){
         firstPhotoFlag = true;
      });
   });

   $(document).mousemove(function(mouse){
      if(firstPhotoFlag == true){

         reloadZIndexes();

         if(isMouseOffCenter(mouse) == true){

            var angle = getAngleBetweenTwoPoints(photoCenterPoint.x, photoCenterPoint.y, mouse.pageX, mouse.pageY)

            if(isAngleRight(angle) == true){
               $("#right").css("z-index", "1");
            }
            else if(isAngleUp(angle) == true){
               $("#up").css("z-index", "1");
            }
            else if(isAngleLeft(angle) == true){
               $("#left").css("z-index", "1");
            }
            else if(isAngleDown(angle) == true){
               $("#down").css("z-index", "1");
            }
         }
         else{
            $("#center").css("z-index", "1");
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

   function reloadZIndexes(){
      $("#photo_container").find("img").css("z-index", "0");
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
