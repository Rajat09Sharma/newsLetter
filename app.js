const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const request = require("request");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));


// the below code is use to attach static file with get like style.css.
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    const firstName=req.body.fname;
    const lastName=req.body.lname;
    const email=req.body.email;

    const data={
        members:[
            {
                email_address : email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
            
        ]
    };

    const jsonData=JSON.stringify(data);
    const url ="https://us18.api.mailchimp.com/3.0/lists/fd40b5d4df";
    const options={
        method:"POST",
        auth:"rajat1:de9225de3e842ab13ac2be830f9ce44e-us18"
    };
    
    

    const request=https.request(url,options,function(response){

        if(response.statusCode===200){
        res.sendFile(__dirname+"/success.html");
        }
        else{
        res.sendFile(__dirname+"/failure.html");
        }

        response.on("data",function(data){
            console.log(JSON.parse(data));
        });

    });

     request.write(jsonData);
    request.end();
  
});

app.post("/failure",function(req,res){
    res.redirect("/");
});


app.listen(process.env.PORT || 3000,function(){
    console.log("server started on port 3000");
});



// Api key
// de9225de3e842ab13ac2be830f9ce44e-us18

// List id
// fd40b5d4df
// https://blooming-cove-13593.herokuapp.com/