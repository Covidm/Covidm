require('dotenv').config()
// Importing/ requiring the variables
const express = require('express')
const path = require('path');
const port =  process.env.PORT ||  3000;
const fs = require('fs')
const mysql = require('mysql');
const ejs  = require('ejs');
const passport = require('passport');
var userProfile;
 require('./auth')
 const session = require("express-session")
 const fetch = require('node-fetch');
 const axios = require('axios');
const cors = require('cors');
const { response } = require('express');
const app = express();


app.use(session({ secret: "cats" }));
app.use(passport.initialize());
app.use(passport.session());





// ngrok change when run
// const url = `http://30c5-122-179-60-232.ngrok.io/case`;

// console.log(process.env)
//  testing from git pod

// Function for the google login process

 function isloggedIn(req , res , next) {
   req.user ? next () : res.sendStatus(401);
 
 }

 function sessiondestroy(req , res){

  successRedirect: '/logout'
 }


//  passport and express innit



app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// For google and ejs

app.set('view engine', 'ejs'); 

// routes for googles login
app.get('/success', (req, res) => res.send(userProfile));
app.get('/error', (req, res) => res.send("error logging in"));

// ejs
app.set('view engine', 'ejs');



// Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js' , express.static(__dirname + 'public/js'))


// Set Views
app.set('views', './views')
app.set('login'  , './views/index.html')
app.set('view engine', 'ejs')






// ROUTES

// Cors


// app.get('/test', (req,res) => {
//   res.render('search/search' , {name: 'Udhay'});
// });


// MAP FEATURE

app.get('/user/search/map-beta-version-1' ,isloggedIn,  (req,res) => {
  res.render('map/map')
})
// indain cases

app.get('/user/search' , (req,res) => {
  axios.get("https://api-covidm.herokuapp.com/case")
  .then(function(response){
    const cases = response.data.todayCases
    const updated = response.data.updated
    const deaths = response.data.todayDeaths
    const recoverd = response.data.todayRecovered
    const active = response.data.active
    res.render('search/search' , {
      cases:cases,
      updated:updated,
      active:active,
      deaths:deaths,
      recoverd:recoverd


    })
  })
})

// Testing route

app.get('/user/asia' , (req,res) =>{
  res.render('asia/asia')
})


app.get('/list' , (req,res) => {
  fs.readFile('./views/data/testData.json' , 'utf8' , (err , data) =>{
    if(err){
      throw err;
    }
    res.send(JSON.parse(data))
  });
});

app.get('/', (req, res) => {
  // console.log("user has entered the home page")
  fs.readFile('./views/home_page/home.ejs' , function(err,data){
    res.writeHead(200, {'Context-type': 'text/html'});
    res.write(data);
    return res.end();
  })
});


app.get('/login', (req,res) => {
    fs.readFile('./views/login/login.ejs', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data)
        return res.end();
      });
});


app.get('/user' , isloggedIn,  (req , res) => {

  fs.readFile('./views/user_area/user.ejs', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    // res.write(`Hello ${req.user.displayName}`);
    res.write(data);


  
 
    return res.end();
  });
});

// SESSION LOGOUT

app.get('/user/logout' , (req,res) => {
  req.logout();
  req.session.destroy();
  fs.readFile('./views/logout/logout.ejs' , function(err,data){
    res.writeHead(200, {'Context-type': 'text/html'});
    res.write(data);
    return res.end();
  })

})

// NEED TO WORK ON THESE ROUTES
app.get('/precautions' , (req,res) =>{
  fs.readFile('./views/precautions/precautions.ejs' , function(err,data){
    res.writeHead(200, {'Context-Type': 'text/html'});
    res.write(data);
    return res.end();
  })

});

app.get('/about-us', (req,res) =>{
  res.send("ABOUT US PAGE!")
  
})


app.get('/donate-now', (req,res) =>{
  fs.readFile('./views/donation/donation.ejs' , function(err,data){
    res.writeHead(200, {'Context-Type': 'text/html'});
    res.write(data);
    return res.end();
  })
})

// search page....

app.get('/user/search', isloggedIn , (req,res) => {
  fs.readFile('./views/search/search.ejs' , function(err, data){
    res.writeHead(200, {'Context-Type': 'text/html'});
    res.write(data);
    return res.end();
  })

})

// usa card
app.get('/user/search/usa-card-info' , isloggedIn , (req,response) => {
  axios.get("https://api-covidm.herokuapp.com/usa")
  .then(function(res){
    const usa_total = res.data.totalCases
    const usa_deaths = res.data.totalDeaths
    const usa_states_name= res.data.casesByState.name

    response.render('usa-card/usa-card', {
      usa_total:usa_total,
      usa_deaths:usa_deaths,

    })
  })
})

// IMPORTANT API ROUTES
app.get('/user/search/asia-card', isloggedIn, (req,res) => {
  axios.get("https://api-covidm.herokuapp.com/case")
  .then(function(ress){
    const asia_cases = ress.data.todayCases
    const asia_updated = ress.data.updated
    const asia_eaths = ress.data.todayDeaths
    const asia_recoverd = ress.data.todayRecovered
    const asia_active = ress.data.active
    const population = ress.data.population
    const activeperonemillon = ress.data.activePerOneMillion
  res.render('asia-card/asia-card', {
    asia_active:asia_active,
    asia_recoverd: asia_recoverd,
    asia_eaths: asia_eaths,
    asia_cases: asia_cases,
    asia_updated: asia_updated,
    population : population,
    activeperonemillon: activeperonemillon

  })
})
})








// Scope
app.get('/auth/google' , passport.authenticate('google' , { scope: ['email' , 'profile']})
)


app.get('/google/callback' , passport.authenticate('google' , {
  successRedirect: '/user',
  failureRedirect :  '/auth/failure',


} )
)

app.get('/auth/failure' , isloggedIn ,  (req,res) => {
  res.send("<h1> login error Please try again later </h1>")
})

app.get('/auth/github',passport.authenticate('github',{ scope: [ 'user:email' ] }));


app.get('/github/callback',passport.authenticate('github', {
 successRedirect: '/user',
 failureRedirect: '/auth/failure',

} )
)

app.get('/auth/linkedin',
  passport.authenticate('linkedin', { scope: [ 'r_emailaddress' , 'r_liteprofile'] }));

app.get('/linkedin/callback' , passport.authenticate('linkedin' , {
  successRedirect: '/user',
  failureRedirect: '/auth/failure',
} )

)



app.listen(port, () => {
  console.log(` app listening on port ${port}!`)
});