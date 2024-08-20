// Codeforces



// Fetching User INfo---------------------------->

// "use client";

// import React, { useEffect, useState } from "react";

// const Codeforces = () => {
//   const [problems, setProblems] = useState<Problem[]>([]);
//   const [filteredProblems, setFilteredProblems] = useState<Problem[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [submissionData, setSubmissionData] = useState<Submission[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [selectedRating, setSelectedRating] = useState<number | null>(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedTags, setSelectedTags] = useState<string[]>([]);
//   const [checkedProblem, setCheckedProblem] = useState<string | null>(null);
//   const [handle, setHandle] = useState("");
//   const itemsPerPage = 20;

//   interface Problem {
//     name: string;
//     id: number;
//     contestId: number;
//     index: string;
//     rating: number;
//     tags: string[];
//     verdict?: string | null; // Optional verdict field for color-coding
//   }

//   interface Submission {
//     id: number;
//     verdict: string;
//     problem: {
//       contestId: number;
//       index: string;
//     };
//   }

//   useEffect(() => {
//     const fetchProblems = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(
//           "https://codeforces.com/api/problemset.problems"
//         );

//         if (!res.ok) {
//           throw new Error(`HTTP error! Status: ${res.status}`);
//         }

//         const data = await res.json();

//         if (data.result && data.result.problems) {
//           setProblems(data.result.problems);
//           setFilteredProblems(data.result.problems);
//         } else {
//           throw new Error("API response is not in expected format");
//         }
//       } catch (error) {
//         console.error("Error fetching problems:", error);
//         setError((error as Error).message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProblems();
//   }, []);

//   const fetchSubmission = async () => {
//     if (!handle) {
//       setSubmissionData([]);
//       filterProblems([]);
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await fetch(
//         `https://codeforces.com/api/user.status?handle=${handle}`
//       );

//       if (!res.ok) {
//         throw new Error(`HTTP error! Status: ${res.status}`);
//       }

//       const data = await res.json();

//       if (data.result) {
//         console.log("Submissions Data:", data.result); // Debugging line
//         setSubmissionData(data.result);
//         filterProblems(data.result);
//       } else {
//         throw new Error("API response is not in expected format");
//       }
//     } catch (error) {
//       console.error("Error fetching submissions:", error);
//       setError((error as Error).message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filterProblems = (submissions: Submission[]) => {
//     let filtered = problems;

//     if (selectedRating !== null) {
//       filtered = filtered.filter(
//         (problem) => problem.rating === selectedRating
//       );
//     }

//     if (searchQuery) {
//       filtered = filtered.filter((problem) =>
//         problem.name.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     if (selectedTags.length > 0) {
//       filtered = filtered.filter((problem) =>
//         selectedTags.every((tag) => problem.tags.includes(tag))
//       );
//     }

//     // Map through problems to set verdict color
//     const problemVerdicts = new Map<string, string>();
//     submissions.forEach((submission) => {
//       const key = `${submission.problem.contestId}-${submission.problem.index}`;
//       if (!problemVerdicts.has(key)) {
//         problemVerdicts.set(key, submission.verdict);
//       }
//     });

//     filtered = filtered.map((problem) => {
//       const key = `${problem.contestId}-${problem.index}`;
//       return {
//         ...problem,
//         verdict: problemVerdicts.get(key) || null,
//       };
//     });

//     setFilteredProblems(filtered);
//     setCurrentPage(1);
//   };
//   const handleClear = () => {
//     setSearchQuery("");
//     setSelectedTags([]); // Clear the selected tags
//     setSelectedRating(null);
//     setHandle("");
//     setSubmissionData([]);
//     filterProblems(submissionData); // Reset the filtered problems to include all problems
//   };

//   const handleTagChange = (tag: string) => {
//     setSelectedTags((prevTags) =>
//       prevTags.includes(tag)
//         ? prevTags.filter((t) => t !== tag)
//         : [...prevTags, tag]
//     );
//   };

//   const handleSearch = () => {
//     filterProblems(submissionData);
//   };

//   useEffect(() => {
//     filterProblems(submissionData);
//   }, [selectedRating, problems, selectedTags]);

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentItems = filteredProblems.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );

//   const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);

//   const uniqueTags = Array.from(
//     problems.flatMap((problem) => problem.tags)
//   ).filter((tag, index, self) => self.indexOf(tag) === index);

//   const handleCheckboxChange = (problemName: string) => {
//     setCheckedProblem((prev) => (prev === problemName ? null : problemName));
//   };

//   const getButtonColor = (rating: number) => {
//     if (rating < 1200) return "bg-gray-400";
//     if (rating <= 1300) return "bg-green-400";
//     if (rating <= 1500) return "bg-cyan-300";
//     if (rating <= 1800) return "bg-blue-500";
//     if (rating <= 2100) return "bg-purple-400";
//     if (rating <= 2300) return "bg-orange-200";
//     if (rating <= 2400) return "bg-orange-400";
//     if (rating <= 2600) return "bg-red-400";
//     if (rating <= 3000) return "bg-red-700";
//     return "bg-red-200";
//   };

//   const getVerdictColor = (verdict: string | null) => {
//     if (verdict === "OK") return "bg-green-500";
//     if (verdict === "WRONG_ANSWER") return "bg-red-500";
//     return "bg-gray-100"; // Default color for unsolved problems
//   };

//   return (
//     <div className="p-5 bg-gray-900 min-h-screen">
//       <h1 className="text-center mb-8 text-2xl font-bold text-white">
//         Codeforces Problems
//       </h1>
//       {error && <p className="text-red-500">Error: {error}</p>}

//       {/* Loader */}
//       {loading && (
//         <div className="flex justify-center items-center h-64">
//           <div className="loader border-t-transparent border-solid rounded-full border-blue-400 border-4 h-16 w-16 animate-spin"></div>
//         </div>
//       )}

//       {!loading && (
//         <>
//           {/* Search and Fetch Buttons */}
//           <div className="mb-5 text-center flex flex-col items-center">
//             <div className="flex flex-col md:flex-row items-center justify-center mb-4">
//               <input
//                 type="text"
//                 placeholder="CF handle..."
//                 value={handle}
//                 onChange={(e) => setHandle(e.target.value)}
//                 className="p-2 w-full md:w-72 rounded border border-gray-300 mb-2 md:mb-0"
//               />
//               <button
//                 onClick={fetchSubmission}
//                 className="p-2 md:ml-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
//               >
//                 Search CF
//               </button>
//               <button
//                 onClick={handleClear}
//                 className="p-2 md:ml-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
//               >
//                 Clear
//               </button>
//             </div>

//             <input
//               type="text"
//               placeholder="Search problems..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="p-2 w-full md:w-72 rounded border border-gray-300 mb-2 mt-4"
//             />
//             <button
//               onClick={handleSearch}
//               className="p-2 ml-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
//             >
//               Search
//             </button>

//             {/* Tag Checkboxes */}
//             <div className="mt-4 flex flex-wrap justify-center gap-2">
//               {uniqueTags.map((tag) => (
//                 <label key={tag} className="inline-flex items-center mr-4">
//                   <input
//                     type="checkbox"
//                     checked={selectedTags.includes(tag)}
//                     onChange={() => handleTagChange(tag)}
//                     className="form-checkbox"
//                   />
//                   <span className="ml-2 text-white">{tag}</span>
//                 </label>
//               ))}
//             </div>

//             {/* Rating Buttons */}
//             <div className="flex flex-wrap justify-center gap-2 mt-4">
//               {[
//                 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800,
//                 1900, 2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800,
//                 2900,
//               ].map((rating) => (
//                 <button
//                   key={rating}
//                   onClick={() => setSelectedRating(rating)}
//                   className={`w-24 p-2 rounded transition ${
//                     selectedRating === rating
//                       ? "bg-blue-600 text-white"
//                       : `${getButtonColor(rating)} text-black hover:bg-blue-500`
//                   }`}
//                 >
//                   {rating}
//                 </button>
//               ))}
//               <button
//                 onClick={() => setSelectedRating(null)}
//                 className={`p-2 rounded transition ${
//                   selectedRating === null
//                     ? "bg-blue-600 text-white"
//                     : "bg-gray-300 text-black hover:bg-gray-400"
//                 }`}
//               >
//                 All Ratings
//               </button>
//             </div>
//           </div>

//           {/* Problem List */}
//           <ul className="list-none p-0 mt-5 space-y-2">
//             {currentItems.map((problem: any) => (
//               <li
//                 key={problem.id}
//                 className={`flex flex-col md:flex-row items-center justify-between ${getVerdictColor(
//                   problem.verdict
//                 )} hover:bg-gray-900 shadow p-4 rounded border transition ${
//                   checkedProblem === problem.name
//                     ? "bg-green-400"
//                     : "bg-gray-800"
//                 }`}
//               >
//                 <div className="flex items-center">
//                   <input
//                     type="checkbox"
//                     checked={checkedProblem === problem.name}
//                     onChange={() => handleCheckboxChange(problem.name)}
//                     className="mr-4"
//                   />
//                   <div className="flex md:flex-row items-center">
//                     <span className="inline-block bg-gray-400 text-gray-800 py-1 px-2 rounded text-sm mr-3">
//                       {problem.index}
//                     </span>
//                     <div>
//                       <a
//                         href={`https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-300 text-lg font-semibold hover:text-purple-700"
//                       >
//                         {problem.name}
//                       </a>
//                       <div className="mt-1">
//                         {problem.tags.map((tag: any) => (
//                           <span
//                             key={tag}
//                             className="bg-green-300 text-gray-700 py-1 px-2 rounded text-xs mr-2"
//                           >
//                             {tag}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="mt-2 md:mt-0">
//                   <span className="bg-blue-600 text-white py-1 px-3 rounded text-sm">
//                     Rating: {problem.rating || "N/A"}
//                   </span>
//                 </div>
//               </li>
//             ))}
//           </ul>

