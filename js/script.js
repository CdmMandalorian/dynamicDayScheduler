var timeKeeper = [
  {
      id: "0",
      hour: "07",
      time: "07",
      ampm: "am",
      textArea: ""
  },
  {
      id: "1",
      hour: "08",
      time: "08",
      ampm: "am",
      textArea: ""
  },
  {
      id: "2",
      hour: "09",
      time: "09",
      ampm: "am",
      textArea: ""
  },
  {
      id: "3",
      hour: "10",
      time: "10",
      ampm: "am",
      textArea: ""
  },
  {
      id: "4",
      hour: "11",
      time: "11",
      ampm: "am",
      textArea: ""
  },
  {
      id: "5",
      hour: "12",
      time: "12",
      ampm: "pm",
      textArea: ""
  },
  {
      id: "6",
      hour: "01",
      time: "13",
      ampm: "pm",
      textArea: ""
  },
  {
      id: "7",
      hour: "02",
      time: "14",
      ampm: "pm",
      textArea: ""
  },
  {
      id: "8",
      hour: "03",
      time: "15",
      ampm: "pm",
      textArea: ""
  },
  {
      id: "9",
      hour: "04",
      time: "16",
      ampm: "pm",
      textArea: ""
  },{
      id: "10",
      hour: "05",
      time: "17",
      ampm: "pm",
      textArea: ""
  },
  {
      id: "11",
      hour: "06",
      time: "18",
      ampm: "pm",
      textArea: ""
  },
  {
      id: "12",
      hour: "07",
      time: "19",
      ampm: "pm",
      textArea: ""
  },

];

function init(){
  var jumbotronDateText = moment().format('dddd, MMMM Do');
  $('#currentDay').text(jumbotronDateText);

  var storedObj = JSON.parse(localStorage.getItem("timeKeeper"));
  if (storedObj) {timeKeeper = storedObj;};
  storeTextArea();
  displaySavedText();
}

function storeTextArea(){
  localStorage.setItem("timeKeeper", JSON.stringify(timeKeeper));
}

function displaySavedText(){
  timeKeeper.forEach(function (element) {
      $(`#${element.id}`).val(element.textArea);
  })
}

timeKeeper.forEach(function(element) {
 
  var newRow = $('<form>').attr({ "class": "row" });
  $('.container').append(newRow);

  var displayHourField = $('<div>')
      .text(`${element.hour}${element.ampm}`)
      .attr({ "class": "col-2 hour" });
  
  var textDiv = $('<div>').attr({ "class": "col-9 description p-0" });
  
  var newTextArea = $('<textarea>').attr("id", element.id);
  if(element.time < moment().format('HH')) {newTextArea.attr("class", "past");}
  if(element.time > moment().format('HH')) {newTextArea.attr('class', 'present');} 
  if(element.time === moment().format('HH')) {newTextArea.attr('class', 'future');}
  
  var saveIcon = $("<i class='far fa-save fa-lg'></i>");
  var saveButton = $('<button>').attr('class', 'col-1 saveBtn');
  
  saveButton.append(saveIcon);
  textDiv.append(newTextArea);
  newRow.append(displayHourField, textDiv, saveButton);
});

$('.saveBtn').on('click', function(event) {
  event.preventDefault();
  var saveFutureIndex = $(this).siblings('.description').children('.future').attr("id");
  var savePresentIndex = $(this).siblings('.description').children('.present').attr("id");

  if (saveFutureIndex) {
    timeKeeper[saveFutureIndex].textArea = $(this).siblings('.description').children('.future').val();  
  }

  if (savePresentIndex) {
      timeKeeper[savePresentIndex].textArea = $(this).siblings('.description').children('.present').val();
  }

  storeTextArea();
  displaySavedText();
});

init();
