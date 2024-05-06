

const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
const suits = ["S", "D",  "C",  "H"]

let deck = []

let dealerCards1
let dealerCards2
let playerCards1
let playerCards2
let hitCard

let playerAceCount = 0
let dealerAceCount = 0
let dealerSum = 0
let playerSum = 0

let canHit = false
let canStand = false

const message = document.getElementById("message")

//--------------------------------------------------------------------------------------------//

// Running the function to create the deck when the browser page loads
window.onload = createDeck()

//--------------------------------------------------------------------------------------------//

// Creating the deck throuch the combination of the card values and suits previously declared
function createDeck(){
    suits.forEach((suit) => {
        values.forEach((value)=> {
            deck.push(value + " " + suit);
        });
    });
}

// Taking the value of the player's cards
function playerCardValue(card){
    let splitCard = card.split(" ")
    let value = splitCard[0]
    
    if (isNaN(value)) {
        if (value === "A") {
            playerAceCount += 1
            return 11
        } else {
            return 10
        }
    }
    return value
}

// Taking the value of the dealer's cards
function dealerCardValue(card){
    let splitCard = card.split(" ")
    let value = splitCard[0]
    
    if (isNaN(value)) {
        if (value === "A") {
            dealerAceCount += 1
            return 11
        } else {
            return 10
        }
    }
    return value
}

// Creating the hand of the player and the dealer 
function deal(){
    playerCards1 = deck.pop(Math.floor(Math.random() * deck.length))
    playerCards2 = deck.pop(Math.floor(Math.random() * deck.length))
    dealerCards1 = deck.pop(Math.floor(Math.random() * deck.length))
    dealerCards2 = deck.pop(Math.floor(Math.random() * deck.length))

    playerSum += playerCardValue(playerCards1) + playerCardValue(playerCards2)
    dealerSum += dealerCardValue(dealerCards1) + dealerCardValue(dealerCards2) 

    // Checking if the player's hand starts with two aces in case he doesn't hit
    if (playerSum === 22) {
        playerSum -= 10
        playerAceCount -= 1
    }

    // Checking if the dealer's hand start with two aces
    if (dealerSum === 22) {
        dealerSum -= 10
        dealerAceCount -= 1
    }

    canHit = true
}

// When the player chooses to hit
function hit(){
    if (canHit === true){
        // Adding another card to the hand and updating the sum
        hitCard = deck.pop(Math.floor(Math.random() * deck.length))
        playerSum += playerCardValue(hitCard)

        // Checking if the hand has bust and how many aces there are
        if (playerSum > 21 && playerAceCount > 0) {
            playerSum -= 10
            playerAceCount -= 1
            canStand = true;
        } else if (playerSum > 21 && playerAceCount === 0){
            message.innerText = "Dealer wins!"
            canStand = false;
        }
    }else{
        return
    }
}

// When the player chooses to stand
function stand(){
    if (canStand = true){
        if (dealerSum < 16){
            hitCard = deck.pop(Math.floor(Math.random() * deck.length))
            dealerSum += dealerCardValue(hitCard)
            splitCard = hitCard.split(" ")
    
            if (hitCard[0] === 'A' && dealerAceCount > 0){
                dealerSum -= 10
                dealerAceCount -= 1
            }
    
        }else if (dealerSum > 21){
            message.innerText = "You win!"
        }else if (dealerSum > playerSum){
            message.innerText = "Dealer wins!"
        }else if (dealerSum < playerSum){
            message.innerText = "You win!"
        }else if(dealerSum === playerSum){
            message.innerText = "Tie!"
        }
    }else{
        return
    }

}

document.getElementById("deal").addEventListener("click", deal)
document.getElementById("hit").addEventListener("click", hit)
document.getElementById("stand").addEventListener("click", stand)