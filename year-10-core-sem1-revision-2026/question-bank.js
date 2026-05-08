const topics = ["Algebra fluency", "Equations and systems", "Quadratics", "Linear graphs", "Measurement", "Probability", "Formula rearranging"];
const difficulties = ["Surface", "Procedural", "Reasoning", "Problem-solving"];
const casModes = ["No CAS", "CAS optional", "CAS helpful"];

const gcd = (a, b) => b ? gcd(b, a % b) : Math.abs(a);
const frac = (a, b) => `${a / gcd(a, b)}/${b / gcd(a, b)}`;
const fmt = (n) => Number.isInteger(n) ? String(n) : n.toFixed(1);
const sign = (n) => n >= 0 ? `+ ${n}` : `- ${Math.abs(n)}`;
const htmlMath = (s) => s
  .replace(/\bpi\b/g, "&pi;")
  .replace(/\bdegrees\b/g, "&deg;")
  .replace(/([A-Za-z0-9)])\^(-?\d+)/g, "$1<sup>$2</sup>");

function casNote(mode) {
  if (mode === "No CAS") return "No CAS: write the algebra and arithmetic steps clearly.";
  if (mode === "CAS optional") return "CAS optional: set it up by hand first, then use CAS as a check.";
  return "CAS helpful: use CAS efficiently, but still write the setup and interpret the result.";
}

const checkNote = {
  "Algebra fluency": "Check by expanding back, factorising back, or substituting a simple value such as x = 1.",
  "Equations and systems": "Check by substituting the answer back into the original equation or equations.",
  Quadratics: "Check by expanding the factorised form or reading the completed-square form carefully. Do not solve a quadratic equation.",
  "Linear graphs": "Check coordinates by substituting them into the rule. Keep points in (x, y) order.",
  Measurement: "Check units: area uses square units, volume uses cubic units, and capacity can be converted to litres.",
  Probability: "Check that the probability is between 0 and 1 unless it is written as a percentage.",
  "Formula rearranging": "Check by substituting the rearranged expression back into the original formula."
};

function q(topic, difficulty, cas, text, steps) {
  const body = [
    `Read the question, identify the skill as <strong>${topic.toLowerCase()}</strong>, and write the setup before calculating.`,
    ...steps,
    `${checkNote[topic]} ${casNote(cas)}`
  ].map(htmlMath);
  while (body.length < 5) body.splice(body.length - 1, 0, "Write one clear calculation line before the final answer.");
  return { topic, difficulty, cas, title: `${topic}: ${difficulty}`, text: htmlMath(text), solution: body };
}

const variant = (v) => v % 4;

function algebra(difficulty, cas, v) {
  const t = variant(v), a = v + 2, b = v + 5, c = v + 3, d = v + 7;
  if (difficulty === "Surface") {
    if (t === 0) return q("Algebra fluency", difficulty, cas, `Simplify the total perimeter expression <strong>${a}x + ${b} + ${c}x + ${d}</strong>.`, [`Collect x terms and constants separately.`, `${a}x + ${c}x = ${a + c}x and ${b} + ${d} = ${b + d}.`, `Answer: <strong>${a + c}x + ${b + d}</strong>.`]);
    if (t === 1) return q("Algebra fluency", difficulty, cas, `A student earns <strong>${a}x</strong> points, then <strong>${b}x</strong> more, then loses <strong>${c}x</strong>. Write a simplified expression.`, [`Expression: ${a}x + ${b}x - ${c}x.`, `Collect like terms: (${a} + ${b} - ${c})x.`, `Answer: <strong>${a + b - c}x</strong>.`]);
    if (t === 2) return q("Algebra fluency", difficulty, cas, `Simplify <strong>${a}p - ${b} + ${c}p + ${d}</strong>.`, [`Group p terms and constants.`, `${a}p + ${c}p = ${a + c}p and -${b} + ${d} = ${d - b}.`, `Answer: <strong>${a + c}p ${sign(d - b)}</strong>.`]);
    return q("Algebra fluency", difficulty, cas, `A tile pattern has <strong>${a}n + ${b}</strong> blue tiles and <strong>${c}n - ${d}</strong> red tiles. Write the total number of tiles.`, [`Add the two expressions.`, `(${a}n + ${b}) + (${c}n - ${d}) = ${a + c}n ${sign(b - d)}.`, `Answer: <strong>${a + c}n ${sign(b - d)}</strong>.`]);
  }
  if (difficulty === "Procedural") {
    if (t === 0) return q("Algebra fluency", difficulty, cas, `Expand and simplify <strong>${a}(x + ${b}) - ${c}(x - ${d})</strong>.`, [`Expand both brackets: ${a}x + ${a * b} - ${c}x + ${c * d}.`, `Collect like terms.`, `Answer: <strong>${a - c}x + ${a * b + c * d}</strong>.`]);
    if (t === 1) return q("Algebra fluency", difficulty, cas, `A rectangle has length <strong>${a}x + ${b}</strong> and width <strong>x - ${c}</strong>. Write the expanded area expression.`, [`Area = (${a}x + ${b})(x - ${c}).`, `Expand: ${a}x^2 - ${a * c}x + ${b}x - ${b * c}.`, `Answer: <strong>${a}x^2 ${sign(b - a * c)}x - ${b * c}</strong>.`]);
    if (t === 2) return q("Algebra fluency", difficulty, cas, `Factorise the common factor from <strong>${a * c}x + ${b * c}</strong>.`, [`Both terms share a common factor of ${c}.`, `Divide each term by ${c}.`, `Answer: <strong>${c}(${a}x + ${b})</strong>.`]);
    return q("Algebra fluency", difficulty, cas, `Expand <strong>(${a}x - ${b})(${c}x + ${d})</strong>.`, [`Multiply each pair of terms.`, `${a}x * ${c}x = ${a * c}x^2, ${a}x * ${d} = ${a * d}x, -${b} * ${c}x = -${b * c}x.`, `Answer: <strong>${a * c}x^2 ${sign(a * d - b * c)}x - ${b * d}</strong>.`]);
  }
  if (difficulty === "Reasoning") {
    const p = v + 2, r = v + 6;
    if (t === 0) return q("Algebra fluency", difficulty, cas, `A rectangle has area expression <strong>x^2 + ${p + r}x + ${p * r}</strong>. Write possible side expressions.`, [`Factorise the area expression.`, `Numbers that multiply to ${p * r} and add to ${p + r} are ${p} and ${r}.`, `Answer: <strong>(x + ${p})(x + ${r})</strong>.`]);
    if (t === 1) return q("Algebra fluency", difficulty, cas, `A student expands <strong>(${a}x + ${b})(x + ${c})</strong> and gets the middle coefficient one too high. Identify the correct middle coefficient.`, [`The middle terms are ${a * c}x and ${b}x.`, `Correct middle coefficient = ${a * c} + ${b} = ${a * c + b}.`, `Correct expression: <strong>${a}x^2 + ${a * c + b}x + ${b * c}</strong>.`]);
    if (t === 2) return q("Algebra fluency", difficulty, cas, `Factorise <strong>${c}x^2 + ${c * (p + r)}x + ${c * p * r}</strong> by first taking out a common factor.`, [`Take out ${c}.`, `${c}(x^2 + ${p + r}x + ${p * r}).`, `Answer: <strong>${c}(x + ${p})(x + ${r})</strong>.`]);
    return q("Algebra fluency", difficulty, cas, `A pattern rule is <strong>(${a}n + ${b}) - (${c}n - ${d})</strong>. Simplify it and explain the minus before the second bracket.`, [`The minus changes both terms in the second bracket.`, `${a}n + ${b} - ${c}n + ${d}.`, `Answer: <strong>${a - c}n + ${b + d}</strong>.`]);
  }
  const p = v + 2, r = v + 6;
  if (t === 0) return q("Algebra fluency", difficulty, cas, `A display has outer area <strong>(${a}x + ${b})(x + ${c})</strong>. <ol class="parts"><li>Write the area expression.</li><li>Expand it.</li><li>Subtract an inner strip of <strong>${d}x</strong> and simplify.</li></ol>`, [`Part a: area = (${a}x + ${b})(x + ${c}).`, `Part b: ${a}x^2 + ${a * c + b}x + ${b * c}.`, `Part c: <strong>${a}x^2 + ${a * c + b - d}x + ${b * c}</strong>.`]);
  if (t === 1) return q("Algebra fluency", difficulty, cas, `A number pattern begins at <strong>${a}</strong>. <ol class="parts"><li>Write the next consecutive integer.</li><li>Write the product of the two integers plus the larger integer.</li><li>Simplify and identify the square number.</li></ol>`, [`Part a: ${a + 1}.`, `Part b: ${a}(${a + 1}) + ${a + 1}.`, `Part c: (${a + 1})(${a + 1}) = <strong>${(a + 1) ** 2}</strong>.`]);
  if (t === 2) return q("Algebra fluency", difficulty, cas, `A mural has area <strong>x^2 + ${p + r}x + ${p * r}</strong>. <ol class="parts"><li>Factorise it.</li><li>State two side expressions.</li><li>Expand your answer to check.</li></ol>`, [`Part a: <strong>(x + ${p})(x + ${r})</strong>.`, `Part b: sides can be x + ${p} and x + ${r}.`, `Part c: expanding gives x^2 + ${p + r}x + ${p * r}.`]);
  return q("Algebra fluency", difficulty, cas, `A club records adult-ticket income as <strong>${a}x + ${b}</strong> and student-ticket income as <strong>${c}x - ${d}</strong>. <ol class="parts"><li>Write the total.</li><li>Simplify it.</li><li>Find the total when x = 2.</li></ol>`, [`Part a: (${a}x + ${b}) + (${c}x - ${d}).`, `Part b: ${a + c}x ${sign(b - d)}.`, `Part c: <strong>${(a + c) * 2 + b - d}</strong>.`]);
}

