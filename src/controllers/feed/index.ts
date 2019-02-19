import { IFilterService } from 'angular';
import { IFeedQuestion, IFeedQuestions, IFeedAnswer, IFeedAnswers } from './model';
import { initializeUpDownVotes, ANONYMUS, vote } from '../../helpers/helper';
import * as moment from 'moment';
import FeedService from '../../services/feed.service';

export default class FeedController  {
    private questions: Array<IFeedQuestion>
    private newAnswer: string
    private answers: Array<IFeedAnswer>

    static inject: Array<string> = ['feedService','$filter'];

    constructor(private feedService: FeedService,private $filter: IFilterService){
       'ngInject';
        this.getAllQuestions();
    }
    // retrieve all questions and answers 
    // and populate 
    getAllQuestions(){
        this.feedService.getAllQuestions().then((response: IFeedQuestions) => {
            let questions = response.feed_questions;           
            this.feedService.getAnswers().then((response: IFeedAnswers) => {
                for(let i=0; i < response.feed_answers.length; i++){
                    let answer = response.feed_answers[i];
                    // Fxing authors data, populating it with 
                    if(typeof answer.created_by !== 'object' ||	typeof answer.created_by === undefined || typeof answer.created_by.Avatar === 'object'){
                        answer.created_by = ANONYMUS;
                    }
                  // logic for determining number of votes 
                  // per question answer  
                  initializeUpDownVotes(answer);                 
                }
                for(let i=0; i < questions.length; i++){
                  questions[i].answers = this.$filter('filter')(response.feed_answers,{'Question-Id':questions[i].Id});
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