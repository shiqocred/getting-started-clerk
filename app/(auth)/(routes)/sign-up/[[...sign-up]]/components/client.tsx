"use client";

import { useEffect, useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import OAuth from "@/components/o-auth";
import { Separator } from "@/components/ui/separator";
import toast from "react-hot-toast";
import Link from "next/link";
import FormInput from "@/components/form-input";
import { ArrowLeft } from "lucide-react";

const Client = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const router = useRouter();
  const [seconds, setSeconds] = useState(60);
  const [timerStarted, setTimerStarted] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  // start the sign up process.
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
      setSeconds(60);
      setTimerStarted(true);
      setIsDisabled(true);
    } catch (err: any) {
      toast.error(err.errors[0].message);
      console.log(JSON.stringify(err, null, 2));
    }
  };

  const resendVerify = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }
    try {
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
      setSeconds(60);
      setTimerStarted(true);
      setIsDisabled(true);
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
    }
  };

  // This verifies the user using email code that is delivered.
  const onPressVerify = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (completeSignUp.status !== "complete") {
        /*  investigate the response, to see if there was an error
         or if the user needs to complete more steps.*/
        return;
      }
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        toast.success("Registration completed.");
        router.push("/");
      }
    } catch (err: any) {
      toast.error(err.errors[0].longMessage);
    }
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (timerStarted && seconds > 0) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    if (seconds === 0) {
      // Execute your function when countdown reaches 0
      handleCountdownCompletion();
    }

    return () => clearInterval(intervalId);
  }, [timerStarted, seconds]);

  const handleCountdownCompletion = () => {
    setIsDisabled(false);
  };

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return (
    <div className="w-1/3 h-full px-8 flex justify-center flex-col bg-white">
      {!pendingVerification ? (
        <>
          <div className="space-y-1 mb-12">
            <h3 className="text-xl font-semibold">Sign Up</h3>
            <p className="text-sm">
              Welcome to Geting Started Clerk Authentication
            </p>
          </div>
          <OAuth via="google" label="Google" />
          <div className="relative flex justify-center items-center">
            <Separator className="my-12" />
            <p className="absolute px-3 bg-white text-sm">or</p>
          </div>
        </>
      ) : (
        <Button
          variant={"ghost"}
          className="hover:bg-transparent hover:opacity-70 w-16 px-0 justify-start mb-12"
          onClick={() => setPendingVerification(false)}
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
      )}
      <div>
        {!pendingVerification && (
          <div>
            <form className="space-y-5">
              <div className="flex gap-x-5 w-full">
                <FormInput
                  setA={setFirstName}
                  name="firstName"
                  label="First Name"
                  autoComplete="off"
                />
                <FormInput
                  setA={setLastName}
                  name="lastName"
                  label="Last Name"
                  autoComplete="off"
                />
              </div>
              <FormInput
                setA={setEmailAddress}
                name="email"
                label="Email"
                type="email"
                autoComplete="on"
              />
              <FormInput
                setA={setPassword}
                name="password"
                label="Password"
                type="password"
                autoComplete="off"
              />
              <Button
                onClick={handleSubmit}
                className="w-full bg-sky-800 hover:bg-sky-900"
              >
                Sign up
              </Button>
            </form>
            <p className="text-sm mt-5">
              Already Account?{" "}
              <Link
                className="underline text-sky-800 hover:text-sky-700"
                href={"/sign-in"}
              >
                Get connected.
              </Link>
            </p>
          </div>
        )}
        {pendingVerification && (
          <div>
            <form className="space-y-5">
              <FormInput
                setA={setCode}
                name="code"
                label="Verification Code"
                autoComplete="off"
              />
              <Button
                className="w-full bg-sky-800 hover:bg-sky-900"
                onClick={onPressVerify}
              >
                Verify Email
              </Button>
            </form>
            <p className="text-sm mt-5 w-full text-center">
              <Button
                onClick={resendVerify}
                variant={"link"}
                disabled={isDisabled}
              >
                Resend email
              </Button>
              {remainingSeconds !== 0 && (
                <span>
                  0{minutes}:
                  {remainingSeconds.toString().length === 1
                    ? "0" + remainingSeconds
                    : remainingSeconds}
                </span>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Client;
