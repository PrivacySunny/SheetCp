"use client";

import React from "react";
import HomeProblems from "@/components/HomeProblem";

const HomeLayout = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <HomeProblems />
    </section>
  );
};

export default HomeLayout;
