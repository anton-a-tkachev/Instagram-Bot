// Copyright Anton Tkachev 2016

// SETTINGS ------------------------------------------------------------
// Instagram limit policies module
var likesLimit = 1000;		// limit for the number of likes
var followsLimit = 200;		// limit for the number of follows
var viewsLimit = 3000;		// limit for the number of views

// Turn like and follow activities on/off
var enableLikes = true;		// toggle liking activity (true/false)
var enableFollows = true;	// toggle following activity (true/false)

// Human-like behaviour module
var likeProb = 100; 		// probability to like a post, in (%)
var followProb = 100;		// probability to follow an account, in (%)

// Timing
var delayFixed = 2000;		// fixed time delay between actions, in (ms)
var delayRandom = 1000;		// maximum for additional random time delay, in (ms)
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
		whenToLike = delayFixed + Math.random()*delayRandom;
		setTimeout(function(){likeElement.click();likesCount++;console.log('Liked ' + likesCount);},whenToLike);
	}
	
	// Schedule following
	if(followButton.innerHTML == "Follow" && enableFollows && Math.random()*100 < followProb){
		whenToFollow = whenToLike + delayFixed + Math.random()*delayRandom;
		setTimeout(function(){followButton.click();followsCount++;console.log('Followed ' + followsCount);},whenToFollow);
	}
	
	// Schedule clicking next
	if(whenToFollow > whenToLike){
		whenToClickNext = whenToFollow + delayFixed + Math.random()*delayRandom;
	}
	else{
		whenToClickNext = whenToLike   + delayFixed + Math.random()*delayRandom;
	}
	setTimeout(function(){nextArrow.click();viewsCount++;console.log('Viewed ' + viewsCount);},whenToClickNext);
	
	// Schedule next run
	whenToCheckCondition = whenToClickNext + delayFixed + Math.random()*delayRandom;
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
