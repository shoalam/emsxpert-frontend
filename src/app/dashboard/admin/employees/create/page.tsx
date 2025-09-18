"use client";

import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Calendar } from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

/**
 * Zod schema
 */
const phoneRegex = /^\+?[0-9\s\-]{7,15}$/;

const createEmployeeSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(phoneRegex, "Invalid phone number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  dob: z.string().optional().nullable(), // ISO date string (YYYY-MM-DD)
  department: z.string().min(1, "Department is required"),
  userId: z.string().min(1, "User ID is required"),
  status: z.enum(["active", "inactive", "terminated"]).default("active"),
  hiringDate: z.string().min(1, "Hiring date is required"),
  description: z.string().optional().nullable(),
  emergencyContactName: z.string().optional().nullable(),
  emergencyContactPhone: z
    .string()
    .optional()
    .nullable()
    .refine((v) => !v || phoneRegex.test(v), {
      message: "Invalid emergency contact phone",
    }),
});

import type { Control, SubmitHandler, Resolver } from "react-hook-form";

type CreateEmployeeInput = z.infer<typeof createEmployeeSchema>;

export default function CreateEmployeeForm({ onCreated }: { onCreated?: (data: any) => void }) {
  const form = useForm<CreateEmployeeInput>({
    resolver: zodResolver(createEmployeeSchema) as unknown as Resolver<CreateEmployeeInput, any>,
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      dob: "",
      department: "",
      userId: "",
      status: "active",
      hiringDate: "",
      description: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
    },
  });

  // Image state
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setSubmitError(null);

    if (!file) return;

    // Validate basic type/size
    if (!file.type.startsWith("image/")) {
      setSubmitError("Please upload a valid image file (jpg/png).");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setSubmitError("Image must be smaller than 5MB.");
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => setImagePreview(String(reader.result));
    reader.readAsDataURL(file);
  }

  function removeImage() {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  const onSubmit: SubmitHandler<CreateEmployeeInput> = async (values) => {
    console.log(values);
    setSubmitError(null);
    setSubmitSuccess(null);

    try {
      // Build FormData to include image if present
      const fd = new FormData();
      fd.append("firstName", values.firstName);
      fd.append("lastName", values.lastName);
      fd.append("email", values.email);
      fd.append("phone", values.phone);
      fd.append("password", values.password);
      if (values.dob) fd.append("dob", values.dob);
      fd.append("department", values.department);
      fd.append("userId", values.userId);
      fd.append("status", values.status);
      fd.append("hiringDate", values.hiringDate);
      if (values.description) fd.append("description", values.description);
      if (values.emergencyContactName) fd.append("emergencyContactName", values.emergencyContactName);
      if (values.emergencyContactPhone) fd.append("emergencyContactPhone", values.emergencyContactPhone as string);
      if (imageFile) fd.append("image", imageFile);

      // Replace endpoint with your backend API route
      const res = await fetch("/api/employees", {
        method: "POST",
        body: fd,
      });

      if (!res.ok) {
        // Attempt to parse error body
        let msg = `Failed to create employee (${res.status})`;
        try {
          const body = await res.json();
          msg = body?.message || msg;
        } catch {
          /* ignore */
        }
        setSubmitError(msg);
        return;
      }

      const data = await res.json();
      setSubmitSuccess("Employee created successfully.");
      form.reset();
      removeImage();
      if (onCreated) onCreated(data);
    } catch (err) {
      console.error(err);
      setSubmitError("Network error. Please try again.");
    }
  };

  return (
    <Card className="max-w-[1000px] mx-auto shadow">
      <CardHeader>
        <CardTitle>Create Employee</CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              {/* Image column */}
              <div className="flex flex-col items-center gap-4 p-4 rounded bg-slate-50">
                <div className="w-32 h-32">
                  {imagePreview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={imagePreview} alt="preview" className="w-32 h-32 rounded-full object-cover border" />
                  ) : (
                    <Avatar className="w-32 h-32">
                      <AvatarFallback className="text-2xl">E</AvatarFallback>
                    </Avatar>
                  )}
                </div>

                <div className="text-sm text-slate-600 text-center">Profile image (jpg/png, &lt;5MB)</div>

                <div className="flex gap-2">
                  <input
                    ref={fileInputRef}
                    id="employee-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    onClick={() => fileInputRef.current && fileInputRef.current.click()}
                    className="px-3 py-1"
                  >
                    Upload
                  </Button>

                  {imagePreview && (
                    <Button type="button" variant="outline" onClick={removeImage} className="px-3 py-1">
                      Remove
                    </Button>
                  )}
                </div>

                {submitError && <div className="text-xs text-red-600 mt-1">{submitError}</div>}
              </div>

              {/* Fields column */}
              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control as unknown as Control<CreateEmployeeInput>}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="First name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control as unknown as Control<CreateEmployeeInput>}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Last name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control as unknown as Control<CreateEmployeeInput>}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="email@company.com" type="email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control as unknown as Control<CreateEmployeeInput>}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="+8801XXXXXXXXX" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control as unknown as Control<CreateEmployeeInput>}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Strong password" type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control as unknown as Control<CreateEmployeeInput>}
                  name="dob"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input {...field} type="date" value={field.value ?? ""} // ensure string
    onChange={(e) => field.onChange(e.target.value)}
 />
                        </FormControl>
                        <span className="absolute right-3 top-2 text-slate-400">
                          <Calendar className="w-4 h-4" />
                        </span>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control as unknown as Control<CreateEmployeeInput>}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Engineering" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control as unknown as Control<CreateEmployeeInput>}
                  name="userId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>User ID</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g. tuhin.alom" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control as unknown as Control<CreateEmployeeInput>}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <Select onValueChange={(v) => field.onChange(v)} value={field.value}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                            <SelectItem value="terminated">Terminated</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control as unknown as Control<CreateEmployeeInput>}
                  name="hiringDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hiring Date</FormLabel>
                      <FormControl>
                        <Input {...field} type="date" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Emergency & description */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control as unknown as Control<CreateEmployeeInput>}
                name="emergencyContactName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Emergency Contact Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Full name" value={field.value ?? ""} // ensure string
    onChange={(e) => field.onChange(e.target.value)}
 />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control as unknown as Control<CreateEmployeeInput>}
                name="emergencyContactPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Emergency Contact Phone</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="+8801XXXXXXXXX" value={field.value ?? ""} // ensure string
    onChange={(e) => field.onChange(e.target.value)}
 />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control as unknown as Control<CreateEmployeeInput>}
                name="description"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Short bio, role summary or notes..." value={field.value ?? ""} // ensure string
    onChange={(e) => field.onChange(e.target.value)}
 />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Submit */}
            <div className="flex items-center justify-between gap-4">
              <div>
                {submitError && <div className="text-sm text-red-600">{submitError}</div>}
                {submitSuccess && <div className="text-sm text-green-600">{submitSuccess}</div>}
              </div>

              <div className="flex items-center gap-3">
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Creating..." : "Create Employee"}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    form.reset();
                    removeImage();
                    setSubmitError(null);
                    setSubmitSuccess(null);
                  }}
                >
                  Reset
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
