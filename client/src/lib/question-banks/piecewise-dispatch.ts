import type { Challenge } from "../activities";

export const piecewiseDispatchBank: Challenge[] = [
  {
    type: "mc",
    question: "Find f(−3).",
    piecewise: {
      label: "f(x) =",
      cases: [
        { expression: "2x + 3", condition: "x < −1" },
        { expression: "x²", condition: "x ≥ −1" },
      ],
    },
    options: ["−9", "0", "−3", "9"],
    correctIndex: 2,
    explanation: "Because −3 < −1, the active rule is 2x + 3. Therefore f(−3) = 2(−3) + 3 = −6 + 3 = −3.",
    hint: "First compare the input −3 with the condition on each rule.",
  },
  {
    type: "fill",
    question: "Find g(5).",
    piecewise: {
      label: "g(x) =",
      cases: [
        { expression: "4 − x", condition: "x ≤ 2" },
        { expression: "2x − 1", condition: "x > 2" },
      ],
    },
    answer: "9",
    accepted: ["9"],
    explanation: "Since 5 > 2, use 2x − 1. Substitution gives g(5) = 2(5) − 1 = 9.",
    hint: "The input 5 belongs to the condition x > 2.",
  },
  {
    type: "mc",
    question: "Find h(4).",
    piecewise: {
      label: "h(x) =",
      cases: [
        { expression: "3x − 2", condition: "x < 4" },
        { expression: "x + 5", condition: "x ≥ 4" },
      ],
    },
    options: ["10", "9", "7", "2"],
    correctIndex: 1,
    explanation: "The condition x < 4 excludes the endpoint 4. The condition x ≥ 4 includes it, so h(4) = 4 + 5 = 9.",
    hint: "At a boundary, pay close attention to whether the equality sign is included.",
  },
  {
    type: "fill",
    question: "Find p(0).",
    piecewise: {
      label: "p(x) =",
      cases: [
        { expression: "x² + 1", condition: "x ≤ 0" },
        { expression: "5 − x", condition: "x > 0" },
      ],
    },
    answer: "1",
    accepted: ["1"],
    explanation: "Zero satisfies x ≤ 0, so use x² + 1. Thus p(0) = 0² + 1 = 1.",
    hint: "The symbol ≤ means that 0 is included in the first rule.",
  },
  {
    type: "mc",
    question: "Which point is plotted as a closed point on the graph at the switching input x = 1?",
    piecewise: {
      label: "q(x) =",
      cases: [
        { expression: "x + 2", condition: "x < 1" },
        { expression: "2x − 1", condition: "x ≥ 1" },
      ],
    },
    options: ["(1, 3)", "(1, 1)", "(1, −1)", "(3, 1)"],
    correctIndex: 1,
    explanation: "The first rule would give 1 + 2 = 3, but x < 1 makes (1, 3) open. The second rule includes x = 1 and gives 2(1) − 1 = 1, so (1, 1) is closed.",
    hint: "A closed endpoint comes from the rule whose condition includes the switching input.",
  },
  {
    type: "fill",
    question: "Find r(−2).",
    piecewise: {
      label: "r(x) =",
      cases: [
        { expression: "7", condition: "x < −2" },
        { expression: "−x + 1", condition: "x ≥ −2" },
      ],
    },
    answer: "3",
    accepted: ["3"],
    explanation: "The constant rule 7 does not include −2. The second rule does, so r(−2) = −(−2) + 1 = 3.",
    hint: "The endpoint −2 belongs to the condition with ≥.",
  },
  {
    type: "mc",
    question: "Which expression must be used to evaluate s(2)?",
    piecewise: {
      label: "s(x) =",
      cases: [
        { expression: "x² − 4", condition: "x ≤ 2" },
        { expression: "3x + 1", condition: "x > 2" },
      ],
    },
    options: ["x² − 4", "3x + 1", "Both expressions", "Neither expression"],
    correctIndex: 0,
    explanation: "The input 2 satisfies x ≤ 2, so x² − 4 is the one active expression. The rule 3x + 1 is reserved for inputs strictly greater than 2.",
    hint: "Check whether 2 is included by ≤ or by >.",
  },
  {
    type: "fill",
    question: "Find t(−1/2).",
    piecewise: {
      label: "t(x) =",
      cases: [
        { expression: "−2x + 1", condition: "x < 0" },
        { expression: "x² + 1", condition: "x ≥ 0" },
      ],
    },
    answer: "2",
    accepted: ["2"],
    explanation: "Because −1/2 < 0, use −2x + 1. Then t(−1/2) = −2(−1/2) + 1 = 1 + 1 = 2.",
    hint: "A negative input selects the first rule.",
  },
  {
    type: "mc",
    question: "What is the domain of u? Use interval notation.",
    piecewise: {
      label: "u(x) =",
      cases: [
        { expression: "2x + 1", condition: "x ≤ −1" },
        { expression: "x² − 1", condition: "−1 < x < 2" },
        { expression: "4 − x", condition: "x ≥ 2" },
      ],
    },
    options: ["(−∞, −1] ∪ [2, ∞)", "[−1, 2]", "(−∞, 2)", "(−∞, ∞)"],
    correctIndex: 3,
    explanation: "The first case covers inputs through −1, the middle case covers inputs between −1 and 2, and the final case covers inputs from 2 onward. Together these intervals leave no input uncovered, so the domain is (−∞, ∞).",
    hint: "Take the union of all input intervals stated in the conditions.",
  },
  {
    type: "fill",
    question: "What is the domain of v? Use interval notation.",
    piecewise: {
      label: "v(x) =",
      cases: [
        { expression: "x + 4", condition: "x ≤ −1" },
        { expression: "3 − x", condition: "x > 2" },
      ],
    },
    answer: "(-infinity,-1]U(2,infinity)",
    accepted: ["(−∞, −1] ∪ (2, ∞)", "(-∞,-1]∪(2,∞)", "(-infinity,-1]U(2,infinity)"],
    explanation: "The first rule supplies all inputs in (−∞, −1], and the second supplies all inputs in (2, ∞). No rule is supplied from just above −1 through 2, so the domain is (−∞, −1] ∪ (2, ∞).",
    hint: "Write the input set from each condition, then join the two pieces with ∪.",
  },
  {
    type: "mc",
    question: "What is the domain of w? Use interval notation.",
    piecewise: {
      label: "w(x) =",
      cases: [
        { expression: "x²", condition: "−3 < x ≤ 1" },
        { expression: "2x + 1", condition: "1 < x < 4" },
      ],
    },
    options: ["(−3, 4)", "[−3, 4)", "(−3, 1] ∪ (1, 4)", "(−3, 1) ∪ (1, 4)"],
    correctIndex: 0,
    explanation: "The first condition covers (−3, 1], and the second covers (1, 4). Since 1 is already included by the first condition, the union has no gap at 1 and is (−3, 4).",
    hint: "Check whether an endpoint missing from one case is included by a neighboring case.",
  },
  {
    type: "fill",
    question: "What is the range of m? Use interval notation.",
    piecewise: {
      label: "m(x) =",
      cases: [
        { expression: "x + 3", condition: "x < 0" },
        { expression: "3", condition: "x = 0" },
        { expression: "3 − x", condition: "x > 0" },
      ],
    },
    answer: "(-infinity,3]",
    accepted: ["(−∞, 3]", "(-∞,3]", "(-infinity,3]"],
    explanation: "For x < 0, x + 3 gives every output below 3. For x > 0, 3 − x also gives outputs below 3. The middle rule contributes 3 itself, so the range is (−∞, 3].",
    hint: "Decide whether the largest possible output 3 is actually attained by one of the cases.",
  },
  {
    type: "mc",
    question: "What is the range of n? Use interval notation.",
    piecewise: {
      label: "n(x) =",
      cases: [
        { expression: "x + 2", condition: "x < 0" },
        { expression: "x² + 2", condition: "x ≥ 0" },
      ],
    },
    options: ["(−∞, 2)", "[2, ∞)", "(−∞, ∞)", "(−∞, 2]"],
    correctIndex: 2,
    explanation: "The first branch gives (−∞, 2), while the second gives [2, ∞) because x² is nonnegative. Their union is (−∞, ∞), so every real output occurs.",
    hint: "Find each branch’s output interval and combine the intervals.",
  },
  {
    type: "fill",
    question: "What is the range of a? Use interval notation.",
    piecewise: {
      label: "a(x) =",
      cases: [
        { expression: "x²", condition: "x < 0" },
        { expression: "x + 2", condition: "x ≥ 0" },
      ],
    },
    answer: "(0,infinity)",
    accepted: ["(0, ∞)", "(0,∞)", "(0,infinity)"],
    explanation: "When x < 0, x² gives (0, ∞), not 0 because 0 is excluded from that branch. When x ≥ 0, x + 2 gives [2, ∞), which is already contained in (0, ∞). Therefore the range is (0, ∞).",
    hint: "Ask whether either branch can produce the output 0.",
  },
  {
    type: "mc",
    question: "At x = −1, the first branch ends with an open point at (−1, 4) and the second branch has a closed point at (−1, −2). What is b(−1)?",
    piecewise: {
      label: "b(x) =",
      cases: [
        { expression: "x + 5", condition: "x < −1" },
        { expression: "2x", condition: "x ≥ −1" },
      ],
    },
    options: ["4", "−2", "2", "−4"],
    correctIndex: 1,
    explanation: "An open point is not part of the function value. The condition x ≥ −1 selects 2x at x = −1, giving b(−1) = 2(−1) = −2.",
    hint: "Use the y-coordinate of the closed point, not the open point.",
  },
  {
    type: "fill",
    question: "The left piece has a closed endpoint at (3, 5), while the right piece has an open endpoint at (3, 0). Find c(3).",
    piecewise: {
      label: "c(x) =",
      cases: [
        { expression: "2x − 1", condition: "x ≤ 3" },
        { expression: "x − 3", condition: "x > 3" },
      ],
    },
    answer: "5",
    accepted: ["5"],
    explanation: "The condition x ≤ 3 includes 3, so the closed left endpoint gives the function value. Substituting gives c(3) = 2(3) − 1 = 5.",
    hint: "The filled or closed point determines the function’s value at the shared x-coordinate.",
  },
  {
    type: "mc",
    question: "Which endpoint description correctly matches the graph of d at x = 0?",
    piecewise: {
      label: "d(x) =",
      cases: [
        { expression: "−x", condition: "x < 0" },
        { expression: "x + 2", condition: "x ≥ 0" },
      ],
    },
    options: ["An open point at (0, 0) and a closed point at (0, 2)", "A closed point at (0, 0) and an open point at (0, 2)", "Closed points at both (0, 0) and (0, 2)", "Open points at both (0, 0) and (0, 2)"],
    correctIndex: 0,
    explanation: "The rule −x approaches 0 at x = 0, but its condition x < 0 excludes 0, so (0, 0) is open. The rule x + 2 includes 0 and gives 2, so (0, 2) is closed.",
    hint: "Evaluate each expression at 0, then use its condition to decide open versus closed.",
  },
  {
    type: "fill",
    question: "Find e(2) − e(−1).",
    mathLines: ["e(2) = 2²", "e(−1) = −1 + 1"],
    piecewise: {
      label: "e(x) =",
      cases: [
        { expression: "x + 1", condition: "x < 0" },
        { expression: "x²", condition: "x ≥ 0" },
      ],
    },
    answer: "4",
    accepted: ["4"],
    explanation: "The nonnegative input 2 uses x², so e(2) = 4. The negative input −1 uses x + 1, so e(−1) = 0. Hence e(2) − e(−1) = 4 − 0 = 4.",
    hint: "Evaluate each input with its own active branch before subtracting.",
  },
  {
    type: "mc",
    question: "Which input makes f(x) = 5?",
    mathLines: ["x + 1 = 5  ⟹  x = 4, but 4 does not satisfy x < 0", "2x + 1 = 5  ⟹  x = 2, and 2 satisfies x ≥ 0"],
    piecewise: {
      label: "f(x) =",
      cases: [
        { expression: "x + 1", condition: "x < 0" },
        { expression: "2x + 1", condition: "x ≥ 0" },
      ],
    },
    options: ["−6", "−4", "2", "4"],
    correctIndex: 2,
    explanation: "Solving the first expression for output 5 produces x = 4, but that input cannot use the x < 0 branch. Solving the included second branch gives x = 2, and f(2) = 2(2) + 1 = 5.",
    hint: "A solution found from a branch is valid only if it satisfies that branch’s condition.",
  },
  {
    type: "fill",
    question: "What is the range of g? Use interval notation.",
    piecewise: {
      label: "g(x) =",
      cases: [
        { expression: "x + 1", condition: "x < 0" },
        { expression: "x² + 4", condition: "x ≥ 0" },
      ],
    },
    answer: "(-infinity,1)U[4,infinity)",
    accepted: ["(−∞, 1) ∪ [4, ∞)", "(-∞,1)∪[4,∞)", "(-infinity,1)U[4,infinity)"],
    explanation: "For x < 0, x + 1 gives all outputs in (−∞, 1); output 1 is excluded because x = 0 is not in that branch. For x ≥ 0, x² + 4 gives [4, ∞). These do not meet, so the range is (−∞, 1) ∪ [4, ∞).",
    hint: "Find the output interval of each branch separately; then check whether the intervals overlap.",
  },
];
