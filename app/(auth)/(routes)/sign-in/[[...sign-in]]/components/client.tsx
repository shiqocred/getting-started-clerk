"use client";

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import OAuth from "@/components/o-auth";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import FormInput from "@/components/form-input";
import { Button } from "@/components/ui/button";

const Client = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  // start the sign In process.
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      const result = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (result.status === "complete") {
        console.log(result);
        await setActive({ session: result.createdSessionId });
        router.push("/");
      } else {
        /*Investigate why the login hasn't completed */
        console.log(result);
      }
    } catch (err: any) {
      console.error("error", err.errors[0].longMessage);
    }
  };
  return (
    <div className="w-1/3 h-full px-8 flex justify-center flex-col bg-white">
      <div className="space-y-1 mb-12">
        <h3 className="text-xl font-semibold">Sign In</h3>
        <p className="text-sm">
          Welcome Back to Geting Started Clerk Authentication
        </p>
      </div>
      <OAuth via="google" label="Google" />
      <div className="relative flex justify-center items-center">
        <Separator className="my-12" />
        <p className="absolute px-3 bg-white text-sm">or</p>
      </div>
      <div>
        <form className="space-y-5">
          <FormInput
            name="email"
            type="email"
            autoComplete="on"
            setA={setEmailAddress}
            label="Email"
          />
          <FormInput
            name="password"
            type="password"
            autoComplete="on"
            setA={setPassword}
            label="Password"
          />
          <Button
            className="w-full bg-sky-800 hover:bg-sky-900"
            onClick={handleSubmit}
          >
            Sign In
          </Button>
        </form>
        <p className="text-sm mt-5">
          No Account?{" "}
          <Link
            className="underline text-sky-800 hover:text-sky-700"
            href={"/sign-up"}
          >
            Get one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Client;
