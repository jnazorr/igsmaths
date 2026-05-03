const drills = [
  {
    mode: "no-cas",
    topic: "Circular functions",
    prompt: "Find exact values for <math><mi>sin</mi><mo stretchy='false'>(</mo><mfrac><mrow><mn>7</mn><mi>&pi;</mi></mrow><mn>6</mn></mfrac><mo stretchy='false'>)</mo></math>, <math><mi>cos</mi><mo stretchy='false'>(</mo><mfrac><mrow><mn>5</mn><mi>&pi;</mi></mrow><mn>3</mn></mfrac><mo stretchy='false'>)</mo></math>, and <math><mi>tan</mi><mo stretchy='false'>(</mo><mfrac><mrow><mn>3</mn><mi>&pi;</mi></mrow><mn>4</mn></mfrac><mo stretchy='false'>)</mo></math>, then explain the quadrant sign for each."
  },
  {
    mode: "no-cas",
    topic: "Domain and range",
    prompt: "For <math><mi>f</mi><mo stretchy='false'>(</mo><mi>x</mi><mo stretchy='false'>)</mo><mo>=</mo><msqrt><mrow><mn>6</mn><mo>-</mo><mn>2</mn><mi>x</mi></mrow></msqrt></math>, state the maximal domain and range, then write the function in full notation."
  },
  {
    mode: "no-cas",
    topic: "Inverse functions",
    prompt: "Find the inverse of <math><mi>g</mi><mo>:</mo><mo>[</mo><mn>1</mn><mo>,</mo><mi>&infin;</mi><mo stretchy='false'>)</mo><mo>&rarr;</mo><mi>R</mi></math>, <math><mi>g</mi><mo stretchy='false'>(</mo><mi>x</mi><mo stretchy='false'>)</mo><mo>=</mo><msup><mrow><mo stretchy='false'>(</mo><mi>x</mi><mo>-</mo><mn>1</mn><mo stretchy='false'>)</mo></mrow><mn>2</mn></msup><mo>+</mo><mn>4</mn></math>. State the domain and range of <math><msup><mi>g</mi><mrow><mo>-</mo><mn>1</mn></mrow></msup></math>."
  },
  {
    mode: "no-cas",
    topic: "Quadratics",
    prompt: "A quadratic has vertex <math><mo stretchy='false'>(</mo><mn>3</mn><mo>,</mo><mo>-</mo><mn>5</mn><mo stretchy='false'>)</mo></math> and passes through <math><mo stretchy='false'>(</mo><mn>5</mn><mo>,</mo><mn>7</mn><mo stretchy='false'>)</mo></math>. Find its rule in vertex form and state its minimum value."
  },
  {
    mode: "no-cas",
    topic: "Discriminant",
    prompt: "For <math><msup><mi>x</mi><mn>2</mn></msup><mo>+</mo><mo stretchy='false'>(</mo><mi>m</mi><mo>-</mo><mn>2</mn><mo stretchy='false'>)</mo><mi>x</mi><mo>+</mo><mi>m</mi><mo>=</mo><mn>0</mn></math>, find the values of <math><mi>m</mi></math> for which there are two distinct real solutions."
  },
  {
    mode: "cas",
    topic: "Transformations",
    prompt: "Use graphing technology to compare <math><mi>y</mi><mo>=</mo><msqrt><mi>x</mi></msqrt></math> with <math><mi>y</mi><mo>=</mo><mo>-</mo><mn>2</mn><msqrt><mrow><mi>x</mi><mo>-</mo><mn>3</mn></mrow></msqrt><mo>+</mo><mn>1</mn></math>. Record the transformations and new domain/range."
  },
  {
    mode: "cas",
    topic: "Piecewise functions",
    prompt: "Create a three-piece function using one linear, one quadratic, and one circular section over adjacent intervals. Check that no intervals overlap."
  },
  {
    mode: "cas",
    topic: "Optimisation",
    prompt: "A rectangle has perimeter <math><mn>48</mn><mtext> cm</mtext></math>. Let <math><mi>x</mi></math> be one side length. Write area as a function of <math><mi>x</mi></math>, state the domain, and find the maximum area."
  },
  {
    mode: "cas",
    topic: "Probability",
    prompt: "A game has three independent rounds, each with success probability <math><mn>0.3</mn></math>. Build a tree or table and find the probability of at least two successes."
  },
  {
    mode: "all",
    topic: "Coordinate geometry",
    prompt: "Find the distance, midpoint, and equation of the line through <math><mi>A</mi><mo stretchy='false'>(</mo><mo>-</mo><mn>2</mn><mo>,</mo><mn>5</mn><mo stretchy='false'>)</mo></math> and <math><mi>B</mi><mo stretchy='false'>(</mo><mn>4</mn><mo>,</mo><mo>-</mo><mn>1</mn><mo stretchy='false'>)</mo></math>."
  }
];

