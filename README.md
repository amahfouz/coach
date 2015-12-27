# Coach — app to assist soccer coaches

This app aids soccer coaches (and other team sports) sketch and animate team tactics.

## Building 

`npm` is preconfigured to automatically run `bower` so we can simply do:

```
npm install
```

## Running

and to start the web server
```
npm start
```

Now browse to the app at `http://localhost:8000/app`.

## Directory Layout

```
bower.json		--> Bower config file
gulpfile.json		--> Gulp config file
package.json		--> npm config file
README.md		--> Markdown readme file (this one) 
app/                    --> all of the source files for the application
  app.js                --> main application module
  index.html            --> app layout file (the main html template file of the app)
  assets/               --> web site assets
      /img		--> images and icons    
      /sass		--> SASS stylesheets
  ng/         --> all app specific angular modules
test/			--> test code and config
  karma.conf.js         --> config file for running unit tests with Karma
  e2e-tests/            --> end-to-end tests
      protractor-conf.js--> Protractor config file
      scenarios.js      --> end-to-end scenarios to be run by Protractor
```

## Testing

There are two kinds of tests in the application: Unit tests and End to End tests.

### Unit Tests

These are written in [Jasmine][jasmine], which is run with the [Karma Test Runner][karma]. .

To run the unit tests is to use the supplied npm script:

```
npm test
```

This script will start the Karma test runner to execute the unit tests. Moreover, Karma will sit and
watch the source and test files for changes and then re-run the tests whenever any of them change.

### End to end testing

These are also written in [Jasmine][jasmine]. These tests are run with the [Protractor][protractor] End-to-End test runner.  


