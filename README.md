
# ![icon](https://user-images.githubusercontent.com/24461382/194229402-62f6b297-8761-46e0-b39a-cb6c58f683fb.png) Velpa 


Velpa is a mobile application that I developped from just the idea of connecting people who want to go hikking with local guides
I had to learn everything from scratch like [react native](https://reactnative.dev/) and how to manage the backend side that is done with [amazon web sevices](https://aws.amazon.com/es/).


Velpa is a mobile aplication for connecting people who wants to go into an adventure and local guides who know the route.

# Screenshots
![Home screen](https://user-images.githubusercontent.com/24461382/194242983-1101598c-8115-473e-b456-ff6989c4e4c8.png)
![Screenshot_1665038990](https://user-images.githubusercontent.com/24461382/194242979-9115db67-5568-415e-91b1-b1e56cd39867.png)
![Screenshot_1665039032](https://user-images.githubusercontent.com/24461382/194242975-48a6530e-6ddd-4a44-b824-54559a01ae3a.png)
![Profile screen](https://user-images.githubusercontent.com/24461382/194242971-b2431747-c7c1-440f-8078-dcb308882336.png)
![Screenshot_1665039541](https://user-images.githubusercontent.com/24461382/194242984-d2bb93fe-2ec7-4499-a225-e61e7c25eda5.png)

# Videos

![First 2 pages](https://user-images.githubusercontent.com/24461382/194230345-ffec53ae-0864-41e7-968b-feafc4041a5e.mp4)
![Velpa promo video](https://www.youtube.com/watch?v=Wyr_c_Jb4wY&ab_channel=Al%C3%A1ndeLimelette)


# Functionalities

## Auth:
When a user join the app, it is mandatory to sign in for continuing.
For this integration, I have used [amazon cognito](https://aws.amazon.com/es/cognito/) for handling users and identities and have integrated it with [google OAuth](https://docs.amplify.aws/lib/auth/social/q/platform/js/#configure-auth-category)
* Email verification code
* Reset password
* 

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

