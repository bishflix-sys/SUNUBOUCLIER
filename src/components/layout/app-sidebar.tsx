"use client";

import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { navItems } from "@/lib/data";

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="21" viewBox="0 0 900 600" className="rounded-sm">
            <rect width="300" height="600" fill="#00853f"/>
            <rect x="300" width="300" height="600" fill="#fdef42"/>
            <rect x="600" width="300" height="600" fill="#e31b23"/>
            <path d="M450 184.5l-51.42 158.22h161.8l-130.93-97.77L501.42 342.72z" fill="#00853f"/>
          </svg>
          <span className="text-xl font-semibold text-sidebar-foreground">SunuBouclier</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                href={item.href}
                isActive={pathname.startsWith(item.href)}
                tooltip={item.label}
              >
                <item.icon />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="https://placehold.co/40x40.png" alt="@admin" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-semibold text-sm">Admin</span>
            <span className="text-xs text-sidebar-foreground/70">admin@sunubouclier.sn</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
