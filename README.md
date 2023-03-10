# City Explorer

**Author**: Chris Vander Linden
**Version**: 2.0.0

## Overview

This updated version will allow for exploration of various types of venues, events, and the weather based off of the selected location.

## Getting Started

1. Clone repo from [here](https://github.com/Chris-Vander-Linden/city-explorer)
2. Get your own API key for [LocationIQ](https://locationiq.com/)
3. Create a .env file with the following:
    REACT_APP_LOCATION_KEY=[YOUR PERSONAL KEY VALUE]
4. After opening the application in the root directory, type: "npm install" then "npm start"

## Architecture

On the front end this application uses ReactJS, a few Bootstrap components, and axios to communicate with the APIs.

## Change Log

01-30-2023 11:30 AM - Application now has navigation for components, a table to display mock weather data from remote server, and error handling.

02-3-2023 1:00 AM - Application is now connecting to the backend to pull weather and movie data.  There is a table component that is being used to display the incoming data.

## Credit and Collaborations

React documentation
Bootstrap React documentation
MDN documentation

## MVC

![MVC](https://user-images.githubusercontent.com/11709610/218236225-522d5beb-d22d-42f2-81bb-08a552119265.jpeg)

## Work Tickets

Name of feature: Add New Components, Navigation, Error Handling

Estimate of time needed to complete: 4 hours

Start time: 1/29/23: 11:00 AM

Finish time: 1/30/23: 11:45 AM

Actual time needed to complete: 6 hours

---

Name of feature: Add Weather API

Estimate of time needed to complete: 8 hours

Start time: 2/1/23: 12:00 PM

Finish time: 2/2/23: 11:45 PM

Actual time needed to complete: 9 hours total

---

Name of feature: Add Movie API

Estimate of time needed to complete: 5 hours

Start time: 2/3/23: 11:00 AM

Finish time: 2/3/23: 1:00 AM

Actual time needed to complete: 5 hours

---

Name of feature: Add Food API

Estimate of time needed to complete: 2 hours

Start time: 2/4/23: 10:00 AM

Finish time: 2/4/23: 5:00 PM

Actual time needed to complete: 1 hour

---

Name of feature: Modularize Components

Estimate of time needed to complete: 15 minutes

Start time: 2/6/23: 4:00 PM

Finish time: 2/6/23: 5:00 PM

Actual time needed to complete: 15 minutes

---

Name of feature: Display Cache Date for Components

Estimate of time needed to complete: 1.5 hours

Start time: 2/7/23: 10:00 PM

Finish time: 2/9/23: 7:00 PM

Actual time needed to complete: 4 hours