function equations(difficulty, cas, v) {
  const t = variant(v), x = v + 3, y = v + 5, a = v + 2, b = v + 6;
  if (difficulty === "Surface") {
    if (t === 0) return q("Equations and systems", difficulty, cas, `Solve <strong>${a}(x + ${b}) = ${a * (x + b)}</strong>.`, [`Divide by ${a}: x + ${b} = ${x + b}.`, `Subtract ${b}.`, `Answer: <strong>x = ${x}</strong>.`]);
    if (t === 1) return q("Equations and systems", difficulty, cas, `A taxi fare is modelled by <strong>${a}x + ${b} = ${a * x + b}</strong>. Find x.`, [`Subtract ${b}: ${a}x = ${a * x}.`, `Divide by ${a}.`, `Answer: <strong>x = ${x}</strong>.`]);
    if (t === 2) return q("Equations and systems", difficulty, cas, `Solve <strong>x/${a} + ${b} = ${x / a + b}</strong>.`, [`Subtract ${b}: x/${a} = ${fmt(x / a)}.`, `Multiply by ${a}.`, `Answer: <strong>x = ${x}</strong>.`]);
    return q("Equations and systems", difficulty, cas, `A number is multiplied by <strong>${a}</strong>, then <strong>${b}</strong> is added to get <strong>${a * x + b}</strong>. Find the number.`, [`Equation: ${a}x + ${b} = ${a * x + b}.`, `Subtract ${b}, then divide by ${a}.`, `Answer: <strong>${x}</strong>.`]);
  }
  if (difficulty === "Procedural") {
    if (t === 0) return q("Equations and systems", difficulty, cas, `Solve <strong>x + y = ${x + y}</strong> and <strong>2x - y = ${2 * x - y}</strong>.`, [`Add the equations: 3x = ${3 * x}.`, `x = ${x}; then y = ${y}.`, `Answer: <strong>(${x}, ${y})</strong>.`]);
    if (t === 1) return q("Equations and systems", difficulty, cas, `A membership costs a joining fee plus <strong>$${a}</strong> per week. After <strong>${x}</strong> weeks it costs <strong>$${a * x + b}</strong>. Find the joining fee.`, [`Equation: ${a}(${x}) + f = ${a * x + b}.`, `f = ${a * x + b} - ${a * x}.`, `Answer: <strong>$${b}</strong>.`]);
    if (t === 2) return q("Equations and systems", difficulty, cas, `Tickets cost <strong>$${a}</strong> for adults and <strong>$${b}</strong> for students. A group buys <strong>${x}</strong> adult tickets and some student tickets for <strong>$${a * x + b * y}</strong>. Find the number of student tickets.`, [`Equation: ${a}(${x}) + ${b}s = ${a * x + b * y}.`, `${b}s = ${b * y}.`, `Answer: <strong>${y}</strong> student tickets.`]);
    return q("Equations and systems", difficulty, cas, `Solve <strong>${a}x + ${b} = ${a * x + b}</strong>, then check your answer.`, [`Subtract ${b}: ${a}x = ${a * x}.`, `x = ${x}.`, `Check: ${a}(${x}) + ${b} = ${a * x + b}.`]);
  }
  if (difficulty === "Reasoning") {
    if (t === 0) return q("Equations and systems", difficulty, cas, `A rectangle has width <strong>x</strong> and length <strong>${a}x + ${b}</strong>. Its perimeter is <strong>${2 * (x + a * x + b)}</strong> cm. Find x.`, [`Equation: 2(x + ${a}x + ${b}) = ${2 * (x + a * x + b)}.`, `Divide by 2: ${a + 1}x + ${b} = ${x + a * x + b}.`, `Answer: <strong>x = ${x}</strong>.`]);
    if (t === 1) return q("Equations and systems", difficulty, cas, `Two numbers add to <strong>${x + y}</strong>. The second is <strong>${y - x}</strong> more than the first. Find the smaller number.`, [`Let the smaller number be n.`, `n + n + ${y - x} = ${x + y}.`, `Answer: <strong>${x}</strong>.`]);
    if (t === 2) return q("Equations and systems", difficulty, cas, `A school buys <strong>${x}</strong> calculators and <strong>${y}</strong> rulers for <strong>$${a * x + b * y}</strong>. Calculators cost <strong>$${a}</strong> and rulers cost <strong>$${b}</strong>. Write and check the cost equation.`, [`Equation: ${a}(${x}) + ${b}(${y}) = ${a * x + b * y}.`, `Left side = ${a * x} + ${b * y}.`, `The total checks as <strong>$${a * x + b * y}</strong>.`]);
    return q("Equations and systems", difficulty, cas, `A rectangle has perimeter <strong>${2 * (x + y)}</strong> cm. Its length is <strong>${y - x}</strong> cm more than its width. Find the width.`, [`Let width = w, length = w + ${y - x}.`, `2(w + w + ${y - x}) = ${2 * (x + y)}.`, `Answer: <strong>w = ${x}</strong>.`]);
  }
  if (t === 0) return q("Equations and systems", difficulty, cas, `Two numbers have sum <strong>${x + y}</strong> and difference <strong>${y - x}</strong>. <ol class="parts"><li>Write two equations.</li><li>Add them to find the larger number.</li><li>Find the smaller number.</li></ol>`, [`Part a: a + b = ${x + y}, b - a = ${y - x}.`, `Part b: 2b = ${2 * y}, so b = ${y}.`, `Part c: a = <strong>${x}</strong>.`]);
  if (t === 1) return q("Equations and systems", difficulty, cas, `A membership has a joining fee and weekly charge. After <strong>${x}</strong> weeks it costs <strong>$${a * x + b}</strong>; after <strong>${y}</strong> weeks it costs <strong>$${a * y + b}</strong>. <ol class="parts"><li>Find the weekly charge.</li><li>Find the joining fee.</li><li>Write the rule.</li></ol>`, [`Part a: weekly charge = (${a * y + b} - ${a * x + b}) / (${y} - ${x}) = ${a}.`, `Part b: joining fee = ${a * x + b} - ${a}(${x}) = ${b}.`, `Part c: <strong>C = ${a}w + ${b}</strong>.`]);
  if (t === 2) return q("Equations and systems", difficulty, cas, `A rectangle has length <strong>${a}x + ${b}</strong> and width <strong>x</strong>. Its perimeter is <strong>${2 * (x + a * x + b)}</strong>. <ol class="parts"><li>Write the equation.</li><li>Solve for x.</li><li>Find the length.</li></ol>`, [`Part a: 2(x + ${a}x + ${b}) = ${2 * (x + a * x + b)}.`, `Part b: x = ${x}.`, `Part c: length = <strong>${a * x + b}</strong>.`]);
  return q("Equations and systems", difficulty, cas, `A school order contains calculators and rulers. <ol class="parts"><li>Write an equation for <strong>${x}</strong> calculators at $${a} and <strong>${y}</strong> rulers at $${b}.</li><li>Calculate the total.</li><li>Explain how to check it.</li></ol>`, [`Part a: T = ${a}(${x}) + ${b}(${y}).`, `Part b: T = <strong>$${a * x + b * y}</strong>.`, `Part c: substitute both quantities back into the cost rule.`]);
}

