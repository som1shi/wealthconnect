import { Hero } from "@/components/landing/Hero";
import {Demos} from "@/components/landing/Demo"
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Testimonials } from "@/components/landing/Testimonials";
import { Cta } from "@/components/landing/Cta";

export default function Home() {
  return (
    <>
      <Hero />
      <Demos />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Cta />
    </>
  );
}
