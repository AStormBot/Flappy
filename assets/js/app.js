const b = document.getElementById('bw');
const t = document.getElementById('tw');
const walls = document.getElementById('walls');
const bird = document.getElementById('bird');
let score = 0;

// By Defualt
t.style.left = "100%"
bird.style.top = "50%"
size = 75
// Move


// Data
let data = {
    top: {
        
    },
    bottom: {

    },
    walls: {
        left: parseInt(finder(t.style.left))
    },
    bird : {
        top: parseInt(finder(bird.style.top))
    }
}

// Functions
function finder(value) {
    let output = "";
    for (let i = 0; i < value.search('%') ; i++) {
        output += value[i]
    }

    return parseInt(output);
}

function px_detector(value) {
    let output = "";
    for (let i = 0; i < value.search('px'); i++) {
        output += value[i]
    }

    return output
}

function random_place() {
    t.style.top = (-randint(68, 100)) + "%";
    b.style.top = parseInt(finder(t.style.top))+ 50 + size + "%"
}


function bordertouch() {
    walls.style.display = 'none'
    data.walls.left = 120
    walls.style.display = 'block'
}

function randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + Number(min);
}

function gadr(value) {
    if (value >= 0) {
        return value
    }else {
        return -value
    }
}

function jump() {
    jbird = $('#bird')
    bird.className = ""
    jbird.addClass('active');
    let jump_count = 0;
    const jump_bow = setInterval(() => {
        jump_count++
        
        if (jump_count <= 8) {
            data.bird.top--
        }else {
            data.bird.top++
        }

        if (jump_count === 11) {
            clearInterval(jump_bow)
        }
    }, 100)
    setTimeout(() => {
        bird.className = ""
        jbird.addClass('drowning')
    }, 1000)
}

let something_good = 0;

const drowning = setInterval(() => {
    if (bird.classList.value === "drowning") {
        something_good += 1
        data.bird.top += something_good / 4
        if (data.bird.top >= 150) {
            gameover();
        }
    }else {
        something_good = 0
    }

}, 100)

random_place()


function check_kick() {
    if (finder(t.style.top) + 100 < finder(bird.style.top) && finder(bird.style.top) < finder(b.style.top)) {
        if (finder(walls.style.left) === 24) {
            score++
        }
    }else {
        gameover();
    }
}


const setting = setInterval(() => {
scrollTo(0, 0)
    

    // Progress
    if (data.walls.left <= -20) {
        bordertouch()
        random_place()
    }


    if (finder(document.getElementById('walls').style.left) < 26 && 15 < finder(document.getElementById('walls').style.left)) {
        check_kick()
    }

    data.walls.left = data.walls.left - 1

    // Wall locations
    

    // Set Data
    walls.style.left = data.walls.left + "%"
    bird.style.top = data.bird.top + "%"

document.getElementById('score').innerHTML = score

    // Debug
    // console.log(data.walls.left)
}, 100)

// Events
document.body.addEventListener('keypress', (e) => {
    if (e.key === " ") {
        jump()
    }
})

function gameover() {
    clearInterval(setting)
    clearInterval(drowning)
    document.getElementById('background').style.display = "flex"

}