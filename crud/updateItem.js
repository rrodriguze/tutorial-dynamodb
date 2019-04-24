var AWS = require('aws-sdk');

AWS.config.update({
    region: "us-west-2",
    endpoint: "https://dynamodb.us-west-2.amazonaws.com"
});

var docClient = new AWS.DynamoDB.DocumentClient();
var table = "Movies";
var year = 2015;
var title = "The Big New Movie";

// Actualiza un item de la base de datos
function updateItem(movie) {

    console.log("Updating the item . . .")
    docClient.update(movie, function(err, data) {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
        }
    });

};

// Construimos el objeto a modificar
var movie_update = {
    TableName: table,       // Tabla donde se encuentra el item
    Key: {                  // Claves identificadoras
        "year": year,
        "title": title
    },
    // Expresión que asigna las actualizaciones del objeto
    UpdateExpression: "set info.rating = :r, info.plot = :p, info.actors = :a",
    // Valores que deben tomar los atributos del objeto
    ExpressionAttributeValues: {
        ":r": 5.5,
        ":p": "Everything happens all at once.",
        ":a": [ "Larry", "Moe", "Curly"]
    },
    // Retorna el objeto actualizado
    ReturnValues: "UPDATED_NEW"
};

updateItem(movie_update);

// Construimos el objeto del que queremos modificar un contador atómico
var movie_atomic = {
    TableName:table,        // Tabla donde se encuentra el item
    Key:{                   // Claves identificadoras
        "year": year,
        "title": title
    },
    // Expresión que actualiza el contador sumando el valor
    UpdateExpression: "set info.rating = info.rating + :val",
    // Aumentamos en 1 el contador
    ExpressionAttributeValues:{
        ":val": 1
    },
    // Retorna el objeto actualizado
    ReturnValues:"UPDATED_NEW"
};

updateItem(movie_atomic);

// Construimos el objeto que queremos modificar condicionalmente
var movie_conditional = {
    TableName:table,        // Tabla donde se encuentra el item
    Key:{                   // Claves identificadoras
        "year": year,
        "title": title
    },
    // Expresión que se ejecutará en caso de que la condición se cumpla
    UpdateExpression: "remove info.actors[0]",
    // Condición a cumplir
    ConditionExpression: "size(info.actors) >= :num",
    // Valores para completar la expresión de condición
    ExpressionAttributeValues:{
        ":num": 2
    },
    // Retorna el objeto actualizado
    ReturnValues:"UPDATED_NEW"
};

updateItem(movie_conditional);