const list = document.querySelector("#drillList");
const solutionList = document.querySelector("#solutionList");
const buttons = document.querySelectorAll("[data-filter]");

const solutions = [
  {
    topic: "Circular functions",
    answer: `
      <ol>
        <li><math><mfrac><mrow><mn>7</mn><mi>&pi;</mi></mrow><mn>6</mn></mfrac></math> is in quadrant III with reference angle <math><mfrac><mi>&pi;</mi><mn>6</mn></mfrac></math>, so <math><mi>sin</mi><mo stretchy="false">(</mo><mfrac><mrow><mn>7</mn><mi>&pi;</mi></mrow><mn>6</mn></mfrac><mo stretchy="false">)</mo><mo>=</mo><mo>-</mo><mfrac><mn>1</mn><mn>2</mn></mfrac></math>.</li>
        <li><math><mfrac><mrow><mn>5</mn><mi>&pi;</mi></mrow><mn>3</mn></mfrac></math> is in quadrant IV, so <math><mi>cos</mi><mo stretchy="false">(</mo><mfrac><mrow><mn>5</mn><mi>&pi;</mi></mrow><mn>3</mn></mfrac><mo stretchy="false">)</mo><mo>=</mo><mfrac><mn>1</mn><mn>2</mn></mfrac></math>.</li>
        <li><math><mfrac><mrow><mn>3</mn><mi>&pi;</mi></mrow><mn>4</mn></mfrac></math> is in quadrant II, so <math><mi>tan</mi><mo stretchy="false">(</mo><mfrac><mrow><mn>3</mn><mi>&pi;</mi></mrow><mn>4</mn></mfrac><mo stretchy="false">)</mo><mo>=</mo><mo>-</mo><mn>1</mn></math>.</li>
      </ol>`
  },
  {
    topic: "Domain and range",
    answer: `
      <ol>
        <li>Require <math><mn>6</mn><mo>-</mo><mn>2</mn><mi>x</mi><mo>&ge;</mo><mn>0</mn></math>, so <math><mi>x</mi><mo>&le;</mo><mn>3</mn></math>.</li>
        <li>Domain: <math><mo stretchy="false">(</mo><mo>-</mo><mi>&infin;</mi><mo>,</mo><mn>3</mn><mo>]</mo></math>. Range: <math><mo>[</mo><mn>0</mn><mo>,</mo><mi>&infin;</mi><mo stretchy="false">)</mo></math>.</li>
        <li>Full notation: <math><mi>f</mi><mo>:</mo><mo stretchy="false">(</mo><mo>-</mo><mi>&infin;</mi><mo>,</mo><mn>3</mn><mo>]</mo><mo>&rarr;</mo><mi>R</mi></math>, <math><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo><mo>=</mo><msqrt><mrow><mn>6</mn><mo>-</mo><mn>2</mn><mi>x</mi></mrow></msqrt></math>.</li>
      </ol>`
  },
  {
    topic: "Inverse functions",
    answer: `
      <ol>
        <li>Let <math><mi>y</mi><mo>=</mo><msup><mrow><mo stretchy="false">(</mo><mi>x</mi><mo>-</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><mn>2</mn></msup><mo>+</mo><mn>4</mn></math>, with <math><mi>x</mi><mo>&ge;</mo><mn>1</mn></math>.</li>
        <li><math><mi>y</mi><mo>-</mo><mn>4</mn><mo>=</mo><msup><mrow><mo stretchy="false">(</mo><mi>x</mi><mo>-</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><mn>2</mn></msup></math>, so <math><mi>x</mi><mo>=</mo><mn>1</mn><mo>+</mo><msqrt><mrow><mi>y</mi><mo>-</mo><mn>4</mn></mrow></msqrt></math>.</li>
        <li><math><msup><mi>g</mi><mrow><mo>-</mo><mn>1</mn></mrow></msup><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo><mo>=</mo><mn>1</mn><mo>+</mo><msqrt><mrow><mi>x</mi><mo>-</mo><mn>4</mn></mrow></msqrt></math>. Domain: <math><mo>[</mo><mn>4</mn><mo>,</mo><mi>&infin;</mi><mo stretchy="false">)</mo></math>. Range: <math><mo>[</mo><mn>1</mn><mo>,</mo><mi>&infin;</mi><mo stretchy="false">)</mo></math>.</li>
      </ol>`
  },
  {
    topic: "Quadratics",
    answer: `
      <ol>
        <li>Use <math><mi>y</mi><mo>=</mo><mi>a</mi><msup><mrow><mo stretchy="false">(</mo><mi>x</mi><mo>-</mo><mn>3</mn><mo stretchy="false">)</mo></mrow><mn>2</mn></msup><mo>-</mo><mn>5</mn></math>.</li>
        <li>Substitute <math><mo stretchy="false">(</mo><mn>5</mn><mo>,</mo><mn>7</mn><mo stretchy="false">)</mo></math>: <math><mn>7</mn><mo>=</mo><mn>4</mn><mi>a</mi><mo>-</mo><mn>5</mn></math>, so <math><mi>a</mi><mo>=</mo><mn>3</mn></math>.</li>
        <li>Rule: <math><mi>y</mi><mo>=</mo><mn>3</mn><msup><mrow><mo stretchy="false">(</mo><mi>x</mi><mo>-</mo><mn>3</mn><mo stretchy="false">)</mo></mrow><mn>2</mn></msup><mo>-</mo><mn>5</mn></math>. Minimum value: <math><mo>-</mo><mn>5</mn></math>.</li>
      </ol>`
  },
  {
    topic: "Discriminant",
    answer: `
      <ol>
        <li><math><mi>&Delta;</mi><mo>=</mo><msup><mrow><mo stretchy="false">(</mo><mi>m</mi><mo>-</mo><mn>2</mn><mo stretchy="false">)</mo></mrow><mn>2</mn></msup><mo>-</mo><mn>4</mn><mi>m</mi><mo>=</mo><msup><mi>m</mi><mn>2</mn></msup><mo>-</mo><mn>8</mn><mi>m</mi><mo>+</mo><mn>4</mn></math>.</li>
        <li>Two distinct real solutions require <math><mi>&Delta;</mi><mo>&gt;</mo><mn>0</mn></math>.</li>
        <li>The boundary values are <math><mi>m</mi><mo>=</mo><mn>4</mn><mo>&plusmn;</mo><mn>2</mn><msqrt><mn>3</mn></msqrt></math>, so <math><mi>m</mi><mo>&lt;</mo><mn>4</mn><mo>-</mo><mn>2</mn><msqrt><mn>3</mn></msqrt></math> or <math><mi>m</mi><mo>&gt;</mo><mn>4</mn><mo>+</mo><mn>2</mn><msqrt><mn>3</mn></msqrt></math>.</li>
      </ol>`
  },
  {
    topic: "Transformations",
    answer: `
      <ol>
        <li><math><mi>x</mi><mo>-</mo><mn>3</mn></math> shifts the square-root graph 3 units right.</li>
        <li><math><mo>-</mo><mn>2</mn></math> reflects it in the x-axis and dilates it from the x-axis by factor 2.</li>
        <li><math><mo>+</mo><mn>1</mn></math> shifts it 1 unit up.</li>
        <li>Domain: <math><mo>[</mo><mn>3</mn><mo>,</mo><mi>&infin;</mi><mo stretchy="false">)</mo></math>. Range: <math><mo stretchy="false">(</mo><mo>-</mo><mi>&infin;</mi><mo>,</mo><mn>1</mn><mo>]</mo></math>.</li>
      </ol>`
  },
  {
    topic: "Piecewise functions",
    answer: `
      <ol>
        <li>One valid example is: linear on <math><mo>[</mo><mo>-</mo><mn>4</mn><mo>,</mo><mo>-</mo><mn>1</mn><mo stretchy="false">)</mo></math>, quadratic on <math><mo>[</mo><mo>-</mo><mn>1</mn><mo>,</mo><mn>2</mn><mo stretchy="false">)</mo></math>, and circular on <math><mo>[</mo><mn>2</mn><mo>,</mo><mn>5</mn><mo>]</mo></math>.</li>
        <li>For example, use <math><mi>x</mi><mo>+</mo><mn>2</mn></math>, then <math><msup><mi>x</mi><mn>2</mn></msup></math>, then <math><mi>sin</mi><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo></math> over those intervals.</li>
        <li>The main check is that shared endpoints are included in only one piece.</li>
      </ol>`
  },
  {
    topic: "Optimisation",
    answer: `
      <ol>
        <li>From <math><mn>2</mn><mi>x</mi><mo>+</mo><mn>2</mn><mi>y</mi><mo>=</mo><mn>48</mn></math>, get <math><mi>y</mi><mo>=</mo><mn>24</mn><mo>-</mo><mi>x</mi></math>.</li>
        <li><math><mi>A</mi><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo><mo>=</mo><mi>x</mi><mo stretchy="false">(</mo><mn>24</mn><mo>-</mo><mi>x</mi><mo stretchy="false">)</mo><mo>=</mo><mo>-</mo><msup><mi>x</mi><mn>2</mn></msup><mo>+</mo><mn>24</mn><mi>x</mi></math>.</li>
        <li>The vertex is at <math><mi>x</mi><mo>=</mo><mn>12</mn></math>, giving <math><mi>y</mi><mo>=</mo><mn>12</mn></math> and maximum area <math><mn>144</mn><msup><mtext> cm</mtext><mn>2</mn></msup></math>.</li>
      </ol>`
  },
  {
    topic: "Probability",
    answer: `
      <ol>
        <li>At least two successes means exactly two or exactly three successes.</li>
        <li><math><mi>Pr</mi><mo stretchy="false">(</mo><mtext>exactly two</mtext><mo stretchy="false">)</mo><mo>=</mo><mn>3</mn><msup><mrow><mo stretchy="false">(</mo><mn>0.3</mn><mo stretchy="false">)</mo></mrow><mn>2</mn></msup><mo stretchy="false">(</mo><mn>0.7</mn><mo stretchy="false">)</mo><mo>=</mo><mn>0.189</mn></math>.</li>
        <li><math><mi>Pr</mi><mo stretchy="false">(</mo><mtext>exactly three</mtext><mo stretchy="false">)</mo><mo>=</mo><msup><mrow><mo stretchy="false">(</mo><mn>0.3</mn><mo stretchy="false">)</mo></mrow><mn>3</mn></msup><mo>=</mo><mn>0.027</mn></math>.</li>
        <li>Total: <math><mn>0.189</mn><mo>+</mo><mn>0.027</mn><mo>=</mo><mn>0.216</mn></math>.</li>
      </ol>`
  },
  {
    topic: "Coordinate geometry",
    answer: `
      <ol>
        <li>Distance: <math><msqrt><mrow><msup><mn>6</mn><mn>2</mn></msup><mo>+</mo><msup><mrow><mo>-</mo><mn>6</mn></mrow><mn>2</mn></msup></mrow></msqrt><mo>=</mo><msqrt><mn>72</mn></msqrt><mo>=</mo><mn>6</mn><msqrt><mn>2</mn></msqrt></math>.</li>
        <li>Midpoint: <math><mo stretchy="false">(</mo><mn>1</mn><mo>,</mo><mn>2</mn><mo stretchy="false">)</mo></math>.</li>
        <li>Gradient: <math><mi>m</mi><mo>=</mo><mo>-</mo><mn>1</mn></math>. Line: <math><mi>y</mi><mo>=</mo><mo>-</mo><mi>x</mi><mo>+</mo><mn>3</mn></math>.</li>
      </ol>`
  }
];

function renderDrills(filter = "all") {
  const visible = drills.filter((drill) => filter === "all" || drill.mode === filter || drill.mode === "all");
  list.innerHTML = visible.map((drill) => `
    <article class="drill">
      <strong>${drill.topic}</strong>
      <p>${drill.prompt}</p>
    </article>
  `).join("");
}

function renderSolutions() {
  if (!solutionList) return;
  solutionList.innerHTML = solutions.map((solution) => `
    <details class="solution-card">
      <summary>${solution.topic}</summary>
      ${solution.answer}
    </details>
  `).join("");
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderDrills(button.dataset.filter);
  });
});

buttons[0].classList.add("active");
renderDrills();
renderSolutions();
