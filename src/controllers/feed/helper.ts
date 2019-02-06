
// upvote/downvote object props
const UPVOTE='upvoted',
      UPVOTE_COUNT='upvotes',
      DOWNVOTE='downvoted',
      DOWNVOTE_COUNT='downvotes';

// setting additional flags to be able to 
// determine num of votes per question / answer
export const initializeUpDownVotes = (object:any) => {
    object.downvotes = Number(object.downvotes ? object.downvotes:0);
    object.upvotes = Number(object.upvotes ? object.upvotes:0);
    object.downvoted = false;
    object.upvoted = false;
}

// anonymus user 
export const ANONYMUS = { Name:'Anonymus',Surname:'', Avatar: undefined , Id:'anonymusId' };

// user vote / upvote vs downvote
export const vote = (object:any,downvoted:boolean) => {
    const propertyName = downvoted ? DOWNVOTE : UPVOTE; 
    const propertyCount = downvoted ? DOWNVOTE_COUNT : UPVOTE_COUNT;
    const invertedPropName = downvoted ? UPVOTE : DOWNVOTE;
    const invertedpropertyCount = downvoted ? UPVOTE_COUNT : DOWNVOTE_COUNT;

    if(object[propertyName]){
        object[propertyCount] -= 1;          
        object[propertyName] = false;
    }else{
        object[propertyCount] += 1;          
        object[propertyName] = true;
        if(object[invertedPropName]){
            object[invertedpropertyCount] -= 1;
            object[invertedPropName] = false;
         }  
    }
}