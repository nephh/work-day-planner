var today = dayjs();
var currentHour = dayjs().format("H");

$(function () {
  var scheduleEl = $("#schedule");

  // Saving the user input to localstorage and using the id value of the current element as the key
  $(".saveBtn").on("click", function () {
    var description = $(this).siblings(".description").val();
    var hourID = $(this).parent("div").attr("id");
    localStorage.setItem(hourID, description);
  });

  // Looping through each div to grab the time, compare it to the current time, and change the class. We also display any saved descriptions from localstorage here
  scheduleEl.children("div").each(function () {
    var parentId = $(this).attr("id");
    var parentHour = parseInt(parentId.split("-")[1]);
    var storedDescription = localStorage.getItem(parentId);

    if (currentHour < parentHour) {
      $(this).addClass("future");
    } else if (currentHour == parentHour) {
      $(this).addClass("present");
    } else {
      $(this).addClass("past");
    }

    if (storedDescription !== null) {
      $(this).children(".description").text(storedDescription);
    }
  });

  // Displaying the current day
  $("#currentDay").text(today.format("dddd, MMM D"));
});
