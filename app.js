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
    if(!req.body.fname == 0 && !req.body.lname ==0 && !req.body.email==0 ){
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
    const url ="https://us18.api.mailchimp.com/3.0/lists/6091d8d480";
    const options={
        method:"POST",
        auth:"rajat1:c1c19a92d504d269e040f18c7d63cb65-us18"
    };
    
    

    const request=https.request(url,options,function(response){

        if(response.statusCode===200 && firstName !==null){
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
  
    }else{
        res.redirect("/");
    }

});

app.post("/failure",function(req,res){
    res.redirect("/");
});


app.listen(process.env.PORT || 3000,function(){
    console.log("server started on port 3000");
});



// Api key
// c1c19a92d504d269e040f18c7d63cb65-us18

// List id
// 6091d8d480
// https://blooming-cove-13593.herokuapp.com/