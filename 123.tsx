"use client";

import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import TagInfoComponent from "@/components/TagInfoComponent";

const Codeforces = () => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [filteredProblems, setFilteredProblems] = useState<Problem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [submissionData, setSubmissionData] = useState<Submission[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [showTags, setShowTags] = useState(true);
  const [handle, setHandle] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const itemsPerPage = 20;

  interface Problem {
    name: string;
    id: number;
    contestId: number;
    index: string;
    rating: number;
    tags: string[];
    verdict?: string | null; // Optional verdict field for color-coding
  }

  interface Submission {
    id: number;
    verdict: string;
    problem: {
      contestId: number;
      index: string;
    };
  }

  // Problem fetch ---->
  useEffect(() => {
    const fetchProblems = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "https://codeforces.com/api/problemset.problems"
        );

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();

        if (data.result && data.result.problems) {
          setProblems(data.result.problems);
          setFilteredProblems(data.result.problems);
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

  // Handle search ---->
  const fetchSubmission = async () => {
    if (!handle) {
      setSubmissionData([]);
      filterProblems([]);
      setUserInfo(null);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        `https://codeforces.com/api/user.status?handle=${handle}`
      );

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();

      if (data.result) {
        console.log("Submissions Data:", data.result); // Debugging line
        setSubmissionData(data.result);
        filterProblems(data.result);
        fetchUserInfo();
      } else {
        throw new Error("API response is not in expected format");
      }
    } catch (error) {
      console.error("Error fetching submissions:", error);
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // User Info
  const fetchUserInfo = async () => {
    if (!handle) {
      setUserInfo(null);
      return;
    }

    try {
      const res = await fetch(
        `https://codeforces.com/api/user.info?handles=${handle}`
      );

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();

      if (data.result && data.result.length > 0) {
        setUserInfo(data.result[0]);
      } else {
        throw new Error("API response is not in expected format");
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
      setError((error as Error).message);
    }
  };

  const filterProblems = (submissions: Submission[]) => {
    let filtered = problems;

    if (selectedRating !== null) {
      filtered = filtered.filter(
        (problem) => problem.rating === selectedRating
      );
    }

    if (searchQuery) {
      filtered = filtered.filter((problem) =>
        problem.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter((problem) =>
        selectedTags.every((tag) => problem.tags.includes(tag))
      );
    }

    // Map through problems to set verdict color
    const problemVerdicts = new Map<string, string>();
    submissions.forEach((submission) => {
      const key = `${submission.problem.contestId}-${submission.problem.index}`;
      if (!problemVerdicts.has(key)) {
        problemVerdicts.set(key, submission.verdict);
      }
    });

    filtered = filtered.map((problem) => {
      const key = `${problem.contestId}-${problem.index}`;
      return {
        ...problem,
        verdict: problemVerdicts.get(key) || null,
      };
    });

    setFilteredProblems(filtered);
    setCurrentPage(1);
  };
  const handleClear = () => {
    setSearchQuery("");
    setSelectedTags([]); // Clear the selected tags
    setSelectedRating(null);
    setHandle("");
    setSubmissionData([]);
    setUserInfo(null);
    filterProblems(submissionData); // Reset the filtered problems to include all problems
  };

  const handleTagChange = (tag: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  const handleSearch = () => {
    filterProblems(submissionData);
  };

  const hideProblemTag = () => {
    setShowTags((prev) => !prev); // Toggle the visibility of the tags
  };

  useEffect(() => {
    filterProblems(submissionData);
  }, [selectedRating, problems, selectedTags]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredProblems.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);

  const uniqueTags = Array.from(
    problems.flatMap((problem) => problem.tags)
  ).filter((tag, index, self) => self.indexOf(tag) === index);

  const ringColor = (rating: number) => {
    if (rating < 1200) return "ring-gray-400";
    if (rating < 1400) return "ring-green-600";
    if (rating < 1600) return "ring-cyan-600";
    if (rating < 1900) return "ring-blue-600";
    if (rating < 2100) return "ring-purple-600";
    if (rating < 2300) return "ring-orange-300";
    if (rating < 2400) return "ring-orange-600";
    if (rating < 2600) return "ring-red-400";
    if (rating < 3900) return "ring-red-800";
    return "ring-red-500";
  };

  const textColor = (rating: number) => {
    if (rating < 1200) return "text-gray-400";
    if (rating < 1400) return "text-green-500";
    if (rating < 1600) return "text-cyan-500";
    if (rating < 1900) return "text-blue-500";
    if (rating < 2100) return "text-purple-500";
    if (rating < 2300) return "text-orange-300";
    if (rating < 2400) return "text-orange-500";
    if (rating < 2600) return "text-red-400";
    if (rating < 3900) return "text-red-500";
    return "text-red-600";
  };

  const getHoverColor = (rating: number) => {
    if (rating < 1200) return "hover:bg-gray-900";
    if (rating < 1400) return "hover:bg-green-600";
    if (rating < 1600) return "hover:bg-cyan-600";
    if (rating < 1900) return "hover:bg-blue-600";
    if (rating < 2100) return "hover:bg-purple-600";
    if (rating < 2300) return "hover:bg-orange-300";
    if (rating < 2400) return "hover:bg-orange-600";
    if (rating < 2600) return "hover:bg-red-400";
    if (rating < 3900) return "hover:bg-red-600";
    return "hover:bg-red-200";
  };

  const getButtonColor = (rating: number) => {
    if (rating < 1200) return "bg-gray-40";
    if (rating < 1400) return "bg-green-40";
    if (rating < 1600) return "bg-cyan-40";
    if (rating < 1900) return "bg-blue-40";
    if (rating < 2100) return "bg-purple-40";
    if (rating < 2300) return "bg-orange-40";
    if (rating < 2400) return "bg-orange-40";
    if (rating < 2600) return "bg-red-40";
    if (rating < 3900) return "bg-red-40";
    return "bg-red-40";
  };
  const getBgColor = (rating: number) => {
    if (rating < 1200) return "bg-gray-400";
    if (rating < 1400) return "bg-green-600";
    if (rating < 1600) return "bg-cyan-600";
    if (rating < 1900) return "bg-blue-600";
    if (rating < 2100) return "bg-purple-600";
    if (rating < 2300) return "bg-orange-300";
    if (rating < 2400) return "bg-orange-600";
    if (rating < 2600) return "bg-red-400";
    if (rating < 3900) return "bg-red-600";
    return "bg-red-200";
  };
  const getProgressColor = (rating: number) => {
    if (rating < 1200) return "bg-gray-300";
    if (rating < 1400) return "bg-green-300";
    if (rating < 1600) return "bg-cyan-300";
    if (rating < 1900) return "bg-blue-300";
    if (rating < 2100) return "bg-purple-500";
    if (rating < 2300) return "bg-orange-500";
    if (rating < 2400) return "bg-orange-700";
    if (rating < 2600) return "bg-red-500";
    if (rating < 3900) return "bg-red-700";
    return "bg-red-200";
  };

  const getVerdictColor = (verdict: string | null) => {
    if (verdict === "OK") return "bg-green-800";
    if (verdict === "WRONG_ANSWER") return "bg-red-800";
    return "bg-gray-800"; // Default color for unsolved problems
  };

  const calculateProgress = (rating: number) => {
    // Count problems solved within the rating range
    const solvedProblems = submissionData.filter((submission) => {
      const problemRating = problems.find(
        (problem) =>
          problem.contestId === submission.problem.contestId &&
          problem.index === submission.problem.index
      )?.rating;
      return (
        problemRating !== undefined &&
        problemRating === rating &&
        submission.verdict === "OK"
      );
    }).length;

    // Total problems in this rating range
    const totalProblems = problems.filter(
      (problem) => problem.rating === rating
    ).length;

    // Calculate percentage
    return totalProblems > 0 ? (solvedProblems / totalProblems) * 100 : 0;
  };

  return (
    <div className="p-5 bg-gray-900 min-h-screen">
      <h1 className="text-center mt-9 mb-8 text-3xl font-bold text-white">
        Codeforces Problems
      </h1>
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Loader */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="loader border-t-transparent border-solid rounded-full border-blue-400 border-4 h-16 w-16 animate-spin"></div>
        </div>
      )}

      {!loading && (
        <>
          {/* Search and Fetch Buttons */}
          <div className="mb-5 text-center flex flex-col items-center">
            <div className="flex flex-col md:flex-row items-center justify-center mb-4 space-y-2 md:space-y-0 md:space-x-2 md:w-auto">
              <input
                type="text"
                placeholder="CF handle..."
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                className="p-2 w-full bg-gray-800 text-white hover:ring-blue-500 ring-1 md:w-auto rounded"
              />
              <button
                onClick={fetchSubmission}
                className="p-2 md:ml-2 rounded bg-blue-500 text-white hover:bg-blue-700 transition duration-500 ease-in-out"
              >
                Search CF
              </button>
              <button
                onClick={handleClear}
                className="p-2 md:w-auto md:ml-2 rounded bg-red-500 text-white hover:bg-red-800 transition duration-500 ease-in-out shadow-md shadow-red-500/50"
              >
                Clear
              </button>
            </div>

            <div>
              <input
                type="text"
                placeholder="Search problems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-2 md:w-72 bg-gray-800 text-white rounded ring-1 hover:ring-blue-500 mb-2 md:mb-0"
              />
              <button
                onClick={handleSearch}
                className="p-2 ml-2 rounded bg-blue-500 text-white hover:bg-blue-700 transition duration-500 ease-in-out mt-2"
              >
                Search
              </button>
              <button
                onClick={hideProblemTag}
                className="p-2 ml-2 rounded bg-gray-500 text-white hover:bg-gray-800 shadow-md shadow-gray-500/50 transition duration-500 ease-in-out mt-2"
              >
                {showTags ? "Hide Problem Tag" : "Show Problem Tag"}
              </button>
            </div>

            {/* User Info Card */}
            {userInfo && (
              // <div className="max-w-80 md:w-1/2 mx-auto mb-5 p-4 bg-gray-800 text-white rounded-lg shadow-lg mt-4">
              <div
                className={`max-w-80 md:w-1/2 mx-auto mb-5 p-4 ${getBgColor(
                  userInfo.rating
                )} text-black rounded-lg shadow-lg mt-4`}
              >
                <div className="flex items-center mb-4">
                  <img
                    src={userInfo.avatar}
                    alt={userInfo.handle}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h2 className="text-xl font-bold">{userInfo.handle}</h2>
                    <p>Rating: {userInfo.rating}</p>
                    <p>Max Rating: {userInfo.maxRating}</p>
                    <p>Friends: {userInfo.friendOfCount}</p>
                    <p>Rank: {userInfo.rank}</p>
                    <p>Max Rank: {userInfo.maxRank}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Tag Checkboxes */}
            <div className="mt-9 p-6 flex flex-wrap justify-center gap-2">
              {uniqueTags.map((tag) => (
                <label key={tag} className="inline-flex items-center mr-4">
                  <input
                    type="checkbox"
                    checked={selectedTags.includes(tag)}
                    onChange={() => handleTagChange(tag)}
                    className="form-checkbox"
                  />
                  <span className="cursor-pointer inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-green-600 ring-1 ring-inset ring-blue-600/20">
                    {tag}
                  </span>
                </label>
              ))}
            </div>

            {/* Rating Buttons */}
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {[
                800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800,
                1900, 2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800,
                2900, 3000,
              ].map((rating) => {
                const progress = calculateProgress(rating);
                return (
                  <div
                    key={rating}
                    className="relative w-31 p-2 rounded bg-gray-800 text-white"
                  >
                    <button
                      onClick={() => setSelectedRating(rating)}
                      className={`w-28 p-2 rounded transition ${
                        selectedRating === rating
                          ? `${getBgColor(rating)} text-black`
                          : `items-center rounded-md ${getButtonColor(
                              rating
                            )} px-2 py-1 text-lg font-medium ${textColor(
                              rating
                            )} ring-1 ring-inset ${ringColor(
                              rating
                            )} ${getHoverColor(
                              rating
                            )} hover:text-white transition duration-500 ease-in-out`
                      }`}
                    >
                      {rating}
                    </button>
                    <div className="absolute bottom-0 left-0 w-full h-3 overflow-visible opacity-20 bg-gray-800 rounded">
                      <div
                        className={`h-full ${getProgressColor(rating)} rounded`}
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
              <button
                onClick={() => setSelectedRating(null)}
                className={`p-2 rounded transition ${
                  selectedRating === null
                    ? "text-white bg-indigo-500 shadow-md shadow-indigo-500/50 hover:bg-indigo-600 transition duration-500 ease-in-out"
                    : "bg-gray-600 shadow-md text-white shadow-gray-600/50 hover:bg-gray-900 transition duration-500 ease-in-out"
                }`}
              >
                All Ratings
              </button>
            </div>
          </div>

          {/* Problem List */}
          <ul className="list-none p-4 mt-5 space-y-2">
            {currentItems.map((problem: any) => (
              <li
                key={problem.id}
                className={`flex flex-col md:flex-row items-center justify-between ${getVerdictColor(
                  problem.verdict
                )} hover:bg-gray-900 shadow-lg p-4 rounded border transition hover:border-blue-900`}
              >
                <div className="flex md:flex-row items-center">
                  <span className="inline-block bg-gray-400 text-gray-800 py-1 px-2 rounded text-sm mr-3">
                    {problem.index}
                  </span>
                  <div>
                    <a
                      href={`https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 text-lg font-semibold hover:text-purple-700 hover:duration-500"
                    >
                      {problem.name}
                    </a>
                  </div>
                </div>
                <div className="mt-1">
                  {showTags &&
                    problem.tags.map((tag: any) => (
                      <button
                        key={tag}
                        onClick={() => {
                          setIsDrawerOpen(true);
                          setSelectedTag(tag);
                        }}
                        className="mr-1 mb-0 inline-block"
                      >
                        <Badge
                          key={tag}
                          variant="outline"
                          className="mr-2 mb-2 inline-block text-white hover:border-green-900 hover:text-green-500"
                        >
                          {tag}
                        </Badge>
                      </button>
                    ))}
                </div>
                <div className="mt-2 md:mt-0">
                  <span
                    className={`inline-flex items-center rounded-md ${getButtonColor(
                      problem.rating
                    )} px-2 py-1 text-sm font-medium ${textColor(
                      problem.rating
                    )} ring-1 ring-inset ${ringColor(problem.rating)}`}
                  >
                    Rating: {problem.rating || "N/A"}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          {/* Pagination */}
          <div className="text-center mt-5 flex-col items-center gap-2 md:flex-row md:gap-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded mr-2 ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-900 cursor-not-allowed"
                  : "bg-blue-800 text-white hover:bg-blue-700"
              }`}
            >
              Previous
            </button>
            <span className="mx-4 text-lg text-white">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`p-2 rounded ml-2 ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Seleted Tage */}

      {selectedTag && (
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <DrawerContent className="bg-gray-900 text-white">
            <DrawerHeader>
              <DrawerTitle className="text-xl font-bold capitalize">
                {selectedTag}
              </DrawerTitle>
              <DrawerDescription>
                Problems related to the "{selectedTag}" tag.
                <TagInfoComponent selectedTags={selectedTags} />
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 max-h-[50vh] overflow-y-auto"></div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};

export default Codeforces;
