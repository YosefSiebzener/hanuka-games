var playerList = [];
var scoreList = [];
var pot;
var shin;
var ante;

function style(id, value) {
    document.getElementById(id).style.display = value;
}

function start() {
    style("welcomeBanner", "none");
    style("start","none");
    style("namesLabel", "initial");
    style("namesInput", "initial");
    style("geltInput", "initial");
    style("geltLabel", "initial");
    style("submitName", "initial");
    /* I was having trouble changing the display of the table or its parts, so I made it transparent for the title
    screen and then add the color in now. */
    document.getElementById("table").style.color = "yellow";
    document.getElementById("table").style.backgroundColor = "#551a8b";
    document.getElementById("table").style.borderColor = "yellow";
    for (let i = 0; i <= 1; i++) {
        document.getElementById("th" + i.toString()).style.borderColor = "yellow";
    }
    for (let i = 0; i <= 11; i++) {
        document.getElementById("td" + i.toString()).style.borderColor = "yellow";
    }
}

function appendNames() {
    /* This actually appends names and scores */
    let x = document.getElementById("namesInput").value;
    let y = document.getElementById("geltInput").value;
    playerList.push(x);
    scoreList.push(parseInt(y));
    style("tr" + playerList.length.toString(), "tableRow");
    displayScores();
    /* I only want the prompts for the pot to appear after its at least a 2 person game */
    if (playerList[1] !== undefined) {
        style("potLabel", "initial");
        style("potInput", "initial");
        style("submitPot", "initial");
    }
}

function startingPot () {
    pot = parseInt(document.getElementById("potInput").value);
    document.getElementById("displayPot").innerHTML = `There is ${pot} gelt in the starting pot.`;
    style("potLabel", "none");
    style("potInput", "none");
    style("submitPot", "none");
    style("displayPot", "initial");
    style("shinLabel", "initial");
    style("shinInput", "initial");
    style("submitShin", "initial");
}

function shinAmount() {
    shin = parseInt(document.getElementById("shinInput").value);
    document.getElementById("displayShin").innerHTML = `You lose ${shin} gelt for spinning a shin.`;
    style("shinLabel", "none");
    style("shinInput", "none");
    style("submitShin", "none");
    style("displayShin", "initial");
    style("anteLabel", "initial");
    style("anteInput", "initial");
    style("submitAnte", "initial");
}

function anteAmount() {
    ante = parseInt(document.getElementById("anteInput").value);
    document.getElementById("displayAnte").innerHTML = `You put ${ante} gelt into the pot at the beginning of \
your turn.`;
    style("startGame", "initial");
    style("displayAnte", "initial");
    style("anteLabel", "none");
    style("anteInput", "none");
    style("submitAnte", "none");
}

function displayScores() {
    for (i = 0; i < playerList.length; i++) {
        document.getElementById("player" + i.toString()).innerHTML = playerList[i];
        document.getElementById("score" + i.toString()).innerHTML = scoreList[i];
    }
    document.getElementById("player" + playerList.length.toString()).innerHTML = ""
    document.getElementById("score" + playerList.length.toString()).innerHTML = ""
    document.getElementById("potTotal").innerHTML = pot;
}

function ready() {
    displayScores();
    style("pic", "initial");
    style("dreidelBox","initial");
    style("potTotal", "initial");
    style("alerts", "initial");
    style("result", "initial");
    style("namesLabel", "none");
    style("namesInput", "none");
    style("geltLabel", "none");
    style("geltInput", "none");
    style("submitName", "none");
    style("displayPot", "none");
    style("displayShin", "none");
    style("displayAnte", "none");
    style("startGame", "none");
    document.getElementById("body").style.gridTemplateColumns = "33.3% 33.3% 33.3%";
    document.getElementById("table").style.gridColumn = "3";
    document.getElementById("table").style.width = "75.8%";
}

let imageArray = {
    spinNum: 0,
    spins: ['spin0.png', 'spin1.png', 'spin2.png', "spin3.png", "spin4.png", "spin5.png",
        "spin6.png", "spin7.png", "spin8.png", "spin9.png"
    ]
}

var img = document.getElementById("dreidel");

function spin() {
    img.src = imageArray.spins[imageArray.spinNum];
    imageArray.spinNum = (imageArray.spinNum + 1) % 10;
}

function shinEliminate() {
    document.getElementById("alerts").innerHTML = "Sorry " + playerList[turn] + ", you cannot afford that \
shin. You lose.";
    deletion();
}

function anteEliminate() {
    if (scoreList[turn] < ante) {
        document.getElementById("alerts").innerHTML = "Sorry " + playerList[turn] + ", you cannot afford the \
ante next round. You lose.";
        deletion();
    }
}

function deletion() {
    scoreList.splice(turn, 1);
    playerList.splice(turn, 1);
    displayScores();
    document.getElementById("player" + turn.toString()).innerHTML = ""
    document.getElementById("score" + turn.toString()).innerHTML = ""
    /* The code in playing() will make it the next players turn. However, that will skip someone. So I just counter what
     the code will do later */
    if (turn === 0) {
        turn = playerList.length - 1;
    } else {
        turn -= 1;
    }
}

