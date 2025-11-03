const player_name = "Dumb"

let player_hp = 100
let enemy_hp = 100

function roll_dice(dice_type) {
    return Math.ceil(Math.random() * dice_type)
}

function game_round() {
    let player_roll = roll_dice(20);
    let enemy_roll = roll_dice(20);

    console.log(`Player rolled ${player_roll}.\nEnemy rolled ${enemy_roll}.`)

    if (player_roll > enemy_roll) {
        damage = player_roll - enemy_roll;
        enemy_hp -= damage;

        console.log(`Player dealt ${damage} damage to enemy. Enemy has ${enemy_hp} HP left.`);
    }

    else if (player_roll < enemy_roll) {
        damage = enemy_roll - player_roll;
        player_hp -= damage;

        console.log(`Enemy dealt ${damage} damage to player. Player has ${player_hp} HP left.`);
    }

    else {
        console.log("The rolls were equal. No one was damaged... (suspense!)");
    };
}

game_round()