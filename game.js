const GRID_ROWS = 3; // You can adjust for your image/questions
const GRID_COLS = 5;
const totalTiles = GRID_ROWS * GRID_COLS;

// Random shuffle utility
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Prepare grid overlays
const coversDiv = document.getElementById('covers');
const img = document.getElementById('pixel-image');
coversDiv.style.position = "absolute";
coversDiv.style.top = "0";
coversDiv.style.left = "0";
coversDiv.style.width = img.width + "px";
coversDiv.style.height = img.height + "px";

// Create cover tiles, store refs for later reveal
let covers = [];
for (let r = 0; r < GRID_ROWS; r++) {
  for (let c = 0; c < GRID_COLS; c++) {
    let div = document.createElement('div');
    div.classList.add('pixel-cover');
    div.style.width = (img.width / GRID_COLS) + "px";
    div.style.height = (img.height / GRID_ROWS) + "px";
    div.style.left = (c * img.width / GRID_COLS) + "px";
    div.style.top = (r * img.height / GRID_ROWS) + "px";
    coversDiv.appendChild(div);
    covers.push(div);
  }
}

// Shuffle questions and grid covers so random tile is revealed per answer
shuffle(questions); // your questions[], from questions.js
shuffle(covers);

// Game State
let currentQ = 0;
const questionContainer = document.getElementById('question-container');

// Show current question
function showQuestion() {
  if (currentQ >= questions.length) {
    questionContainer.innerHTML = "<b>All done! See the full picture!</b>";
    covers.forEach(c => c.style.opacity = 0);
    return;
  }
  const q = questions[currentQ];
  let choices = q.choices.slice();
  shuffle(choices);

  questionContainer.innerHTML = `
    <div>
      <strong>Q${currentQ + 1}: ${q.question}</strong>
    </div>
    ${choices.map(ch => `<button>${ch}</button>`).join(" ")}
  `;

  // Bind answer logic
  questionContainer.querySelectorAll('button').forEach(btn => {
    btn.onclick = function() {
      if (btn.innerText === q.answer) {
        // Reveal tile:
        covers[currentQ].style.opacity = 0;
        alert("Correct!");
        currentQ++;
        showQuestion();
      } else {
        alert("Try again!");
      }
    }
  });
}

// Hide all tiles at start
covers.forEach(c => c.style.opacity = 1);
showQuestion();
