"use client"
import { useEffect, useState } from "react";
import cn from "classnames";

import Link from "next/link";
import Image from "next/image";

import {
  FaMarker,
  FaExternalLinkAlt,
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaTiktok,
  FaInstagram
} from "react-icons/fa";

export default function Home() {
  const [lastScrollState, setLastScroll] = useState(0)
  const [newScrollState, setNewScroll] = useState(0)
  const [delta, setDelta] = useState(0)

  const creations = [
    { name: "RTFKT", url: "https://rtfkt.com", img: "/img/b2b/rtfkt.jpeg" },
    { name: "GameOfBlocks", url: "https://gameofblocks.io", img: "/img/b2b/screenshot.jpeg" },
    { name: "EtheRPG Online", url: "https://etherpg.online", img: "/img/b2b/etherpg.jpeg" },
    { name: "Anda Pirate", url: "https://www.andapirate.com", img: "/img/b2b/andapirate.jpeg" },
  ]

  const socials = [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/axel-fiolle/", icon: <FaLinkedin className="hoverSpin" size="2em" />},
    { name: "GitHub", url: "https://github.com/Andaroth", icon: <FaGithub className="hoverSpin" size="2em" />},
    { name: "Twitter", url: "https://twitter.com/Andaroth", icon: <FaTwitter className="hoverSpin" size="2em" />},
    { name: "TikTok", url: "https://tiktok.com/@anda_pirate", icon: <FaTiktok className="hoverSpin" size="2em" />},
    { name: "Instagram", url: "https://instagram.com/anda_pirate", icon: <FaInstagram className="hoverSpin" size="2em" />},
  ]

  useEffect(() => {
    window.addEventListener("scroll", () => {
      requestAnimationFrame(() => {
        const offset = window.pageYOffset || 0
        setNewScroll(offset)
        requestAnimationFrame(() => {
          setDelta(newScrollState - lastScrollState)
          requestAnimationFrame(() => setLastScroll(offset))
        })
      })
    })
    return () => window.removeEventListener("scroll", () => {})
  }, [lastScrollState, newScrollState])

  const handleScrollTo = (e: any, anchor: string) => {
    e.preventDefault()
    const domElement = document.querySelector(anchor)
    console.log('domElement', domElement)
    if (domElement) {
      window.scroll({
        top: window.scrollY + (domElement.getBoundingClientRect().top || 0), 
        left: 0, 
        behavior: 'smooth' 
      });
    }
  }

  return (
    <main className="flex flex-col">
      <div id="topbar" className={cn(
        "fixed px-2 flex justify-center top-0 left-0 w-full transition duration-200 z-50",
        lastScrollState >= 80 ? "bg-[#00000088]" : ""
        )}
      >
        <div className="flex w-full justify-between">
          <div className="flex flex-col justify-center">
            <h1><Link href="#" onClick={(e) => handleScrollTo(e, "#dev")} className="text-3xl">![Λnda]</Link></h1>
          </div>
          <nav>
            <ul className="flex justify-end gap-4">
              <li className="hidden sm:flex flex-col justify-center">
                <Link
                  className="flex flex-col justify-center h-full text-xl border-b-4 border-transparent hover:border-[#cc9a54]"
                  href="#"
                  onClick={(e) => handleScrollTo(e, "#portfolio")}
                >My work</Link>
              </li>
              <li className="flex flex-col justify-center">
                <Link
                  className="hidden sm:flex flex-col justify-center h-full text-xl border-b-4 border-transparent hover:border-[#cc9a54]"
                  href="#"
                  onClick={(e) => handleScrollTo(e, "#about")}
                >About me</Link>
              </li>
              <li>
              <Link href="mailto:ax.fiolle@gmail.com" >
                <button className="contact flex gap-2 justify-center border-2 my-2 py-0 px-2 rounded-md uppercase h-[48px] bg-black hover:bg-white hover:text-black">
                  <div className="flex flex-col h-full justify-center text-md">
                    <span>Contact</span>
                  </div>
                  <div className="flex flex-col h-full justify-center">
                    <span>
                      <FaMarker size="1em" />
                    </span>
                  </div>
                </button>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <section id="dev" className="flex bg-blue-500 p-8 flex-col justify-end min-h-[100dvh] bg-[url(/img/clonex_001_mobile.jpeg)] md:bg-[url(/img/clonex_001.jpeg)] bg-cover bg-fixed">
        <div className="flex justify-end">
          <div className="card flex flex-col gap-4 p-4 rounded-lg bg-[#00000088] w-[600px] max-w-full">
            <div className="flex justify-center">
              <h2 className="text-2xl pb-4 border-b-2">Game Maker &amp; Web Dev</h2>
            </div>
            <p className="text-xl">With more than fifteen years <strong>building</strong> and <strong>revolutionizing</strong> <br />the <strong>web</strong>, I can help you to create and assert your project.</p>
            <div className="flex justify-center">
              <div className="flex flex-col">
                <button className="detail rounded-md" onClick={(e) => handleScrollTo(e, "#portfolio")}>Learn more</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="portfolio" className="flex bg-blue-500 p-8 md:pt-[30vh] flex-col justify-center min-h-[100dvh] bg-[url(/img/clonex_003_mobile.jpeg)] md:bg-[url(/img/clonex_003.jpeg)] bg-cover bg-fixed">
        <div className="flex justify-center">
          <div className="card flex flex-col gap-2 p-4 rounded-lg bg-[#00000088] w-[960px] max-w-full">
            <h2 className="text-2xl">Web3 &amp; Blockchain</h2>
            <p>I used to work with the best actors from the metaverse who <br />trust me to implement their most important website.</p>
            <div className="grid gap-2 my-4 grid-cols-1 md:grid-cols-2">
              { creations.map(creation => <Link key={creation.name} href={creation.url} target="_blank" className="creation rounded-md overflow-hidden flex flex-col cursor-pointer">
                <div className="flex p-4 bg-black">
                  <h3 className="text-center w-full">@{creation.name}</h3>
                </div>
                <div className="w-full overflow-hidden h-[200px]">
                  <Image className="thumbnail w-full h-full" src={creation.img} alt={creation.name} width="350" height="200" />
                </div>
              </Link>)}
            </div>
            <div className="flex gap-2 justify-center">
              <aside className="hidden md:flex flex-col justify-center"><Image src="/img/emoji/wizard.svg" alt="decoration" width="32" height="32" /></aside>
              <p className="text-center">My skills are refined and precise, <br />I&apos;m a Code Guardian</p>
              <aside className="hidden md:flex flex-col justify-center"><Image src="/img/emoji/ninja.svg" alt="decoration" width="32" height="32" /></aside>
            </div>
            <div className="flex justify-center mt-4">
              <div className="flex flex-col">
                <Link className="flex justify-center" href="mailto:ax.fiolle@gmail.com">
                  <button className="detail rounded-md">
                      <p>Let&apos;s collaborate!</p>
                      <i></i>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="flex bg-red-500 p-8 flex-col justify-center min-h-[100dvh] bg-[url(/img/clonex_002_mobile.jpeg)] md:bg-[url(/img/clonex_002.jpeg)] bg-cover bg-fixed">
        <div className="flex justify-center">
          <div className="card flex flex-col gap-2 p-0 rounded-lg bg-[#00000088] overflow-hidden w-[800px] max-w-full">
            <div className="flex bg-[#00000088] p-4 gap-2 justify-center">
              <div className="hidden md:block aspect-square">
                <Image src="/img/avatar.jpeg" alt="Axel Andaroth" width="48" height="48" className="rounded-[50%]" />
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="text-2xl text-left]">Passionate about new technologies</h2>
              </div>
            </div>
            <div className="flex flex-col p-8 gap-2">
              <p>Hello, my name is Axel Fiolle, alias <strong>Andaroth</strong>!<br />I was young when I wrote my first line of code.</p>
              <p>My dedication for the <strong>art of code</strong> and my curiosity made me<br /> jump into the <strong>Web3 paradigm</strong>.</p>
              <p>Let me help you getting online and expand on the <strong>Internet of Things</strong>!</p>
              <div className="flex justify-center mt-4">
                <div className="flex flex-col">
                  <Link className="flex justify-center" href="mailto:ax.fiolle@gmail.com">
                    <button className="detail rounded-md">
                        <p>Get in touch</p>
                        <i></i>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="p-8 gap-2 flex flex-col text-center bg-[#2e3133] border-t-4 border-[#cc9a54]">
        <p>Remake in 2h with <code>NextJS</code>, <code>ReactJS</code> &amp; <code>TailWindCSS</code></p>
        <div className="mt-4">
          <div className="flex flex-col gap-2 pb-2">
            <div className="flex justify-center">
              <Link className="flex gap-1 justify-center" href="https://github.com/Andaroth/vcard-andapirate" target="_blank">
                <span>View codesource on GitHub</span>
                <FaExternalLinkAlt size="14px" />
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <Link className="flex gap-2 justify-center border-t-2 pt-2" href="https://hexofo.com" target="_blank">
              <span>I&apos;m the owner of HEXOFO™</span>
              <FaExternalLinkAlt size="14px" />
            </Link>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col py-2">
            <div className="flex justify-center gap-4">
              { socials.map(social => <Link key={socials.indexOf(social)} href={social.url} target="_blank">{social.icon}</Link>)}
            </div>
          </div>
        </div>
        <p>Axel Fiolle 2005 - {new Date().getFullYear()} &copy; All rights reserved</p>
      </footer>
    </main>
  );
}
