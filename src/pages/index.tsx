import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import { Container } from "~/components/Container";
import { GitHubIcon } from "~/components/SocialIcons";

interface IconProps {
  className?: string;
}

function ArrowTopRightOnSquareIcon(props: IconProps) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
      />
    </svg>
  );
}

function ProjectEntry() {
  //Project name, description, stack, github, live link
  const project = {
    id: "four-kings",
    name: "Four Kings",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat veniam adipisci ratione nisi suscipit cumque deleniti necessitatibus eveniet aperiam enim.",
    stack: [
      "Next.js",
      "NextAuth",
      "TRPC",
      "Prisma",
      "TailwindCSS",
      "Supabase",
      "Vercel",
    ],
    githubUrl: "#",
    livePreviewUrl: "#",
  };
  return (
    <article
      aria-labelledby={`project-${project.name}-title`}
      className="py-10 sm:py-12"
    >
      <Container>
        <div className="flex flex-col items-start">
          <h2
            id={`project-${project.name}-title`}
            className="mt-2 text-lg font-bold text-slate-900 hover:text-pink-700"
          >
            <Link href={`/${project.id}`}>{project.name}</Link>
          </h2>
          <p className="mt-1 text-base leading-7 text-slate-700">
            {project.description}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-x-4">
            {project.stack.map((tech) => (
              <p key={tech} className="mt-1 font-mono text-xs text-slate-500">
                {tech}
              </p>
            ))}
          </div>
          <div className="mt-8 flex items-center gap-4">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Github"
            >
              <GitHubIcon className="h-7 w-7 fill-violet-300 hover:fill-violet-500" />
            </a>
            <a
              href={project.livePreviewUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Live preview"
            >
              <ArrowTopRightOnSquareIcon className="h-7 w-7 stroke-violet-300 hover:stroke-violet-500" />
            </a>
          </div>
        </div>
      </Container>
    </article>
  );
}

const Home: NextPage = () => {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });
  // return <div>Content</div>;

  return (
    <>
      <Head>
        <title>
          Maurice Long - Software developer, tinkerer, and amateur chess player
        </title>
        <meta
          name="description"
          content="I'm Maurice, a software developer based in Los Angeles. Come check out my most recent projects."
        />
      </Head>
      <div className="pb-12 pt-16 sm:pb-4 lg:pt-12">
        <Container className="text-2xl font-bold leading-7 text-slate-900">
          <h1>Featured Project(s)</h1>
        </Container>
        <div className="divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100">
          <ProjectEntry />
        </div>
      </div>
    </>
  );
};

export default Home;

// const AuthShowcase: React.FC = () => {
//   const { data: sessionData } = useSession();

//   const { data: secretMessage } = api.example.getSecretMessage.useQuery(
//     undefined, // no input
//     { enabled: sessionData?.user !== undefined }
//   );

//   return (
//     <div className="flex flex-col items-center justify-center gap-4">
//       <p className="text-center text-2xl text-white">
//         {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
//         {secretMessage && <span> - {secretMessage}</span>}
//       </p>
//       <button
//         className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
//         onClick={sessionData ? () => void signOut() : () => void signIn()}
//       >
//         {sessionData ? "Sign out" : "Sign in"}
//       </button>
//     </div>
//   );
// };
