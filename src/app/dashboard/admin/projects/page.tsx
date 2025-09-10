import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

const mockProjects = [
  {
    _id: "p1",
    name: "Employee Portal Redesign",
    manager_id: "u1",
    status: "active",
    start_date: "2025-09-01",
    end_date: "2025-12-31",
  },
  {
    _id: "p2",
    name: "Payroll Engine v1",
    manager_id: "u1",
    status: "active",
    start_date: "2025-08-01",
    end_date: "2025-11-30",
  },
];
export default function ProjectsPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Projects</h3>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {mockProjects.map((p) => (
          <Card key={p._id}>
            <CardHeader>
              <CardTitle>{p.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-slate-600">
                Manager: {p.manager_id}
              </div>
              <div className="text-sm text-slate-600">
                Dates: {p.start_date} → {p.end_date}
              </div>
              <div className="mt-3">
                <Button variant="ghost" size="sm">
                  Open
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
