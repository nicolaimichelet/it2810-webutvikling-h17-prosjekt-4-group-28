# Project4

## Description
Welcome to our project! 

Our application is live on http://it2810-28.idi.ntnu.no:8084/ 

We are AnanAS, and we have created a movie database website (much like IMDB), except ours is called AMDB (Ananas Movie DataBase).
In our application you can search through 1000 movies, sort alphabetically on title, genre, and sort by rating and year (both ascending and descending).
Our filters include a genre selector, a rating slider. This means you can select a minimum rating on the slider and the list will update itself
with movies including and above that rating. We also have a nice, fancy rating graph. It shows you the distribution of movies by rating. 

If you click on a movie in the list, a module will open and show you additional information.  
So basically our site has everything you need for the perfect movie night.  

Our site stores the user in the database and it also hashes the password.
When a user logs in, the session is stored in local storage. A unique token is generated and is needed for the user to be able to
access his or her profile. The routes are also protected. The user can logout as well, and we have implemented validation in our forms.

## Implementation (Our solution)
This project was initially generated with Angular CLI, but we are using the MEAN stack.
That MEANs (no pun intended) that we are using MongoDB, Express, Angular and Node.

1. MongoDB is a schemaless, NoSQL database system. It saves data in JSON, which makes it easy to pass data between client and server.
2. Express is a lightweight framework used to build web applications in Node. 
3. AngularJS is a JavaScript framework developed by Google.
4. Node.js is a server side JavaScript execution environment.

The data is retrieved from IMDB's api - one thousand movies from 2006-2016. It's a csv file that we imported into our database. 

We also use several plugins to help us on our way.
On top of mongoDB, we use Mongoose. Mongoose acts as an intermediate between mongodb and our NodeJs. 
In our server.js file we connect to the database with mongoose. We also define our middleware and json parsers for example. 

Our models folder defines a user, and adds a user. 
Our config folder contains the link to the secret token and our link to the database. 
Our server folder contains the rest api (all the interactions we need to interact with mongoDB). 

Inside the src folder is our project. Assets folder contains images, but the main folder is the app folder.
It contains all our components (login, navbar, register, profile, etc.). 
The guards folder just protects our routes, and the services folder contain our services. 

We use bootstrap for some of the front-end elements. We used the "slate" theme from bootswatch.com  


## Run our tests
  1. Insert popcorn into microwave.
  2. Download the github repo. 
  2. Go to that folder in cmd/terminal
  3. Run npm install
  4. Run npm test and npm e2e
  5. Grab your popcorn and enjoy!
  
## API reference 

Here are some examples of our api calls. 
### Movies
```
GET /api/Movies
```  
Get movie list
parameters:
`limit`, `page`.
Example:
```  
/api/Movies?limit=XX&&page=XX
```
Get details for a specific movie.
``` 
GET /api/Movies/:id
```


# Data
Our models folder contains a model for user.
````
const UserSchema = mongoose.Schema({
  name: {
    type: String
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});
````


