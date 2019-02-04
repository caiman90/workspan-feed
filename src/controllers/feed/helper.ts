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