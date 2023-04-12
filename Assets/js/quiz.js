var questionsArr = [
    {
        question: "Commonly used data types DO NOT include:",
        options: {
            a: "1. strings", 
            b: "2. booleans", 
            c: "3. numbers", 
            d: "4. alerts",
        },
        answer: "d"
        
    },
  
    {
        question: "The condition in an if/else statement is enclosed with _____.",
        options: {
            a: "1. quotes", 
            b: "2. curly brackets", 
            c: "3. parenthesis", 
            d: "4. square brackets",
        },
        answer: "c"
    },
    {
        question: "Arrays in JavaScript can be used to store _____.",
        options: {
            a: "1. numbers and strings", 
            b: "2. other arrays", 
            c: "3. booleans", 
            d: "4. all of the above",
        },
        answer: "d"
    },
    {
        question: "String values must be enclosed within _____ when being assigned to variables.",
        options: {
            a: "1. quotes", 
            b: "2. curly brackets", 
            c: "3. parenthesis", 
            d: "4. commas",
        },
        answer: "a"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        options: {
            a: "1. JavaScript", 
            b: "2. terminal/bash", 
            c: "3. for loops", 
            d: "4. console.log",            
        },
        answer: "d"
    }
   
  ];
  
  //Access the elements from the html class and id
  var header = document.querySelector(".header");
  var maincontainer = document.querySelector(".maincontainer");
  var container = document.querySelector(".container");
  var divider = document.querySelector(".divider");
  var result = document.querySelector(".result");
  //Declare the Varaible
  var scores = [];
  var mark = 0;
  var index = 0;
  var record = [];
  
  function start() {
    //Display the quiz mainpage
    //clear all the content
    var remove = container;
    remove.innerHTML = "";
    
      //maincontainer title
      var maincontainerTitle = document.createElement("h1");
      maincontainerTitle.classList.add("title");
      maincontainerTitle.textContent = "Coding Quiz Challenge";
      container.appendChild(maincontainerTitle);

      //maincontainer innertext
      var maincontainerText = document.createElement("p");
      maincontainerText.classList.add("text");
      maincontainerText.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your time by 10 seconds and 10 scores!";
      container.appendChild(maincontainerText);

      // start quiz button
      var startBtn = document.createElement("button");
      startBtn.classList.add("btn" , "btn-start");
      startBtn.textContent = "Start Quiz";
     

      // Time display onthe main page
      var time = document.createElement("p");
      time.setAttribute("banner", "time");
      time.textContent = "Time: ";
      var second = document.createElement("span");
      second.setAttribute('id', "second");
      time.appendChild(second);

      //  High scores on the mainpage
      var viewScore = document.createElement("h");
      viewScore.setAttribute("class", "view-score");
      //adding the classes "banner" and "view-score" to the viewScore element.
      viewScore.textContent = "View HighScores";
      header.appendChild(viewScore);
      container.appendChild(startBtn);
    

    //The timer start when u select the startquiz button
    document.querySelector(".btn-start").addEventListener("click", timer);
    //Call viewHighScore function when u click the viewHighScore
    document.querySelector(".view-score").addEventListener("click", viewHighScore);
    header.appendChild(time);
  }
  
  function createQuiz() {
    //clear all the content
    var remove = container;
    remove.innerHTML = "";

    if (index < questionsArr.length)
     {  
        //  quiz container using html element
        var quizDiv = document.createElement("div");
        quizDiv.setAttribute("class","quiz");//using This class .quiz 
        container.appendChild(quizDiv);
    
        // create questions
        var quizTitle = document.createElement("h1");
        quizTitle.setAttribute("class","title");
        quizTitle.textContent = questionsArr[index].question;
        quizDiv.appendChild(quizTitle);

        // create options
        var optionsObj = questionsArr[index].options;//options array 
        for (var x in optionsObj) 
        //x is used to represent each property key in the optionsObj object.Here the x is a and then b
        {
            console.log(x);
            var quizOption = document.createElement("button");
            quizOption.setAttribute("class" , "btn btn-answer");
            if (x === questionsArr[index].answer)
             {
                quizOption.setAttribute("check", "correct");
                //if answer is correct it add new attribute 
                //name is "check" and the value is correct.Later it is checked by has attribute when the even targeted
            }
        quizOption.textContent = optionsObj[x];//display all the options 
        quizDiv.appendChild(quizOption);//so the attribute check is added to div through the children element
        }
        index++;
      
       divider.style.visibility ="visible";  
       document.querySelector(".quiz").addEventListener("click", checkResult);//checkResult function 
        // depend on the quiz result, the score added when the user clicks on any part of the .quiz element(div), the checkResult() function will be called.
    } 
    else {
        divider.style.visibility = "hidden";
        var done = document.createElement("h2");
        done.classList.add("title");
        done.textContent = "All done!";
        container.appendChild(done);
  
        var sum = document.createElement("p");
        sum.classList.add("text");
        sum.textContent = "Your final score is " + mark + " !";
        container.appendChild(sum);
  
        // form
        var formEl = document.createElement("form");
        formEl.classList.add = ("form");
        container.appendChild(formEl);
  
        var label = document.createElement("label");
        label.classList.add("text");
        label.textContent = "Enter initials:";
        formEl.appendChild(label);

        //show the result with intials and score
        var input = document.createElement("input");
        input.classList.add("text");
        input.setAttribute("type", "text"); 
        input.setAttribute("id", "name");//attribue name id and value name we can access later by getElementById
        input.setAttribute("placeholder", "name");//ENTER YOUR NAME 
        formEl.appendChild(input); 
  
        var submit = document.createElement("button");
        submit.classList.add("btn", "btn-submit");// pre-defined CSS framework or custom styling that has been added
        submit.textContent = "Submit";
        formEl.appendChild(submit);  
        // click submit button
        document.querySelector(".btn-submit").addEventListener("click", saveHighScore);
    }
  }
  
  function timer() {
    var timeLeft = 70;
    var timeInterval = setInterval(function() {
        var timeEl = document.querySelector("#second");
        timeEl.textContent = timeLeft + "s";
        timeLeft--; 
        if (result.textContent.match(/wrong/gi)) {
            timeLeft -= 10; 
          } 
        if (timeLeft < 0 || scores.length === questionsArr.length) {
            clearInterval(timeInterval);
            alert("Quiz is over");
            timeEl.textContent = 0 + "s"; 
            index += questionsArr.length; 
            createQuiz();
        }
    }, 1000); 
    createQuiz();
  }
  
  function checkResult(event) {
    
    var targetEl = event.target;//button click event targets div .quiz element
    console.log("tar" +targetEl);
    var check = document.createElement("p");
    check.classList.add("check-result");//css class
    console.log("check" + check)
    if (targetEl.hasAttribute("check")) {
        check.textContent = "Correct!";
        mark += 10;
    } else {
        check.textContent = "Wrong!";
        mark -= 10;
    }
    result.appendChild(check);
    scores.push(mark);
  
    setTimeout(() => {
        check.remove();
        createQuiz();//After the specified delay, the check element is removed from the DOM using the remove() method, and then the createQuiz() function is called to generate a new quiz.
    }, 1000);   
  }
  
  function saveHighScore(event) {
    event.preventDefault();
    scores.length = 0;
    index = 0;
    var playerName = document.querySelector("#name").value;
    if (!playerName) {
        alert("please enter a name.");
    } else {
        var playerRecord = {
            name: playerName,
            highScore: mark,
        }
    }
    record.push(playerRecord);
    saveLocalData();//call the method to save player record
    mark = 0;
    viewHighScore();
  }
  
  function viewHighScore() {
    header.style.border = "none";
    var removeHeader = header;
    header.innerHTML = "";
    container.innerHTML = "";

    var highScoresTitle = document.createElement("h1");
    highScoresTitle.classList.add("title");
    highScoresTitle.textContent = "High Scores";
    container.appendChild(highScoresTitle);
    getLocalData();

    var goBack = document.createElement("button");
    goBack.classList.add("btn", "btn-goBack");
    goBack.textContent = "Go Back";
    container.appendChild(goBack);
  
    var clear = document.createElement("button");
    clear.classList.add("btn", "btn-clear");
    clear.textContent = "Clear High Scores";
    container.appendChild(clear);
  
    document.querySelector(".btn-goBack").addEventListener("click", start);
    document.querySelector(".btn-clear").addEventListener("click", clearLocalStorage);
  }
  
  function saveLocalData() {
    localStorage.setItem("high scores", JSON.stringify(record));//stored as key and value
  }
  
  function getLocalData() {
    var load = localStorage.getItem("high scores"); 
    if (!load) {
        return false;
    }
    load = JSON.parse(load);//string to object used further in the program  
    for (var i = 0; i < load.length; i++) {
        var highScorestext = document.createElement("li");
        highScorestext.classList.add("list", "text");
        highScorestext.setAttribute("id", "quiz-mark");
        highScorestext.textContent = load[i].name + " : " + load[i].highScore;
        container.appendChild(highScorestext);
    }
  }
  
  function clearLocalStorage() {
    // clear localstorage
    window.localStorage.clear();
    var elements = document.querySelectorAll("#quiz-mark");
     for (var i = 0; i < elements.length; i++)
      {
     elements[i].remove();
      }
  }
  
  start();