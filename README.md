# lucky-draw-game-grofers
assignment


postman collection to test apis
https://www.getpostman.com/collections/c116b10330428d395de8


1. first create event -  /api/events/createEvent 

{
    "time": 8, // an integer value between 0-23 denoting 12am, 1am, 2am, 3am... so on
    "onDate": "9/5/2021", // date on which event closes in DD/MM/YYYY format
    "reward": "washing machine" // the event price
}

in response you will get _id as eventId


2. then create the user - /api/users/createUser

{
    "email" : "1@gmail.com", 
    "firstName": "shubham", 
    "lastName" : "gupta"
}
 in response you will get _id as userId
 
 3. create raffleTicket for user - /api/users/getRaffleTicket
 
{
    "userId" : "6094c0518f1b32909dadf065"
}

you have to pass userId that came in response in step 2
in response you will get _id as raffleTicketId

4. make user participate - /api/users//participate

{
    "eventId": "60942dcf15bb4e16944c5d4d",
    "userId": "6094c0518f1b32909dadf065",
    "raffleTicketId": "6094c3b09131c793248ab6f2"
}

pass eventId, userId, raffleTicketId as generated in step 1,2,3
necessary validations are put as was asked in doc

5. get winner - /api/events/getWinner

{
    "eventId": "60942dcf15bb4e16944c5d4d"
}

selects a winner for the eventId passed and returns in response the eventId and winner

6. last week winners - /api/events/lastWeekWinners

returns winnners of events which completed in past week.

7. to get the next upcoming event - /api/events/nextEvent

sends the event details of upcoming event
 
