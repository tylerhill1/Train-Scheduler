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

var query = firebase.database().ref("existingTrains").orderByKey();
query.once("value")
    .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        // key will be "ada" the first time and "alan" the second time
        var key = childSnapshot.key;
        
        // childData will be the actual contents of the child
        var childData = childSnapshot.val();
        console.log(childData.destination);

        var newPoint = $("tr");

        var newRow = $("th");
        newRow.attr("scope", "row");
        newRow.text(childData.name);
        newPoint.append(newRow);
        
        var newDest = $("td");
        newDest.text(childData.destination);
        newPoint.append(newDest);

        var newFirstTime = $("td");
        newFirstTime.text(childData.firstTime);
        newPoint.append(newFirstTime);

        var newInterval = $("td");
        newInterval.text(childData.interval);
        newPoint.append(newInterval);

        $("tBody").append(newPoint);


    });
});


$("#submit").on("click", function(event) {
    event.preventDefault();

    var trainName = $("#train-name").val().trim();
    var trainDestination = $("#destination").val().trim();
    var trainFirstTime = $("#first-train-time").val().trim();
    var trainInterval = $("#frequency").val().trim();
    console.log(trainName);
    // trains
        var train = {
            name: trainName,
            destination: trainDestination,
            firstTime: trainFirstTime,
            interval: trainInterval,
        }
    
    
   // Create a new post reference with an auto-generated id
   var ref = firebase.database().ref("existingTrains");
   ref.push(train);














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
  });