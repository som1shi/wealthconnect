import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Essential",
    price: "$29",
    description: "Perfect for individuals starting their wealth building journey",
    features: [
      "Personalized investment strategy",
      "Automated portfolio rebalancing",
      "Basic tax optimization",
      "Mobile app access",
      "Email support",
      "Educational resources"
    ],
    highlight: false
  },
  {
    name: "Professional",
    price: "$99",
    description: "Advanced features for serious investors",
    features: [
      "Everything in Essential",
      "Advanced portfolio analytics",
      "Real-time market insights",
      "Tax-loss harvesting",
      "Priority support",
      "Retirement planning",
      "Estate planning basics",
      "Quarterly strategy review"
    ],
    highlight: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Tailored solutions for institutions and high-net-worth individuals",
    features: [
      "Everything in Professional",
      "Dedicated account manager",
      "Custom API integration",
      "Advanced tax strategies",
      "Private investment opportunities",
      "24/7 phone support",
      "Family office services",
      "Custom reporting"
    ],
    highlight: false
  }
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-neutral-50 dark:from-background dark:to-neutral-900/50">
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4">Transparent Pricing</h1>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-teal-500 mx-auto mb-6"></div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that best fits your investment goals. All plans include our core 
              wealth-building technology and expert support.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div 
                key={plan.name}
                className={`relative p-8 rounded-2xl border ${
                  plan.highlight 
                    ? 'border-blue-600/50 bg-blue-600/5 dark:bg-blue-600/10' 
                    : 'bg-background/50 backdrop-blur-sm'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-teal-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.price !== "Custom" && <span className="text-muted-foreground">/month</span>}
                  </div>
                  <p className="text-muted-foreground">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-blue-600" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  asChild 
                  size="lg" 
                  className={`w-full ${
                    plan.highlight
                      ? 'bg-gradient-to-r from-blue-600 to-teal-500 hover:opacity-90'
                      : 'bg-background hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }`}
                  variant={plan.highlight ? 'default' : 'outline'}
                >
                  <Link href="/waitlist">
                    {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                  </Link>
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <h3 className="text-2xl font-semibold mb-4">Enterprise Solutions</h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Need a custom solution? We offer tailored enterprise plans for businesses 
              and institutions with specific requirements.
            </p>
            <Button 
              asChild 
              size="lg" 
              variant="outline"
              className="bg-background hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <Link href="/contact">Schedule a Consultation</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}