function winner() {
    document.getElementById("alerts").innerHTML = "";
    document.getElementById("result").innerHTML = "";
    document.getElementById("pic").src = "";
    for (let i = 0; i <= 5; i++) {
        document.getElementById("player" + i.toString()).innerHTML = ""
    }
    for (let i = 0; i <= 5; i++) {
        document.getElementById("score" + i.toString()).innerHTML = ""
    }
    document.getElementById("table").style.color = "transparent";
    document.getElementById("table").style.backgroundColor = "transparent";
    document.getElementById("table").style.borderColor = "transparent";
    for (let i = 0; i <= 1; i++) {
        document.getElementById("th" + i.toString()).style.borderColor = "transparent";
    }
    for (let i = 0; i <= 11; i++) {
        document.getElementById("td" + i.toString()).style.borderColor = "transparent";
    }
    style("dreidelBox", "none");
    style("potTotal", "none");
    style("pic", "none");
    style("restart", "initial");
    style("mainMenuLink", "initial")
    style("mainMenuButton", "initial")
    document.getElementById("winnerBanner").innerHTML = `CONGRATULATIONS ${playerList[0].toUpperCase()}!<br>\
YOU HAVE WON!!!!!`;
}

function restart() {
    document.getElementById("winnerBanner").innerHTML = "";
    document.getElementById("spinner").disabled = false
    document.getElementById("body").style.gridTemplateColumns = "25% 15% 10% 50%";
    document.getElementById("table").style.gridColumn = "4";
    document.getElementById("table").style.width = "50%";
    document.getElementById("table").style.color = "yellow";
    document.getElementById("table").style.backgroundColor = "#551a8b";
    document.getElementById("table").style.borderColor = "yellow";
    for (let i = 0; i <= 1; i++) {
        document.getElementById("th" + i.toString()).style.borderColor = "yellow";
    }
    for (let i = 0; i <= 11; i++) {
        document.getElementById("td" + i.toString()).style.borderColor = "yellow";
    }
    style("alerts", "none");
    style("result", "none");
    style("restart", "none");
    style("mainMenuButton", "none")
    style("mainMenuLink", "none")
    playerList.splice(0, 1);
    scoreList.splice(0, 1);
    start()
}

var turn = 0;
function playing() {
    document.getElementById("alerts").innerHTML = "";       // These 3 lines of code only make a difference
    document.getElementById("result").innerHTML = "";       // after the 1st player goes.
    document.getElementById("pic").src = ""
    if (document.getElementById("spinner").innerHTML === "SPIN") {
        int = setInterval(spin, 50);
        document.getElementById("spinner").innerHTML = "STOP";
        scoreList[turn] -= ante;
        pot += ante;
        displayScores();
    }
    else {
        document.getElementById("spinner").innerHTML = "SPIN";
        clearInterval(int)
        /* When I just put in the in between numbers for the condition of the folliwing if statements, I was having
        issues. Like for example, on line 233, when I just put in imageArray.spinNum === 1, if I would stop the dreidel
        on imageArray.spinNum === 0, it would make it equal something else. So I had to put in the
        imageArray.spinNum === 0. */
        if (imageArray.spinNum === 0 || imageArray.spinNum === 1) {
            imageArray.spinNum = 0
            img.src = imageArray.spins[0]
        } else if (imageArray.spinNum === 2 || imageArray.spinNum === 3 || imageArray.spinNum === 4) {
            imageArray.spinNum = 3
            img.src = imageArray.spins[3]
        } else if (imageArray.spinNum === 5 || imageArray.spinNum === 6 || imageArray.spinNum === 7) {
            imageArray.spinNum = 6
            img.src = imageArray.spins[6]
        } else if (imageArray.spinNum === 8 || imageArray.spinNum === 9) {
            imageArray.spinNum = 9
            img.src = imageArray.spins[9]
        }
        if (imageArray.spinNum === 0) {
            document.getElementById("result").innerHTML = "YOU SPUN A HEY! YOU GET HALF OF THE POT!"
            document.getElementById("pic").src = "forhey.png"
            scoreList[turn] += Math.round(pot/2)
            pot -= Math.round(pot/2)
        } else if (imageArray.spinNum === 3) {
            document.getElementById("result").innerHTML = "YOU SPUN A GIMMEL! YOU GET THE WHOLE POT!"
            document.getElementById("pic").src = "forgimel.png"
            scoreList[turn] += pot
            pot = 0
        } else if (imageArray.spinNum === 6) {
            document.getElementById("result").innerHTML = "YOU SPUN A NUN. NOTHING HAPPENS."
            document.getElementById("pic").src = "fornun.png"
        } else if (imageArray.spinNum === 9) {
            document.getElementById("result").innerHTML = "YOU SPUN A SHIN. YOU LOSE SOME GELT."
            document.getElementById("pic").src = "forshin.png"
            if (scoreList[turn] >= shin) {
                scoreList[turn] -= shin;
                pot += shin
            }
            else {
                pot += scoreList[turn]      // If you have less money than the shin, the pot should only go up by as
                shinEliminate()             // gelt as you have.
            }
        }
        anteEliminate()
        console.log(document.getElementById("alerts").innerHTML)
        displayScores()
        if (playerList.length === 1) {
            document.getElementById("spinner").disabled = true
            setTimeout("winner()", 2000)
        }
        turn += 1
        turn %= scoreList.length
    }
}
