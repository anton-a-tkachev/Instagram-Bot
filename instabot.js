// Copyright Anton Tkachev 2016

// SETTINGS ------------------------------------------------------------
var likesLimit = 1000;		// limit for the number of likes
var followsLimit = 200;		// limit for the number of follows
var viewsLimit = 3000;		// limit for the number of views

var enableLikes = true;		// toggle liking activity (true/false)
var enableFollows = true;	// toggle following activity (true/false)

var likeProb = 90; 			// Probability to like a post, %
var followProb = 90;		// Probability to follow an account, %
//----------------------------------------------------------------------

// SCRIPT BODY ---------------------------------------------------------
var likesCount = 0;
var followsCount = 0;
var viewsCount = 1;

function actAsInstaHuman(){
	var likeElement  = document.querySelector('.coreSpriteHeartOpen');
	var nextArrow    = document.querySelector('.coreSpriteRightPaginationArrow');
	var followButton = document.getElementsByTagName("BUTTON")[0];
	
	var whenToLike = 0;
	var whenToFollow = 0;
	var whenToClickNext = 0;
	var whenToCheckCondition = 0;
	var whenToInvokeAgain = 0;
	
	// Schedule liking
	if(likeElement != null && enableLikes && Math.random()*100 < likeProb){
		whenToLike = 2000 + Math.random()*8000;
		setTimeout(function(){likeElement.click();likesCount++;console.log('Liked ' + likesCount);},whenToLike);
	}
	
	// Schedule following
	if(followButton.innerHTML == "Follow" && enableFollows && Math.random()*100 < followProb){
		whenToFollow = whenToLike + 2000 + Math.random()*8000;
		setTimeout(function(){followButton.click();followsCount++;console.log('Followed ' + followsCount);},whenToFollow);
	}
	
	// Schedule clicking next
	if(whenToFollow > whenToLike){
		whenToClickNext = whenToFollow + 2000 + Math.random()*2000;
	}
	else{
		whenToClickNext = whenToLike   + 2000 + Math.random()*2000;
	}
	setTimeout(function(){nextArrow.click();viewsCount++;console.log('Viewed ' + viewsCount);},whenToClickNext);
	
	// Schedule next run
	whenToCheckCondition = whenToClickNext + 2000 + Math.random()*2000;
	whenToInvokeAgain = whenToCheckCondition + 100;
	setTimeout(function(){
		if(likesCount < likesLimit && followsCount < followsLimit && viewsCount < viewsLimit){
			setTimeout(actAsInstaHuman,whenToInvokeAgain);
		}
		else{
			setTimeout(function(){console.log('One of the limits is reached. Script execution has stopped.');},whenToInvokeAgain);
		}
	},whenToCheckCondition);
}
//----------------------------------------------------------------------

// EXECUTION -----------------------------------------------------------
console.log('The script is running...');
console.log('Viewed ' + viewsCount);
actAsInstaHuman();
//----------------------------------------------------------------------
