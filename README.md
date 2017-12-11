
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).


Welcome to Marvel Birthday!
===================

This app is made with React, and fetches comics that were released on your birthday using a datepicker. 

----------


## Setup/Run Process

### Step 1

Run `npm install` to install node module dependencies

### Step 2

Run `npm start` to begin viewing in your browser! 

### Step 3

Enter your birthday! If your birthday however does not have any comics released on it, you can use these dates to see different results:

> - Dec 1st, 1990
> - Nov 1st, 2017
> - Nov 7th, 2017
> - Nov 9th, 2016
> - Nov 8th, 2017

#### Notes:

> - I've set up the API keys to allow for anything on the localhost domain with a wildcard (localhost.*), so it should always work, but contact me if things aren't working and I'll add in the API key
> - I originally wanted to expand the search dynamically to a greater date range if there were no comics released on your birthday, expanding out to a week, but I ran out of time due to moment.js issues
> - I used gulp to run my standard preprocessor workflow, and structured things in the SMACSS architechture, even though it is a small app
> - This was my first ever React app, and it's a bit different from VueJS but also very similar, so it was quite fun to learn! It is definitely quite different since it's not the normal javascript I'm used to