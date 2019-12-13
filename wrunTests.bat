REM You need to make sure that you have a .env file in the project folder
REM and the .env file ONLY contains the mongodb://user:pass@url.com/databaseName
SET /P MONGO_URL=<.env;
npm run test-app;

