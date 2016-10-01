var React = require('react');
var ReactDOM = require('react-dom');
var routes = require('./config/routes');

var Raven = require('raven-js');

var sentryKey = '4c1e839f0524493c88f2626fcd67906b';
var sentryApp = '99825';
var sentryUrl = 'https://'+sentryKey+'@sentry.io/'+sentryApp;

var _APP_INFO = {
    name: 'Github Battle',
    branch: 'video4',
    version: '1.0'
}

Raven.config(sentryUrl, {
    release: _APP_INFO.version, 
    tags: {
        branch: _APP_INFO.branch
    }
}).install();

ReactDOM.render(
    routes,
    document.getElementById('app')
);