//           {/* Pagination */}
//           <div className="text-center mt-5 flex-col items-center gap-2 md:flex-row md:gap-4">
//             <button
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//               className={`p-2 rounded mr-2 ${
//                 currentPage === 1
//                   ? "bg-gray-100 text-gray-900 cursor-not-allowed"
//                   : "bg-blue-800 text-white hover:bg-blue-700"
//               }`}
//             >
//               Previous
//             </button>
//             <span className="mx-4 text-lg text-white">
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               onClick={() =>
//                 setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//               }
//               disabled={currentPage === totalPages}
//               className={`p-2 rounded ml-2 ${
//                 currentPage === totalPages
//                   ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                   : "bg-blue-600 text-white hover:bg-blue-700"
//               }`}
//             >
//               Next
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Codeforces;

// Multiple Tagged add ---------------------->

// "use client";

// import React, { useEffect, useState } from "react";

// const Codeforces = () => {
//   const [problems, setProblems] = useState<Problem[]>([]);
//   const [filteredProblems, setFilteredProblems] = useState<Problem[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [submissionData, setSubmissionData] = useState<Submission[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [selectedRating, setSelectedRating] = useState<number | null>(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedTag, setSelectedTag] = useState<string | null>(null);
//   const [checkedProblem, setCheckedProblem] = useState<string | null>(null);
//   const [handle, setHandle] = useState("");
//   const itemsPerPage = 20;

//   interface Problem {
//     name: string;
//     id: number;
//     contestId: number;
//     index: string;
//     rating: number;
//     tags: string[];
//     verdict?: string | null; // Optional verdict field for color-coding
//   }

//   interface Submission {
//     id: number;
//     verdict: string;
//     problem: {
//       contestId: number;
//       index: string;
//     };
//   }

//   useEffect(() => {
//     const fetchProblems = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(
//           "https://codeforces.com/api/problemset.problems"
//         );

//         if (!res.ok) {
//           throw new Error(`HTTP error! Status: ${res.status}`);
//         }

//         const data = await res.json();

//         if (data.result && data.result.problems) {
//           setProblems(data.result.problems);
//           setFilteredProblems(data.result.problems);
//         } else {
//           throw new Error("API response is not in expected format");
//         }
//       } catch (error) {
//         console.error("Error fetching problems:", error);
//         setError((error as Error).message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProblems();
//   }, []);

//   const fetchSubmission = async () => {
//     if (!handle) {
//       setSubmissionData([]);
//       filterProblems([]);
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await fetch(
//         `https://codeforces.com/api/user.status?handle=${handle}`
//       );

//       if (!res.ok) {
//         throw new Error(`HTTP error! Status: ${res.status}`);
//       }

//       const data = await res.json();

//       if (data.result) {
//         console.log("Submissions Data:", data.result); // Debugging line
//         setSubmissionData(data.result);
//         filterProblems(data.result);
//       } else {
//         throw new Error("API response is not in expected format");
//       }
//     } catch (error) {
//       console.error("Error fetching submissions:", error);
//       setError((error as Error).message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filterProblems = (submissions: Submission[]) => {
//     let filtered = problems;

//     if (selectedRating !== null) {
//       filtered = filtered.filter(
//         (problem) => problem.rating === selectedRating
//       );
//     }

//     if (searchQuery) {
//       filtered = filtered.filter((problem) =>
//         problem.name.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     if (selectedTag) {
//       filtered = filtered.filter((problem) =>
//         problem.tags.includes(selectedTag)
//       );
//     }

//     // Map through problems to set verdict color
//     const problemVerdicts = new Map<string, string>();
//     submissions.forEach((submission) => {
//       const key = `${submission.problem.contestId}-${submission.problem.index}`;
//       if (!problemVerdicts.has(key)) {
//         problemVerdicts.set(key, submission.verdict);
//       }
//     });

//     filtered = filtered.map((problem) => {
//       const key = `${problem.contestId}-${problem.index}`;
//       return {
//         ...problem,
//         verdict: problemVerdicts.get(key) || null,
//       };
//     });

//     setFilteredProblems(filtered);
//     setCurrentPage(1);
//   };

//   const handleSearch = () => {
//     filterProblems(submissionData);
//   };

//   useEffect(() => {
//     filterProblems(submissionData);
//   }, [selectedRating, problems, selectedTag]);

//   const handleClear = () => {
//     setSearchQuery("");
//     setSelectedTag(null);
//     setSelectedRating(null);
//     setHandle("");
//     filterProblems(submissionData); // Reset the filtered problems to include all problems
//   };

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentItems = filteredProblems.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );

//   const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);

//   const uniqueTags = Array.from(
//     problems.flatMap((problem) => problem.tags)
//   ).filter((tag, index, self) => self.indexOf(tag) === index);

//   const handleCheckboxChange = (problemName: string) => {
//     setCheckedProblem((prev) => (prev === problemName ? null : problemName));
//   };

//   const getButtonColor = (rating: number) => {
//     if (rating < 1200) return "bg-gray-400";
//     if (rating <= 1300) return "bg-green-400";
//     if (rating <= 1500) return "bg-cyan-300";
//     if (rating <= 1800) return "bg-blue-500";
//     if (rating <= 2100) return "bg-purple-400";
//     if (rating <= 2300) return "bg-orange-200";
//     if (rating <= 2400) return "bg-orange-400";
//     if (rating <= 2600) return "bg-red-400";
//     if (rating <= 3000) return "bg-red-700";
//     return "bg-red-200";
//   };

//   const getVerdictColor = (verdict: string | null) => {
//     if (verdict === "OK") return "bg-green-500";
//     if (verdict === "WRONG_ANSWER") return "bg-red-500";
//     return "bg-gray-100"; // Default color for unsolved problems
//   };

//   return (
//     <div className="p-5 bg-gray-900 min-h-screen">
//       <h1 className="text-center mb-8 text-2xl font-bold text-white">
//         Codeforces Problems
//       </h1>
//       {error && <p className="text-red-500">Error: {error}</p>}

//       {/* Loader */}
//       {loading && (
//         <div className="flex justify-center items-center h-64">
//           <div className="loader border-t-transparent border-solid rounded-full border-blue-400 border-4 h-16 w-16 animate-spin"></div>
//         </div>
//       )}

//       {!loading && (
//         <>
//           {/* Search and Fetch Buttons */}
//           <div className="mb-5 text-center">
//             <div className="flex items-center justify-center">
//               <input
//                 type="text"
//                 placeholder="CF handle..."
//                 value={handle}
//                 onChange={(e) => setHandle(e.target.value)}
//                 className="p-2 w-72 rounded border border-gray-300 mb-0"
//               />
//               <button
//                 onClick={fetchSubmission}
//                 className="p-2 ml-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
//               >
//                 Fetch Submissions
//               </button>
//               <button
//                 onClick={handleClear}
//                 className="p-2 ml-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
//               >
//                 Clear
//               </button>
//             </div>

//             <input
//               type="text"
//               placeholder="Search problems..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="p-2 w-72 rounded border border-gray-300 mb-2 mt-4"
//             />
//             <button
//               onClick={handleSearch}
//               className="p-2 ml-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
//             >
//               Search
//             </button>

//             {/* Tag Dropdown */}
//             <div className="mt-4">
//               <select
//                 value={selectedTag || ""}
//                 onChange={(e) => setSelectedTag(e.target.value)}
//                 className="p-2 w-52 bg-gray-900 text-white rounded border border-gray-300"
//               >
//                 <option value="">All Tags</option>
//                 {uniqueTags.map((tag) => (
//                   <option key={tag} value={tag}>
//                     {tag}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* Rating Filter Buttons */}
//           <div className="mb-5">
//             <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-2">
//               {[
//                 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800,
//                 1900, 2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800,
//                 2900,
//               ].map((rating) => (
//                 <button
//                   key={rating}
//                   onClick={() => setSelectedRating(rating)}
//                   className={`w-24 p-2 rounded transition ${
//                     selectedRating === rating
//                       ? "bg-blue-600 text-white"
//                       : `${getButtonColor(rating)} text-black hover:bg-blue-500`
//                   }`}
//                 >
//                   {rating}
//                 </button>
//               ))}
//               <button
//                 onClick={() => setSelectedRating(null)}
//                 className={`p-2 rounded transition ${
//                   selectedRating === null
//                     ? "bg-blue-600 text-white"
//                     : "bg-gray-300 text-black hover:bg-gray-400"
//                 }`}
//               >
//                 All Ratings
//               </button>
//             </div>
//           </div>

//           {/* Problem List */}
//           <ul className="list-none p-0 mt-11">
//             {currentItems.map((problem: any) => (
//               <li
//                 key={problem.id}
//                 className={`flex items-center justify-between ${getVerdictColor(
//                   problem.verdict
//                 )} hover:bg-gray-900 shadow p-4 mb-2 rounded border transition ${
//                   checkedProblem === problem.name
//                     ? "bg-green-400"
//                     : "bg-gray-800"
//                 } hover:bg-gray-900 hover:border-blue-900`}
//               >
//                 <div className="flex items-center">
//                   <input
//                     type="checkbox"
//                     checked={checkedProblem === problem.name}
//                     onChange={() => handleCheckboxChange(problem.name)}
//                     className="mr-4"
//                   />
//                   <div className="flex items-center">
//                     <span className="inline-block bg-gray-400 text-gray-800 py-1 px-2 rounded text-sm mr-3">
//                       {problem.index}
//                     </span>
//                     <div>
//                       <a
//                         href={`https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-300 text-lg font-semibold hover:text-purple-700"
//                       >
//                         {problem.name}
//                       </a>
//                       <div className="mt-1">
//                         {problem.tags.map((tag: any) => (
//                           <span
//                             key={tag}
//                             className="bg-green-300 text-gray-700 py-1 px-2 rounded text-xs mr-1"
//                           >
//                             {tag}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div>
//                   <span className="bg-blue-600 text-white py-1 px-3 rounded text-sm">
//                     Rating: {problem.rating || "N/A"}
//                   </span>
//                 </div>
//               </li>
//             ))}
//           </ul>

//           {/* Pagination */}
//           <div className="text-center mt-5">
//             <button
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//               className={`p-2 rounded mr-2 ${
//                 currentPage === 1
//                   ? "bg-gray-100 text-gray-900 cursor-not-allowed"
//                   : "bg-blue-800 text-white hover:bg-blue-700"
//               }`}
//             >
//               Previous
//             </button>
//             <span className="mx-4 text-lg text-white">
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               onClick={() =>
//                 setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//               }
//               disabled={currentPage === totalPages}
//               className={`p-2 rounded ml-2 ${
//                 currentPage === totalPages
//                   ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                   : "bg-blue-600 text-white hover:bg-blue-700"
//               }`}
//             >
//               Next
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Codeforces;

// Adding Clear Buttong ----------------------->

// "use client";

// import React, { useEffect, useState } from "react";

// const Codeforces = () => {
//   const [problems, setProblems] = useState<Problem[]>([]);
//   const [filteredProblems, setFilteredProblems] = useState<Problem[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [submissionData, setSubmissionData] = useState<Submission[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [selectedRating, setSelectedRating] = useState<number | null>(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedTag, setSelectedTag] = useState<string | null>(null);
//   const [checkedProblem, setCheckedProblem] = useState<string | null>(null);
//   const [handle, setHandle] = useState("");
//   const itemsPerPage = 20;

//   interface Problem {
//     name: string;
//     id: number;
//     contestId: number;
//     index: string;
//     rating: number;
//     tags: string[];
//     verdict?: string | null; // Optional verdict field for color-coding
//   }

//   interface Submission {
//     id: number;
//     verdict: string;
//     problem: {
//       contestId: number;
//       index: string;
//     };
//   }

//   useEffect(() => {
//     const fetchProblems = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(
//           "https://codeforces.com/api/problemset.problems"
//         );

//         if (!res.ok) {
//           throw new Error(`HTTP error! Status: ${res.status}`);
//         }

//         const data = await res.json();

//         if (data.result && data.result.problems) {
//           setProblems(data.result.problems);
//           setFilteredProblems(data.result.problems);
//         } else {
//           throw new Error("API response is not in expected format");
//         }
//       } catch (error) {
//         console.error("Error fetching problems:", error);
//         setError((error as Error).message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProblems();
//   }, []);

//   const fetchSubmission = async () => {
//     if (!handle) {
//       setSubmissionData([]);
//       filterProblems([]);
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await fetch(
//         `https://codeforces.com/api/user.status?handle=${handle}`
//       );

//       if (!res.ok) {
//         throw new Error(`HTTP error! Status: ${res.status}`);
//       }

//       const data = await res.json();

//       if (data.result) {
//         console.log("Submissions Data:", data.result); // Debugging line
//         setSubmissionData(data.result);
//         filterProblems(data.result);
//       } else {
//         throw new Error("API response is not in expected format");
//       }
//     } catch (error) {
//       console.error("Error fetching submissions:", error);
//       setError((error as Error).message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filterProblems = (submissions: Submission[]) => {
//     let filtered = problems;

//     if (selectedRating !== null) {
//       filtered = filtered.filter(
//         (problem) => problem.rating === selectedRating
//       );
//     }

//     if (searchQuery) {
//       filtered = filtered.filter((problem) =>
//         problem.name.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     if (selectedTag) {
//       filtered = filtered.filter((problem) =>
//         problem.tags.includes(selectedTag)
//       );
//     }

//     // Map through problems to set verdict color
//     const problemVerdicts = new Map<string, string>();
//     submissions.forEach((submission) => {
//       const key = `${submission.problem.contestId}-${submission.problem.index}`;
//       if (!problemVerdicts.has(key)) {
//         problemVerdicts.set(key, submission.verdict);
//       }
//     });

//     filtered = filtered.map((problem) => {
//       const key = `${problem.contestId}-${problem.index}`;
//       return {
//         ...problem,
//         verdict: problemVerdicts.get(key) || null,
//       };
//     });

//     setFilteredProblems(filtered);
//     setCurrentPage(1);
//   };

//   const handleSearch = () => {
//     filterProblems(submissionData);
//   };

//   useEffect(() => {
//     filterProblems(submissionData);
//   }, [selectedRating, problems, selectedTag]);

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentItems = filteredProblems.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );

//   const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);

//   const uniqueTags = Array.from(
//     problems.flatMap((problem) => problem.tags)
//   ).filter((tag, index, self) => self.indexOf(tag) === index);

//   const handleCheckboxChange = (problemName: string) => {
//     setCheckedProblem((prev) => (prev === problemName ? null : problemName));
//   };

//   const getButtonColor = (rating: number) => {
//     if (rating < 1200) return "bg-gray-400";
//     if (rating <= 1300) return "bg-green-400";
//     if (rating <= 1500) return "bg-cyan-300";
//     if (rating <= 1800) return "bg-blue-500";
//     if (rating <= 2100) return "bg-purple-400";
//     if (rating <= 2300) return "bg-orange-200";
//     if (rating <= 2400) return "bg-orange-400";
//     if (rating <= 2600) return "bg-red-400";
//     if (rating <= 3000) return "bg-red-700";
//     return "bg-red-200";
//   };

//   const getVerdictColor = (verdict: string | null) => {
//     if (verdict === "OK") return "bg-green-500";
//     if (verdict === "WRONG_ANSWER") return "bg-red-500";
//     return "bg-gray-100"; // Default color for unsolved problems
//   };

//   return (
//     <div className="p-5 bg-gray-900 min-h-screen">
//       <h1 className="text-center mb-8 text-2xl font-bold text-white">
//         Codeforces Problems
//       </h1>
//       {error && <p className="text-red-500">Error: {error}</p>}

//       {/* Loader */}
//       {loading && (
//         <div className="flex justify-center items-center h-64">
//           <div className="loader border-t-transparent border-solid rounded-full border-blue-400 border-4 h-16 w-16 animate-spin"></div>
//         </div>
//       )}

//       {!loading && (
//         <>
//           {/* Search Input */}
//           <div className="mb-5 text-center">
//             <div>
//               <input
//                 type="text"
//                 placeholder="CF handle..."
//                 value={handle}
//                 onChange={(e) => setHandle(e.target.value)}
//                 className="p-2 w-72 rounded border border-gray-300 mb-2"
//               />
//               <button
//                 onClick={fetchSubmission} // Trigger fetch on button click
//                 className="p-2 ml-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
//               >
//                 Fetch Submissions
//               </button>
//             </div>

//             <input
//               type="text"
//               placeholder="Search problems..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="p-2 w-72 rounded border border-gray-300 mb-2"
//             />
//             <button
//               onClick={handleSearch}
//               className="p-2 ml-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
//             >
//               Search
//             </button>

//             {/* Tag Dropdown */}
//             <div className="mt-4">
//               <select
//                 value={selectedTag || ""}
//                 onChange={(e) => setSelectedTag(e.target.value)}
//                 className="p-2 w-52 bg-gray-900 text-white rounded border border-gray-300"
//               >
//                 <option value="">All Tags</option>
//                 {uniqueTags.map((tag) => (
//                   <option key={tag} value={tag}>
//                     {tag}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* Rating Filter Buttons */}
//           <div className="mb-5">
//             <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-2">
//               {[
//                 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800,
//                 1900, 2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800,
//                 2900,
//               ].map((rating) => (
//                 <button
//                   key={rating}
//                   onClick={() => setSelectedRating(rating)}
//                   className={`w-24 p-2 rounded transition ${
//                     selectedRating === rating
//                       ? "bg-blue-600 text-white"
//                       : `${getButtonColor(rating)} text-black hover:bg-blue-500`
//                   }`}
//                 >
//                   {rating}
//                 </button>
//               ))}
//               <button
//                 onClick={() => setSelectedRating(null)}
//                 className={`p-2 rounded transition ${
//                   selectedRating === null
//                     ? "bg-blue-600 text-white"
//                     : "bg-gray-300 text-black hover:bg-gray-400"
//                 }`}
//               >
//                 All Ratings
//               </button>
//             </div>
//           </div>

//           {/* Problem List */}
//           <ul className="list-none p-0 mt-11">
//             {currentItems.map((problem: any) => (
//               <li
//                 key={problem.id}
//                 className={`flex items-center justify-between ${getVerdictColor(
//                   problem.verdict
//                 )} hover:bg-gray-900 shadow p-4 mb-2 rounded border transition ${
//                   checkedProblem === problem.name
//                     ? "bg-green-400"
//                     : "bg-gray-800"
//                 } hover:bg-gray-900 hover:border-blue-900`}
//               >
//                 <div className="flex items-center">
//                   <input
//                     type="checkbox"
//                     checked={checkedProblem === problem.name}
//                     onChange={() => handleCheckboxChange(problem.name)}
//                     className="mr-4"
//                   />
//                   <div className="flex items-center">
//                     <span className="inline-block bg-gray-400 text-gray-800 py-1 px-2 rounded text-sm mr-3">
//                       {problem.index}
//                     </span>
//                     <div>
//                       <a
//                         href={`https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-300 text-lg font-semibold hover:text-purple-700"
//                       >
//                         {problem.name}
//                       </a>
//                       <div className="mt-1">
//                         {problem.tags.map((tag: any) => (
//                           <span
//                             key={tag}
//                             className="bg-green-300 text-gray-700 py-1 px-2 rounded text-xs mr-1"
//                           >
//                             {tag}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div>
//                   <span className="bg-blue-600 text-white py-1 px-3 rounded text-sm">
//                     Rating: {problem.rating || "N/A"}
//                   </span>
//                 </div>
//               </li>
//             ))}
//           </ul>

//           {/* Pagination */}
//           <div className="text-center mt-5">
//             <button
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//               className={`p-2 rounded mr-2 ${
//                 currentPage === 1
//                   ? "bg-gray-100 text-gray-900 cursor-not-allowed"
//                   : "bg-blue-800 text-white hover:bg-blue-700"
//               }`}
//             >
//               Previous
//             </button>
//             <span className="mx-4 text-lg text-white">
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               onClick={() =>
//                 setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//               }
//               disabled={currentPage === totalPages}
//               className={`p-2 rounded ml-2 ${
//                 currentPage === totalPages
//                   ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                   : "bg-blue-600 text-white hover:bg-blue-700"
//               }`}
//             >
//               Next
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Codeforces;

// All User Showed ------------------------------>

// "use client";

// import React, { useEffect, useState } from "react";

// const Codeforces = () => {
//   const [problems, setProblems] = useState<Problem[]>([]);
//   const [filteredProblems, setFilteredProblems] = useState<Problem[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [submissionData, setSubmissionData] = useState<Submission[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [selectedRating, setSelectedRating] = useState<number | null>(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedTag, setSelectedTag] = useState<string | null>(null);
//   const [checkedProblem, setCheckedProblem] = useState<string | null>(null);
//   const [handle, setHandle] = useState("");
//   const itemsPerPage = 20;

//   interface Problem {
//     name: string;
//     id: number;
//     contestId: number;
//     index: string;
//     rating: number;
//     tags: string[];
//   }

//   interface Submission {
//     id: number;
//     verdict: string;
//     problem: {
//       contestId: number;
//       index: string;
//     };
//   }

//   useEffect(() => {
//     const fetchProblems = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(
//           "https://codeforces.com/api/problemset.problems"
//         );

//         if (!res.ok) {
//           throw new Error(`HTTP error! Status: ${res.status}`);
//         }

//         const data = await res.json();

//         if (data.result && data.result.problems) {
//           setProblems(data.result.problems);
//           setFilteredProblems(data.result.problems);
//         } else {
//           throw new Error("API response is not in expected format");
//         }
//       } catch (error) {
//         console.error("Error fetching problems:", error);
//         setError((error as Error).message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProblems();
//   }, []);

//   const fetchSubmission = async () => {
//     if (!handle) {
//       setSubmissionData([]);
//       filterProblems([]); // Show all problems if no handle is provided
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await fetch(
//         `https://codeforces.com/api/user.status?handle=${handle}`
//       );

//       if (!res.ok) {
//         throw new Error(`HTTP error! Status: ${res.status}`);
//       }

//       const data = await res.json();

//       if (data.result) {
//         setSubmissionData(data.result);
//         filterProblems(data.result);
//       } else {
//         throw new Error("API response is not in expected format");
//       }
//     } catch (error) {
//       console.error("Error fetching submissions:", error);
//       setError((error as Error).message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filterProblems = (submissions: Submission[]) => {
//     let filtered = problems;

//     if (selectedRating !== null) {
//       filtered = filtered.filter(
//         (problem) => problem.rating === selectedRating
//       );
//     }

//     if (searchQuery) {
//       filtered = filtered.filter((problem) =>
//         problem.name.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     if (selectedTag) {
//       filtered = filtered.filter((problem) =>
//         problem.tags.includes(selectedTag)
//       );
//     }

//     // Filter problems based on user submissions only if handle is provided
//     if (handle) {
//       const submittedProblems = submissions.map((sub) => ({
//         contestId: sub.problem.contestId,
//         index: sub.problem.index,
//         verdict: sub.verdict,
//       }));

//       filtered = filtered.filter((problem) =>
//         submittedProblems.some(
//           (sub) =>
//             sub.contestId === problem.contestId && sub.index === problem.index
//         )
//       );
//     }

//     setFilteredProblems(filtered);
//     setCurrentPage(1);
//   };

//   const handleSearch = () => {
//     filterProblems(submissionData);
//   };

//   useEffect(() => {
//     filterProblems(submissionData);
//   }, [selectedRating, problems, selectedTag]);

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentItems = filteredProblems.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );

//   const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);

//   const uniqueTags = Array.from(
//     problems.flatMap((problem) => problem.tags)
//   ).filter((tag, index, self) => self.indexOf(tag) === index);

//   const handleCheckboxChange = (problemName: string) => {
//     setCheckedProblem((prev) => (prev === problemName ? null : problemName));
//   };

//   const getButtonColor = (rating: number) => {
//     if (rating < 1200) return "bg-gray-400";
//     if (rating <= 1300) return "bg-green-400";
//     if (rating <= 1500) return "bg-cyan-300";
//     if (rating <= 1800) return "bg-blue-500";
//     if (rating <= 2100) return "bg-purple-400";
//     if (rating <= 2300) return "bg-orange-200";
//     if (rating <= 2400) return "bg-orange-400";
//     if (rating <= 2600) return "bg-red-400";
//     if (rating <= 3000) return "bg-red-700";
//     return "bg-red-200";
//   };

//   const getVerdictColor = (contestId: number, index: string) => {
//     const submission = submissionData.find(
//       (submission) =>
//         submission.problem.contestId === contestId &&
//         submission.problem.index === index
//     );
//     if (submission) {
//       if (submission.verdict === "OK") return "bg-green-500";
//       if (submission.verdict === "WRONG_ANSWER") return "bg-red-500";
//     }
//     return "bg-gray-100"; // Default color for unsolved problems
//   };

//   return (
//     <div className="p-5 bg-gray-900 min-h-screen">
//       <h1 className="text-center mb-8 text-2xl font-bold text-white">
//         Codeforces Problems
//       </h1>
//       {error && <p className="text-red-500">Error: {error}</p>}

//       {/* Loader */}
//       {loading && (
//         <div className="flex justify-center items-center h-64">
//           <div className="loader border-t-transparent border-solid rounded-full border-blue-400 border-4 h-16 w-16 animate-spin"></div>
//         </div>
//       )}

//       {!loading && (
//         <>
//           {/* Search Input */}
//           <div className="mb-5 text-center">
//             <input
//               type="text"
//               placeholder="Enter handle..."
//               value={handle}
//               onChange={(e) => setHandle(e.target.value)}
//               className="p-2 w-72 rounded border border-gray-300 mb-2"
//             />
//             <button
//               onClick={fetchSubmission} // Trigger fetch on button click
//               className="p-2 ml-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
//             >
//               Fetch Submissions
//             </button>

//             <input
//               type="text"
//               placeholder="Search problems..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="p-2 w-72 rounded border border-gray-300 mb-2"
//             />
//             <button
//               onClick={handleSearch}
//               className="p-2 ml-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
//             >
//               Search
//             </button>

//             {/* Tag Dropdown */}
//             <div className="mt-4">
//               <select
//                 value={selectedTag || ""}
//                 onChange={(e) => setSelectedTag(e.target.value)}
//                 className="p-2 w-52 bg-gray-900 text-white rounded border border-gray-300"
//               >
//                 <option value="">All Tags</option>
//                 {uniqueTags.map((tag) => (
//                   <option key={tag} value={tag}>
//                     {tag}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* Rating Filter Buttons */}
//           <div className="mb-5">
//             <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-2">
//               {[
//                 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800,
//                 1900, 2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800,
//                 2900,
//               ].map((rating) => (
//                 <button
//                   key={rating}
//                   onClick={() => setSelectedRating(rating)}
//                   className={`w-24 p-2 rounded transition ${
//                     selectedRating === rating
//                       ? "bg-blue-600 text-white"
//                       : `${getButtonColor(rating)} text-black hover:bg-blue-500`
//                   }`}
//                 >
//                   {rating}
//                 </button>
//               ))}
//               <button
//                 onClick={() => setSelectedRating(null)}
//                 className={`p-2 rounded transition ${
//                   selectedRating === null
//                     ? "bg-blue-600 text-white"
//                     : "bg-gray-300 text-black hover:bg-gray-400"
//                 }`}
//               >
//                 All Ratings
//               </button>
//             </div>
//           </div>

//           {/* Problem List */}
//           <ul className="list-none p-0 mt-11">
//             {currentItems.map((problem) => (
//               <li
//                 key={problem.id}
//                 className={`flex items-center justify-between ${getVerdictColor(
//                   problem.contestId,
//                   problem.index
//                 )} hover:bg-gray-900 shadow p-4 mb-2 rounded border transition ${
//                   checkedProblem === problem.name
//                     ? "bg-green-400"
//                     : "bg-gray-800"
//                 } hover:bg-gray-900 hover:border-blue-900`}
//               >
//                 <div className="flex items-center">
//                   <input
//                     type="checkbox"
//                     checked={checkedProblem === problem.name}
//                     onChange={() => handleCheckboxChange(problem.name)}
//                     className="mr-4"
//                   />
//                   <div className="flex items-center">
//                     <span className="inline-block bg-gray-400 text-gray-800 py-1 px-2 rounded text-sm mr-3">
//                       {problem.index}
//                     </span>
//                     <div>
//                       <a
//                         href={`https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-300 text-lg font-semibold hover:text-purple-700"
//                       >
//                         {problem.name}
//                       </a>
//                       <div className="mt-1">
//                         {problem.tags.map((tag) => (
//                           <span
//                             key={tag}
//                             className="bg-green-300 text-gray-700 py-1 px-2 rounded text-xs mr-1"
//                           >
//                             {tag}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div>
//                   <span className="bg-blue-600 text-white py-1 px-3 rounded text-sm">
//                     Rating: {problem.rating || "N/A"}
//                   </span>
//                 </div>
//               </li>
//             ))}
//           </ul>

//           {/* Pagination */}
//           <div className="text-center mt-5">
//             <button
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//               className={`p-2 rounded mr-2 ${
//                 currentPage === 1
//                   ? "bg-gray-100 text-gray-900 cursor-not-allowed"
//                   : "bg-blue-800 text-white hover:bg-blue-700"
//               }`}
//             >
//               Previous
//             </button>
//             <span className="mx-4 text-lg text-white">
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               onClick={() =>
//                 setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//               }
//               disabled={currentPage === totalPages}
//               className={`p-2 rounded ml-2 ${
//                 currentPage === totalPages
//                   ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                   : "bg-blue-600 text-white hover:bg-blue-700"
//               }`}
//             >
//               Next
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Codeforces;

// Fetchsubmission Handle Seach fixing -------------------------->

// "use client";

// import React, { useEffect, useState } from "react";

// const Codeforces = () => {
//   const [problems, setProblems] = useState<Problem[]>([]);
//   const [filteredProblems, setFilteredProblems] = useState<Problem[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [submissionData, setSubmissionData] = useState<Submission[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [selectedRating, setSelectedRating] = useState<number | null>(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedTag, setSelectedTag] = useState<string | null>(null);
//   const [checkedProblem, setCheckedProblem] = useState<string | null>(null);
//   const [handle, setHandle] = useState("");
//   const itemsPerPage = 20;

//   interface Problem {
//     name: string;
//     id: number;
//     contestId: number;
//     index: string;
//     rating: number;
//     tags: string[];
//   }

//   interface Submission {
//     id: number;
//     verdict: string;
//     problem: {
//       contestId: number;
//       index: string;
//     };
//   }

//   useEffect(() => {
//     const fetchProblems = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(
//           "https://codeforces.com/api/problemset.problems"
//         );

//         if (!res.ok) {
//           throw new Error(`HTTP error! Status: ${res.status}`);
//         }

//         const data = await res.json();

//         if (data.result && data.result.problems) {
//           setProblems(data.result.problems);
//           setFilteredProblems(data.result.problems);
//         } else {
//           throw new Error("API response is not in expected format");
//         }
//       } catch (error) {
//         console.error("Error fetching problems:", error);
//         setError((error as Error).message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProblems();
//   }, []);

//   useEffect(() => {
//     const fetchSubmission = async () => {
//       if (!handle) {
//         setSubmissionData([]);
//         filterProblems([]); // Show all problems if no handle is provided
//         return;
//       }

//       try {
//         const res = await fetch(
//           `https://codeforces.com/api/user.status?handle=${handle}`
//         );

//         if (!res.ok) {
//           throw new Error(`HTTP error! Status: ${res.status}`);
//         }

//         const data = await res.json();

//         if (data.result) {
//           setSubmissionData(data.result);
//           filterProblems(data.result);
//         } else {
//           throw new Error("API response is not in expected format");
//         }
//       } catch (error) {
//         console.error("Error fetching submissions:", error);
//         setError((error as Error).message);
//       }
//     };

//     fetchSubmission();
//   }, [handle]);

//   const filterProblems = (submissions: Submission[]) => {
//     let filtered = problems;

//     if (selectedRating !== null) {
//       filtered = filtered.filter(
//         (problem) => problem.rating === selectedRating
//       );
//     }

//     if (searchQuery) {
//       filtered = filtered.filter((problem) =>
//         problem.name.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     if (selectedTag) {
//       filtered = filtered.filter((problem) =>
//         problem.tags.includes(selectedTag)
//       );
//     }

//     // Filter problems based on user submissions only if handle is provided
//     if (handle) {
//       const submittedProblems = submissions.map((sub) => ({
//         contestId: sub.problem.contestId,
//         index: sub.problem.index,
//         verdict: sub.verdict,
//       }));

//       filtered = filtered.filter((problem) =>
//         submittedProblems.some(
//           (sub) =>
//             sub.contestId === problem.contestId && sub.index === problem.index
//         )
//       );
//     }

//     setFilteredProblems(filtered);
//     setCurrentPage(1);
//   };

//   const handleSearch = () => {
//     filterProblems(submissionData);
//   };

//   useEffect(() => {
//     filterProblems(submissionData);
//   }, [selectedRating, problems, selectedTag]);

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentItems = filteredProblems.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );

//   const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);

//   const uniqueTags = Array.from(
//     problems.flatMap((problem) => problem.tags)
//   ).filter((tag, index, self) => self.indexOf(tag) === index);

//   const handleCheckboxChange = (problemName: string) => {
//     setCheckedProblem((prev) => (prev === problemName ? null : problemName));
//   };

//   const getButtonColor = (rating: number) => {
//     if (rating < 1200) return "bg-gray-400";
//     if (rating <= 1300) return "bg-green-400";
//     if (rating <= 1500) return "bg-cyan-300";
//     if (rating <= 1800) return "bg-blue-500";
//     if (rating <= 2100) return "bg-purple-400";
//     if (rating <= 2300) return "bg-orange-200";
//     if (rating <= 2400) return "bg-orange-400";
//     if (rating <= 2600) return "bg-red-400";
//     if (rating <= 3000) return "bg-red-700";
//     return "bg-red-200";
//   };

//   const getVerdictColor = (contestId: number, index: string) => {
//     const submission = submissionData.find(
//       (submission) =>
//         submission.problem.contestId === contestId &&
//         submission.problem.index === index
//     );
//     if (submission) {
//       if (submission.verdict === "OK") return "bg-green-500";
//       if (submission.verdict === "WRONG_ANSWER") return "bg-red-500";
//     }
//     return "bg-gray-100"; // Default color for unsolved problems
//   };

//   return (
//     <div className="p-5 bg-gray-900 min-h-screen">
//       <h1 className="text-center mb-8 text-2xl font-bold text-white">
//         Codeforces Problems
//       </h1>
//       {error && <p className="text-red-500">Error: {error}</p>}

//       {/* Loader */}
//       {loading && (
//         <div className="flex justify-center items-center h-64">
//           <div className="loader border-t-transparent border-solid rounded-full border-blue-400 border-4 h-16 w-16 animate-spin"></div>
//         </div>
//       )}

//       {!loading && (
//         <>
//           {/* Search Input */}
//           <div className="mb-5 text-center">
//             <input
//               type="text"
//               placeholder="Enter handle..."
//               value={handle}
//               onChange={(e) => setHandle(e.target.value)}
//               className="p-2 w-72 rounded border border-gray-300 mb-2"
//             />
//             <button
//               onClick={() => fetchSubmission()} // Trigger fetch on button click
//               className="p-2 ml-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
//             >
//               Fetch Submissions
//             </button>

//             <input
//               type="text"
//               placeholder="Search problems..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="p-2 w-72 rounded border border-gray-300 mb-2"
//             />
//             <button
//               onClick={handleSearch}
//               className="p-2 ml-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
//             >
//               Search
//             </button>

//             {/* Tag Dropdown */}
//             <div className="mt-4">
//               <select
//                 value={selectedTag || ""}
//                 onChange={(e) => setSelectedTag(e.target.value)}
//                 className="p-2 w-52 bg-gray-900 text-white rounded border border-gray-300"
//               >
//                 <option value="">All Tags</option>
//                 {uniqueTags.map((tag) => (
//                   <option key={tag} value={tag}>
//                     {tag}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* Rating Filter Buttons */}
//           <div className="mb-5">
//             <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-2">
//               {[
//                 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800,
//                 1900, 2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800,
//                 2900,
//               ].map((rating) => (
//                 <button
//                   key={rating}
//                   onClick={() => setSelectedRating(rating)}
//                   className={`w-24 p-2 rounded transition ${
//                     selectedRating === rating
//                       ? "bg-blue-600 text-white"
//                       : `${getButtonColor(rating)} text-black hover:bg-blue-500`
//                   }`}
//                 >
//                   {rating}
//                 </button>
//               ))}
//               <button
//                 onClick={() => setSelectedRating(null)}
//                 className={`p-2 rounded transition ${
//                   selectedRating === null
//                     ? "bg-blue-600 text-white"
//                     : "bg-gray-300 text-black hover:bg-gray-400"
//                 }`}
//               >
//                 All Ratings
//               </button>
//             </div>
//           </div>

//           {/* Problem List */}
//           <ul className="list-none p-0 mt-11">
//             {currentItems.map((problem) => (
//               <li
//                 key={problem.id}
//                 className={`flex items-center justify-between ${getVerdictColor(
//                   problem.contestId,
//                   problem.index
//                 )} hover:bg-gray-900 shadow p-4 mb-2 rounded border transition ${
//                   checkedProblem === problem.name
//                     ? "bg-green-400"
//                     : "bg-gray-800"
//                 } hover:bg-gray-900 hover:border-blue-900`}
//               >
//                 <div className="flex items-center">
//                   <input
//                     type="checkbox"
//                     checked={checkedProblem === problem.name}
//                     onChange={() => handleCheckboxChange(problem.name)}
//                     className="mr-4"
//                   />
//                   <div className="flex items-center">
//                     <span className="inline-block bg-gray-400 text-gray-800 py-1 px-2 rounded text-sm mr-3">
//                       {problem.index}
//                     </span>
//                     <div>
//                       <a
//                         href={`https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-300 text-lg font-semibold hover:text-purple-700"
//                       >
//                         {problem.name}
//                       </a>
//                       <div className="mt-1">
//                         {problem.tags.map((tag) => (
//                           <span
//                             key={tag}
//                             className="bg-green-300 text-gray-700 py-1 px-2 rounded text-xs mr-1"
//                           >
//                             {tag}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div>
//                   <span className="bg-blue-600 text-white py-1 px-3 rounded text-sm">
//                     Rating: {problem.rating || "N/A"}
//                   </span>
//                 </div>
//               </li>
//             ))}
//           </ul>

//           {/* Pagination */}
//           <div className="text-center mt-5">
//             <button
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//               className={`p-2 rounded mr-2 ${
//                 currentPage === 1
//                   ? "bg-gray-100 text-gray-900 cursor-not-allowed"
//                   : "bg-blue-800 text-white hover:bg-blue-700"
//               }`}
//             >
//               Previous
//             </button>
//             <span className="mx-4 text-lg text-white">
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               onClick={() =>
//                 setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//               }
//               disabled={currentPage === totalPages}
//               className={`p-2 rounded ml-2 ${
//                 currentPage === totalPages
//                   ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                   : "bg-blue-600 text-white hover:bg-blue-700"
//               }`}
//             >
//               Next
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Codeforces;

// Adding User Handle

// "use client";

// import React, { useEffect, useState } from "react";

// const Codeforces = () => {
//   const [problems, setProblems] = useState<Problem[]>([]);
//   const [filteredProblems, setFilteredProblems] = useState<Problem[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(true); // Added loading state
//   const [selectedRating, setSelectedRating] = useState<number | null>(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedTag, setSelectedTag] = useState<string | null>(null);
//   const [checkedProblem, setCheckedProblem] = useState<string | null>(null);
//   const itemsPerPage = 20;

//   interface Problem {
//     name: string;
//     id: number;
//     contestId: number;
//     index: string;
//     rating: number;
//     tags: string[];
//   }

//   // Fetching Data of User Submission

//   useEffect(() => {
//     const fetchProblems = async () => {
//       try {
//         setLoading(true); // Start loading
//         const res = await fetch(
//           "https://codeforces.com/api/problemset.problems"
//         );

//         if (!res.ok) {
//           throw new Error(`HTTP error! Status: ${res.status}`);
//         }

//         const data = await res.json();

//         if (data.result && data.result.problems) {
//           setProblems(data.result.problems);
//           setFilteredProblems(data.result.problems);
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

//   const filterProblems = () => {
//     let filtered = problems;

//     if (selectedRating !== null) {
//       filtered = filtered.filter(
//         (problem) => problem.rating === selectedRating
//       );
//     }

//     if (searchQuery) {
//       filtered = filtered.filter((problem) =>
//         problem.name.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     if (selectedTag) {
//       filtered = filtered.filter((problem) =>
//         problem.tags.includes(selectedTag)
//       );
//     }

//     setFilteredProblems(filtered);
//     setCurrentPage(1);
//   };

//   const handleSearch = () => {
//     filterProblems();
//   };

//   useEffect(() => {
//     filterProblems();
//   }, [selectedRating, problems, selectedTag]);

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentItems = filteredProblems.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );

//   const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);

//   const uniqueTags = Array.from(
//     problems.flatMap((problem) => problem.tags)
//   ).filter((tag, index, self) => self.indexOf(tag) === index);

//   const handleCheckboxChange = (problemName: string) => {
//     setCheckedProblem((prev) => (prev === problemName ? null : problemName));
//   };

//   const getButtonColor = (rating: number) => {
//     if (rating < 1200) return "bg-gray-400";
//     if (rating <= 1300) return "bg-green-400";
//     if (rating <= 1500) return "bg-cyan-300";
//     if (rating <= 1800) return "bg-blue-500";
//     if (rating <= 2100) return "bg-purple-400";
//     if (rating <= 2300) return "bg-orange-200";
//     if (rating <= 2400) return "bg-orange-400";
//     if (rating <= 2600) return "bg-red-400";
//     if (rating <= 3000) return "bg-red-700";
//     return "bg-red-200";
//   };

//   return (
//     <div className="p-5 bg-gray-900 min-h-screen">
//       <h1 className="text-center mb-8 text-2xl font-bold text-white">
//         Codeforces Problems
//       </h1>
//       {error && <p className="text-red-500">Error: {error}</p>}

//       {/* Loader */}
//       {loading && (
//         <div className="flex justify-center items-center h-64">
//           <div className="loader border-t-transparent border-solid rounded-full border-blue-400 border-4 h-16 w-16 animate-spin"></div>
//         </div>
//       )}

//       {!loading && (
//         <>
//           {/* Search Input */}
//           <div className="mb-5 text-center">
//             <input
//               type="text"
//               placeholder="Search problems..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="p-2 w-72 rounded border border-gray-300 mb-2"
//             />
//             <button
//               onClick={handleSearch}
//               className="p-2 ml-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
//             >
//               Search
//             </button>

//             {/* Tag Dropdown */}
//             <div className="mt-4">
//               <select
//                 value={selectedTag || ""}
//                 onChange={(e) => setSelectedTag(e.target.value)}
//                 className="p-2 w-52 bg-gray-900 text-white rounded border border-gray-300"
//               >
//                 <option value="">All Tags</option>
//                 {uniqueTags.map((tag) => (
//                   <option key={tag} value={tag}>
//                     {tag}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* Rating Filter Buttons */}
//           <div className="mb-5">
//             <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-2">
//               {[
//                 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800,
//                 1900, 2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800,
//                 2900,
//               ].map((rating) => (
//                 <button
//                   key={rating}
//                   onClick={() => setSelectedRating(rating)}
//                   className={`w-24 p-2 rounded transition ${
//                     selectedRating === rating
//                       ? "bg-blue-600 text-white"
//                       : `${getButtonColor(rating)} text-black hover:bg-blue-500`
//                   }`}
//                 >
//                   {rating}
//                 </button>
//               ))}
//               <button
//                 onClick={() => setSelectedRating(null)}
//                 className={`p-2 rounded transition ${
//                   selectedRating === null
//                     ? "bg-blue-600 text-white"
//                     : "bg-gray-300 text-black hover:bg-gray-400"
//                 }`}
//               >
//                 All Ratings
//               </button>
//             </div>
//           </div>

//           {/* Problem List */}
//           <ul className="list-none p-0 mt-11">
//             {currentItems.map((problem) => (
//               <li
//                 key={problem.id}
//                 className={`flex items-center justify-between bg-gray-800 hover:bg-slate-900 shadow p-4 mb-2 rounded border transition ${
//                   checkedProblem === problem.name
//                     ? "bg-green-400"
//                     : "bg-gray-100"
//                 }hover:bg-gray-900 hover:border-blue-900`}
//               >
//                 <div className="flex items-center">
//                   <input
//                     type="checkbox"
//                     checked={checkedProblem === problem.name}
//                     onChange={() => handleCheckboxChange(problem.name)}
//                     className="mr-4"
//                   />
//                   <div className="flex items-center">
//                     <span className="inline-block bg-gray-400 text-gray-800 py-1 px-2 rounded text-sm mr-3">
//                       {problem.index}
//                     </span>
//                     <div>
//                       <a
//                         href={`https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-300 text-lg font-semibold hover:text-purple-700"
//                       >
//                         {problem.name}
//                       </a>
//                       <div className="mt-1">
//                         {problem.tags.map((tag) => (
//                           <span
//                             key={tag}
//                             className="bg-green-300 text-gray-700 py-1 px-2 rounded text-xs mr-1"
//                           >
//                             {tag}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div>
//                   <span className="bg-blue-600 text-white py-1 px-3 rounded text-sm">
//                     Rating: {problem.rating || "N/A"}
//                   </span>
//                 </div>
//               </li>
//             ))}
//           </ul>

//           {/* Pagination */}
//           <div className="text-center mt-5">
//             <button
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//               className={`p-2 rounded mr-2 ${
//                 currentPage === 1
//                   ? "bg-gray-100 text-gray-900 cursor-not-allowed"
//                   : "bg-blue-800 text-white hover:bg-blue-700"
//               }`}
//             >
//               Previous
//             </button>
//             <span className="mx-4 text-lg text-white">
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               onClick={() =>
//                 setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//               }
//               disabled={currentPage === totalPages}
//               className={`p-2 rounded ml-2 ${
//                 currentPage === totalPages
//                   ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                   : "bg-blue-600 text-white hover:bg-blue-700"
//               }`}
//             >
//               Next
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Codeforces;

// Set Loader -------------------------------->

// "use client";

// import React, { useEffect, useState } from "react";

// const Codeforces = () => {
//   const [problems, setProblems] = useState<Problem[]>([]);
//   const [filteredProblems, setFilteredProblems] = useState<Problem[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedRating, setSelectedRating] = useState<number | null>(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedTag, setSelectedTag] = useState<string | null>(null);
//   const [checkedProblem, setCheckedProblem] = useState<string | null>(null);
//   const itemsPerPage = 20;

//   interface Problem {
//     name: string;
//     id: number;
//     contestId: number;
//     index: string;
//     rating: number;
//     tags: string[];
//   }

//   useEffect(() => {
//     const fetchProblems = async () => {
//       try {
//         const res = await fetch(
//           "https://codeforces.com/api/problemset.problems"
//         );

//         if (!res.ok) {
//           throw new Error(`HTTP error! Status: ${res.status}`);
//         }

//         const data = await res.json();

//         if (data.result && data.result.problems) {
//           setProblems(data.result.problems);
//           setFilteredProblems(data.result.problems);
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

//   const filterProblems = () => {
//     let filtered = problems;

//     if (selectedRating !== null) {
//       filtered = filtered.filter(
//         (problem) => problem.rating === selectedRating
//       );
//     }

//     if (searchQuery) {
//       filtered = filtered.filter((problem) =>
//         problem.name.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     if (selectedTag) {
//       filtered = filtered.filter((problem) =>
//         problem.tags.includes(selectedTag)
//       );
//     }

//     setFilteredProblems(filtered);
//     setCurrentPage(1);
//   };

//   const handleSearch = () => {
//     filterProblems();
//   };

//   useEffect(() => {
//     filterProblems();
//   }, [selectedRating, problems, selectedTag]);

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentItems = filteredProblems.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );

//   const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);

//   const uniqueTags = [...new Set(problems.flatMap((problem) => problem.tags))];

//   const handleCheckboxChange = (problemName: string) => {
//     setCheckedProblem((prev) => (prev === problemName ? null : problemName));
//   };

//   const getButtonColor = (rating: number) => {
//     if (rating < 1200) return "bg-gray-400";
//     if (rating <= 1300) return "bg-green-400";
//     if (rating <= 1500) return "bg-cyan-300";
//     if (rating <= 1800) return "bg-blue-500";
//     if (rating <= 2100) return "bg-purple-400";
//     if (rating <= 2300) return "bg-orange-200";
//     if (rating <= 2400) return "bg-orange-400";
//     if (rating <= 2600) return "bg-red-400";
//     if (rating <= 3000) return "bg-red-700";
//     return "bg-red-200";
//   };

//   return (
//     <div className="p-5 bg-gray-900">
//       <h1 className="text-center mb-8 text-2xl font-bold text-white">
//         Codeforces Problems
//       </h1>
//       {error && <p className="text-red-500">Error: {error}</p>}

//       {/* Search Input */}
//       <div className="mb-5 text-center">
//         <input
//           type="text"
//           placeholder="Search problems..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="p-2 w-72 rounded border border-gray-300 mb-2"
//         />
//         <button
//           onClick={handleSearch}
//           className="p-2 ml-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
//         >
//           Search
//         </button>

//         {/* Tag Dropdown */}
//         <div className="mt-4">
//           <select
//             value={selectedTag || ""}
//             onChange={(e) => setSelectedTag(e.target.value)}
//             className="p-2 w-52 bg-gray-900 text-white rounded border border-gray-300"
//           >
//             <option value="">All Tags</option>
//             {uniqueTags.map((tag) => (
//               <option key={tag} value={tag}>
//                 {tag}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Rating Filter Buttons */}
//       <div className="mb-5">
//         <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-2">
//           {[
//             800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800,
//             1900, 2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900,
//           ].map((rating) => (
//             <button
//               key={rating}
//               onClick={() => setSelectedRating(rating)}
//               className={`w-24 p-2 rounded transition ${
//                 selectedRating === rating
//                   ? "bg-blue-600 text-white"
//                   : `${getButtonColor(rating)} text-black hover:bg-blue-500`
//               }`}
//             >
//               {rating}
//             </button>
//           ))}
//           <button
//             onClick={() => setSelectedRating(null)}
//             className={`p-2 rounded transition ${
//               selectedRating === null
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-300 text-black hover:bg-gray-400"
//             }`}
//           >
//             All Ratings
//           </button>
//         </div>
//       </div>

//       {/* Problem List */}
//       <ul className="list-none p-0">
//         {currentItems.map((problem) => (
//           <li
//             key={problem.id}
//             className={`flex items-center justify-between bg-gray-800 hover:bg-slate-900 shadow p-4 mb-2 rounded border transition ${
//               checkedProblem === problem.name ? "bg-green-400" : "bg-gray-100"
//             }hover:bg-gray-900 hover:border-blue-900`}
//           >
//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 checked={checkedProblem === problem.name}
//                 onChange={() => handleCheckboxChange(problem.name)}
//                 className="mr-4"
//               />
//               <div className="flex items-center">
//                 <span className="inline-block bg-gray-400 text-gray-800 py-1 px-2 rounded text-sm mr-3">
//                   {problem.index}
//                 </span>
//                 <div>
//                   <a
//                     href={`https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-300 text-lg font-semibold hover:text-purple-700"
//                   >
//                     {problem.name}
//                   </a>
//                   <div className="mt-1">
//                     {problem.tags.map((tag) => (
//                       <span
//                         key={tag}
//                         className="bg-green-300 text-gray-700 py-1 px-2 rounded text-xs mr-1"
//                       >
//                         {tag}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div>
//               <span className="bg-blue-600 text-white py-1 px-3 rounded text-sm">
//                 Rating: {problem.rating || "N/A"}
//               </span>
//             </div>
//           </li>
//         ))}
//       </ul>

//       {/* Pagination */}
//       <div className="text-center mt-5">
//         <button
//           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//           disabled={currentPage === 1}
//           className={`p-2 rounded mr-2 ${
//             currentPage === 1
//               ? "bg-gray-100 text-gray-900 cursor-not-allowed"
//               : "bg-blue-800 text-white hover:bg-blue-700"
//           }`}
//         >
//           Previous
//         </button>
//         <span className="mx-4 text-lg text-white">
//           Page {currentPage} of {totalPages}
//         </span>
//         <button
//           onClick={() =>
//             setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//           }
//           disabled={currentPage === totalPages}
//           className={`p-2 rounded ml-2 ${
//             currentPage === totalPages
//               ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//               : "bg-blue-600 text-white hover:bg-blue-700"
//           }`}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Codeforces;

// Add Index of the Problem

// "use client";

// import React, { useEffect, useState } from "react";

// const Codeforces = () => {
//   const [problems, setProblems] = useState<Problem[]>([]);
//   const [filteredProblems, setFilteredProblems] = useState<Problem[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedRating, setSelectedRating] = useState<number | null>(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedTag, setSelectedTag] = useState<string | null>(null);
//   const [checkedProblem, setCheckedProblem] = useState<string | null>(null);
//   const itemsPerPage = 20;

//   interface Problem {
//     name: string;
//     id: number;
//     contestId: number;
//     index: string;
//     rating: number;
//     tags: string[];
//   }

//   useEffect(() => {
//     const fetchProblems = async () => {
//       try {
//         const res = await fetch(
//           "https://codeforces.com/api/problemset.problems"
//         );

//         if (!res.ok) {
//           throw new Error(`HTTP error! Status: ${res.status}`);
//         }

//         const data = await res.json();

//         if (data.result && data.result.problems) {
//           setProblems(data.result.problems);
//           setFilteredProblems(data.result.problems);
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

//   const filterProblems = () => {
//     let filtered = problems;

//     if (selectedRating !== null) {
//       filtered = filtered.filter(
//         (problem) => problem.rating === selectedRating
//       );
//     }

//     if (searchQuery) {
//       filtered = filtered.filter((problem) =>
//         problem.name.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     if (selectedTag) {
//       filtered = filtered.filter((problem) =>
//         problem.tags.includes(selectedTag)
//       );
//     }

//     setFilteredProblems(filtered);
//     setCurrentPage(1);
//   };

//   const handleSearch = () => {
//     filterProblems();
//   };

//   useEffect(() => {
//     filterProblems();
//   }, [selectedRating, problems, selectedTag]);

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentItems = filteredProblems.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );

//   const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);

//   const uniqueTags = [...new Set(problems.flatMap((problem) => problem.tags))];

//   const handleCheckboxChange = (problemName: string) => {
//     setCheckedProblem((prev) => (prev === problemName ? null : problemName));
//   };

//   const getButtonColor = (rating: number) => {
//     if (rating < 1200) return "bg-gray-400";
//     if (rating <= 1400) return "bg-green-400";
//     if (rating <= 1600) return "bg-cyan-300";
//     if (rating <= 1900) return "bg-blue-500";
//     if (rating <= 2100) return "bg-purple-400";
//     if (rating <= 2300) return "bg-orange-200";
//     if (rating <= 2400) return "bg-orange-400";
//     if (rating <= 2600) return "bg-red-400";
//     if (rating <= 3000) return "bg-red-700";
//     return "bg-red-200";
//   };

//   return (
//     <div className="p-5">
//       <h1 className="text-center mb-8 text-2xl font-bold">
//         Codeforces Problems
//       </h1>
//       {error && <p className="text-red-500">Error: {error}</p>}

//       {/* Search Input */}
//       <div className="mb-5 text-center">
//         <input
//           type="text"
//           placeholder="Search problems..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="p-2 w-72 rounded border border-gray-300 mb-2"
//         />
//         <button
//           onClick={handleSearch}
//           className="p-2 ml-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
//         >
//           Search
//         </button>

//         {/* Tag Dropdown */}
//         <div className="mt-4">
//           <select
//             value={selectedTag || ""}
//             onChange={(e) => setSelectedTag(e.target.value)}
//             className="p-2 w-52 rounded border border-gray-300"
//           >
//             <option value="">All Tags</option>
//             {uniqueTags.map((tag) => (
//               <option key={tag} value={tag}>
//                 {tag}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Rating Filter Buttons */}
//       <div className="mb-5">
//         <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-2">
//           {[
//             800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800,
//             1900, 2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900,
//           ].map((rating) => (
//             <button
//               key={rating}
//               onClick={() => setSelectedRating(rating)}
//               className={`w-24 p-2 rounded transition ${
//                 selectedRating === rating
//                   ? "bg-blue-600 text-white"
//                   : `${getButtonColor(rating)} text-black hover:bg-blue-500`
//               }`}
//             >
//               {rating}
//             </button>
//           ))}
//           <button
//             onClick={() => setSelectedRating(null)}
//             className={`p-2 rounded transition ${
//               selectedRating === null
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-300 text-black hover:bg-gray-400"
//             }`}
//           >
//             All Ratings
//           </button>
//         </div>
//       </div>

//       {/* Problem List */}
//       <ul className="list-none p-0">
//         {currentItems.map((problem) => (
//           <li
//             key={problem.id}
//             className={`flex items-center justify-between bg-white shadow p-4 mb-2 rounded transition ${
//               checkedProblem === problem.name ? "bg-green-200" : "bg-gray-100"
//             }`}
//           >
//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 checked={checkedProblem === problem.name}
//                 onChange={() => handleCheckboxChange(problem.name)}
//                 className="mr-4"
//               />
//               <div>
//                 <a
//                   href={`https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-600 text-lg font-semibold hover:underline"
//                 >
//                   {problem.name}
//                 </a>
//                 <div className="mt-1">
//                   {problem.tags.map((tag) => (
//                     <span
//                       key={tag}
//                       className="bg-green-200 text-gray-700 py-1 px-2 rounded text-xs mr-1"
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//             <div>
//               <span className="bg-blue-600 text-white py-1 px-3 rounded text-sm">
//                 Rating: {problem.rating || "N/A"}
//               </span>
//             </div>
//           </li>
//         ))}
//       </ul>

//       {/* Pagination */}
//       <div className="text-center mt-5">
//         <button
//           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//           disabled={currentPage === 1}
//           className={`p-2 rounded mr-2 ${
//             currentPage === 1
//               ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//               : "bg-blue-600 text-white hover:bg-blue-700"
//           }`}
//         >
//           Previous
//         </button>
//         <span className="mx-4 text-lg">
//           Page {currentPage} of {totalPages}
//         </span>
//         <button
//           onClick={() =>
//             setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//           }
//           disabled={currentPage === totalPages}
//           className={`p-2 rounded ml-2 ${
//             currentPage === totalPages
//               ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//               : "bg-blue-600 text-white hover:bg-blue-700"
//           }`}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Codeforces;

// Color Rating

// "use client";

// import React, { useEffect, useState } from "react";

// const Codeforces = () => {
//   const [problems, setProblems] = useState<Problem[]>([]);
//   const [filteredProblems, setFilteredProblems] = useState<Problem[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedRating, setSelectedRating] = useState<number | null>(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedTag, setSelectedTag] = useState<string | null>(null);
//   const [checkedProblem, setCheckedProblem] = useState<string | null>(null);
//   const itemsPerPage = 20;

//   interface Problem {
//     name: string;
//     id: number;
//     contestId: number;
//     index: string;
//     rating: number;
//     tags: string[];
//   }

//   useEffect(() => {
//     const fetchProblems = async () => {
//       try {
//         const res = await fetch(
//           "https://codeforces.com/api/problemset.problems"
//         );

//         if (!res.ok) {
//           throw new Error(`HTTP error! Status: ${res.status}`);
//         }

//         const data = await res.json();

//         if (data.result && data.result.problems) {
//           setProblems(data.result.problems);
//           setFilteredProblems(data.result.problems);
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

//   const filterProblems = () => {
//     let filtered = problems;

//     if (selectedRating !== null) {
//       filtered = filtered.filter(
//         (problem) => problem.rating === selectedRating
//       );
//     }

//     if (searchQuery) {
//       filtered = filtered.filter((problem) =>
//         problem.name.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     if (selectedTag) {
//       filtered = filtered.filter((problem) =>
//         problem.tags.includes(selectedTag)
//       );
//     }

//     setFilteredProblems(filtered);
//     setCurrentPage(1);
//   };

//   const handleSearch = () => {
//     filterProblems();
//   };

//   useEffect(() => {
//     filterProblems();
//   }, [selectedRating, problems, selectedTag]);

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentItems = filteredProblems.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );

//   const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);

//   const uniqueTags = [...new Set(problems.flatMap((problem) => problem.tags))];

//   const handleCheckboxChange = (problemName: string) => {
//     setCheckedProblem((prev) => (prev === problemName ? null : problemName));
//   };

//   return (
//     <div className="p-5">
//       <h1 className="text-center mb-8 text-2xl font-bold">
//         Codeforces Problems
//       </h1>
//       {error && <p className="text-red-500">Error: {error}</p>}

//       {/* Search Input */}
//       <div className="mb-5 text-center">
//         <input
//           type="text"
//           placeholder="Search problems..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="p-2 w-72 rounded border border-gray-300 mb-2"
//         />
//         <button
//           onClick={handleSearch}
//           className="p-2 ml-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
//         >
//           Search
//         </button>

//         {/* Tag Dropdown */}
//         <div className="mt-4">
//           <select
//             value={selectedTag || ""}
//             onChange={(e) => setSelectedTag(e.target.value)}
//             className="p-2 w-52 rounded border border-gray-300"
//           >
//             <option value="">All Tags</option>
//             {uniqueTags.map((tag) => (
//               <option key={tag} value={tag}>
//                 {tag}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Rating Filter Buttons */}
//       <div className="mb-5">
//         <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-2">
//           {[
//             800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800,
//             1900, 2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900,
//           ].map((rating) => (
//             <button
//               key={rating}
//               onClick={() => setSelectedRating(rating)}
//               className={`w-24 p-2 rounded transition ${
//                 selectedRating === rating
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-200 text-black hover:bg-blue-500"
//               }`}
//             >
//               {rating}
//             </button>
//           ))}
//           <button
//             onClick={() => setSelectedRating(null)}
//             className={`p-2 rounded transition ${
//               selectedRating === null
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-300 text-black hover:bg-gray-400"
//             }`}
//           >
//             All Ratings
//           </button>
//         </div>
//       </div>

//       {/* Problem List */}
//       <ul className="list-none p-0">
//         {currentItems.map((problem) => (
//           <li
//             key={problem.id}
//             className={`flex items-center justify-between bg-white shadow p-4 mb-2 rounded transition ${
//               checkedProblem === problem.name ? "bg-green-200" : "bg-gray-100"
//             }`}
//           >
//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 checked={checkedProblem === problem.name}
//                 onChange={() => handleCheckboxChange(problem.name)}
//                 className="mr-4"
//               />
//               <div>
//                 <a
//                   href={`https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-600 text-lg font-semibold hover:underline"
//                 >
//                   {problem.name}
//                 </a>
//                 <div className="mt-1">
//                   {problem.tags.map((tag) => (
//                     <span
//                       key={tag}
//                       className="bg-green-200 text-gray-700 py-1 px-2 rounded text-xs mr-1"
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//             <div>
//               <span className="bg-blue-600 text-white py-1 px-3 rounded text-sm">
//                 Rating: {problem.rating || "N/A"}
//               </span>
//             </div>
//           </li>
//         ))}
//       </ul>

//       {/* Pagination */}
//       <div className="text-center mt-5">
//         <button
//           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//           disabled={currentPage === 1}
//           className={`p-2 rounded mr-2 ${
//             currentPage === 1
//               ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//               : "bg-blue-600 text-white hover:bg-blue-700"
//           }`}
//         >
//           Previous
//         </button>
//         <span className="mx-4 text-lg">
//           Page {currentPage} of {totalPages}
//         </span>
//         <button
//           onClick={() =>
//             setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//           }
//           disabled={currentPage === totalPages}
//           className={`p-2 rounded ml-2 ${
//             currentPage === totalPages
//               ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//               : "bg-blue-600 text-white hover:bg-blue-700"
//           }`}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Codeforces;

// Style Using Tailwind CSS

// "use client";

// import React, { useEffect, useState } from "react";

// const Codeforces = () => {
//   const [problems, setProblems] = useState<Problem[]>([]);
//   const [filteredProblems, setFilteredProblems] = useState<Problem[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedRating, setSelectedRating] = useState<number | null>(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedTag, setSelectedTag] = useState<string | null>(null);
//   const [checkedProblem, setCheckedProblem] = useState<string | null>(null); // Change from Set to a single number
//   const itemsPerPage = 20;

//   interface Problem {
//     name: string;
//     id: number;
//     contestId: number;
//     index: string;
//     rating: number;
//     tags: string[];
//   }

//   useEffect(() => {
//     const fetchProblems = async () => {
//       try {
//         const res = await fetch(
//           "https://codeforces.com/api/problemset.problems"
//         );

//         if (!res.ok) {
//           throw new Error(`HTTP error! Status: ${res.status}`);
//         }

//         const data = await res.json();
//         // console.log(data.result);

//         if (data.result && data.result.problems) {
//           setProblems(data.result.problems);
//           setFilteredProblems(data.result.problems);
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

//   const filterProblems = () => {
//     let filtered = problems;

//     if (selectedRating !== null) {
//       filtered = filtered.filter(
//         (problem) => problem.rating === selectedRating
//       );
//     }

//     if (searchQuery) {
//       filtered = filtered.filter((problem) =>
//         problem.name.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     if (selectedTag) {
//       filtered = filtered.filter((problem) =>
//         problem.tags.includes(selectedTag)
//       );
//     }

//     setFilteredProblems(filtered);
//     setCurrentPage(1);
//   };

//   const handleSearch = () => {
//     filterProblems();
//   };

//   useEffect(() => {
//     filterProblems();
//   }, [selectedRating, problems, selectedTag]);

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentItems = filteredProblems.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );

