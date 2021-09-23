# Getting started with Oauth


## Basic Setup
(this project runs on node js latest version)
1)Clone the repo wia https or downolad the files of covidm 
2) Once done run `npm install` to install all the modules 

3)then run `npm start` to run the program 

Done! happy coding/hacking!

### Auth setup

Google login:

There is a dedicated file for Auth by passport.js 
[auth.js](https://github.com/Covidm/Covidm/blob/master/auth.js)

Head over to (The google api page)[https://console.cloud.google.com/apis/]
and create a web cliet use the oauth in a env file or directly into auth.js

Once done you'll be able to login with google login 

[Github login](https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps): 

Directing users to review their access
Troubleshooting
Further reading
GitHub's OAuth implementation supports the standard authorization code grant type and the OAuth 2.0 Device Authorization Grant for apps that don't have access to a web browser.

If you want to skip authorizing your app in the standard way, such as when testing your app, you can use the non-web application flow.

To authorize your OAuth app, consider which authorization flow best fits your app.

web application flow: Used to authorize users for standard OAuth apps that run in the browser. (The implicit grant type is not supported.)
device flow: Used for headless apps, such as CLI tools.

create the app  the repo settings and use the acess token to auth. to login


[Linkden Login](https://docs.microsoft.com/en-us/linkedin/shared/authentication/authentication):

[Developer portal linkden](https://developer.linkedin.com/)


create a app then create a page for the app

once done add the following permissions

obtain the acess token 

done! happy coding/hacking