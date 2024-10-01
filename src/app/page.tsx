"use client";

import NavBar from "@/components/NavBar";
import LandingHome from "./LandingHome";
import TitlePage from "@/components/TitlePage";
import Footer from "@/components/Footer";
import { SessionProvider } from "next-auth/react";

export default function Home() {
  return (
    <div className="h-screen flex flex-col justify-between">
      <main>
        <NavBar />
        <div className="w-full flex justify-center">
          <div className="p-4 sm:w-9/12">
            <TitlePage title="Home" />
            <SessionProvider>
              <LandingHome />
            </SessionProvider>
          </div>
        </div>
      </main>
      <div className="bg-slate-200">
        <hr className="border-1 " />
        <Footer />
      </div>
    </div>
  );
}
