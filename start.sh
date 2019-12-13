#!/bin/bash
# You need to make sure that you have a .env file in the project folder
# and the .env file contains the MONGO_URL=mongodb://user:pass@url.com/databaseName
source .env;
export MONGO_URL;
meteor;