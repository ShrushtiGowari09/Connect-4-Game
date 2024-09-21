let val_c1 = 1, val_c2 = 1, val_c3 = 1, val_c4 = 1, val_c5 = 1, val_c6 = 1, val_c7 = 1;
let turn = 1;
const mode = new URLSearchParams(window.location.search).get('mode');
let player1Name = "Player 1";
let player2Name = "Player 2";

// Prompt for player names
if (mode === 'pvp') {
    player1Name = prompt("Enter name for Player 1:", "Player 1") || "Player 1";
    player2Name = prompt("Enter name for Player 2:", "Player 2") || "Player 2";
} else if (mode === 'pvc') {
    player1Name = prompt("Enter name for Player:", "Player") || "Player";
}

// Function to check for winner
function check(player) {
    setTimeout(() => {
        // Check vertical, horizontal, and diagonal wins
        for (let i = 1; i <= 7; i++) {
            for (let j = 1; j <= 3; j++) {
                if (document.getElementById(`c${i}r${j}`).style.backgroundColor === player &&
                    document.getElementById(`c${i}r${j + 1}`).style.backgroundColor === player &&
                    document.getElementById(`c${i}r${j + 2}`).style.backgroundColor === player &&
                    document.getElementById(`c${i}r${j + 3}`).style.backgroundColor === player) {
                    alert(`${player === 'red' ? player1Name : player2Name} wins!`);
                    document.getElementById("restartButton").style.display = "block"; // Show restart button
                    return;
                }
            }
        }
        for (let i = 1; i <= 6; i++) {
            for (let j = 1; j <= 4; j++) {
                if (document.getElementById(`c${j}r${i}`).style.backgroundColor === player &&
                    document.getElementById(`c${j + 1}r${i}`).style.backgroundColor === player &&
                    document.getElementById(`c${j + 2}r${i}`).style.backgroundColor === player &&
                    document.getElementById(`c${j + 3}r${i}`).style.backgroundColor === player) {
                    alert(`${player === 'red' ? player1Name : player2Name} wins!`);
                    document.getElementById("restartButton").style.display = "block"; // Show restart button
                    return;
                }
            }
        }
        for (let i = 1; i <= 4; i++) {
            for (let j = 1; j <= 3; j++) {
                if (document.getElementById(`c${i}r${j}`).style.backgroundColor === player &&
                    document.getElementById(`c${i + 1}r${j + 1}`).style.backgroundColor === player &&
                    document.getElementById(`c${i + 2}r${j + 2}`).style.backgroundColor === player &&
                    document.getElementById(`c${i + 3}r${j + 3}`).style.backgroundColor === player) {
                    alert(`${player === 'red' ? player1Name : player2Name} wins!`);
                    document.getElementById("restartButton").style.display = "block"; // Show restart button
                    return;
                }
            }
        }
        for (let i = 1; i <= 4; i++) {
            for (let j = 6; j >= 4; j--) {
                if (document.getElementById(`c${i}r${j}`).style.backgroundColor === player &&
                    document.getElementById(`c${i + 1}r${j - 1}`).style.backgroundColor === player &&
                    document.getElementById(`c${i + 2}r${j - 2}`).style.backgroundColor === player &&
                    document.getElementById(`c${i + 3}r${j - 3}`).style.backgroundColor === player) {
                    alert(`${player === 'red' ? player1Name : player2Name} wins!`);
                    document.getElementById("restartButton").style.display = "block"; // Show restart button
                    return;
                }
            }
        }
    }, 200);
}

function computerMove() {
    const availableColumns = [];
    for (let i = 1; i <= 7; i++) {
        if (eval(`val_c${i}`) <= 6) {
            availableColumns.push(i);
        }
    }
    if (availableColumns.length > 0) {
        const col = availableColumns[Math.floor(Math.random() * availableColumns.length)];
        const sum = eval(`val_c${col}`);
        document.getElementById(`c${col}r${sum}`).style.backgroundColor = "yellow";
        eval(`val_c${col}++`);
        turn++;
        check('yellow');
        document.getElementById("whosturn").innerText = `${player1Name}'s Turn`;
    }
}

document.querySelectorAll(".column").forEach((e) => {
    e.addEventListener("click", () => {
        const sum = eval(`val_${e.id}`);
        eval(`val_${e.id}++`);

        if (sum <= 6 && turn % 2 !== 0) {
            document.getElementById(`${e.id}r${sum}`).style.backgroundColor = "red";
            turn++;
            check('red');
            document.getElementById("whosturn").innerText = mode === 'pvc' ? "Computer's Turn" : `${player2Name}'s Turn`;
            if (mode === 'pvc') {
                computerMove();
            }
        } else if (sum <= 6 && turn % 2 === 0) {
            document.getElementById(`${e.id}r${sum}`).style.backgroundColor = "yellow";
            turn++;
            check('yellow');
            document.getElementById("whosturn").innerText = `${player1Name}'s Turn`;
        }
    });
});

// Function to reset the game
function resetGame() {
    // Reset all columns
    val_c1 = 1; val_c2 = 1; val_c3 = 1; val_c4 = 1; val_c5 = 1; val_c6 = 1; val_c7 = 1;
    turn = 1;

    // Clear the game board
    for (let i = 1; i <= 7; i++) {
        for (let j = 1; j <= 6; j++) {
            document.getElementById(`c${i}r${j}`).style.backgroundColor = "white";
        }
    }

    // Reset the turn display
    document.getElementById("whosturn").innerText = `${player1Name}'s Turn`;

    // Hide the restart button
    document.getElementById("restartButton").style.display = "none";
}

// Add event listener for the restart button
document.getElementById("restartButton").addEventListener("click", resetGame);
document.getElementById("exitButton").addEventListener("click", () => {
    window.location.href = "welcome.html"; // Redirect to the welcome page
});