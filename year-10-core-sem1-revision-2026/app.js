const stations = [
  {
    id: "algebra",
    title: "Algebra fluency",
    recall: "Write one example of each skill: collect like terms, multiply algebraic terms, expand two brackets, factorise a common factor.",
    points: 20,
    workedQuestion: "Simplify and expand: <math><mrow><mn>2</mn><mi>x</mi><mo>(</mo><mn>3</mn><mi>x</mi><mo>-</mo><mn>5</mn><mo>)</mo><mo>+</mo><mn>4</mn><mi>x</mi></mrow></math>",
    steps: [
      "Start with the bracket. The outside factor <math><mrow><mn>2</mn><mi>x</mi></mrow></math> must multiply every term inside.",
      "<math><mrow><mn>2</mn><mi>x</mi><mo>*</mo><mn>3</mn><mi>x</mi><mo>=</mo><mn>6</mn><msup><mi>x</mi><mn>2</mn></msup></mrow></math> and <math><mrow><mn>2</mn><mi>x</mi><mo>*</mo><mo>-</mo><mn>5</mn><mo>=</mo><mo>-</mo><mn>10</mn><mi>x</mi></mrow></math>.",
      "Now include the remaining term: <math><mrow><mn>6</mn><msup><mi>x</mi><mn>2</mn></msup><mo>-</mo><mn>10</mn><mi>x</mi><mo>+</mo><mn>4</mn><mi>x</mi></mrow></math>.",
      "Collect like terms: <math><mrow><mo>-</mo><mn>10</mn><mi>x</mi><mo>+</mo><mn>4</mn><mi>x</mi><mo>=</mo><mo>-</mo><mn>6</mn><mi>x</mi></mrow></math>, so the simplified expression is <math><mrow><mn>6</mn><msup><mi>x</mi><mn>2</mn></msup><mo>-</mo><mn>6</mn><mi>x</mi></mrow></math>."
    ],
    checkQuestion: "Factorise fully: <math><mrow><mn>12</mn><msup><mi>a</mi><mn>2</mn></msup><mi>b</mi><mo>-</mo><mn>18</mn><mi>a</mi><msup><mi>b</mi><mn>2</mn></msup></mrow></math>",
    answers: ["6ab(2a-3b)", "6ab(2a - 3b)"],
    hint: "Find the highest common factor of the numbers and the shared pronumerals."
  },
  {
    id: "equations",
    title: "Equations and simultaneous equations",
    recall: "List two equation-solving moves that keep both sides balanced. Then solve one equation mentally.",
    points: 20,
    workedQuestion: "Solve simultaneously: <math><mrow><mi>x</mi><mo>+</mo><mi>y</mi><mo>=</mo><mn>11</mn></mrow></math> and <math><mrow><mn>2</mn><mi>x</mi><mo>-</mo><mi>y</mi><mo>=</mo><mn>7</mn></mrow></math>",
    steps: [
      "The coefficients of <math><mi>y</mi></math> are opposites, so addition will eliminate <math><mi>y</mi></math>.",
      "Add the equations: <math><mrow><mo>(</mo><mi>x</mi><mo>+</mo><mi>y</mi><mo>)</mo><mo>+</mo><mo>(</mo><mn>2</mn><mi>x</mi><mo>-</mo><mi>y</mi><mo>)</mo><mo>=</mo><mn>11</mn><mo>+</mo><mn>7</mn></mrow></math>.",
      "This gives <math><mrow><mn>3</mn><mi>x</mi><mo>=</mo><mn>18</mn></mrow></math>, so <math><mrow><mi>x</mi><mo>=</mo><mn>6</mn></mrow></math>.",
      "Substitute into <math><mrow><mi>x</mi><mo>+</mo><mi>y</mi><mo>=</mo><mn>11</mn></mrow></math>: <math><mrow><mn>6</mn><mo>+</mo><mi>y</mi><mo>=</mo><mn>11</mn></mrow></math>, so <math><mrow><mi>y</mi><mo>=</mo><mn>5</mn></mrow></math>. The solution is <math><mrow><mo>(</mo><mn>6</mn><mo>,</mo><mn>5</mn><mo>)</mo></mrow></math>."
    ],
    checkQuestion: "Solve: <math><mrow><mn>5</mn><mi>n</mi><mo>-</mo><mn>8</mn><mo>=</mo><mn>27</mn></mrow></math>",
    answers: ["7", "n=7", "n = 7"],
    hint: "Undo subtracting 8 first, then divide by 5."
  },
  {
    id: "quadratics",
    title: "Quadratics and graphs",
    recall: "Sketch the shape of a positive quadratic and mark the turning point, axis of symmetry, and y-intercept.",
    points: 20,
    workedQuestion: "Complete the square for <math><mrow><msup><mi>x</mi><mn>2</mn></msup><mo>+</mo><mn>10</mn><mi>x</mi><mo>+</mo><mn>6</mn></mrow></math>",
    steps: [
      "Focus on <math><mrow><msup><mi>x</mi><mn>2</mn></msup><mo>+</mo><mn>10</mn><mi>x</mi></mrow></math>. Half of 10 is 5.",
      "Build the square: <math><msup><mrow><mo>(</mo><mi>x</mi><mo>+</mo><mn>5</mn><mo>)</mo></mrow><mn>2</mn></msup></math> expands to <math><mrow><msup><mi>x</mi><mn>2</mn></msup><mo>+</mo><mn>10</mn><mi>x</mi><mo>+</mo><mn>25</mn></mrow></math>.",
      "The square added 25, but the original constant is 6. Correct by subtracting 25 and adding 6.",
      "The completed-square form is <math><mrow><msup><mrow><mo>(</mo><mi>x</mi><mo>+</mo><mn>5</mn><mo>)</mo></mrow><mn>2</mn></msup><mo>-</mo><mn>19</mn></mrow></math>. The turning point is <math><mrow><mo>(</mo><mo>-</mo><mn>5</mn><mo>,</mo><mo>-</mo><mn>19</mn><mo>)</mo></mrow></math>."
    ],
    checkQuestion: "Factorise: <math><mrow><msup><mi>x</mi><mn>2</mn></msup><mo>+</mo><mn>7</mn><mi>x</mi><mo>+</mo><mn>12</mn></mrow></math>",
    answers: ["(x+3)(x+4)", "(x+4)(x+3)", "(x + 3)(x + 4)", "(x + 4)(x + 3)"],
    hint: "Find two numbers that multiply to 12 and add to 7."
  },
  {
    id: "measurement",
    title: "Measurement, surface area, and volume",
    recall: "Write the difference between area, surface area, volume, and capacity in one sentence each.",
    points: 20,
    workedQuestion: "A rectangular prism is <math><mrow><mn>8</mn></mrow></math> cm by <math><mrow><mn>5</mn></mrow></math> cm by <math><mrow><mn>3</mn></mrow></math> cm. Find its surface area.",
    steps: [
      "A rectangular prism has three pairs of matching faces.",
      "Calculate the three different face areas: <math><mrow><mn>8</mn><mo>*</mo><mn>5</mn><mo>=</mo><mn>40</mn></mrow></math>, <math><mrow><mn>8</mn><mo>*</mo><mn>3</mn><mo>=</mo><mn>24</mn></mrow></math>, and <math><mrow><mn>5</mn><mo>*</mo><mn>3</mn><mo>=</mo><mn>15</mn></mrow></math>.",
      "Double each because opposite faces match: <math><mrow><mn>2</mn><mo>(</mo><mn>40</mn><mo>+</mo><mn>24</mn><mo>+</mo><mn>15</mn><mo>)</mo></mrow></math>.",
      "The surface area is <math><mrow><mn>158</mn><msup><mtext> cm</mtext><mn>2</mn></msup></mrow></math>."
    ],
    checkQuestion: "Convert <math><mrow><mn>4500</mn><msup><mtext> cm</mtext><mn>3</mn></msup></mrow></math> to litres.",
    answers: ["4.5", "4.5l", "4.5 l", "4.5 litres", "4.5 liters"],
    hint: "Use 1000 cubic centimetres equals 1 litre."
  },
  {
    id: "trigonometry",
    title: "Right-triangle trigonometry",
    recall: "Label opposite, adjacent, and hypotenuse on a right triangle from the point of view of a chosen angle.",
    points: 20,
    workedQuestion: "A right triangle has angle <math><mrow><mn>35</mn><mo>&#176;</mo></mrow></math> and hypotenuse <math><mrow><mn>12</mn></mrow></math> m. Find the side opposite the angle.",
    steps: [
      "The known side is the hypotenuse and the unknown side is opposite the angle.",
      "Use sine: <math><mrow><mi>sin</mi><mo>(</mo><mn>35</mn><mo>&#176;</mo><mo>)</mo><mo>=</mo><mfrac><mtext>opposite</mtext><mtext>hypotenuse</mtext></mfrac></mrow></math>.",
      "Substitute: <math><mrow><mi>sin</mi><mo>(</mo><mn>35</mn><mo>&#176;</mo><mo>)</mo><mo>=</mo><mfrac><mi>x</mi><mn>12</mn></mfrac></mrow></math>.",
      "Multiply by 12: <math><mrow><mi>x</mi><mo>=</mo><mn>12</mn><mi>sin</mi><mo>(</mo><mn>35</mn><mo>&#176;</mo><mo>)</mo><mo>&#8776;</mo><mn>6.9</mn></mrow></math> m."
    ],
    checkQuestion: "In a right triangle, the opposite side is 9 cm and the adjacent side is 12 cm. Which ratio finds the angle?",
    answers: ["tan", "tangent", "tan theta = 9/12", "tan=9/12", "tan theta=9/12"],
    hint: "The ratio using opposite and adjacent is tangent."
  },
  {
    id: "probability",
    title: "Probability and interpretation",
    recall: "Write the probability scale from impossible to certain, then place 0.25, 0.5, and 0.8 on it.",
    points: 20,
    workedQuestion: "A bag contains 5 blue tiles, 3 green tiles, and 2 yellow tiles. One tile is selected at random. Find the probability it is not yellow.",
    steps: [
      "Find the total number of tiles: <math><mrow><mn>5</mn><mo>+</mo><mn>3</mn><mo>+</mo><mn>2</mn><mo>=</mo><mn>10</mn></mrow></math>.",
      "Not yellow means blue or green. There are <math><mrow><mn>5</mn><mo>+</mo><mn>3</mn><mo>=</mo><mn>8</mn></mrow></math> favourable outcomes.",
      "Use <math><mrow><mi>P</mi><mo>(</mo><mtext>event</mtext><mo>)</mo><mo>=</mo><mfrac><mtext>favourable outcomes</mtext><mtext>total outcomes</mtext></mfrac></mrow></math>.",
      "The probability is <math><mrow><mfrac><mn>8</mn><mn>10</mn></mfrac><mo>=</mo><mfrac><mn>4</mn><mn>5</mn></mfrac><mo>=</mo><mn>0.8</mn></mrow></math>."
    ],
    checkQuestion: "A fair six-sided die is rolled once. What is the probability of rolling an even number?",
    answers: ["1/2", "0.5", "50%", "3/6"],
    hint: "There are three even numbers on a standard die."
  }
];

