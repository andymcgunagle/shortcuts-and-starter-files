#!/bin/zsh

firebase login:use amcgunagle@gmail.com &&
firebase use add-project-name-here &&
firebase deploy --only firestore:rules