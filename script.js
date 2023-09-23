var today = dayjs();
var currentHour = dayjs().format("H");
console.log(currentHour);

$(function () {
  var scheduleEl = $("#schedule");

  $(".saveBtn").on("click", function () {
    var description = $(this).siblings(".description").val();
    var hourID = $(this).parent("div").attr("id");
    localStorage.setItem(hourID, description);
  });

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

  $("#currentDay").text(today.format("dddd, MMM D"));
});
