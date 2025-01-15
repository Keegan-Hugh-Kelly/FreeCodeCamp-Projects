let player = { hp: 100, maxHp: 100 };
let enemy = { hp: 100, maxHp: 100 };

function logMessage(message) {
    const log = document.getElementById('log');
    const newMessage = document.createElement('p');
    newMessage.textContent = message;
    log.appendChild(newMessage);
    log.scrollTop = log.scrollHeight; // Scroll to the bottom
}

function updateStats() {
    document.getElementById('playerStats').textContent = `Player: ${player.hp} HP`;
    document.getElementById('enemyStats').textContent = `Enemy: ${enemy.hp} HP`;
}

function attack() {
    const playerDamage = Math.floor(Math.random() * 15) + 5; // 5-20 damage
    const enemyDamage = Math.floor(Math.random() * 15) + 5; // 5-20 damage
    enemy.hp -= playerDamage;
    player.hp -= enemyDamage;

    logMessage(`Player attacks for ${playerDamage} damage!`);
    logMessage(`Enemy attacks back for ${enemyDamage} damage!`);

    checkGameOver();
    updateStats();
}

function heal() {
    const healAmount = Math.floor(Math.random() * 20) + 10; // 10-30 heal
    player.hp += healAmount;
    player.hp = Math.min(player.hp, player.maxHp); // Cap HP at max

    logMessage(`Player heals for ${healAmount} HP!`);

    const enemyDamage = Math.floor(Math.random() * 15) + 5; // 5-20 damage
    player.hp -= enemyDamage;

    logMessage(`Enemy attacks for ${enemyDamage} damage!`);

    checkGameOver();
    updateStats();
}

function checkGameOver() {
    if (player.hp <= 0 && enemy.hp <= 0) {
        logMessage("It's a draw!");
        disableActions();
    } else if (player.hp <= 0) {
        logMessage("Player has been defeated! Game over.");
        disableActions();
    } else if (enemy.hp <= 0) {
        logMessage("Enemy has been defeated! You win!");
        disableActions();
    }
}

function disableActions() {
    document.querySelectorAll('.actions button').forEach(button => {
        button.disabled = true;
    });
}

function resetGame() {
    player.hp = player.maxHp;
    enemy.hp = enemy.maxHp;
    document.getElementById('log').innerHTML = '';
    document.querySelectorAll('.actions button').forEach(button => {
        button.disabled = false;
    });
    updateStats();
    logMessage('Game restarted! Fight on!');
}

updateStats();