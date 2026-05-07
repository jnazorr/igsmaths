const topics = [
  "Algebra fluency",
  "Equations and systems",
  "Quadratics",
  "Linear graphs",
  "Measurement",
  "Trigonometry",
  "Probability",
  "Formula rearranging"
];
const difficulties = ["Surface", "Procedural", "Reasoning", "Problem-solving"];
const casModes = ["No CAS", "CAS optional", "CAS helpful"];

const fmt = (n) => Number.isInteger(n) ? String(n) : n.toFixed(1);
const fraction = (a, b) => {
  const g = gcd(Math.abs(a), Math.abs(b));
  return `${a / g}/${b / g}`;
};
const gcd = (a, b) => b ? gcd(b, a % b) : a;
const casNote = (mode) => {
  if (mode === "No CAS") return "No CAS: show the mental or written algebra steps.";
  if (mode === "CAS optional") return "CAS optional: use CAS to check after setting up the mathematics.";
  return "CAS helpful: use CAS efficiently, but still write the setup and interpret the result.";
};
const intro = (topic, difficulty) => `Read the question first and identify the skill: <strong>${topic.toLowerCase()}</strong>. Because this is a <strong>${difficulty.toLowerCase()}</strong> question, show the setup before jumping to the answer.`;
const topicCheck = (topic) => ({
  "Algebra fluency": "Check by expanding back, factorising back, or substituting an easy value such as x = 1.",
  "Equations and systems": "Check by substituting the solution back into the original equation or both original equations.",
  Quadratics: "Check by expanding the factorised form, or by substituting each root into the original quadratic.",
  "Linear graphs": "Check coordinates by substituting them into the equation. Keep answers in (x, y) order.",
  Measurement: "Check the units carefully: area uses square units, volume uses cubic units, and capacity can be written in litres.",
  Trigonometry: "Check calculator angle mode is degrees, and make sure the side or angle size is reasonable for the triangle.",
  Probability: "Check the probability is between 0 and 1 unless it is written as a percentage. Simplify fractions where possible.",
  "Formula rearranging": "Check by substituting the rearranged expression back into the original formula."
}[topic] || "Check the answer against the information in the question.");

function algebra(difficulty, mode, v) {
  const a = 2 + v, b = 5 + v, c = 3 + v;
  if (difficulty === "Surface") {
    return q("Algebra fluency", difficulty, mode, `Simplify <strong>${a}x + ${b}x - ${c}x</strong>.`, [
      `Collect like terms: ${a}x + ${b}x - ${c}x = (${a} + ${b} - ${c})x.`,
      `The coefficient is ${a + b - c}.`,
      `Answer: <strong>${a + b - c}x</strong>.`,
      casNote(mode)
    ]);
  }
  if (difficulty === "Procedural") {
    return q("Algebra fluency", difficulty, mode, `Expand and simplify <strong>(${a}x + ${b})(x - ${c})</strong>.`, [
      `Expand each product: ${a}x*x, ${a}x*(-${c}), ${b}*x, and ${b}*(-${c}).`,
      `This gives ${a}x^2 - ${a * c}x + ${b}x - ${b * c}.`,
      `Collect the x terms: <strong>${a}x^2 ${b - a * c >= 0 ? "+" : "-"} ${Math.abs(b - a * c)}x - ${b * c}</strong>.`,
      casNote(mode)
    ]);
  }
  if (difficulty === "Reasoning") {
    const p = v + 2, r = v + 5;
    return q("Algebra fluency", difficulty, mode, `Factorise <strong>x^2 + ${p + r}x + ${p * r}</strong>, then state the two values of x that make it equal to zero.`, [
      `Find two numbers that multiply to ${p * r} and add to ${p + r}: ${p} and ${r}.`,
      `So the factorised form is <strong>(x + ${p})(x + ${r})</strong>.`,
      `The zero values are <strong>x = -${p}</strong> or <strong>x = -${r}</strong>.`,
      casNote(mode)
    ]);
  }
  const n = v + 2;
  return q("Algebra fluency", difficulty, mode, `Show that the product of <strong>${n}</strong> and the next consecutive integer, plus <strong>${n + 1}</strong>, can be written as a single simplified number.`, [
    `The next consecutive integer is ${n + 1}.`,
    `Product plus ${n + 1}: ${n}(${n + 1}) + ${n + 1}.`,
    `Factor the common ${n + 1}: (${n + 1})(${n} + 1) = ${n + 1}^2.`,
    `Answer: <strong>${(n + 1) ** 2}</strong>.`
  ]);
}

