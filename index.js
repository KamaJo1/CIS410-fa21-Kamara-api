const express = require('express');

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