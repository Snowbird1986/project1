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

  
  var apiKeyOnboard = "9c3b42979280ab6f8e1f5a4e7c01c591"
  var apiKeyCanary = "test_PS7RMDTG53J5POFG3DEI"
  var apiSecretCanary = "wFH3N1tESMmwRQMMOUfJI75daTEa1SgS"
  var postData = [{'address': '10851 MASTIN BLVD',
                   'zipcode': '66210',
                    'format':'JSON',        
                    username: apiKeyCanary,
                    password: apiSecretCanary}]

    var searchTerm = "address1=10851%20MASTIN%20BLVD&address2=OVERLAND%20PARK%2C%20KS%2066210";
    var queryURLOnboard = "https://search.onboard-apis.com/propertyapi/v1.0.0/property/address?" + searchTerm + "&radius=1&propertytype=SFR&orderby=distance&page=1&pagesize=100"
    var queryURLCanary = "https://api.housecanary.com/v2/property/on_market?address=123+Main+St&zipcode=94132"
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
        method: "GET"
    }).then(function(response) {

        // YOUR CODE GOES HERE!!!
        console.log(response)
        var results = response.property

        // ========================

        for (var i = 0; i < results.length; i++) {
            var row = $("<div>").addClass("row train-view")
            var addressCol = $("<div>").addClass("col-md-4")
            var commuteCol = $("<div>").addClass("col-md-2")
            var priceCol = $("<div>").addClass("col-md-2")
            var footageCol = $("<div>").addClass("col-md-2")
            var bathCol = $("<div>").addClass("col-md-1")
            var bedCol = $("<div>").addClass("col-md-1")
            var p = $("<p>").attr("id", i)
            var addr = results[i].address.oneLine
            p.append(addr)
            addressCol.append(p)
            row.append(addressCol)
            $("#addTrains").append(row)

        };
    });
    // response = requests.post(queryURLCanary, params=postData, auth=(apiKeyCanary, apiSecretCanary))
    $.ajax({
        url: queryURLCanary,
        // username: apiKeyCanary,
        // password: apiSecretCanary,
        // // auth: {
        // //     user: apiKeyCanary,
        // //     pass: apiSecretCanary
        // // },
        // headers: {
        //     "Access-Control-Allow-Origin": "housecanary.com",
        //     "Authorization": "Basic " + btoa(apiKeyCanary + ":" + apiSecretCanary)
        //   },
        //   crossDomain: true,
        // body: postData,
        // json: true,
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader("Access-Control-Allow-Origin", "housecanary.com");
            xhr.setRequestHeader("user", apiKeyCanary);
            xhr.setRequestHeader("pass", apiSecretCanary);
            xhr.setRequestHeader("Accept", "application/json");
           },
        // data: {
        //     format: "JSON",
        //     'api-key': apiKey
        // },
        method: "POST"
    }).then(function(response) {

        // YOUR CODE GOES HERE!!!
        console.log(response)
        var resultsCanary = response.property

        // ========================

        for (var i = 0; i < resultsCanary.length; i++) {
        // var searcDiv = $("<div>").addClass("col-md-3")
        // var p = $("<p>").text("Rating: " + results[i].rating);
        // var searchImage = $("<img>").attr("src", results[i].images.fixed_height_still.url).attr("data-still",results[i].images.fixed_height_still.url).attr("data-animate",results[i].images.fixed_height.url).attr("data-state","still").addClass("gif")
        // searcDiv.append(p);
        // searcDiv.append(searchImage);
        // $("#gif-view").prepend(searcDiv)


        };
    }).catch(err =>{ console.log(err)});
});
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