function equations(difficulty, mode, v) {
  const x = v + 3, a = v + 2, b = v + 5, rhs = a * x - b;
  if (difficulty === "Surface") {
    return q("Equations and systems", difficulty, mode, `Solve <strong>${a}x - ${b} = ${rhs}</strong>.`, [
      `Add ${b} to both sides: ${a}x = ${rhs + b}.`,
      `Divide by ${a}.`,
      `Answer: <strong>x = ${x}</strong>.`,
      casNote(mode)
    ]);
  }
  if (difficulty === "Procedural") {
    const y = v + 4;
    return q("Equations and systems", difficulty, mode, `Solve the simultaneous equations <strong>x + y = ${x + y}</strong> and <strong>2x - y = ${2 * x - y}</strong>.`, [
      `Add the equations to eliminate y.`,
      `3x = ${(x + y) + (2 * x - y)}, so x = ${x}.`,
      `Substitute into x + y = ${x + y}: y = ${y}.`,
      `Answer: <strong>(${x}, ${y})</strong>.`
    ]);
  }
  if (difficulty === "Reasoning") {
    return q("Equations and systems", difficulty, mode, `A rectangle has width <strong>x</strong> and length <strong>${a}x + ${b}</strong>. Its perimeter is <strong>${2 * (x + a * x + b)}</strong> cm. Find x.`, [
      `Perimeter equation: 2(x + ${a}x + ${b}) = ${2 * (x + a * x + b)}.`,
      `Divide by 2: ${a + 1}x + ${b} = ${x + a * x + b}.`,
      `${a + 1}x = ${(a + 1) * x}.`,
      `Answer: <strong>x = ${x}</strong>.`
    ]);
  }
  return q("Equations and systems", difficulty, mode, `Two numbers have a sum of <strong>${2 * x + 3}</strong>. The larger number is <strong>3</strong> more than the smaller. Find both numbers.`, [
    `Let the smaller number be n. The larger is n + 3.`,
    `n + n + 3 = ${2 * x + 3}.`,
    `2n = ${2 * x}, so n = ${x}.`,
    `The numbers are <strong>${x}</strong> and <strong>${x + 3}</strong>.`
  ]);
}

function quadratics(difficulty, mode, v) {
  const r1 = v + 1, r2 = v + 4;
  if (difficulty === "Surface") {
    return q("Quadratics", difficulty, mode, `Factorise <strong>x^2 - ${r1 + r2}x + ${r1 * r2}</strong>.`, [
      `Find two numbers that multiply to ${r1 * r2} and add to -${r1 + r2}: -${r1} and -${r2}.`,
      `Answer: <strong>(x - ${r1})(x - ${r2})</strong>.`,
      casNote(mode)
    ]);
  }
  if (difficulty === "Procedural") {
    const h = v + 2, k = v + 3;
    return q("Quadratics", difficulty, mode, `State the turning point of <strong>y = (x - ${h})^2 + ${k}</strong>.`, [
      `Completed-square form y = (x - h)^2 + k has turning point (h, k).`,
      `Here h = ${h} and k = ${k}.`,
      `Answer: <strong>(${h}, ${k})</strong>.`
    ]);
  }
  if (difficulty === "Reasoning") {
    return q("Quadratics", difficulty, mode, `Solve <strong>x^2 - ${r1 + r2}x + ${r1 * r2} = 0</strong> and explain what the solutions mean on the graph.`, [
      `Factorise: (x - ${r1})(x - ${r2}) = 0.`,
      `So x = ${r1} or x = ${r2}.`,
      `On the graph, these are the x-intercepts.`,
      casNote(mode)
    ]);
  }
  const h = v + 2, k = v + 1;
  return q("Quadratics", difficulty, mode, `A model has height <strong>h(t) = -(t - ${h})^2 + ${k + 8}</strong>. Find the maximum height and when it occurs.`, [
    `The negative coefficient means the parabola opens downward.`,
    `The turning point is (${h}, ${k + 8}).`,
    `The maximum height is <strong>${k + 8}</strong> at <strong>t = ${h}</strong>.`,
    casNote(mode)
  ]);
}

