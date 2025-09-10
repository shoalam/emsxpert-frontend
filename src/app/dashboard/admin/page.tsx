import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react'
import ClockCard from './_components/ClockCard';

const mockTasks = [
  { _id: "t1", project_id: "p1", assigned_to: "u2", title: "Create login page", status: "todo", due_date: "2025-09-20", priority: "high" },
  { _id: "t2", project_id: "p1", assigned_to: "u3", title: "Design dashboard cards", status: "in_progress", due_date: "2025-09-25", priority: "medium" },
  { _id: "t3", project_id: "p2", assigned_to: "u1", title: "Setup payroll DB schema", status: "todo", due_date: "2025-09-30", priority: "high" },
  { _id: "t4", project_id: "p1", assigned_to: "u2", title: "Integrate auth", status: "completed", due_date: "2025-09-10", priority: "low" },
];

const mockProjects = [
  { _id: "p1", name: "Employee Portal Redesign", manager_id: "u1", status: "active", start_date: "2025-09-01", end_date: "2025-12-31" },
  { _id: "p2", name: "Payroll Engine v1", manager_id: "u1", status: "active", start_date: "2025-08-01", end_date: "2025-11-30" },
];

export default function AdminDashboardHome() {
  const totalEmployees = 24; // placeholder
  const presentToday = 18;
  const ongoingProjects = mockProjects.length;
  const pendingTasks = mockTasks.filter(t => t.status !== 'completed').length;


  return (

    <div className="p-6 space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEmployees}</div>
          </CardContent>
        </Card>


        <Card>
          <CardHeader>
            <CardTitle>Present Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{presentToday}</div>
          </CardContent>
        </Card>


        <Card>
          <CardHeader>
            <CardTitle>Ongoing Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ongoingProjects}</div>
          </CardContent>
        </Card>


        <Card>
          <CardHeader>
            <CardTitle>Pending Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingTasks}</div>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>My Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {mockTasks.slice(0, 5).map(t => (
                <li key={t._id} className="p-3 border rounded-md flex justify-between items-center">
                  <div>
                    <div className="font-medium">{t.title}</div>
                    <div className="text-xs text-slate-500">Due: {t.due_date} • Priority: {t.priority}</div>
                  </div>
                  <div className="text-sm text-slate-600">{t.status}</div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>


        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Clock</CardTitle>
          </CardHeader>
          <CardContent>
            <ClockCard />
          </CardContent>
        </Card>
      </div>
    </div>);
}
