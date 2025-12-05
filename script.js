let deckId;
let compCard = "";
let userCard = "";
const compScorecard = document.getElementById("comp-score");
const myScorecard = document.getElementById("my-score");
let compScore = 0;
let userScore = 0;
const drawCards = document.getElementById("draw-cards");
const cardsRemaining = document.getElementById("cards-remaining");
const finalResult = document.getElementById('title')

function handleClick() {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then(res => res.json())
    .then(data => {
      deckId = data.deck_id;
      showRemainingCards(data);
      drawCards.disabled = false;
      resetScores();
    });
}

document.getElementById("new-deck").addEventListener("click", handleClick);

function drawNewCards() {
  if (deckId) {
    fetch(
      `https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`
    )
      .then(res => res.json())
      .then(data => {
        document.querySelectorAll(".card-slot").forEach((slot, i) => {
          slot.innerHTML = `<img src='${data.cards[i].image}' class='card'>`;
          i === 0
            ? (compCard = data.cards[i].value)
            : (userCard = data.cards[i].value);
        });
        document.getElementById("result").innerHTML = determineWinner(
          compCard,
          userCard
        );
        showRemainingCards(data);
      });
  }
}

drawCards.addEventListener("click", drawNewCards);

function determineWinner(card1, card2) {
  const cardArray = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "JACK",
    "QUEEN",
    "KING",
    "ACE",
  ];
  const compValue = cardArray.findIndex(i => card1 === i);
  const userValue = cardArray.findIndex(i => card2 === i);
  if (compValue > userValue) {
    compScore++;
    compScorecard.textContent = `Computer score: ${compScore}`;
    return "The computer wins!";
  } else if (compValue < userValue) {
    userScore++;
    myScorecard.textContent = `My score: ${userScore}`;
    return "You win!";
  } else if (compValue === userValue) {
    return "War!";
  } else {
    return "error!";
  }
}

function showRemainingCards(input) {
  cardsRemaining.innerHTML = `Cards Remaining: ${input.remaining}`;
  if (!input.remaining) {
    drawCards.disabled = true;
    if (compScore > userScore) {
      finalResult.textContent = `The computer has won the war!`
    } else if (compScore < userScore) {
      finalResult.textContent = `You have won the war!`
    } else {
      finalResult.textContent = 'The war is a draw!'
    }
  }
}

function resetScores() {
  compScore = 0;
  userScore = 0;
  compScorecard.innerHTML = `Computer score: ${compScore}`;
  myScorecard.innerHTML = `My score: ${userScore}`;
  document
    .querySelectorAll(".card-slot")
    .forEach(slot => (slot.innerHTML = ""));
}