function graphs(difficulty, mode, v) {
  const x1 = v, y1 = 2 * v + 1, x2 = v + 3, y2 = 2 * (v + 3) + 1;
  if (difficulty === "Surface") {
    return q("Linear graphs", difficulty, mode, `Find the gradient between <strong>(${x1}, ${y1})</strong> and <strong>(${x2}, ${y2})</strong>.`, [
      `Gradient = rise/run = (${y2} - ${y1}) / (${x2} - ${x1}).`,
      `Gradient = ${y2 - y1}/${x2 - x1}.`,
      `Answer: <strong>${(y2 - y1) / (x2 - x1)}</strong>.`
    ]);
  }
  if (difficulty === "Procedural") {
    return q("Linear graphs", difficulty, mode, `Find the y-intercept of <strong>y = ${v + 2}x + ${v + 5}</strong>.`, [
      `The y-intercept is the constant term in y = mx + c.`,
      `Answer: <strong>${v + 5}</strong>, so the point is <strong>(0, ${v + 5})</strong>.`
    ]);
  }
  if (difficulty === "Reasoning") {
    const sol = v + 2;
    return q("Linear graphs", difficulty, mode, `Find the intersection of <strong>y = x + ${v}</strong> and <strong>y = ${2 * sol + v} - x</strong>.`, [
      `Set the equations equal: x + ${v} = ${2 * sol + v} - x.`,
      `2x = ${2 * sol}, so x = ${sol}.`,
      `Then y = ${sol} + ${v} = ${sol + v}.`,
      `Intersection: <strong>(${sol}, ${sol + v})</strong>.`
    ]);
  }
  return q("Linear graphs", difficulty, mode, `A line passes through <strong>(${x1}, ${y1})</strong> and has gradient <strong>${v + 1}</strong>. Find the equation in the form y = mx + c.`, [
    `Use y = ${v + 1}x + c.`,
    `Substitute (${x1}, ${y1}): ${y1} = ${v + 1}(${x1}) + c.`,
    `c = ${y1 - (v + 1) * x1}.`,
    `Answer: <strong>y = ${v + 1}x ${y1 - (v + 1) * x1 >= 0 ? "+" : "-"} ${Math.abs(y1 - (v + 1) * x1)}</strong>.`
  ]);
}

function measurement(difficulty, mode, v) {
  const l = v + 6, w = v + 3, h = v + 2;
  if (difficulty === "Surface") {
    return q("Measurement", difficulty, mode, `Find the area of a triangle with base <strong>${l}</strong> cm and height <strong>${w}</strong> cm.`, [
      `Area = 1/2 &times; base &times; height.`,
      `Area = 1/2 &times; ${l} &times; ${w}.`,
      `Answer: <strong>${fmt(0.5 * l * w)} cm^2</strong>.`
    ]);
  }
  if (difficulty === "Procedural") {
    return q("Measurement", difficulty, mode, `Find the volume of a rectangular prism with dimensions <strong>${l}</strong> cm by <strong>${w}</strong> cm by <strong>${h}</strong> cm.`, [
      `Volume = length &times; width &times; height.`,
      `Volume = ${l} &times; ${w} &times; ${h}.`,
      `Answer: <strong>${l * w * h} cm^3</strong>.`,
      casNote(mode)
    ]);
  }
  if (difficulty === "Reasoning") {
    return q("Measurement", difficulty, mode, `Convert <strong>${(l * w * h) * 1000} cm^3</strong> to litres.`, [
      `1000 cm^3 = 1 L.`,
      `Divide by 1000.`,
      `Answer: <strong>${l * w * h} L</strong>.`
    ]);
  }
  const r = v + 4, angle = 30 + 10 * v;
  return q("Measurement", difficulty, mode, `Find the area of a sector with radius <strong>${r}</strong> cm and angle <strong>${angle} degrees</strong>. Round to 1 decimal place.`, [
    `Sector area = angle/360 &times; pi &times; r^2.`,
    `Area = ${angle}/360 &times; pi &times; ${r}^2.`,
    `Answer: <strong>${fmt((angle / 360) * Math.PI * r * r)} cm^2</strong>.`,
    casNote(mode)
  ]);
}

