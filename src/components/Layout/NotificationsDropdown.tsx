import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  Bell,
  CalendarDays,
  ClipboardCheck,
  HeartHandshake,
  Sparkles,
  Users,
} from "lucide-react";

type NotificationCategory = "event" | "proposal" | "impact" | "community" | "reminder";

type NotificationItem = {
  id: string;
  title: string;
  description: string;
  time: string;
  category: NotificationCategory;
  read?: boolean;
};

const initialNotifications: NotificationItem[] = [
  {
    id: "1",
    title: "Beach Clean-up is filling fast",
    description: "12 new volunteers joined in the last hour. Secure the final spots before the weekend.",
    time: "3m ago",
    category: "event",
    read: false,
  },
  {
    id: "2",
    title: "Proposal milestone unlocked",
    description: "Neighborhood Repair Café reached 50 pre-registrations. Time to coordinate with FixIt NGO.",
    time: "25m ago",
    category: "proposal",
    read: false,
  },
  {
    id: "3",
    title: "Impact streak doubled",
    description: "You have attended two events back-to-back. Keep the streak alive for bonus impact points.",
    time: "2h ago",
    category: "impact",
    read: true,
  },
  {
    id: "4",
    title: "Mentor circle follow-up",
    description: "Four teens left feedback on the Community Coding Night. See who wants to pair next week.",
    time: "6h ago",
    category: "community",
    read: true,
  },
  {
    id: "5",
    title: "Event briefing available",
    description: "Download the checklist for Saturday's Community Garden Revival before heading onsite.",
    time: "Yesterday",
    category: "reminder",
    read: false,
  },
];

const iconMap: Record<NotificationCategory, JSX.Element> = {
  event: <CalendarDays className="h-4 w-4 text-primary" />,
  proposal: <ClipboardCheck className="h-4 w-4 text-emerald-500" />,
  impact: <Sparkles className="h-4 w-4 text-amber-500" />,
  community: <Users className="h-4 w-4 text-sky-500" />,
  reminder: <HeartHandshake className="h-4 w-4 text-rose-500" />,
};

export const NotificationsDropdown = () => {
  const [items, setItems] = useState(initialNotifications);

  const unreadCount = useMemo(() => items.filter((item) => !item.read).length, [items]);

  const markAllRead = () => {
    setItems((previous) => previous.map((item) => ({ ...item, read: true })));
  };

  const toggleRead = (id: string) => {
    setItems((previous) =>
      previous.map((item) => {
        if (item.id !== id) return item;
        return { ...item, read: !item.read };
      }),
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label={unreadCount ? `You have ${unreadCount} unread notifications` : "Notifications"}
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 inline-flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-accent px-[6px] text-[10px] font-semibold text-accent-foreground">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
  <DropdownMenuContent align="end" alignOffset={8} sideOffset={4} className="w-80 p-0 sm:mr-0">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div>
            <p className="text-sm font-semibold text-foreground">Notifications</p>
            <p className="text-xs text-muted-foreground">
              {unreadCount > 0 ? `${unreadCount} new alert${unreadCount > 1 ? "s" : ""}` : "You're all caught up"}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-xs"
            onClick={markAllRead}
            disabled={unreadCount === 0}
          >
            Mark all read
          </Button>
        </div>
        {items.length ? (
          <ScrollArea className="max-h-80">
            <div className="flex flex-col divide-y divide-border/60">
              {items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleRead(item.id)}
                  className={cn(
                    "flex w-full items-start gap-3 px-4 py-3 text-left transition hover:bg-muted/70 focus-visible:outline-none", 
                    !item.read && "bg-emerald-50/80 dark:bg-emerald-900/20",
                  )}
                >
                  <span className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                    {iconMap[item.category]}
                  </span>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium text-foreground">{item.title}</p>
                    <p className="text-xs text-muted-foreground leading-snug">{item.description}</p>
                    <p className="text-[0.65rem] uppercase tracking-wide text-muted-foreground">{item.time}</p>
                  </div>
                  {!item.read && <span className="mt-1 h-2 w-2 rounded-full bg-primary" />}
                </button>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="px-4 py-8 text-center text-sm text-muted-foreground">
            You're all caught up for now.
          </div>
        )}
        <DropdownMenuSeparator />
        <div className="px-4 py-2 text-center">
          <Button variant="link" size="sm" className="text-xs text-primary">
            View all activity
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
