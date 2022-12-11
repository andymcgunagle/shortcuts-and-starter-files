#!/bin/zsh

# Usage: npm run deploy:functions:secrets <SECRET_NAME>

firebase login:use amcgunagle@gmail.com &&
firebase use add-project-name-here &&
firebase functions:secrets:set $1

# https://firebase.google.com/docs/functions/config-env#secret-manager

# https://console.cloud.google.com/security/secret-manager?project=nextjs-firebase-playgrou-5ebac