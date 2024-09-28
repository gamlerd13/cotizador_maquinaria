"use client";
import React, { useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@nextui-org/react";
import Image from "next/image";
import { companyData } from "@/constant/companyData";
// import { AcmeLogo } from "./AcmeLogo.jsx";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    {
      id: 1,
      name: "Home",
      url: "/",
    },
    {
      id: 2,
      name: "Cotizar",
      url: "/cotizar",
    },
    {
      id: 3,
      name: "Cotizaciones",
      url: "/cotizaciones",
    },
    {
      id: 4,
      name: "Clientes",
      url: "/clientes",
    },
    {
      id: 5,
      name: "Productos",
      url: "/items",
    },
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <Link color="foreground" href="/">
          <NavbarBrand>
            {/* <AcmeLogo /> */}
            <Image alt="logo" height={40} src="/logo.png" width={150} />
            <p className="font-bold text-inherit">{companyData.companyName}</p>
          </NavbarBrand>
        </Link>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={pathname == "/cotizar"}>
          <Link color="foreground" href="/cotizar">
            Cotizar
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname == "/cotizaciones"}>
          <Link href="/cotizaciones" aria-current="page">
            Cotizaciones
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname == "/clientes"}>
          <Link href="/clientes" aria-current="page">
            Clientes
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname == "/items"}>
          <Link href="/items" aria-current="page">
            Productos
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button onClick={() => signOut()} color="danger" variant="bordered">
            Salir
            <IoIosLogOut className="text-xl" />
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={item.id}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className={`w-full text-default-400 ${
                pathname == item.url && "font-semibold text-blue-500"
              }`}
              href={item.url}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
