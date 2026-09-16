export type VisualType =
  | "mapping"
  | "domain"
  | "piecewise"
  | "terrain"
  | "symmetry"
  | "transform"
  | "operations"
  | "inverse"
  | "quadratic";

export type Challenge = {
  type: "mc" | "fill";
  question: string;
  mathLines?: string[];
  piecewise?: { label: string; cases: { expression: string; condition: string }[] };
  options?: string[];
  correctIndex?: number;
  answer?: string;
  accepted?: string[];
  explanation: string;
  hint: string;
  visual?: VisualType;
};

export type Activity = {
  id: string;
  order: number;
  title: string;
  shortTitle: string;
  subtitle: string;
  description: string;
  icon: string;
  badgeId: string;
  color: string;
  category: "Foundation" | "Graph Lab" | "Function Forge" | "Final";
  artwork?: string;
};

const ASSET_BASE = `${import.meta.env.BASE_URL}assets/`;

export const ART = {
  orbit: `${ASSET_BASE}orbit-functions.png`,
  transforms: `${ASSET_BASE}transformations.png`,
  inverse: `${ASSET_BASE}inverse-portal.png`,
  quadratic: `${ASSET_BASE}quadratic-peak.png`,
};

export const ACTIVITIES: Activity[] = [
  {
    id: "function-scout",
    order: 1,
    title: "Function Scout",
    shortTitle: "Definitions",
    subtitle: "Definition & identification",
    description: "Use input-output rules and the vertical line test to identify functions with confidence.",
    icon: "◌",
    badgeId: "scout-badge",
    color: "cyan",
    category: "Foundation",
    artwork: ART.orbit,
  },
  {
    id: "representation-relay",
    order: 2,
    title: "Representation Relay",
    shortTitle: "Representations",
    subtitle: "Tables, mappings, graphs & notation",
    description: "Translate among tables, equations, mapping diagrams, and function notation.",
    icon: "⌁",
    badgeId: "relay-badge",
    color: "violet",
    category: "Foundation",
  },
  {
    id: "interval-observatory",
    order: 3,
    title: "Interval Observatory",
    shortTitle: "Domain & range",
    subtitle: "Interval notation precision",
    description: "Read permitted inputs and possible outputs, then report them in precise interval notation.",
    icon: "⌗",
    badgeId: "interval-badge",
    color: "amber",
    category: "Foundation",
  },
  {
    id: "piecewise-dispatch",
    order: 4,
    title: "Piecewise Dispatch",
    shortTitle: "Piecewise",
    subtitle: "Rules that switch",
    description: "Select the active rule, evaluate endpoints, and interpret open and closed graph points.",
    icon: "⟐",
    badgeId: "dispatch-badge",
    color: "coral",
    category: "Graph Lab",
  },
  {
    id: "terrain-analyzer",
    order: 5,
    title: "Terrain Analyzer",
    shortTitle: "Graph behavior",
    subtitle: "Extrema & monotonicity",
    description: "Map absolute and local extrema, plus intervals of increase, decrease, and constancy.",
    icon: "⌇",
    badgeId: "terrain-badge",
    color: "mint",
    category: "Graph Lab",
  },
  {
    id: "symmetry-scanner",
    order: 6,
    title: "Symmetry Scanner",
    shortTitle: "Even, odd, neither",
    subtitle: "Algebraic & graphical symmetry",
    description: "Scan function rules and graphs for y-axis symmetry, origin symmetry, or neither.",
    icon: "◇",
    badgeId: "symmetry-badge",
    color: "violet",
    category: "Graph Lab",
  },
  {
    id: "rate-of-change-lab",
    order: 7,
    title: "Rate-of-Change Lab",
    shortTitle: "Difference quotient",
    subtitle: "Algebraic average rate of change",
    description: "Build and simplify the difference quotient without losing the essential h.",
    icon: "Δ",
    badgeId: "quotient-badge",
    color: "amber",
    category: "Function Forge",
  },
  {
    id: "transformation-bay",
    order: 8,
    title: "Transformation Bay",
    shortTitle: "Transformations",
    subtitle: "Especially the x inside",
    description: "Navigate translations, reflections, and stretches—with special attention to inside-x effects.",
    icon: "↔",
    badgeId: "transform-badge",
    color: "cyan",
    category: "Function Forge",
    artwork: ART.transforms,
  },
  {
    id: "operation-forge",
    order: 9,
    title: "Operation Forge",
    shortTitle: "Function operations",
    subtitle: "Add, subtract, multiply & divide",
    description: "Build new functions from f and g, then protect their domains from hidden restrictions.",
    icon: "⊕",
    badgeId: "operation-badge",
    color: "coral",
    category: "Function Forge",
  },
  {
    id: "composition-dock",
    order: 10,
    title: "Composition Dock",
    shortTitle: "Composition",
    subtitle: "Building functions from functions",
    description: "Connect functions in order and determine the domain of the resulting composite.",
    icon: "∘",
    badgeId: "composition-badge",
    color: "mint",
    category: "Function Forge",
  },
  {
    id: "inverse-portal",
    order: 11,
    title: "Inverse Portal",
    shortTitle: "Inverses",
    subtitle: "Algebra, graphs & domain-range swaps",
    description: "Reverse a function algebraically and read its mirror relationship across y = x.",
    icon: "⇄",
    badgeId: "inverse-badge",
    color: "violet",
    category: "Function Forge",
    artwork: ART.inverse,
  },
  {
    id: "quadratic-skyline",
    order: 12,
    title: "Quadratic Skyline",
    shortTitle: "Quadratics",
    subtitle: "Forms, features & graphs",
    description: "Launch parabolas from either form and locate every critical feature of the graph.",
    icon: "∩",
    badgeId: "quadratic-badge",
    color: "amber",
    category: "Graph Lab",
    artwork: ART.quadratic,
  },
];

export const BOSS: Activity = {
  id: "frontier-final",
  order: 13,
  title: "The Function Frontier Final",
  shortTitle: "Boss Battle",
  subtitle: "20-question mixed review",
  description: "A timed mixed review across the entire frontier. Score 80% or more to earn the Pathfinder badge.",
  icon: "✦",
  badgeId: "pathfinder-badge",
  color: "amber",
  category: "Final",
};

const C = (challenge: Challenge) => challenge;