//   const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);

//   const uniqueTags = [...new Set(problems.flatMap((problem) => problem.tags))];

//   const handleCheckboxChange = (problemName: string) => {
//     setCheckedProblem((prev) => (prev === problemName ? null : problemName)); // Toggle checkbox
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1 style={{ textAlign: "center", marginBottom: "30px" }}></h1>
//       {error && <p style={{ color: "red" }}>Error: {error}</p>}

//       {/* Search Input */}
//       <div style={{ marginBottom: "20px", textAlign: "center" }}>
//         <input
//           type="text"
//           placeholder="Search problems..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           style={{
//             padding: "10px",
//             width: "300px",
//             borderRadius: "5px",
//             border: "1px solid #ccc",
//             marginBottom: "10px",
//           }}
//         />
//         <button
//           onClick={handleSearch}
//           style={{
//             padding: "10px 20px",
//             marginLeft: "10px",
//             borderRadius: "5px",
//             border: "none",
//             backgroundColor: "#0070f3",
//             color: "#fff",
//             cursor: "pointer",
//           }}
//         >
//           Search
//         </button>

//         {/* Tag Dropdown */}
//         <div style={{ marginBottom: "20px", textAlign: "center" }}>
//           <select
//             value={selectedTag || ""}
//             onChange={(e) => setSelectedTag(e.target.value)}
//             style={{
//               padding: "10px",
//               width: "200px",
//               borderRadius: "5px",
//               border: "1px solid #ccc",
//             }}
//           >
//             <option value="">All Tags</option>
//             {uniqueTags.map((tag) => (
//               <option key={tag} value={tag}>
//                 {tag}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Rating Filter Buttons */}
//       <div style={{ marginBottom: "20px", textAlign: "center" }}>
//         {[
//           800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900,
//           2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900,
//         ].map((rating) => (
//           <button
//             key={rating}
//             onClick={() => setSelectedRating(rating)}
//             style={{
//               padding: "10px 20px",
//               margin: "5px",
//               borderRadius: "5px",
//               border: "none",
//               backgroundColor:
//                 selectedRating === rating ? "#0070f3" : "#e0e0e0",
//               color: selectedRating === rating ? "#fff" : "#000",
//               cursor: "pointer",
//               transition: "background-color 0.3s, transform 0.3s",
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.transform = "scale(1.05)";
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.transform = "scale(1)";
//             }}
//           >
//             {rating}
//           </button>
//         ))}
//         <button
//           onClick={() => setSelectedRating(null)}
//           style={{
//             padding: "10px 20px",
//             margin: "5px",
//             borderRadius: "5px",
//             border: "none",
//             backgroundColor: selectedRating === null ? "#0070f3" : "#e0e0e0",
//             color: selectedRating === null ? "#fff" : "#000",
//             cursor: "pointer",
//             transition: "background-color 0.3s, transform 0.3s",
//           }}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.transform = "scale(1.05)";
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.transform = "scale(1)";
//           }}
//         >
//           All Ratings
//         </button>
//       </div>

