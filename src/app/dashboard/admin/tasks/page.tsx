'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";

// Define task status type
type TaskStatus = "todo" | "in_progress" | "completed";

// Define Task type
type Task = {
  _id: string;
  project_id: string;
  assigned_to: string;
  title: string;
  status: TaskStatus;
  due_date: string;
  priority: "low" | "medium" | "high";
};

// Mock data (should ideally come from an API or external file)
const mockTasks: Task[] = [
  { _id: "t1", project_id: "p1", assigned_to: "u2", title: "Create login page", status: "todo", due_date: "2025-09-20", priority: "high" },
  { _id: "t2", project_id: "p1", assigned_to: "u3", title: "Design dashboard cards", status: "in_progress", due_date: "2025-09-25", priority: "medium" },
  { _id: "t3", project_id: "p2", assigned_to: "u1", title: "Setup payroll DB schema", status: "todo", due_date: "2025-09-30", priority: "high" },
  { _id: "t4", project_id: "p1", assigned_to: "u2", title: "Integrate auth", status: "completed", due_date: "2025-09-10", priority: "low" },
];

export default function TasksPage() {
  const statuses: TaskStatus[] = ["todo", "in_progress", "completed"];
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  function moveTask({ id, toStatus }: { id: string; toStatus: TaskStatus }): void {
    setTasks((prev) =>
      prev.map((t) =>
        t._id === id ? { ...t, status: toStatus } : t
      )
    );
    // TODO: call API to update task status
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Tasks</h3>
        <div className="flex gap-2">
          <Button size="sm">List View</Button>
          <Button size="sm">Board View</Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {statuses.map((status) => (
          <div key={status} className="bg-slate-50 p-2 rounded">
            <div className="font-semibold mb-2">{status.toUpperCase()}</div>
            <div className="space-y-2">
              {tasks
                .filter((t) => t.status === status)
                .map((t) => (
                  <div key={t._id} className="p-3 bg-white border rounded-md">
                    <div className="flex justify-between">
                      <div>
                        <div className="font-medium">{t.title}</div>
                        <div className="text-xs text-slate-500">
                          Due {t.due_date}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="text-xs">{t.priority}</div>
                        <div className="flex gap-1">
                          {statuses
                            .filter((s) => s !== status)
                            .map((s) => (
                              <button
                                key={s}
                                onClick={() => moveTask({ id: t._id, toStatus: s })}
                                className="text-xs px-2 py-1 border rounded"
                              >
                                Move to {s}
                              </button>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
