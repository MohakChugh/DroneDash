# Hindalco Dashboard

## Todo 
- [x] Complete Authentication
- [x] Only Let The Admin add new Users
- [x] Role Based Access for live Stream
- [x] Add Report System
- [x] Report Generated Flow System `(RBACK SYSTEM)`
- [] Notifications on Live Feed via Whatsapp
- [x] Check if livestream works when deployed to github pages
- [] Now fix dashboard, Clicking on the plant name should open its reports
- [] A filter (by plant name) is required while seeing the reports
- [] The mainpage should have some important data which should be shown in the main page of the dashboard

## Admin Usage
- Credentials
Omnipresent Admin
    1. Email : admin@admin.com
    2. Password : admin@123

Mumbai Headquarter Admin
    3. Email: admin@mainbranch.com
    4. Password: mainbranch@123
- Powers
    1. Can register a new User
    2. Can perform activities according to the roleback system
    3. Can view livestream of all the users

## How the registration works
Register the company with a username, eg `Lapanga`.
Make sure to add a secure password: eg `lapanga@123`.
Then when the user is registered, then the drone link for the plant becomes : `rtmp://35.188.41.41/live/{{plantname}}`
ie. If the name of the plant is Dahej, Then the drone link for the plant is `rtmp://35.188.41.41/live/dahej`

## Deployement on GCP
clone the repo, and save the dist folder (output folder) in /var/www,
Then restart the nginx server
