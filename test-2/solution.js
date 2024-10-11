// let unavailableItems = [
//   { startPx: 10, endPx: 30 },
//   { startPx: 55, endPx: 65 },
//   { startPx: 35, endPx: 50 },
//   { startPx: 20, endPx: 40 },
//   { startPx: 60, endPx: 70 },
// ]
// Write a function (using ES6) that union all overlapping items and produces an
// array of non - overlapping items.
// For example: { startPx: 10, endPx: 30 }

// { startPx: 20, endPx: 40 }
// would become:
// { startPx: 10, endPx: 40 }


const solution = (items) => {
  // sort the array by the startPx
  const sorted = items.sort((a, b) => a.startPx - b.startPx);

  // use a single pass to merge intervals efficiently
  const merged = []
  let current = sorted[0]; // Start with the first interval

  for (let i = 1; i < sorted.length + 1; i++) {
    const next = sorted[i] || null;

    if (next && next.startPx <= current.endPx) {
      current.endPx = Math.max(current.endPx, next.endPx)
    } else {
      merged.push(current);
      current = next;
    }
  }

  // return an array of non-overlapping items
  return merged;
}

// test case
const testCases = [
  {
    test: [
      { startPx: 10, endPx: 30 },
      { startPx: 20, endPx: 40 },
    ],
    expected: [{ startPx: 10, endPx: 40 }],
  },
  {
    test: [
      { startPx: 10, endPx: 20 },
      { startPx: 30, endPx: 40 },
      { startPx: 50, endPx: 60 },
    ],
    expected: [
      { startPx: 10, endPx: 20 },
      { startPx: 30, endPx: 40 },
      { startPx: 50, endPx: 60 },
    ],
  },
  {
    test: [
      { startPx: 10, endPx: 30 },
      { startPx: 55, endPx: 65 },
      { startPx: 35, endPx: 50 },
      { startPx: 20, endPx: 40 },
      { startPx: 60, endPx: 70 },
    ],
    expected: [
      { startPx: 10, endPx: 50 },
      { startPx: 55, endPx: 70 },
    ],
  },
  {
    test: [
      { startPx: 10, endPx: 20 },
    ],
    expected: [{ startPx: 10, endPx: 20 }],
  },
  {
    test: [],
    expected: [],
  },
  {
    test: [
      { startPx: 10, endPx: 20 },
      { startPx: 20, endPx: 30 },
      { startPx: 30, endPx: 40 },
    ],
    expected: [
      { startPx: 10, endPx: 40 },
    ],
  },
  {
    test: [
      { startPx: 10, endPx: 50 },
      { startPx: 20, endPx: 30 },
    ],
    expected: [{ startPx: 10, endPx: 50 }],
  },
  {
    test: [
      { startPx: 55, endPx: 65 },
      { startPx: 10, endPx: 30 },
      { startPx: 35, endPx: 50 },
    ],
    expected: [
      { startPx: 10, endPx: 30 },
      { startPx: 35, endPx: 50 },
      { startPx: 55, endPx: 65 },
    ],
  },
];

// running all tests
testCases.forEach(({ test, expected }, index) => {
  const result = solution(test);
  console.log(`Test ${index + 1}:`, result)
  console.assert(JSON.stringify(result) === JSON.stringify(expected), `Test ${index + 1} Failed`);
});