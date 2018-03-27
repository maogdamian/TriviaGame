//------------------------------Making the Question/Answers for the Triva Game---------------//



//making an array that will store the value of my pontential answers --> each question will have 4 answer with the respective values ...
var abcd = ["a" , "b", "c", "d"];

//making an object that will store my questions and the potential answers. I will use an iterative function later to loop through this object and to make the needed html code
var allQs = {
    Q1:"What's the core of Harry Potter's wand made of?" ,
    ans1: ["Unicorn Hair" , "Troll Snot" , "Pixie Dust", "Pheonix Feather"],

    Q2:"Who is Harry Potter's godfather?",
    ans2: ["Remus Lupin", "Peter Pettigrew", "Sirius Black", "James Potter"],

    Q3: "What animagus is Rita Skeeter?",
    ans3:["Squirrel", "Dog", "Beetle", "ButteryFly"],

    Q4: "In what year of Hogwarts did Hermoine first make PollyJuice potion?",
    ans4: ["Year 1", "Year 2", "Year 3", "Year 4"],

    Q5: "In Harry's 4th year at Hogwarts, who entered his name into the Goblet of Fire?",
    ans5: ["Bartimus Crouch", "Mad-Eye Moody", "Bartimus Crouch Jr.", "Headmaster Dumbledore"],

    Q6: "In his 5th year, which creature has Harry able to see upon his <em>arrival</em> to Hogwarts?",
    ans6: ["Hippogriffs", "Thestrals", "Nargles", "Unicorns"],

    Q7: "What was Professor Umbridge's first name?",
    ans7: ["Susan", "Delfina", "Dolores", "Fleur"],

    Q8: "Who is the self-proclaimed Half-Blood Prince?",
    ans8: ["Harry Potter", "Tom Riddle", "Severus Snape", "Professor Slughorn"],

    Q9: "What was Tom Riddle researching (later making) during his youth to achieve ''immortality''? ",
    ans9: ["Unicorn Blood", "Deathly Hallows", "PolyJuice Potion", "Horcruxes"],

    Q10: "Who kills Nagini in the 'Battle of Hogwarts'?",
    ans10: ["Neville Longbottom", "Ron Weasley", "Caretaker Finch", "Seamus Finnagan"]
};

//an array that stores the solutions to my questions in the form of a, b, c, or d --> corresponds to the order the answers are in. Wil be used to correspond to the div id for each answer choice
var sol = ["d","c","c","b","c","b", "c","c","d","a"];
//solsOut = solutionsWrittenOut --> placing the written solutions in an array for indexing as each question and answerc choices are displayed
var solsOut = ["Pheonix Feather", "Sirius Black","Beetle","Year 2","Bartimus Crouch Jr.","Thestrals","Dolores","Severus Snape", "Horcruxes","Neville Longbottom"];


    //this function will go through my object (which alternates content in the format: question, answers, question, answers, etc.)
    function makeQ(){
        //adding 1 to my index
        i++;
        

        //Check if the index has reached 11 (there are only 10 questions). If so, display ONLY the results and  the start button so player can play again. Hide all other divs/sections
        if (i>=11){


            var theDisp = "<h1>The Game Is Over!</h1> <br><h3> Correct Answers: " + cAns + "<br> Wrong Answers: " + wAns  + "<br>Unanswered: " + uAns + "</h3";
            $(".theMsg").html(theDisp).show();
            $(".listedAnsSection").hide();
            $(".theQs").hide();
            $(".start").show();

        }

        //else if the index is less than equal to 10 --> display the current question from the object and the corresponding answers. also show the time, hide any previous msgs, and run setInterval each second so the timer update
        else if (i<=10) {

                $(".time").html("<h1> Time remaining: " +count + " seconds </h1>").show();

                $(".theMsg").hide();

                $(".theQs").html("<h3>" + allQs["Q"+i] + "</h3>").show();

                    //once a question is picked, I need to loop throught the array of answers and write them as part of the html.
                    for (j = 0; j <4; j++){
                        //name = q1 q2 q3...    value = a b c or d     id == q1a,q1b, ...q10a, q10c, q10d
                        $("#"+ abcd[j]).html(allQs["ans"+i][j]).show();
                    }

                //show the listed answers section after the loop updates the div
                $(".listedAnsSection").show();

                //set the variable down1 to setInterval. This should run theTimer every second. theTimer updates the DOM and check to see if the counter has reached zero
                down1 = setInterval(theTimer,1000);
            }
        
    };




