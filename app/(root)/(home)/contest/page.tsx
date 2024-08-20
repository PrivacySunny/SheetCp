"use client";
import React, { useEffect, useState } from "react";

interface Problem {
  id: number;
  event: string;
  resource: string;
  href: string;
  start: string;
  end: string;
}

const Contest = () => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Added loading state

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "https://clist.by/api/v4/json/contest/?total_count=true&with_problems=true&upcoming=true&format_time=true",
          {
            method: "GET",
            headers: {
              Authorization:
                "ApiKey sanhayu546:016749fc8fb012bf8d067437bef5ef86409209d0", // Replace with your actual API token
            },
          }
        );
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        // console.log(data.objects); // Log the response to inspect its structure
        // Check if data.objects is an array before setting state
        if (Array.isArray(data.objects)) {
          setProblems(data.objects);
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

  const parseDateString = (dateString: string) => {
    const datePattern = /^(\d{2})\.(\d{2})\s\w{3}\s(\d{2}:\d{2})$/;
    const match = dateString.match(datePattern);

    if (match) {
      const [, day, month, time] = match;
      const currentYear = new Date().getFullYear();
      const date = new Date(`${currentYear}-${month}-${day}T${time}:00`);

      return isNaN(date.getTime()) ? "Invalid date" : date.toLocaleString();
    }

    return "Invalid date";
  };

  return (
    <div className="p-5 bg-gray-900 min-h-screen">
      <h1 className="text-center mt-3 mb-8 text-white text-2xl font-bold">
        Contest Page
      </h1>
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="loader border-t-transparent border-solid rounded-full border-blue-400 border-4 h-16 w-16 animate-spin"></div>
        </div>
      )}
      {!loading && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {error ? (
              <p className="text-red-500 text-center">{error}</p>
            ) : (
              problems.map((problem: any) => (
                <div
                  key={problem.id}
                  className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-800 p-6 transform transition-transform duration-300 hover:scale-105"
                >
                  <div className="font-bold text-xl mb-2 text-white">
                    {problem.event ?? "null"}
                  </div>
                  <p className="text-gray-100 mb-4 rounded-md w-fit bg-green-500 px-2 py-1 inline-block">
                    {problem.resource ?? "null"}
                  </p>
                  <a
                    href={problem.href ?? "#"}
                    target="_blank"
                    className="text-gray-900 bg-violet-400 rounded-md hover:bg-violet-600 mb-4 block transform transition-transform duration-300 hover:scale-105 px-3 py-2 text-center"
                  >
                    {problem.href ? "Visit Contest" : "null"}
                  </a>
                  <p className="text-gray-400">
                    <strong>Start:</strong> {parseDateString(problem.start)}
                  </p>
                  <p className="text-gray-400">
                    <strong>End:</strong> {parseDateString(problem.end)}
                  </p>
                  <p className="text-gray-400">
                    <strong>Duration:</strong> {problem.duration ?? "null"}
                  </p>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Contest;
