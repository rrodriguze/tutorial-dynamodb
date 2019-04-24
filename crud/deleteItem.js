var AWS = require('aws-sdk');

AWS.config.update({
    region: "us-west-2",
    endpoint: "https://dynamodb.us-west-2.amazonaws.com"
});

var docClient = new AWS.DynamoDB.DocumentClient();
var table = "Movies";
var year = 2015;
var title = "The Big New Movie";

// Borra un item de la base de datos
function deleteItem(movie) {

    console.log("Attempting a conditional delete...");
    docClient.delete(movie, function(err, data) {
        if (err) {
            console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
        }
    });

};

// Construimos el objeto a recuperar con las claves
var movie = {
    TableName: table,       // Tabla donde se encuentra el item
    Key: {                  // Claves identificadoras
        "year": year,
        "title": title
    }
};

deleteItem(movie);