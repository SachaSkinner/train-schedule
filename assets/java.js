




  var firebaseConfig = {
    apiKey: "AIzaSyA9dF84zLBGjhNOw6l-Pv479UKLVY-rSWo",
    authDomain: "greatstart-e724e.firebaseapp.com",
    databaseURL: "https://greatstart-e724e.firebaseio.com",
    projectId: "greatstart-e724e",
    storageBucket: "",
    messagingSenderId: "797759222663",
    appId: "1:797759222663:web:a5d379802b8c0e75"
  };
 
firebase.initializeApp(firebaseConfig);
var database = firebase.database();



  // 2. Button for adding trains
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trName = $("#train-name-input").val().trim();
    var trDestination = $("#destination-input").val().trim();
    var trStart = moment($("#start-input").val().trim(), "HH:mm").format("hh:mm A");
    var trFrequency = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trName,
      destination: trDestination,
      start: trStart,
      frequency: trFrequency
    };
  
    // Uploads train data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.start);
    console.log(newTrain.frequency);
  
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");
  });
  
  
  // 3. Create Firebase event for adding a train to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trName = childSnapshot.val().name;
    var trDestination = childSnapshot.val().destination;
    var trStart = childSnapshot.val().start;
    var trFrequency = childSnapshot.val().frequency;
  
    // Employee Info
    console.log(trName);
    console.log(trDestination);
    console.log(trStart);
    console.log(trFrequency);
  
    // Prettify the train start
    
    var now = moment();
    // 17:24 today
    var nextTrainMoment = moment(trStart, "hh:mm A");
    // 06:00 am
    while(nextTrainMoment.isBefore(now)){
        
        nextTrainMoment.add(trFrequency, 'm');
    }
    var nextTrain = nextTrainMoment.format("hh:mm A");
    console.log(nextTrain);
   
    var minAway = moment(nextTrain, "hh:mm A").diff(moment(), "m");

    console.log(minAway);

    
  
   
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trName),
      $("<td>").text(trDestination),
      $("<td>").text(trFrequency),

      $("<td>").text(nextTrain),
      $("<td>").text(minAway),
     
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
  