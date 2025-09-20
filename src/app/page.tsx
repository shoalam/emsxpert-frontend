import React from "react";
import MainLayout from "@/components/main/MainLayout";
import { BarChart, BarChart2, Bell, Users, Workflow } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const features = [
    {
      title: "Real-time Alerts",
      description:
        "Instant notifications for emergencies and critical updates.",
      icon: Bell,
    },
    {
      title: "User Management",
      description: "Easily manage users, roles, and permissions.",
      icon: Users,
    },
    {
      title: "Analytics Dashboard",
      description: "Visualize key metrics and trends with interactive charts.",
      icon: BarChart,
    },
    {
      title: "Customizable Workflows",
      description: "Adapt the system to your unique emergency protocols.",
      icon: Workflow,
    },
  ];
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto flex flex-col items-center justify-center py-24 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-primary">
          Welcome to <span className="text-blue-500">EMSxpert</span>
        </h1>
        <p className="text-base md:text-xl text-muted-foreground mb-8">
          Your expert solution for modern emergency management. Fast, reliable,
          and beautifully designed.
        </p>
        <div className="flex gap-2">
          <Link
            href="/register"
            className="inline-block px-6 py-2 rounded-lg bg-blue-600 text-primary-foreground font-semibold shadow hover:bg-primary/90 transition"
          >
            Try It Free
          </Link>
          <Link
            href="/features"
            className="inline-block px-6 py-2 rounded-lg border font-semibold shadow hover:bg-primary/90 hover:text-primary-foreground transition"
          >
            See Features
          </Link>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Our Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-pretty">
                Everything you need to manage tasks effectively
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our powerful features help teams stay organized and deliver
                projects on time
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-card border border-border rounded-lg p-6 shadow hover:shadow-lg transition"
              >
                <div className="flex items-center gap-3 mb-2">
                  <feature.icon className="text-black w-6 h-6" />
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                </div>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                How It Works
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Simple process, powerful results
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Get started in minutes and see improved team productivity
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 mt-16">
            <div className="relative flex flex-col items-center space-y-4 text-center">
              <div className="absolute -top-10 text-6xl font-bold text-muted/20">
                1
              </div>
              <div className="bg-blue-600/10 p-3 rounded-full">
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
                  className="h-8 w-8 text-blue-600"
                >
                  <rect
                    width="18"
                    height="11"
                    x="3"
                    y="11"
                    rx="2"
                    ry="2"
                  ></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold">Create an account</h3>
              <p className="text-muted-foreground">
                Sign up for free and set up your first workspace in seconds.
              </p>
            </div>
            <div className="relative flex flex-col items-center space-y-4 text-center">
              <div className="absolute -top-10 text-6xl font-bold text-muted/20">
                2
              </div>
              <div className="bg-blue-600/10 p-3 rounded-full">
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
                  className="h-8 w-8 text-blue-600"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold">Invite your team</h3>
              <p className="text-muted-foreground">
                Add your team members and start collaborating right away.
              </p>
            </div>
            <div className="relative flex flex-col items-center space-y-4 text-center">
              <div className="absolute -top-10 text-6xl font-bold text-muted/20">
                3
              </div>
              <div className="bg-blue-600/10 p-3 rounded-full">
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
                  className="h-8 w-8 text-blue-600"
                >
                  <path d="m22 2-7 20-4-9-9-4Z"></path>
                  <path d="M22 2 11 13"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold">Get things done</h3>
              <p className="text-muted-foreground">
                Create projects, assign tasks, and track progress in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 mb-20 md:py-24 lg:py-32 bg-blue-600">
        <div
          className="container px-4 md:px-6 text-center max-w-screen-2xl mx-auto"
        >
          <div className="mx-auto flex max-w-3xl flex-col items-center justify-center space-y-6">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tighter text-primary-foreground sm:text-4xl md:text-5xl">
                Ready to boost your team's productivity?
              </h2>
              <p className="mx-auto max-w-[700px] text-primary-foreground/80 text-sm md:text-xl text-pretty">
                Join thousands of teams that use TaskHub to get more done,
                together.
              </p>
            </div>
            <div className="flex gap-4">
              <Link href="/register" data-discover="true">
                <button
                  data-slot="button"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 h-10 rounded-md px-6 has-[&gt;svg]:px-4"
                >
                  Get Started Free
                </button>
              </Link>
              <Link href="/login" data-discover="true">
                <button
                  data-slot="button"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer border shadow-xs dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-10 rounded-md px-6 has-[&gt;svg]:px-4 bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >
                  Log In
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
