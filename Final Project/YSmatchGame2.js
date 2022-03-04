class Card {
    constructor(pic, value) {
        this.front = pic
        this.value = value
    }
}

var card0 = new Card("YSdreidel.jpeg", 0)     // See line 108 where I explain why I made the values of the same
var card1 = new Card("YSdreidel.jpeg", 1)     // card off by 1.
var card2 = new Card("YSlatke.jpeg", 3)
var card3 = new Card("YSlatke.jpeg", 4)
var card4 = new Card("YSmenorah.png", 6)
var card5 = new Card("YSmenorah.png", 7)
var card6 = new Card("YSoil.png", 9)
var card7 = new Card("YSoil.png", 10)
var card8 = new Card("YSsufganya.jpeg", 12)
var card9 = new Card("YSsufganya.jpeg", 13)
var card10 = new Card("YSgelt.jpeg", 15)
var card11 = new Card("YSgelt.jpeg", 16)

cardList = [card0, card1, card2, card3, card4, card5, card6, card7, card8, card9, card10, card11]

cardsOrder = []

function randomNumGen() {
    for (let j = 0; j < cardList.length; j++) {
        let x = Math.floor(Math.random() * 12)
        let i = 0
        while (i < cardsOrder.length) {
            if (x === cardsOrder[i]) {      // Meaning, if the new number generated equals a number already on the list,
                i = 0                       // then I want to get a new random number.
                x = Math.floor(Math.random() * 12)
            } else {
                i++
            }
        }
        cardsOrder.push(x)
    }
}

var time = 0

function displayClock() {
    time++
    document.getElementById("timer").innerHTML = `${time.toString()} seconds`
}
var inter

var highScore = Infinity

function start() {
    document.getElementById("background").style.display = "initial"
    document.getElementById("title").style.display = "none"
    randomNumGen()
    document.getElementById("timer").innerHTML = `${time.toString()} seconds`
    document.getElementById("start").style.display = "none";
    for (let j = 0; j < cardList.length; j++) {
        document.getElementById("button" + j.toString()).style.display = "initial";
    }
    inter = setInterval("displayClock()", 1000)
}

function restart() {
    document.getElementById("victoryBanner").innerHTML = ""
    document.getElementById("mainMenuButton").style.display = "none"
    document.getElementById("mainMenuLink").style.display = "none"
    valueList.splice(0, 2)
    selectedList.splice(0, 2)
    matched = 0
    time = 0
    for (let j = 0; j < cardList.length; j++) {
        document.getElementById("img" + j.toString()).src = "YSquestion.png"
    }
    cardsOrder.splice(0, 12)
    document.getElementById("playAgain").style.display = "none"
    start()
}

function winner() {
    clearInterval(inter)
    document.getElementById("button" + selectedList[0].toString()).style.display = "none"       // This makes
    document.getElementById("button" + selectedList[1].toString()).style.display = "none"       // the last two
    document.getElementById("playAgain").style.display = "initial"      // cards disappear immediately.
    document.getElementById("mainMenuLink").style.display = "initial"
    document.getElementById("mainMenuButton").style.display = "initial"
    document.getElementById("result").innerHTML = ""
    if (time < highScore) {
        document.getElementById("victoryBanner").innerHTML = `CONGRATULATIONS! YOU'VE WON IN ${time} SECONDS \
AND SET A NEW HIGH SCORE!`
        highScore = time
        document.getElementById("highScore").innerHTML = `HIGH SCORE: ${highScore} seconds`
    } else {
        document.getElementById("victoryBanner").innerHTML = `CONGRATULATIONS! YOU'VE WON IN ${time} SECONDS.\
<br>Unfortunately, you did not beat the high score.`
    }
}

var valueList = []
var selectedList = []
var matched = 0

function flip(i) {
    c = document.getElementById("img" + i.toString())
    c.src = cardList[cardsOrder[i]].front       // This will be a random picture. cardsOrder is a randomized array of
    valueList.push(cardList[cardsOrder[i]].value)       // numbers.
    selectedList.push(i)
    if (valueList.length === 2) {       // Meaning, you picked 2 cards.
        if (Math.abs(valueList[0] - valueList[1]) === 1) {      // The reason I did it this way, as opposed to making
            matched += 2        // cards with the same picture have the same value was so that if you pic the same card
            if (matched === cardList.length) {      // twice, it will not count as a match.
                winner()
            } else {
                document.getElementById("result").innerHTML = "YOU HAVE FOUND A MATCH!!!"
                for (let j = 0; j < cardList.length; j++) {
                    document.getElementById("button" + j.toString()).disabled = true;
                }
                setTimeout(function () {
                    document.getElementById("button" + selectedList[0].toString()).style.display = "none"
                    document.getElementById("button" + selectedList[1].toString()).style.display = "none"
                    valueList.splice(0, 2);
                    selectedList.splice(0, 2);
                    for (let j = 0; j < cardList.length; j++) {
                        document.getElementById("button" + j.toString()).disabled = false
                    }
                }, 1500)
            }
        } else {
            document.getElementById("result").innerHTML = "You did not find a match."
            for (j = 0; j < cardList.length; j++) {
                document.getElementById("button" + j.toString()).disabled = true;
                setTimeout(function () {
                        for (let j = 0; j < cardList.length; j++) {
                            document.getElementById("img" + j.toString()).src = "YSquestion.png";
                            document.getElementById("button" + j.toString()).disabled = false;
                        }
                    }, 1500
                )
                valueList.splice(0, 2)
                selectedList.splice(0, 2)
            }
        }
    } else {
        document.getElementById("result").innerHTML = "Choose another card"
    }
}