// ---------------------Making the Timer for the Trivia Game --------------//
//Making global variables that will store the # of correct answers, wrong answers, and unanswered questions

var cAns;
var wAns;
var uAns;

var count; // will keep track of my count, starting with 7 sec
var down1; //will store the setInterval and run each second
var i; //this is the stating index that I will use to index/call each item in the object
var currentClick; //starting a variable that will store the div information (class, id) that the player clicked on


//a function that sets my global variables to their starting values (values at the beginning of the game)
//I am making a function so that reset option happens at the beginning of the game AND if the players wants to play again. This function will also run the function, MakeQ (which makes the question and updates the DOM)
function startSetup(){
    $(".start").hide();
    $(".listedAnsSection").show();
    $(".theMsg").show();
    $(".theQs").show();
    cAns = 0;
    wAns = 0;
    uAns = 0;
    i =0;
    count = 7;
    makeQ();

}
//BEFORE clikcing on the .start div/button, I want to hide all my other divs in the html. the start button is the only one I want to see at the start of the game
$(".listedAnsSection").hide();
$(".theMsg").hide();
$(".theQs").hide();
$(".time").hide()

$(".start").on("click",startSetup);


//a function that runs every second and updates the displayed time for the user to see
function theTimer(){
    count--;
    $(".time").html("<h1> Time remaining: " +count + " seconds </h1>").show(); 

    //if the count reaches zero (0), the variable that stores setInterval is cleared
    //also, lets the user know that time is up AND will display the correct answer
    //AND will wait 2 seconds before running makeQ again. all other divs are hidden
    if (count ==0){
        clearInterval(down1);
        $(".time").hide();
        $(".listedAnsSection").hide();
        $(".theMsg").hide();
        $(".theQs").hide();
        $(".time").hide()
        count = 7;
        uAns++;

        //let the user know time is up. show the correct solution. wait 3 seconds before making the next question with makeQ()
        $(".theMsg").html("<h3> Time is up! <br><br> The correct answer is: <h2>" + solsOut[i-1] + "</h2></h3>" ).show();
        setTimeout(makeQ,3000);

    }
}

//once clicking on one of the answer choices, the variable currentClick will store the id of the div that was clicked, hide the question, hide the answer choices, and run the function checkSol (which checks the user's choice to the actuall answer)
$(".answerChoices").on("click",function(){
    currentClick = $(this).attr("id");
    $(".listedAnsSection").hide();
    $(".theQs").hide();
    checkSol();
})


//CheckSol checks the users' seleceted answer choice to the actual aswers. This is done by comparing the clickedOnDIV id to the solution's array "sol"
function checkSol(){
    //clear the setInterval function, reset the count to 7, hide your time/display
    clearInterval(down1);
    count = 7;
    $(".time").hide();


    //if the solution picked is correct, let the player know and then set a 3 second timeout before makeing the next question. update the correct solution count "cAns""
    if (currentClick ==sol[i-1]){
        cAns++;
        $(".theMsg").html("<h3> This is Correct!!").show();
        setTimeout(makeQ,3000);
        

    }

    //if the solution picked is incorrect, let the player know and then set a 3 second timeout before makeing the next question.update the wrong solution count "wAns""
    else if (currentClick !=sol[i-1]){
        wAns++;
        $(".theMsg").html("<h3> This is INCORRECT. <br><br> The correct answer is: <h2>" + solsOut[i-1] + "</h2></h3>").show();
        setTimeout(makeQ,3000);
    }


}