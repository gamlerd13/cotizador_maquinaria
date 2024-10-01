"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";
import { companyData } from "@/constant/companyData";
import { useSession } from "next-auth/react";
interface Servicio {
  id: number;
  linkName: string;
  link: string;
  description: string;
}

export default function LandingHome() {
  const { data: session, status } = useSession();
  const servicios: Servicio[] = [
    {
      id: 1,
      linkName: "Cotizador",
      link: "/cotizar",
      description:
        "Crea cotizaciones detalladas y personalizadas para tus productos y servicios.",
    },
    {
      id: 2,
      linkName: "Cotizaciones",
      link: "/cotizaciones",
      description:
        "Administra y revisa tus cotizaciones fácilmente en un solo lugar.",
    },
    {
      id: 3,
      linkName: "Clientes",
      link: "/clientes",
      description:
        "Gestiona la información de tus clientes y su historial de cotizaciones.",
    },
    {
      id: 4,
      linkName: "Productos",
      link: "/items",
      description:
        "Organiza y gestione tus productos de forma rápida y eficiente.",
    },
  ];

  return (
    <Card className="w-full">
      <CardHeader className="flex gap-3">
        <Image alt="/logo" radius="sm" src="/logo.jpeg" width={150} />
        <div className="flex flex-col">
          <p className="text-md">{companyData.companyNameLong}</p>
          <p className="text-small text-default-500">Sistema de cotización</p>
          <p className="font-semibold">
            Usuario:{" "}
            <span className="text-amber-700">{session?.user?.name}</span>
          </p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="flex justify-center gap-4 flex-wrap py-4">
          {servicios.map((servicio) => (
            <Servicios key={servicio.id} servicio={servicio} />
          ))}
        </div>
      </CardBody>
      <Divider />
    </Card>
  );
}

function Servicios({ servicio }: { servicio: Servicio }) {
  return (
    <Link href={`${servicio.link}`}>
      <Card className="w-[300px] h-full hover:bg-neutral-400 shadow-cyan-500/50 hover:opacity-75">
        <CardBody className="p-4">
          <span>{servicio.description}</span>
        </CardBody>
        <Divider />
      </Card>
    </Link>
  );
}
