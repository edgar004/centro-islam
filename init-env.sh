#!/bin/bash

# init .env file 

touch .env

cat > .env << EOF
REACT_APP_API_URL=https://centro-islam.herokuapp.com
EOF