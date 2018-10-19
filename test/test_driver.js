process.env.NODE_ENV = 'test';

var webdriver = require ('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;
var service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

var promise = driver.get('http://localhost:8080').then(function(){
  driver.wait(check_title);
});


function check_title(){
    var promise = driver.getTitle().then( function(title){
        if(title === 'Travis-CI')
        {
            console.log('success');
            return true;
        }
        else{
            console.log('fail -- ' + title);
        }
    });
    return promise;
}