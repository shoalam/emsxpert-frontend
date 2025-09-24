"use client";
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
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Kanban, SquareKanban, UserRoundCog } from "lucide-react";
import { login } from "@/lib/api";
import { LoginResponse } from "@/types/auth";
import Cookies from "js-cookie";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    const { email, password } = values;
    setLoading(true);
    try {
      const res: LoginResponse = await login( email, password );
      // login() already set the in-memory access token and the server set refresh cookie
      // Optionally you can store user info from data.user in your AuthProvider or context
      console.log("Login response:", res);
      if(res){
        alert(res.message || "Login successful");
        Cookies.set("accessToken", res?.accessToken as string, { expires: 1 });
        if(res?.user?.role === "admin"){
          router.push("/dashboard/admin");
        } else if(res?.user?.role === "manager"){
          router.push("/dashboard/manager");
        } else if(res?.user?.role === "employee"){
          router.push("/dashboard/employee");
        }
      }
    } catch (err: any) {
      // parse and show a friendly message
      const serverMsg = err?.body?.message || err?.message || "Login failed";
      alert(serverMsg);
    } finally {
      setLoading(false);
    }
  }


  return (
    <main className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <section className="w-full max-w-md bg-card border border-border rounded-xl p-8 shadow">
        <h3 className="text-xl font-bold text-primary mb-1 text-center flex items-center justify-center gap-2">
          <span className="text-primary-foreground bg-blue-600 rounded p-1">
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512"><path fill="currentColor" fill-rule="evenodd" d="M341.336 117.333c0 41.237-33.43 74.667-74.667 74.667s-74.666-33.43-74.666-74.667s33.429-74.666 74.666-74.666s74.667 33.429 74.667 74.666m-170.667 64c0 29.455-23.878 53.334-53.333 53.334s-53.333-23.879-53.333-53.334S87.88 128 117.336 128s53.333 23.878 53.333 53.333M42.669 320c0-35.346 28.654-64 64-64h21.334c2.578 0 5.122.152 7.621.449c-4.913 12.278-7.624 25.738-7.624 39.852v109.032H42.67zm290.249-64h59.26v22.837a88.8 88.8 0 0 1 28.127 16.267l19.804-11.433l29.629 51.32l-19.793 11.427a89.4 89.4 0 0 1 1.482 16.247a89.4 89.4 0 0 1-1.482 16.247l19.794 11.428l-29.63 51.32l-19.804-11.434a88.8 88.8 0 0 1-28.127 16.266v22.841h-59.26v-22.834a88.8 88.8 0 0 1-28.141-16.268l-19.791 11.426l-29.629-51.32l19.775-11.417a89.4 89.4 0 0 1-1.483-16.255c0-5.552.509-10.985 1.483-16.255l-19.775-11.417l29.63-51.32l19.789 11.426a88.8 88.8 0 0 1 28.142-16.269zm65.175 106.667c0 19.637-15.918 35.556-35.555 35.556s-35.556-15.919-35.556-35.556s15.919-35.555 35.556-35.555s35.555 15.918 35.555 35.555m-248.76-64.001c0-47.128 38.205-85.333 85.334-85.333h64c21.753 0 41.605 8.14 56.677 21.54c-67.284 3.796-120.675 59.56-120.675 127.793c0 14.961 2.567 29.322 7.284 42.667h-92.62z" clip-rule="evenodd" stroke-width="13" stroke="currentColor"/></svg> */}
            <UserRoundCog size={20} />
            </span>
            EMSxpert
        </h3>
        <p className="mb-10 text-gray-400 text-center">
          Enter your credentials to log in to your account
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
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
                      autoComplete="username"
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
                      autoComplete="current-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="mt-2 bg-blue-600 cursor-pointer"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log In"}
            </Button>
          </form>
        </Form>
        <div className="text-sm text-muted-foreground text-center mt-4">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </div>
      </section>
    </main>
  );
}
