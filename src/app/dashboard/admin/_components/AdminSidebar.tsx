import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import React from 'react'

export default function AdminSidebar() {
  return (
      <aside className="w-64 bg-card border-r border-border flex flex-col py-6 px-4">
        <div className="mb-8 flex items-center gap-2">
          <span className="font-bold text-xl text-primary">EMSxpert Admin</span>
        </div>
        <nav className="flex flex-col gap-2">
          <Button variant="ghost" className="justify-start w-full">Dashboard</Button>
          <Button variant="ghost" className="justify-start w-full">Users</Button>
          <Button variant="ghost" className="justify-start w-full">Settings</Button>
        </nav>
        <div className="mt-auto flex items-center gap-3 pt-6 border-t border-border">
          <Avatar>
            <AvatarImage src="/admin-avatar.png" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">Admin</div>
            <div className="text-xs text-muted-foreground">admin@emsxpert.com</div>
          </div>
        </div>
      </aside>
  )
}
