
var express = require('express');
var app = express.Router();

/////// firebase
var admin = require("firebase-admin");
var serviceAccount = require("../bin/ServiceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "firebase-adminsdk-gtmh5@appnotification-999.iam.gserviceaccount.com"
});

var firestore = admin.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);
/////////////

app.get("/get", async function(req, res){

    var userId = "user_id_1";
    var notification ={
        'title'  : "NodeJs",
        'message': "Hello",
        'createdTime' : new Date()
    };

    try{

        var userRef = firestore.collection(userId);
        var result = await userRef.add(notification);

        res.end(result.toString());
    }catch(error){
        res.end(error.toString());
    }
});

module.exports = app;