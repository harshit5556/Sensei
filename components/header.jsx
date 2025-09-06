import React from "react";
import { Button } from "./ui/button";
import {
  PenBox,
  LayoutDashboard,
  FileText,
  GraduationCap,
  ChevronDown,
  StarsIcon,
} from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { checkUser } from "@/lib/checkUser";

export default async function Header() {
  await checkUser();

  return (
    <header className="fixed top-0 w-full border-b bg-white/80 backdrop-blur-xl shadow-sm z-50 dark:bg-slate-900/80 dark:border-slate-700">
      <nav className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src={"/logo.png"}
            alt="Sensai Logo"
            width={180}
            height={50}
            className="h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Center Navigation */}
        <div className="flex-1 flex justify-center">
          <div className="flex items-center gap-4 md:gap-8 bg-white/60 dark:bg-slate-800/60 px-4 py-2 rounded-full shadow-sm backdrop-blur-md">
            <SignedIn>
              {/* Dashboard */}
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 px-4"
                >
                  <LayoutDashboard className="h-4 w-4 text-blue-500" />
                  <span className="hidden md:block">Industry Insights</span>
                </Button>
              </Link>

              {/* Growth Tools Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="flex items-center gap-2 rounded-full px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md hover:shadow-lg transition-all">
                    <StarsIcon className="h-4 w-4" />
                    <span className="hidden md:block">Growth Tools</span>
                    <ChevronDown className="h-4 w-4 opacity-80" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="center"
                  className="w-52 rounded-xl shadow-lg border p-1 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md"
                >
                  <DropdownMenuItem asChild>
                    <Link
                      href="/resume"
                      className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                      <FileText className="h-4 w-4 text-purple-500" />
                      Build Resume
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/ai-cover-letter"
                      className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                      <PenBox className="h-4 w-4 text-green-500" />
                      Cover Letter
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/interview"
                      className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                      <GraduationCap className="h-4 w-4 text-red-500" />
                      Interview Prep
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SignedIn>

            <SignedOut>
              <SignInButton>
                <Button className="rounded-full px-5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md hover:shadow-lg hover:scale-105 transition-all">
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>

        {/* Right User Button */}
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                avatarBox:
                  "w-10 h-10 ring-2 ring-blue-500/60 hover:ring-indigo-500 transition-all rounded-full",
                userButtonPopoverCard:
                  "shadow-2xl border rounded-xl backdrop-blur-md",
                userPreviewMainIdentifier: "font-semibold text-slate-800",
              },
            }}
            afterSignOutUrl="/" 
          />
        </SignedIn>
      </nav>
    </header>
  );
}
