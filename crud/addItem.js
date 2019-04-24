var AWS = require('aws-sdk');

AWS.config.update({
    region: "us-west-2",
    endpoint: "https://dynamodb.us-west-2.amazonaws.com"
});

var docClient = new AWS.DynamoDB.DocumentClient();
var table = "Movies";
var year = 2015;
var title = "The Big New Movie";

// Añade un item a la base de datos
function addNewItem(movie) {

    console.log("Adding a new item . . .");
    docClient.put(movie, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });

};

// Construimos el objeto a insertar
var movie = {
    TableName: table,   // Tabla donde insertamos el objeto
    Item: {             // Definición del objeto
        "year": year,
        "title": title,
        "info": {
            "plot": "Nothing happens at all.",
            "rating": 0
        }
    }
};

addNewItem(movie);