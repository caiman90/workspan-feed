export interface IFeedQuestion {
    Id: string,
    Text: string,
    downvotes: number,
    upvotes: number
    answers: Array<IFeedAnswer>
  }
export interface IFeedQuestions {
    feed_questions: Array<IFeedQuestion>
}
export interface IFeedAnswer {
    Id: string,
    Question_Id: string,
    Answer:string,
    created_at:string,
    created_by:IAuthor,
    downvotes: number,
    upvotes: number
    downvoted:boolean,
    upvoted:boolean
  }
export interface IFeedAnswers {
    feed_answers: Array<IFeedAnswer>
}
export interface IAuthor {
    Name: string,
    Surname: string, 
    Avatar: any, 
    Id:string
}