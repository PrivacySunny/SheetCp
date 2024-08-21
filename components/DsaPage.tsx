"use client";

import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

const QuestionList: React.FC = () => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [tags, setTags] = useState("");
  const [questions, setQuestions] = useState<any[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState<string>("");

  const difficultyTextColors: { [key: string]: string } = {
    easy: "text-green-500",
    medium: "text-yellow-500",
    hard: "text-red-500",
  };

  const difficultyRingColor: { [key: string]: string } = {
    easy: "ring-green-500",
    medium: "ring-yellow-500",
    hard: "ring-red-500",
  };

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/questions", {
        cache: "no-store",
      });
      const data = await response.json();
      // console.log(data);
      if (response.ok) {
        setQuestions(data);
        setFilteredQuestions(data);
      } else {
        throw new Error("Failed to fetch data!!");
      }
    } catch (error: any) {
      console.log("Error Fetching Questions: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleAddQuestion = async () => {
    try {
      const response = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          link,
          difficulty,
          tags: tags.split(","),
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Question added successfully!");
        fetchQuestions();
        setName("");
        setLink("");
        setDifficulty("easy");
        setTags("");
      } else {
        alert(`Error: ${result.error || result.message}`);
      }
    } catch (error) {
      alert("Error adding question.");
      console.error("Add question error:", error);
    }
  };

  const handleDeleteQuestion = async (id: any) => {
    try {
      const response = await fetch(`/api/questions?questionId=${id}`, {
        method: "DELETE",
      });

      const result = await response.json();
      if (response.ok) {
        alert("Question deleted successfully!");
        fetchQuestions();
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      alert("Error deleting question.");
    }
  };

  const handleSearch = () => {
    const filtered = questions.filter(
      (question) =>
        question.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterDifficulty ? question.difficulty === filterDifficulty : true)
    );
    setFilteredQuestions(filtered);
  };

  const handleFilter = (difficulty: string) => {
    setFilterDifficulty(difficulty);
    const filtered = questions.filter(
      (question) =>
        question.difficulty === difficulty &&
        question.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredQuestions(filtered);
  };

  const handleReset = () => {
    setSearchTerm("");
    setFilterDifficulty("");
    setFilteredQuestions(questions);
  };

  return (
    <div className="p-5 bg-gray-900 min-h-screen text-white">
      <h1 className="text-center mb-9 mt-9 text-3xl font-bold text-white">
        DSA Sheet
      </h1>

      <div className="flex flex-col sm:flex-row sm:items-center p-4 mb-4 space-y-4 sm:space-y-0 sm:space-x-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded p-2 bg-gray-800 text-white w-full sm:w-1/2 md:w-1/3"
        />
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={handleSearch}
            className={`text-white ring-white ring-1 hover:bg-gray-100 hover:text-black transition-colors duration-300 w-full sm:w-auto`}
          >
            Search
          </Button>
          <Button
            onClick={() => handleFilter("easy")}
            className={`${difficultyTextColors["easy"]} ${difficultyRingColor["easy"]} ring-1 ring-inset hover:bg-green-600 hover:text-black transition-colors duration-500 w-full sm:w-auto`}
          >
            Easy
          </Button>
          <Button
            onClick={() => handleFilter("medium")}
            className={`${difficultyTextColors["medium"]} ${difficultyRingColor["medium"]} ring-1 hover:bg-yellow-600 hover:text-black transition-colors duration-500 w-full sm:w-auto`}
          >
            Medium
          </Button>
          <Button
            onClick={() => handleFilter("hard")}
            className={`${difficultyRingColor["hard"]} ${difficultyTextColors["hard"]} ring-1 hover:bg-red-600 hover:text-black transition-colors duration-500 w-full sm:w-auto`}
          >
            Hard
          </Button>
          {/* <Button
            onClick={() => handleFilter("all")}
            className="bg-gray-500 text-white hover:bg-gray-600 transition-colors duration-300 w-full sm:w-auto"
          >
            All
          </Button> */}
          <Button
            onClick={handleReset}
            className="bg-gray-500 text-black hover:bg-gray-600 transition-colors duration-300 w-full sm:w-auto"
          >
            Reset
          </Button>
        </div>
      </div>

      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Loader */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="loader border-t-transparent border-solid rounded-full border-blue-400 border-4 h-16 w-16 animate-spin"></div>
        </div>
      )}

      {!loading && (
        <>
          <ul className="list-none p-4 mt-5 space-y-2">
            {/* Questions List */}
            {filteredQuestions.map((question, index) => (
              <li
                key={question._id}
                className="flex flex-col md:flex-row md:items-center justify-between bg-gray-800 hover:bg-gray-900 shadow-lg p-4 rounded border transition hover:border-blue-900 space-y-3 md:space-y-0"
              >
                <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0">
                  <span className="inline-block bg-gray-400 text-gray-800 py-1 px-2 rounded text-sm mr-3">
                    {index + 1}
                  </span>
                  <a
                    href={question.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 text-lg font-semibold hover:text-purple-700 hover:duration-500"
                  >
                    {question.name}
                  </a>
                </div>

                <div className="flex flex-wrap justify-start md:justify-end gap-2">
                  {question.tags.map((tag: string, i: number) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="text-white hover:border-green-900 hover:text-green-500"
                    >
                      {tag.charAt(0).toUpperCase() + tag.slice(1)}
                    </Badge>
                  ))}
                </div>

                <div className="mt-2 md:mt-0 text-center md:text-right">
                  <span
                    className={`inline-flex items-center rounded-md ${
                      difficultyTextColors[question.difficulty]
                    } px-2 py-1 text-sm font-medium ring-1 ring-inset ${
                      difficultyTextColors[question.difficulty]
                    } ${difficultyRingColor[question.difficulty]}`}
                  >
                    {question.difficulty.charAt(0).toUpperCase() +
                      question.difficulty.slice(1) || "N/A"}
                  </span>
                </div>
              </li>
            ))}

            {/* Add Question Button */}
            {/* Uncomment the below section to add the "Add Question" button */}
            <div className="mt-4">
              <Popover>
                <PopoverTrigger>
                  <Button className="w-full sm:w-auto bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300">
                    Add Question
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-4 bg-gray-800 text-white rounded-lg shadow-lg">
                  <h2 className="text-xl font-semibold mb-2">
                    Add New Question
                  </h2>
                  <input
                    className="border p-2 w-full mb-2 text-black"
                    placeholder="Question Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    className="border p-2 w-full mb-2 text-black"
                    placeholder="Link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                  />
                  <select
                    className="border p-2 w-full mb-2 bg-black text-white"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                  <input
                    className="border p-2 w-full mb-2 text-black"
                    placeholder="Tags (comma-separated)"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                  />
                  <Button
                    onClick={handleAddQuestion}
                    className="bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300"
                  >
                    Add Question
                  </Button>
                </PopoverContent>
              </Popover>
            </div>
          </ul>
        </>
      )}
    </div>
  );
};

export default QuestionList;
