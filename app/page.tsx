import Navbar from "@/components/navbar";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-screen w-screen relative">
      <Navbar />
      <div className="flex w-full justify-center h-full -z-10 absolute top-0 items-center">
        <div className="h-4 w-4 absolute top-24 left-44 bg-zinc-700 rounded-sm rotate-45 animate-up-down" />
        <div className="h-4 w-4 absolute top-40 right-40 bg-zinc-500 rounded-sm rotate-45 animate-up-down" />
        <div className="h-4 w-4 absolute bottom-60 left-[500px] bg-zinc-600 rounded-sm rotate-45 animate-up-down" />
        <div>
          <h1 className="text-7xl text-center font-bold text-sky-800">
            GETTING STARTED
          </h1>
          <h3 className="text-lg text-center font-medium text-sky-800">
            Next.js + Clerk Authentication
          </h3>
          <p className="mt-8 max-w-2xl text-center font-light text-zinc-500">
            Fundamental implementation Next.js with Clerk Authentication
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 h-16 w-full flex justify-center items-center text-sm">
        &copy; 2023 Built by&nbsp;
        <Link
          href={""}
          className="hover:underline text-sky-800 hover:text-sky-700"
        >
          shiqocred
        </Link>
        .
      </div>
    </main>
  );
}