//       {/* Problem List */}
//       <ul style={{ listStyleType: "none", padding: "0" }}>
//         {currentItems.map((problem) => (
//           <li
//             key={problem.id}
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//               background:
//                 checkedProblem === problem.name ? "#14ed05" : "#f9f9f9", // Change background color if checked
//               borderRadius: "8px",
//               padding: "15px",
//               marginBottom: "10px",
//               boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//             }}
//           >
//             <div style={{ display: "flex", alignItems: "center" }}>
//               <input
//                 type="checkbox"
//                 checked={checkedProblem === problem.name} // Adjust to reflect only one checkbox checked at a time
//                 onChange={() => handleCheckboxChange(problem.name)}
//                 style={{ marginRight: "15px" }}
//               />
//               <div>
//                 <a
//                   href={`https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   style={{
//                     textDecoration: "none",
//                     color: "#0070f3",
//                     fontSize: "18px",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   {problem.name}
//                 </a>
//                 <div style={{ marginTop: "5px" }}>
//                   {problem.tags.map((tag) => (
//                     <span
//                       key={tag}
//                       style={{
//                         background: "#9cf296",
//                         color: "#333",
//                         padding: "2px 8px",
//                         borderRadius: "4px",
//                         fontSize: "12px",
//                         marginRight: "5px",
//                       }}
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//             <div>
//               <span
//                 style={{
//                   background: "#0070f3",
//                   color: "#fff",
//                   padding: "5px 10px",
//                   borderRadius: "5px",
//                   fontSize: "14px",
//                 }}
//               >
//                 Rating: {problem.rating || "N/A"}
//               </span>
//             </div>
//           </li>
//         ))}
//       </ul>

