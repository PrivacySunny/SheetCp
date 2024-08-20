"use client";

import React, { useEffect, useState } from "react";

const Page = () => {
  const [error, setError] = useState<string | null>(null);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [selectedContestType, setSelectedContestType] = useState<string>("ABC");
  const [loading, setLoading] = useState<boolean>(true); // Added loading state

  interface Problem {
    name: string;
    id: string;
    contest_id: string;
    problem_index: string;
    rating: number;
    tags: string[];
  }

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "https://kenkoooo.com/atcoder/resources/problems.json"
        );

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();

        if (data) {
          setProblems(data);
        } else {
          throw new Error("API response is not in expected format");
        }
      } catch (error) {
        console.error("Error fetching problems:", error);
        setError((error as Error).message);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchProblems();
  }, []);

  const contestTypes = ["ABC", "ARC", "AHC", "AGC", "Other"];

  const filteredProblems = problems.filter((p) => {
    const contestPrefix = p.contest_id.slice(0, 3).toUpperCase();
    if (selectedContestType === "Other") {
      return !["ABC", "ARC", "AHC", "AGC"].includes(contestPrefix);
    }
    return contestPrefix === selectedContestType;
  });

  const contests = Array.from(
    new Set(filteredProblems.map((p) => p.contest_id))
  ).sort((a, b) => (a > b ? -1 : 1));

  return (
    <div className="p-4 bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-semibold mb-12 mt-12 text-white">
        AtCoder Contest Problems
      </h2>
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="loader border-t-transparent border-solid rounded-full border-blue-400 border-4 h-16 w-16 animate-spin"></div>
        </div>
      )}
      {!loading && (
        <>
          <div className="mb-12">
            {contestTypes.map((type, idx) => (
              <button
                key={idx}
                className={`py-2 px-4 mr-2 mb-2 ${
                  selectedContestType === type
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                } rounded transition-colors duration-200 ease-in-out`}
                onClick={() => setSelectedContestType(type)}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-900 border border-gray-200">
              <thead>
                <tr>
                  <th className="py-2 px-4 bg-gray-900 border-b text-white border-gray-300">
                    Contest
                  </th>
                  {["A", "B", "C", "D", "E", "F", "G", "H/Ex"].map(
                    (letter, idx) => (
                      <th
                        key={idx}
                        className="py-2 px-4 bg-gray-900 border-b text-white border-gray-300 border-r"
                      >
                        {letter}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {contests.map((contestId) => {
                  const contestProblems = filteredProblems.filter(
                    (problem) => problem.contest_id === contestId
                  );

                  return (
                    <tr key={contestId}>
                      <td
                        className="py-2 px-4 border-b border-gray-300 text-blue-500 uppercase border-r no-underline hover:underline"
                        id={contestId}
                      >
                        <a
                          href={`https://atcoder.jp/contests/${contestId.toLowerCase()}`}
                          target="_blank"
                        >
                          {contestId.toUpperCase()}
                        </a>
                      </td>
                      {["A", "B", "C", "D", "E", "F", "G", "H"].map((index) => {
                        const problem = contestProblems.find(
                          (p) => p.problem_index === index
                        );
                        return (
                          <td
                            key={index}
                            className="py-2 px-4 border-b border-gray-300 border-r"
                          >
                            {problem ? (
                              <a
                                href={`https://atcoder.jp/contests/${contestId.toLowerCase()}/tasks/${
                                  problem.id
                                }`}
                                target="_blank"
                                className={`inline-flex items-center px-2 no-underline hover:underline py-1 rounded-full text-sm font-medium ${getColorClass(
                                  problem.problem_index
                                )}`}
                              >
                                {problem.name}
                              </a>
                            ) : (
                              "—"
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

const getColorClass = (index: string) => {
  const colors: Record<string, string> = {
    A: "text-gray-700 bg-gray-200",
    B: "text-gray-700 bg-gray-300",
    C: "text-orange-500 bg-orange-100",
    D: "text-green-600 bg-green-100",
    E: "text-blue-500 bg-blue-100",
    F: "text-yellow-500 bg-yellow-100",
    G: "text-red-600 bg-red-100",
    H: "text-purple-600 bg-purple-100", 
    I: "text-pink-600 bg-pink-100",
    J: "text-teal-500 bg-teal-100",
    K: "text-indigo-500 bg-indigo-100",
  };
  return (
    (colors as Record<string, string>)[index] || "text-gray-500 bg-gray-100"
  );
};

export default Page;

// Contest linkable

// "use client";

// import React, { useEffect, useState } from "react";

// const Page = () => {
//   const [error, setError] = useState<string | null>(null);
//   const [problems, setProblems] = useState<Problem[]>([]);
//   const [selectedContestType, setSelectedContestType] = useState<string>("ABC");

//   interface Problem {
//     name: string;
//     id: string;
//     contest_id: string;
//     problem_index: string;
//     rating: number;
//     tags: string[];
//   }

//   useEffect(() => {
//     const fetchProblems = async () => {
//       try {
//         const res = await fetch(
//           "https://kenkoooo.com/atcoder/resources/problems.json"
//         );

//         if (!res.ok) {
//           throw new Error(`HTTP error! Status: ${res.status}`);
//         }

//         const data = await res.json();
//         console.log(data);

//         if (data) {
//           setProblems(data);
//         } else {
//           throw new Error("API response is not in expected format");
//         }
//       } catch (error) {
//         console.error("Error fetching problems:", error);
//         setError((error as Error).message);
//       }
//     };

//     fetchProblems();
//   }, []);

//   const contestTypes = ["ABC", "ARC", "AHC", "AGC", "Other"];

//   // Filter contests based on selected contest type
//   const filteredProblems = problems.filter((p) => {
//     const contestPrefix = p.contest_id.slice(0, 3).toUpperCase();
//     if (selectedContestType === "Other") {
//       return !["ABC", "ARC", "AHC", "AGC"].includes(contestPrefix);
//     }
//     return contestPrefix === selectedContestType;
//   });

//   // Group problems by contest ID
//   const contests = Array.from(
//     new Set(filteredProblems.map((p) => p.contest_id))
//   ).sort((a, b) => (a > b ? -1 : 1));

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-semibold mb-4">AtCoder Contest Problems</h2>
//       <div className="mb-4">
//         {contestTypes.map((type, idx) => (
//           <button
//             key={idx}
//             className={`py-2 px-4 mr-2 mb-2 ${
//               selectedContestType === type
//                 ? "bg-blue-500 text-white"
//                 : "bg-gray-200 text-gray-700"
//             } rounded transition-colors duration-200 ease-in-out`}
//             onClick={() => setSelectedContestType(type)}
//           >
//             {type}
//           </button>
//         ))}
//       </div>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-200">
//           <thead>
//             <tr>
//               <th className="py-2 px-2 bg-gray-100 border-b border-gray-300 text-center border-r border-gray-300">
//                 Contest
//               </th>
//               {["A", "B", "C", "D", "E", "F", "G", "H/Ex"].map(
//                 (letter, idx) => (
//                   <th
//                     key={idx}
//                     className="py-2 px-2 bg-gray-100 border-b border-gray-300 text-center border-r border-gray-300"
//                   >
//                     {letter}
//                   </th>
//                 )
//               )}
//             </tr>
//           </thead>
//           <tbody>
//             {contests.map((contestId) => {
//               const contestProblems = filteredProblems.filter(
//                 (problem) => problem.contest_id === contestId
//               );

//               return (
//                 <tr key={contestId}>
//                   <td
//                     className="py-1 px-2 border-b border-gray-300 text-blue-500 text-center border-r border-gray-300"
//                     id={contestId}
//                   >
//                     <a href={`#${contestId}`}>{contestId}</a>
//                   </td>
//                   {["A", "B", "C", "D", "E", "F", "G", "H"].map(
//                     (index, idx) => {
//                       const problem = contestProblems.find(
//                         (p) => p.problem_index === index
//                       );
//                       return (
//                         <td
//                           key={index}
//                           className="py-1 px-2 border-b border-gray-300 text-center border-r border-gray-300"
//                         >
//                           {problem ? (
//                             <a
//                               href={`https://atcoder.jp/contests/${problem.contest_id}/tasks/${problem.id}`}
//                               className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getColorClass(
//                                 problem.problem_index
//                               )}`}
//                             >
//                               {problem.name}
//                             </a>
//                           ) : (
//                             "—"
//                           )}
//                         </td>
//                       );
//                     }
//                   )}
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// // Function to determine the color class based on problem index
// const getColorClass = (index: string) => {
//   const colors = {
//     A: "text-gray-700 bg-gray-200",
//     B: "text-gray-700 bg-gray-300",
//     C: "text-orange-500 bg-orange-100",
//     D: "text-green-600 bg-green-100",
//     E: "text-blue-500 bg-blue-100",
//     F: "text-yellow-500 bg-yellow-100",
//     G: "text-red-600 bg-red-100",
//     H: "text-purple-600 bg-purple-100",
//     I: "text-pink-600 bg-pink-100",
//     J: "text-teal-500 bg-teal-100",
//     K: "text-indigo-500 bg-indigo-100",
//   };
//   return colors[index] || "text-gray-500 bg-gray-100";
// };

// export default Page;

// question linkable

// "use client";

// import React, { useEffect, useState } from "react";

// const Page = () => {
//   const [error, setError] = useState<string | null>(null);
//   const [problems, setProblems] = useState<Problem[]>([]);
//   const [selectedContestType, setSelectedContestType] = useState<string>("ABC");

//   interface Problem {
//     name: string;
//     id: string;
//     contest_id: string;
//     problem_index: string;
//     rating: number;
//     tags: string[];
//   }

//   useEffect(() => {
//     const fetchProblems = async () => {
//       try {
//         const res = await fetch(
//           "https://kenkoooo.com/atcoder/resources/problems.json"
//         );

//         if (!res.ok) {
//           throw new Error(`HTTP error! Status: ${res.status}`);
//         }

//         const data = await res.json();
//         console.log(data);

//         if (data) {
//           setProblems(data);
//         } else {
//           throw new Error("API response is not in expected format");
//         }
//       } catch (error) {
//         console.error("Error fetching problems:", error);
//         setError((error as Error).message);
//       }
//     };

//     fetchProblems();
//   }, []);

//   const contestTypes = ["ABC", "ARC", "AHC", "AGC", "Other"];

//   // Filter contests based on selected contest type
//   const filteredProblems = problems.filter((p) => {
//     const contestPrefix = p.contest_id.slice(0, 3).toUpperCase();
//     if (selectedContestType === "Other") {
//       return !["ABC", "ARC", "AHC", "AGC"].includes(contestPrefix);
//     }
//     return contestPrefix === selectedContestType;
//   });

//   // Group problems by contest ID
//   const contests = Array.from(
//     new Set(filteredProblems.map((p) => p.contest_id))
//   ).sort((a, b) => (a > b ? -1 : 1));

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-semibold mb-4">AtCoder Contest Problems</h2>
//       <div className="mb-4">
//         {contestTypes.map((type, idx) => (
//           <button
//             key={idx}
//             className={`py-2 px-4 mr-2 mb-2 ${
//               selectedContestType === type
//                 ? "bg-blue-500 text-white"
//                 : "bg-gray-200 text-gray-700"
//             } rounded transition-colors duration-200 ease-in-out`}
//             onClick={() => setSelectedContestType(type)}
//           >
//             {type}
//           </button>
//         ))}
//       </div>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-200">
//           <thead>
//             <tr>
//               <th className="py-2 px-2 bg-gray-100 border-b border-gray-300 text-center border-r border-gray-300">
//                 Contest
//               </th>
//               {["A", "B", "C", "D", "E", "F", "G", "H/Ex"].map(
//                 (letter, idx) => (
//                   <th
//                     key={idx}
//                     className="py-2 px-2 bg-gray-100 border-b border-gray-300 text-center border-r border-gray-300"
//                   >
//                     {letter}
//                   </th>
//                 )
//               )}
//             </tr>
//           </thead>
//           <tbody>
//             {contests.map((contestId) => {
//               const contestProblems = filteredProblems.filter(
//                 (problem) => problem.contest_id === contestId
//               );

//               return (
//                 <tr key={contestId}>
//                   <td
//                     className="py-1 px-2 border-b border-gray-300 text-blue-500 text-center border-r border-gray-300"
//                     id={contestId}
//                   >
//                     <a href={`#${contestId}`}>{contestId}</a>
//                   </td>
//                   {["A", "B", "C", "D", "E", "F", "G", "H"].map(
//                     (index, idx) => {
//                       const problem = contestProblems.find(
//                         (p) => p.problem_index === index
//                       );
//                       return (
//                         <td
//                           key={index}
//                           className="py-1 px-2 border-b border-gray-300 text-center border-r border-gray-300"
//                         >
//                           {problem ? (
//                             <a
//                               href={`#problem-${problem.id}`}
//                               className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getColorClass(
//                                 problem.problem_index
//                               )}`}
//                             >
//                               {problem.name}
//                             </a>
//                           ) : (
//                             "—"
//                           )}
//                         </td>
//                       );
//                     }
//                   )}
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// // Function to determine the color class based on problem index
// const getColorClass = (index: string) => {
//   const colors = {
//     A: "text-gray-700 bg-gray-200",
//     B: "text-gray-700 bg-gray-300",
//     C: "text-orange-500 bg-orange-100",
//     D: "text-green-600 bg-green-100",
//     E: "text-blue-500 bg-blue-100",
//     F: "text-yellow-500 bg-yellow-100",
//     G: "text-red-600 bg-red-100",
//     H: "text-purple-600 bg-purple-100",
//     I: "text-pink-600 bg-pink-100",
//     J: "text-teal-500 bg-teal-100",
//     K: "text-indigo-500 bg-indigo-100",
//   };
//   return colors[index] || "text-gray-500 bg-gray-100";
// };

// export default Page;

// after every two column

// "use client";

// import React, { useEffect, useState } from "react";

// const Page = () => {
//   const [error, setError] = useState<string | null>(null);
//   const [problems, setProblems] = useState<Problem[]>([]);
//   const [selectedContestType, setSelectedContestType] = useState<string>("ABC");

//   interface Problem {
//     name: string;
//     id: string;
//     contest_id: string;
//     problem_index: string;
//     rating: number;
//     tags: string[];
//   }

//   useEffect(() => {
//     const fetchProblems = async () => {
//       try {
//         const res = await fetch(
//           "https://kenkoooo.com/atcoder/resources/problems.json"
//         );

//         if (!res.ok) {
//           throw new Error(`HTTP error! Status: ${res.status}`);
//         }

//         const data = await res.json();
//         console.log(data);

//         if (data) {
//           setProblems(data);
//         } else {
//           throw new Error("API response is not in expected format");
//         }
//       } catch (error) {
//         console.error("Error fetching problems:", error);
//         setError((error as Error).message);
//       }
//     };

//     fetchProblems();
//   }, []);

//   const contestTypes = ["ABC", "ARC", "AHC", "AGC", "Other"];

//   // Filter contests based on selected contest type
//   const filteredProblems = problems.filter((p) => {
//     const contestPrefix = p.contest_id.slice(0, 3).toUpperCase();
//     if (selectedContestType === "Other") {
//       return !["ABC", "ARC", "AHC", "AGC"].includes(contestPrefix);
//     }
//     return contestPrefix === selectedContestType;
//   });

//   // Group problems by contest ID
//   const contests = Array.from(
//     new Set(filteredProblems.map((p) => p.contest_id))
//   ).sort((a, b) => (a > b ? -1 : 1));

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-semibold mb-4">AtCoder Contest Problems</h2>
//       <div className="mb-4">
//         {contestTypes.map((type, idx) => (
//           <button
//             key={idx}
//             className={`py-2 px-4 mr-2 mb-2 ${
//               selectedContestType === type
//                 ? "bg-blue-500 text-white"
//                 : "bg-gray-200 text-gray-700"
//             } rounded transition-colors duration-200 ease-in-out`}
//             onClick={() => setSelectedContestType(type)}
//           >
//             {type}
//           </button>
//         ))}
//       </div>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-200">
//           <thead>
//             <tr>
//               <th className="py-2 px-2 bg-gray-100 border-b border-gray-300 text-center">
//                 Contest
//               </th>
//               {["A", "B", "C", "D", "E", "F", "G", "H/Ex"].map(
//                 (letter, idx) => (
//                   <th
//                     key={idx}
//                     className={`py-2 px-2 bg-gray-100 border-b border-gray-300 text-center ${
//                       idx % 2 !== 0 ? "border-r border-gray-300" : ""
//                     }`}
//                   >
//                     {letter}
//                   </th>
//                 )
//               )}
//             </tr>
//           </thead>
//           <tbody>
//             {contests.map((contestId) => {
//               const contestProblems = filteredProblems.filter(
//                 (problem) => problem.contest_id === contestId
//               );

//               return (
//                 <tr key={contestId}>
//                   <td
//                     className="py-1 px-2 border-b border-gray-300 text-blue-500 text-center"
//                     id={contestId}
//                   >
//                     <a href={`#${contestId}`}>{contestId}</a>
//                   </td>
//                   {["A", "B", "C", "D", "E", "F", "G", "H"].map(
//                     (index, idx) => {
//                       const problem = contestProblems.find(
//                         (p) => p.problem_index === index
//                       );
//                       return (
//                         <td
//                           key={index}
//                           className={`py-1 px-2 border-b border-gray-300 text-center ${
//                             idx % 2 !== 0 ? "border-r border-gray-300" : ""
//                           }`}
//                         >
//                           {problem ? (
//                             <a
//                               href={`#problem-${problem.id}`}
//                               className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getColorClass(
//                                 problem.problem_index
//                               )}`}
//                             >
//                               {problem.name}
//                             </a>
//                           ) : (
//                             "—"
//                           )}
//                         </td>
//                       );
//                     }
//                   )}
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// // Function to determine the color class based on problem index
// const getColorClass = (index: string) => {
//   const colors = {
//     A: "text-gray-700 bg-gray-200",
//     B: "text-gray-700 bg-gray-300",
//     C: "text-orange-500 bg-orange-100",
//     D: "text-green-600 bg-green-100",
//     E: "text-blue-500 bg-blue-100",
//     F: "text-yellow-500 bg-yellow-100",
//     G: "text-red-600 bg-red-100",
//     H: "text-purple-600 bg-purple-100",
//     I: "text-pink-600 bg-pink-100",
//     J: "text-teal-500 bg-teal-100",
//     K: "text-indigo-500 bg-indigo-100",
//   };
//   return colors[index] || "text-gray-500 bg-gray-100";
// };

// export default Page;

// Second version line drawn above code

// "use client";

// import React, { useEffect, useState } from "react";

// const Page = () => {
//   const [error, setError] = useState<string | null>(null);
//   const [problems, setProblems] = useState<Problem[]>([]);
//   const [selectedContestType, setSelectedContestType] = useState<string>("ABC");

//   interface Problem {
//     name: string;
//     id: string;
//     contest_id: string;
//     problem_index: string;
//     rating: number;
//     tags: string[];
//   }

//   useEffect(() => {
//     const fetchProblems = async () => {
//       try {
//         const res = await fetch(
//           "https://kenkoooo.com/atcoder/resources/problems.json"
//         );

//         if (!res.ok) {
//           throw new Error(`HTTP error! Status: ${res.status}`);
//         }

//         const data = await res.json();
//         console.log(data);

//         if (data) {
//           setProblems(data);
//         } else {
//           throw new Error("API response is not in expected format");
//         }
//       } catch (error) {
//         console.error("Error fetching problems:", error);
//         setError((error as Error).message);
//       }
//     };

//     fetchProblems();
//   }, []);

//   const contestTypes = ["ABC", "ARC", "AHC", "AGC", "Other"];

//   // Filter contests based on selected contest type
//   const filteredProblems = problems.filter((p) => {
//     const contestPrefix = p.contest_id.slice(0, 3).toUpperCase();
//     if (selectedContestType === "Other") {
//       return !["ABC", "ARC", "AHC", "AGC"].includes(contestPrefix);
//     }
//     return contestPrefix === selectedContestType;
//   });

//   // Group problems by contest ID
//   const contests = Array.from(
//     new Set(filteredProblems.map((p) => p.contest_id))
//   ).sort((a, b) => (a > b ? -1 : 1));

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-semibold mb-4">AtCoder Contest Problems</h2>
//       <div className="mb-4">
//         {contestTypes.map((type, idx) => (
//           <button
//             key={idx}
//             className={`py-2 px-4 mr-2 mb-2 ${
//               selectedContestType === type
//                 ? "bg-blue-500 text-white"
//                 : "bg-gray-200 text-gray-700"
//             } rounded transition-colors duration-200 ease-in-out`}
//             onClick={() => setSelectedContestType(type)}
//           >
//             {type}
//           </button>
//         ))}
//       </div>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-200">
//           <thead>
//             <tr>
//               <th className="py-2 px-2 bg-gray-100 border-b border-gray-300 text-center">
//                 Contest
//               </th>
//               {["A", "B", "C", "D", "E", "F", "G", "H/Ex"].map(
//                 (letter, idx) => (
//                   <th
//                     key={idx}
//                     className="py-2 px-2 bg-gray-100 border-b border-gray-300 text-center"
//                   >
//                     {letter}
//                   </th>
//                 )
//               )}
//             </tr>
//           </thead>
//           <tbody>
//             {contests.map((contestId) => {
//               const contestProblems = filteredProblems.filter(
//                 (problem) => problem.contest_id === contestId
//               );

//               return (
//                 <tr key={contestId}>
//                   <td
//                     className="py-1 px-2 border-b border-gray-300 text-blue-500 text-center"
//                     id={contestId}
//                   >
//                     <a href={`#${contestId}`}>{contestId}</a>
//                   </td>
//                   {["A", "B", "C", "D", "E", "F", "G", "H"].map((index) => {
//                     const problem = contestProblems.find(
//                       (p) => p.problem_index === index
//                     );
//                     return (
//                       <td
//                         key={index}
//                         className="py-1 px-2 border-b border-gray-300 text-center"
//                       >
//                         {problem ? (
//                           <a
//                             href={`#problem-${problem.id}`}
//                             className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getColorClass(
//                               problem.problem_index
//                             )}`}
//                           >
//                             {problem.name}
//                           </a>
//                         ) : (
//                           "—"
//                         )}
//                       </td>
//                     );
//                   })}
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// // Function to determine the color class based on problem index
// const getColorClass = (index: string) => {
//   const colors = {
//     A: "text-gray-700 bg-gray-200",
//     B: "text-gray-700 bg-gray-300",
//     C: "text-orange-500 bg-orange-100",
//     D: "text-green-600 bg-green-100",
//     E: "text-blue-500 bg-blue-100",
//     F: "text-yellow-500 bg-yellow-100",
//     G: "text-red-600 bg-red-100",
//     H: "text-purple-600 bg-purple-100",
//     I: "text-pink-600 bg-pink-100",
//     J: "text-teal-500 bg-teal-100",
//     K: "text-indigo-500 bg-indigo-100",
//   };
//   return colors[index] || "text-gray-500 bg-gray-100";
// };

// export default Page;

// this is first version

// "use client";

// import React, { useEffect, useState } from "react";

// const Page = () => {
//   const [error, setError] = useState<string | null>(null);
//   const [problems, setProblems] = useState<Problem[]>([]);
//   const [selectedContestType, setSelectedContestType] = useState<string>("ABC");

//   interface Problem {
//     name: string;
//     id: string;
//     contest_id: string;
//     problem_index: string;
//     rating: number;
//     tags: string[];
//   }

//   useEffect(() => {
//     const fetchProblems = async () => {
//       try {
//         const res = await fetch(
//           "https://kenkoooo.com/atcoder/resources/problems.json"
//         );

//         if (!res.ok) {
//           throw new Error(`HTTP error! Status: ${res.status}`);
//         }

//         const data = await res.json();
//         console.log(data);

//         if (data) {
//           setProblems(data);
//         } else {
//           throw new Error("API response is not in expected format");
//         }
//       } catch (error) {
//         console.error("Error fetching problems:", error);
//         setError((error as Error).message);
//       }
//     };

//     fetchProblems();
//   }, []);

//   const contestTypes = ["ABC", "ARC", "AHC", "AGC", "Other"];

//   // Filter contests based on selected contest type
//   const filteredProblems = problems.filter((p) => {
//     const contestPrefix = p.contest_id.slice(0, 3).toUpperCase();
//     if (selectedContestType === "Other") {
//       return !["ABC", "ARC", "AHC", "AGC"].includes(contestPrefix);
//     }
//     return contestPrefix === selectedContestType;
//   });

//   // Group problems by contest ID
//   const contests = Array.from(
//     new Set(filteredProblems.map((p) => p.contest_id))
//   ).sort((a, b) => (a > b ? -1 : 1));

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-semibold mb-4">AtCoder Contest Problems</h2>
//       <div className="mb-4">
//         {contestTypes.map((type, idx) => (
//           <button
//             key={idx}
//             className={`py-2 px-4 mr-2 mb-2 ${
//               selectedContestType === type
//                 ? "bg-blue-500 text-white"
//                 : "bg-gray-200 text-gray-700"
//             } rounded transition-colors duration-200 ease-in-out`}
//             onClick={() => setSelectedContestType(type)}
//           >
//             {type}
//           </button>
//         ))}
//       </div>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-200">
//           <thead>
//             <tr>
//               <th className="py-2 px-4 bg-gray-100 border-b border-gray-300">
//                 Contest
//               </th>
//               {["A", "B", "C", "D", "E", "F", "G", "H/Ex"].map(
//                 (letter, idx) => (
//                   <th
//                     key={idx}
//                     className="py-2 px-4 bg-gray-100 border-b border-gray-300"
//                   >
//                     {letter}
//                   </th>
//                 )
//               )}
//             </tr>
//           </thead>
//           <tbody>
//             {contests.map((contestId) => {
//               const contestProblems = filteredProblems.filter(
//                 (problem) => problem.contest_id === contestId
//               );

//               return (
//                 <tr key={contestId}>
//                   <td
//                     className="py-2 px-4 border-b border-gray-300 text-blue-500"
//                     id={contestId}
//                   >
//                     <a href={`#${contestId}`}>{contestId}</a>
//                   </td>
//                   {["A", "B", "C", "D", "E", "F", "G", "H"].map((index) => {
//                     const problem = contestProblems.find(
//                       (p) => p.problem_index === index
//                     );
//                     return (
//                       <td
//                         key={index}
//                         className="py-2 px-4 border-b border-gray-300"
//                       >
//                         {problem ? (
//                           <a
//                             href={`#problem-${problem.id}`}
//                             className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${getColorClass(
//                               problem.problem_index
//                             )}`}
//                           >
//                             {problem.name}
//                           </a>
//                         ) : (
//                           "—"
//                         )}
//                       </td>
//                     );
//                   })}
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// // Function to determine the color class based on problem index
// const getColorClass = (index: string) => {
//   const colors = {
//     A: "text-gray-700 bg-gray-200",
//     B: "text-gray-700 bg-gray-300",
//     C: "text-orange-500 bg-orange-100",
//     D: "text-green-600 bg-green-100",
//     E: "text-blue-500 bg-blue-100",
//     F: "text-yellow-500 bg-yellow-100",
//     G: "text-red-600 bg-red-100",
//     H: "text-purple-600 bg-purple-100",
//     I: "text-pink-600 bg-pink-100",
//     J: "text-teal-500 bg-teal-100",
//     K: "text-indigo-500 bg-indigo-100",
//   };
//   return colors[index] || "text-gray-500 bg-gray-100";
// };

// export default Page;
