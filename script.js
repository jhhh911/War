let deckId;

function handleClick() {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then(res => res.json())
    .then(data => {
      console.log(data);
      deckId = data.deck_id;
    });
}

document.getElementById("new-deck").addEventListener("click", handleClick);

function drawCards() {
  if (deckId) {
    fetch(
      `https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        document.querySelectorAll('.card-slot').forEach((slot, i) => {
          slot.innerHTML = `<img src='${data.cards[i].image}' class='card'>`
        })
      });
  }
}

document.getElementById("draw-cards").addEventListener("click", drawCards);
