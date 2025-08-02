document.addEventListener('DOMContentLoaded', function() {
  // 1. Randomly select one image on each load
  const imageList = ["img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg"];
  const randomIdx = Math.floor(Math.random() * imageList.length);
  const randomImage = imageList[randomIdx];
  const img = document.getElementById('pixel-image');
  img.src = randomImage;

  img.onload = function() {
    // 2. Set up grid and covers
    const GRID_ROWS = 4;
    const GRID_COLS = 4;
    const coversDiv = document.getElementById('covers');
    const imageContainer = document.getElementById('pixel-image-container');
    const questionContainer = document.getElementById('question-container');
    coversDiv.innerHTML = '';

    coversDiv.style.position = "absolute";
    coversDiv.style.top = "0";
    coversDiv.style.left = "0";
    coversDiv.style.width = img.width + "px";
    coversDiv.style.height = img.height + "px";

    // Fisher-Yates Shuffle
    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    // Create covers
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

    // Shuffle questions and covers
    shuffle(questions);
    shuffle(covers);

    covers.forEach(c => c.style.opacity = 1);

    coversDiv.style.visibility = "visible";
    imageContainer.classList.add('ready');

    // Game Logic
    let currentQ = 0;
    function showQuestion() {
      if (currentQ >= questions.length) {
        questionContainer.innerHTML = "<b>🎉 YEAH 🎉</b>";
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
            alert("CORRECT 👍🏻");
            currentQ++;
            showQuestion();
          } else {
            alert("TRY AGAIN 🐶");
          }
        };
      });
    }
    showQuestion();
  };
});
