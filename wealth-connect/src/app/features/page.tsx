import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, BarChart3, Brain, Clock, CoinsIcon, LineChart, Lock, PieChart, Shield, Smartphone, TrendingUp, Users } from "lucide-react";

const features = [
  {
    category: "AI-Powered Investment Analysis",
    description: "Harness the power of artificial intelligence to make smarter investment decisions.",
    items: [
      {
        title: "Portfolio Optimization",
        description: "AI-driven portfolio balancing based on your risk tolerance and goals",
        icon: <PieChart className="w-6 h-6 text-blue-500" />,
      },
      {
        title: "Market Insights",
        description: "Real-time analysis of market trends and investment opportunities",
        icon: <TrendingUp className="w-6 h-6 text-blue-500" />,
      },
      {
        title: "Risk Assessment",
        description: "Advanced risk analysis and mitigation strategies",
        icon: <Shield className="w-6 h-6 text-blue-500" />,
      },
    ],
  },
  {
    category: "Automated Wealth Building",
    description: "Set and forget with our intelligent automation tools.",
    items: [
      {
        title: "Smart Rebalancing",
        description: "Automatic portfolio rebalancing to maintain optimal allocation",
        icon: <BarChart3 className="w-6 h-6 text-blue-500" />,
      },
      {
        title: "Dividend Reinvestment",
        description: "Automated dividend reinvestment for compound growth",
        icon: <CoinsIcon className="w-6 h-6 text-blue-500" />,
      },
      {
        title: "Scheduled Investments",
        description: "Automated recurring investments on your schedule",
        icon: <Clock className="w-6 h-6 text-blue-500" />,
      },
    ],
  },
  {
    category: "Advanced Security",
    description: "Enterprise-grade security to protect your investments.",
    items: [
      {
        title: "Bank-Level Security",
        description: "256-bit encryption and multi-factor authentication",
        icon: <Lock className="w-6 h-6 text-blue-500" />,
      },
      {
        title: "Real-time Monitoring",
        description: "24/7 account monitoring and fraud detection",
        icon: <LineChart className="w-6 h-6 text-blue-500" />,
      },
      {
        title: "Smart Device Access",
        description: "Secure access across all your devices",
        icon: <Smartphone className="w-6 h-6 text-blue-500" />,
      },
    ],
  },
  {
    category: "Expert Support",
    description: "Access to professional guidance whenever you need it.",
    items: [
      {
        title: "AI Assistant",
        description: "24/7 AI-powered support for instant answers",
        icon: <Brain className="w-6 h-6 text-blue-500" />,
      },
      {
        title: "Human Advisors",
        description: "Access to certified financial advisors",
        icon: <Users className="w-6 h-6 text-blue-500" />,
      },
    ],
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-neutral-50 dark:from-background dark:to-neutral-900/50">
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4">Powerful Features</h1>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-teal-500 mx-auto mb-6"></div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the tools and technologies that will transform your investment journey
            </p>
          </div>

          {/* Features Grid */}
          <div className="space-y-24">
            {features.map((feature, index) => (
              <section key={index} className="relative">
                <div className="mb-10">
                  <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                    {feature.category}
                  </h2>
                  <p className="text-xl text-muted-foreground">
                    {feature.description}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {feature.items.map((item, i) => (
                    <div
                      key={i}
                      className="p-6 rounded-xl border bg-background/50 backdrop-blur-sm hover:shadow-lg transition-all"
                    >
                      <div className="mb-4 p-2 rounded-lg bg-blue-50 dark:bg-blue-500/10 w-fit">
                        {item.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-24 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of investors who are already building their wealth with our platform.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-teal-500 hover:opacity-90 group"
              >
                <Link href="/waitlist" className="flex items-center gap-2">
                  Start Your Journey
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
