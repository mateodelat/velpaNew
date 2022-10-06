
# Velpa ![icon](https://user-images.githubusercontent.com/24461382/194229402-62f6b297-8761-46e0-b39a-cb6c58f683fb.png)


Velpa is a mobile application that I developped from just the idea of connecting people who want to go hikking with local guides
I had to learn everything from scratch like [react native](https://reactnative.dev/) and how to manage the backend side that is done with [amazon web sevices](https://aws.amazon.com/es/). It was a hard process, sometimes wanted to give up but my resiliency didn't let me do it and after a year of investigating and faillures I had my nice product



Velpa is a mobile aplication for connecting people who wants to go into an adventure and local guides who know the route.


# Functionalities

## Auth:
When a user join the app, it is mandatory to sign in for continuing.
For this integration, I have used [amazon cognito](https://aws.amazon.com/es/cognito/) for handling users and identities and have integrated it with [google OAuth](https://docs.amplify.aws/lib/auth/social/q/platform/js/#configure-auth-category)

I managed to normalize cognito accounts and google accounts with a cloud function

[Sign in](https://user-images.githubusercontent.com/24461382/194223886-f70db00e-1de3-4562-9692-00661e395671.mp4, "Users sign in")


## Client pages:
In the main page there are some adventures created by the guides in the app.
Using [react navigation](https://reactnavigation.org/) for handling user interface

There are 4 main sections to handle buisness logic (home, map looking, notifications/messages and profile)

### Home
*Adertising: Section with advertizing for partners with animation
*Adventures: Fetch all adventures that has not passed certain date and make sure it is sorted by relevancy using user location as a parameter.
  *Book into an adventure
  *See booked persons
  *Card payments or cash for a reservation
  ![Payments](https://user-images.githubusercontent.com/24461382/194235499-4afa0787-460d-4c17-8c65-48d5a9852e4d.png)
    *Stripe integration
    *Payments directly to the guide
    *Taking app fee

  *See available dates by the guide
  ![Dates ](https://user-images.githubusercontent.com/24461382/194235237-9f40d806-9eb9-4cbe-b692-4c12b26c43f7.png)

*Guides: Get all guides info
![Home screen](https://user-images.githubusercontent.com/24461382/194233257-dcff4d91-9043-4925-ac29-ae9c04603f49.png)


### Adventures by map
*Google maps API credentials and integration in react native
*Look by name
*Animation on slide and onPress on marker
![Map screen](https://user-images.githubusercontent.com/24461382/194233564-e3902108-b4cb-47fa-b8e1-85086ad842e0.png)


### Notifications/messages
*Chat groups in app
*Notification on new message and on buisness logic
*Phone notifications
![Notifications screen](https://user-images.githubusercontent.com/24461382/194233674-4e716f01-9d95-45f4-93b3-1dce8ed0634e.png)
![Chats](https://user-images.githubusercontent.com/24461382/194233800-1bbe4aa1-34a6-47eb-8d87-ada378a749a6.png)


### Profile

*Ratings system
*See my next trips
*Payments info
*Levels for app guides
*Allowed to bring a certain number of persons
![Profile screen](https://user-images.githubusercontent.com/24461382/194233757-b2fcea6d-6ba2-4008-b61a-46398a2de2eb.png)


[First 2 pages](https://user-images.githubusercontent.com/24461382/194230345-ffec53ae-0864-41e7-968b-feafc4041a5e.mp4)


## Get guide data:
This is the flow for validating a guide with admins.

*Get user ID
*Selfie
*Bank information
*Await for a verifications with app verificators and if authorized be able to create a new date



## Create a date in a mountain:
Here guides can create a new event and it request all that is necesary for users to make a booking in a mountain

*Date
*Select mountain
  *Guide can only add a date in mountains that he is allowed to
*Price
*Meeting point
*Other details

![Select mountain](https://user-images.githubusercontent.com/24461382/194234137-ce5dd7aa-60c3-457e-8f21-25940a6a48e3.png)
![Dates](https://user-images.githubusercontent.com/24461382/194234343-77e1b59a-ad54-40af-acd1-7955d1dae34f.png)







