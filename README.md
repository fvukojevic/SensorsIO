# SensorsIO

Recreating and existing project done in vanilla PHP and Ajax to Go and Vue.js

Original project: https://github.com/galion96/PiiS

*This app is about smart sensor network based on ZigBee technology and GSM/GPRS network. Combined with smart home design which uses the described hardware, ZigBee wireless sensors network can in real time collect the values of sensor parameters*

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

## Prerequisites

- docker v17.03+ ([installation instructions](https://confluence.votum.info:9443/display/DEV/Docker#Docker-Installdocker))
- docker-compose v1.13+ ([installation instructions](https://confluence.votum.info:9443/display/DEV/Docker#Docker-Installdocker-compose))

## Setup

In Docker Preferences/FileSharing put the directory you copied the project into as path. Once that is done inisde the terminal get inside the folder. Running `make clean && make setup` will start your application. Other make command you can easily see inside the Makefile, and exactly what they do.

## Authors

* **Ferdo Vukojević** - *Initial work* - [fvukojevic](https://github.com/fvukojevic)
* **Filip Galić** - *Initial work* - [galion96](https://github.com/galion96)
