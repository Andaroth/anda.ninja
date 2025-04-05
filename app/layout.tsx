"use client"
import { Inter } from "next/font/google";
import "./globals.css";

import "./i18config" // makes lang available across the app
import i18next from "i18next";

import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const title = "Anda Ninja"
  const description = "Creator of incredible interfaces to make the web a wonderful world."

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const force = urlParams.get('lang');
    if (!!force && force === 'en' || force === 'th') {
      i18next.changeLanguage(force)
      localStorage.setItem('lang', force)
    }
    if (localStorage.getItem('lang')) {
      const storage = localStorage.getItem('lang');
      if (storage === 'en' || storage === 'th') {
        i18next.changeLanguage(storage)
      }
    }
  }, [])

  return (
    <html lang="en">
      <head>
        <title>{title || "Andaroth"}</title>
        <link rel="icon" href="./img/fav.gif" />
        <meta property="og:image" content="./img/fav.gif" />
        <meta property="og:title" content={title || "Andaroth"} />
        <meta property="og:description" content={description} />
        <meta name="description" content={description} />

        <meta
          name="keywords"
          content="axel,fiolle,andaroth,developper,coder,blockchain,ethereum,crypto,btc,eth,web,designer,user,experience,interface,ui,ux,uxui,responsive,js,javascript,css,html,php,mysql,postgres,sql,node,nodejs,solidity,thailand,bangkok,นักพัฒนา,โค้ด,บล็อกเชน,คริปโต,เว็บ,ออกแบบ,ผู้ใช้งาน,ประสบการณ์,อินเทอร์เฟซ,กรุงเทพฯ,ประเทศไทย"
        />

        <meta name="author" content="Axel Fiolle" />

        <meta name="msapplication-tooltip" content={description} />
        <meta name="msapplication-starturl" content="https://anda.ninja/" />

        <meta name="wot-verification" content="b6e6901e016c39508cad" />
      </head>

      <body className={inter.className}>
        {children}
        {/* <ACursor /> */}
        </body>
    </html>
  );
}
