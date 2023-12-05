import { Metadata } from "next";
import Client from "./components/client";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function SignUpForm() {
  return (
    <div className="w-screen h-screen bg-sky-800 flex">
      <Client />
      <div className="h-full w-2/3 flex justify-center items-center ">
        <div className="text-white uppercase font-semibold text-xl flex flex-col items-center">
          Welcome to GS Clerk Authentication.
          <p className="font-light normal-case text-sm">
            - Build{" "}
            <Link className="underline" href="https://github.com/shiqocred">
              shiqocred
            </Link>{" "}
            -
          </p>
        </div>
      </div>
    </div>
  );
}
