# Phase 4 Full-Stack Application Project 

## Frontend Setup
To get started, cd into the client directory. Then run:

$ npm install
$ npm start
 or you can run these commands from the project directory
$ npm install --prefix client
$ npm start --prefix client

## Backend Setup
In another terminal, run pipenv install; pipenv shell to install the dependencies and enter your virtual environment, then cd into the server directory to start running your Python code.

pipenv install  && pipenv shell
python server/app.py

## All the dependencies that should be installed:
npm i react-photo-gallery --legacy-peer-deps
npm install react-datepicker --save
npm install date-fns --save
npm install formik yup

## Backend
This application called "Perfect photoshoot". It has three models on the backend: User, Photographer and Photoshoot. User and Photoshoot have one-to-many relationship, as well as Photographer and Photoshoot. Relationship between Photographer and User is many-to-many, and Photoshoot model serves as a join table.
 I chose to implement full CRUD actions(on of the requirements) on Photoshoot model.
 Using Formik to validate all inputs

## App.js
In App.js I import style sheets app.css, components, PhotographersProvider from Context.js, Navigation and some necessary functions and hooks.  
I wrap my code with PhotographerProvider so components can have access to it's data using useContext hook.
Nav bar is created by Navigation.js component, which contains NavLinks and styles from Navigation.css, and allows users to navigate between routes. I use Switch and Routes to define routes.

## Home.js
This is the main page, this what the user sees first. Here I have a header and a search form right after. Search.js filters all the photographers by zip code. 
below that, I render all the portfolio images from photographers, that are clickable. 
After clicking on an image, photographer's profile will show up. "/photographers/:id" route that renders Photographer.js component. 
## Photographer.js  
Photographer.js renders a photographer's profile picture, bio and znd a zip code. Below that you can see their portfolio pictures, booked photoshoots (which is a link that'll take you to DetailPhotoshoot.js) and a "Click to book" button.
By clicking on the button NewUser Modal will open. 

NewUser.js creates a new user, by asking for a user's name input. Formik and yup take care of the validation, making sure the input is a non-empty string, with max of 60 characters.

After the user is known, the BookPhotoshoot modal will open.
BookPhotoshoot.js creates a new photoshoot, by asking for a location and date. Here I use Datepicker for a date and time input. Formik and Yup validate the inputs, making sure the location is a non-empty string with a max of 60 characters and a date and time is not in the past.  

At this point a new user and new photoshoot are created and you're taken to "/photoshoots/:id" route, which displays DetailsPhotoshoot.js component.

## DetailsPhotoshoot.js
This components display all details about the photoshoot, as well as two buttons. "Update photoshoot" button opens UpdatePhotoshoot Modal
 
UpdatePhotoshoot.js makes a PATCH fetch request to update location and/or date and time parameters. Uses Formik and yup to properly validate new inputs. After request it done, the page will automatically reload thanks to line 45 history.go(0). 

"Cancel Photoshoot" button opens CancelPhotoshoot.js. It makes a DELETE fetch request, that deletes the photoshoot from the database. After request it done, the page is automatically reloaded.

## PhInTheArea.js
Short for Photographers in the Area. This component filters photographers depending whether you're searching for a photographer in a specific zip code area (from home page) or interested in all available photographers (coming from Nav bar).
There's an h2 asking whether you want to register as a photographer with a button bellow, that says "Click me". when you click on it, Create photographer modal will open.

CreatePhotographer.js makes a POST request, creating a new photographer, based on the inputs. Which are validated with formik and Yup. After request is completed, new photographer will be added to the list of all photographers and page will automatically reload.

## Mybookings
Mybookings.js makes a GET request using the name input, to find a user. If the user is found, it'll display photoshoot's details and "Update booking" link, which takes you to "/photoshoots/:id" route aka DetailsPhotoshoot.js component.
If user is not found, the error message will be displayed. Asking user to type the correct name they booked under or go to a photographer's page to book a photoshoot.
## Resources

- [Setting up a repository - Atlassian](https://www.atlassian.com/git/tutorials/setting-up-a-repository)
- [Create a repo- GitHub Docs](https://docs.github.com/en/get-started/quickstart/create-a-repo)
- [Markdown Cheat Sheet](https://www.markdownguide.org/cheat-sheet/)
- [Python Circular Imports - StackAbuse](https://stackabuse.com/python-circular-imports/)
- [Flask-CORS](https://flask-cors.readthedocs.io/en/latest/)
