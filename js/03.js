/* text effect */
var words = [
  '환타코더 김민정입니다',
  '스파클링 김민정입니다',
  '효율대장 김민정입니다'
];
var letters = "ㄱ",
    speedcount = 150,
    steps = 4,
    loader = document.querySelector('#loader');

function getRandomWord() {
  var randomWord = words[Math.floor(Math.random() * words.length)];
  return randomWord;
}
function getRandomLetter() {
  var randomLetter = letters[Math.floor(Math.random() * letters.length)];
  return randomLetter;
}

function randomWordLoop() {
  var word = getRandomWord();
  var textLength = word.length;
  for(var iww = 0; iww < textLength; iww++) {    
    (function(iww,word){
      letterAppear(iww, word);
    })(iww,word)
  }
  
  function letterAppear(iww, word) {
    setTimeout(function() {
      randomLetters(iww, word);
    }, speedcount*iww);  
  }

  function randomLetters(iww, word) {
    for (var jww = 0; jww <= steps; jww++) {
      charsAnim(iww, word, jww);
    }
  }

  function charsAnim(iww, word, jww) {
    setTimeout(function() {
      var count = jww; 
      if (jww < steps) {           
        randomChar(iww, word, count, jww);
      } else {
        goodChar(iww, word, count, jww);
      }
    }, ((speedcount/steps)*jww) - (speedcount/steps));
  }

  function randomChar(iww, word, count, jww) {
    var letter = getRandomLetter();    
    if (jww > 0) {
      var oldText = loader.textContent.slice(0, -1);
    } else {
      var oldText = loader.textContent;
    }
    loader.textContent = oldText + letter;    
  }
  function goodChar(iww, word, count, jww) {
    var oldText = loader.textContent.slice(0, -1);  
    loader.textContent = oldText + word[iww];
    if (iww == textLength - 1 ) {
      removeWord();
    }
  }
  
  function removeWord() {
    setTimeout(function() {
      for (var kww = 0; kww < textLength; kww++) {
         removeLetters(kww);
      }
    }, speedcount*2);
  }
  function removeLetters(kww) {
    setTimeout(function() {
      removeLetter(kww);
    }, 75*k);
  }
  function removeLetter(kww) {
    var actualText = loader.textContent.slice(0, -1);
    loader.textContent = actualText;
    if (kww == textLength - 1) {
      randomWordLoop();
    }
  }
}

randomWordLoop();