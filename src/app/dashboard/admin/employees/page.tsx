'use client';
import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MoreVertical, Eye, Pencil, Trash2 } from "lucide-react";
import { DataTable } from "@/components/ui/DataTable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Employee = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
};

export const columns: ColumnDef<Employee>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 32,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span
        className={
          row.original.status === "Active"
            ? "text-green-600 font-medium"
            : "text-red-600 font-medium"
        }
      >
        {row.original.status}
      </span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost" aria-label="Open actions">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => alert(`Viewing ${row.original.name}`)}>
            <Eye className="w-4 h-4 mr-2" /> View
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => alert(`Editing ${row.original.name}`)}>
            <Pencil className="w-4 h-4 mr-2" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => alert(`Deleting ${row.original.name}`)} className="text-red-600">
            <Trash2 className="w-4 h-4 mr-2" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

// Generate 100 dummy employees for pagination demo
const employees: Employee[] = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `Employee ${i + 1}`,
  email: `employee${i + 1}@emsxpert.com`,
  role: ["Manager", "Responder", "Dispatcher", "Supervisor"][i % 4],
  status: i % 3 === 0 ? "Inactive" : "Active",
}));

export default function EmployeesPage() {
  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-6 text-primary">Employees</h1>
      <DataTable columns={columns} data={employees} totalCount={employees.length} pageSize={10} />
    </div>
  );
}