const storageKey = "y10-core-revision-lab";
const state = loadState();
const stationsEl = document.querySelector("#stations");
const template = document.querySelector("#stationTemplate");
const pointsTotal = document.querySelector("#pointsTotal");
const meterFill = document.querySelector("#meterFill");
const nextMilestone = document.querySelector("#nextMilestone");

function loadState() {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) || { earned: {}, steps: {}, checks: {} };
  } catch {
    return { earned: {}, steps: {}, checks: {} };
  }
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function normalize(value) {
  return value.toLowerCase().replace(/\s+/g, "").replace(/\*/g, "").trim();
}

function award(key, points) {
  if (state.earned[key]) return false;
  state.earned[key] = points;
  saveState();
  updateScore();
  return true;
}

function totalPoints() {
  return Object.values(state.earned).reduce((sum, value) => sum + value, 0);
}

function updateScore() {
  const total = totalPoints();
  pointsTotal.textContent = total;
  meterFill.style.width = `${Math.min(100, Math.round((total / 120) * 100))}%`;
  const milestones = [30, 60, 90, 120, 150];
  const next = milestones.find((mark) => total < mark);
  nextMilestone.textContent = next ? `Next milestone: ${next} points` : "Milestone complete: readiness target met";
}

function renderStations() {
  stations.forEach((station, index) => {
    const node = template.content.firstElementChild.cloneNode(true);
    node.dataset.station = station.id;
    node.querySelector(".station-number").textContent = `Station ${index + 1}`;
    node.querySelector("h2").textContent = station.title;
    node.querySelector(".station-points").textContent = `${station.points} pts`;
    node.querySelector(".recall p").textContent = station.recall;
    node.querySelector(".worked-question").innerHTML = station.workedQuestion;
    node.querySelector(".check-question").innerHTML = station.checkQuestion;
    node.querySelector(".hint").textContent = station.hint;

    const prev = node.querySelector(".prev-step");
    const next = node.querySelector(".next-step");
    const hint = node.querySelector(".hint-btn");
    const form = node.querySelector("form");
    const input = node.querySelector("input");
    const feedback = node.querySelector(".feedback");
    const hintText = node.querySelector(".hint");

    const showStep = () => {
      const current = state.steps[station.id] || 0;
      node.querySelector(".step-counter").textContent = `Step ${current + 1} of ${station.steps.length}`;
      node.querySelector(".step-content").innerHTML = station.steps[current];
      prev.disabled = current === 0;
      next.textContent = current === station.steps.length - 1 ? "Mark worked example" : "Next step";
    };

    prev.addEventListener("click", () => {
      state.steps[station.id] = Math.max(0, (state.steps[station.id] || 0) - 1);
      saveState();
      showStep();
    });

    next.addEventListener("click", () => {
      const current = state.steps[station.id] || 0;
      if (current < station.steps.length - 1) {
        state.steps[station.id] = current + 1;
      } else if (award(`${station.id}-worked`, 5)) {
        feedback.textContent = "Worked example complete: +5 points.";
        feedback.className = "feedback correct";
      } else {
        feedback.textContent = "Worked example already counted.";
        feedback.className = "feedback";
      }
      saveState();
      showStep();
    });

    hint.addEventListener("click", () => {
      hintText.hidden = !hintText.hidden;
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const answer = normalize(input.value);
      const accepted = station.answers.map(normalize).includes(answer);
      if (accepted) {
        const fresh = award(`${station.id}-check`, 15);
        feedback.textContent = fresh ? "Correct: +15 points." : "Correct. Points already awarded for this check.";
        feedback.className = "feedback correct";
      } else {
        feedback.textContent = "Not yet. Use the hint, check the operation, and try again.";
        feedback.className = "feedback try";
      }
    });

    showStep();
    stationsEl.appendChild(node);
  });
}

document.querySelector("#startLesson").addEventListener("click", () => {
  document.querySelector("#stations").scrollIntoView({ behavior: "smooth", block: "start" });
});

document.querySelector("#resetProgress").addEventListener("click", () => {
  localStorage.removeItem(storageKey);
  state.earned = {};
  state.steps = {};
  state.checks = {};
  document.querySelectorAll(".feedback").forEach((feedback) => {
    feedback.textContent = "";
    feedback.className = "feedback";
  });
  updateScore();
  window.location.reload();
});

document.querySelectorAll("[data-bonus]").forEach((checkbox) => {
  checkbox.checked = Boolean(state.earned[checkbox.dataset.key]);
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      award(checkbox.dataset.key, Number(checkbox.dataset.bonus));
    } else {
      delete state.earned[checkbox.dataset.key];
      saveState();
      updateScore();
    }
  });
});

renderStations();
updateScore();
