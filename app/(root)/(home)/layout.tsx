// "use client";

import React, { ReactNode } from "react";

import Navbar from "@/components/Navbar";
import { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "CpSheet",
  description: "Cp Problems",
  icons: {
    icon: "/icons/logo.png",
  },
};

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative">
      <Navbar />
      <div>
        <section>
          <div className="w-full">{children}</div>
        </section>
      </div>
      <Footer/>
    </main>
  );
};

export default HomeLayout;
