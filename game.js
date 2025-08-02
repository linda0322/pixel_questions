const GRID_ROWS = 3;
const GRID_COLS = 5;
const totalTiles = GRID_ROWS * GRID_COLS;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const coversDiv = document.getElementById('covers');
const img = document.getElementById('pixel-image');
const imageContainer = document.getElementById('pixel-image-container');
const questionContainer = document.getElementById('question-container');
coversDiv.style.position = "absolute";
coversDiv.style.top = "0";
coversDiv.style.left = "0";
coversDiv.style.width = img.width + "px";
coversDiv.style.height = img.height + "px";

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

shuffle(questions);
shuffle(covers);

covers.forEach(c => c.style.opacity = 1);

coversDiv.style.visibility = "visible";
imageContainer.classList.add('ready');

// Game State
let currentQ = 0;
function showQuestion() {
  if (currentQ >= questions.length) {
    questionContainer.innerHTML = "<b>🎉 𝗬𝗘𝗔𝗛 🎉</b>";
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

  questionContainer.querySelectorAll('button').forEach(btn => {
    btn.onclick = function() {
      if (btn.innerText === q.answer) {
        covers[currentQ].style.opacity = 0;
        alert("𝗖𝗢𝗥𝗥𝗘𝗖𝗧 👍🏻");
        currentQ++;
        showQuestion();
      } else {
        alert("𝗪𝗥𝗢𝗡𝗚 😑 𝗧𝗥𝗬 𝗔𝗚𝗔𝗜𝗡");
      }
    };
  });
}

showQuestion();
