# Assignment 

### Before running the assignment please create the follow collection in database => users, subscriptions, plans

## To run the assignment use command
### npm start 

### End points
#### Sign_up
- localhost:8080/api/v1/sign_up
- request body : {
  "email": "himanshusah@gmail.com",
  "password": "123456"
}
- response body: {
  "status": true,
  "message": "Success",
  "payload": {
    "acknowledged": true,
    "insertedId": "663e0b77f937de27960da66a"
  }
}

#### Sign_in
- localhost:8080/api/v1/sign_in
- request body : {
  "email": "himanshusah@gmail.com",
  "password": "123456"
}
- response body: {
  "status": true,
  "message": "Success",
  "payload": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2M2UwYjc3ZjkzN2RlMjc5NjBkYTY2YSIsImlhdCI6MTcxNTM0Mjc4NiwiZXhwIjoxNzE1MzQzMDg2fQ.mzNOVmNVnxAffOkgM_jB1F514BMdVgnU-oxaDp92KR0",
    "id": "663e0b77f937de27960da66a"
  }
}

#### initialProfileComp (please provide image as base64 string)
- localhost:8080/api/v1/initialProfileComp
- request body : {
    "profileImages": [
      "base64",
      "base64"
    ],
    "gender": "Male",
    "age": 23,
    "homeCity": "Russia"
}
- response body:  {
  "status": true,
  "message": "Success",
  "payload": {
    "acknowledged": true,
    "modifiedCount": 1,
    "upsertedId": null,
    "upsertedCount": 0,
    "matchedCount": 1
  }
}

#### update profile
- localhost:8080/api/v1/update_profile
- request body : {
    "fullName": "Himanshu sah",
    "isTravelling": false,
    "travellingTo" : "ndewnm",
    "about" : "cdsfcerwfcrewvc",
    "description" : "fegesfgvfdrtrf",
    "matchLookingFor" : "Women",
    "height" : "172cm",
    "hobbies" : "bgsdb rgsdb",
    "doesSmoke" : "ggbrgsfdrbrs",
    "doesDrink" : "bsgdbrgsbrgdb",
    "instagramLink" : "www.instagram.com",
    "facebookLink" : "www.facebook.com"
}
- response body:  {
  "status": true,
  "message": "Success",
  "payload": {
    "acknowledged": true,
    "modifiedCount": 1,
    "upsertedId": null,
    "upsertedCount": 0,
    "matchedCount": 1
  }
}

### get profile
- localhost:8080/api/v1/userProfile/663d9e0b7904245fec8eabce (user id)
- response body: {
  "status": true,
  "message": "Success",
  "payload": {
    "_id": "663e0b77f937de27960da66a",
    "email": "himanshusah@gmail.com",
    "password": "$2a$08$7qUFN2O1bWtSU6S1xnGPD.xEFuR4S2jnOoQ6fkQALhl9/hS2xYNum",
    "createdAt": "2024-05-10T11:56:39.753Z",
    "updatedAt": "2024-05-10T12:01:21.074Z",
    "about": "cdsfcerwfcrewvc",
    "age": 23,
    "description": "fegesfgvfdrtrf",
    "doesDrink": "bsgdbrgsbrgdb",
    "doesSmoke": "ggbrgsfdrbrs",
    "facebookLink": "www.facebook.com",
    "fullName": "Himanshu sah",
    "gender": "Male",
    "height": "172cm",
    "hobbies": "bgsdb rgsdb",
    "homeCity": "Russia",
    "instagramLink": "www.instagram.com",
    "isProfileCompleted": false,
    "lat": 64.6863136,
    "lng": 97.7453061,
    "matchLookingFor": "Women",
    "profileImages": [
      "base64",
      "base64"
    ],
    "status": 1,
    "subscription": {
      "subscriptionType": "Gold",
      "isChattingAllowed": true,
      "isCommentingAllowed": true,
      "isPostingAllowed": true,
      "isNearbyAllowed": true,
      "isTravelModeAllowed": true,
      "subscriptionStartedAt": "2024-05-10T12:06:42.550Z",
      "createdAt": "2024-08-08T12:06:42.550Z"
    },
    "travellingTo": "ndewnm",
    "isTravelling": false
  }
}

### Create plan
- localhost:8080/api/v1/create_plan
- request body: {
  "subscriptionType": "Gold",
  "isChattingAllowed": true,
  "isCommentingAllowed": true,
  "isPostingAllowed": true,
  "isNearbyAllowed": true,
  "isTravelModeAllowed": true,
  "duration": 90
}

- response body: {
  "status": true,
  "message": "Success",
  "payload": {
    "acknowledged": true,
    "insertedId": "663e160994670b1ee9bc0f08"
  }
}


### Assign subscription
- localhost:8080/api/v1/get_subscription/663de4ee9ed158743244226e (plan_id)
- response body: {
  "status": true,
  "message": "Success",
  "payload": {
    "acknowledged": true,
    "modifiedCount": 1,
    "upsertedId": null,
    "upsertedCount": 0,
    "matchedCount": 1
  }
}