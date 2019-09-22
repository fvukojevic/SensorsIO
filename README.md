# SensorsIO

Recreating and existing project done in vanilla PHP and Ajax to Go and Vue.js

Original project: https://github.com/galion96/PiiS

*This app is about smart sensor network based on ZigBee technology and GSM/GPRS network. Combined with smart home design which uses the described hardware, ZigBee wireless sensors network can in real time collect the values of sensor parameters*

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites

In order to clone this project you first need to install three things: **GO** and **Vue.js** and a stack package for example **XAMPP** for Windows/Linux users and **MAMP** for Mac users.

### Installing

Vue is fairly simple to install and good documentation can be found here: 

* [Vue](https://vuejs.org/v2/guide/installation.html) - Vue installation guide 

Go is a bit trickier to install, but good documentation can be found in their .org page. In case of some troubles about setting up GOPATH or something similar, there are a variety of good videos on Youtube to get you started

* [Go](https://golang.org/doc/install) - Go installation guide

After Go and Vue.js are installed, I would suggest using **XAMPP** for Windows/Linus and **MAMP** for Mac users to get set your database. 
They are pretty easy to install and I'm guessing if you are looking to pull this project you already used them before.
If you haven't I suggest getting some basic knowledge then returning here.

Assuming you know a thing or two about those packages open your phpmyadmin and set your database name. For example `sensors_project`. You don't need to add any tables as Go and Gorm will take care  of that for you, with their AutoMigrations.

### Getting started

After all the things above are installed and ready to be used, rest is fairly simple. If you installed Go, go(no pun intended) inside your source folder (on my machine it goes inside `Users/{myName}/go/src` and clone the project from git.

Inside the `Backend` folder create a file called `.env`. It is something used a lot in programming community to set up your environment variables. Inside it you have to define your db connections and a port on which your Go application will listen to request to access the database. Example `.env` file would look like this:

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=sensors_project
DB_USERNAME=root
DB_PASSWORD=
GO_PORT=8803
```

If your .env file is correct, compiling the Go project should say that it is listening on ports described in `main.go` on port `GO_PORT`.

When it comes to Frontend side, it's a lot easier. Only thing required is to go inside the `Frontend/sensors` and inside the terminal type `npm install`. That will install all dependencies in package.json file. You only have to run that command once, and/or when adding new packages.

Last thing is to run `npm run dev` inside the same folder and the app should start.
