To start an application:

# Install dependencies

$ npm install

# create a .env file and put there the MONGODB_URI for connecting to your mongodb database

$ echo "MONGODB_URI=<YOUR-MONGODB-URI>" > .env
$ echo "TEST_MONGODB_URI=<YOUR-TEST-MONGODB-URI>" > .env
$ echo "DEV_MONGODB_URI=<YOUR-DEV-MONGODB-URI>" > .env

# Set a variable SECRET which is a digital signature ensures that only parties who know the secret can generate a valid token.

$ echo "SECRET=<secrethere>" > .env

# Start the application in dev environment

$ npm run dev

# Start the application in prod environment

$ npm start

# # Start the application in test environment and run tests

$ run start:test
$ npm test
Once successfully connected, the app allows you to perform the following operations:

Create & List Users (POST, GET)
Login using username and password (POST)
Create, List, Update & Delete Blogs (POST, GET, PUT, DELETE) for an authenticated user
Those operations are possible using REST APIs on the following endpoints (add /ID for PUT & DELETE):

http://localhost:3001/api/login
http://localhost:3001/api/users
http://localhost:3001/api/blogs

# To create a new user

POST /api/users
{
"username": "test",
"name": "test",
"password": "test"
}

# To login. Once logged in, a jwt token is sent back to the user.

POST /api/login
{
"username": "test",
"password": "test"
}

# To create a new Blog (Using JWT token)

POST /api/blogs - {"Authorization": "Bearer YOUR-JWT-TOKEN"}
{
"title":"A very nice Blog",
"author":"Alex Lifeson",
"url":"https://www.rush.com/",
"likes":12
}