function quadratics(difficulty, cas, v) {
  const t = variant(v), r1 = v + 1, r2 = v + 4, h = v + 2, k = v + 3;
  if (difficulty === "Surface") {
    if (t === 0) return q("Quadratics", difficulty, cas, `Factorise <strong>x^2 - ${r1 + r2}x + ${r1 * r2}</strong>.`, [`Find two numbers that multiply to ${r1 * r2} and add to -${r1 + r2}.`, `Those numbers are -${r1} and -${r2}.`, `Answer: <strong>(x - ${r1})(x - ${r2})</strong>.`]);
    if (t === 1) return q("Quadratics", difficulty, cas, `Expand <strong>(x + ${r1})(x + ${r2})</strong>.`, [`Multiply each term in the first bracket by each term in the second.`, `x^2 + ${r2}x + ${r1}x + ${r1 * r2}.`, `Answer: <strong>x^2 + ${r1 + r2}x + ${r1 * r2}</strong>.`]);
    if (t === 2) return q("Quadratics", difficulty, cas, `A quadratic is written as <strong>y = (x - ${h})^2 + ${k}</strong>. State its turning point.`, [`Compare with y = (x - h)^2 + k.`, `Here h = ${h} and k = ${k}.`, `Answer: <strong>(${h}, ${k})</strong>.`]);
    return q("Quadratics", difficulty, cas, `Identify the coefficient of x^2 in <strong>${r1}x^2 - ${r2}x + ${k}</strong>.`, [`The coefficient is the number multiplying x^2.`, `Answer: <strong>${r1}</strong>.`, `This is not a quadratic-solving question.`]);
  }
  if (difficulty === "Procedural") {
    if (t === 0) return q("Quadratics", difficulty, cas, `A rectangular logo has area <strong>x^2 - ${r1 + r2}x + ${r1 * r2}</strong>. Factorise it to show side expressions.`, [`Use -${r1} and -${r2}.`, `The expression factorises into two brackets.`, `Answer: <strong>(x - ${r1})(x - ${r2})</strong>.`]);
    if (t === 1) return q("Quadratics", difficulty, cas, `A design uses side expressions <strong>x - ${r1}</strong> and <strong>x + ${r2}</strong>. Expand the area expression.`, [`Area = (x - ${r1})(x + ${r2}).`, `x^2 + ${r2}x - ${r1}x - ${r1 * r2}.`, `Answer: <strong>x^2 ${sign(r2 - r1)}x - ${r1 * r2}</strong>.`]);
    if (t === 2) return q("Quadratics", difficulty, cas, `State the turning point of <strong>y = -(x - ${h})^2 + ${k}</strong> and say whether it is a maximum or minimum.`, [`The turning point is (${h}, ${k}).`, `The negative sign means the graph opens downward.`, `Answer: <strong>maximum at (${h}, ${k})</strong>.`]);
    return q("Quadratics", difficulty, cas, `Expand <strong>(x + ${r1})^2</strong>.`, [`Write it as (x + ${r1})(x + ${r1}).`, `The middle term is ${r1}x + ${r1}x = ${2 * r1}x.`, `Answer: <strong>x^2 + ${2 * r1}x + ${r1 * r1}</strong>.`]);
  }
  if (difficulty === "Reasoning") {
    if (t === 0) return q("Quadratics", difficulty, cas, `A student claims <strong>(x - ${r1})(x - ${r2}) = x^2 - ${r1 + r2 + 1}x + ${r1 * r2}</strong>. Explain and correct the error.`, [`The constant term is correct.`, `The middle coefficient should be -${r1} - ${r2} = -${r1 + r2}.`, `Correct expression: <strong>x^2 - ${r1 + r2}x + ${r1 * r2}</strong>.`]);
    if (t === 1) return q("Quadratics", difficulty, cas, `Compare <strong>y = (x - ${h})^2 + ${k}</strong> and <strong>y = (x - ${h + 2})^2 + ${k}</strong>. Describe the turning-point change.`, [`First turning point: (${h}, ${k}).`, `Second turning point: (${h + 2}, ${k}).`, `It moves <strong>2 units right</strong>.`]);
    if (t === 2) return q("Quadratics", difficulty, cas, `A rectangle has area <strong>x^2 + ${r1 + r2}x + ${r1 * r2}</strong>. One side is <strong>x + ${r1}</strong>. Find the other side expression.`, [`Factorise the area.`, `x^2 + ${r1 + r2}x + ${r1 * r2} = (x + ${r1})(x + ${r2}).`, `Other side: <strong>x + ${r2}</strong>.`]);
    return q("Quadratics", difficulty, cas, `A model is <strong>h(t) = -(t - ${h})^2 + ${k + 8}</strong>. Interpret the turning point without solving.`, [`Completed-square form gives the turning point directly.`, `Turning point is (${h}, ${k + 8}).`, `Because it opens downward, this is the maximum height.`]);
  }
  if (t === 0) return q("Quadratics", difficulty, cas, `A display panel is modelled by <strong>y = -(x - ${h})^2 + ${k + 8}</strong>. <ol class="parts"><li>State whether it opens up or down.</li><li>State the turning point.</li><li>Explain the maximum value.</li></ol>`, [`Part a: downward, because of the negative sign.`, `Part b: turning point is (${h}, ${k + 8}).`, `Part c: maximum value is <strong>${k + 8}</strong>.`]);
  if (t === 1) return q("Quadratics", difficulty, cas, `A banner area is <strong>(x + ${r1})(x + ${r2})</strong>. <ol class="parts"><li>Expand it.</li><li>State the coefficient of x.</li><li>Check with x = 2.</li></ol>`, [`Part a: x^2 + ${r1 + r2}x + ${r1 * r2}.`, `Part b: coefficient of x is <strong>${r1 + r2}</strong>.`, `Part c: both forms give ${(2 + r1) * (2 + r2)}.`]);
  if (t === 2) return q("Quadratics", difficulty, cas, `A path design has area <strong>x^2 + ${r1 + r2}x + ${r1 * r2}</strong>. <ol class="parts"><li>Factorise it.</li><li>State side expressions.</li><li>Write a perimeter expression.</li></ol>`, [`Part a: <strong>(x + ${r1})(x + ${r2})</strong>.`, `Part b: x + ${r1} and x + ${r2}.`, `Part c: perimeter = <strong>4x + ${2 * (r1 + r2)}</strong>.`]);
  return q("Quadratics", difficulty, cas, `A student writes <strong>(x - ${r1})^2 = x^2 - ${r1 * r1}</strong>. <ol class="parts"><li>Expand correctly.</li><li>Identify the missing term.</li><li>Explain the error.</li></ol>`, [`Part a: x^2 - ${2 * r1}x + ${r1 * r1}.`, `Part b: missing term is <strong>-${2 * r1}x</strong>.`, `Part c: the middle terms do not disappear.`]);
}

