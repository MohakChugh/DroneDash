# Hindalco Dashboard

## Todo

- [x] Complete Authentication
- [x] Only Let The Admin add new Users
- [x] Role Based Access for live Stream
- [x] Add Report System
- [x] Report Generated Flow System `(RBACK SYSTEM)`
- [x] Notifications on Live Feed via Whatsapp
- [x] Check if livestream works when deployed to github pages
- [x] Now fix dashboard, Clicking on the plant name should open its reports
- [x] A filter (by plant name) is required while seeing the reports
- [x] The mainpage should have some important data which should be shown in the main page of the dashboard

## Admin Usage

- Credentials
Admin
    1. Email : mohak
    2. Password : mohak@123

Headquarter Admin
    3. Email: main
    4. Password: main@123

client
    5. Email: test1
    6. Password: test1@123

Pilot
    7. Email: pilot2
    8. Password: pilot2@123

- Admin Powers
    1. Can register a new User
    2. Can perform activities according to the roleback system
    3. Can view livestream of all the users
    4. Monitor Flight details and server details
    5. Change password of all users
    6. Get Operations schedule
    7. Get Messages of all the users (1 Way Only)
    8. Can see reports, Instructions and Mission Status of all the plants
    9. Can validate the reports generated by the pilot

- Headquarter Powers
    1. Can view reports, Instructions and Mission Status of all the plants
    2. Can view livestream of all plants
    3. See operations schedules of all the plants

- Plant Powers
    1. Can see the reports, livestream, operations schedules 
    2. Can add instructions for the pilot
    3. Can send messages to the admin

- Pilot Powers
    1. Can start or stop the mission (day and night toggle)
    2. See instructions from the client
    3. Generate and upload the report of the mission
    4. Upload operations scheduleLink
    5. Add comments/feedback on the schedule
    6. See the reports after validation

## How the registration works

Register the company with a username, eg `test`.
Make sure to add a secure password: eg `test@123`.
Then when the user is registered, then the drone link for the plant becomes : `rtmp://35.188.41.41/live/{{plantname}}`
ie. If the name of the plant is Dahej, Then the drone link for the plant is `rtmp://35.188.41.41/live/test`

## Deployement on GCP

clone the repo, and save the dist folder (output folder) in /var/www,
Then restart the nginx server

## Screenshots

### Admin

- Mainpage
![Mainpage](./src/assets/screenshots/main.png)

- Flight Logs
![Mainpage](./src/assets/screenshots/flights.png)

- Livestream
![Mainpage](./src/assets/screenshots/livestream.png)

- Messages
![Mainpage](./src/assets/screenshots/message.png)

- Reports
![Mainpage](./src/assets/screenshots/reports.png)

- Operation Schedules
![Mainpage](./src/assets/screenshots/schedule.png)

To check pages of other orles, please login :)