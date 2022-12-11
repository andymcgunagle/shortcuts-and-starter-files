#!/bin/zsh

firebase login:use amcgunagle@gmail.com &&
firebase use add-project-name-here &&
firebase emulators:start --import=./lib/firebase/emulatorData --export-on-exit