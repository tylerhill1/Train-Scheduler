// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAeNEfRD_08ikvc7sqaSGdMT5Yw5xGpVyY",
    authDomain: "train-scheduler-1e2f2.firebaseapp.com",
    databaseURL: "https://train-scheduler-1e2f2.firebaseio.com",
    projectId: "train-scheduler-1e2f2",
    storageBucket: "",
    messagingSenderId: "118844283295",
    appId: "1:118844283295:web:3638cea39dc2ca14"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();


var trainName = '';
var trainDestination = '';
var trainFirstTime = '';
var trainFrequency = '';

$('#submit').on('click', function(event) {
  event.preventDefault();

  var trainName = $("#train-name").val().trim();
  var trainDestination = $("#destination").val().trim();
  var trainFirstTime = $("#first-train-time").val().trim();
  var trainFrequency = $("#frequency").val().trim();

  if (trainName!="" && trainDestination!="" && trainFirstTime!="" && trainFrequency!=""){
  // Code for the push
  database.ref().push({
    name: trainName,
    destination: trainDestination,
    firstTime: trainFirstTime,
    frequency: trainFrequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });

    }   
    
  $("#train-name").val("");
  $("#destination").val("");
  $("#first-train-time").val("");
  $("#frequency").val("");

});


  // Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
  database.ref().on(
    'child_added',
    function(childSnapshot) {

      // Log everything that's coming out of snapshot
      console.log(childSnapshot.val().name);
      console.log(childSnapshot.val().destination);
      console.log(childSnapshot.val().firstTime);
      console.log(childSnapshot.val().frequency);
      console.log(childSnapshot.val().dateAdded);

      var trainFirstTime = childSnapshot.val().firstTime;
      var trainFrequency = childSnapshot.val().frequency;

    // First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(trainFirstTime, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var trainRemainder = diffTime % trainFrequency;
  console.log(trainRemainder);

  // Minute Until Train
  var tMinutesTillTrain = trainFrequency - trainRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var nextTrainTime = moment().add(tMinutesTillTrain, "minutes");
  var nextTrain = moment(nextTrainTime).format("hh:mm");
  console.log("ARRIVAL TIME: " + moment(nextTrainTime).format("hh:mm"));

  var newPoint = $("<tr>");

  var newRow = $("<th>");
  newRow.attr("scope", "row");
  newRow.text(childSnapshot.val().name);
  newPoint.append(newRow);
  
  var newDest = $("<td>");
  newDest.text(childSnapshot.val().destination);
  newPoint.append(newDest);

  var newFrequency = $("<td>");
  newFrequency.text(childSnapshot.val().frequency);
  newPoint.append(newFrequency);

  var newNextTrain = $("<td>");
  newNextTrain.text(nextTrain);
  newPoint.append(newNextTrain);

  var newMinutesAway = $("<td>");
  newMinutesAway.text(tMinutesTillTrain);
  newPoint.append(newMinutesAway);

  $("#new-rows").append(newPoint);
    
  console.log("new POINT: " + newPoint);

    },
    function(errorObject) {
      console.log('Errors handled: ' + errorObject.code);
    }
  );