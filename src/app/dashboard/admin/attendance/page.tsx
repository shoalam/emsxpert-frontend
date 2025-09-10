import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AttendancePage() {
    const mockAttendance = [
        { _id: "a1", user_id: "u2", clock_in: "2025-09-09T09:01:00Z", clock_out: "2025-09-09T18:05:00Z", total_hours: 9.06, status: "present" },
        { _id: "a2", user_id: "u3", clock_in: "2025-09-09T09:15:00Z", clock_out: "2025-09-09T17:45:00Z", total_hours: 8.5, status: "present" },
    ];
    return (
        <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Attendance</h3>
            <Card>
                <CardHeader>
                    <CardTitle>Today</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 gap-3">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="font-medium">Present</div>
                                <div className="text-sm text-slate-500">18 employees</div>
                            </div>
                            <div className="text-sm">View team</div>
                        </div>


                        <div>
                            <h4 className="font-medium mb-2">Recent logs</h4>
                            <ul className="space-y-2">
                                {mockAttendance.map(a => (
                                    <li key={a._id} className="p-2 border rounded-md flex justify-between">
                                        <div>
                                            <div className="font-medium">User {a.user_id}</div>
                                            <div className="text-xs text-slate-500">{new Date(a.clock_in).toLocaleString()} → {new Date(a.clock_out).toLocaleString()}</div>
                                        </div>
                                        <div className="text-sm self-center">{a.total_hours}h</div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
