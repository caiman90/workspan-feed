import { IHttpService, IHttpResponse, IFilterService } from 'angular';
import { IFeedQuestion, IFeedQuestions, IFeedAnswer, IFeedAnswers } from './model';
import { initializeUpDownVotes,ANONYMUS } from './helper';

export default class FeedController {
    message:string;
    questions: Array<IFeedQuestion>;
    newAnswer: string;
    answers: Array<IFeedAnswer>
    $http: IHttpService;
    $filter: IFilterService

    static inject: Array<string> = ['$http','$filter'];

    constructor($http: IHttpService, $filter: IFilterService){
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
                    // Fxing authors data 
                    if(typeof answer.created_by !== 'object' ||	typeof answer.created_by === undefined || typeof answer.created_by === null){
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
    downvote(answer:IFeedAnswer){
        if(answer.downvoted){
            answer.downvotes -= 1;          
            answer.downvoted = false;
        }else{
            answer.downvotes += 1;               
            answer.downvoted = true;
            if(answer.upvoted){
                answer.upvotes -= 1;
                answer.upvoted = false;
             }  
        }
    }
    upvote(answer:IFeedAnswer){
        if(answer.upvoted){
            answer.upvotes -= 1;          
            answer.upvoted = false;          
        }else{
            answer.upvotes += 1;                    
            answer.upvoted = true;
            if(answer.downvoted){
                answer.downvotes -= 1;
                answer.downvoted = false;
             }   
        }
    }

    // adding answer to particular question
    addAnswer(question: IFeedQuestion){
        console.log("new ans" + this.newAnswer)
        if(this.newAnswer.length > 10){
            let answer = { Id: '#',
                Question_Id: question.Id,
                Answer: this.newAnswer,
                created_at: String(new Date()),
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