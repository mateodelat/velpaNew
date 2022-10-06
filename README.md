
# ![icon](https://user-images.githubusercontent.com/24461382/194229402-62f6b297-8761-46e0-b39a-cb6c58f683fb.png) Velpa 


Velpa is a mobile application that I developped from just the idea of connecting people who want to go hikking with local guides
I had to learn everything from scratch like [react native](https://reactnative.dev/) and how to manage the backend side that is done with [amazon web sevices](https://aws.amazon.com/es/).


Velpa is a mobile aplication for connecting people who wants to go into an adventure and local guides who know the route.

# Screenshots
![Screenshot_1665038990](https://user-images.githubusercontent.com/24461382/194241284-d7e51c98-310f-4faf-a98f-e7e0cfc4e361.png)
![Screenshot_1665039541](https://user-images.githubusercontent.com/24461382/194241298-7c254b32-521f-4bd9-b017-801206286686.png)
![Screenshot_1665038860](https://user-images.githubusercontent.com/24461382/194241967-fc46a3bc-f9d4-4471-8597-27ac9cf5e9f3.png)
![Screenshot_1665039063](https://user-images.githubusercontent.com/24461382/194241300-bc514bc3-c27e-42d2-aca7-f9a54c524999.png)

#Videos
[First 2 pages](https://user-images.githubusercontent.com/24461382/194230345-ffec53ae-0864-41e7-968b-feafc4041a5e.mp4)


# Functionalities

## Auth:
When a user join the app, it is mandatory to sign in for continuing.
For this integration, I have used [amazon cognito](https://aws.amazon.com/es/cognito/) for handling users and identities and have integrated it with [google OAuth](https://docs.amplify.aws/lib/auth/social/q/platform/js/#configure-auth-category)

I managed to normalize cognito accounts and google accounts with a cloud function

[Sign in](https://user-images.githubusercontent.com/24461382/194223886-f70db00e-1de3-4562-9692-00661e395671.mp4, "Users sign in")



[Sign in](https://www.youtube.com/watch?v=BYUy1yvjHxE&t=2s&ab_channel=LifeatGoogle, "Users sign in")


## Client pages:
In the main page there are some adventures created by the guides in the app.
Using [react navigation](https://reactnavigation.org/) for handling user interface

There are 4 main sections to handle buisness logic (home, map looking, notifications/messages and profile)

### Home
* Adertising: Section with advertizing for partners with animation
* Adventures: Fetch all adventures that has not passed certain date and make sure it is sorted by relevancy using user location as a parameter.
  * Book into an adventure
  * See booked persons
  * Card payments or cash for a reservation
    * Stripe integration
    * Payments directly to the guide
    * Taking app fee

  * See available dates by the guide

* Guides: Get all guides info


### Adventures by map
* Google maps API credentials and integration in react native
* Look by name
* Animation on slide and onPress on marker



### Notifications/messages
* Chat groups in app
* Notification on new message and on buisness logic
* Phone notifications


### Profile

* Ratings system
* See my next trips
* Payments info
* Levels for app guides
* Allowed to bring a certain number of persons


## Get guide data:
This is the flow for validating a guide with admins.

* Get user ID
* Selfie
* Bank information
* Await for a verifications with app verificators and if authorized be able to create a new date



## Create a date in a mountain:
Here guides can create a new event and it request all that is necesary for users to make a booking in a mountain

* Date
* Select mountain
  * Guide can only add a date in mountains that he is allowed to
* Price
* Meeting point
* Other details

