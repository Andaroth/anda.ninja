"use client"
import { useEffect, useMemo, useState } from "react";
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

import FRFlag from "@/app/assets/flag/fr.svg"
import UKFlag from "@/app/assets/flag/uk.svg"
import THFlag from "@/app/assets/flag/th.svg"

import { useTranslation } from "react-i18next"
import i18next from "i18next"

export default function Home() {
  type LangLabel = "fr" | "en" | "th"

  const { t } = useTranslation();
  const [lang, selectLang] = useState<LangLabel>('en');
  const [langMenuVisible, setLangMenuVisible] = useState<boolean>(false);
  const [lastScrollState, setLastScroll] = useState(0)
  const [newScrollState, setNewScroll] = useState(0)
  const [delta, setDelta] = useState(0)

  const handleChangeLang = (target: LangLabel) => {
    i18next.changeLanguage(target)
    localStorage.setItem('lang', target)
    selectLang(target)
    setLangMenuVisible(false)
    return;
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const force = urlParams.get('lang');
    if (!!force && force === 'en' || force == 'fr' || force == 'th')
      return handleChangeLang(force)
    else if (localStorage.getItem('lang')) {
      const storage = localStorage.getItem('lang');
      if (storage === 'en' || storage === 'fr' || storage === 'th')
        handleChangeLang(storage)
    } else { handleChangeLang('en') }
  }, [])

  const langs = {
    fr: { label: "FR", target: "fr", img: FRFlag },
    en: { label: "EN", target: "en", img: UKFlag },
    th: { label: "TH", target: "th", img: THFlag },
  };
  const selectedLangItem = useMemo(() => langs[lang] || langs['en'], [lang])

  const creations = [
    { name: 'Vidyā AI', description: "Homemade AI assistant", url: "https://vidya.chat", img: "/img/b2b/vidya.jpeg", techs: ["ElectronJS", "OpenAI/BERT", "ReactJS", "NestJS", "postgres", "Azure"] },
    { name: "NIKE", description: "Web3 & Blockchain Apps", url: "https://rtfkt.com", img: "/img/b2b/rtfkt.jpeg", techs: ["VueJS", "lit-element", "NodeJS", "etherjs", "MongoDB"] },
    { name: "RTFKT", description: "Crypto & NFT Minting", url: "https://web.archive.org/web/20210616144208/https://cryptopunk.rtfkt.com/", img: "/img/b2b/cryptopunk.jpeg", techs: ["VueJS", "lit-element", "WebGL", "web3js", "OnChain DB"] },
    { name: "Anda Pirate", description: "Transmitting the cyber passion", url: "https://www.andapirate.com", img: "/img/b2b/andapirate.jpeg", techs: ["NextJS", "ReactJS", "TailwindCSS", "Python", "postgres"] },
    { name: "Hexofo", description: "Web promotion agency", url: "https://hexofo.com", img: "/img/b2b/hexofo.jpeg", techs: ["ReactJS", "NextJS", "Vercel"] },
    { name: "Winnables", description: "Blockchain trades & gambling", url: "https://winnables.com", img: "/img/b2b/winnables.jpeg", techs: ["NextJS", "ReactJS", "TailwindCSS", "postgres"] },
    { name: "iCure", description: "Connecting people to health online", url: "https://icure.com/fr/", img: "/img/b2b/icure.jpeg", techs: ["PolymerJS", "Kotlin", "eHealth gov API", "MySQL"] },
    { name: "GameOfBlocks", description: "Web3 Multiplayer Gaming", url: "https://gameofblocks.io", img: "/img/b2b/screenshot.jpeg", techs: ["ReactJS", "Blitz", "etherjs", "express", "Ganache"] },
    { name: "TimbTrack", description: "Leading IoT innovation", url: "https://timbtrack.com", img: "/img/b2b/timbtrack.jpeg", techs: ["VueJS", "PHP", "NodeJS", "GraphQL", "MySQL"] },
    { name: "Sk8boarders", description: "Tailoring pages at any scale", url: "https://sk8boarders.be", img: "/img/b2b/sk8boarders.jpeg", techs: ["WordPress", "PHP", "HTML/CSS", "MySQL"] },
  ]

  const socials = [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/axel-fiolle/", icon: <FaLinkedin className="hoverSpin" size="2em" /> },
    { name: "GitHub", url: "https://github.com/Andaroth", icon: <FaGithub className="hoverSpin" size="2em" /> },
    { name: "Twitter", url: "https://twitter.com/Andaroth", icon: <FaTwitter className="hoverSpin" size="2em" /> },
    { name: "TikTok", url: "https://tiktok.com/@anda_pirate", icon: <FaTiktok className="hoverSpin" size="2em" /> },
    { name: "Instagram", url: "https://instagram.com/anda_pirate", icon: <FaInstagram className="hoverSpin" size="2em" /> },
  ]

  useEffect(() => {
    window.addEventListener("scroll", () => {
      requestAnimationFrame(() => {
        const offset = window.pageYOffset || 0
        setNewScroll(offset)
        requestAnimationFrame(() => {
          setLangMenuVisible(false)
          setDelta(newScrollState - lastScrollState)
          requestAnimationFrame(() => setLastScroll(offset))
        })
      })
    })
    return () => window.removeEventListener("scroll", () => { })
  }, [lastScrollState, newScrollState])

  const handleScrollTo = (e: any, anchor: string) => {
    e.preventDefault()
    const domElement = document.querySelector(anchor)
    if (domElement) {
      window.scroll({
        top: window.scrollY + (domElement.getBoundingClientRect().top || 0),
        left: 0,
        behavior: 'smooth'
      });
    }
  }

  useEffect(() => {
    if (window.location.href.includes('#')) {
      const anchor = window.location.href.split('#')[1]
      const domAnchor = document.querySelector('#' + anchor)
      if (domAnchor) window.scroll({
        top: window.scrollY + (domAnchor.getBoundingClientRect().top || 0),
        left: 0,
        behavior: 'smooth'
      });
    }
  }, [])

  return (
    <main className="flex flex-col text-white">
      <div id="topbar" className={cn(
        "fixed px-2 flex justify-center top-0 left-0 w-full transition duration-200 z-50",
        lastScrollState >= 80 ? "bg-[#00000088]" : ""
      )}
      >
        <div className="flex w-full justify-between text-white">
          <div className="flex flex-col justify-center">
            <h1 className="text-white"><Link href="#" onClick={(e) => handleScrollTo(e, "#dev")} className="text-3xl">![Λnda]</Link></h1>
          </div>
          <nav>
            <ul className="flex justify-end sm:gap-4 gap-2">
              <li className="flex flex-col justify-center">
                <div className="flex flex-col justify-center h-full">
                  <div className="flex sm:gap-1 cursor-pointer" onClick={() => setLangMenuVisible(!langMenuVisible)}>
                    <Image src={selectedLangItem.img} alt="Change lang" height={16} />
                    <span className="hidden sm:block">{selectedLangItem.label}&nbsp;{langMenuVisible ? <span>&#9206;</span> : <span>&#9207;</span>}</span>
                  </div>
                  {langMenuVisible ? <div className="absolute">
                    <div className="absolute flex flex-col gap-2 border-1 p-2 bg-black w-16 rounded-lg top-4 z-10">
                      {Object.values(langs).filter((v) => v.label.toLowerCase() !== lang).map((l, i) => (
                        <button className="flex gap-2" key={i} onClick={
                          () => l.label.toLowerCase() !== lang ? handleChangeLang(l.label.toLowerCase() as LangLabel) : null
                        }>
                          <Image src={l.img} alt="Change lang" height={16} />
                          <span>{l.label}</span>
                        </button>
                      ))}
                    </div>
                    <div className="fixed left-0 top-0 h-[100vh] w-[100vw] z-9 bg-transparent" onClick={() => setLangMenuVisible(false)} />
                  </div> : ''}
                </div>
              </li>
              <li className="hidden sm:flex flex-col justify-center">
                <Link
                  className="flex flex-col justify-center h-full text-xl border-b-4 border-transparent hover:border-[#cc9a54]"
                  href="#"
                  onClick={(e) => handleScrollTo(e, "#portfolio")}
                >{t('topbar.work')}</Link>
              </li>
              <li className="flex flex-col justify-center">
                <Link
                  className="hidden sm:flex flex-col justify-center h-full text-xl border-b-4 border-transparent hover:border-[#cc9a54]"
                  href="#"
                  onClick={(e) => handleScrollTo(e, "#about")}
                >{t('topbar.about')}</Link>
              </li>
              <li>
                <Link href="mailto:anda_pirate@proton.me" >
                  <button className="contact flex gap-2 justify-center border-2 my-2 py-0 px-2 rounded-md uppercase h-[48px] bg-black hover:bg-white hover:text-black">
                    <div className="flex flex-col h-full justify-center text-md">
                      <span>{t('topbar.contact')}</span>
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

      <section id="dev" className="flex text-white p-8 flex-col justify-end min-h-[100dvh] bg-[url(/img/clonex_001_mobile.jpeg)] md:bg-[url(/img/clonex_001.jpeg)] bg-cover bg-fixed">
        <div className="flex justify-end">
          <div className="card flex flex-col gap-4 p-4 rounded-lg bg-[#00000088] w-[600px] max-w-full">
            <div className="flex justify-center">
              <h2 className="text-2xl pb-4 border-b-2">{t('dev.role')}</h2>
            </div>
            <p className="text-xl">{t('dev.bio.0')}<strong>{t('dev.bio.1')}</strong>{t('dev.bio.2')}<strong>{t('dev.bio.3')}</strong><br />{t('dev.bio.4')}<strong>{t('dev.bio.5')}</strong>{t('dev.bio.6')}.</p>
            <div className="flex justify-center">
              <div className="flex flex-col">
                <button className="detail rounded-md" onClick={(e) => handleScrollTo(e, "#portfolio")}>{t('dev.cta')}</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="portfolio" className="flex text-white p-8 md:pt-[30vh] flex-col justify-center min-h-[100dvh] bg-[url(/img/clonex_003_mobile.jpeg)] md:bg-[url(/img/clonex_003.jpeg)] bg-cover bg-fixed">
        <div className="flex justify-center">
          <div className="card flex flex-col gap-2 p-4 rounded-lg bg-[#00000088] w-[960px] max-w-full">
            <h2 className="text-2xl">{t('portfolio.title')}</h2>
            <p>{t('portfolio.paragraph.0')}<strong>{t('portfolio.paragraph.1')}</strong>{t('portfolio.paragraph.2')}<br />{t('portfolio.paragraph.3')}<strong>{t('portfolio.paragraph.4')}</strong>.</p>
            <div className="grid gap-2 my-4 grid-cols-1 sm:grid-cols-2">
              {creations.map(creation => <Link
                className="creation rounded-md overflow-hidden flex flex-col cursor-pointer"
                key={creation.name}
                href={creation.url}
                target="_blank"
              >
                <div className="flex p-4 bg-black">
                  <h3 className="text-center w-full">@{creation.name}</h3>
                </div>
                <div className="w-full overflow-hidden aspect-video bg-black">
                  <Image className="thumbnail w-full aspect-video" src={creation.img} alt={creation.name} width="350" height="200" />
                </div>
                <div className="technos absolute mt-14 aspect-video opacity-0 transition-all z-100 rounded-b-lg">
                  <div className="flex flex-col h-full justify-center w-full">
                    <div className="pl-8 text-lg text-white whitespace-pre-wrap">{creation.description}</div>
                    {creation.techs.map((t, i) => <div key={i} className="text-left text-sm pl-8">
                      <strong className="text-white">&gt;</strong>&nbsp;{t}
                    </div>)}
                  </div>
                </div>
              </Link>)}
            </div>
            <div className="flex gap-2 justify-center">
              <aside className="hidden md:flex flex-col justify-center"><Image src="/img/emoji/wizard.svg" alt="decoration" width="32" height="32" /></aside>
              <p className="text-center">{t('portfolio.signature.0')}<br />{t('portfolio.signature.1')}</p>
              <aside className="hidden md:flex flex-col justify-center"><Image src="/img/emoji/ninja.svg" alt="decoration" width="32" height="32" /></aside>
            </div>
            <div className="flex justify-center mt-4">
              <div className="flex flex-col">
                <Link className="flex justify-center" href="mailto:anda_pirate@proton.me">
                  <button className="detail rounded-md">
                    <p>{t('portfolio.cta')}</p>
                    <i></i>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="flex text-white p-8 flex-col justify-center min-h-[100dvh] bg-[url(/img/clonex_002_mobile.jpeg)] md:bg-[url(/img/clonex_002.jpeg)] bg-cover bg-fixed">
        <div className="flex justify-center">
          <div className="card flex flex-col gap-2 p-0 rounded-lg bg-[#00000088] overflow-hidden w-[800px] max-w-full">
            <div className="flex bg-[#00000088] p-4 gap-2 justify-center">
              <div className="hidden md:block aspect-square">
                <Image src="/img/avatar.jpeg" alt="Axel Andaroth" width="48" height="48" className="rounded-[50%]" />
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="text-2xl text-left]">{t('about.title')}</h2>
              </div>
            </div>
            <div className="flex flex-col p-8 gap-2">
              <p>{t('about.paragraph_a.0')}<strong>{t('about.paragraph_a.1')}</strong>!<br />{t('about.paragraph_a.2')}.</p>
              <p>{t('about.paragraph_b.0')}<strong>{t('about.paragraph_b.1')}</strong>{t('about.paragraph_b.2')}<br />{t('about.paragraph_b.3')}<strong>{t('about.paragraph_b.4')}</strong>.</p>
              <p>{t('about.paragraph_c.0')}<strong>{t('about.paragraph_c.1')}</strong>!</p>
              <div className="flex justify-center mt-4">
                <div className="flex flex-col">
                  <Link className="flex justify-center" href="mailto:anda_pirate@proton.me">
                    <button className="detail rounded-md">
                      <p>{t('about.cta')}</p>
                      <i></i>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="p-8 gap-2 flex flex-col text-center bg-[#2e3133] text-white border-t-4 border-[#cc9a54]">
        <p>Made with <code>NextJS</code>, <code>ReactJS</code> &amp; <code>TailWindCSS</code></p>
        {/* <div className="flex gap-1 justify-center">
          <Link  href="https://metasense.be" target="_blank">
            <span>Collaborator of MetaSense</span>
          </Link>
          <FaExternalLinkAlt size="14px" />
        </div> */}
        <div className="mt-4">
          <div className="flex flex-col gap-2 pb-2">
            <div className="flex justify-center">
              <Link className="flex gap-1 justify-center" href="https://github.com/Andaroth/anda.ninja" target="_blank">
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
              {socials.map(social => <Link key={socials.indexOf(social)} href={social.url} target="_blank">{social.icon}</Link>)}
            </div>
          </div>
        </div>
        <p>Axel Fiolle 2005 - {new Date().getFullYear()} &copy; All rights reserved</p>
      </footer>
    </main>
  );
}
