let angular = require('angular');
import 'angular-ui-bootstrap';
import '@uirouter/angularjs';
import 'angular-route';
import 'angular-material';
import 'angular-animate';
import 'angular-aria';
import 'angular-material/angular-material.css';
import 'material-design-icons/iconfont/material-icons.css';
import './styles/style.css';
import Routes from './routes';
import FeedController from './controllers/feed/';
import QuestionDetailsController from './controllers/question-details/'

angular.module('workspan-feed', ['ngRoute','ui.router','ui.bootstrap','ngMaterial'])
       .controller('feedCtrl', FeedController)
       .controller('questionDetailsCtrl', QuestionDetailsController)
       .config(Routes);
