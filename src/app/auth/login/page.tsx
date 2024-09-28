"use client";
import React from "react";
import LoginForm from "./LoginForm";

import { Card, CardHeader, CardBody, Divider, Image } from "@nextui-org/react";
import { companyData } from "@/constant/companyData";

export default function App() {
  return (
    <div className="w-full flex justify-center p-2 items-center h-screen">
      <div className="lg:w-[1024px] sm:w-[500px] flex flex-wrap lg:border-2 rounded-xl">
        <div className="w-full lg:w-1/2 py-4 sm:px-16 px-4 flex justify-center items-center">
          <div className="">
            <div className="pt-5 sm:px-5 text-center">
              <h1 className="text-2xl font-medium">Sistema Cotizador</h1>
              <span className="h-32">
                Sistema de cotización para permite gestionar clientes, generar
                cotizaciones detalladas y rastrear el estado.
              </span>
            </div>
            <div className="w-full text-end">
              <span className="text-[12px] ">
                by{" "}
                <a
                  className="text-violet-800 font-bold"
                  href="kedevs.com"
                  target="_blank"
                >
                  Kedevs.com
                </a>
              </span>
            </div>
          </div>
        </div>
        <Card className="w-full lg:w-1/2 p-4">
          <CardHeader className="flex flex-col">
            <div>
              <Image
                alt="logo"
                isBlurred
                radius="sm"
                src="/logo.png"
                width={200}
              />
            </div>

            <div className="flex flex-col">
              <p className="text-md">{companyData.companyName}</p>
              <p className="text-small text-default-500">Login</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <LoginForm />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

/*

*/
