function Quiz(questions) {
    this.questions = questions;
    this.questionIndex = 0;
}
 
Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}
 
Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.questionIndex++;
    }
    else{
        sec = sec -10;
    }
}
 
function isEnded() {
    return this.questionIndex === this.questions.length;

}
 
 
function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}
 
Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}
 
//  Quiz questions
var questions = [
    new Question("Which built-in method adds one or more elements to the end of an array and returns the new length of the array?", ["A - last()", "B - put()", "C - push()","D - None of the above."], "C - push()"),
    new Question("Which of the following function of Number object returns the number's value??", ["A - toString()", "B - valueOf()", "C - toLocaleString()", "D - toPrecision()"], "B - valueOf()"),
    new Question("Which built-in method returns the calling string value converted to lower case?", ["A - toLowerCase()", "B - toLower()","C - changeCase(case)", "D - None of the above."], "A - toLowerCase()"),
    new Question("How can you get the type of arguments passed to a function?", ["A - using typeof operator", "B - using getType function", "C - Both of the above.", "D - None of the above."], "A - using typeof operator"),
    new Question("Which of the following function of String object creates an HTML anchor that is used as a hypertext target?",["A - anchor()","B - link()","C - blink()", "D - big()"], "A - anchor()" ),
    new Question("Which of the following function of String object splits a String object into an array of strings by separating the string into substrings?", ["A - slice()", "B - split()", "C - replace()", "D - search()"], "B - split()"),
    new Question("Which of the following function of Array object reverses the order of the elements of an array?",["A - reverse()","B - push()","C - reduce()","D - reduceRight()"], "A - reverse()")
]

//  function that shows the progress between questions
function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("completion");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};
 
var quizclear = document.querySelector ("#quiz");
var gameover = document.querySelector ("#gameover");
var highscore = document.querySelector ("#highscore");
var startscreen = document.querySelector ("#startscreen");
var startbutton = document.querySelector ("#start");
// When start button is clicked it allows for the fuction to work
startbutton.addEventListener("click",function(event){
    event.preventDefault;
    startscreen.style.display = "none";
    quizclear.style.display = "block";
    
})

function showScores() {
    var finalscore = document.querySelector ("#score");
    finalscore.textContent = "Finalscore "+ sec;
    quizclear.style.display = "none";
    gameover.style.display = "block";
};
// Function that controls the show highscore page
function showhighscore() {
    gameover.style.display = "none";
    highscore.style.display = "block";
    // Takes scores from local storage
    var scores = JSON.parse(localStorage.getItem("scores" ))
    var orderlist = document.querySelector ("#scores")
    orderlist.innerHTML = ""
    if (scores !== null) {
    scores.sort((a, b) => {
        return b.score - a.score;
    })
    for (let i = 0 ;i< scores.length; i++){
        var list = document.createElement("li")
        list.textContent = scores[i].inital + " " + scores[i].score;
    orderlist.append(list)

    }}


}
// Allows for go back button to work by hiding all of the other screens like highcore and showing start screen
    var Goback = document.querySelector ("#back");
    Goback.addEventListener("click", function(event){
        event.preventDefault()
        highscore.style.display = "none";
        startscreen.style.display = "block";
        sec = 75
        document.getElementById('timerdisplay').innerHTML=sec;
    })

    var clear = document.querySelector ('#clear');
    clear.addEventListener("click", function (event){
        event.preventDefault()
        localStorage.clear();
        showhighscore();
    })
// Controls submit button and Inital
    var submitbutton = document.querySelector ("#submit")
    submitbutton.addEventListener("click",function (event) {
        event.preventDefault()
        var inital = document.querySelector ("#inital")
        var userscore = {
            inital:inital.value, score:sec
        }
        // Keeps Initials onto local storage
        var scores = JSON.parse(localStorage.getItem("scores")) || [];
        scores.push(userscore);
        localStorage.setItem("scores", JSON.stringify(scores))
        showhighscore()
    } )  

var quiz = new Quiz(questions);

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};
 
var sec = 75
// Function that controls the timer that allows for it to count down.
function populate() {
    var timer = setInterval(function(){
        document.getElementById('timerdisplay').innerHTML=sec;
        sec--;
        if (sec < 0) {
            clearInterval(timer)
            showScores();
        }
    }, 1000);
    if(isEnded()) {
        showScores();
    }
    else {
        
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;
 
        
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }
 
        showProgress();
    }
};
populate();