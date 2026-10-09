"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Home,
  Globe,
  PhoneCall,
  Sparkles,
} from "lucide-react";

import { AnimatedBackground } from "@/components/ui/animated-background";

type AnimatedTabsProps = {
  onShowcaseClick?: () => void;
};

const TABS = [
  {
    label: "Control",
    href: "/admin",
    icon: <LayoutDashboard className="h-[15px] w-[15px]" />,
  },
  {
    label: "Portal",
    href: "/dashboard",
    icon: <Home className="h-[15px] w-[15px]" />,
  },
  {
    label: "Website",
    href: "/",
    icon: <Globe className="h-[15px] w-[15px]" />,
  },
  {
    label: "Contact",
    href: "/contact",
    icon: <PhoneCall className="h-[15px] w-[15px]" />,
  },
];

export function AnimatedTabs({
  onShowcaseClick,
}: AnimatedTabsProps) {
  return (
    <nav className="admin-floating-nav">
      <div className="admin-floating-nav-inner">
        <AnimatedBackground
          defaultValue="Control"
          className="admin-nav-active"
          transition={{
            type: "spring",
            bounce: 0.2,
            duration: 0.3,
          }}
        >
          {TABS.map((tab, index) => {
            if (index === 1 && onShowcaseClick) {
              return (
                <button
                  key="Showcase"
                  type="button"
                  data-id="Showcase"
                  className="admin-nav-item"
                  onClick={onShowcaseClick}
                >
                  <span className="admin-nav-icon">
                    <Sparkles className="h-[15px] w-[15px]" />
                  </span>
                  <span className="admin-nav-label">
                    Showcase
                  </span>
                </button>
              );
            }

            return (
              <Link
                key={tab.label}
                href={tab.href}
                data-id={tab.label}
                className="admin-nav-item"
              >
                <span className="admin-nav-icon">
                  {tab.icon}
                </span>
                <span className="admin-nav-label">
                  {tab.label}
                </span>
              </Link>
            );
          })}
        </AnimatedBackground>
      </div>
    </nav>
  );
}