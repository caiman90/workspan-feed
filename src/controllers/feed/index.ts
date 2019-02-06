import { IHttpService, IHttpResponse, IFilterService, IScope } from 'angular';
import { IFeedQuestion, IFeedQuestions, IFeedAnswer, IFeedAnswers } from './model';
import { initializeUpDownVotes, ANONYMUS, vote } from './helper';
import * as moment from 'moment';

export default class FeedController  {
    questions: Array<IFeedQuestion>
    newAnswer: string
    answers: Array<IFeedAnswer>
    $http: IHttpService
    $filter: IFilterService

    static inject: Array<string> = ['$http','$filter'];

    constructor($http: IHttpService, $filter: IFilterService){
       'ngInject';
        this.$http = $http;
        this.$filter = $filter;
        this.getAllQuestions();
    }
    // retrieve all questions and answers 
    // and populate 
    getAllQuestions(){
        this.$http.get('https://api.myjson.com/bins/dck5b').then((response: IHttpResponse<IFeedQuestions>) => {
            let questions = response.data.feed_questions;           
            this.$http.get('https://api.myjson.com/bins/hildr').then((response: IHttpResponse<IFeedAnswers>) => {
                for(let i=0; i < response.data.feed_answers.length; i++){
                    let answer = response.data.feed_answers[i];
                    // Fxing authors data, populating it with 
                    if(typeof answer.created_by !== 'object' ||	typeof answer.created_by === undefined || typeof answer.created_by.Avatar === 'object'){
                        answer.created_by = ANONYMUS;
                    }
                  // logic for determining number of votes 
                  // per question answer  
                  initializeUpDownVotes(answer);                 
                }
                for(let i=0; i < questions.length; i++){
                  questions[i].answers = this.$filter('filter')(response.data.feed_answers,{'Question-Id':questions[i].Id});
                  initializeUpDownVotes(questions[i]);
                }
                this.questions = questions; 
             }); 
         }); 
    }
    // allowing user to either upvote 
    // or downvote a question/answer 
    vote(object:any,downvoted:boolean){
      vote(object,downvoted);
    }

    // adding answer to particular question
    addAnswer(question: IFeedQuestion){
        if(this.newAnswer.length > 10){
            let answer = { Id: '#',
                Question_Id: question.Id,
                Answer: this.newAnswer,
                created_at: moment(new Date()).format('DD/MMM/YY HH:MM').toString(),
                created_by: ANONYMUS,
                downvotes: 0,
                upvotes: 0,
                downvoted:false,
                upvoted:false
            }
            question.answers.unshift(answer);
            this.newAnswer = '';
        }
    }
}