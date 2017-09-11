# React Rails Artist Blog/Portfolio

This repo facilitates creation of a simple artist blog/portfolio with the following features. 
  * Redux powered single user admin page
  * File uploads, immediate image previews
  * Shorthand for image and video tags in a bare-bones WYSIWYG
  * Toggle in between shorthand and HTML and immediately see post previews
  * Featured, Portfolio and Blog post types. 
  * Quickly add tags.

## Getting Started
```
npm install
bundle install
rails db:migration
npm start
```

## Testing
```
npm test
```
Will run a continual jest/enzyme unit tests of the redux powered admin. 
```
rails test
```
For functional and integration tests. 


## Logging into Admin

There is no users databse. This is a single user application.  You can use your own authentication process or manually run a BCrypt::Password.create(YOUR_PASSWORD) and store the hash in a place where the app can find it.

*( See config/env.yml.sample for an example )*
