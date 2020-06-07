# Chicha

## How to start

Create an `.env` file following the example `.env.sample`. You'll need to first sign up with Mapbox GL and get a public API token (it's free).

Start frontend app with `npm start`.

Go to **http://localhost:5000** (or whatever port configured in `.env`)

## Description

Discover the city's best events!

## Motivation

Every day thousands of people search for "**things to do near me**" in search engines. Chicha is a **better way** for users to find great local things to do, while at the same time **supporting local** creators and businesses.

Chicha connects users, tastemakers and local businesses: 
- **Users** view, sort and filter a list of events as well as add and vote on events.
- **Tastemakers** such as artists, bloggers and promoters ("heavies") who share the most gain visibility and influence.
- **Local businesses** attract more customers through coupons that users and tastemakers earn on the platform.

## Points

Points motivate users and heavies to interact with and add events to the system. They can also be used to buy coupons that are redeemed at local businesses.

Gain points as follows:

- Gain 10 points for adding a unique event
- Gain 1 point for voting (either up or down)
- Gain +/- 1 point if an event you added has been up/downvoted (you can vote on your own event)

If you remove your vote or delete an event you added, your point balance will be reduced.

If you purchase a coupon your point balance will be reduced. Heavies are ranked by lifetime points earned ("Chicha") so you don't lose your Heavies standing for buying coupons with your points.

## Test users

Test user:
- Username: **User**
- Password: **Ironhack1**

We've started the test User off with 100 points to spend on offers.

Test partner:
- Username: **Partner**
- Password: **Ironhack1**

Partners can use the system like a regular User except they also can scan coupon QR codes on the Offers tab.

## Instructions

**This MVC has been optimized for mobile device view (select iPhone 6/7/8 in Developer tools) in Chrome desktop.**

**Register**

- register leaving some fields blank
- register with a weak password.

**Home**

- login leaving some fields blank
- login with incorrect information

**Events**

The default view is ordered by most upvoted events, with only events from today onwards shown.

- Sort by start date or recently added
- Filter by this week or this weekend
- Search for something
- Vote on an event, then check your point balance in Offers.
- Remove your vote, then check your point balance
- Move the drag handle up and down.
- Interact with the map … click on an event.

**Add Event**

- Leave the field blank and submit
- Paste an invalid event URL
- Paste a valid event
- After adding an event check your point balance
- Go back to the Events list and click on the Pencil icon on your event to Edit Event
- Click on the trash icon on your event to delete it. Then check your point balance.

**Heavies**

- See who's been sharing the most

**Offers**

- Click on an offer and get the coupon
- Use your phone to login and view the coupon, or take a picture of the coupon QR code with your phone
- Then, login with the Partner (on your computer) and navigate to Scan coupon … hold up your phone (showing the coupon QR code)
- Try to scan the code again
- NOTE: scanning works on desktop or Android with any browser, but on iOS you must use Safari since Apple only allows access to the WebRTC `getUserMedia()` API on Safari (as a fallback, for other browsers on iOS we can implement the QR Code reader in legacy mode which simply requires taking a photo)

**Profile**

- Turn dark mode on, then check out some of the other screens
- Edit your profile
- Delete your profile, just click cancel not OK in the prompt!
- Logout

## User Stories

**404** - As a user, I want to see a useful 404 page when I attempt to access a page that doesn't exist so that I have useful options for moving forward.

**500** - As a user, I want to see a clear error page when something has broken with the website so that I understand what's happened.

**Homepage** - As a user, I want to quickly understand what the website is about so that I can decide whether I want to sign up.

**Register** - As a user, I want to easily register a new account on the website so that I will be able to use the site (to find and share events and earn local rewards).

**Sign in** - As a user, I want to be able to quickly sign in to the website so that I can continue using the site (to find and share events and earn local rewards).

**Events** - As a user, I want to view, filter/search, and upvote/downvote events so that I can find things to do and earn rewards.

**Event - detail** - As a user, I want to see the event details so that I can decide if I want to attend.

**Events - add** - As a user, I want to create an event so that this information can be seen by others, I gain visibility and I earn rewards.

**Events - edit** - As a user, I want to be able to update the details of an event I have loaded so that I can add or correct information.

**Heavies** - As a user, I want to see the users who have recommended the most / best events so that I can find new sources to recommend events to me.

**Offers** - As a user, I want to see my points and a list of offers so that I can choose an offer to redeem.

**Offers - detail** - As a user, I want to the details on a particular offer so that I can choose to redeem it.

**Offers - my coupons** - As a user, I want to see a list of my coupons so that I can use the offers that I have redeemed at local businesses.

**Offers - redeem** - As a local business partner, I want to be able to redeem a coupon.

**Profile** - As a user, I want to update my user profile (change my username, password and profile pic) as well as log out so that no one else can use my account.

## Backlog

Other features outside of the MVP scope:

**Responsive CSS** test and adapt to various mobile device views, then add tablet and desktop.

**Heavies detail**: add list of each individual heavy's recommendations

**Onboarding**: create a screen when user logs in to explain how the app works

**Facebook Login**: login with Facebook, use profile photo of user

**Local business role**: local businesses can add / update offers and receive information on users who have redeemed their offers

**Cloudinary**: store images (not just URLs)

**Favorites**: user can save events to favorites

## Views

| View (Component)        | Path                    | Description              |
| ----------------------- | ----------------------- | -----------------------  |
| Home                    | `/`                     | home / sign in           |
| Register                | `/register`             | register user            |
| Events                  | `/events`               | map & list of events     |
| Event details           | `/events/:id`           | details on an event      |
| Edit event              | `/events/:id/edit`      | update an event          |
| Add event               | `/events/add`           | create event             |
| Edit event              | `/events/:id/edit`      | update event             |
| Heavies                 | `/heavies`              | list of heavies          |
| Offers                  | `/offers`               | list of offers / coupons |
| Profile                 | `/profile`              | user profile             |
| Edit profile            | `/profile/edit`         | update user profile      |

In addition there is information displayed in modal or component views that are toggled, such as the Sort and Filter modal views on the Events page as well as the Offers detail and Scanned coupon modal views on the Offers page.

## Links

### Deployment

[API – Heroku](https://chicha-api.herokuapp.com)

[Frontend - Netlify](https://chicha.netlify.app)

### Presentation

[Google Slides](https://docs.google.com/presentation/d/1ZDxZknsIUCLrHTaYEsYjcc_06KRAZxgNZ9bg7SMssiY/edit#slide=id.p)

### Design

[Wireframes - Figma](https://www.figma.com/file/BsoiB5w5Bs3kwC1vOBkCv1/Chicha-Wireframes?node-id=0%3A1)

[Colors - Trello](https://trello.com/c/vI9AoIQY/38-colors)

[Color inspiration - Figma](https://www.figma.com/file/3nKA7yEvj6A0MT0WW8CxWF/Colors?node-id=0%3A1)

### Git

[GitHub repository - frontend](https://github.com/michaelsmueller/chicha)

[GitHub repository - API](https://github.com/michaelsmueller/chicha-api)
