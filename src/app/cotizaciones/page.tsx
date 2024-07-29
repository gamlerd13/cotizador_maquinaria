import React from "react";
import NavBar from "@/components/NavBar";
import CotizacionesList from "./CotizacionesList";
import TitlePage from "@/components/TitlePage";
import Footer from "@/components/Footer";

function App() {
  return (
    <div className="h-screen flex flex-col justify-between">
      <div>
        <NavBar />
        <div className="w-full flex justify-center">
          <div className="p-4 sm:w-9/12">
            <TitlePage title="Cotizaciones" />
            <CotizacionesList />
          </div>
        </div>
      </div>
      <div className="bg-slate-200">
        <hr className="border-1 " />
        <Footer />
      </div>
    </div>
  );
}
export default App;
