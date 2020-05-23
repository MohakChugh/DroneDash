#!/bin/sh
git pull origin master
sudo systemctl restart nginx
