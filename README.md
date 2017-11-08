# Project4

## Description
Welcome to our project! 
We are AnanAS, and we have created a movie database website (much like IMDB), except ours is called AMDB (Ananas Movie DataBase).
In our application you can search through 1000 movies, sort alphabetically on title, and genre. You can also sort by release year.
Our filters include a genre selector, and our plan is to implement a rating slider. This means you can select a rating and the list will update itself
with movies including that rating. If you click on a movie in the list, a module will open and show you additional information.  
So basically our site has everything you need for the perfect movie night.  

Our site has a working register, and login page. It stores the user in the database and it also hashes the password.
When a user logs in, the session is stored in local storage. A unique token is generated and is needed for the user to be able to
access his or her profile. The routes are also protected. The user can logout as well, and we have implemented some validation in our forms.

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
The guards folder just protects our routes, and the services contain the authentication and validation. 

We use bootstrap for some of the front-end elements. We used the "slate" theme from bootswatch.com  

Check out our project structure and let us know what you think.

## Future updates
We have already begun on our project and have come a long way. 
However, there are several requirements we still need to meet:

 1. We only have one filter so far. Our plan is to implement a rating slider, where the user can choose a rating and see corresponding movies in the list.
 2. The site does not have dynamic loading of data yet. By switching the page in the list, the website should then load the next 10 movies, and so on.
 3. Our page has a "My profile" page, and it handles sessions securely. However, we need to add favorite movies on the profile page. 
 This means that a user should be able to select a favorite movie in the list, and we save it to the database and display it on profile. 
 4. Our list still needs a "fancy" way of display. We plan to implement some sort of animations and we are working out a way to try to make something that makes sense. 
 5. We are also going to write some tests, and prepare for next week. In our spec.ts files we can write tests and Angular-Cli and Karma can help us test our components. 
 

## Run our project
  1. Insert popcorn into microwave.
  2. Download the github repo. 
  2. Go to that folder in cmd/terminal
  3. Run npm install
  4. Run npm build run
  5. Grab your popcorn and enjoy!
  
  (Update: due to recent changes in the bootswatch file, the navbar (and pretty much the whole css) doesn't work. We are working on it.)

## API reference

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

``` 
GET /api/Movies/:id
```
Get details for a specific movie.

# Data
Our models folder contains a model for users
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



