const topics = [
  "Algebra fluency",
  "Equations and systems",
  "Quadratics",
  "Linear graphs",
  "Measurement",
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
const formatMath = (html) => html
  .replace(/tan\^-1/g, "tan<sup>-1</sup>")
  .replace(/\btheta\b/g, "&theta;")
  .replace(/\bpi\b/g, "&pi;")
  .replace(/\bdegrees\b/g, "&deg;")
  .replace(/([A-Za-z0-9)])\^(-?\d+)/g, "$1<sup>$2</sup>");
const casNote = (mode) => {
  if (mode === "No CAS") return "No CAS: show the mental or written algebra steps.";
  if (mode === "CAS optional") return "CAS optional: use CAS to check after setting up the mathematics.";
  return "CAS helpful: use CAS efficiently, but still write the setup and interpret the result.";
};
const intro = (topic, difficulty) => `Read the question first and identify the skill: <strong>${topic.toLowerCase()}</strong>. Because this is a <strong>${difficulty.toLowerCase()}</strong> question, show the setup before jumping to the answer.`;
const topicCheck = (topic) => ({
  "Algebra fluency": "Check by expanding back, factorising back, or substituting an easy value such as x = 1.",
  "Equations and systems": "Check by substituting the solution back into the original equation or both original equations.",
  Quadratics: "Check by expanding the factorised form or by comparing the equation with completed-square form.",
  "Linear graphs": "Check coordinates by substituting them into the equation. Keep answers in (x, y) order.",
  Measurement: "Check the units carefully: area uses square units, volume uses cubic units, and capacity can be written in litres.",
  Probability: "Check the probability is between 0 and 1 unless it is written as a percentage. Simplify fractions where possible.",
  "Formula rearranging": "Check by substituting the rearranged expression back into the original formula."
}[topic] || "Check the answer against the information in the question.");

