import { IHttpService } from 'angular';

interface IFeedService {
    getAllQuestions(): ng.IPromise<any>;
    getAnswers(): ng.IPromise<any>
}

export default class FeedService implements IFeedService {

    static inject: Array<string> = ['$http'];

    constructor(private $http: IHttpService){'ngInject';}

    getAllQuestions() {
       return this.$http.get('https://api.myjson.com/bins/dck5b').then(this.success).catch(this.fail);
    }
    getAnswers() {
       return this.$http.get('https://api.myjson.com/bins/hildr').then(this.success).catch(this.fail);
    }

    private success: (response: any) => {} = (response) => response.data;

    private fail: (error: any) => {} = (error) => {
        alert("Status: " + error.data.status + " // " + "Message: " +  error.data.message);
        return "Error has occured";
    }   
}

   