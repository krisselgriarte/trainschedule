 var config = {
    apiKey: "AIzaSyDbotp00a7DFniAd2J66kcUPI3qeryMmNM",
    authDomain: "train-schedule-984bf.firebaseapp.com",
    databaseURL: "https://train-schedule-984bf.firebaseio.com",
    projectId: "train-schedule-984bf",
    storageBucket: "train-schedule-984bf.appspot.com",
    messagingSenderId: "663741745061"
  };
  firebase.initializeApp(config);

var database= firebase.database(); 
   
// Button for adding trains
$("#addTrainBtn").on("click", function() {

    // Grabs user input
    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrainUnix = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
    var frequency = $("#frequencyInput").val().trim();

    // Creates local "temporary" object for holding train data
    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrainUnix,
        frequency: frequency
    }

    // Upload to the database
    database.ref().push(newTrain);

    // Log  everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(firstTrainUnix);
    console.log(newTrain.frequency)

    // Alert
    alert("Your train has been added! Enjoy Your Ride");

    // Clears all text-boxes
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainInput").val("");
    $("#frequencyInput").val("");

    //  Calculates when next train arrives.
    return false;
});


// Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    //bank
    var tName = childSnapshot.val().name;
    var tDestination = childSnapshot.val().destination;
    var tFrequency = childSnapshot.val().frequency;
    var tFirstTrain = childSnapshot.val().firstTrain;

    //Calculate 
    var differenceTimes = moment().diff(moment.unix(tFirstTrain), "minutes");
    var tRemainder = moment().diff(moment.unix(tFirstTrain), "minutes") % tFrequency;
    var tMinutes = parseInt(tFrequency) - parseInt(tRemainder);


    var tArrival = moment().add(tMinutes, "m").format("hh:mm A");
    console.log(tMinutes);
    console.log(tArrival);

    console.log(moment().format("hh:mm A"));
    console.log(tArrival);
    console.log(moment().format("X"));

    // Add train's data 
    $("#trainTable > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" + tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");

});