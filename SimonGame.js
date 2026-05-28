let p = document.querySelector("p");
let btns = document.querySelectorAll(".btn");

let gameSeq = [];
let userSeq = [];
let start = false;
let gameLevel = 0;
userLevel = 0;

function getButton() {
    let rand = Math.floor(Math.random() * 4) + 1;
    return `btn${rand}`;
}

function levelUp() {
    gameLevel++;
    p.innerText = `Level ${gameLevel}`;

    let rand = getButton();
    let btn = document.querySelector(`.${rand}`);

    btn.classList.add("flashBlack");
    setTimeout(function () {
        btn.classList.remove("flashBlack");
    }, 250);

    gameSeq.push(rand);
}

document.addEventListener("keypress", function () {
    if (start == false) {
        start = true;
        levelUp();
    }
});

function checkAns() {
    if (userSeq[userLevel - 1] == gameSeq[userLevel - 1]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(() => {
                levelUp();
            }, 800);
            resetUser();
        }
    } else {
        p.innerHTML = `Game Over! Your score: ${gameLevel} <br> Press any Key to play again.`;
        resetGame();
    }
}

function resetUser() {
    userSeq = [];
    userLevel = 0;
}
function resetGame() {
    start = false;
    gameSeq = [];
    gameLevel = 0;
    resetUser();
}

function pressBtn() {
    userLevel++;

    let btn = this;
    let btnClass = btn.classList[1];
    userSeq.push(btnClass);

    btn.classList.add("flashBlack");
    setTimeout(function () {
        btn.classList.remove("flashBlack");
    }, 250);

    checkAns();
}

for (btn of btns) {
    btn.addEventListener("click", pressBtn);
}