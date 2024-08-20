"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
interface Problem {
  id: number;
  name: string;
  resource: string;
  url: string;
  rating: string;
}

const CodeforcesProblems = () => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 20;

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://clist.by/api/v4/json/problem/", {
          method: "GET",
          headers: {
            Authorization:
              "ApiKey sanhayu546:016749fc8fb012bf8d067437bef5ef86409209d0", // Replace with your actual API token
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        if (Array.isArray(data.objects)) {
          setProblems(data.objects);
        } else {
          throw new Error("API response is not in expected format");
        }
      } catch (error) {
        console.error("Error fetching problems:", error);
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  const getResourceLogo = (resource: string) => {
    switch (resource) {
      case "hackerrank.com":
        return "https://upload.wikimedia.org/wikipedia/commons/6/65/HackerRank_logo.png";
      case "codeforces.com":
        return "https://art.npanuhin.me/SVG/Codeforces/Codeforces.colored.svg";
      case "leetcode.com":
        return "https://raw.githubusercontent.com/Kanawanagasaki/vsc-leetcode/master/images/logo.png";
      default:
        return "https://via.placeholder.com/50";
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = problems.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(problems.length / itemsPerPage);

  return (
    <div className="p-5 bg-gray-900 min-h-screen">
      <h1 className="text-center mb-8 text-2xl font-bold text-white">
        Problem List
      </h1>
      {error && <p className="text-red-500">Error: {error}</p>}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loader border-t-transparent border-solid rounded-full border-blue-400 border-4 h-16 w-16 animate-spin"></div>
        </div>
      ) : (
        <>
          <ul className="list-none p-0">
            {currentItems.map((problem: Problem) => (
              <li
                key={problem.id}
                className="flex items-center justify-between bg-gray-800 rounded-lg p-4 mb-4 shadow-lg"
              >
                <div className="flex items-center">
                  <img
                    src={getResourceLogo(problem.resource)}
                    alt={`${problem.resource} logo`}
                    className="w-12 h-12 mr-4 rounded-full"
                  />
                  <div>
                    <a
                      href={problem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 text-lg font-semibold hover:underline"
                    >
                      {problem.name}
                    </a>
                  </div>
                </div>
                <div>
                  <span className="inline-flex items-center rounded-md bg-green-10 px-2 py-1 text-sm font-medium text-green-500 ring-2 ring-inset ring-green-600/20">
                    Rating: {problem.rating}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <div className="text-center mt-5 flex justify-center items-center gap-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-800 text-white hover:bg-blue-700"
              }`}
            >
              Previous
            </button>
            <span className="text-lg text-white">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`p-2 rounded ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-800 text-white hover:bg-blue-700"
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CodeforcesProblems;

// Pagination Upadate ---------------------->

// "use client";

// import React, { useEffect, useState } from "react";

// interface Problem {
//   id: number;
//   event: string;
//   resource: string;
//   href: string;
//   start: string;
//   end: string;
// }

// interface Submission {
//   id: number;
//   contestId: number;
//   creationTimeSeconds: number;
//   problem: {
//     contestId: number;
//     index: string;
//     name: string;
//     type: string;
//     rating: number;
//     tags: string[];
//   };
//   programmingLanguage: string;
//   verdict: string;
//   passedTestCount: number;
//   timeConsumedMillis: number;
//   memoryConsumedBytes: number;
// }

// const CodeforcesProblems = () => {
//   const [problems, setProblems] = useState<Problem[]>([]);
//   const [submissions, setSubmissions] = useState<Submission[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [loadingProblems, setLoadingProblems] = useState<boolean>(true);
//   const [loadingSubmissions, setLoadingSubmissions] = useState<boolean>(false);
//   const [handle, setHandle] = useState<string>("");

//   // Fetch problems data from the first API
//   useEffect(() => {
//     const fetchProblems = async () => {
//       try {
//         setLoadingProblems(true);
//         const res = await fetch("https://clist.by/api/v4/json/problem/", {
//           method: "GET",
//           headers: {
//             Authorization:
//               "ApiKey sanhayu546:016749fc8fb012bf8d067437bef5ef86409209d0", // Replace with your API key
//           },
//         });

//         if (!res.ok) {
//           throw new Error(`HTTP error! Status: ${res.status}`);
//         }

//         const data = await res.json();
//         if (Array.isArray(data.objects)) {
//           setProblems(data.objects);
//         } else {
//           throw new Error("API response is not in expected format");
//         }
//       } catch (error) {
//         console.error("Error fetching problems:", error);
//         setError((error as Error).message);
//       } finally {
//         setLoadingProblems(false);
//       }
//     };

//     fetchProblems();
//   }, []);

//   // Fetch user submissions data when handle is provided
//   useEffect(() => {
//     const fetchSubmissions = async () => {
//       if (handle) {
//         try {
//           setLoadingSubmissions(true);
//           const res = await fetch(
//             `https://codeforces.com/api/user.status?handle=${handle}`
//           );

//           if (!res.ok) {
//             throw new Error(`HTTP error! Status: ${res.status}`);
//           }

//           const data = await res.json();

//           if (data.result && Array.isArray(data.result)) {
//             setSubmissions(data.result);
//           } else {
//             throw new Error("API response is not in expected format");
//           }
//         } catch (error) {
//           console.error("Error fetching submissions:", error);
//           setError((error as Error).message);
//         } finally {
//           setLoadingSubmissions(false);
//         }
//       }
//     };

//     fetchSubmissions();
//   }, [handle]);

//   const getResourceLogo = (resource: string) => {
//     switch (resource) {
//       case "hackerrank.com":
//         return "https://upload.wikimedia.org/wikipedia/commons/6/65/HackerRank_logo.png";
//       case "codeforces.com":
//         return "https://art.npanuhin.me/SVG/Codeforces/Codeforces.colored.svg";
//       case "leetcode.com":
//         return "https://raw.githubusercontent.com/Kanawanagasaki/vsc-leetcode/master/images/logo.png";
//       default:
//         return "https://via.placeholder.com/50";
//     }
//   };

//   return (
//     <div className="p-5 bg-gray-900 min-h-screen">
//       <h1 className="text-center mb-8 text-2xl font-bold text-white">
//         Problem List
//       </h1>
//       {error && <p className="text-red-500">Error: {error}</p>}
// <div className="mt-8">
//             <h2 className="text-xl font-semibold text-white mb-4">
//               User Submissions
//             </h2>
//             <div className="flex items-center mb-6">
//               <input
//                 type="text"
//                 value={handle}
//                 onChange={(e) => setHandle(e.target.value)}
//                 placeholder="Enter user handle"
//                 className="border border-gray-300 rounded-lg p-2 flex-grow"
//               />
//             </div>

//             {loadingSubmissions && (
//               <div className="flex justify-center items-center h-64">
//                 <div className="loader border-t-transparent border-solid rounded-full border-blue-400 border-4 h-16 w-16 animate-spin"></div>
//               </div>
//             )}

//             {!loadingSubmissions && submissions.length > 0 && (
//               <ul className="list-none p-0">
//                 {submissions.map((submission) => (
//                   <li
//                     key={submission.id}
//                     className="flex items-center justify-between bg-gray-800 rounded-lg p-4 mb-4 shadow-lg"
//                   >
//                     <div>
//                       <h2 className="text-lg font-semibold text-white">
//                         {submission.problem.name} ({submission.problem.index})
//                       </h2>
//                       <p className="text-white">
//                         Contest ID: {submission.contestId}
//                       </p>
//                       <p className="text-white">
//                         Rating: {submission.problem.rating}
//                       </p>
//                       <p className="text-white">
//                         Language: {submission.programmingLanguage}
//                       </p>
//                       <p className="text-white">
//                         Verdict: {submission.verdict}
//                       </p>
//                       <p className="text-white">
//                         Passed Tests: {submission.passedTestCount}
//                       </p>
//                       <p className="text-white">
//                         Time Consumed: {submission.timeConsumedMillis} ms
//                       </p>
//                       <p className="text-white">
//                         Memory Consumed: {submission.memoryConsumedBytes / 1024}{" "}
//                         KB
//                       </p>
//                       <p className="text-white">
//                         Tags: {submission.problem.tags.join(", ")}
//                       </p>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>

//       {loadingProblems && (
//         <div className="flex justify-center items-center h-64">
//           <div className="loader border-t-transparent border-solid rounded-full border-blue-400 border-4 h-16 w-16 animate-spin"></div>
//         </div>
//       )}
//       {!loadingProblems && (
//         <>
//           <ul className="list-none p-0">
//             {problems.map((problem) => (
//               <li
//                 key={problem.id}
//                 className="flex items-center justify-between bg-gray-800 rounded-lg p-4 mb-4 shadow-lg"
//               >
//                 <div className="flex items-center">
//                   <img
//                     src={getResourceLogo(problem.resource)}
//                     alt={`${problem.resource} logo`}
//                     className="w-12 h-12 mr-4 rounded-full"
//                   />
//                   <div>
//                     <a
//                       href={problem.href}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-500 text-lg font-semibold hover:underline"
//                     >
//                       {problem.event}
//                     </a>
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//           {/* User Submissions Section */}
//         </>
//       )}
//     </div>
//   );
// };

// export default CodeforcesProblems;

// First Update ---------------------------->

// "use client";

// import React, { useEffect, useState } from "react";

// interface Problem {
//   id: number;
//   event: string;
//   resource: string;
//   href: string;
//   start: string;
//   end: string;
// }

// const CodeforcesProblems = () => {
//   const [problems, setProblems] = useState([]);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(true); // Added loading state

//   useEffect(() => {
//     const fetchProblems = async () => {
//       try {
//         setLoading(true); // Start loading
//         const res = await fetch("https://clist.by/api/v4/json/problem/", {
//           method: "GET",
//           headers: {
//             Authorization:
//               "ApiKey sanhayu546:016749fc8fb012bf8d067437bef5ef86409209d0", // Replace with your actual API token
//           },
//         });

//         if (!res.ok) {
//           throw new Error(`HTTP error! Status: ${res.status}`);
//         }

//         const data = await res.json();
//         // console.log(data.objects); // Log the response to inspect its structure

//         // Check if data.objects is an array before setting state
//         if (Array.isArray(data.objects)) {
//           setProblems(data.objects);
//         } else {
//           throw new Error("API response is not in expected format");
//         }
//       } catch (error) {
//         console.error("Error fetching problems:", error);
//         setError((error as Error).message);
//       } finally {
//         setLoading(false); // Stop loading
//       }
//     };

//     fetchProblems();
//   }, []);

//   const getResourceLogo = (resource: any) => {
//     switch (resource) {
//       case "hackerrank.com":
//         return "https://upload.wikimedia.org/wikipedia/commons/6/65/HackerRank_logo.png";
//       case "codeforces.com":
//         return "https://art.npanuhin.me/SVG/Codeforces/Codeforces.colored.svg";
//       case "leetcode.com":
//         return "https://raw.githubusercontent.com/Kanawanagasaki/vsc-leetcode/master/images/logo.png";

//       // Add more cases for other resources if needed
//       default:
//         return "https://via.placeholder.com/50"; // Placeholder image
//     }
//   };
//   return (
//     <div className="p-5 bg-gray-900 min-h-screen">
//       <h1 className="text-center mb-8 text-2xl font-bold">Problem List</h1>
//       {error && <p className="text-red-500">Error: {error}</p>}
//       {loading && (
//         <div className="flex justify-center items-center h-64">
//           <div className="loader border-t-transparent border-solid rounded-full border-blue-400 border-4 h-16 w-16 animate-spin"></div>
//         </div>
//       )}
//       {!loading && (
//         <>
//           <ul className="list-none p-0">
//             {problems.map((problem: any) => (
//               <li
//                 key={problem.id}
//                 className="flex items-center justify-between bg-gray-800 rounded-lg p-4 mb-4 shadow-lg"
//               >
//                 <div className="flex items-center">
//                   <img
//                     src={getResourceLogo(problem.resource)}
//                     alt={`${problem.resource} logo`}
//                     className="w-12 h-12 mr-4 rounded-full"
//                   />
//                   <div>
//                     <a
//                       href={problem.url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-500 text-lg font-semibold hover:underline"
//                     >
//                       {problem.name}
//                     </a>
//                     {/* <p className="mt-1 text-gray-600">
//                 Resource: {problem.resource}
//               </p> */}
//                   </div>
//                 </div>
//                 <div>
//                   <span className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm">
//                     Rating: {problem.rating}
//                   </span>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </>
//       )}
//     </div>
//   );
// };

// export default CodeforcesProblems;