function graphs(difficulty, cas, v) {
  const t = variant(v), m = v + 1, c = v + 4, x1 = v, y1 = m * v + c, x2 = v + 3, y2 = m * (v + 3) + c;
  if (difficulty === "Surface") {
    if (t === 0) return q("Linear graphs", difficulty, cas, `Find the gradient between <strong>(${x1}, ${y1})</strong> and <strong>(${x2}, ${y2})</strong>.`, [`Gradient = (${y2} - ${y1}) / (${x2} - ${x1}).`, `Gradient = ${y2 - y1}/${x2 - x1}.`, `Answer: <strong>${m}</strong>.`]);
    if (t === 1) return q("Linear graphs", difficulty, cas, `A hire rule is <strong>y = ${m}x + ${c}</strong>. State the gradient and y-intercept.`, [`In y = mx + c, gradient is m and y-intercept is c.`, `Gradient = ${m}.`, `y-intercept = <strong>${c}</strong>.`]);
    if (t === 2) return q("Linear graphs", difficulty, cas, `Which point is on <strong>y = ${m}x + ${c}</strong> when x = <strong>${x1}</strong>?`, [`Substitute x = ${x1}.`, `y = ${m}(${x1}) + ${c} = ${y1}.`, `Answer: <strong>(${x1}, ${y1})</strong>.`]);
    return q("Linear graphs", difficulty, cas, `A walking track rises from <strong>${y1}</strong> m to <strong>${y2}</strong> m over <strong>${x2 - x1}</strong> km. Find the gradient.`, [`Rise = ${y2 - y1}.`, `Run = ${x2 - x1}.`, `Gradient = <strong>${m}</strong>.`]);
  }
  if (difficulty === "Procedural") {
    if (t === 0) return q("Linear graphs", difficulty, cas, `Find the equation of a line with gradient <strong>${m}</strong> and y-intercept <strong>${c}</strong>.`, [`Use y = mx + c.`, `Substitute m = ${m} and c = ${c}.`, `Answer: <strong>y = ${m}x + ${c}</strong>.`]);
    if (t === 1) return q("Linear graphs", difficulty, cas, `A line passes through <strong>(0, ${c})</strong> and <strong>(${x2}, ${m * x2 + c})</strong>. Find the gradient.`, [`Gradient = (${m * x2 + c} - ${c}) / (${x2} - 0).`, `Gradient = ${m * x2}/${x2}.`, `Answer: <strong>${m}</strong>.`]);
    if (t === 2) return q("Linear graphs", difficulty, cas, `For <strong>y = ${m}x + ${c}</strong>, find y when x = <strong>${x2}</strong>.`, [`Substitute x = ${x2}.`, `y = ${m}(${x2}) + ${c}.`, `Answer: <strong>${m * x2 + c}</strong>.`]);
    return q("Linear graphs", difficulty, cas, `A subscription costs <strong>$${c}</strong> to join and <strong>$${m}</strong> per week. Write a rule for total cost y after x weeks.`, [`Starting cost is ${c}.`, `Weekly cost is ${m}.`, `Answer: <strong>y = ${m}x + ${c}</strong>.`]);
  }
  if (difficulty === "Reasoning") {
    if (t === 0) return q("Linear graphs", difficulty, cas, `Find the intersection of <strong>y = x + ${c}</strong> and <strong>y = ${2 * x1 + c} - x</strong>.`, [`Set equal: x + ${c} = ${2 * x1 + c} - x.`, `2x = ${2 * x1}, so x = ${x1}.`, `Intersection: <strong>(${x1}, ${x1 + c})</strong>.`]);
    if (t === 1) return q("Linear graphs", difficulty, cas, `Two plans cost <strong>y = ${m}x + ${c}</strong> and <strong>y = ${m + 1}x + ${c - x1}</strong>. Find when they cost the same.`, [`Set equal.`, `${m}x + ${c} = ${m + 1}x + ${c - x1}.`, `They are equal when <strong>x = ${x1}</strong>.`]);
    if (t === 2) return q("Linear graphs", difficulty, cas, `A line through <strong>(${x1}, ${y1})</strong> has gradient <strong>${m}</strong>. Find its equation.`, [`Use y = ${m}x + c.`, `${y1} = ${m}(${x1}) + c, so c = ${c}.`, `Answer: <strong>y = ${m}x + ${c}</strong>.`]);
    return q("Linear graphs", difficulty, cas, `A graph has y-intercept <strong>${c}</strong> and passes through <strong>(${x2}, ${y2})</strong>. Find the equation.`, [`Gradient = (${y2} - ${c}) / ${x2} = ${m}.`, `Use y = mx + c.`, `Answer: <strong>y = ${m}x + ${c}</strong>.`]);
  }
  if (t === 0) return q("Linear graphs", difficulty, cas, `A line passes through <strong>(${x1}, ${y1})</strong> and has gradient <strong>${m}</strong>. <ol class="parts"><li>Write y = mx + c.</li><li>Substitute the point to find c.</li><li>State the equation.</li></ol>`, [`Part a: y = ${m}x + c.`, `Part b: ${y1} = ${m}(${x1}) + c, so c = ${c}.`, `Part c: <strong>y = ${m}x + ${c}</strong>.`]);
  if (t === 1) return q("Linear graphs", difficulty, cas, `A printing shop charges a setup fee plus poster cost. <strong>${x1}</strong> posters cost <strong>$${y1}</strong> and <strong>${x2}</strong> posters cost <strong>$${y2}</strong>. <ol class="parts"><li>Find the cost per poster.</li><li>Find the setup fee.</li><li>Write the rule.</li></ol>`, [`Part a: gradient = (${y2} - ${y1}) / (${x2} - ${x1}) = ${m}.`, `Part b: setup fee = ${c}.`, `Part c: <strong>y = ${m}x + ${c}</strong>.`]);
  if (t === 2) return q("Linear graphs", difficulty, cas, `Two streaming plans are <strong>A = ${m}x + ${c}</strong> and <strong>B = ${m + 2}x + ${c - 2 * x1}</strong>. <ol class="parts"><li>Set them equal.</li><li>Find x.</li><li>Explain x.</li></ol>`, [`Part a: ${m}x + ${c} = ${m + 2}x + ${c - 2 * x1}.`, `Part b: x = <strong>${x1}</strong>.`, `Part c: the plans cost the same after ${x1} usage units.`]);
  return q("Linear graphs", difficulty, cas, `A tank starts with <strong>${c}</strong> L and fills at <strong>${m}</strong> L/min. <ol class="parts"><li>Write a rule.</li><li>Find the amount after ${x2} min.</li><li>Find when it reaches ${y2} L.</li></ol>`, [`Part a: y = ${m}x + ${c}.`, `Part b: y = ${m}(${x2}) + ${c} = ${y2} L.`, `Part c: x = <strong>${x2}</strong>.`]);
}