//       {/* Pagination */}
//       <div style={{ textAlign: "center", marginTop: "20px" }}>
//         <button
//           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//           disabled={currentPage === 1}
//           style={{
//             padding: "10px 20px",
//             marginRight: "10px",
//             borderRadius: "5px",
//             border: "none",
//             backgroundColor: currentPage === 1 ? "#e0e0e0" : "#0070f3",
//             color: currentPage === 1 ? "#999" : "#fff",
//             cursor: currentPage === 1 ? "not-allowed" : "pointer",
//           }}
//         >
//           Previous
//         </button>
//         <span style={{ margin: "0 15px", fontSize: "16px" }}>
//           Page {currentPage} of {totalPages}
//         </span>
//         <button
//           onClick={() =>
//             setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//           }
//           disabled={currentPage === totalPages}
//           style={{
//             padding: "10px 20px",
//             marginLeft: "10px",
//             borderRadius: "5px",
//             border: "none",
//             backgroundColor: currentPage === totalPages ? "#e0e0e0" : "#0070f3",
//             color: currentPage === totalPages ? "#999" : "#fff",
//             cursor: currentPage === totalPages ? "not-allowed" : "pointer",
//           }}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Codeforces;

// Checkbox implemented for one row ------------------------->

// // // CheckBox Update

