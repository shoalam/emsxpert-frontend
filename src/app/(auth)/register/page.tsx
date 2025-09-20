"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Loader, UserRoundCog } from "lucide-react";
import Link from "next/link";

const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: RegisterFormValues) {
    console.log(values);
    setLoading(true);

    // Example: send data to API
    await new Promise((r) => setTimeout(r, 1200));

    setLoading(false);
    router.push("/dashboard/employee");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background text-foreground p-4">
      <section className="w-full max-w-md bg-card border border-border rounded-xl p-8 shadow">
        <h3 className="text-2xl font-bold text-primary mb-2 text-center flex items-center justify-center gap-2">
          <span className="text-white bg-blue-600 rounded p-1 flex items-center justify-center">
            <UserRoundCog size={20} />
          </span>
          EMSxpert
        </h3>
        <p className="mb-8 text-muted-foreground text-center">
          Fill in your details to create a new account
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email"
                      autoComplete="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      autoComplete="new-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={loading} className="mt-2 bg-blue-600 cursor-pointer">
              {loading ? <div className="flex items-center gap-2"><Loader className="animate-spin" />Creating account...</div> : "Create account"}
            </Button>
          </form>
        </Form>

        <div className="text-sm text-muted-foreground text-center mt-4">
          Already have an account?{" "}
          <Link
            className="text-blue-600 hover:underline font-semibold"
            href="/login"
          >
            Log In
          </Link>
        </div>
      </section>
    </main>
  );
}