export const CHALLENGES: Record<string, Challenge[]> = {
  "function-scout": [
    C({ type: "mc", question: "Which relation is a function?", options: ["{(1, 2), (1, 5), (3, 7)}", "{(-2, 4), (0, 4), (2, 9)}", "{(0, 1), (0, 2), (0, 3)}", "{(5, 1), (5, 1), (5, 2)}"], correctIndex: 1, explanation: "A function assigns each input exactly one output. In the second relation, every first coordinate occurs once.", hint: "Inspect first coordinates: no input may point to two different outputs.", visual: "mapping" }),
    C({ type: "fill", question: "Complete the definition: A function assigns each input exactly ___ output.", answer: "one", accepted: ["1", "a single", "exactly one"], explanation: "The defining rule is one output for each input. Different inputs may share an output.", hint: "The word rules out two outputs from a single input." }),
    C({ type: "mc", question: "A vertical line intersects a graph at two points. What can you conclude?", options: ["The graph is even", "The graph is not a function of x", "The graph is a one-to-one function", "The graph has a maximum"], correctIndex: 1, explanation: "Two intersections mean one x-value has two y-values, so the graph fails the vertical line test.", hint: "The vertical line test checks whether x determines a unique y." }),
    C({ type: "mc", question: "Which mapping represents a function?", options: ["2 → A and 2 → B", "1 → C, 2 → C, 3 → A", "4 → D and 4 → E", "5 → B, 5 → C, 6 → A"], correctIndex: 1, explanation: "Several inputs may map to the same output. The only prohibited case is a single input mapping to multiple outputs.", hint: "Many-to-one is allowed; one-to-many is not." , visual: "mapping"}),
    C({ type: "mc", question: "Does the equation x = y² define y as a function of x?", options: ["Yes, because every y has one x", "Yes, because it is a curve", "No, because x = 4 gives y = 2 and y = −2", "No, because it has no intercepts"], correctIndex: 2, explanation: "When x = 4, both 2 and −2 satisfy y² = 4. One input x produces two outputs y.", hint: "Try a positive x and solve for y." }),
    C({ type: "fill", question: "If f(x) = x² + 1, find f(−3).", answer: "10", accepted: ["10"], explanation: "f(−3) = (−3)² + 1 = 9 + 1 = 10.", hint: "Parentheses keep the negative number together before squaring." }),
    C({ type: "mc", question: "Which statement must be true for every function?", options: ["Each output has one input", "Each input has exactly one output", "Each function is one-to-one", "Each function passes the horizontal line test"], correctIndex: 1, explanation: "A function requires exactly one output per input. Outputs are allowed to repeat.", hint: "Do not confuse the vertical line test with the horizontal line test." }),
    C({ type: "mc", question: "The relation {(−1, 3), (0, 3), (1, 3)} is a function because…", options: ["all outputs are different", "all inputs are different", "the output is zero", "the relation has three pairs"], correctIndex: 1, explanation: "Each input appears only once, so each input is paired with one output. Repeated output 3 is allowed.", hint: "Check the x-values, not whether y-values repeat." }),
  ],
  "representation-relay": [
    C({ type: "fill", question: "For f(x) = 2x − 5, find f(4).", answer: "3", accepted: ["3"], explanation: "Substitute 4: f(4) = 2(4) − 5 = 3.", hint: "Function notation means substitute the input for x." }),
    C({ type: "mc", question: "A table gives x: −1, 0, 2 and f(x): 4, 1, −3. Which ordered pair is represented?", options: ["(4, −1)", "(2, −3)", "(1, 0)", "(−3, 2)"], correctIndex: 1, explanation: "The row x = 2 corresponds to f(x) = −3, so the point is (2, −3).", hint: "An ordered pair is (input, output)." }),
    C({ type: "fill", question: "If g(t) = t² − 4t, find g(5).", answer: "5", accepted: ["5"], explanation: "g(5) = 5² − 4(5) = 25 − 20 = 5.", hint: "The input variable can be any letter, not just x." }),
    C({ type: "mc", question: "If h(−2) = 7, which statement is equivalent?", options: ["(7, −2) lies on h", "(−2, 7) lies on h", "h(7) = −2", "h has slope 7"], correctIndex: 1, explanation: "h(−2) = 7 says input −2 produces output 7, so (−2, 7) is on the graph.", hint: "Read h(input) = output." }),
    C({ type: "mc", question: "Which equation matches the table x: 0, 1, 2 and y: 1, 3, 5?", options: ["y = 2x + 1", "y = x² + 1", "y = 3x", "y = x + 2"], correctIndex: 0, explanation: "The output rises by 2 for every 1 increase in x, with y-intercept 1: y = 2x + 1.", hint: "Use the rate of change and the value when x = 0." }),
    C({ type: "fill", question: "For p(x) = x² + 3x, find p(a).", answer: "a^2+3a", accepted: ["a²+3a", "a^2 + 3a"], explanation: "Replace x with a everywhere: p(a) = a² + 3a.", hint: "Every x is replaced by the entire input a." }),
    C({ type: "mc", question: "If f(3) = −1, what is the y-coordinate of the point on f with x-coordinate 3?", options: ["3", "−1", "2", "4"], correctIndex: 1, explanation: "The output is the y-coordinate. Here f(3) = −1.", hint: "Input is x; output is y." }),
    C({ type: "mc", question: "Which is a valid way to represent a function?", options: ["An equation only", "A graph only", "A table only", "An equation, graph, table, or mapping"], correctIndex: 3, explanation: "Functions can be represented by rules, tables, mapping diagrams, graphs, and verbal descriptions.", hint: "A function is an input-output relationship, not a single format." }),
  ],
  "interval-observatory": [
    C({ type: "fill", question: "Find the domain of f(x) = √(5 − x). Use interval notation.", answer: "(-infinity,5]", accepted: ["(−∞,5]", "(-∞,5]", "x<=5", "x≤5"], explanation: "The radicand must be nonnegative: 5 − x ≥ 0, so x ≤ 5. Domain: (−∞, 5].", hint: "A real square root cannot have a negative radicand.", visual: "domain" }),
    C({ type: "fill", question: "Find the domain of g(x) = 1/(x − 2). Use interval notation.", answer: "(-infinity,2)U(2,infinity)", accepted: ["(−∞,2)∪(2,∞)", "(-∞,2)∪(2,∞)", "x≠2", "x!=2"], explanation: "The denominator cannot be zero, so x ≠ 2. Domain: (−∞, 2) ∪ (2, ∞).", hint: "Locate the value that makes the denominator zero." }),
    C({ type: "fill", question: "Find the range of y = (x − 1)² − 4. Use interval notation.", answer: "[-4,infinity)", accepted: ["[−4,∞)", "[-4,∞)", "y>=-4", "y≥-4"], explanation: "The squared expression is at least 0, so the smallest output is −4. Range: [−4, ∞).", hint: "A parabola opening upward has a lowest y-value at its vertex.", visual: "quadratic" }),
    C({ type: "mc", question: "Which interval means x is greater than −2 and no larger than 6?", options: ["[−2, 6)", "(−2, 6]", "(−2, 6)", "[−2, 6]"], correctIndex: 1, explanation: "Greater than −2 excludes −2, and no larger than 6 includes 6: (−2, 6].", hint: "Use parentheses for excluded endpoints and brackets for included endpoints." }),
    C({ type: "fill", question: "Find the range of r(x) = √(x + 2). Use interval notation.", answer: "[0,infinity)", accepted: ["[0,∞)", "[0,infinity)", "y>=0", "y≥0"], explanation: "A principal square root is never negative, and 0 is reached when x = −2. Range: [0, ∞).", hint: "Think about the possible outputs of a square root." }),
    C({ type: "mc", question: "The domain of a graph is the set of…", options: ["possible y-values", "x-values that appear on the graph", "points where y = 0", "slopes of the graph"], correctIndex: 1, explanation: "Domain records all permitted input x-values; range records output y-values.", hint: "Domain = inputs." }),
    C({ type: "fill", question: "Find the domain of q(x) = √(x + 3). Use interval notation.", answer: "[-3,infinity)", accepted: ["[−3,∞)", "[-3,∞)", "x>=-3", "x≥-3"], explanation: "Require x + 3 ≥ 0, giving x ≥ −3. Domain: [−3, ∞).", hint: "Set the expression inside the radical greater than or equal to zero." }),
    C({ type: "mc", question: "Which interval notation represents all real numbers?", options: ["[−∞, ∞]", "(−∞, ∞)", "{−∞, ∞}", "[0, ∞)"], correctIndex: 1, explanation: "Infinity is never an endpoint, so parentheses are always used with ±∞.", hint: "Infinity is not a number that can be included." }),
  ],
  "piecewise-dispatch": [
    C({ type: "fill", question: "For f(x) = { x + 2 if x < 1; x² if x ≥ 1 }, find f(−3).", answer: "-1", accepted: ["−1"], explanation: "Because −3 < 1, use x + 2: −3 + 2 = −1.", hint: "Choose the rule whose condition contains the input.", visual: "piecewise" }),
    C({ type: "fill", question: "For f(x) = { x + 2 if x < 1; x² if x ≥ 1 }, find f(1).", answer: "1", accepted: ["1"], explanation: "The condition x ≥ 1 includes x = 1, so use x²: 1² = 1.", hint: "At a boundary, check which inequality includes equality." , visual: "piecewise"}),
    C({ type: "mc", question: "At x = 2, a piecewise graph has an open circle at y = 3 and a filled circle at y = −1. What is f(2)?", options: ["3", "−1", "2", "undefined"], correctIndex: 1, explanation: "A filled (closed) point is included in the function. Therefore f(2) = −1.", hint: "Closed dots count; open circles do not." , visual: "piecewise"}),
    C({ type: "mc", question: "For g(x) = { 2x if x ≤ 0; x + 4 if x > 0 }, which rule gives g(0)?", options: ["2x", "x + 4", "both rules", "neither rule"], correctIndex: 0, explanation: "The inequality x ≤ 0 includes 0, so use 2x.", hint: "Look for the condition with an equals sign at zero." }),
    C({ type: "fill", question: "For g(x) = { 2x if x ≤ 0; x + 4 if x > 0 }, find g(3).", answer: "7", accepted: ["7"], explanation: "Because 3 > 0, use x + 4: 3 + 4 = 7.", hint: "Choose the positive-input rule first." }),
    C({ type: "mc", question: "A piecewise definition is useful when…", options: ["one rule works for every input", "the rule changes for different input intervals", "a function has no domain", "a graph has no points"], correctIndex: 1, explanation: "Piecewise rules describe functions whose behavior changes across stated regions of the domain.", hint: "The word piecewise refers to different pieces of the input line." }),
    C({ type: "mc", question: "For h(x) = { −x if x < 0; x if x ≥ 0 }, what is h(−5)?", options: ["−5", "0", "5", "undefined"], correctIndex: 2, explanation: "Use −x because −5 < 0: −(−5) = 5.", hint: "The first rule turns negative inputs positive." }),
    C({ type: "mc", question: "If a graph has an open circle at (−1, 2), is x = −1 included at that point?", options: ["Yes, open circles are included", "No, the point is excluded", "Only if the graph is linear", "Only if y = 0"], correctIndex: 1, explanation: "An open circle marks a value approached but not included for that piece.", hint: "Open means excluded." }),
  ],
  "terrain-analyzer": [
    C({ type: "mc", question: "A graph reaches its overall highest point at (2, 7). What is its absolute maximum value?", options: ["2", "7", "(2, 7)", "There is no maximum"], correctIndex: 1, explanation: "An extreme value is the y-value, so the absolute maximum value is 7. The ordered pair (2, 7) is the absolute maximum point.", hint: "Value means y-value; point means an ordered pair.", visual: "terrain" }),
    C({ type: "mc", question: "A graph has a local low point at (−1, −4). Which answer gives the local minimum point?", options: ["−1", "−4", "(−1, −4)", "4"], correctIndex: 2, explanation: "A local minimum point is an ordered pair. Its local minimum value is −4.", hint: "The phrase point asks for both coordinates.", visual: "terrain" }),
    C({ type: "mc", question: "A graph rises as x moves from −3 to 0. On which interval is it increasing?", options: ["[−3, 0]", "(−3, 0)", "[0, −3]", "(0, ∞)"], correctIndex: 1, explanation: "Increasing behavior is reported on an open interval: (−3, 0).", hint: "Use open intervals for increasing and decreasing behavior." }),
    C({ type: "mc", question: "A function is constant from x = 1 to x = 4. Which statement is correct?", options: ["Its y-values increase there", "Its y-values decrease there", "Its y-values stay the same there", "It has no domain there"], correctIndex: 2, explanation: "A constant interval is horizontal: output does not change as x changes.", hint: "Imagine a horizontal graph segment." }),
    C({ type: "mc", question: "Which description is a local maximum?", options: ["The largest y-value on the entire domain", "A point higher than nearby points, even if not highest overall", "Any x-intercept", "The lowest y-value on the graph"], correctIndex: 1, explanation: "Local (relative) extrema compare a point with nearby points; absolute (global) extrema compare against the entire domain.", hint: "Local means neighborhood, not the whole graph." }),
    C({ type: "mc", question: "If f decreases on (0, 5), what happens to f(x) as x moves left to right from 0 to 5?", options: ["It gets larger", "It stays constant", "It gets smaller", "It becomes undefined"], correctIndex: 2, explanation: "On a decreasing interval, y-values fall as x-values increase.", hint: "Read the graph from left to right." }),
    C({ type: "mc", question: "The graph’s lowest overall point is (4, −6). What is the global minimum?", options: ["4", "−6", "(4, −6)", "6"], correctIndex: 2, explanation: "Without the word value, “global minimum” conventionally refers to the point (4, −6); its global minimum value is −6.", hint: "The app distinguishes a point from an extreme value." }),
    C({ type: "mc", question: "Which interval notation is best for saying a graph is decreasing between turning points x = −2 and x = 3?", options: ["[−2, 3]", "(−2, 3)", "{−2, 3}", "(3, −2)"], correctIndex: 1, explanation: "Monotonicity intervals are conventionally open: (−2, 3).", hint: "Endpoints are turning points, not part of the direction statement." }),
  ],
  "symmetry-scanner": [
    C({ type: "mc", question: "Classify f(x) = x⁴ − 3.", options: ["Even", "Odd", "Neither"], correctIndex: 0, explanation: "f(−x) = (−x)⁴ − 3 = x⁴ − 3 = f(x), so the function is even.", hint: "For even functions, test whether f(−x) equals f(x).", visual: "symmetry" }),
    C({ type: "mc", question: "Classify g(x) = x³ − x.", options: ["Even", "Odd", "Neither"], correctIndex: 1, explanation: "g(−x) = −x³ + x = −(x³ − x) = −g(x), so g is odd.", hint: "For odd functions, test whether f(−x) equals −f(x)." }),
    C({ type: "mc", question: "Classify h(x) = x² + x.", options: ["Even", "Odd", "Neither"], correctIndex: 2, explanation: "h(−x) = x² − x, which is neither h(x) nor −h(x).", hint: "Compute h(−x) before making a symmetry claim." }),
    C({ type: "fill", question: "For an even function f, complete: f(−x) = ___.", answer: "f(x)", accepted: ["f(x)", "fx"], explanation: "Even functions satisfy f(−x) = f(x), which corresponds to symmetry about the y-axis.", hint: "Even mirrors across the vertical axis." }),
    C({ type: "fill", question: "For an odd function f, complete: f(−x) = ___.", answer: "-f(x)", accepted: ["−f(x)", "-fx", "−fx"], explanation: "Odd functions satisfy f(−x) = −f(x), corresponding to origin symmetry.", hint: "Odd sends both coordinates through the origin." }),
    C({ type: "mc", question: "A graph symmetric about the y-axis represents an…", options: ["even function", "odd function", "inverse function", "constant function"], correctIndex: 0, explanation: "Y-axis symmetry is the graphical hallmark of an even function.", hint: "Reflect across the vertical axis." , visual: "symmetry"}),
    C({ type: "mc", question: "Which function is odd?", options: ["x² + 1", "|x|", "1/x", "x² − 5"], correctIndex: 2, explanation: "For f(x) = 1/x, f(−x) = −1/x = −f(x), so it is odd (on its symmetric domain x ≠ 0).", hint: "Test f(−x) against −f(x)." }),
    C({ type: "mc", question: "Why is √x neither even nor odd as a real function?", options: ["It has no range", "Its domain is not symmetric about 0", "It has a y-intercept", "It is always positive"], correctIndex: 1, explanation: "The real domain [0, ∞) does not contain both x and −x for positive x, so the even/odd tests cannot hold on a symmetric domain.", hint: "Even/odd classification requires that if x is allowed, −x is also allowed." }),
  ],
  "rate-of-change-lab": [
    C({ type: "fill", question: "For f(x) = x² + 3, simplify [f(x + h) − f(x)]/h.", answer: "2x+h", accepted: ["2x + h", "h+2x"], explanation: "f(x+h) = x² + 2xh + h² + 3. Subtract x²+3, then divide 2xh+h² by h to get 2x+h.", hint: "Expand (x+h)² carefully before subtracting." }),
    C({ type: "fill", question: "For f(x) = 3x − 5, simplify [f(x + h) − f(x)]/h.", answer: "3", accepted: ["3"], explanation: "f(x+h) − f(x) = [3(x+h)−5] − [3x−5] = 3h. Dividing by h gives 3.", hint: "Linear functions have a constant difference quotient." }),
    C({ type: "mc", question: "Why must h ≠ 0 in a difference quotient?", options: ["Because h is always positive", "Because we divide by h", "Because x cannot be zero", "Because the function must be odd"], correctIndex: 1, explanation: "The expression includes division by h, so h cannot be zero.", hint: "Look at the denominator." }),
    C({ type: "fill", question: "For f(x) = x² + 2x, simplify [f(x + h) − f(x)]/h.", answer: "2x+h+2", accepted: ["2x + h + 2", "h+2x+2"], explanation: "Expanding gives x²+2xh+h²+2x+2h; subtract x²+2x, factor h, then divide: 2x+h+2.", hint: "After subtraction, every remaining term should contain h." }),
    C({ type: "mc", question: "The difference quotient [f(x+h) − f(x)]/h measures…", options: ["a y-intercept", "average rate of change from x to x+h", "the range", "an inverse"], correctIndex: 1, explanation: "It is the slope of the secant line joining x and x+h, or average rate of change over that interval.", hint: "It compares output change to input change." }),
    C({ type: "fill", question: "For f(x) = x² − 4, simplify [f(x + h) − f(x)]/h.", answer: "2x+h", accepted: ["2x + h", "h+2x"], explanation: "The constant −4 cancels after subtraction. The remaining calculation is the same as for x²: 2x+h.", hint: "Constants cancel in f(x+h) − f(x)." }),
    C({ type: "mc", question: "Which is f(x + h) when f(x) = 2x² − 1?", options: ["2x² + h − 1", "2(x + h)² − 1", "2x² − 1 + h", "2x + h² − 1"], correctIndex: 1, explanation: "Replace every x with the entire quantity (x+h): f(x+h)=2(x+h)²−1.", hint: "Use parentheses around the new input." }),
    C({ type: "mc", question: "After forming a difference quotient, which algebraic step often allows simplification?", options: ["Add h to the denominator", "Factor h from the numerator and cancel", "Set x = 0", "Take a square root"], correctIndex: 1, explanation: "After subtraction, h commonly factors from the numerator. It can then cancel with the denominator as long as h ≠ 0.", hint: "Look for a common h in every remaining numerator term." }),
  ],
  "transformation-bay": [
    C({ type: "mc", question: "If g(x) = f(x − 3) + 2, how is the graph of f transformed?", options: ["Left 3, up 2", "Right 3, up 2", "Right 2, up 3", "Left 2, down 3"], correctIndex: 1, explanation: "Inside changes reverse direction: x−3 shifts right 3. The +2 outside shifts up 2.", hint: "Inside x affects horizontal movement in the opposite direction.", visual: "transform" }),
    C({ type: "mc", question: "If g(x) = f(x + 4), the graph shifts…", options: ["right 4", "left 4", "up 4", "down 4"], correctIndex: 1, explanation: "The +4 is inside, so the shift is opposite: left 4.", hint: "Inside plus means left." , visual: "transform"}),
    C({ type: "mc", question: "Which transformation does g(x) = −f(x) perform?", options: ["Reflection across x-axis", "Reflection across y-axis", "Shift left", "Horizontal stretch"], correctIndex: 0, explanation: "A negative outside f negates all y-values, reflecting the graph across the x-axis.", hint: "Outside changes affect outputs/y-values." }),
    C({ type: "mc", question: "Which transformation does g(x) = f(−x) perform?", options: ["Reflection across x-axis", "Reflection across y-axis", "Shift down", "Vertical compression"], correctIndex: 1, explanation: "Negating the input reverses x-values, reflecting the graph across the y-axis.", hint: "Inside changes affect x-values." }),
    C({ type: "mc", question: "If g(x) = 2f(x), the graph is…", options: ["vertically stretched by 2", "horizontally stretched by 2", "shifted right 2", "reflected across y-axis"], correctIndex: 0, explanation: "Multiplying outside doubles every y-value: a vertical stretch by factor 2.", hint: "Outside multiplier changes vertical scale." }),
    C({ type: "mc", question: "If g(x) = f(2x), the graph is…", options: ["horizontally stretched by 2", "horizontally compressed by 1/2", "vertically stretched by 2", "shifted left 2"], correctIndex: 1, explanation: "An inside factor 2 compresses horizontally by reciprocal 1/2. Points occur at half their original x-values.", hint: "Inside scale factors use the reciprocal." }),
    C({ type: "mc", question: "If g(x) = f(x/3), the graph is…", options: ["horizontally stretched by 3", "horizontally compressed by 3", "vertically stretched by 3", "shifted right 3"], correctIndex: 0, explanation: "x/3 means an inside factor of 1/3, so x-values stretch by reciprocal 3.", hint: "Divide inside → stretch horizontally." }),
    C({ type: "mc", question: "Start with y = x². Which equation has vertex (−2, 5)?", options: ["y = (x − 2)² + 5", "y = (x + 2)² + 5", "y = (x + 5)² − 2", "y = −(x + 2)² − 5"], correctIndex: 1, explanation: "Vertex form y=(x−h)²+k has vertex (h,k). To get h=−2, use x+2; k=5.", hint: "In vertex form, the sign inside is opposite the x-coordinate of the vertex." , visual: "transform"}),
  ],
  "operation-forge": [
    C({ type: "mc", question: "Let f(x) = x + 1 and g(x) = x². What is (f + g)(x)?", options: ["x² + x + 1", "x² + 1", "x³ + x", "x − 1"], correctIndex: 0, explanation: "Add outputs: (f+g)(x)=f(x)+g(x)=(x+1)+x²=x²+x+1.", hint: "Function addition means add their formulas." , visual: "operations"}),
    C({ type: "mc", question: "Let f(x) = x + 1 and g(x) = x². What is (f − g)(x)?", options: ["x² + x + 1", "−x² + x + 1", "x³ + x", "x − 1"], correctIndex: 1, explanation: "Subtract the entire second expression: (x+1)−x² = −x²+x+1.", hint: "Parentheses help preserve the subtraction." }),
    C({ type: "fill", question: "Let f(x) = 2x and g(x) = x − 3. Find (f · g)(2).", answer: "-4", accepted: ["−4"], explanation: "f(2)=4 and g(2)=−1, so (f·g)(2)=4(−1)=−4.", hint: "Evaluate each function, then multiply the outputs." }),
    C({ type: "mc", question: "For (f/g)(x), which extra restriction must be included in the domain?", options: ["f(x) ≠ 0", "g(x) ≠ 0", "x ≥ 0", "f(x) = g(x)"], correctIndex: 1, explanation: "A quotient cannot have a zero denominator, so exclude inputs for which g(x)=0.", hint: "Think about the denominator." }),
    C({ type: "mc", question: "If f(x) = x + 2 and g(x) = 1/(x − 2), what is the domain of (f + g)?", options: ["All real numbers", "x ≠ 2", "x ≥ 2", "x ≠ −2"], correctIndex: 1, explanation: "The sum is defined only where both functions are defined. g is undefined at x=2, so x≠2.", hint: "Operations use the overlap of the original domains." }),
    C({ type: "mc", question: "Let f(x)=x−4 and g(x)=x+4. What is (f/g)(x)?", options: ["(x−4)/(x+4), x ≠ −4", "(x+4)/(x−4), x ≠ 4", "x²−16", "1"], correctIndex: 0, explanation: "Divide f by g: (x−4)/(x+4). Exclude x=−4 because it makes the denominator zero.", hint: "Keep the original order f over g." }),
    C({ type: "fill", question: "Let f(x)=x² and g(x)=3. Find (f+g)(−2).", answer: "7", accepted: ["7"], explanation: "f(−2)=4 and g(−2)=3, so their sum is 7.", hint: "A constant function always outputs its constant." }),
    C({ type: "mc", question: "If f has domain [−1, 5] and g has domain (2, 8), what is the domain of (f·g)?", options: ["[−1, 8)", "(2, 5]", "[−1, 5]", "(2, 8)"], correctIndex: 1, explanation: "A product requires both functions to be defined, so use the intersection: (2, 5].", hint: "Find the overlap of the two domain intervals." }),
  ],
  "composition-dock": [
    C({ type: "mc", question: "Let f(x)=2x+1 and g(x)=x². What is (f ∘ g)(x)?", options: ["2x²+1", "(2x+1)²", "2x²", "x²+1"], correctIndex: 0, explanation: "(f∘g)(x)=f(g(x))=f(x²)=2x²+1.", hint: "Do g first, then feed its output into f." , visual: "operations"}),
    C({ type: "mc", question: "Let f(x)=2x+1 and g(x)=x². What is (g ∘ f)(x)?", options: ["2x²+1", "(2x+1)²", "2x²", "x²+1"], correctIndex: 1, explanation: "(g∘f)(x)=g(f(x))=g(2x+1)=(2x+1)². Order matters.", hint: "The right-hand function is applied first." }),
    C({ type: "mc", question: "Let f(x)=√x and g(x)=x−5. What is the domain of (f∘g)(x)?", options: ["All real numbers", "x ≥ −5", "x ≥ 5", "x ≠ 5"], correctIndex: 2, explanation: "f(g(x))=√(x−5). Require x−5≥0, so x≥5.", hint: "The output of g must be allowed as an input to f." }),
    C({ type: "mc", question: "Let f(x)=1/x and g(x)=x−2. What is the domain of (f∘g)(x)?", options: ["x ≠ −2", "x ≠ 0", "x ≠ 2", "all real numbers"], correctIndex: 2, explanation: "f(g(x))=1/(x−2); exclude x=2 because the composite denominator cannot be zero.", hint: "Substitute g into f, then find where the new expression is undefined." }),
    C({ type: "fill", question: "Let f(x)=x+3 and g(x)=2x. Find (f∘g)(4).", answer: "11", accepted: ["11"], explanation: "g(4)=8, then f(8)=11. So (f∘g)(4)=11.", hint: "Work from the inside out." }),
    C({ type: "mc", question: "Which statement about composition is true?", options: ["f∘g always equals g∘f", "f∘g means multiply f and g", "Order usually matters in composition", "Composition has no domain restrictions"], correctIndex: 2, explanation: "Composition means function nesting. Applying f then g generally differs from applying g then f.", hint: "Compare f(g(x)) to g(f(x))." }),
    C({ type: "mc", question: "Let f(x)=√x and g(x)=x². What is (f∘g)(x)?", options: ["x", "|x|", "x²", "√x"], correctIndex: 1, explanation: "√(x²)=|x|, not always x, because a square root is nonnegative.", hint: "Test x = −3 to distinguish x from |x|." }),
    C({ type: "mc", question: "For a composite f(g(x)) to exist at x, what must be true?", options: ["x is in the domain of f only", "x is in the domain of g and g(x) is in the domain of f", "f(x)=g(x)", "x is positive"], correctIndex: 1, explanation: "First g must accept x; then its output must be a permitted input for f.", hint: "There are two domain checkpoints in a composite." }),
  ],
  "inverse-portal": [
    C({ type: "mc", question: "Find the inverse of f(x)=3x−4.", options: ["(x−4)/3", "(x+4)/3", "3x+4", "4−3x"], correctIndex: 1, explanation: "Write y=3x−4, swap x and y, then solve: x=3y−4 → y=(x+4)/3.", hint: "Swap x and y before solving for y." , visual: "inverse"}),
    C({ type: "mc", question: "The graph of f⁻¹ is the reflection of the graph of f across…", options: ["the x-axis", "the y-axis", "the line y=x", "the origin"], correctIndex: 2, explanation: "Inverse functions swap coordinates, which reflects points across y=x.", hint: "A point (a,b) becomes (b,a)." , visual: "inverse"}),
    C({ type: "mc", question: "If f has domain [0, 4] and range [−2, 7], what is the domain of f⁻¹?", options: ["[0, 4]", "[−2, 7]", "(−∞, ∞)", "[0, 7]"], correctIndex: 1, explanation: "An inverse swaps domain and range, so dom(f⁻¹)=range(f)=[−2,7].", hint: "Inputs and outputs trade roles." }),
    C({ type: "mc", question: "Which test checks whether a function has an inverse function that is also a function?", options: ["Vertical line test", "Horizontal line test", "Point-slope test", "Midpoint test"], correctIndex: 1, explanation: "A function needs to be one-to-one to have an inverse that is a function, which is checked by the horizontal line test.", hint: "The vertical test checks the original relation; the horizontal test checks one-to-one." }),
    C({ type: "mc", question: "Find the inverse of f(x)=(x−2)³.", options: ["x³−2", "∛x−2", "∛x+2", "(x+2)³"], correctIndex: 2, explanation: "Swap x,y: x=(y−2)³. Take cube roots: ∛x=y−2, so y=∛x+2.", hint: "Undo the cube with a cube root, then undo the subtraction." }),
    C({ type: "mc", question: "Which function is its own inverse?", options: ["x+1", "2x", "1/x", "x²"], correctIndex: 2, explanation: "For x≠0, applying 1/x twice returns x: 1/(1/x)=x.", hint: "Test applying the function twice." }),
    C({ type: "mc", question: "If f(2)=5, what is f⁻¹(5)?", options: ["2", "5", "7", "−2"], correctIndex: 0, explanation: "Inverse functions reverse input and output. Since f sends 2 to 5, f⁻¹ sends 5 to 2.", hint: "Swap the coordinates." }),
    C({ type: "mc", question: "Why is f(x)=x² not invertible on all real numbers?", options: ["It has no range", "It fails the vertical line test", "It is not one-to-one", "It has no y-intercept"], correctIndex: 2, explanation: "Both 2 and −2 map to 4, so x² fails the horizontal line test. Restricting its domain can create an inverse.", hint: "Look for repeated outputs." }),
  ],
  "quadratic-skyline": [
    C({ type: "mc", question: "For y=x²−4x+3, what is the vertex?", options: ["(−2, 3)", "(2, −1)", "(2, 3)", "(−4, 3)"], correctIndex: 1, explanation: "x=−b/(2a)=4/2=2; y=2²−4(2)+3=−1. Vertex: (2,−1).", hint: "Use x=−b/(2a) for general form." , visual: "quadratic"}),
    C({ type: "mc", question: "For y=x²−4x+3, what are the x-intercepts?", options: ["(−1, 0) and (−3, 0)", "(1, 0) and (3, 0)", "(0, 1) and (0, 3)", "(2, −1) only"], correctIndex: 1, explanation: "Set y=0: x²−4x+3=(x−1)(x−3)=0, so x=1 or 3.", hint: "X-intercepts occur where y=0." }),
    C({ type: "mc", question: "For y=x²−4x+3, what is the y-intercept?", options: ["(0, 3)", "(3, 0)", "(0, −1)", "(2, 0)"], correctIndex: 0, explanation: "Set x=0: y=3, so the y-intercept is (0,3).", hint: "Y-intercepts occur where x=0." }),
    C({ type: "mc", question: "For y=x²−4x+3, what is the axis of symmetry?", options: ["x=−2", "x=2", "y=−1", "y=2"], correctIndex: 1, explanation: "The vertical line through the vertex is x=2.", hint: "The axis uses the vertex’s x-coordinate." }),
    C({ type: "mc", question: "For y=−2(x+1)²+8, what is the maximum value?", options: ["−2", "−1", "8", "There is no maximum"], correctIndex: 2, explanation: "The parabola opens down because a<0. Its vertex is (−1,8), so the maximum value is 8.", hint: "An opening-down parabola has a maximum at its vertex." , visual: "quadratic"}),
    C({ type: "fill", question: "For y=−2(x+1)²+8, give the range in interval notation.", answer: "(-infinity,8]", accepted: ["(−∞,8]", "(-∞,8]", "y<=8", "y≤8"], explanation: "The maximum y-value is 8 and all lower values occur, so the range is (−∞,8].", hint: "This parabola opens downward." }),
    C({ type: "mc", question: "In y=a(x−h)²+k, the vertex is…", options: ["(−h, k)", "(h, k)", "(a, k)", "(h, −k)"], correctIndex: 1, explanation: "Vertex form reveals the vertex directly as (h,k). Be careful: the sign inside the parentheses is opposite h in the written expression.", hint: "Use the named vertex form." }),
    C({ type: "mc", question: "For y=x²+6x+5, what are the x-intercepts?", options: ["(1,0) and (5,0)", "(−1,0) and (−5,0)", "(0,1) and (0,5)", "(−3,−4)"], correctIndex: 1, explanation: "Factor: x²+6x+5=(x+1)(x+5), giving x=−1 and x=−5.", hint: "Find two numbers that multiply to 5 and add to 6." }),
  ],
};

