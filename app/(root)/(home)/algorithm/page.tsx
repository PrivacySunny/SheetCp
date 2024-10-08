import React from "react";
import Link from "next/link";
import { algoLinks } from "@/algo";

type TopicCategory = {
  [key: string]: {
    [subKey: string]: string[];
  };
};

const topics: TopicCategory = {
  Algebra: {
    Fundamentals: [
      "Binary Exponentiation",
      "Euclidean algorithm for computing the greatest common divisor",
      "Extended Euclidean Algorithm",
      "Linear Diophantine Equations",
      "Fibonacci Numbers",
    ],
    "Prime numbers": [
      "Sieve of Eratosthenes",
      "Linear Sieve",
      "Primality tests",
      "Integer factorization",
    ],
    "Number-theoretic functions": [
      "Euler's totient function",
      "Number of divisors / sum of divisors",
    ],
    "Modular arithmetic": [
      "Modular Inverse",
      "Linear Congruence Equation",
      "Chinese Remainder Theorem",
      "Garner's Algorithm",
      "Factorial modulo p",
      "Discrete Log",
      "Primitive Root",
      "Discrete Root",
      "Montgomery Multiplication",
    ],
    "Number systems": ["Balanced Ternary", "Gray code"],
    Miscellaneous: [
      "Bit manipulation",
      "Enumerating submasks of a bitmask",
      "Arbitrary-Precision Arithmetic",
      "Fast Fourier transform",
      "Operations on polynomials and series",
      "Continued fractions",
      "Factoring Exponentiation",
    ],
  },
  "Data Structures": {
    Fundamentals: ["Minimum Stack / Minimum Queue", "Sparse Table"],
    Trees: [
      "Disjoint Set Union",
      "Fenwick Tree",
      "Sqrt Decomposition",
      "Segment Tree",
      "Treap",
      "Sqrt Tree",
      "Randomized Heap",
    ],
    Advanced: ["Deleting from a data structure in O(T(n) log n)"],
  },
  "Dynamic Programming": {
    "Introduction to Dynamic Programming": ["Knapsack Problem"],
    "DP optimizations": ["Divide and Conquer DP", "Knuth's Optimization"],
    Tasks: [
      "Dynamic Programming on Broken Profile. Problem 'Parquet'",
      "Finding the largest zero submatrix",
    ],
  },
  "String Processing": {
    Fundamentals: [
      "String Hashing",
      "Rabin-Karp for String Matching",
      "Prefix function - Knuth-Morris-Pratt",
      "Z-function",
      "Suffix Array",
      "Aho-Corasick algorithm",
    ],
    Advanced: ["Suffix Tree", "Suffix Automaton", "Lyndon factorization"],
    Tasks: [
      "Expression parsing",
      "Manacher's Algorithm - Finding all sub-palindromes in O(N)",
      "Finding repetitions",
    ],
  },
  "Linear Algebra": {
    Matrices: [
      "Gauss & System of Linear Equations",
      "Gauss & Determinant",
      "Kraut & Determinant",
      "Rank of a matrix",
    ],
  },
  Combinatorics: {
    Fundamentals: [
      "Finding Power of Factorial Divisor",
      "Binomial Coefficients",
      "Catalan Numbers",
    ],
    Techniques: [
      "The Inclusion-Exclusion Principle",
      "Burnside's lemma / Pólya enumeration theorem",
      "Stars and bars",
      "Generating all K-combinations",
    ],
    Tasks: [
      "Placing Bishops on a Chessboard",
      "Balanced bracket sequences",
      "Counting labeled graphs",
    ],
  },
  "Numerical Methods": {
    Search: [
      "Binary Search",
      "Ternary Search",
      "Newton's method for finding roots",
    ],
    Integration: ["Integration by Simpson's formula"],
  },
  Geometry: {
    "Elementary operations": [
      "Finding the equation of a line for a segment",
      "Intersection Point of Lines",
      "Check if two segments intersect",
      "Intersection of Segments",
      "Circle-Line Intersection",
      "Circle-Circle Intersection",
      "Common tangents to two circles",
      "Length of the union of segments",
    ],
    Polygons: [
      "Oriented area of a triangle",
      "Area of simple polygon",
      "Check if points belong to the convex polygon in O(log N)",
      "Minkowski sum of convex polygons",
      "Pick's Theorem - area of lattice polygons",
      "Lattice points of non-lattice polygon",
    ],
    "Convex hull": [
      "Convex hull construction",
      "Convex hull trick and Li Chao tree",
    ],
    "Sweep-line": [
      "Search for a pair of intersecting segments",
      "Planar graphs",
      "Finding faces of a planar graph",
      "Point location in O(log N)",
    ],
    Miscellaneous: [
      "Finding the nearest pair of points",
      "Delaunay triangulation and Voronoi diagram",
      "Vertical decomposition",
      "Half-plane intersection - S&I Algorithm in O(N log N)",
      "Manhattan Distance",
    ],
  },
  Graphs: {
    "Graph traversal": [
      "Breadth First Search",
      "Depth First Search",
      "Connected components, bridges, articulations points",
      "Finding Connected Components",
      "Finding Bridges in O(N+M)",
      "Finding Bridges Online",
      "Finding Articulation Points in O(N+M)",
      "Strongly Connected Components and Condensation Graph",
      "Strong Orientation",
    ],
    "Single-source shortest paths": [
      "Dijkstra - finding shortest paths from given vertex",
      "Dijkstra on sparse graphs",
      "Bellman-Ford - finding shortest paths with negative weights",
      "0-1 BFS",
      "D´Esopo-Pape algorithm",
    ],
    "All-pairs shortest paths": [
      "Floyd-Warshall - finding all shortest paths",
      "Number of paths of fixed length / Shortest paths of fixed length",
    ],
    "Spanning trees": [
      "Minimum Spanning Tree - Prim's Algorithm",
      "Minimum Spanning Tree - Kruskal",
      "Minimum Spanning Tree - Kruskal with Disjoint Set Union",
      "Second best Minimum Spanning Tree - Using Kruskal and Lowest Common Ancestor",
      "Kirchhoff Theorem",
      "Prüfer code",
    ],
    Cycles: [
      "Checking a graph for acyclicity and finding a cycle in O(M)",
      "Finding a Negative Cycle in the Graph",
      "Eulerian Path",
    ],
    "Lowest common ancestor": [
      "Lowest Common Ancestor",
      "Lowest Common Ancestor - Binary Lifting",
      "Lowest Common Ancestor - Farach-Colton and Bender algorithm",
      "Solve RMQ by finding LCA",
      "Lowest Common Ancestor - Tarjan's off-line algorithm",
    ],
    "Flows and related problems": [
      "Maximum flow - Ford-Fulkerson and Edmonds-Karp",
      "Maximum flow - Push-relabel algorithm",
      "Maximum flow - Push-relabel algorithm improved",
      "Maximum flow - Dinic's algorithm",
      "Maximum flow - MPM algorithm",
      "Flows with demands",
      "Minimum-cost flow",
      "Assignment problem",
    ],
    "Matchings and related problems": [
      "Bipartite Graph Check",
      "Kuhn's Algorithm - Maximum Bipartite Matching",
      "Hungarian Algorithm",
    ],
    Miscellaneous: [
      "Topological Sorting",
      "Edge connectivity / Vertex connectivity",
      "Tree painting",
      "2-SAT",
      "Heavy-light decomposition",
    ],
  },
  Miscellaneous: {
    Sequences: [
      "RMQ task (Range Minimum Query - the smallest element in an interval)",
      "Longest increasing subsequence",
      "Search the subsegment with the maximum/minimum sum",
      "K-th order statistic in O(N)",
      "MEX task (Minimal Excluded element in an array)",
    ],
    "Game Theory": ["Games on arbitrary graphs", "Sprague-Grundy theorem. Nim"],
    Schedules: [
      "Scheduling jobs on one machine",
      "Scheduling jobs on two machines",
      "Optimal schedule of jobs given their deadlines and durations",
    ],
    Miscellaneous: [
      "Tortoise and Hare Algorithm (Linked List cycle detection)",
      "Josephus problem",
      "15 Puzzle Game: Existence Of The Solution",
      "The Stern-Brocot Tree and Farey Sequences",
    ],
  },
};

