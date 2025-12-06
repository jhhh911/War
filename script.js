let deckId;
let compCard = "";
let userCard = "";
const compScorecard = document.getElementById("comp-score");
const myScorecard = document.getElementById("my-score");
const drawCards = document.getElementById("draw-cards");
const cardsRemaining = document.getElementById("cards-remaining");
const finalResult = document.getElementById("title");

let compScore = 0;
let userScore = 0;

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

async function handleClick() {
  const res = await fetch(
    "https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/"
  );
  const data = await res.json();
  showRemainingCards(data);
  deckId = data.deck_id;
  drawCards.disabled = false;
  resetScores();
}

document.getElementById("new-deck").addEventListener("click", handleClick);

async function drawNewCards() {
  if (deckId) return;
  const res = await fetch(
    `https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`
  );
  const data = await res.json();
  document.querySelectorAll(".card-slot").forEach((slot, i) => {
    slot.innerHTML = `<img src='${data.cards[i].image}' class='card'>`;
    i === 0
      ? (compCard = data.cards[i].value)
      : (userCard = data.cards[i].value);
  });
  finalResult.textContent = determineWinner(compCard, userCard);
  showRemainingCards(data);
}

drawCards.addEventListener("click", drawNewCards);

function determineWinner(card1, card2) {
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
  cardsRemaining.textContent = `Cards Remaining: ${input.remaining}`;
  if (!input.remaining) {
    drawCards.disabled = true;
    if (compScore > userScore) {
      finalResult.textContent = `The computer has won the war!`;
    } else if (compScore < userScore) {
      finalResult.textContent = `You have won the war!`;
    } else {
      finalResult.textContent = "The war is a draw!";
    }
  }
}

function resetScores() {
  compScore = 0;
  userScore = 0;
  compScorecard.textContent = `Computer score: ${compScore}`;
  myScorecard.textContent = `My score: ${userScore}`;
  document
    .querySelectorAll(".card-slot")
    .forEach(slot => (slot.innerHTML = ""));
}