export const BOSS_CHALLENGES: Challenge[] = [
  C({ type: "mc", question: "Which relation is a function?", options: ["{(1,2),(1,3)}", "{(0,4),(2,4),(3,1)}", "{(5,0),(5,2)}", "{(−1,3),(−1,4)}"], correctIndex: 1, explanation: "Every input appears once in the second relation.", hint: "Each input gets one output." }),
  C({ type: "fill", question: "For f(x)=x²−1, find f(3).", answer: "8", accepted: ["8"], explanation: "3²−1=8.", hint: "Substitute first." }),
  C({ type: "fill", question: "Find the domain of √(x−4).", answer: "[4,infinity)", accepted: ["[4,∞)", "[4,infinity)", "x>=4", "x≥4"], explanation: "x−4≥0, so x≥4.", hint: "Radicand ≥0." }),
  C({ type: "mc", question: "For h(x)={x+1 if x<0; x² if x≥0}, find h(−2).", options: ["−4", "−1", "2", "4"], correctIndex: 1, explanation: "Use x+1: −2+1=−1.", hint: "Choose the matching branch." }),
  C({ type: "mc", question: "A local maximum point is…", options: ["a y-value only", "an ordered pair higher than nearby points", "always the global maximum", "an x-intercept"], correctIndex: 1, explanation: "A local maximum is an ordered pair; the local maximum value is its y-coordinate.", hint: "Point vs value." }),
  C({ type: "mc", question: "Classify x³+x.", options: ["Even", "Odd", "Neither"], correctIndex: 1, explanation: "f(−x)=−x³−x=−f(x).", hint: "Test f(−x)." }),
  C({ type: "fill", question: "For f(x)=x², simplify [f(x+h)−f(x)]/h.", answer: "2x+h", accepted: ["2x + h", "h+2x"], explanation: "Expand and cancel to get 2x+h.", hint: "Expand (x+h)²." }),
  C({ type: "mc", question: "g(x)=f(x+2) is a shift…", options: ["right 2", "left 2", "up 2", "down 2"], correctIndex: 1, explanation: "Inside +2 shifts left 2.", hint: "Inside reverses direction." }),
  C({ type: "mc", question: "Let f=x and g=x². What is (f·g)(x)?", options: ["x²", "x³", "2x", "x+x²"], correctIndex: 1, explanation: "x·x²=x³.", hint: "Multiply the formulas." }),
  C({ type: "mc", question: "For f(x)=1/x and g(x)=x−1, (f∘g)(x) is undefined when…", options: ["x=−1", "x=0", "x=1", "never"], correctIndex: 2, explanation: "1/(x−1) is undefined at x=1.", hint: "Substitute g into f." }),
  C({ type: "mc", question: "If f(4)=−2, then f⁻¹(−2)=…", options: ["−2", "2", "4", "−4"], correctIndex: 2, explanation: "Inverses swap inputs and outputs.", hint: "Reverse the ordered pair." }),
  C({ type: "mc", question: "For y=(x−3)²+1, the vertex is…", options: ["(−3,1)", "(3,1)", "(3,−1)", "(1,3)"], correctIndex: 1, explanation: "Vertex form gives (h,k)=(3,1).", hint: "Inside sign is opposite h." }),
  C({ type: "mc", question: "If a graph decreases on (−4, 0), what happens as x increases?", options: ["y increases", "y decreases", "y stays constant", "domain ends"], correctIndex: 1, explanation: "Decreasing means y falls from left to right.", hint: "Read left to right." }),
  C({ type: "mc", question: "The range of y=−(x−1)²+6 is…", options: ["[6,∞)", "(−∞,6]", "(−∞,∞)", "[1,∞)"], correctIndex: 1, explanation: "It opens downward with maximum 6.", hint: "Look at sign and vertex." }),
  C({ type: "mc", question: "Which equation is a reflection of f across the y-axis?", options: ["−f(x)", "f(−x)", "f(x)+1", "2f(x)"], correctIndex: 1, explanation: "Input negation reflects across the y-axis.", hint: "Inside change." }),
  C({ type: "mc", question: "If dom(f)=[−2,3] and dom(g)=(0,5), the domain of f+g is…", options: ["[−2,5)", "(0,3]", "[−2,3]", "(0,5)"], correctIndex: 1, explanation: "Use the overlap of the two domains.", hint: "Intersection." }),
  C({ type: "mc", question: "A horizontal line crosses a function’s graph twice. The function…", options: ["has no inverse function unless domain is restricted", "is not a function", "is even", "has no domain"], correctIndex: 0, explanation: "Repeated outputs mean it is not one-to-one.", hint: "Horizontal test." }),
  C({ type: "mc", question: "For y=x²+2x−3, the y-intercept is…", options: ["(0,−3)", "(−3,0)", "(1,0)", "(−1,0)"], correctIndex: 0, explanation: "Set x=0: y=−3.", hint: "x=0 for y-intercept." }),
  C({ type: "mc", question: "Which is the absolute minimum value if the global lowest point is (−2,−5)?", options: ["−2", "−5", "(−2,−5)", "5"], correctIndex: 1, explanation: "The extreme value is the y-coordinate.", hint: "Value means y-value." }),
  C({ type: "mc", question: "f∘g means…", options: ["f(x)g(x)", "f(g(x))", "g(f(x))", "f(x)+g(x)"], correctIndex: 1, explanation: "Composition f∘g applies g first, then f.", hint: "Read from inside out." }),
];