function measurement(difficulty, cas, v) {
  const t = variant(v), l = v + 6, w = v + 3, h = v + 2, r = v + 4, angle = 30 + 10 * v;
  if (difficulty === "Surface") {
    if (t === 0) return q("Measurement", difficulty, cas, `Find the area of a rectangle with length <strong>${l}</strong> cm and width <strong>${w}</strong> cm.`, [`Area = length * width.`, `Area = ${l} * ${w}.`, `Answer: <strong>${l * w} cm^2</strong>.`]);
    if (t === 1) return q("Measurement", difficulty, cas, `A triangular shade cloth has base <strong>${l}</strong> m and height <strong>${w}</strong> m. Find its area.`, [`Area = 1/2 * base * height.`, `Area = 1/2 * ${l} * ${w}.`, `Answer: <strong>${fmt(0.5 * l * w)} m^2</strong>.`]);
    if (t === 2) return q("Measurement", difficulty, cas, `Find the circumference of a circle with radius <strong>${r}</strong> cm. Leave your answer in terms of pi.`, [`Circumference = 2pi r.`, `C = 2 * pi * ${r}.`, `Answer: <strong>${2 * r}pi cm</strong>.`]);
    return q("Measurement", difficulty, cas, `Convert <strong>${l * 100}</strong> cm to metres.`, [`100 cm = 1 m.`, `Divide by 100.`, `Answer: <strong>${l} m</strong>.`]);
  }
  if (difficulty === "Procedural") {
    if (t === 0) return q("Measurement", difficulty, cas, `A storage box is <strong>${l}</strong> cm long, <strong>${w}</strong> cm wide, and <strong>${h}</strong> cm high. Find its volume.`, [`Volume = length * width * height.`, `Volume = ${l} * ${w} * ${h}.`, `Answer: <strong>${l * w * h} cm^3</strong>.`]);
    if (t === 1) return q("Measurement", difficulty, cas, `A rectangular garden is <strong>${l}</strong> m by <strong>${w}</strong> m. Find its perimeter.`, [`Perimeter = 2(length + width).`, `P = 2(${l} + ${w}).`, `Answer: <strong>${2 * (l + w)} m</strong>.`]);
    if (t === 2) return q("Measurement", difficulty, cas, `Convert <strong>${l * w * h * 1000} cm^3</strong> to litres.`, [`1000 cm^3 = 1 L.`, `Divide by 1000.`, `Answer: <strong>${l * w * h} L</strong>.`]);
    return q("Measurement", difficulty, cas, `Find the area of a circle with radius <strong>${r}</strong> cm. Round to 1 decimal place.`, [`Area = pi r^2.`, `Area = pi * ${r}^2.`, `Answer: <strong>${fmt(Math.PI * r * r)} cm^2</strong>.`]);
  }
  if (difficulty === "Reasoning") {
    if (t === 0) return q("Measurement", difficulty, cas, `A composite shape is a rectangle <strong>${l}</strong> cm by <strong>${w}</strong> cm and a triangle with base <strong>${l}</strong> cm and height <strong>${h}</strong> cm. Find the total area.`, [`Rectangle area = ${l * w}.`, `Triangle area = ${fmt(0.5 * l * h)}.`, `Total = <strong>${fmt(l * w + 0.5 * l * h)} cm^2</strong>.`]);
    if (t === 1) return q("Measurement", difficulty, cas, `A tank has volume <strong>${l * w * h * 1000} cm^3</strong>. <strong>${l * w * 500}</strong> cm^3 is removed. How many litres remain?`, [`Remaining volume = ${l * w * h * 1000 - l * w * 500} cm^3.`, `Divide by 1000.`, `Answer: <strong>${fmt((l * w * h * 1000 - l * w * 500) / 1000)} L</strong>.`]);
    if (t === 2) return q("Measurement", difficulty, cas, `A circular logo has radius <strong>${r}</strong> cm. A quarter is shaded. Find the shaded area to 1 decimal place.`, [`Quarter area = 1/4 * pi * r^2.`, `Area = 1/4 * pi * ${r}^2.`, `Answer: <strong>${fmt(0.25 * Math.PI * r * r)} cm^2</strong>.`]);
    return q("Measurement", difficulty, cas, `A path around a rectangular field adds <strong>${h}</strong> m to the length and width. Original field: <strong>${l}</strong> m by <strong>${w}</strong> m. Find the new area.`, [`New length = ${l + h}.`, `New width = ${w + h}.`, `New area = <strong>${(l + h) * (w + h)} m^2</strong>.`]);
  }
  if (t === 0) return q("Measurement", difficulty, cas, `A circular garden bed has radius <strong>${r}</strong> cm. A sector has angle <strong>${angle} degrees</strong>. <ol class="parts"><li>Write the sector-area formula.</li><li>Substitute values.</li><li>Find the area to 1 decimal place.</li></ol>`, [`Part a: sector area = angle/360 * pi * r^2.`, `Part b: ${angle}/360 * pi * ${r}^2.`, `Part c: <strong>${fmt((angle / 360) * Math.PI * r * r)} cm^2</strong>.`]);
  if (t === 1) return q("Measurement", difficulty, cas, `A fish tank is <strong>${l}</strong> cm by <strong>${w}</strong> cm by <strong>${h}</strong> cm. <ol class="parts"><li>Find volume in cm^3.</li><li>Convert to litres.</li><li>Find half capacity.</li></ol>`, [`Part a: ${l * w * h} cm^3.`, `Part b: ${fmt(l * w * h / 1000)} L.`, `Part c: <strong>${fmt(l * w * h / 2000)} L</strong>.`]);
  if (t === 2) return q("Measurement", difficulty, cas, `A courtyard is <strong>${l}</strong> m by <strong>${w}</strong> m with a circular fountain of radius <strong>${r}</strong> m removed. <ol class="parts"><li>Find rectangular area.</li><li>Find fountain area.</li><li>Find paved area.</li></ol>`, [`Part a: ${l * w} m^2.`, `Part b: ${fmt(Math.PI * r * r)} m^2.`, `Part c: <strong>${fmt(l * w - Math.PI * r * r)} m^2</strong>.`]);
  return q("Measurement", difficulty, cas, `A room is <strong>${l}</strong> m by <strong>${w}</strong> m. Carpet costs <strong>$${h + 10}</strong> per m^2. <ol class="parts"><li>Find area.</li><li>Find carpet cost.</li><li>Add a $${r * 5} delivery fee.</li></ol>`, [`Part a: ${l * w} m^2.`, `Part b: $${l * w * (h + 10)}.`, `Part c: <strong>$${l * w * (h + 10) + r * 5}</strong>.`]);
}

