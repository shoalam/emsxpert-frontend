import React from 'react'
import { Button } from '../ui/button'
import { Menu } from 'lucide-react'

export default function DashboardHeader() {
    return (
        <header className="h-16 bg-card border-b border-border flex items-center px-6 justify-between">
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                </Button>
                <span className="font-semibold text-lg text-primary">Dashboard</span>
            </div>
            <div>
                {/* Add header actions here */}
            </div>
        </header>
    )
}
