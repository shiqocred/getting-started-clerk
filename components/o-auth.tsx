import React from "react";
import { Button } from "./ui/button";
import { useSignIn } from "@clerk/nextjs";
import { OAuthProvider, OAuthStrategy } from "@clerk/nextjs/dist/types/server";
import Image from "next/image";
import toast from "react-hot-toast";

const OAuth = ({ via, label }: { via: OAuthProvider; label: string }) => {
  const { isLoaded, signIn } = useSignIn();

  const signInWith = async (strategy: OAuthStrategy) => {
    if (!isLoaded) {
      return;
    }
    try {
      return await signIn.authenticateWithRedirect({
        strategy,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      });
    } catch (err: any) {
      toast.error(err.errors[0].message);
    }
  };
  return (
    <Button
      onClick={() => signInWith(`oauth_${via}`)}
      className="flex text-sm font-medium justify-start px-8"
      variant="outline"
    >
      <div className="relative w-5 h-5 mr-2">
        <Image
          src={`https://images.clerk.dev/static/${via}.svg`}
          fill
          alt=""
          priority
        />
      </div>
      Sign in with<span className="capitalize ml-1">{label}</span>
    </Button>
  );
};

export default OAuth;