function probability(difficulty, cas, v) {
  const t = variant(v), red = v + 2, blue = v + 4, green = v + 5, total = red + blue + green;
  if (difficulty === "Surface") {
    if (t === 0) return q("Probability", difficulty, cas, `A bag has <strong>${red}</strong> red, <strong>${blue}</strong> blue, and <strong>${green}</strong> green counters. Find P(blue).`, [`Total = ${total}.`, `Blue counters = ${blue}.`, `Answer: <strong>${frac(blue, total)}</strong>.`]);
    if (t === 1) return q("Probability", difficulty, cas, `A spinner has <strong>${red}</strong> red sections and <strong>${blue}</strong> blue sections. Find P(red).`, [`Total sections = ${red + blue}.`, `Red sections = ${red}.`, `Answer: <strong>${frac(red, red + blue)}</strong>.`]);
    if (t === 2) return q("Probability", difficulty, cas, `A number from 1 to <strong>${total}</strong> is chosen. Find the probability of choosing one of the first <strong>${red}</strong> numbers.`, [`Favourable outcomes = ${red}.`, `Total outcomes = ${total}.`, `Answer: <strong>${frac(red, total)}</strong>.`]);
    return q("Probability", difficulty, cas, `A game has <strong>${red}</strong> winning cards and <strong>${blue}</strong> losing cards. Find the chance of a winning card.`, [`Total cards = ${red + blue}.`, `Winning cards = ${red}.`, `Answer: <strong>${frac(red, red + blue)}</strong>.`]);
  }
  if (difficulty === "Procedural") {
    if (t === 0) return q("Probability", difficulty, cas, `Using a bag with <strong>${red}</strong> red, <strong>${blue}</strong> blue, and <strong>${green}</strong> green counters, find P(not green).`, [`Not green means red or blue.`, `Favourable outcomes = ${red + blue}.`, `Answer: <strong>${frac(red + blue, total)}</strong>.`]);
    if (t === 1) return q("Probability", difficulty, cas, `A spinner has P(yellow) = <strong>${(0.1 * (v % 5 + 2)).toFixed(1)}</strong>. It is spun <strong>${100 + 20 * v}</strong> times. Estimate yellow results.`, [`Expected frequency = probability * trials.`, `${(0.1 * (v % 5 + 2)).toFixed(1)} * ${100 + 20 * v}.`, `Answer: <strong>${fmt((0.1 * (v % 5 + 2)) * (100 + 20 * v))}</strong>.`]);
    if (t === 2) return q("Probability", difficulty, cas, `A box has <strong>${red}</strong> striped and <strong>${blue}</strong> plain pencils. Find P(plain) and write it as a percentage to 1 decimal place.`, [`Probability = ${blue}/${red + blue}.`, `Percentage = (${blue}/${red + blue}) * 100.`, `Answer: <strong>${frac(blue, red + blue)} = ${fmt(100 * blue / (red + blue))}%</strong>.`]);
    return q("Probability", difficulty, cas, `A ticket is drawn from <strong>${total}</strong> tickets. <strong>${green}</strong> are prize tickets. Find P(no prize).`, [`No prize tickets = ${total - green}.`, `Probability = ${total - green}/${total}.`, `Answer: <strong>${frac(total - green, total)}</strong>.`]);
  }
  if (difficulty === "Reasoning") {
    const both = v + 2, a = v + 9, b = v + 8, classSize = v + 28;
    if (t === 0) return q("Probability", difficulty, cas, `In a class of <strong>${classSize}</strong>, <strong>${a}</strong> play basketball, <strong>${b}</strong> play tennis, and <strong>${both}</strong> play both. Find P(neither).`, [`At least one = ${a + b - both}.`, `Neither = ${classSize - (a + b - both)}.`, `Answer: <strong>${frac(classSize - (a + b - both), classSize)}</strong>.`]);
    if (t === 1) return q("Probability", difficulty, cas, `A survey has <strong>${classSize}</strong> students. <strong>${a}</strong> like maths, <strong>${b}</strong> like science, and <strong>${both}</strong> like both. Find how many like maths or science.`, [`Use inclusion-exclusion.`, `Maths or science = ${a} + ${b} - ${both}.`, `Answer: <strong>${a + b - both}</strong>.`]);
    if (t === 2) return q("Probability", difficulty, cas, `A game has P(win) = <strong>${frac(red, total)}</strong>. It is played <strong>${total * 5}</strong> times. Estimate wins.`, [`Expected wins = probability * trials.`, `${frac(red, total)} * ${total * 5}.`, `Answer: <strong>${red * 5}</strong>.`]);
    return q("Probability", difficulty, cas, `Two-way table totals show <strong>${a}</strong> students use bus, <strong>${b}</strong> use train, and <strong>${both}</strong> use both. How many use exactly one?`, [`Bus only = ${a - both}.`, `Train only = ${b - both}.`, `Exactly one = <strong>${a + b - 2 * both}</strong>.`]);
  }
  const both = v + 2, a = v + 9, b = v + 8, classSize = v + 28;
  if (t === 0) return q("Probability", difficulty, cas, `In a class of <strong>${classSize}</strong>, <strong>${a}</strong> play basketball, <strong>${b}</strong> play tennis, and <strong>${both}</strong> play both. <ol class="parts"><li>Find how many play at least one sport.</li><li>Find neither.</li><li>Find P(neither).</li></ol>`, [`Part a: ${a + b - both}.`, `Part b: ${classSize - (a + b - both)}.`, `Part c: <strong>${frac(classSize - (a + b - both), classSize)}</strong>.`]);
  if (t === 1) return q("Probability", difficulty, cas, `A spinner has <strong>${red}</strong> red, <strong>${blue}</strong> blue, and <strong>${green}</strong> green sections. It is spun <strong>${total * 6}</strong> times. <ol class="parts"><li>Find P(red).</li><li>Estimate red results.</li><li>Explain why the actual result may differ.</li></ol>`, [`Part a: ${frac(red, total)}.`, `Part b: <strong>${red * 6}</strong>.`, `Part c: real trials vary from expected frequency.`]);
  if (t === 2) return q("Probability", difficulty, cas, `A bag has <strong>${red}</strong> red and <strong>${blue}</strong> blue counters. One counter is chosen, replaced, then another is chosen. <ol class="parts"><li>Find P(red then red).</li><li>Find P(blue then red).</li><li>Find P(one of each).</li></ol>`, [`Part a: ${frac(red * red, (red + blue) ** 2)}.`, `Part b: ${frac(blue * red, (red + blue) ** 2)}.`, `Part c: <strong>${frac(2 * red * blue, (red + blue) ** 2)}</strong>.`]);
  const neither = v + 6, surveyTotal = a + b + neither;
  return q("Probability", difficulty, cas, `A school survey has <strong>${surveyTotal}</strong> students. <strong>${a}</strong> catch the bus, <strong>${b}</strong> walk, and no student does both. <ol class="parts"><li>Find neither.</li><li>Find P(bus or walk).</li><li>Find P(neither).</li></ol>`, [`Part a: ${surveyTotal} - ${a} - ${b} = ${neither}.`, `Part b: ${frac(a + b, surveyTotal)}.`, `Part c: <strong>${frac(neither, surveyTotal)}</strong>.`]);
}

