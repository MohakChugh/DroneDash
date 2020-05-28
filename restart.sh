#!/bin/sh
git pull origin master
# npm i
ng build --prod
sudo systemctl restart nginx
