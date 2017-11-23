# Project4

## Krav

* Webapplikasjonen skal kjøres på gruppas virtuelle maskin og bruke node.js på serversiden, og skal være utviklet i Angular (bruk v2 eller v4, https://angular.io ). Det er selvsagt greit å i tillegg bruke andre bibliotek eller løsninger som dere finner hensiktsmessig.
  * Vi har brukt Angular v4, i tillegg til andre bibloteker.

* I webappliksjonen skal det inngå en backend database som kjøres på gruppas virtuelle maskin. Type database og hvordan denne brukes er opp til dere å bestemme, men grensesnittet til databasen skal være godt designet ihht. god praksis (bruk av REST ea).  

  * Vi bruker mongodb som database. Vi har en database på 1000 filmer fra 2006 til 2016, fra https://www.kaggle.com/PromptCloudHQ/imdb-data.
 Vi har prøvd å følge gode praksiser ved REST. brukerinfo blir også lagret i Mongodb, og passord er hashet.
* Dere skal demonstrere både skriving og lesing til databasen fra webapplikasjonen inklusive en form for søk (i praksis dynamisk brukerdefinert utvalg av det som skal vises). Generelt er det mye artigere å jobbe med en datamengde som gir et realistisk inntrykk (eksempevis mulig å søke på forskjellige ting og få resultatsett som er forskjellige og har forskjellig antall). Bruk data dere finner på web, eller lag egne data.
  * Vi har tatt i bruk lesing fra database når vi for eksempel henter ut filmer, og filtrere på ulike parameter.
  Vi skriver når vi registreren en bruker og når vi for eksempel setter en favorittfilm.
* Brukergrensensittet skal ha listebasert visning med få detaljer for hver enhet, og hvor målet er å vise brukeren hva som er i databasen eller hva som er resultatet av et søk. Brukeren skal ha mulighet til å se flere detaljer for hver enhet enten i et eget vindu, eller ved at listen enheten i lista har expand/collpase egenskap.

  * Vi har en liste som viser tittel, sjanger, utgivelsesår og IMDB rating. Ved å klikke på en film vil det det komme opp en popup med mer info.

* Den listebaserte visningen skal kunne sorteres på minimum to forskjellge egenskaper. Eksempel: etter at brukeren har fått returnert en liste etter et søk skal brukeren kunne bytte mellom forskjellige sorteringer.

  * Det er mulig å sortere tittel, sjanger, utgivelsesår og IMDB rating.

* Den listebaserte visningen skal kunne filtreres på minimum to forskjellge egenskaper. Eksempel: etter at brukeren har fått returnert en liste etter et søk skal brukeren kunne krysse av på en egenskap for å få begrenset antallet enheter i resultatsettet til kun de som har denne egenskapen. 

  * Det er mulig å filtrere på minimum IMDB rating, og sjanger.

* Den listebaserte visningen skal ha dynamisk lasting av data. Eksempel: etter et søk vises de 10 første treffene, men flere lastes når brukeren scroller eller ved blaing i sider. 

  * Det er implementert dynamisk lasting av type infinite scroll. Ved å skrolle ned vil det hentes flere filmer fra database. Vi henter de 10 neste filmene ved hvert kall.

* Webapplikasjonen skal ha "min side" funksjonalitet som i praksis betyr at en bruker skal kunne logge seg på og at det blir registrert noe fra brukerens søkeaktiviteten f.eks. hva brukeren har sett på tidligere eller søkene som brukeren har brukt. 

  * Vi har implementert registrering og login. Vi har tolket kravet om historikk ved at på profilsiden kan man se filmer man har likt.

* Webapplisjonen må implementere "session"-håndtering (som du f.eks. trenger for å implementere dynamisk lasting, min side, og filtrering/sortering som skal fungere med sidevisning).
  * Vi har implementert session-håndtering ved local Storage, en annen mulighet er å bruke cookies. Her blir brukeren lagret, sammen med JSON Web Token. Session utgår etter 1 uke. Routingen til min side er beskyttet, og det er ikke mulig å like en film uten å være logget inn.

* Webapplikasjonen skal ha et litt "fancy" alternativ visning av listen f.eks. visning på kart eller visuell grafisk fremstilling av data, ordsky ea.

  * Vi har implementert en graf som viser fordelingen av filmer basert på rating, denne er dynamisk basert på filter og søkeord.

* Kode skal være testet og funksjonaliteten skal være godt utprøvd og feilfri. 
  * Det har blitt skrevet unit tester til komponentene, og e2e tester. De er i e2e mappen. Vi har også nå mocket data (filmer), slik som ble foreslått av andre på test tilbakemeldingene. 


* Prosjektet skal være godt dokumentert, slik at det er lett å sette seg inn i for andre.



## Testing
Tests are located in each spec.ts file.

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