function formula(difficulty, cas, v) {
  const t = variant(v), b = v + 4, h = v + 3, A = b * h / 2, d = (v + 8) * (v + 2), time = v + 2, speed = v + 8;
  if (difficulty === "Surface") {
    if (t === 0) return q("Formula rearranging", difficulty, cas, `Substitute <strong>b = ${b}</strong> and <strong>h = ${h}</strong> into <strong>A = bh/2</strong>.`, [`A = ${b} * ${h} / 2.`, `A = ${fmt(A)}.`, `Answer: <strong>${fmt(A)}</strong>.`]);
    if (t === 1) return q("Formula rearranging", difficulty, cas, `A trip uses <strong>d = st</strong>. If s = <strong>${speed}</strong> and t = <strong>${time}</strong>, find d.`, [`Substitute into d = st.`, `d = ${speed} * ${time}.`, `Answer: <strong>${d}</strong>.`]);
    if (t === 2) return q("Formula rearranging", difficulty, cas, `A circle has <strong>C = 2pi r</strong>. Find C when r = <strong>${b}</strong>, in terms of pi.`, [`C = 2 * pi * ${b}.`, `Answer: <strong>${2 * b}pi</strong>.`, `Leave pi exact.`]);
    return q("Formula rearranging", difficulty, cas, `A triangle sign has base <strong>${b}</strong> m and height <strong>${h}</strong> m. Use <strong>A = bh/2</strong> to find its area.`, [`A = ${b} * ${h} / 2.`, `Answer: <strong>${fmt(A)} m^2</strong>.`, `Use square metres for area.`]);
  }
  if (difficulty === "Procedural") {
    if (t === 0) return q("Formula rearranging", difficulty, cas, `Make <strong>h</strong> the subject of <strong>A = bh/2</strong>.`, [`Multiply both sides by 2: 2A = bh.`, `Divide by b.`, `Answer: <strong>h = 2A/b</strong>.`]);
    if (t === 1) return q("Formula rearranging", difficulty, cas, `Make <strong>s</strong> the subject of <strong>d = st</strong>.`, [`Divide both sides by t.`, `Answer: <strong>s = d/t</strong>.`, `This isolates s.`]);
    if (t === 2) return q("Formula rearranging", difficulty, cas, `Make <strong>r</strong> the subject of <strong>C = 2pi r</strong>.`, [`Divide both sides by 2pi.`, `Answer: <strong>r = C/(2pi)</strong>.`, `The radius is isolated.`]);
    return q("Formula rearranging", difficulty, cas, `Make <strong>w</strong> the subject of <strong>P = 2l + 2w</strong>.`, [`Subtract 2l: P - 2l = 2w.`, `Divide by 2.`, `Answer: <strong>w = (P - 2l)/2</strong>.`]);
  }
  if (difficulty === "Reasoning") {
    if (t === 0) return q("Formula rearranging", difficulty, cas, `A triangle has area <strong>${A}</strong> cm^2 and base <strong>${b}</strong> cm. Use <strong>A = bh/2</strong> to find h.`, [`Rearrange: h = 2A/b.`, `h = 2 * ${A} / ${b}.`, `Answer: <strong>${h} cm</strong>.`]);
    if (t === 1) return q("Formula rearranging", difficulty, cas, `A trip has distance <strong>${d}</strong> km and time <strong>${time}</strong> h. Use <strong>d = st</strong> to find speed.`, [`s = d/t.`, `s = ${d}/${time}.`, `Answer: <strong>${speed} km/h</strong>.`]);
    if (t === 2) return q("Formula rearranging", difficulty, cas, `A rectangle has perimeter <strong>${2 * (b + h)}</strong> cm and length <strong>${b}</strong> cm. Use <strong>P = 2l + 2w</strong> to find w.`, [`w = (P - 2l)/2.`, `w = (${2 * (b + h)} - 2(${b})) / 2.`, `Answer: <strong>${h} cm</strong>.`]);
    return q("Formula rearranging", difficulty, cas, `A circle has circumference <strong>${2 * b}pi</strong> cm. Use <strong>C = 2pi r</strong> to find r.`, [`r = C/(2pi).`, `r = ${2 * b}pi/(2pi).`, `Answer: <strong>${b} cm</strong>.`]);
  }
  if (t === 0) return q("Formula rearranging", difficulty, cas, `A trip uses <strong>d = st</strong>. The distance is <strong>${d}</strong> km and time is <strong>${time}</strong> h. <ol class="parts"><li>Make s the subject.</li><li>Substitute values.</li><li>State speed with units.</li></ol>`, [`Part a: s = d/t.`, `Part b: s = ${d}/${time}.`, `Part c: <strong>${speed} km/h</strong>.`]);
  if (t === 1) return q("Formula rearranging", difficulty, cas, `A triangular sail has area <strong>${A}</strong> m^2 and base <strong>${b}</strong> m. <ol class="parts"><li>Make h the subject.</li><li>Find h.</li><li>Check by substituting.</li></ol>`, [`Part a: h = 2A/b.`, `Part b: h = <strong>${h} m</strong>.`, `Part c: ${b} * ${h} / 2 = ${fmt(A)}.`]);
  if (t === 2) return q("Formula rearranging", difficulty, cas, `A rectangle has perimeter <strong>${2 * (b + h)}</strong> cm and length <strong>${b}</strong> cm. <ol class="parts"><li>Make w the subject.</li><li>Find w.</li><li>Find area.</li></ol>`, [`Part a: w = (P - 2l)/2.`, `Part b: w = <strong>${h} cm</strong>.`, `Part c: area = <strong>${b * h} cm^2</strong>.`]);
  return q("Formula rearranging", difficulty, cas, `A circular sign has circumference <strong>${2 * b}pi</strong> cm. <ol class="parts"><li>Make r the subject.</li><li>Find r.</li><li>Find diameter.</li></ol>`, [`Part a: r = C/(2pi).`, `Part b: r = <strong>${b} cm</strong>.`, `Part c: diameter = <strong>${2 * b} cm</strong>.`]);
}

const generators = { "Algebra fluency": algebra, "Equations and systems": equations, Quadratics: quadratics, "Linear graphs": graphs, Measurement: measurement, Probability: probability, "Formula rearranging": formula };

function buildBank() {
  const bank = [];
  topics.forEach((topic, topicIndex) => difficulties.forEach((difficulty, difficultyIndex) => {
    for (let v = 1; v <= 4; v += 1) {
      const cas = casModes[(v + topicIndex + difficultyIndex) % casModes.length];
      const seed = v + ((topicIndex + difficultyIndex) % 3) * 4;
      bank.push(generators[topic](difficulty, cas, seed));
    }
  }));
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
