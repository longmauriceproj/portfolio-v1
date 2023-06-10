import { Fragment, ReactNode, useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

import portraitImage from "~/images/portrait-bw.png";
import logoAppliedMedical from "~/images/logos/appliedMedical.png";
import logoInterson from "~/images/logos/interson.png";
import logoBaxter from "~/images/logos/baxter.png";
import { GitHubIcon, LinkedInIcon } from "./SocialIcons";

interface TinyWaveFormIconProps {
  colors?: string[];
  className?: string;
}

interface IconProps {
  className?: string;
}

interface AboutSectionProps {
  className?: string;
}

interface WaveformProps {
  className?: string;
}

interface LayoutProps {
  children: ReactNode;
}

interface SocialLinkProps {
  icon: JSX.Element;
}

function randomBetween(min: number, max: number, seed = 1) {
  return () => {
    let rand = Math.sin(seed++) * 10000;
    rand = rand - Math.floor(rand);
    return Math.floor(rand * (max - min + 1) + min);
  };
}

function Waveform(props: WaveformProps) {
  let id = useId();
  let bars = {
    total: 100,
    width: 2,
    gap: 2,
    minHeight: 40,
    maxHeight: 100,
  };

  let barHeights = Array.from(
    { length: bars.total },
    randomBetween(bars.minHeight, bars.maxHeight)
  );

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <linearGradient id={`${id}-fade`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="40%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </linearGradient>
        <linearGradient id={`${id}-gradient`}>
          <stop offset="0%" stopColor="#4989E8" />
          <stop offset="50%" stopColor="#6159DA" />
          <stop offset="100%" stopColor="#FF54AD" />
        </linearGradient>
        <mask id={`${id}-mask`}>
          <rect width="100%" height="100%" fill={`url(#${id}-pattern)`} />
        </mask>
        <pattern
          id={`${id}-pattern`}
          width={bars.total * bars.width + bars.total * bars.gap}
          height="100%"
          patternUnits="userSpaceOnUse"
        >
          {Array.from({ length: bars.total }, (_, index) => (
            <rect
              key={index}
              width={bars.width}
              height={`${barHeights[index]}%`}
              x={bars.gap * (index + 1) + bars.width * index}
              fill={`url(#${id}-fade)`}
            />
          ))}
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        fill={`url(#${id}-gradient)`}
        mask={`url(#${id}-mask)`}
        opacity="0.25"
      />
    </svg>
  );
}

function MailIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  );
}

function ArrowDownIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BriefcaseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 3.75A2.75 2.75 0 018.75 1h2.5A2.75 2.75 0 0114 3.75v.443c.572.055 1.14.122 1.706.2C17.053 4.582 18 5.75 18 7.07v3.469c0 1.126-.694 2.191-1.83 2.54-1.952.599-4.024.921-6.17.921s-4.219-.322-6.17-.921C2.694 12.73 2 11.665 2 10.539V7.07c0-1.321.947-2.489 2.294-2.676A41.047 41.047 0 016 4.193V3.75zm6.5 0v.325a41.622 41.622 0 00-5 0V3.75c0-.69.56-1.25 1.25-1.25h2.5c.69 0 1.25.56 1.25 1.25zM10 10a1 1 0 00-1 1v.01a1 1 0 001 1h.01a1 1 0 001-1V11a1 1 0 00-1-1H10z"
        clipRule="evenodd"
      />
      <path d="M3 15.055v-.684c.126.053.255.1.39.142 2.092.642 4.313.987 6.61.987 2.297 0 4.518-.345 6.61-.987.135-.041.264-.089.39-.142v.684c0 1.347-.985 2.53-2.363 2.686a41.454 41.454 0 01-9.274 0C3.985 17.585 3 16.402 3 15.055z" />
    </svg>
  );
}

function PersonIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 11 12" {...props}>
      <path d="M5.019 5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm3.29 7c1.175 0 2.12-1.046 1.567-2.083A5.5 5.5 0 0 0 5.019 7 5.5 5.5 0 0 0 .162 9.917C-.39 10.954.554 12 1.73 12h6.578Z" />
    </svg>
  );
}

function AboutSection(props: AboutSectionProps) {
  let [isExpanded, setIsExpanded] = useState(false);

  return (
    <section {...props}>
      <h2 className="flex items-center font-mono text-sm font-medium leading-7 text-slate-900">
        {/* <TinyWaveFormIcon
          colors={["fill-violet-300", "fill-pink-300"]}
          className="h-2.5 w-2.5"
        /> */}
        <PersonIcon className="h-3 w-auto fill-violet-300" />
        <span className="ml-2.5">About</span>
      </h2>
      <p
        className={clsx(
          "mt-2 text-base leading-7 text-slate-700",
          !isExpanded && "lg:line-clamp-4"
        )}
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero
        perferendis veniam accusantium magni voluptate officia dolore obcaecati
        ipsam nisi odit, natus minima nesciunt enim quidem debitis
        necessitatibus vero laborum quas quo, recusandae, adipisci at excepturi!
        Reiciendis odio, doloribus minima neque, dolore sunt magnam cum debitis
        magni distinctio corrupti, voluptates tempora.
      </p>
      {!isExpanded && (
        <button
          type="button"
          className="mt-2 hidden text-sm font-bold leading-6 text-pink-500 hover:text-pink-700 active:text-pink-900 lg:inline-block"
          onClick={() => setIsExpanded(true)}
        >
          Show more
        </button>
      )}
    </section>
  );
}

