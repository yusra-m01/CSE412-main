# SUN CO
User guide (Installations to run Application):
1. Ensure that you have the following items downloaded: VSCode (or preferred IDE) and node.js (Node.js (nodejs.org)).
2. Create a new folder called Application in your preferred location to store the application files.
3. Open the command prompt terminal with the path set to the location of your newly created folder. Enter the command “mkdir client, server”. The front-end files will be stored in “client” and the back-end files will be stored in “server.”  
4. Navigate to the server folder using “cd server”. Enter the command “npm init -y”.
5. Next, run the command “npm install express pg cors”.
6. Next, run the command “npm install nodemon -D”.
7. Change the directory by entering the command “cd ..” and then “cd client”.
8. Next, run the command “npx create-react-app .” This command may take a while to create, as it is creating the react application. If this command gives you an error at first, run the command “npm install -g npm” to update npm to the latest version, then try again.
9. Enter “cd ..” to change the directory to the application folder, then run the command “code .” to automatically open the application in Visual Studio Code. Otherwise, open the project folder in your preferred IDE.
10. Remove all files under src in the client folder, and remove all files except the node_modules folder in the server folder
11. From the provided github repository, move all files inside the src folder in github to the src folder under the client folder in the project. Then, move the SUNCO.png to the public folder under the client folder. Then, move all files that are outside of the src folder in github to the server folder in the project (README is not necessary).
