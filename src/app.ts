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
import QuestionDetailsController from './controllers/question-details/';
import AnswerComponent from './components/answer/answer.component';
import FeedService from './services/feed.service';
import QuestionComponent from './components/question/question.component';

angular.module('workspan-feed', ['ngRoute','ui.router','ui.bootstrap','ngMaterial'])
              .service('feedService', FeedService)
              .controller('feedCtrl', FeedController)
              .controller('questionDetailsCtrl', QuestionDetailsController)
              .directive('answerComponent', AnswerComponent.instance)
              .directive('questionComponent', QuestionComponent.instance)
              .config(Routes);
