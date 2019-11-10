#!/bin/bash
source .env;
export MONGO_URL;
npm run test-app;