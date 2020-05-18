# Hindalco Dashboard

## Todo 
- [x] Complete Authentication
- [x] Only Let The Admin add new Users
- [] Role Based Access for live Stream
- [] Add Report System
- [] Report Generated Flow System `(RBACK SYSTEM)`
- [] Notifications on Live Feed via Whatsapp
- [] Check if livestream works when deployed to github pages

## Admin Usage
- Credentials
    1. Email : admin@admin.com
    2. Password : admin
- Powers
    1. Can register a new User
    2. Can perform activities according to the roleback system
    3. Can view livestream of all the users

## How the registration works
Register the company with a username, eg `Lapanga`.
Make sure to add a secure password: eg `lapanga@123`.
Then when the user is registered, then the drone link for the plant becomes : `rtmp://35.188.41.41/live/{{plantname}}`
ie. If the name of the plant is Dahej, Then the drone link for the plant is `rtmp://35.188.41.41/live/dahej`