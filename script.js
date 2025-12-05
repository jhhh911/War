let deckId;
let compCard = "";
let userCard = "";
let compScorecard = document.getElementById('comp-score')
let myScorecard = document.getElementById('my-score')

function handleClick() {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then(res => res.json())
    .then(data => {
      deckId = data.deck_id;
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
      });
  }
}

document.getElementById("draw-cards").addEventListener("click", drawNewCards);

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
    return "The computer wins!";
  } else if (compValue < userValue) {
    return "You win!";
  } else if (compValue === userValue) {
    return "War!";
  } else {
    return "error!";
  }
}
