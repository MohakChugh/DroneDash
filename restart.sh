#!/bin/sh
git pull origin master
ng build --prod
sudo systemctl restart nginx
