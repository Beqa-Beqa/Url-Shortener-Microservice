# Url shortener

## Freecodecamp challenge

[Challenge Link](https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/url-shortener-microservice)
<hr/>

## Initialize app on local machine

```bash

git clone https://github.com/Beqa-Beqa/Url-Shortener-Microservice.git #Clones the repository on your machine

npm install #Installs neccessary dependencies

npm start #Runs nodemon on index.js that will let you inspect your app on localhost

```

<h4>You can POST a URL to [localhost]/api/shorturl from your [localhost] and get a JSON response with original_url and short_url properties. Here's an example: </h4>

```

{ 
  original_url : 'https://freeCodeCamp.org',
  short_url : 1
}

```

<h4>When you visit [localhost]/api/shorturl/[short_url], you will be redirected to the original URL.</h4>

<h4>if you pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain: </h4>

```

{ error: 'invalid url' }

```

<br/>
<h4>Keep in mind to create .env file and add your mongodb [MONGO_URI] variable in it with respective value</h4>