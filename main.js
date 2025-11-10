// Utility functions to make me write less. E.g commonly used stuff turned into functions.

function random_choice(array) {
    const result = array[Math.floor(Math.random() * array.length)];

    return result;
};

function disable_button(button) {
    button.setAttribute("disabled", "disabled")
}

// Utility functions end

const player_name = "Dumb";
const next_round_btn = document.querySelector("#nextRoundBtn");
const player_hp_element = document.querySelector("#playerHp");
const enemy_hp_element = document.querySelector("#enemyHp");
const play_again_btn = document.querySelector("#playAgainBtn");
const combat_log_element = document.querySelector("#combatLog");
const player_roll_element = document.querySelector("#playerRoll");
const enemy_roll_element = document.querySelector("#enemyRoll");
const player_hp_heading = document.querySelector("#playerHpHeading");
const enemy_hp_heading = document.querySelector("#enemyHpHeading");
const warrior_button = document.querySelector("#warriorBtn");
const thief_button = document.querySelector("#thiefBtn");
const healer_button = document.querySelector("#healerBtn");

const game_classes = ["Warrior", "Thief", "Healer"];
const enemy = {
    "name": "Glub",
    "hp": 100,
    "type": "Evil Panda",
    "class": random_choice(game_classes)
};

const colour_green = "#72ff72";
const colour_red = "#ff1a1a";
const colour_yellow = "#ffff1a";

let player_hp = 100;
let player_class = "";
let enemy_class = "";

function roll_dice(dice_type) {
    return Math.ceil(Math.random() * dice_type);
};

function combatlog(message, type) {
    let entry = document.createElement("li")
    entry.classList.add(type)

    entry.appendChild(document.createTextNode(message))
    combat_log_element.appendChild(entry)
}

function game_round() {
    const player_roll = roll_dice(20);
    const enemy_roll = roll_dice(20);

    player_roll_element.textContent = player_roll;
    enemy_roll_element.textContent = enemy_roll;

    if (player_roll > enemy_roll) {
        const damage = player_roll - enemy_roll;
        const player_attack_messages = [
            `You make ${enemy.name} step on LEGOS, dealing ${damage} damage.`,
            `You steal ${enemy.name}'s kneecaps, dealing ${damage} damage.`,
            `You punch ${enemy.name} in the gut, dealing ${damage} damage.`,
            `You don't do anything, but ${enemy.name} stumbles and takes ${damage} damage.`,
            `You make ${enemy.name} relive childhood trauma, dealing ${damage} damage.`,
            `You bore the shit out of ${enemy.name}, dealing ${damage} damage.`
        ];

        enemy.hp -= damage;
        player_roll_element.style.color = colour_green;
        enemy_roll_element.style.color = colour_red;

        combatlog(random_choice(player_attack_messages), "enemyDamaged");
    }

    else if (player_roll < enemy_roll) {
        const damage = enemy_roll - player_roll;
        const enemy_attack_messages = [
            `${enemy.name} farts, and the smell makes you take ${damage} damage.`,
            `${enemy.name} punches you really hard, dealing ${damage} damage.`,
            `${enemy.name} spits you in the face. You are disgusted and take ${damage} damage.`,
            `You get flashed by ${enemy.name}. The trauma deals ${damage} damage.`,
            `${enemy.name} makes you relive childhood trauma, dealing ${damage} damage.`,
            `${enemy.name} bore the shit out of you. You take ${damage} damage.`
        ];

        player_hp -= damage;
        player_roll_element.style.color = colour_red;
        enemy_roll_element.style.color = colour_green;

        combatlog(random_choice(enemy_attack_messages), "playerDamaged");
    }

    else {
        player_roll_element.style.color = colour_yellow;
        enemy_roll_element.style.color = colour_yellow;

        combatlog("The rolls were equal. No one was damaged... (suspense!)", "tie");
    };

    const crown = " 👑";
    let winner = ""

    if (enemy.hp < 1 || player_hp < 1) {

        if (enemy.hp < 1) {
            combatlog("Player won!", "enemyDamaged");
            player_hp_heading.style.color = colour_green;
            enemy_hp_heading.style.color = colour_red;
            winner = "Player"
        }

        else if (player_hp < 1) {
            combatlog("Enemy won!", "playerDamaged");
            enemy_hp_heading.style.color = colour_green;
            player_hp_heading.style.color = colour_red;

            winner = "Enemy"
        };

        next_round_btn.setAttribute("disabled", "disabled");
        play_again_btn.style.display = "unset";
        console.log("round over")
    }

    else if (player_hp <= 30) {
        player_hp_element.classList.add("hpLow")
    }

    player_hp_element.textContent = player_hp < 1 ? 0 : player_hp;
    enemy_hp_element.textContent = enemy.hp < 1 ? 0 : enemy.hp;

    if (winner == "Player") {
        player_hp_element.textContent = player_hp_element.textContent + crown;
    }

    else if (winner == "Enemy") {
        enemy_hp_element.textContent = enemy_hp_element.textContent + crown;
    }
}

function play_again() {
    player_hp = 100;
    enemy.hp = 100;
    play_again_btn.style.display = "none";
    player_roll_element.textContent = "";
    enemy_roll_element.textContent = "";
    combat_log_element.innerHTML = ""
    player_hp_element.textContent = player_hp;
    enemy_hp_element.textContent = enemy.hp;
    player_hp_heading.style.color = "unset";
    enemy_hp_heading.style.color = "unset";
    player_hp_element.classList.remove("hpLow");

    next_round_btn.removeAttribute("disabled");
};

function pick_class() {
    if (this.id == "warriorBtn") {
        player_class = "Warrior";
    }

    else if (this.id == "thiefBtn") {
        player_class = "Thief";
    }

    else if (this.id == "healerBtn") {
        player_class = "Healer";
    }

    disable_button(warrior_button);
    disable_button(thief_button);
    disable_button(healer_button);

    const picked_class = document.querySelector("#pickedClass");

    picked_class.textContent = picked_class.textContent + player_class
    picked_class.style.display = "unset";
}

next_round_btn.addEventListener("click", game_round);
play_again_btn.addEventListener("click", play_again);
warrior_button.addEventListener("click", pick_class);
thief_button.addEventListener("click", pick_class);
healer_button.addEventListener("click", pick_class);