function trig(difficulty, mode, v) {
  const hyp = v + 10, angle = 25 + 5 * v;
  if (difficulty === "Surface") {
    return q("Trigonometry", difficulty, mode, `Which ratio uses opposite and hypotenuse in a right triangle?`, [
      `SOH CAH TOA: sine = opposite/hypotenuse.`,
      `Answer: <strong>sine</strong>.`
    ]);
  }
  if (difficulty === "Procedural") {
    return q("Trigonometry", difficulty, mode, `A right triangle has hypotenuse <strong>${hyp}</strong> cm and angle <strong>${angle} degrees</strong>. Find the opposite side.`, [
      `Use sine because opposite and hypotenuse are involved.`,
      `sin(${angle}) = opposite/${hyp}.`,
      `opposite = ${hyp} &times; sin(${angle}).`,
      `Answer: <strong>${fmt(hyp * Math.sin(angle * Math.PI / 180))} cm</strong>.`
    ]);
  }
  if (difficulty === "Reasoning") {
    const opp = v + 4, adj = v + 9;
    return q("Trigonometry", difficulty, mode, `A ramp rises <strong>${opp}</strong> m over a horizontal distance of <strong>${adj}</strong> m. Find the angle to 1 decimal place.`, [
      `Use tangent because opposite and adjacent are known.`,
      `tan(theta) = ${opp}/${adj}.`,
      `theta = tan^-1(${opp}/${adj}).`,
      `Answer: <strong>${fmt(Math.atan(opp / adj) * 180 / Math.PI)} degrees</strong>.`,
      casNote(mode)
    ]);
  }
  return q("Trigonometry", difficulty, mode, `A support cable is <strong>${hyp}</strong> m long and makes an angle of <strong>${angle}</strong> degrees with the ground. It is attached to a platform <strong>${v}</strong> m above the ground. Find the total height reached.`, [
    `Vertical height from cable = ${hyp} &times; sin(${angle}).`,
    `Cable height = ${fmt(hyp * Math.sin(angle * Math.PI / 180))} m.`,
    `Add the platform height: ${fmt(hyp * Math.sin(angle * Math.PI / 180))} + ${v}.`,
    `Answer: <strong>${fmt(hyp * Math.sin(angle * Math.PI / 180) + v)} m</strong>.`
  ]);
}

