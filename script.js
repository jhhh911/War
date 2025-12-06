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

const CARD_VALUES = {
  "2": 0, "3": 1, "4": 2, "5": 3, "6": 4, "7": 5,
  "8": 6, "9": 7, "10": 8,
  "JACK": 9, "QUEEN": 10, "KING": 11, "ACE": 12
};

// ==========================
// NEW DECK
// ==========================

async function handleClick() {
  try {
    const res = await fetch(
      "https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/"
    );
    const data = await res.json();

    deckId = data.deck_id;
    drawCards.disabled = false;
    showRemainingCards(data);
    resetScores();
  } catch (err) {
    console.error("Failed to fetch new deck:", err);
  }
}

document.getElementById("new-deck").addEventListener("click", handleClick);

// ==========================
// DRAW CARDS
// ==========================

async function drawNewCards() {
  if (!deckId) return;

  try {
    const res = await fetch(
      `https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`
    );
    const data = await res.json();

    const cardSlots = document.querySelectorAll(".card-slot");

    cardSlots.forEach((slot, i) => {
      slot.innerHTML = `<img src="${data.cards[i].image}" class="card">`;
    });

    [compCard, userCard] = data.cards.map(card => card.value);

    finalResult.textContent = determineWinner(compCard, userCard);
    showRemainingCards(data);
  } catch (err) {
    console.error("Failed to draw cards:", err);
  }
}

drawCards.addEventListener("click", drawNewCards);

// ==========================
// GAME LOGIC
// ==========================

function determineWinner(card1, card2) {
  const compValue = CARD_VALUES[card1];
  const userValue = CARD_VALUES[card2];

  if (compValue > userValue) {
    compScore++;
    compScorecard.textContent = `Computer score: ${compScore}`;
    return "The computer wins!";
  }

  if (compValue < userValue) {
    userScore++;
    myScorecard.textContent = `My score: ${userScore}`;
    return "You win!";
  }

  return "War!";
}

// ==========================
// UI HELPERS
// ==========================

function showRemainingCards(data) {
  cardsRemaining.textContent = `Cards Remaining: ${data.remaining}`;

  if (data.remaining === 0) {
    drawCards.disabled = true;

    if (compScore > userScore) {
      finalResult.textContent = "The computer has won the war!";
    } else if (compScore < userScore) {
      finalResult.textContent = "You have won the war!";
    } else {
      finalResult.textContent = "The war is a draw!";
    }
  }
}

function resetScores() {
  compScore = 0;
  userScore = 0;

  compScorecard.textContent = `Computer score: 0`;
  myScorecard.textContent = `My score: 0`;

  document.querySelectorAll(".card-slot").forEach(slot => {
    slot.innerHTML = "";
  });

  finalResult.textContent = "";
}