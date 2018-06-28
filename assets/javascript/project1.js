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

  var locations = [

  ]
  var commutes = []
  var apiKeyOnboard = "9c3b42979280ab6f8e1f5a4e7c01c591"
  var apiKeyCanary = "S68ZQ9O1M021B25UNZY9"
  var apiSecretCanary = "ApqbTyv8g7gwOlABz3JoH21MtxsemzQU"
  var googleAPIKey = "AIzaSyB8e6gTpgvxoyBbaRGAk-V3HhmicXOyVWk"
  
  var postData = []
  var destinations =""
    // var queryURLCanary = "https://api.housecanary.com/v2/property/on_market"
    var searchTerm = "address1=10851%20MASTIN%20BLVD&address2=OVERLAND%20PARK%2C%20KS%2066210";
    var queryURLOnboard = "https://search.onboard-apis.com/propertyapi/v1.0.0/property/address?" + searchTerm + "&radius=1&propertytype=SFR&orderby=distance&page=1&pagesize=100"
    // var queryURLCanary = "https://api.housecanary.com/v2/property/on_market?address=10590 W 108TH TER&zipcode=66210"
    var googleMapURL = "https://maps.googleapis.com/maps/api/js?key="+googleAPIKey+"&callback=initMap"
    var origin = "10851 MASTIN BLVD OVERLAND PARK KS 66210"
    var googleDistanceURL = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins="+origin+"&destinations="+locations+"&mode=bicycwalkingling&key="+googleAPIKey

   console.log(queryURLOnboard)

    // Creates AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURLOnboard,
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader("apikey", apiKeyOnboard);
            xhr.setRequestHeader("Accept", "application/json");
       },
        // data: {
        //     format: "JSON",
        //     'api-key': apiKey
        // },
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
    
        
        console.log(postData)

        

        // YOUR CODE GOES HERE!!!
        console.log(response)
        // var results = response.property

        // ========================

        for (var i = 0; i < 25; i++) {
            // var row = $("<div>").addClass("row train-view")
            // var addressCol = $("<div>").addClass("col-md-4").attr("id", "address"+i)
            // var commuteCol = $("<div>").addClass("col-md-2").attr("id", "commute"+i)
            // var priceCol = $("<div>").addClass("col-md-2").attr("id", "price"+i)
            // var footageCol = $("<div>").addClass("col-md-2").attr("id", "footage"+i)
            // var bathCol = $("<div>").addClass("col-md-1").attr("id", "bath"+i)
            // var bedCol = $("<div>").addClass("col-md-1").attr("id", "bed"+i)
            // var p = $("<p>").attr("id", i)
            var address = results[i].address.oneLine
            // p.append(address)
            // addressCol.append(p)
            // row.append(addressCol).append(commuteCol).append(priceCol).append(priceCol).append(footageCol).append(bathCol).append(bedCol)
            // $("#addTrains").append(row)
            var location = {lat:  results[i].location.latitude,  lng:  results[i].location.longitude};
            destination =results[i].location.latitude+"%2C"+results[i].location.longitude+"%7C"
            // console.log(destination)
            destinations += destination
            // console.log(destinations)
            // locations.push(location)

            database.ref().push({
                locations: location,
                destinations: destination,
                addresses: address,
              });
            googleDistanceURL = "https://maps.googleapis.com/maps/api/distancematrix/json?origins="+origin+"&destinations="+destination+"&mode=walking&key="+googleAPIKey
            $.ajax({
                url: googleDistanceURL,
                method: "GET",
                
            }).then(function(responseGoogleDist) {
                console.log(responseGoogleDist)
                var resultsGoogleDist = responseGoogleDist.rows
                commute=resultsGoogleDist[0].elements[0].duration.text
                commutes.push(resultsGoogleDist[0].elements[0].duration.text)
                database.ref().push({
                    commutes:commute,
                  });
                // console.log(commutes)
            });
            // commuteCol.append(commutes[i])
            // $("#addTrains").append(row)
            

            // googleDistanceURL = "https://maps.googleapis.com/maps/api/distancematrix/json?origins="+origin+"&destinations="+destinations+"&mode=walking&key="+googleAPIKey
            
        };
        console.log(locations)
        console.log(commutes)
        // for(var k = 0; k < commutes.length; k++){
        //     $("#commute"+k).text(commutes[k])
        // }
    });
    database.ref().on("child_added", function(childSnapshot) {
      
        // Log everything that's coming out of snapshot
        console.log(childSnapshot.val().locations);
        console.log(childSnapshot.val().destinations);
        console.log(childSnapshot.val().commutes);
        console.log(childSnapshot.val().addresses);

        
        // full list of items to the well
        // $("#addTrains").append("<div class='row'><div class='col-md-4'> " + childSnapshot.val().addresses +
        //   " </div><div class='col-md-2'> " + childSnapshot.val().commutes +
        //     " </div><div class='col-md-2'> " + childSnapshot.val().prices +
        //       " </div><div class='col-md-2'> " + childSnapshot.val().footages +
        //       " </div><div class='col-md-1'> " + childSnapshot.val().bedrooms +
        //       " </div><div class='col-md-1'> " + childSnapshot.val().baths + " </div></div>");
              
        // Handle the errors
      }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
      });
    database.ref().on("value", function(snapshot){
        $("#addTrains").append("<div class='row'><div class='col-md-4'> " + snapshot.val().addresses +
          " </div><div class='col-md-2'> " + snapshot.val().commutes +
            " </div><div class='col-md-2'> " + snapshot.val().prices +
              " </div><div class='col-md-2'> " + snapshot.val().footages +
              " </div><div class='col-md-1'> " + snapshot.val().bedrooms +
              " </div><div class='col-md-1'> " + snapshot.val().baths + " </div></div>");
            },function(errorObject) {
                console.log("Errors handled: " + errorObject.code);
              });
    // googleDistanceURL = "https://maps.googleapis.com/maps/api/distancematrix/json?origins="+origin+"&destinations="+locations+"&mode=walking&key="+googleAPIKey
    // googleDistanceURL = "https://maps.googleapis.com/maps/api/distancematrix/json?origins="+origin+"&destinations=38.929489%2C-94.708076%7C38.929214%2C-94.708081%7C38.930466%2C-94.709072%7C38.930538%2C-94.709192%7C38.930159%2C-94.709180%7C38.930589%2C-94.709306%7C38.930589%2C-94.709306%7C38.930223%2C-94.709258%7C38.930269%2C-94.709302%7C38.930627%2C-94.709407%7C38.930317%2C-94.709397%7C38.936427%2C-94.698739%7C38.936425%2C-94.698705%7C38.936422%2C-94.698671%7C38.930351%2C-94.709480%7C38.930656%2C-94.709554%7C38.930377%2C-94.709545%7C38.930670%2C-94.709670%7C38.930392%2C-94.709656%7C38.930682%2C-94.709782%7C38.930404%2C-94.709763%7C38.936698%2C-94.698673%7C38.936695%2C-94.698639%7C38.936383%2C-94.697846%7C38.936382%2C-94.697812%7C&mode=walking&key="+googleAPIKey
    // console.log(googleDistanceURL)
    // $.ajax({
    //     url: googleDistanceURL,
    //     "destination_addresses": [locations],
    //     "origin_addresses": [origin],
    //     method: "GET"
    // }).then(function(responseGoogleDist) {
    //     console.log(responseGoogleDist)
    //     var resultsGoogleDist = response.rows
        

    // });
