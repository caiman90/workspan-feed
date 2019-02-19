export default class AnswerComponent implements ng.IDirective {
  static $inject: Array<string> = [''];
  constructor() {}
   
  static instance(): ng.IDirective {
    return new AnswerComponent();
  }
  scope: {
    'answer': '=',
  };
  template: any = require('./answer.component.html');
  restrict: string = 'EA';
}
