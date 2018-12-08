'use strict';

let score = 0;
let questNum = 0;

function homePage() {
 $('.container').append(
   `<div class="js-homepage">
      <h1>DC Universe Trivia</h1>

      <p>Answer questions correctly to earn 1 point</p>
      <p>Earn 5 points to win a shiny pin!</p>

      <button class="start">Start</button>
    </div>`
  );
  $('.start').on('click', event => progress());
};

function progress() {
  $('.container').empty();
  questionsPage();
}

function questionsPage() {
    $('.container').append(
      `<h2 class="score">Score ${score} </h2>
      <h1 class="questionText">${data.questions[questNum].text}</h1>
      <form id="quiz-form">
        <input name ="answer" type="radio" value="0" required/>${data.questions[questNum].choices[0]}<br/>
        <input name ="answer" type="radio" value="1" required/>${data.questions[questNum].choices[1]}<br/>
        <input name ="answer" type="radio" value="2" required/>${data.questions[questNum].choices[2]}<br/>
        <button type="submit" id="submit">Submit</button>
      </form>
      <h3 class="questionText">Question ${questNum+1}/7</h3>`  
    );

    $('#quiz-form').submit(event => {
   
    event.preventDefault();
   
    let userChoice = $('input[name=answer]:checked').val();
    let correct = data.questions[questNum].answerIndex;
    let answer = data.questions[questNum].choices[correct];

    if (userChoice == correct) {
      correctAnswer(answer);
      score++;
     }else {wrongAnswer(answer)};
    
    questNum++;

    $('#submit').addClass('hide');

    if (questNum >= data.questions.length){
      results();
     };

  });
};

function correctAnswer (answer) {
  $('.container').append(`<div>
  <h1 class="answerText">That's Right! The answer is ${answer}.</h1>
  <button class="continue">Continue</button>
  </div>`);
  $('.continue').on('click', event => progress());
};

function wrongAnswer (answer) {
  $('.container').append(`<div>
  <h1 class="answerText">Oh no! Sorry the correct answer was ${answer}.</h1>
  <button class="continue">Continue</button>
  </div>`);
  $('.continue').on('click', event => progress());
};

function results() {
  $('.continue').addClass('hide');
  $('.container').append(`<div>
  <button class="results">See Results</button>
  </div>`);
  $('.results').on('click', event => {
    
    $('.container').empty();

    if (score < 5){
    $('.container').append(`
      <div class="results-page">
        <h1>Sorry Kiddo, Better Luck Next Time</h1>
        <h2>Your Score: ${score}</h2>
        <button class="restart">Restart</button>
      </div>`
      )};

     if (score >= 5) {
      $('.container').append(`
        <div class="results-page">
          <h1>Congradulations!!!</h1>
          <h2>Your Score: ${score}</h2>
          <button class="pin">Collect Pin</button>
          <button class="restart">Restart</button>
        </div>`
      )};

      $('.pin').on('click', event => unlockPin());
      $('.restart').on('click', event => restart());
      }
  ); 
};

function unlockPin() {
    $('.container').append(`<div class="shiny_pin"><img src="https://www.angryyoungandpoor.com/store/pc/catalog/products/pins/bdc0136cnd.jpg"></div>`);
    $('.pin').addClass('hide');
  };  

function restart() {
  location.reload();
}              

homePage();

console.log(data.questions[6].choices[0]);


