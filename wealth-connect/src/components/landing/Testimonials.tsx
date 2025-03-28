import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    quote:
      "WealthConnect changed my approach to investing. The AI-powered recommendations helped me optimize my portfolio and I've seen a 22% increase in returns.",
    name: "Michael Chen",
    role: "Software Engineer",
    image: "/avatars/michael.jpg",
    initials: "MC",
  },
  {
    quote:
      "As someone who knew little about investing, WealthConnect made the process simple and approachable. Their financial advisors were incredibly helpful.",
    name: "Sarah Johnson",
    role: "Marketing Director",
    image: "/avatars/sarah.jpg",
    initials: "SJ",
  },
  {
    quote:
      "The automated savings feature has been a game-changer for me. I'm saving more than ever without having to think about it.",
    name: "David Reynolds",
    role: "Small Business Owner",
    image: "/avatars/david.jpg",
    initials: "DR",
  },
  {
    quote:
      "I've tried other financial platforms, but WealthConnect's personalized approach and intuitive interface sets it apart. Highly recommend!",
    name: "Emma Torres",
    role: "Healthcare Professional",
    image: "/avatars/emma.jpg",
    initials: "ET",
  },
  {
    quote:
      "The tax optimization strategies alone have saved me thousands. WealthConnect pays for itself many times over.",
    name: "Robert Kim",
    role: "Freelance Consultant",
    image: "/avatars/robert.jpg",
    initials: "RK",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-neutral-50 dark:bg-neutral-900/50 w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Trusted by thousands of{" "}
            <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              investors
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            See what our customers say about how WealthConnect has transformed
            their financial lives.
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="max-w-5xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                <Card className="h-full border bg-background/60 backdrop-blur-sm">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex-1 mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6 text-blue-500 mb-4"
                      >
                        <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                        <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                      </svg>
                      <p className="text-muted-foreground">{testimonial.quote}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={testimonial.image} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-8 flex justify-center gap-2">
            <CarouselPrevious className="static" />
            <CarouselNext className="static" />
          </div>
        </Carousel>
      </div>
    </section>
  );
} 