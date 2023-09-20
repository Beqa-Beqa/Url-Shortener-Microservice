// Initialize app
require("dotenv").config();
const express = require("express");
const app = express();
const dns = require("dns");
const {URL} = require("url");
const UrlModel = require("./db/connect");

// Serve static files
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

// Homepage index.html
app.get("/", (req,res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// First API Endpoint
app.get("/api/hello", (req,res) => {
  res.json({greeting: "hello"});
});

// Challenge code to shorten the URL
// Post request on short url
app.post("/api/shorturl", async (req,res) => {
  const input = req.body.url;

  let parsedUrl;
  try {
    parsedUrl = new URL(input);
  } catch (error){
    console.error(error);
    return res.json({error: "invalid url"});
  }

  const hostname = parsedUrl.hostname;
  
  dns.lookup(hostname, async (err) => {
    if(err){
      return res.json({error: "invalid url"});
    } else {
      shortenAndCreateUrl(parsedUrl)
      .then(urlObject => res.json(urlObject))
      .catch(error => {
        console.log(error);
        res.json({error: error});
      });
    }
  });
});

// Get request on short url
app.get("/api/shorturl/:id", async (req,res) => {
  const {id} = req.params;
  UrlModel.findOne({short_url: id})
  .then(foundUrl => res.redirect(foundUrl.original_url))
  .catch(err => res.json({error: `short url with ${id} does not exist`}));
});

// Shorten the url and save it in mongodb database
const shortenAndCreateUrl = async (url) => {
  const id = await generateUniqueId().then(id => id).catch(err => console.log(err));
  const object = {
    original_url: url,
    short_url: id
  }

  await UrlModel.create(object);
  return object;
}

// Generates unique id based on database
const generateUniqueId = async () => {
  let id = 0;
  let isUnique = false;

  while(!isUnique){
    id++;
    const item = await UrlModel.findOne({short_url: id});

    if(!item){
      isUnique = true;
    }
  }

  return id;
}

// Create port and listen to server on the port
const port = process.env.PORT || 3000;

app.listen(port, () =>{
  console.log(`Server is litening on port ${port}`);
});