export const TOPIC_GUIDES = [
  { title: "Function foundations", icon: "◌", text: "A function is a rule assigning exactly one output to each permitted input. Use the vertical line test on graphs and inspect repeated first coordinates in ordered pairs.", formula: "one input → exactly one output", example: "{(1,2),(2,2),(3,5)} is a function; repeated outputs are fine.", watch: "Do not confuse the vertical line test (function) with the horizontal line test (one-to-one)." },
  { title: "Notation & representations", icon: "⌁", text: "A function can be shown by a formula, table, graph, mapping, or words. f(a) means substitute a for every x in the rule.", formula: "f(a) = output when input is a", example: "f(x)=2x−5 → f(4)=2(4)−5=3.", watch: "An ordered pair is always (input, output)." },
  { title: "Domain & range", icon: "⌗", text: "Domain is the set of allowed x-values; range is the set of resulting y-values. Parentheses exclude endpoints and brackets include them.", formula: "√u requires u ≥ 0; denominator ≠ 0", example: "√(5−x): 5−x≥0 → domain (−∞,5].", watch: "Infinity is never included, so use parentheses with ±∞." },
  { title: "Piecewise rules", icon: "⟐", text: "Piecewise functions use a different formula on each stated input region. Select the one condition that contains the requested input.", formula: "closed dot = included; open circle = excluded", example: "f(x)={x+2, x<1; x², x≥1}; f(1)=1.", watch: "At a breakpoint, the equality sign tells you which rule to use." },
  { title: "Extrema & behavior", icon: "⌇", text: "Absolute/global extrema compare the whole domain; local/relative extrema compare nearby points. Report extrema as points when asked for a maximum/minimum, and y-values when asked for extreme values.", formula: "maximum point (a,b) | maximum value b", example: "Global high at (2,7): maximum point (2,7), maximum value 7.", watch: "Increasing/decreasing intervals are customarily written with open endpoints." },
  { title: "Even & odd", icon: "◇", text: "Even functions are symmetric about the y-axis; odd functions have origin symmetry. Use algebraic substitutions to classify them.", formula: "even: f(−x)=f(x) | odd: f(−x)=−f(x)", example: "x³−x is odd because f(−x)=−x³+x=−f(x).", watch: "The domain must be symmetric about 0 before even/odd tests can work." },
  { title: "Difference quotient", icon: "Δ", text: "The difference quotient is an algebraic average rate of change. Expand f(x+h), subtract f(x), factor h, then cancel h (h≠0).", formula: "[f(x+h)−f(x)] / h", example: "For x²: [(x+h)²−x²]/h = 2x+h.", watch: "Replace every x with (x+h), not x+h only once." },
  { title: "Transformations", icon: "↔", text: "Outside changes move or scale y-values; inside changes move or scale x-values in the opposite or reciprocal direction.", formula: "f(x−h)+k: right h, up k | f(bx): horizontal scale 1/|b|", example: "f(x+4) shifts left 4; f(2x) compresses horizontally by 1/2.", watch: "The most common error is forgetting that inside shifts reverse direction." },
  { title: "Operations", icon: "⊕", text: "Add, subtract, multiply, or divide output formulas. The resulting domain requires both original functions to exist; quotient functions also require g(x)≠0.", formula: "(f/g)(x)=f(x)/g(x), g(x)≠0", example: "If dom f=[−1,5], dom g=(2,8), then dom(fg)=(2,5].", watch: "Use the intersection of domains, then remove new zero-denominator inputs." },
  { title: "Composition", icon: "∘", text: "Composition feeds the output of one function into another. In f∘g, calculate g first, then use that result as the input of f.", formula: "(f∘g)(x)=f(g(x))", example: "f(x)=2x+1, g(x)=x² → f(g(x))=2x²+1.", watch: "For the composite domain, x must be in dom g and g(x) must land in dom f." },
  { title: "Inverse functions", icon: "⇄", text: "An inverse reverses a one-to-one function. Swap x and y, solve for y, and remember that the domain and range trade places.", formula: "f⁻¹: domain ↔ range; graph reflects across y=x", example: "y=3x−4 → x=3y−4 → f⁻¹(x)=(x+4)/3.", watch: "A function that fails the horizontal line test needs a restricted domain to have an inverse function." },
  { title: "Quadratics", icon: "∩", text: "Vertex form exposes the vertex; general form can reveal intercepts and uses x=−b/(2a) for the vertex’s x-coordinate. A parabola’s direction depends on a.", formula: "y=a(x−h)²+k, vertex (h,k) | x=−b/(2a)", example: "x²−4x+3 has vertex (2,−1), roots 1 and 3, y-intercept 3.", watch: "In (x−h), the sign written inside is opposite the h-coordinate." },
];
