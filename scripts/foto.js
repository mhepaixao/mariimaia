$(function() {

   $("#photo_container").mouseenter(function() {
      $("#photo_container").html("<img class=\"photo\" src=\"photos/frente.jpg\"></img>");

      $("#statement").css("visibility","visible");
   });

});
