var controllerModule = (function() {

  function saveDayDB(day) {
    console.log('Saving day: ');
    console.log(day);
    //save day to database

    return $.ajax({
      method: "PUT",
      url: "/api/days",
      data: {
        number: day.number,
        activities: day.activities,
        hotel: day.hotel,
        restaurants: day.restaurants
      }
    });


  }

  function addDayDB(day) {
    //ajax to create day
    return $.ajax({
      method: "POST",
      url: "/api/days",
      data: {
        number: day.number
      }
    });
  }

  function addAttractionToDayDB(day, type, attraction) {
    console.log('Day ID to add attraction', day.number);
    console.log('Attraction to add:', attraction);
    console.log('Type', type);
    return $.ajax({
      method: "PUT",
      url: "/api/days/" + day.number + "/" + type,
      data: {
        attractionId: attraction.id
      }
    });
  }

  function addAttractionsFromDay(day) {
    var dayId = day.number;
    $.ajax({
        method: "GET",
        url: "/api/days/" + dayId
      })
      .then(function(dayInstance) {
        //get hotel
        console.log('calling getHotel on day', dayInstance);
        return $.ajax({
          method: "GET",
          url: "/api/days/" + dayId + "/hotel"
        });
        //display hotel
      })
      .then(function(hotel) {
        //draw hotel
        if (hotel) {
          console.log('found Hotel!', hotel);
          console.log('day currently looks like:', day);
          var hotelAttraction = attractionModule.create(hotel);
          day.addAttraction(hotelAttraction, true);
        } else {
          console.log('Did not find Hotel for:', dayId);
        }

      })
      // .then(function(restaurants){
      //   //draw restaurants
      //
      //   //get activities
      // })
      // .then(function(activities){
      //   //draw activities
      //
      //   //return
      // })
      .catch(console.error);
  }


  var publicAPI = {
    saveDayDB: saveDayDB,
    addDayDB: addDayDB,
    addAttractionToDayDB: addAttractionToDayDB,
    addAttractionsFromDay: addAttractionsFromDay
  };
  return publicAPI;
}());
