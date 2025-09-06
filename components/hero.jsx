"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="w-full pt-36 md:pt-48 pb-10 bg-slate-950 overflow-y-hidden">
      <div className="space-y-6 text-center">
        <div className="space-y-6 mx-auto">
          <h1 className="text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl gradient-title animate-gradient">
          AI: Your Partner in 
            <br />
            Career Development
          </h1>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
          Unlock your potential. Our AI-powered tools and personalized 
          guidance provide the interview prep you need for true job success.
          </p>
        </div>
        <div className="flex justify-center space-x-4">
        <Link href="/dashboard">
    <Button size="lg" className="px-10 transition-shadow duration-200 hover:shadow-lg bg-blue-900 text-white hover:bg-slate-800">
        Get Started
    </Button>
</Link>
  
        </div>
        <div className="hero-image-wrapper mt-5 md:mt-0">
  <div ref={imageRef} className="hero-image">
    <Image
      src="/banner.png"
      alt="Dashboard Preview"
      width={1280}
      height={720}
      priority
      className="w-full max-w-6xl mx-auto rounded-lg shadow-2xl border aspect-video object-cover"
    />
  </div>
</div>

      </div>
    </section>
  );
};

export default HeroSection;