const social = [
  { name: "Github", href: "#", icon: GitHubIcon },
  { name: "LinkedIn", href: "#", icon: LinkedInIcon },
];

const resume = [
  {
    company: "Applied Medical",
    title: "Front-end Developer",
    logo: logoAppliedMedical,
    start: "2023",
    end: { label: "Present", dateTime: new Date().getFullYear() },
  },
  {
    company: "Interson",
    title: "Project Engineer",
    logo: logoInterson,
    start: "2018",
    end: "2019",
  },
  {
    company: "Baxter Internation",
    title: "Continuous Improvement Lead",
    logo: logoBaxter,
    start: "2011",
    end: "2014",
  },
];

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <header className="bg-slate-50 lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-112 lg:items-start lg:overflow-y-auto xl:w-120">
        <div className="hidden lg:sticky lg:top-0 lg:flex lg:w-16 lg:flex-none lg:items-center lg:whitespace-nowrap lg:py-12 lg:text-sm lg:leading-7 lg:[writing-mode:vertical-rl]">
          <span className="font-mono text-slate-500">Follow on</span>
          <div className="mt-8 flex gap-6">
            {social.map((item) => (
              <a key={item.name} href={item.href}>
                <span className="sr-only">{item.name}</span>
                <item.icon className="h6 w-6 fill-violet-300 hover:fill-violet-500" />
              </a>
            ))}
          </div>
        </div>
        <div className="relative z-10 mx-auto px-4 pb-4 pt-10 sm:px-6 md:max-w-2xl md:px-4 lg:min-h-full lg:flex-auto lg:border-x lg:border-slate-200 lg:px-8 lg:py-12 xl:px-12">
          <Link
            href="/"
            className="relative mx-auto block w-48  overflow-hidden rounded-lg bg-slate-200 shadow-xl shadow-slate-200 sm:w-64 sm:rounded-xl lg:w-auto lg:rounded-2xl"
            aria-label="Homepage"
          >
            <Image
              className="w-full"
              src={portraitImage}
              alt=""
              sizes="(min-width: 1024px) 20rem, (min-width: 640px) 16rem, 12rem"
              priority
            />
            <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-black/10 sm:rounded-xl lg:rounded-2xl" />
          </Link>
          <div className="mt-10 text-center lg:mt-12 lg:text-left">
            <p className="text-xl font-bold text-slate-900">
              <Link href="/">Maurice Long</Link>
            </p>
            <p className="mt-3 text-lg font-medium leading-8 text-slate-700">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            </p>
          </div>
          <AboutSection className="mt-12 hidden lg:block" />
          <section className="mt-10 lg:mt-12">
            <h2 className="sr-only flex items-center font-mono text-sm font-medium leading-7 text-slate-900 lg:not-sr-only">
              <BriefcaseIcon className="h-3 w-auto fill-pink-300" />
              <span className="ml-2.5">Work</span>
            </h2>
            <div className="h-px bg-gradient-to-r from-slate-200/0 via-slate-200 to-slate-200/0 lg:hidden" />
            <ul
              role="list"
              className="mt-4 flex justify-center gap-10 text-base font-medium leading-7 text-slate-700 sm:gap-8 lg:flex-col lg:gap-4"
            >
              {resume.map((item) => (
                <li key={item.company} className="flex">
                  <a
                    href="/"
                    className="group flex items-center"
                    aria-label={item.company}
                  >
                    <Image
                      src={item.logo}
                      alt=""
                      className="h-7 w-7"
                      unoptimized
                    />
                    <span className="hidden sm:ml-3 sm:block">
                      {item.company}
                    </span>
                  </a>
                </li>
              ))}
              <a
                href="#"
                className="group mt-2 hidden text-sm font-bold leading-6 text-pink-500 hover:text-pink-700 active:text-pink-900 lg:flex lg:items-center lg:gap-x-4"
              >
                Download CV
                <ArrowDownIcon className="h-4 w-4 stroke-pink-500 transition group-hover:stroke-pink-700 group-active:stroke-pink-900" />
              </a>
            </ul>
          </section>
        </div>
      </header>
      <main className="border-t border-slate-200 lg:relative lg:mb-28 lg:ml-112 lg:border-t-0 xl:ml-120">
        <Waveform className="absolute left-0 top-0 h-20 w-full" />
        <div className="relative">{children}</div>
      </main>
      <footer className="border-t border-slate-200 bg-slate-50 py-10 pb-40 sm:py-16 sm:pb-32 lg:hidden">
        <div className="mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4">
          <AboutSection />
          <div className="mt-2 flex justify-between">
            <div>
              <h2 className="mt-8 flex items-center font-mono text-sm font-medium leading-7 text-slate-900">
                <span>Follow on</span>
              </h2>
              <div className="flex gap-6">
                {social.map((item) => (
                  <a key={item.name} href={item.href}>
                    <span className="sr-only">{item.name}</span>
                    <item.icon className="h6 w-6 fill-violet-300 hover:fill-violet-500" />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h2 className="mt-8 flex items-center font-mono text-sm font-medium leading-7 text-slate-900">
                <span>Contact me</span>
              </h2>
              <a
                href="mailto:long.maurice.ucla@gmail.com"
                className="flex justify-end"
              >
                <span className="sr-only">Email</span>
                <MailIcon className="h6 w-6 fill-violet-300 hover:fill-violet-500" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
