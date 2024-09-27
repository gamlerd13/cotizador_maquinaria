"use client";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import React from "react";
import ItemsList from "./ItemsList";
import TitlePage from "@/components/TitlePage";

function page() {
  return (
    <div className="h-screen flex flex-col justify-between">
      <main>
        <NavBar />
        <div className="w-full flex justify-center">
          <div className="p-4 sm:w-9/12 w-full">
            <TitlePage title="Productos" />
            <ItemsList />
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

export default page;