//     var distance_text = calculateDistance(origin, locations)
//     function calculateDistance(origin, locations) {
//     service = new google.maps.DistanceMatrixService();
//     service.getDistanceMatrix(
//     {
//         origins: [origin],
//         destinations: [locations],
//         travelMode: 'WALKING',
//         transitOptions: TransitOptions,
//         drivingOptions: DrivingOptions,
//         unitSystem: UnitSystem,
//         avoidHighways: Boolean,
//         avoidTolls: Boolean,
//     }, callback);
// }


//     function callback(response, status) {
//         if (status == 'OK') {
//           var origins = response.originAddresses;
//           var destinations = response.destinationAddresses;
      
//           for (var i = 0; i < origins.length; i++) {
//             var results = response.rows[i].elements;
//             for (var j = 0; j < results.length; j++) {
//               var element = results[j];
//               var distance = element.distance.text;
//               var duration = element.duration.text;
//               var from = origins[i];
//               var to = destinations[j];
//             }
//           }
//         }
//       }
    
    

    // response = requests.post(queryURLCanary, params=postData, auth=(apiKeyCanary, apiSecretCanary))
    // $.ajax({
    //     url: queryURLCanary,
    //     headers: {
    //         "Authorization": "Basic " + btoa(apiKeyCanary + ":" + apiSecretCanary)
    //       },
    //     method: "GET"
    // }).then(function(response) {

    //     // YOUR CODE GOES HERE!!!
    //     console.log(response)
    //     var resultsCanary = response.property

    //     // ========================

    //     for (var j = 0; j < resultsCanary.length; j++) {

    //     };
    // }).catch(err =>{ console.log(err)});
    // console.log(postData)
    // for(k=0; k<5;k++){
    // var queryURLCanary = "https://api.housecanary.com/v2/property/on_market?address="+postData[k].address+"&zipcode="+postdata[k].zipcode
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

        
    // }).catch(err =>{ console.log(err)});}






    function initMap() {

        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 3,
          center: {lat: -28.024, lng: 140.887}
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
      

// const request = require('request');
// const url = 'https://api.housecanary.com/v2/property/value';

// const postData = [
//   {'address': '43 Valmonte Plaza', 'zipcode': '90274'},
//   {'address': '7500 Melrose Ave', 'zipcode': '90046'}
// ];

// request.post({
//   url: url,
//   auth: {
//     user: 'my_api_key',
//     pass: 'my_api_secret'
//   },
//   body: postData,
//   json: true
// }, function (error, response, body) {
//   console.log(body);
// });
});