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


// Initial Values
var trainName = '';
var trainDestination = '';
var trainFirstTime = '';
var trainFrequency = '';

// Capture Button Click
$('#submit').on('click', function(event) {
  event.preventDefault();

  // YOUR TASK!!!
  // Code in the logic for storing and retrieving the most recent user.
  // Don't forget to provide initial data to your Firebase database.
  var trainName = $("#train-name").val().trim();
  var trainDestination = $("#destination").val().trim();
  var trainFirstTime = $("#first-train-time").val().trim();
  var trainFrequency = $("#frequency").val().trim();

  // Code for the push
  database.ref().push({
    name: trainName,
    destination: trainDestination,
    firstTime: trainFirstTime,
    frequency: trainFrequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });
});

// // First Time (pushed back 1 year to make sure it comes before current time)
//   var firstTimeConverted = moment(trainFirstTime, "HH:mm").subtract(1, "years");
//   console.log(firstTimeConverted);

//   // Current Time
//   var currentTime = moment();
//   console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

//   // Difference between the times
//   var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
//   console.log("DIFFERENCE IN TIME: " + diffTime);

//   // Time apart (remainder)
//   var trainRemainder = diffTime % trainFrequency;
//   console.log(trainRemainder);

//   // Minute Until Train
//   var tMinutesTillTrain = trainFrequency - trainRemainder;
//   console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

//   // Next Train
//   var nextTrain = moment().add(tMinutesTillTrain, "minutes");
//   console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

// var query = firebase.database().ref("existingTrains").orderByKey();
// query.once("value")
//     .then(function(snapshot) {
//     snapshot.forEach(function(childSnapshot) {
//         // key will be "ada" the first time and "alan" the second time
//         var key = childSnapshot.key;
        
//         // childData will be the actual contents of the child
//         var childData = childSnapshot.val();
//         console.log(childData.destination);

//       


//     });
// });


// $("#submit").on("click", function(event) {
//     event.preventDefault();

//     var trainName = $("#train-name").val().trim();
//     var trainDestination = $("#destination").val().trim();
//     var trainFirstTime = $("#first-train-time").val().trim();
//     var trainInterval = $("#frequency").val().trim();
//     console.log(trainName);
//     // trains
//         var train = {
//             name: trainName,
//             destination: trainDestination,
//             firstTime: trainFirstTime,
//             frequency: trainInterval,
//         }
    
    
//    // Create a new post reference with an auto-generated id
//    var ref = firebase.database().ref("existingTrains");
//    ref.push(train);

// });


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
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  var newPoint = $("tr");

  var newRow = $("th");
  newRow.attr("scope", "row");
  newRow.text(childSnapshot.val().name);
  newPoint.append(newRow);
  
  var newDest = $("td");
  newDest.text(childSnapshot.val().destination);
  newPoint.append(newDest);

  var newFrequency = $("td");
  newFrequency.text(childSnapshot.val().frequency);
  newPoint.append(newFrequency);

  var newNextTrain = $("td");
  newNextTrain.text(nextTrain);
  newPoint.append(newNextTrain);

  var newMinutesAway = $("td");
  newMinutesAway.text(tMinutesTillTrain);
  newPoint.append(newMinutesAway);

  $("tBody").append(newPoint);

    //   // full list of items to the well
    //   $('#full-member-list').append(
    //     "<div class='well'><span class='member-name'> " +
    //       childSnapshot.val().name +
    //       " </span><span class='member-email'> " +
    //       childSnapshot.val().email +
    //       " </span><span class='member-age'> " +
    //       childSnapshot.val().age +
    //       " </span><span class='member-comment'> " +
    //       childSnapshot.val().comment +
    //       ' </span></div>'
    //   );

      // Handle the errors
    },
    function(errorObject) {
      console.log('Errors handled: ' + errorObject.code);
    }
  );

//   dataRef
//     .ref()
//     .orderByChild('dateAdded')
//     .limitToLast(1)
//     .on('child_added', function(snapshot) {
//       // Change the HTML to reflect
//       $('#name-display').text(snapshot.val().name);
//       $('#email-display').text(snapshot.val().email);
//       $('#age-display').text(snapshot.val().age);
//       $('#comment-display').text(snapshot.val().comment);
//     });












// database.ref().on("value", function(snapshot) {

//     if (snapshot.child("highBidder").exists() && snapshot.child("highPrice").exists()) {
//       // Set the variables for highBidder/highPrice equal to the stored values.
//       highBidder = snapshot.val().highBidder;
//       highPrice = parseInt(snapshot.val().highPrice);
//     }
  
//     // If Firebase does not have highPrice and highBidder values stored, they remain the same as the
//     // values we set when we initialized the variables.
//     // In either case, we want to log the values to console and display them on the page.
//     console.log(highBidder);
//     console.log(highPrice);
//     $("#highest-bidder").text(highBidder);
//     $("#highest-price").text(highPrice);
  
//     // If any errors are experienced, log them to console.
//   }, function(errorObject) {
//     console.log("The read failed: " + errorObject.code);
//   });

// // Whenever a user clicks the submit-bid

// $("#submit-bid").on("click", function(event) {
//     event.preventDefault();
//     // Get the input values
//     var bidderName = $("#bidder-name").val().trim();
//     var bidderPrice = parseInt($("#bidder-price").val().trim());
  
//     // Log the Bidder and Price (Even if not the highest)
//     console.log(bidderName);
//     console.log(bidderPrice);
  
//     if (bidderPrice > highPrice) {
  
//       // Alert
//       alert("You are now the highest bidder.");
  
//       // Save the new price in Firebase. This will cause our "value" callback above to fire and update
//       // the UI.
//       database.ref().set({
//         highBidder: bidderName,
//         highPrice: bidderPrice
//       });
  
//       // Log the new High Price
//       console.log("New High Price!");
//       console.log(bidderName);
//       console.log(bidderPrice);
//     }
  
//     else {
  
//       // Alert
//       alert("Sorry that bid is too low. Try again.");
//     }