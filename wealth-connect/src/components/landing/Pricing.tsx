import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

function CheckIcon() {
  return (
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
      className="h-5 w-5 text-blue-500"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

const pricingPlans = [
  {
    name: "Starter",
    description: "Perfect for beginners who want to start their investing journey.",
    price: "$9",
    duration: "/month",
    features: [
      "Basic portfolio analysis",
      "Investment recommendations",
      "Automated savings",
      "Mobile app access",
      "Email support",
    ],
    buttonText: "Join Waitlist",
    buttonVariant: "outline",
    popular: false,
  },
  {
    name: "Growth",
    description: "For serious investors who want to accelerate their wealth building.",
    price: "$29",
    duration: "/month",
    features: [
      "Everything in Starter",
      "Advanced portfolio analysis",
      "Tax optimization strategies",
      "Personalized financial planning",
      "Retirement planning",
      "Priority email support",
    ],
    buttonText: "Join Waitlist",
    buttonVariant: "default",
    popular: true,
  },
  {
    name: "Wealth",
    description: "Comprehensive solution for high-net-worth individuals.",
    price: "$99",
    duration: "/month",
    features: [
      "Everything in Growth",
      "Dedicated financial advisor",
      "Estate planning",
      "Advanced tax strategies",
      "Private investment opportunities",
      "24/7 phone support",
    ],
    buttonText: "Join Waitlist",
    buttonVariant: "outline",
    popular: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Simple, transparent{" "}
            <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              pricing
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Choose the plan that's right for your financial journey. All plans
            include a 14-day free trial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <Card
              key={index}
              className={`flex flex-col ${
                plan.popular
                  ? "border-blue-500/30 shadow-lg shadow-blue-500/10"
                  : "border"
              }`}
            >
              {plan.popular && (
                <div className="py-1.5 px-4 bg-blue-500 text-white text-xs font-medium tracking-wider uppercase rounded-t-lg text-center">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  {plan.description}
                </CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.duration}</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3 text-sm">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckIcon />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  className={`w-full ${plan.popular ? "bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600" : ""}`}
                  variant={plan.buttonVariant === "default" ? "default" : "outline"}
                >
                  <Link href={`/waitlist?plan=${plan.name.toLowerCase()}`}>{plan.buttonText}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
} 