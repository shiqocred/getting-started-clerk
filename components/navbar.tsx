"use client";

import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";
import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { useClerk } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { signOut, user } = useClerk();
  const router = useRouter();
  return (
    <div className="w-full h-12 border-b">
      <div className="w-full max-w-7xl mx-auto h-full flex justify-between items-center">
        <Link
          className="font-semibold text-sm text-sky-800 hover:text-sky-700"
          href={"/"}
        >
          Shiqocred.
        </Link>
        <div>
          <SignedIn>
            <Popover>
              <PopoverTrigger asChild>
                <Avatar>
                  <AvatarFallback>
                    {user?.firstName?.charAt(0)}
                    {user?.lastName?.charAt(0)}
                  </AvatarFallback>
                  <AvatarImage src={user?.imageUrl} />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="p-0" align="end">
                <Command>
                  <CommandGroup>
                    <CommandItem className="flex-col items-start aria-selected:bg-transparent">
                      <h3 className="text-xs font-semibold capitalize">
                        {user?.fullName}
                      </h3>
                      <p className="text-xs">
                        {user?.emailAddresses[0].emailAddress}
                      </p>
                    </CommandItem>
                    <CommandSeparator />
                    <CommandItem className="text-xs mt-1 p-0">
                      <button
                        className="flex cursor-default outline-none ring-0 w-full px-2 py-1.5"
                        onClick={() => signOut(() => router.push("/"))}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </button>
                    </CommandItem>
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </SignedIn>
          <SignedOut>
            <Button
              className="h-8 mr-2 text-sky-800 hover:text-sky-700 "
              variant={"link"}
              onClick={() => router.push("/sign-in")}
            >
              Sign In
            </Button>
            <Button
              className="h-8 bg-sky-800 hover:bg-sky-900 px-5"
              onClick={() => router.push("/sign-up")}
            >
              Sign Up
            </Button>
          </SignedOut>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
