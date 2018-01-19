# Technologies

- **.NET Core WebAPI**
- **Angular 1 SPA**
  - Bootstrap 3
  - Built with Yeoman scaffold / Grunt
  - Bower managing packages
  - FontAwesome icons

> **Angular Front End** <-- *GET* --> **WebAPI** <-- *GET* --> **NewsAPI**

# WebAPI 
  **Functions:**
  - Handle GET requests from front end 
  - Build url to request data from NewsAPI (keep API key server side)
  - Retrieve data from NewsAPI and return it

**Endpoints:**
- Top Stories - GET - /news/region (top stories for that region)
- Search - GET - /news/region/query (search for stories)

# Angular SPA
Responsive front end to retrieve and present NewsAPI data via the above API.

- View - One main view, including a bootstrap modal for settings 
- Controller - All methods used by  / related to the view
- Services - Methods to handle GET requests / return responses to controller
- App.config - Constants saved here, base url for above API and default region 'GB'

# Deployment

**Front End**

Edit the app.config.js file in the front_end\app\scripts folder and add the API url (usually localhost:5000):
>webapi_baseurl: 'http://YOUR_API/api/news/',

From within the front_end folder:
>grunt build

All the necessary files for deploying the front end with be in the /dist folder  (you may need to manually copy fontawesome fonts to the /dist/fonts folder)


**API**

Edit the appsettings.json file to enter your [NewsAPI](https://newsapi.org/) API key:
>  "ApiKey": "YOUR_KEY",

For deployment on a Ubuntu webserver, from within api folder:
> sudo dotnet publish -o ./NewsAPI2 -r linux-x64

Start the service (user [supervisor](http://supervisord.org) to run in the background / restart):
> dotnet NewsAPI.dll

# Improvement 
- Testing
- PWA features

