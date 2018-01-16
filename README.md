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
  - Handle GET requests from font 
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

From within the front end folder:
>grunt build

All the necessary files for deploying the front end with be in the /dist folder  (you may need to manually copy fontawesome fonts to the /dist/fonts folder)


**API**

For deployment was on a Ubuntu webserver:
> sudo dotnet publish -o ./NewsAPI2 -r linux-x64

Start the service (user [supervisor](http://supervisord.org) to run in the background / restart):
> dotnet NewsAPI.dll

# Improvement 
- Testing
- PWA features