// "use client";

// import React, { useEffect, useState } from "react";

// const Codeforces = () => {
//   const [problems, setProblems] = useState<Problem[]>([]);
//   const [filteredProblems, setFilteredProblems] = useState<Problem[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedRating, setSelectedRating] = useState<number | null>(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedTag, setSelectedTag] = useState<string | null>(null);
//   const [checkedProblems, setCheckedProblems] = useState<Set<number>>(
//     new Set()
//   );
//   const itemsPerPage = 20;

//   interface Problem {
//     name: string;
//     id: number;
//     contestId: number;
//     index: string;
//     rating: number;
//     tags: string[];
//   }

//   useEffect(() => {
//     const fetchProblems = async () => {
//       try {
//         const res = await fetch(
//           "https://codeforces.com/api/problemset.problems"
//         );

//         if (!res.ok) {
//           throw new Error(`HTTP error! Status: ${res.status}`);
//         }

//         const data = await res.json();
//         console.log(data.result);

//         if (data.result && data.result.problems) {
//           setProblems(data.result.problems);
//           setFilteredProblems(data.result.problems);
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

//   const filterProblems = () => {
//     let filtered = problems;

//     if (selectedRating !== null) {
//       filtered = filtered.filter(
//         (problem) => problem.rating === selectedRating
//       );
//     }

