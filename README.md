General Information
The Bugtrace application is a bug tracking software that allows users to easily manage bug reports.  It is designed as a simplified Kanban board taking inspiration from tools such as trello and other bug tracking tools.  The simple drag and drop interface makes changing the status of bugs simple and allows users a fun and modern interface to interact with.  The software is currently in an alpha development phase and as such it is missing some features (editing of tags, management of archived bugs, user management, personalization etc).  
The Github link for the project can be found below
https://github.com/hatysfriend/BugTracker_MicroServices

Running App
To run the application, you will need docker installed
https://www.docker.com/get-started
1.	Clone the repository to your local machine
2.	cd into the BugTracker_MicroServices folder
3.	Run the API (run the following commands)
4.	cd bug-tracker-api
5.	docker-compose up
6.	API and Database should now be running
7.	Run the Angular client app
8.	Open a second console and run these commands
9.	cd bug-tracker-ng
10.	npm i
11.	ng serve
12.	Client app should be running, click on link or navigate to http://localhost:4200/

To view swagger UI please navigate to http://localhost:3002/api-docs/ in your browser
Please contact me if you have any issues getting it to run.  I have tested the process however there may be issues!
