"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import HeroSection from "@/components/hero";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { features } from "@/data/features";
import { testimonial } from "@/data/testimonial";
import { faqs } from "@/data/faqs";
import { howItWorks } from "@/data/howItWorks";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 -z-10" />
      </div>

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="w-full py-20 bg-background relative">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-4xl font-bold tracking-tight text-center mb-14">
            Powerful Features for Your Career Growth
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border border-transparent bg-gradient-to-br from-slate-900 to-slate-800 hover:from-blue-900 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-2xl">
                  <CardContent className="pt-8 pb-6 text-center flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary text-2xl">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-20 bg-muted/50 relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-700/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-800/20 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-4xl mx-auto text-center">
            {[
              { number: "50+", label: "Industries Covered" },
              { number: "1000+", label: "Interview Questions" },
              { number: "95%", label: "Success Rate" },
              { number: "24/7", label: "AI Support" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="flex flex-col items-center"
              >
                <h3 className="text-5xl font-extrabold text-primary">
                  {stat.number}
                </h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground">
              Four simple steps to accelerate your career growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-6xl mx-auto">
            {howItWorks.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full  flex items-center justify-center font-bold text-lg">
                <h2>{item.icon}</h2>
                </div>
                <h3 className="font-semibold text-xl">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-20 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-4xl font-bold text-center mb-14">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonial.map((t, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-background shadow-lg hover:shadow-xl border border-slate-200">
                  <CardContent className="pt-6">
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center space-x-4 mb-4">
                        <Image
                          width={48}
                          height={48}
                          src={t.image}
                          alt={t.author}
                          className="rounded-full object-cover border-2 border-primary/20"
                        />
                        <div>
                          <p className="font-semibold">{t.author}</p>
                          <p className="text-sm text-muted-foreground">
                            {t.role}
                          </p>
                          <p className="text-sm text-primary">{t.company}</p>
                        </div>
                      </div>
                      <blockquote className="relative italic text-muted-foreground">
                        “{t.quote}”
                      </blockquote>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Find answers to common questions about our platform
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full relative overflow-hidden">
        <div className="mx-auto py-24 px-6 bg-gradient-to-r from-blue-800 via-indigo-700 to-purple-700 rounded-lg shadow-xl relative z-10">
          <div className="flex flex-col items-center justify-center space-y-6 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Ready to Accelerate Your Career?
            </h2>
            <p className="mx-auto max-w-[600px] text-white/80 md:text-lg">
              Join thousands of professionals who are advancing their careers
              with AI-powered guidance.
            </p>
            <Link href="/dashboard" passHref>
              <Button
                size="lg"
                variant="secondary"
                className="h-12 px-8 mt-5 bg-white text-primary font-semibold hover:bg-slate-200 shadow-lg animate-pulse"
              >
                Start Your Journey Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
