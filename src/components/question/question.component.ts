export default class QuestionComponent implements ng.IDirective {
  static $inject: Array<string> = [''];
  constructor() {}
   
  static instance(): ng.IDirective {
    return new QuestionComponent();
  }
  scope: {
    'question': '=',
  };
  template: any = require('./question.component.html');
  restrict: string = 'EA';
}