function probability(difficulty, mode, v) {
  const red = v + 2, blue = v + 3, green = v + 5, total = red + blue + green;
  if (difficulty === "Surface") {
    return q("Probability", difficulty, mode, `A bag has <strong>${red}</strong> red, <strong>${blue}</strong> blue, and <strong>${green}</strong> green counters. Find P(blue).`, [
      `Total counters = ${total}.`,
      `Blue counters = ${blue}.`,
      `Answer: <strong>${fraction(blue, total)}</strong>.`
    ]);
  }
  if (difficulty === "Procedural") {
    return q("Probability", difficulty, mode, `Using the same bag, find P(not green).`, [
      `Not green means red or blue.`,
      `Favourable outcomes = ${red} + ${blue} = ${red + blue}.`,
      `Answer: <strong>${fraction(red + blue, total)}</strong>.`
    ]);
  }
  if (difficulty === "Reasoning") {
    const p = 0.1 * (v + 2), spins = 100 + 25 * v;
    return q("Probability", difficulty, mode, `A spinner has P(yellow) = <strong>${p.toFixed(1)}</strong>. It is spun <strong>${spins}</strong> times. Estimate the number of yellow results.`, [
      `Expected frequency = probability &times; number of trials.`,
      `${p.toFixed(1)} &times; ${spins} = ${p * spins}.`,
      `Answer: <strong>${p * spins}</strong>.`
    ]);
  }
  const both = v + 2, a = v + 8, b = v + 7, classSize = v + 24;
  return q("Probability", difficulty, mode, `In a class of <strong>${classSize}</strong>, <strong>${a}</strong> students play basketball, <strong>${b}</strong> play tennis, and <strong>${both}</strong> play both. Find P(neither).`, [
    `At least one = ${a} + ${b} - ${both} = ${a + b - both}.`,
    `Neither = ${classSize} - ${a + b - both} = ${classSize - (a + b - both)}.`,
    `Answer: <strong>${fraction(classSize - (a + b - both), classSize)}</strong>.`,
    casNote(mode)
  ]);
}

function formula(difficulty, mode, v) {
  const b = v + 4, h = v + 3;
  if (difficulty === "Surface") {
    return q("Formula rearranging", difficulty, mode, `Substitute <strong>b = ${b}</strong> and <strong>h = ${h}</strong> into A = bh/2.`, [
      `A = ${b} &times; ${h} / 2.`,
      `Answer: <strong>${fmt(b * h / 2)}</strong>.`
    ]);
  }
  if (difficulty === "Procedural") {
    return q("Formula rearranging", difficulty, mode, `Make <strong>h</strong> the subject of <strong>A = bh/2</strong>.`, [
      `Multiply both sides by 2: 2A = bh.`,
      `Divide by b.`,
      `Answer: <strong>h = 2A/b</strong>.`,
      casNote(mode)
    ]);
  }
  if (difficulty === "Reasoning") {
    const A = b * h / 2;
    return q("Formula rearranging", difficulty, mode, `A triangle has area <strong>${A}</strong> cm^2 and base <strong>${b}</strong> cm. Use A = bh/2 to find h.`, [
      `Rearrange: h = 2A/b.`,
      `h = 2 &times; ${A} / ${b}.`,
      `Answer: <strong>${h} cm</strong>.`
    ]);
  }
  const speed = v + 8, time = v + 2;
  return q("Formula rearranging", difficulty, mode, `A trip uses <strong>d = st</strong>. If the distance is <strong>${speed * time}</strong> km and time is <strong>${time}</strong> h, make s the subject and find the speed.`, [
    `Make s the subject: s = d/t.`,
    `Substitute: s = ${speed * time}/${time}.`,
    `Answer: <strong>${speed} km/h</strong>.`
  ]);
}

const generators = { "Algebra fluency": algebra, "Equations and systems": equations, Quadratics: quadratics, "Linear graphs": graphs, Measurement: measurement, Trigonometry: trig, Probability: probability, "Formula rearranging": formula };

function q(topic, difficulty, cas, text, solution) {
  const uniqueSteps = solution.filter((step) => step !== casNote(cas));
  while (uniqueSteps.length < 3) {
    const insertAt = Math.max(uniqueSteps.length - 1, 0);
    uniqueSteps.splice(insertAt, 0, "Write the calculation or reasoning line before the final answer, so the marker can see how you got there.");
  }
  return {
    topic,
    difficulty,
    cas,
    title: `${topic}: ${difficulty}`,
    text,
    solution: [
      intro(topic, difficulty),
      ...uniqueSteps,
      `${topicCheck(topic)} ${casNote(cas)}`
    ]
  };
}

