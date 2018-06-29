$(document).ready(function(){
// Initialize Firebase

    var config = {
        apiKey: "AIzaSyDsZcPe2YbNAVIrKlgji6lu4t7ftUU18D0",
        authDomain: "project1-1529767008392.firebaseapp.com",
        databaseURL: "https://project1-1529767008392.firebaseio.com",
        projectId: "project1-1529767008392",
        storageBucket: "project1-1529767008392.appspot.com",
        messagingSenderId: "534435451804"
    };
  firebase.initializeApp(config);
  var database = firebase.database();

  var locations = []

  var apiKeyOnboard = "9c3b42979280ab6f8e1f5a4e7c01c591"
  var apiKeyCanary = "S68ZQ9O1M021B25UNZY9"
  var apiSecretCanary = "ApqbTyv8g7gwOlABz3JoH21MtxsemzQU"
  var googleAPIKey = "AIzaSyB8e6gTpgvxoyBbaRGAk-V3HhmicXOyVWk"
  
  var postData = []
  var destinations =""
  var destinations2 =[]
  var addresses =[]
  var commutes = []
    // var queryURLCanary = "https://api.housecanary.com/v2/property/on_market"
    var searchTerm = "address1=10851%20MASTIN%20BLVD&address2=OVERLAND%20PARK%2C%20KS%2066210";
    var queryURLOnboard = "https://search.onboard-apis.com/propertyapi/v1.0.0/property/address?" + searchTerm + "&radius=1&propertytype=SFR&orderby=distance&page=1&pagesize=100"

    // var queryURLCanary = "https://api.housecanary.com/v2/property/on_market?address=10590 W 108TH TER&zipcode=66210"
    var googleMapURL = "https://maps.googleapis.com/maps/api/js?key="+googleAPIKey+"&callback=initMap"
    var origin = "10851 MASTIN BLVD OVERLAND PARK KS 66210"
    var googleDistanceURL = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins="+origin+"&destinations="+locations+"&mode=bicycwalkingling&key="+googleAPIKey


   console.log(queryURLOnboard)

    // Creates AJAX call for the specific movie button being clicked
    $("#run-search").on("click", function(event) {
        // Don't refresh the page!
        event.preventDefault();
        origin = $("#commuteAddress").val().trim()+" "+$("#city").val().trim()+" "+$("#state").val().trim()+" "+$("#zip").val().trim()
        console.log(origin)
        searchTerm = "address1="+$("#commuteAddress").val().trim()+"&address2="+$("#city").val().trim()+" "+$("#state").val().trim()+" "+$("#zip").val().trim()
        console.log(searchTerm)
        queryURLOnboard = "https://search.onboard-apis.com/propertyapi/v1.0.0/property/address?" + searchTerm + "&radius=1&propertytype=SFR&orderby=distance&page=1&pagesize=100"
    $.ajax({
        url: queryURLOnboard,
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader("apikey", apiKeyOnboard);
            xhr.setRequestHeader("Accept", "application/json");
       },
        method: "GET",
        
    }).then(function(response) {
        var results = response.property
        for (var j = 0; j < 25; j++) {
            addressZip = {"address": results[j].address.line1,
                          "zipcode": results[j].address.postal1}
            postData.push(addressZip)
            
            // queryURLCanary = "https://api.housecanary.com/v2/property/on_market?address="+addressZip.address+"&zipcode="+addressZip.zipcode
            // $.ajax({
            //     url: queryURLCanary,
            //     headers: {
            //         "Authorization": "Basic " + btoa(apiKeyCanary + ":" + apiSecretCanary)
            //     },
            //     // data: postData[0],
            //     // json: true,
            //     method: "GET"
            // }).then(function(response) {
        
            //     // YOUR CODE GOES HERE!!!
            //     console.log(response)
            //     var resultsCanary = response.property
        
            //     // ========================
        
                
            // }).catch(err =>{ console.log(err)});
        }
    
        
        // console.log(postData)

        

        // YOUR CODE GOES HERE!!!
        // console.log(response)
        // var results = response.property

        // ========================

        for (var i = 0; i < 25; i++) {

            var address = results[i].address.oneLine
            addresses.push(address)
            var location = {lat:  results[i].location.latitude,  lng:  results[i].location.longitude};
            locations.push(location)
            destination = results[i].location.latitude+" "+results[i].location.longitude
            destinations2.push(destination)
            // console.log(destination)
            destinations += destination
 
        };
        var service = new google.maps.DistanceMatrixService();
            service.getDistanceMatrix(
                {
                  origins: [origin],
                  destinations: destinations2,
                  travelMode: 'WALKING',
                }, callback);
            function callback(response, status) {
                var results = response.rows[0]
                for (var k = 0; k < 25; k++) {
                    var commute = results.elements[k].duration.text
                    console.log(commute)
                    commutes.push(commute)
                }
                database.ref().push({
                    locations: locations,
                    destinations: destinations2,
                    addresses: addresses,
                    commutes: commutes,
                  });
                }
    });

    
    database.ref().on("child_added", function(childSnapshot) {
        for (var l = 0; l < childSnapshot.val().addresses.length; l++) {
        $("#addTrains").append("<div class='row'><div class='col-md-4'> " + childSnapshot.val().addresses[l] +
          " </div><div class='col-md-2'> " + childSnapshot.val().commutes[l] +
            // " </div><div class='col-md-2'> " + childSnapshot.val().prices +
            //   " </div><div class='col-md-2'> " + childSnapshot.val().footages +
            //   " </div><div class='col-md-1'> " + childSnapshot.val().bedrooms +
            //   " </div><div class='col-md-1'> " + childSnapshot.val().baths + 
              " </div></div>");
            }}
      
        // Handle the errors
      , function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
      });
    




        // Add a marker clusterer to manage the markers.
        var markerCluster = new MarkerClusterer(map, markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
      
    
    // $("#run-search").on("click", function(event) {
    // // Don't refresh the page!
    // event.preventDefault();
    // origin = $("#commuteAddress").val().trim()+" "+$("#city").val().trim()+" "+$("#state").val().trim()+" "+$("#zip").val().trim()
    // console.log(origin)
    // searchTerm = "address1=10851%20MASTIN%20BLVD&address2=OVERLAND%20PARK%2C%20KS%2066210"
    $("#commuteAddress").val("");
    $("#city").val("");
    $("#state").val("");
    $("#zip").val("");
    });
    
    $("#clear-all").on("click", function(event) {
        // Don't refresh the page!
        event.preventDefault();
        locations = []
        postData = []
        destinations = []
        destinations2 =[]
        addresses = []
        commutes = []
        database.ref().set({
            locations: locations,
            destinations: destinations2,
            addresses: addresses,
            commutes: commutes,
          });
        $("#addTrains").empty()
    });  
}); 
      
    function initMap() {

        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 3,
          center: {lat: 38.922, lng: -94.6708}
        });

        // Create an array of alphabetical characters used to label the markers.
        var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        // Add some markers to the map.
        // Note: The code uses the JavaScript Array.prototype.map() method to
        // create an array of markers based on a given "locations" array.
        // The map() method here has nothing to do with the Google Maps API.
        var markers = locations.map(function(location, i) {
          return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length]
          });
        });

        // Add a marker clusterer to manage the markers.
        var markerCluster = new MarkerClusterer(map, markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
      }