//     if (searchQuery) {
//       filtered = filtered.filter((problem) =>
//         problem.name.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     if (selectedTag) {
//       filtered = filtered.filter((problem) =>
//         problem.tags.includes(selectedTag)
//       );
//     }

//     setFilteredProblems(filtered);
//     setCurrentPage(1);
//   };

//   const handleSearch = () => {
//     filterProblems();
//   };

//   useEffect(() => {
//     filterProblems();
//   }, [selectedRating, problems, selectedTag]);

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentItems = filteredProblems.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );

//   const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);

//   const uniqueTags = [...new Set(problems.flatMap((problem) => problem.tags))];

//   const handleCheckboxChange = (problemId: number) => {
//     setCheckedProblems((prev) => {
//       const newCheckedProblems = new Set(prev);
//       if (newCheckedProblems.has(problemId)) {
//         newCheckedProblems.delete(problemId);
//       } else {
//         newCheckedProblems.add(problemId);
//       }
//       return newCheckedProblems;
//     });
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1 style={{ textAlign: "center", marginBottom: "30px" }}></h1>
//       {error && <p style={{ color: "red" }}>Error: {error}</p>}

//       {/* Search Input */}
//       <div style={{ marginBottom: "20px", textAlign: "center" }}>
//         <input
//           type="text"
//           placeholder="Search problems..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           style={{
//             padding: "10px",
//             width: "300px",
//             borderRadius: "5px",
//             border: "1px solid #ccc",
//             marginBottom: "10px",
//           }}
//         />
//         <button
//           onClick={handleSearch}
//           style={{
//             padding: "10px 20px",
//             marginLeft: "10px",
//             borderRadius: "5px",
//             border: "none",
//             backgroundColor: "#0070f3",
//             color: "#fff",
//             cursor: "pointer",
//           }}
//         >
//           Search
//         </button>

//         {/* Tag Dropdown */}
//         <div style={{ marginBottom: "20px", textAlign: "center" }}>
//           <select
//             value={selectedTag || ""}
//             onChange={(e) => setSelectedTag(e.target.value)}
//             style={{
//               padding: "10px",
//               width: "200px",
//               borderRadius: "5px",
//               border: "1px solid #ccc",
//             }}
//           >
//             <option value="">All Tags</option>
//             {uniqueTags.map((tag) => (
//               <option key={tag} value={tag}>
//                 {tag}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Rating Filter Buttons */}
//       <div style={{ marginBottom: "20px", textAlign: "center" }}>
//         {[
//           800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900,
//           2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900,
//         ].map((rating) => (
//           <button
//             key={rating}
//             onClick={() => setSelectedRating(rating)}
//             style={{
//               padding: "10px 20px",
//               margin: "5px",
//               borderRadius: "5px",
//               border: "none",
//               backgroundColor:
//                 selectedRating === rating ? "#0070f3" : "#e0e0e0",
//               color: selectedRating === rating ? "#fff" : "#000",
//               cursor: "pointer",
//               transition: "background-color 0.3s, transform 0.3s",
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.transform = "scale(1.05)";
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.transform = "scale(1)";
//             }}
//           >
//             {rating}
//           </button>
//         ))}
//         <button
//           onClick={() => setSelectedRating(null)}
//           style={{
//             padding: "10px 20px",
//             margin: "5px",
//             borderRadius: "5px",
//             border: "none",
//             backgroundColor: selectedRating === null ? "#0070f3" : "#e0e0e0",
//             color: selectedRating === null ? "#fff" : "#000",
//             cursor: "pointer",
//             transition: "background-color 0.3s, transform 0.3s",
//           }}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.transform = "scale(1.05)";
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.transform = "scale(1)";
//           }}
//         >
//           All Ratings
//         </button>
//       </div>

//       {/* Problem List */}
//       <ul style={{ listStyleType: "none", padding: "0" }}>
//         {currentItems.map((problem) => (
//           <li
//             key={problem.id}
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//               background: checkedProblems.has(problem.id)
//                 ? "#d4edda"
//                 : "#f9f9f9", // Change background color if checked
//               borderRadius: "8px",
//               padding: "15px",
//               marginBottom: "10px",
//               boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//             }}
//           >
//             <div style={{ display: "flex", alignItems: "center" }}>
//               <input
//                 type="checkbox"
//                 checked={checkedProblems.has(problem.id)}
//                 onChange={() => handleCheckboxChange(problem.id)}
//                 style={{ marginRight: "15px" }}
//               />
//               <div>
//                 <a
//                   href={`https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   style={{
//                     textDecoration: "none",
//                     color: "#0070f3",
//                     fontSize: "18px",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   {problem.name}
//                 </a>
//                 <div style={{ marginTop: "5px" }}>
//                   {problem.tags.map((tag) => (
//                     <span
//                       key={tag}
//                       style={{
//                         background: "#e0e0e0",
//                         color: "#333",
//                         padding: "2px 8px",
//                         borderRadius: "4px",
//                         fontSize: "12px",
//                         marginRight: "5px",
//                       }}
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//             <div>
//               <span
//                 style={{
//                   background: "#0070f3",
//                   color: "#fff",
//                   padding: "5px 10px",
//                   borderRadius: "5px",
//                   fontSize: "14px",
//                 }}
//               >
//                 Rating: {problem.rating || "N/A"}
//               </span>
//             </div>
//           </li>
//         ))}
//       </ul>

//       {/* Pagination */}
//       <div style={{ textAlign: "center", marginTop: "20px" }}>
//         <button
//           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//           disabled={currentPage === 1}
//           style={{
//             padding: "10px 20px",
//             marginRight: "10px",
//             borderRadius: "5px",
//             border: "none",
//             backgroundColor: currentPage === 1 ? "#e0e0e0" : "#0070f3",
//             color: currentPage === 1 ? "#999" : "#fff",
//             cursor: currentPage === 1 ? "not-allowed" : "pointer",
//           }}
//         >
//           Previous
//         </button>
//         <span style={{ margin: "0 15px", fontSize: "16px" }}>
//           Page {currentPage} of {totalPages}
//         </span>
//         <button
//           onClick={() =>
//             setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//           }
//           disabled={currentPage === totalPages}
//           style={{
//             padding: "10px 20px",
//             marginLeft: "10px",
//             borderRadius: "5px",
//             border: "none",
//             backgroundColor: currentPage === totalPages ? "#e0e0e0" : "#0070f3",
//             color: currentPage === totalPages ? "#999" : "#fff",
//             cursor: currentPage === totalPages ? "not-allowed" : "pointer",
//           }}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Codeforces;

// CheckBox Update ----------------------------->

// "use client";

// import React, { useEffect, useState } from "react";

// const Codeforces = () => {
//   const [problems, setProblems] = useState([]);
//   const [filteredProblems, setFilteredProblems] = useState([]);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedRating, setSelectedRating] = useState<number | null>(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedTag, setSelectedTag] = useState<string | null>(null);
//   const [checkedProblems, setCheckedProblems] = useState<Set<number>>(
//     new Set()
//   );
//   const itemsPerPage = 20;

//   interface Problem {
//     name: string;
//     id: number;
//     event: string;
//     resource: string;
//     href: string;
//     start: string;
//     end: string;
//     rating: number;
//     tags: string[];
//   }

//   useEffect(() => {
//     const fetchProblems = async () => {
//       try {
//         const res = await fetch(
//           "https://codeforces.com/api/problemset.problems"
//         ); // This should be correct

//         if (!res.ok) {
//           throw new Error(`HTTP error! Status: ${res.status}`);
//         }

//         const data = await res.json();
//         console.log(data.result);

//         if (data.result && data.result.problems) {
//           setProblems(data.result.problems);
//           setFilteredProblems(data.result.problems);
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

//   // Filter problems based on selected rating, search query, and selected tag
//   const filterProblems = () => {
//     let filtered = problems;

//     if (selectedRating !== null) {
//       filtered = filtered.filter(
//         (problem) => problem.rating === selectedRating
//       );
//     }

//     if (searchQuery) {
//       filtered = filtered.filter((problem) =>
//         problem.name.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     if (selectedTag) {
//       filtered = filtered.filter((problem) =>
//         problem.tags.includes(selectedTag)
//       );
//     }

//     setFilteredProblems(filtered);
//     setCurrentPage(1); // Reset to first page when filtering
//   };

//   const handleSearch = () => {
//     filterProblems();
//   };

//   useEffect(() => {
//     filterProblems();
//   }, [selectedRating, problems, selectedTag]);

//   // Calculate the current items to display based on the current page
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentItems = filteredProblems.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );

//   const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);

//   // Get all unique tags from the problems
//   const uniqueTags = [...new Set(problems.flatMap((problem) => problem.tags))];

//   const getResourceLogo = (resource: string) => {
//     switch (resource) {
//       case "codeforces.com":
//         return "https://art.npanuhin.me/SVG/Codeforces/Codeforces.colored.svg";
//       default:
//         return "https://via.placeholder.com/50"; // Placeholder image
//     }
//   };

//   const handleCheckboxChange = (problemId: number) => {
//     setCheckedProblems((prev) => {
//       const newCheckedProblems = new Set(prev);
//       if (newCheckedProblems.has(problemId)) {
//         newCheckedProblems.delete(problemId);
//       } else {
//         newCheckedProblems.add(problemId);
//       }
//       return newCheckedProblems;
//     });
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1 style={{ textAlign: "center", marginBottom: "30px" }}></h1>
//       {error && <p style={{ color: "red" }}>Error: {error}</p>}

