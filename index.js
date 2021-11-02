const { response } = require('express');
const express = require('express');
const { DB } = require('./config.js');

const db = require("./dbConnectExec.js");

const app = express ();

app.listen(5000,()=> {
     console.log(`app is running on port 5000`) 
});

//we can make as many get or post routes as we want 
app.get("/hi",(req,res)=>{
    res.send("Hello World");
});

app.get("/", (req,res)=> {

    res.send("API is running");
});


// app.post()
// app.put()

app.get("/movies", (req,res)=>{
    //get data from database
    db.executeQuery(`SELECT * 
    FROM Movie 
    LEFT JOIN Genre 
    ON Genre.GenrePK = Movie.GenreFK`)
    .then((theResults)=>{
        res.status(200).send(theResults);
    }).catch((myError)=>{
        console.log(myError);
        res.status(500).send();
    });

});

app.get("/movie/:pk",(req,res)=>{

    let pk = req.params.pk;
let myQuery =  `SELECT * 
FROM Movie 
LEFT JOIN Genre 
ON Genre.GenrePK = Movie.GenreFK
where MoviePK = ${pk}`

db.executeQuery(myQuery)
.then((result)=>{
    // console.log("result",result);

    if(result[0]){
        res.send(result[0]);
    }else {
        res.status(404).send(`bad request`);
    }
}).catch((err)=>{
    console.log("Error in /movies/:pk",err);
    res.status(500).send();
});

});

