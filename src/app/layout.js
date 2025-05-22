import React from "react";
import { Roboto } from "next/font/google";
import "./globals.css";

const font = Roboto ({
  variable: "--font",
  subsets: ["latin"],
});

export const metadata = {
    title: "Prova Prática",
    icons: {
    icon: "/favicon.ico",
  },
    description: "Projeto desenvolvido para a prova prática do curso de Front End",

};

export default function RootLayout({ children }) {
    return (
        <html>
            <body className={font.variable}>{children}</body>
        </html>
    );
}

