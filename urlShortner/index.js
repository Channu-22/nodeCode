// npm init -y 
// npm i express

/* 
   *** JS CONCEPT  ***
   let urls = {};
   let shortUrl = "yt123";
   let longUrl = "https://www.youtube.com";

   urls[shortUrl] = longUrl;

   Now urls = { "yt123": "https://www.youtube.com" }

*/

//req = request from user, res = response to user.

import express from "express";
// const express=require("express");
import { nanoid } from 'nanoid';
import fs from "node:fs"

// creates a new Express app. we can use this app to make your website work.
const app=express();

// https://www.quora.com/Can-you-recommend-any-websites-with-unusually-long-URLs-What-is-the-purpose-of-creating-such-long-URLs

// You won’t be able to read req.body.username — it will be undefined.
app.use(express.urlencoded());

const isUrlValid = (url) => {
    try {
        new URL(url)
        return true;
    } catch (err) {
        return false
    }
};

const urls={
    // shortUrl:longUrl
   
}

app.get("/", (req,res) =>{
    // __dirname means the current folder where your code is running.
    // This sends the file index.html to the browser.
    res.sendFile(import.meta.dirname + "/index.html")
});


app.post("/shorten" , (req,res) => {
    // console.log(req.body.longUrl);
    // console.log(nanoid(10))
     if (!isUrlValid(req.body.longUrl)) {
        res.status(400).json({
            success: false,
            message: "Inavlid URL"
        });
        return;
    }
    
    const shortUrl=nanoid(10);

    // “In the urls object, store the long URL as the value, and use the short URL as the key.”
    // urls["yt123"] = "https://www.youtube.com";
    // urls[shortUrl]=req.body.longUrl;
     // console.log(urls);

    const fileData = fs.readFileSync("urls.json");
    const urlsFromFile = JSON.parse(fileData.toString());
    urlsFromFile[shortUrl] = req.body.longUrl;

    fs.writeFileSync("urls.json", JSON.stringify(urlsFromFile));
   
    
    res.json({
        success:true,
        shortUrl:`http://localhost:8080/${shortUrl}`
    })
});
console.log(urls);

app.get("/:shortUrl",(req,res) =>{
    // console.log("something",req.params.shortUrl);
    
    // let longUrl=urls[req.params.shortUrl];

    const fileData = fs.readFileSync("urls.json");
    const urlsFromFile = JSON.parse(fileData.toString());

    const longUrl = urlsFromFile[req.params.shortUrl];
    // console.log("long url",longUrl)
    res.redirect(longUrl)

});





//  This starts the server on port 2002.
app.listen(8080,()=>{
    console.log("server is running at 8080 at portal")
})