//       {/* Search Input */}
//       <div style={{ marginBottom: "20px", textAlign: "center" }}>
//         <input
//           type="text"
//           placeholder="Search problems..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           style={{
//             padding: "10px",
//             width: "300px",
//             borderRadius: "5px",
//             border: "1px solid #ccc",
//             marginBottom: "10px",
//           }}
//         />
//         <button
//           onClick={handleSearch}
//           style={{
//             padding: "10px 20px",
//             marginLeft: "10px",
//             borderRadius: "5px",
//             border: "none",
//             backgroundColor: "#0070f3",
//             color: "#fff",
//             cursor: "pointer",
//           }}
//         >
//           Search
//         </button>

//         {/* Tag Dropdown */}
//         <div style={{ marginBottom: "20px", textAlign: "center" }}>
//           <select
//             value={selectedTag || ""}
//             onChange={(e) => setSelectedTag(e.target.value)}
//             style={{
//               padding: "10px",
//               width: "200px",
//               borderRadius: "5px",
//               border: "1px solid #ccc",
//             }}
//           >
//             <option value="">All Tags</option>
//             {uniqueTags.map((tag) => (
//               <option key={tag} value={tag}>
//                 {tag}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Rating Filter Buttons */}
//       <div style={{ marginBottom: "20px", textAlign: "center" }}>
//         {[
//           800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900,
//           2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900,
//         ].map((rating) => (
//           <button
//             key={rating}
//             onClick={() => setSelectedRating(rating)}
//             style={{
//               padding: "10px 20px",
//               margin: "5px",
//               borderRadius: "5px",
//               border: "none",
//               backgroundColor:
//                 selectedRating === rating ? "#0070f3" : "#e0e0e0",
//               color: selectedRating === rating ? "#fff" : "#000",
//               cursor: "pointer",
//               transition: "background-color 0.3s, transform 0.3s",
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.transform = "scale(1.05)";
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.transform = "scale(1)";
//             }}
//           >
//             {rating}
//           </button>
//         ))}
//         <button
//           onClick={() => setSelectedRating(null)}
//           style={{
//             padding: "10px 20px",
//             margin: "5px",
//             borderRadius: "5px",
//             border: "none",
//             backgroundColor: selectedRating === null ? "#0070f3" : "#e0e0e0",
//             color: selectedRating === null ? "#fff" : "#000",
//             cursor: "pointer",
//             transition: "background-color 0.3s, transform 0.3s",
//           }}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.transform = "scale(1.05)";
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.transform = "scale(1)";
//           }}
//         >
//           All Ratings
//         </button>
//       </div>

//       {/* Problem List */}
//       <ul style={{ listStyleType: "none", padding: "0" }}>
//         {currentItems.map((problem) => (
//           <li
//             key={`${problem.id}`}
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//               background: checkedProblems.has(problem.id)
//                 ? "#d4edda"
//                 : "#f9f9f9", // Change background color if checked
//               borderRadius: "8px",
//               padding: "15px",
//               marginBottom: "10px",
//               boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//             }}
//           >
//             <div style={{ display: "flex", alignItems: "center" }}>
//               <input
//                 type="checkbox"
//                 checked={checkedProblems.has(problem.id)}
//                 onChange={() => handleCheckboxChange(problem.id)}
//                 style={{ marginRight: "15px" }}
//               />
//               <div>
//                 <a
//                   href={`https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   style={{
//                     textDecoration: "none",
//                     color: "#0070f3",
//                     fontSize: "18px",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   {problem.name}
//                 </a>
//                 <div style={{ marginTop: "5px" }}>
//                   {problem.tags.map((tag) => (
//                     <span
//                       key={tag}
//                       style={{
//                         background: "#e0e0e0",
//                         color: "#333",
//                         padding: "2px 8px",
//                         borderRadius: "4px",
//                         fontSize: "12px",
//                         marginRight: "5px",
//                       }}
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//             <div>
//               <span
//                 style={{
//                   background: "#0070f3",
//                   color: "#fff",
//                   padding: "5px 10px",
//                   borderRadius: "5px",
//                   fontSize: "14px",
//                 }}
//               >
//                 Rating: {problem.rating || "N/A"}
//               </span>
//             </div>
//           </li>
//         ))}
//       </ul>

//       {/* Pagination */}
//       <div style={{ textAlign: "center", marginTop: "20px" }}>
//         <button
//           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//           disabled={currentPage === 1}
//           style={{
//             padding: "10px 20px",
//             marginRight: "10px",
//             borderRadius: "5px",
//             border: "none",
//             backgroundColor: currentPage === 1 ? "#e0e0e0" : "#0070f3",
//             color: currentPage === 1 ? "#999" : "#fff",
//             cursor: currentPage === 1 ? "not-allowed" : "pointer",
//           }}
//         >
//           Previous
//         </button>
//         <span style={{ margin: "0 15px", fontSize: "16px" }}>
//           Page {currentPage} of {totalPages}
//         </span>
//         <button
//           onClick={() =>
//             setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//           }
//           disabled={currentPage === totalPages}
//           style={{
//             padding: "10px 20px",
//             marginLeft: "10px",
//             borderRadius: "5px",
//             border: "none",
//             backgroundColor: currentPage === totalPages ? "#e0e0e0" : "#0070f3",
//             color: currentPage === totalPages ? "#999" : "#fff",
//             cursor: currentPage === totalPages ? "not-allowed" : "pointer",
//           }}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Codeforces;

// First Update

// "use client";

// import React, { useEffect, useState } from "react";

// const Codeforces = () => {
//   const [problems, setProblems] = useState([]);
//   const [filteredProblems, setFilteredProblems] = useState([]);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedRating, setSelectedRating] = useState<number | null>(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedTag, setSelectedTag] = useState<string | null>(null);
//   const itemsPerPage = 20;

//   interface Problem {
//     name: string;
//     id: number;
//     event: string;
//     resource: string;
//     href: string;
//     start: string;
//     end: string;
//     rating: number;
//   }

//   useEffect(() => {
//     const fetchProblems = async () => {
//       try {
//         const res = await fetch(
//           "https://codeforces.com/api/problemset.problems"
//         ); // This should be correct

//         if (!res.ok) {
//           throw new Error(`HTTP error! Status: ${res.status}`);
//         }

//         const data = await res.json();
//         console.log(data.result);

//         if (data.result && data.result.problems) {
//           setProblems(data.result.problems);
//           setFilteredProblems(data.result.problems);
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

//   // Filter problems based on selected rating, search query, and selected tag
//   const filterProblems = () => {
//     let filtered = problems;

//     if (selectedRating !== null) {
//       filtered = filtered.filter(
//         (problem) => problem.rating === selectedRating
//       );
//     }

//     if (searchQuery) {
//       filtered = filtered.filter((problem) =>
//         problem.name.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     if (selectedTag) {
//       filtered = filtered.filter((problem) =>
//         problem.tags.includes(selectedTag)
//       );
//     }

//     setFilteredProblems(filtered);
//     setCurrentPage(1); // Reset to first page when filtering
//   };

//   const handleSearch = () => {
//     filterProblems();
//   };

//   useEffect(() => {
//     filterProblems();
//   }, [selectedRating, problems, selectedTag]);

//   // Calculate the current items to display based on the current page
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentItems = filteredProblems.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );

//   const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);

//   // Get all unique tags from the problems
//   const uniqueTags = [...new Set(problems.flatMap((problem) => problem.tags))];

//   const getResourceLogo = (resource: string) => {
//     switch (resource) {
//       case "codeforces.com":
//         return "https://art.npanuhin.me/SVG/Codeforces/Codeforces.colored.svg";
//       default:
//         return "https://via.placeholder.com/50"; // Placeholder image
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1 style={{ textAlign: "center", marginBottom: "30px" }}></h1>
//       {error && <p style={{ color: "red" }}>Error: {error}</p>}

//       {/* Search Input */}
//       <div style={{ marginBottom: "20px", textAlign: "center" }}>
//         <input
//           type="text"
//           placeholder="Search problems..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           style={{
//             padding: "10px",
//             width: "300px",
//             borderRadius: "5px",
//             border: "1px solid #ccc",
//             marginBottom: "10px",
//           }}
//         />
//         <button
//           onClick={handleSearch}
//           style={{
//             padding: "10px 20px",
//             marginLeft: "10px",
//             borderRadius: "5px",
//             border: "none",
//             backgroundColor: "#0070f3",
//             color: "#fff",
//             cursor: "pointer",
//           }}
//         >
//           Search
//         </button>

//         {/* Tag Dropdown */}

//         <div style={{ marginBottom: "20px", textAlign: "center" }}>
//           <select
//             value={selectedTag || ""}
//             onChange={(e) => setSelectedTag(e.target.value)}
//             style={{
//               padding: "10px",
//               width: "200px",
//               borderRadius: "5px",
//               border: "1px solid #ccc",
//             }}
//           >
//             <option value="">All Tags</option>
//             {uniqueTags.map((tag) => (
//               <option key={tag} value={tag}>
//                 {tag}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Rating Filter Buttons */}
//       <div style={{ marginBottom: "20px", textAlign: "center" }}>
//         {[
//           800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900,
//           2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900,
//         ].map((rating) => (
//           <button
//             key={rating}
//             onClick={() => setSelectedRating(rating)}
//             style={{
//               padding: "10px 20px",
//               margin: "5px",
//               borderRadius: "5px",
//               border: "none",
//               backgroundColor:
//                 selectedRating === rating ? "#0070f3" : "#e0e0e0",
//               color: selectedRating === rating ? "#fff" : "#000",
//               cursor: "pointer",
//               transition: "background-color 0.3s, transform 0.3s",
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.transform = "scale(1.05)";
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.transform = "scale(1)";
//             }}
//           >
//             {rating}
//           </button>
//         ))}
//         <button
//           onClick={() => setSelectedRating(null)}
//           style={{
//             padding: "10px 20px",
//             margin: "5px",
//             borderRadius: "5px",
//             border: "none",
//             backgroundColor: selectedRating === null ? "#0070f3" : "#e0e0e0",
//             color: selectedRating === null ? "#fff" : "#000",
//             cursor: "pointer",
//             transition: "background-color 0.3s, transform 0.3s",
//           }}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.transform = "scale(1.05)";
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.transform = "scale(1)";
//           }}
//         >
//           All Ratings
//         </button>
//       </div>

//       {/* Problem List */}
//       <ul style={{ listStyleType: "none", padding: "0" }}>
//         {currentItems.map((problem) => (
//           <li
//             key={`${problem.contestId}-${problem.index}`}
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//               background: "#f9f9f9",
//               borderRadius: "8px",
//               padding: "15px",
//               marginBottom: "10px",
//               boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//             }}
//           >
//             <div style={{ display: "flex", alignItems: "center" }}>
//               {/* <img
//                 src={getResourceLogo("codeforces.com")}
//                 alt={`Codeforces logo`}
//                 style={{
//                   width: "50px",
//                   height: "50px",
//                   marginRight: "15px",
//                   borderRadius: "50%",
//                 }}
//               /> */}
//               <div>
//                 <a
//                   href={`https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   style={{
//                     textDecoration: "none",
//                     color: "#0070f3",
//                     fontSize: "18px",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   {problem.name}
//                 </a>
//                 <div style={{ marginTop: "5px" }}>
//                   {problem.tags.map((tag) => (
//                     <span
//                       key={tag}
//                       style={{
//                         background: "#e0e0e0",
//                         color: "#333",
//                         padding: "2px 8px",
//                         borderRadius: "4px",
//                         fontSize: "12px",
//                         marginRight: "5px",
//                       }}
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//             <div>
//               <span
//                 style={{
//                   background: "#0070f3",
//                   color: "#fff",
//                   padding: "5px 10px",
//                   borderRadius: "5px",
//                   fontSize: "14px",
//                 }}
//               >
//                 Rating: {problem.rating || "N/A"}
//               </span>
//             </div>
//           </li>
//         ))}
//       </ul>

//       {/* Pagination */}
//       <div style={{ textAlign: "center", marginTop: "20px" }}>
//         <button
//           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//           disabled={currentPage === 1}
//           style={{
//             padding: "10px 20px",
//             marginRight: "10px",
//             borderRadius: "5px",
//             border: "none",
//             backgroundColor: currentPage === 1 ? "#e0e0e0" : "#0070f3",
//             color: currentPage === 1 ? "#999" : "#fff",
//             cursor: currentPage === 1 ? "not-allowed" : "pointer",
//           }}
//         >
//           Previous
//         </button>
//         <span style={{ margin: "0 15px", fontSize: "16px" }}>
//           Page {currentPage} of {totalPages}
//         </span>
//         <button
//           onClick={() =>
//             setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//           }
//           disabled={currentPage === totalPages}
//           style={{
//             padding: "10px 20px",
//             marginLeft: "10px",
//             borderRadius: "5px",
//             border: "none",
//             backgroundColor: currentPage === totalPages ? "#e0e0e0" : "#0070f3",
//             color: currentPage === totalPages ? "#999" : "#fff",
//             cursor: currentPage === totalPages ? "not-allowed" : "pointer",
//           }}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Codeforces;