const Page = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl w-full p-8">
        {Object.keys(topics).map((category) => (
          <div key={category} className="mb-8">
            <h2 className="text-2xl font-bold text-gray-300 mb-4 cursor-pointer hover:text-purple-400">
              {category}
            </h2>
            {Object.keys(topics[category]).map((subCategory) => (
              <div key={subCategory} className="mb-6">
                <h3 className="text-xl font-semibold text-gray-400 mb-2">
                  {subCategory}
                </h3>
                <ul className="list-disc ml-8 space-y-2">
                  {topics[category][subCategory].map((item) => (
                    <li key={item}>
                      <Link
                        href="https://cp-algorithms.com/navigation.html" target="_blank"
                        className="text-purple-400 hover:underline"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;

// import React from "react";

// type TopicCategory = {
//   [key: string]: {
//     [subKey: string]: string[];
//   };
// };

// const topics: TopicCategory = {
//   Algebra: {
//     Fundamentals: [
//       "Binary Exponentiation",
//       "Euclidean algorithm for computing the greatest common divisor",
//       "Extended Euclidean Algorithm",
//       "Linear Diophantine Equations",
//       "Fibonacci Numbers",
//     ],
//     "Prime numbers": [
//       "Sieve of Eratosthenes",
//       "Linear Sieve",
//       "Primality tests",
//       "Integer factorization",
//     ],
//     "Number-theoretic functions": [
//       "Euler's totient function",
//       "Number of divisors / sum of divisors",
//     ],
//     "Modular arithmetic": [
//       "Modular Inverse",
//       "Linear Congruence Equation",
//       "Chinese Remainder Theorem",
//       "Garner's Algorithm",
//       "Factorial modulo p",
//       "Discrete Log",
//       "Primitive Root",
//       "Discrete Root",
//       "Montgomery Multiplication",
//     ],
//     "Number systems": ["Balanced Ternary", "Gray code"],
//     Miscellaneous: [
//       "Bit manipulation",
//       "Enumerating submasks of a bitmask",
//       "Arbitrary-Precision Arithmetic",
//       "Fast Fourier transform",
//       "Operations on polynomials and series", 
//       "Continued fractions",
//       "Factoring Exponentiation",
//     ],
//   },
//   "Data Structures": {
//     Fundamentals: ["Minimum Stack / Minimum Queue", "Sparse Table"],
//     Trees: [
//       "Disjoint Set Union",
//       "Fenwick Tree",
//       "Sqrt Decomposition",
//       "Segment Tree",
//       "Treap",
//       "Sqrt Tree",
//       "Randomized Heap",
//     ],
//     Advanced: ["Deleting from a data structure in O(T(n) log n)"],
//   },
//   "Dynamic Programming": {
//     "Introduction to Dynamic Programming": ["Knapsack Problem"],
//     "DP optimizations": ["Divide and Conquer DP", "Knuth's Optimization"],
//     Tasks: [
//       "Dynamic Programming on Broken Profile. Problem 'Parquet'",
//       "Finding the largest zero submatrix",
//     ],
//   },
//   "String Processing": {
//     Fundamentals: [
//       "String Hashing",
//       "Rabin-Karp for String Matching",
//       "Prefix function - Knuth-Morris-Pratt",
//       "Z-function",
//       "Suffix Array",
//       "Aho-Corasick algorithm",
//     ],
//     Advanced: ["Suffix Tree", "Suffix Automaton", "Lyndon factorization"],
//     Tasks: [
//       "Expression parsing",
//       "Manacher's Algorithm - Finding all sub-palindromes in O(N)",
//       "Finding repetitions",
//     ],
//   },
//   "Linear Algebra": {
//     Matrices: [
//       "Gauss & System of Linear Equations",
//       "Gauss & Determinant",
//       "Kraut & Determinant",
//       "Rank of a matrix",
//     ],
//   },
//   // Additional categories here...
// };

// const Page = () => {
//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
//       <div className="max-w-4xl w-full p-8">
//         {Object.keys(topics).map((category) => (
//           <div key={category} className="mb-8">
//             <h2 className="text-2xl font-bold text-gray-300 mb-4">
//               {category}
//             </h2>
//             {Object.keys(topics[category]).map((subCategory) => (
//               <div key={subCategory} className="mb-6">
//                 <h3 className="text-xl font-semibold text-gray-400 mb-2">
//                   {subCategory}
//                 </h3>
//                 <ul className="list-disc ml-8 space-y-2">
//                   {topics[category][subCategory].map((item) => (
//                     <li key={item}>
//                       <a href="#" className="text-purple-400 hover:underline">
//                         {item}
//                       </a>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Page;
