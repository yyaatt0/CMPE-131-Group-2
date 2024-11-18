To run:
cd online-banking
npm install
npm run

cd backend
npm install
npm run


Update the .env file with database user, password, and name.
Assumes your database has table called users with username and password in it for the below query:
const qry = "SELECT * FROM users WHERE username = ? AND password = ?";


src/pages ->
	/styles ->
		mystyles.css
	/scripts ->
		myscripts.js
	/images
	/components
	Reactpages.tsx.....