function algebra(difficulty, mode, v) {
  const a = 2 + v, b = 5 + v, c = 3 + v;
  if (difficulty === "Surface") {
    if (v % 2 === 0) {
      return q("Algebra fluency", difficulty, mode, `A student has <strong>${a}x</strong> points from one activity, earns another <strong>${b}x</strong> points, then loses <strong>${c}x</strong> points. Write a simplified expression for the final points.`, [
        `The final expression is ${a}x + ${b}x - ${c}x.`,
        `Collect like terms: (${a} + ${b} - ${c})x.`,
        `Answer: <strong>${a + b - c}x</strong>.`,
        casNote(mode)
      ]);
    }
    return q("Algebra fluency", difficulty, mode, `Simplify <strong>${a}x + ${b}x - ${c}x</strong>.`, [
      `Collect like terms: ${a}x + ${b}x - ${c}x = (${a} + ${b} - ${c})x.`,
      `The coefficient is ${a + b - c}.`,
      `Answer: <strong>${a + b - c}x</strong>.`,
      casNote(mode)
    ]);
  }
  if (difficulty === "Procedural") {
    if (v % 2 === 1) {
      return q("Algebra fluency", difficulty, mode, `A rectangular garden has length <strong>${a}x + ${b}</strong> metres and width <strong>x - ${c}</strong> metres. Write an expanded expression for its area.`, [
        `Area = length &times; width, so area = (${a}x + ${b})(x - ${c}).`,
        `Expand each product: ${a}x*x, ${a}x*(-${c}), ${b}*x, and ${b}*(-${c}).`,
        `This gives ${a}x^2 - ${a * c}x + ${b}x - ${b * c}.`,
        `Answer: <strong>${a}x^2 ${b - a * c >= 0 ? "+" : "-"} ${Math.abs(b - a * c)}x - ${b * c}</strong>.`,
        casNote(mode)
      ]);
    }
    return q("Algebra fluency", difficulty, mode, `Expand and simplify <strong>(${a}x + ${b})(x - ${c})</strong>.`, [
      `Expand each product: ${a}x*x, ${a}x*(-${c}), ${b}*x, and ${b}*(-${c}).`,
      `This gives ${a}x^2 - ${a * c}x + ${b}x - ${b * c}.`,
      `Collect the x terms: <strong>${a}x^2 ${b - a * c >= 0 ? "+" : "-"} ${Math.abs(b - a * c)}x - ${b * c}</strong>.`,
      casNote(mode)
    ]);
  }
  if (difficulty === "Reasoning") {
    const p = v + 2, r = v + 5;
    if (v % 2 === 0) {
      return q("Algebra fluency", difficulty, mode, `The area of a rectangular display is modelled by <strong>x^2 + ${p + r}x + ${p * r}</strong>. Write this area as a product of two linear factors.`, [
        `Factorising writes the area expression as length &times; width.`,
        `Find two numbers that multiply to ${p * r} and add to ${p + r}: ${p} and ${r}.`,
        `So the factorised form is <strong>(x + ${p})(x + ${r})</strong>.`,
        `Leave the answer in factorised form because the question asks for an expression.`,
        casNote(mode)
      ]);
    }
    return q("Algebra fluency", difficulty, mode, `Factorise <strong>x^2 + ${p + r}x + ${p * r}</strong>.`, [
      `Find two numbers that multiply to ${p * r} and add to ${p + r}: ${p} and ${r}.`,
      `So the factorised form is <strong>(x + ${p})(x + ${r})</strong>.`,
      `Leave the answer in factorised form because the task is to rewrite the expression.`,
      casNote(mode)
    ]);
  }
  const n = v + 2;
  return q("Algebra fluency", difficulty, mode, `A number pattern starts with <strong>${n}</strong>. <ol class="parts"><li>Write the next consecutive integer.</li><li>Write an expression for ${n} multiplied by the next integer, then add the next integer.</li><li>Simplify the result and explain why it is a square number.</li></ol>`, [
    `Part a: the next consecutive integer is ${n + 1}.`,
    `Part b: product plus ${n + 1} is ${n}(${n + 1}) + ${n + 1}.`,
    `Part c: factor the common ${n + 1}: (${n + 1})(${n} + 1) = ${n + 1}^2.`,
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
  return q("Equations and systems", difficulty, mode, `Two numbers have a sum of <strong>${2 * x + 3}</strong>. The larger number is <strong>3</strong> more than the smaller. <ol class="parts"><li>Define a variable for the smaller number.</li><li>Write and solve an equation.</li><li>State both numbers.</li></ol>`, [
    `Part a: let the smaller number be n. The larger number is n + 3.`,
    `Part b: n + n + 3 = ${2 * x + 3}.`,
    `Simplify: 2n = ${2 * x}, so n = ${x}.`,
    `Part c: the numbers are <strong>${x}</strong> and <strong>${x + 3}</strong>.`
  ]);
}

function quadratics(difficulty, mode, v) {
  const r1 = v + 1, r2 = v + 4;
  if (difficulty === "Surface") {
    if (v % 2 === 0) {
      return q("Quadratics", difficulty, mode, `A rectangular logo has area expression <strong>x^2 - ${r1 + r2}x + ${r1 * r2}</strong>. Factorise the expression to show the possible side-length expressions.`, [
        `Factorising rewrites the area as a product of two brackets.`,
        `Find two numbers that multiply to ${r1 * r2} and add to -${r1 + r2}: -${r1} and -${r2}.`,
        `Answer: <strong>(x - ${r1})(x - ${r2})</strong>.`,
        casNote(mode)
      ]);
    }
    return q("Quadratics", difficulty, mode, `Factorise <strong>x^2 - ${r1 + r2}x + ${r1 * r2}</strong>.`, [
      `Find two numbers that multiply to ${r1 * r2} and add to -${r1 + r2}: -${r1} and -${r2}.`,
      `Answer: <strong>(x - ${r1})(x - ${r2})</strong>.`,
      casNote(mode)
    ]);
  }
  if (difficulty === "Procedural") {
    const h = v + 2, k = v + 3;
    if (v % 2 === 1) {
      return q("Quadratics", difficulty, mode, `The height of a decorative arch is modelled by <strong>y = (x - ${h})^2 + ${k}</strong>. State the turning point of the model.`, [
        `Completed-square form y = (x - h)^2 + k has turning point (h, k).`,
        `Here h = ${h} and k = ${k}.`,
        `Answer: <strong>(${h}, ${k})</strong>.`,
        `This is an interpretation of the form, not solving a quadratic.`
      ]);
    }
    return q("Quadratics", difficulty, mode, `State the turning point of <strong>y = (x - ${h})^2 + ${k}</strong>.`, [
      `Completed-square form y = (x - h)^2 + k has turning point (h, k).`,
      `Here h = ${h} and k = ${k}.`,
      `Answer: <strong>(${h}, ${k})</strong>.`
    ]);
  }
  if (difficulty === "Reasoning") {
    if (v % 2 === 0) {
      return q("Quadratics", difficulty, mode, `A design uses two side expressions, <strong>x - ${r1}</strong> and <strong>x - ${r2}</strong>. Expand the product to write the area expression in standard form.`, [
        `The area expression is (x - ${r1})(x - ${r2}).`,
        `Multiply the first terms: x*x = x^2.`,
        `Multiply the outside and inside terms: -${r2}x and -${r1}x.`,
        `Multiply the last terms: (-${r1})(-${r2}) = ${r1 * r2}.`,
        `Answer: <strong>x^2 - ${r1 + r2}x + ${r1 * r2}</strong>.`,
        casNote(mode)
      ]);
    }
    return q("Quadratics", difficulty, mode, `Expand and simplify <strong>(x - ${r1})(x - ${r2})</strong>.`, [
      `Multiply the first terms: x*x = x^2.`,
      `Multiply the outside and inside terms: -${r2}x and -${r1}x.`,
      `Multiply the last terms: (-${r1})(-${r2}) = ${r1 * r2}.`,
      `Answer: <strong>x^2 - ${r1 + r2}x + ${r1 * r2}</strong>.`,
      casNote(mode)
    ]);
  }
  const h = v + 2, k = v + 1;
  return q("Quadratics", difficulty, mode, `A model has height <strong>h(t) = -(t - ${h})^2 + ${k + 8}</strong>. <ol class="parts"><li>Explain whether the graph opens up or down.</li><li>State the turning point.</li><li>Use the turning point to state the maximum height and when it occurs.</li></ol>`, [
    `Part a: the negative coefficient means the parabola opens downward.`,
    `Part b: the turning point is (${h}, ${k + 8}).`,
    `Part c: the maximum height is <strong>${k + 8}</strong> at <strong>t = ${h}</strong>.`,
    casNote(mode)
  ]);
}

function graphs(difficulty, mode, v) {
  const x1 = v, y1 = 2 * v + 1, x2 = v + 3, y2 = 2 * (v + 3) + 1;
  if (difficulty === "Surface") {
    if (v % 2 === 0) {
      return q("Linear graphs", difficulty, mode, `A walking track profile passes through <strong>(${x1}, ${y1})</strong> and <strong>(${x2}, ${y2})</strong>, where x is distance and y is height. Find the gradient of the profile.`, [
        `Gradient = rise/run = change in height / change in distance.`,
        `Gradient = (${y2} - ${y1}) / (${x2} - ${x1}).`,
        `Gradient = ${y2 - y1}/${x2 - x1}.`,
        `Answer: <strong>${(y2 - y1) / (x2 - x1)}</strong>.`
      ]);
    }
    return q("Linear graphs", difficulty, mode, `Find the gradient between <strong>(${x1}, ${y1})</strong> and <strong>(${x2}, ${y2})</strong>.`, [
      `Gradient = rise/run = (${y2} - ${y1}) / (${x2} - ${x1}).`,
      `Gradient = ${y2 - y1}/${x2 - x1}.`,
      `Answer: <strong>${(y2 - y1) / (x2 - x1)}</strong>.`
    ]);
  }
  if (difficulty === "Procedural") {
    if (v % 2 === 1) {
      return q("Linear graphs", difficulty, mode, `A hire company charges according to <strong>y = ${v + 2}x + ${v + 5}</strong>, where x is hours and y is dollars. What is the starting charge before any hours are added?`, [
        `The starting charge is the y-intercept.`,
        `In y = mx + c, the y-intercept is c.`,
        `Here c = ${v + 5}.`,
        `Answer: <strong>$${v + 5}</strong>.`
      ]);
    }
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
  return q("Linear graphs", difficulty, mode, `A line passes through <strong>(${x1}, ${y1})</strong> and has gradient <strong>${v + 1}</strong>. <ol class="parts"><li>Write the equation as y = mx + c using the gradient.</li><li>Substitute the given point to find c.</li><li>State the full equation.</li></ol>`, [
    `Part a: use y = ${v + 1}x + c.`,
    `Part b: substitute (${x1}, ${y1}): ${y1} = ${v + 1}(${x1}) + c.`,
    `So c = ${y1 - (v + 1) * x1}.`,
    `Answer: <strong>y = ${v + 1}x ${y1 - (v + 1) * x1 >= 0 ? "+" : "-"} ${Math.abs(y1 - (v + 1) * x1)}</strong>.`
  ]);
}

function measurement(difficulty, mode, v) {
  const l = v + 6, w = v + 3, h = v + 2;
  if (difficulty === "Surface") {
    if (v % 2 === 1) {
      return q("Measurement", difficulty, mode, `A triangular shade cloth has base <strong>${l}</strong> m and vertical height <strong>${w}</strong> m. Find the area of the cloth.`, [
        `Use the triangle area formula: area = 1/2 &times; base &times; height.`,
        `Area = 1/2 &times; ${l} &times; ${w}.`,
        `Answer: <strong>${fmt(0.5 * l * w)} m^2</strong>.`
      ]);
    }
    return q("Measurement", difficulty, mode, `Find the area of a triangle with base <strong>${l}</strong> cm and height <strong>${w}</strong> cm.`, [
      `Area = 1/2 &times; base &times; height.`,
      `Area = 1/2 &times; ${l} &times; ${w}.`,
      `Answer: <strong>${fmt(0.5 * l * w)} cm^2</strong>.`
    ]);
  }
  if (difficulty === "Procedural") {
    if (v % 2 === 0) {
      return q("Measurement", difficulty, mode, `A storage box is <strong>${l}</strong> cm long, <strong>${w}</strong> cm wide, and <strong>${h}</strong> cm high. Find its volume.`, [
        `Volume = length &times; width &times; height.`,
        `Volume = ${l} &times; ${w} &times; ${h}.`,
        `Answer: <strong>${l * w * h} cm^3</strong>.`,
        casNote(mode)
      ]);
    }
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
  return q("Measurement", difficulty, mode, `A circular garden bed has radius <strong>${r}</strong> cm. A sector of the garden has angle <strong>${angle} degrees</strong>. <ol class="parts"><li>Write the sector-area formula.</li><li>Substitute the radius and angle.</li><li>Find the area to 1 decimal place.</li></ol>`, [
    `Part a: sector area = angle/360 &times; pi &times; r^2.`,
    `Part b: area = ${angle}/360 &times; pi &times; ${r}^2.`,
    `Part c: area = <strong>${fmt((angle / 360) * Math.PI * r * r)} cm^2</strong>.`,
    casNote(mode)
  ]);
}

function probability(difficulty, mode, v) {
  const red = v + 2, blue = v + 3, green = v + 5, total = red + blue + green;
  if (difficulty === "Surface") {
    if (v % 2 === 0) {
      return q("Probability", difficulty, mode, `A game box contains <strong>${red}</strong> red tokens, <strong>${blue}</strong> blue tokens, and <strong>${green}</strong> green tokens. One token is selected at random. Find the probability of selecting blue.`, [
        `Total tokens = ${red} + ${blue} + ${green} = ${total}.`,
        `Favourable outcomes are the blue tokens: ${blue}.`,
        `Answer: <strong>${fraction(blue, total)}</strong>.`
      ]);
    }
    return q("Probability", difficulty, mode, `A bag has <strong>${red}</strong> red, <strong>${blue}</strong> blue, and <strong>${green}</strong> green counters. Find P(blue).`, [
      `Total counters = ${total}.`,
      `Blue counters = ${blue}.`,
      `Answer: <strong>${fraction(blue, total)}</strong>.`
    ]);
  }
  if (difficulty === "Procedural") {
    if (v % 2 === 1) {
      return q("Probability", difficulty, mode, `At a fete stall, a prize tub contains <strong>${red}</strong> red tickets, <strong>${blue}</strong> blue tickets, and <strong>${green}</strong> green tickets. A ticket is drawn at random. Find the probability that it is not green.`, [
        `Not green means red or blue.`,
        `Favourable outcomes = ${red} + ${blue} = ${red + blue}.`,
        `Total tickets = ${total}.`,
        `Answer: <strong>${fraction(red + blue, total)}</strong>.`
      ]);
    }
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
  return q("Probability", difficulty, mode, `In a class of <strong>${classSize}</strong>, <strong>${a}</strong> students play basketball, <strong>${b}</strong> play tennis, and <strong>${both}</strong> play both. <ol class="parts"><li>Find how many students play at least one of the two sports.</li><li>Find how many students play neither sport.</li><li>Find P(neither).</li></ol>`, [
    `Part a: at least one = ${a} + ${b} - ${both} = ${a + b - both}.`,
    `Part b: neither = ${classSize} - ${a + b - both} = ${classSize - (a + b - both)}.`,
    `Part c: P(neither) = <strong>${fraction(classSize - (a + b - both), classSize)}</strong>.`,
    casNote(mode)
  ]);
}

function formula(difficulty, mode, v) {
  const b = v + 4, h = v + 3;
  if (difficulty === "Surface") {
    if (v % 2 === 0) {
      return q("Formula rearranging", difficulty, mode, `A triangular sign has base <strong>${b}</strong> m and height <strong>${h}</strong> m. Use <strong>A = bh/2</strong> to find its area.`, [
        `Substitute b = ${b} and h = ${h} into A = bh/2.`,
        `A = ${b} &times; ${h} / 2.`,
        `Answer: <strong>${fmt(b * h / 2)} m^2</strong>.`
      ]);
    }
    return q("Formula rearranging", difficulty, mode, `Substitute <strong>b = ${b}</strong> and <strong>h = ${h}</strong> into A = bh/2.`, [
      `A = ${b} &times; ${h} / 2.`,
      `Answer: <strong>${fmt(b * h / 2)}</strong>.`
    ]);
  }
  if (difficulty === "Procedural") {
    if (v % 2 === 0) {
      return q("Formula rearranging", difficulty, mode, `Make <strong>r</strong> the subject of <strong>C = 2&pi;r</strong>.`, [
        `Start with C = 2&pi;r.`,
        `Divide both sides by 2&pi;.`,
        `Answer: <strong>r = C/(2&pi;)</strong>.`,
        casNote(mode)
      ]);
    }
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
  return q("Formula rearranging", difficulty, mode, `A trip uses the formula <strong>d = st</strong>. The distance is <strong>${speed * time}</strong> km and the time is <strong>${time}</strong> h. <ol class="parts"><li>Make s the subject.</li><li>Substitute the distance and time.</li><li>State the speed with units.</li></ol>`, [
    `Part a: make s the subject: s = d/t.`,
    `Part b: substitute: s = ${speed * time}/${time}.`,
    `Part c: simplify the division.`,
    `Answer: <strong>${speed} km/h</strong>.`
  ]);
}

const generators = { "Algebra fluency": algebra, "Equations and systems": equations, Quadratics: quadratics, "Linear graphs": graphs, Measurement: measurement, Probability: probability, "Formula rearranging": formula };

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
    text: formatMath(text),
    solution: [
      intro(topic, difficulty),
      ...uniqueSteps,
      `${topicCheck(topic)} ${casNote(cas)}`
    ].map(formatMath)
  };
}

function buildBank() {
  const bank = [];
  topics.forEach((topic) => difficulties.forEach((difficulty) => casModes.forEach((cas, casIndex) => {
    for (let v = 1; v <= 4; v += 1) bank.push(generators[topic](difficulty, cas, v + casIndex * 4));
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
