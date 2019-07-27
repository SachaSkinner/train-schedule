




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
  
  
  
  