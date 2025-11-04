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

let player_hp = 100;
let enemy_hp = 100;

function roll_dice(dice_type) {
    return Math.ceil(Math.random() * dice_type);
};

function combatlog(message) {
    let entry = document.createElement("li")

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
        enemy_hp -= damage;
        player_roll_element.style.color = "green"
        enemy_roll_element.style.color = "red"

        combatlog(`Player dealt ${damage} damage to enemy.`);
    }

    else if (player_roll < enemy_roll) {
        const damage = enemy_roll - player_roll;
        player_hp -= damage;
        player_roll_element.style.color = "red"
        enemy_roll_element.style.color = "green"

        combatlog(`Enemy dealt ${damage} damage to player.`);
    }

    else {
        player_roll_element.style.color = "yellow"
        enemy_roll_element.style.color = "yellow"

        combatlog("The rolls were equal. No one was damaged... (suspense!)");
    };

    player_hp_element.textContent = player_hp;
    enemy_hp_element.textContent = enemy_hp;

    if (enemy_hp < 1 || player_hp < 1) {
        if (enemy_hp < 1) {
            combatlog("Player won!");
            player_hp_heading.style.color = "green"
            enemy_hp_heading.style.color = "red"
            player_hp_element.append("👑")
        }

        else if (player_hp < 1) {
            combatlog("Enemy won!");
            enemy_hp_heading.style.color = "green"
            player_hp_heading.style.color = "red"
            enemy_hp_element.append(" 👑")
        };

        next_round_btn.setAttribute("disabled", "disabled");
        play_again_btn.style.display = "unset";
    };
}

function play_again() {
    player_hp = 100;
    enemy_hp = 100;
    play_again_btn.style.display = "none";
    player_roll_element.textContent = "";
    enemy_roll_element.textContent = "";
    combat_log_element.innerHTML = ""
    player_hp_element.textContent = player_hp;
    enemy_hp_element.textContent = enemy_hp;
    player_hp_heading.style.color = "unset";
    enemy_hp_heading.style.color = "unset"

    next_round_btn.removeAttribute("disabled");
};

next_round_btn.addEventListener("click", game_round);
play_again_btn.addEventListener("click", play_again);