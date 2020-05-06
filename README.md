# Chicha

## Instructions on how to start

Start app with `npm start`.

go to **http://localhost:3000**

## Description

Find, share and upvote your favorite things to do in Barcelona.

## Motivation

Crowdsource the best local events from knowledgable locals motivated to share and also get rewards from local businesses.

## User Stories

**404** - As a user, I want to see a useful 404 page when I attempt to access a page that doesn't exist so that I have useful options for moving forward.

**500** - As a user, I want to see a clear error page when something has broken with the website so that I understand what's happened.

**Homepage** - As a user, I want to quickly understand what the website is about so that I can decide whether I want to sign up.

**Register** - As a user, I want to easily register a new account on the website so that I will be able to use the site (to find and share events and earn local rewards).

**Sign in** - As a user, I want to be able to quickly sign in to the website so that I can continue using the site (to find and share events and earn local rewards).

**Events** - As a user, I want to view, filter/search, and upvote/downvote events so that I can find things to do and earn rewards.

**Event - detail** - As a user, I want to see the event details so that I can decide if I want to attend.

**Events - add** - As a user, I want to create an event so that this information can be seen by others, I gain visibility and I earn rewards.

**Events - update** - As a user, I want to be able to update the details of an event I have loaded so that I can add or correct information.

**Heavyweights** - As a user, I want to see the users who have recommended the most / best events so that I can find new sources to recommend events to me.

**Heavyweights - detail** - As a user, I want to see the events being recommended by a particular user that I like / think is knowledgable / has good taste so that I can find events I'll enjoy.

**Offers** - As a user, I want to see my points and a list of offers so that I can choose an offer to redeem.

**Offers - detail** - As a user, I want to the details on a particular offer so that I can choose to redeem it.

**Offers - my vouchers** - As a user, I want to see a list of my vouchers so that I can use the offers that I have redeemed at local businesses.

**Profile** - As a user, I want to update my user profile (change my username, password and profile pic) as well as log out so that no one else can use my account.

## Backlog

Other features outside of the MVP scope:

**Local business role**: local businesses can add / update offers and receive information on users who have redeemed their offers

**Onboarding**: create a screen when user logs in to explain how the app works

**Cloudinary**: store images (not just URLs)

**Favorites**: user can save events to favorites

## Views

| View (Component)        | Path                    | Description             |
| ----------------------- | ----------------------- | ----------------------- |
| Home                    | `/`                     | home / sign in          |
| Register                | `/register`             | register page           |
| Events                  | `/events`               | list of events          |
| Event details           | `/events/:id`           | details on an event     |
| Add event               | `/events/add`           | add event               |
| Edit event              | `/events/:id/edit`      | edit event              |
| Heavyweights            | `/heavyweights`         | list of heavyweights    |
| Heavyweight details     | `/heavyweights/:id`     | details on a heavyweight|
| Offers                  | `/offers`               | list of offers          |
| Offer details           | `/offers/:id`           | details on an offer     |
| My vouchers             | `/offers/myvouchers`    | list of redeemed offers |
| Profile                 | `/profile`              | user profile            |


## Links

### Trello

[Trello board](https://trello.com/b/O8DhDgcu/chicha)

### Git

[GitHub repository](https://github.com/michaelsmueller/chicha)

[GitHub repository - API](https://github.com/michaelsmueller/chicha-api)
