import {
  Calendar,
  Circle,
  CircleDollarSign,
  Heart,
  Home,
  Inbox,
  LayoutGrid,
  LucideLockKeyhole,
  PanelsRightBottom,
  PanelsTopLeft,
  Pencil,
  Search,
  Settings,
  ShoppingBag,
  Zap,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Layout from "../layout";

interface MenuItemLink {
  title: string;
  url: string;
  icon: React.ComponentType;
}

interface MenuItem {
  group: string;
  links: MenuItemLink[];
}

// Menu items.
const items: MenuItem[] = [
  {
    group: "",
    links: [
      { title: "Home", url: "/dashboard", icon: Home },
      { title: "View page", url: "/viewpage", icon: PanelsTopLeft },
      { title: "Explore creators", url: "/dashboard/explore", icon: LayoutGrid },
    ],
  },
  {
    group: "Monetize",
    links: [
      { title: "Supporters", url: "/dashboard/supporters", icon: Heart },
      { title: "Membership", url: "/dashboard/membership", icon: LucideLockKeyhole },
      { title: "Shop", url: "/dashboard/shop", icon: ShoppingBag },
      { title: "Publish", url: "/dashboard/publish", icon: Pencil },
    ],
  },
  {
    group: "Settings",
    links: [
      { title: "Buttons & Graphics", url: "/dashboard/buttonsandgraphics", icon: PanelsRightBottom },
      { title: "Integrations", url: "/dashboard/integrations", icon: Zap },
      { title: "Payouts", url: "/dashboard/payouts", icon: CircleDollarSign },
      { title: "Settings", url: "/dashboard/accountsettings", icon: Settings },
    ],
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup className="px-6 py-9 flex flex-col gap-4">
          <SidebarGroupLabel>
            <Image src="/coffee-logo.svg" alt="logo" width={30} height={30} />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item: MenuItem) => (
                <div key={item.group}>
                    <div className="text-gray-400 ">{item.group}</div>
                  {item.links.map((link: MenuItemLink) => (
                    <SidebarMenuItem key={link.title}>
                      <SidebarMenuButton>
                        <div className="flex items-center gap-2 pt-4 pb-3">
                          <a
                            href={link.url}
                            className="flex items-center gap-3"
                          >
                            <link.icon />
                            <span>{link.title}</span>
                          </a>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </div>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
