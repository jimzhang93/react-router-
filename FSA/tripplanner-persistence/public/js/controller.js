var controllerModule = (function() {

  function saveDayDB(day) {
    console.log('Saving day: ');
    console.log(day);
    //save day to database

    return $.ajax({
      method: "PUT",
      url: "/api/days",
      data: {
        number: day.number
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


  var publicAPI = {
    saveDayDB: saveDayDB,
    addDayDB: addDayDB
  };
  return publicAPI;
}());

console.log(controllerModule);