function buildBank() {
  const bank = [];
  topics.forEach((topic) => difficulties.forEach((difficulty) => casModes.forEach((cas) => {
    for (let v = 1; v <= 3; v += 1) bank.push(generators[topic](difficulty, cas, v));
  })));
  return bank;
}

const bank = buildBank();
let filtered = [...bank];
let index = 0;
let secondsLeft = 0;
let timerId = null;

const topicFilter = document.querySelector("#topicFilter");
const difficultyFilter = document.querySelector("#difficultyFilter");
const casFilter = document.querySelector("#casFilter");
const timerSelect = document.querySelector("#timerSelect");
const timerDisplay = document.querySelector("#timerDisplay");
const solutionPanel = document.querySelector("#solutionPanel");

function fillSelect(select, values) {
  select.innerHTML = `<option value="All">All</option>${values.map((value) => `<option value="${value}">${value}</option>`).join("")}`;
}

function applyFilters() {
  filtered = bank.filter((item) =>
    (topicFilter.value === "All" || item.topic === topicFilter.value) &&
    (difficultyFilter.value === "All" || item.difficulty === difficultyFilter.value) &&
    (casFilter.value === "All" || item.cas === casFilter.value)
  );
  index = 0;
  renderQuestion();
}

function renderQuestion() {
  const item = filtered[index] || bank[0];
  document.querySelector("#bankCount").textContent = bank.length;
  document.querySelector("#questionMeta").innerHTML = `<span class="pill">${item.topic}</span><span class="pill ${item.difficulty === "Problem-solving" ? "hard" : ""}">${item.difficulty}</span><span class="pill cas">${item.cas}</span> Question ${index + 1} of ${filtered.length}`;
  document.querySelector("#questionTitle").textContent = item.title;
  document.querySelector("#questionText").innerHTML = item.text;
  document.querySelector("#solutionText").innerHTML = renderSolution(item.solution);
  document.querySelector("#progressBar").style.width = `${filtered.length ? ((index + 1) / filtered.length) * 100 : 0}%`;
  solutionPanel.hidden = true;
  resetTimer();
}

function renderSolution(steps) {
  return `<ol class="solution-list">${steps.map((step, stepIndex) => {
    const label = stepIndex === 0 ? "Read" : stepIndex === steps.length - 1 ? "Check" : `Step ${stepIndex}`;
    return `<li class="solution-step"><span class="step-label">${label}</span><span class="step-text">${step}</span></li>`;
  }).join("")}</ol>`;
}

function resetTimer() {
  clearInterval(timerId);
  secondsLeft = Number(timerSelect.value);
  updateTimer();
  if (secondsLeft > 0) {
    timerId = setInterval(() => {
      secondsLeft -= 1;
      updateTimer();
      if (secondsLeft <= 0) clearInterval(timerId);
    }, 1000);
  }
}

function updateTimer() {
  if (secondsLeft <= 0 && Number(timerSelect.value) === 0) {
    timerDisplay.textContent = "--:--";
    return;
  }
  const mins = Math.floor(Math.max(0, secondsLeft) / 60);
  const secs = Math.max(0, secondsLeft) % 60;
  timerDisplay.textContent = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

fillSelect(topicFilter, topics);
fillSelect(difficultyFilter, difficulties);
fillSelect(casFilter, casModes);
[topicFilter, difficultyFilter, casFilter].forEach((select) => select.addEventListener("change", applyFilters));
timerSelect.addEventListener("change", resetTimer);
document.querySelector("#shuffleBtn").addEventListener("click", () => {
  filtered.sort(() => Math.random() - 0.5);
  index = 0;
  renderQuestion();
});
document.querySelector("#prevQuestion").addEventListener("click", () => {
  index = (index - 1 + filtered.length) % filtered.length;
  renderQuestion();
});
document.querySelector("#nextQuestion").addEventListener("click", () => {
  index = (index + 1) % filtered.length;
  renderQuestion();
});
document.querySelector("#revealSolution").addEventListener("click", () => {
  solutionPanel.hidden = !solutionPanel.hidden;
});

renderQuestion();
