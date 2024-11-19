# Movie Search

## Table of Contents

1. [Debounce](#debounce)
   - [Debounce application in the App](#debounce-application-in-the-app)
2. [Installation](#installation)
   - [Requirements](#requirements)
   - [Clone the Repository](#clone-the-repository)
   - [Install Dependencies](#install-dependencies)
3. [Program Execution](#program-execution)
   - [Run the Application](#run-the-application)
4. [Evidences](#evidences)

## Debounce

Debouncing is a programming technique that delays the execution of a function until the user has stopped performing an action for a specified period of time. This is useful to avoid repetitive execution of intensive tasks, such as API calls or events, while the user is actively interacting with the function.

### Debounce application in the App
In the Movie Search app, debounce is used to optimize TMDB API calls. Instead of making a request every time the user types a letter in the search field, debounce ensures that requests are only made after 500ms of inactivity, reducing unnecessary resource consumption and improving the user experience.

## Installation

### Requirements
- npm (Node Package Manager)

### Clone the Repository
```sh
git clone [https://github.com/BrayanBJ27/gymFrontend.git](https://github.com/BrayanBJ27/Debounce-App.git)
```

### Install Dependencies
```sh
npm install
```
## Program Execution
### Run the Application
```sh
npm start
```

## Evidences
**Application home page**
![image](https://github.com/user-attachments/assets/f1eb251b-5122-4b16-bdbd-6e9f7c2c484f)

**Use of debounce in the search for movies**
![image](https://github.com/user-attachments/assets/76990164-6df1-4182-bb22-6aeb160b1729)
