import { IState } from 'angular-ui-router';
import { IFeedQuestion } from '../feed/model';

export default class QuestionDetailsController {
    question: IFeedQuestion;
  
    static inject: Array<string> = ['$state'];

    constructor($state: IState){
        this.question = $state.params.question;
    }
 
}