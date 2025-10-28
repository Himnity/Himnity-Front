import { NGOLayout } from "@/components/Layout/NGOLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Activity,
  BarChart3,
  CalendarCheck,
  Download,
  LineChart,
  PieChart,
  Trophy,
  Users,
  ArrowUpRight,
  ClipboardList,
  Target,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const kpis = [
  {
    label: "Total attendees YTD",
    value: "1,248",
    trend: "+18% vs. 2024",
    icon: Users,
  },
  {
    label: "Volunteer retention",
    value: "76%",
    trend: "+6 pts vs. last quarter",
    icon: Trophy,
  },
  {
    label: "Average event rating",
    value: "4.7/5",
    trend: "+0.3 vs. 2024",
    icon: Sparkles,
  },
  {
    label: "Funding impact",
    value: "TND 12K",
    trend: "+12% mobilised",
    icon: TrendingUp,
  },
];

const pipeline = [
  {
    stage: "Live",
    count: 1,
    description: "Currently underway",
  },
  {
    stage: "Scheduled",
    count: 3,
    description: "Launching in the next 30 days",
  },
  {
    stage: "Draft",
    count: 4,
    description: "Ideas shaping up with core teams",
  },
  {
    stage: "Archived",
    count: 42,
    description: "Past events with published impact reports",
  },
];

const attendanceBreakdown = [
  {
    label: "Checked-in attendees",
    percentage: 68,
    supporting: "Average check-in rate across live events",
    tone: "positive" as const,
  },
  {
    label: "Waitlisted volunteers",
    percentage: 24,
    supporting: "Opportunities to expand capacity",
    tone: "warning" as const,
  },
  {
    label: "No-shows",
    percentage: 8,
    supporting: "Follow-up reminders sent post-event",
    tone: "negative" as const,
  },
];

const toneStyles = {
  positive: {
    chip: "bg-emerald-50 text-emerald-700",
    percentage: "text-emerald-600",
    indicator: "bg-emerald-500",
    supporting: "text-emerald-700",
  },
  warning: {
    chip: "bg-amber-50 text-amber-700",
    percentage: "text-amber-600",
    indicator: "bg-amber-500",
    supporting: "text-amber-700",
  },
  negative: {
    chip: "bg-rose-50 text-rose-700",
    percentage: "text-rose-600",
    indicator: "bg-rose-500",
    supporting: "text-rose-700",
  },
} satisfies Record<string, { chip: string; percentage: string; indicator: string; supporting: string }>;

const reportShortcuts = [
  {
    title: "Monthly impact dashboard",
    description: "Full breakdown of engagement, demographic reach, and reward distribution.",
  },
  {
    title: "Volunteer retention report",
    description: "Who keeps showing up, what they join, and personalised appreciation ideas.",
  },
  {
    title: "Event health score",
    description: "Attendance forecasts, logistics readiness, and risk alerts for the next 45 days.",
  },
];

const highlightInsights = [
  {
    title: "Community Garden Revival",
    subtitle: "Live event • 12 mentors on site",
    detail: "92% of day-one slots confirmed. Field lead reports high satisfaction from partners.",
    icon: CalendarCheck,
  },
  {
    title: "Digital Literacy Workshop",
    subtitle: "Scheduled • volunteer pairing in progress",
    detail: "Mentor roster at 75% coverage. Reminder email queued for Friday morning.",
    icon: ClipboardList,
  },
  {
    title: "Beach Cleanup Sprint",
    subtitle: "Completed • impact update",
    detail: "520 kg of waste removed, 312 plastic pieces catalogued. Impact story drafted for newsletter.",
    icon: Target,
  },
];

const NGOAnalytics = () => {
  return (
    <NGOLayout title="Impact Analytics">
      <div className="container space-y-6 px-4 py-6 md:px-0">
        <section className="space-y-4 rounded-3xl border border-border bg-card p-6 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-2">
              <Badge variant="secondary" className="w-fit">Updated 5 min ago</Badge>
              <div className="space-y-1">
                <h1 className="text-2xl font-heading font-semibold text-foreground">Analytics cockpit</h1>
                <p className="text-sm text-muted-foreground">
                  Monitor how your organisation is engaging volunteers, growing impact, and sustaining momentum.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline" className="gap-2">
                <LineChart className="h-4 w-4" /> Compare periods
              </Button>
              <Button className="gap-2 gradient-primary">
                <Download className="h-4 w-4" /> Export full report
              </Button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {kpis.map(({ label, value, trend, icon: Icon }) => (
              <Card key={label} className="card-civic space-y-3 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{label}</span>
                  <span className="rounded-full bg-primary/10 p-2 text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                </div>
                <div className="text-2xl font-bold text-foreground">{value}</div>
                <p className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                  <ArrowUpRight className="h-3 w-3" />
                  {trend}
                </p>
              </Card>
            ))}
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-7">
          <Card className="card-civic space-y-4 p-5 lg:col-span-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-heading font-semibold text-foreground">Event pipeline</h2>
              <Badge variant="outline" className="gap-1 text-xs">
                <Activity className="h-3 w-3" /> Live view
              </Badge>
            </div>
            <div className="space-y-3">
              {pipeline.map(({ stage, count, description }) => (
                <div key={stage} className="flex items-center justify-between rounded-2xl border border-border/70 bg-muted/30 px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{stage}</p>
                    <p className="text-xs text-muted-foreground">{description}</p>
                  </div>
                  <span className="text-xl font-bold text-primary">{count}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="card-civic space-y-4 p-5 lg:col-span-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-heading font-semibold text-foreground">Attendance health</h2>
              <Badge variant="outline" className="gap-1 text-xs">
                <PieChart className="h-3 w-3" /> Rolling 30d
              </Badge>
            </div>
            <div className="space-y-4">
              {attendanceBreakdown.map(({ label, percentage, supporting, tone }) => {
                const palette = toneStyles[tone];
                return (
                  <div key={label} className="space-y-2">
                    <div className="flex items-center justify-between text-sm font-medium text-foreground">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${palette.chip}`}>
                        {label}
                      </span>
                      <span className={`text-sm font-semibold ${palette.percentage}`}>{percentage}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted">
                      <div
                        className={`h-full rounded-full ${palette.indicator}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <p className={`text-xs ${palette.supporting}`}>{supporting}</p>
                  </div>
                );
              })}
            </div>
          </Card>
        </section>

        <section className="grid gap-4 lg:grid-cols-5">
          <Card className="card-civic space-y-4 p-5 lg:col-span-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-heading font-semibold text-foreground">Highlights & follow-ups</h2>
              <Badge variant="outline" className="gap-1 text-xs">
                <BarChart3 className="h-3 w-3" /> Curated insight
              </Badge>
            </div>
            <div className="space-y-4">
              {highlightInsights.map(({ title, subtitle, detail, icon: Icon }) => (
                <div key={title} className="flex items-start gap-3 rounded-2xl border border-border/70 bg-card/60 p-4">
                  <span className="rounded-full bg-primary/10 p-2 text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-foreground">{title}</p>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">{subtitle}</p>
                    <p className="text-sm text-muted-foreground">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="card-civic space-y-4 p-5 lg:col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-heading font-semibold text-foreground">Reports & exports</h2>
              <Badge variant="secondary" className="text-xs">Ready</Badge>
            </div>
            <div className="space-y-3">
              {reportShortcuts.map(({ title, description }) => (
                <div key={title} className="space-y-2 rounded-2xl border border-dashed border-border/70 bg-muted/20 p-3">
                  <p className="text-sm font-semibold text-foreground">{title}</p>
                  <p className="text-xs text-muted-foreground">{description}</p>
                  <Button variant="ghost" size="sm" className="gap-2 px-0 text-primary">
                    <Download className="h-3 w-3" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <Card className="card-civic space-y-4 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-heading font-semibold text-foreground">Engagement timeline</h2>
              <p className="text-xs text-muted-foreground">Week-over-week participation and impact milestones.</p>
            </div>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-3xl border border-border/60 bg-muted/20 p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Week 40</p>
              <p className="text-lg font-semibold text-foreground">Garden Revival</p>
              <p className="text-sm text-muted-foreground">Live event reached 92% attendance capacity with 18 first-time volunteers.</p>
            </div>
            <div className="rounded-3xl border border-border/60 bg-muted/20 p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Week 39</p>
              <p className="text-lg font-semibold text-foreground">Workshop onboarding</p>
              <p className="text-sm text-muted-foreground">Mentor training completed and resource packs sent to participants.</p>
            </div>
            <div className="rounded-3xl border border-border/60 bg-muted/20 p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Week 38</p>
              <p className="text-lg font-semibold text-foreground">Beach cleanup report</p>
              <p className="text-sm text-muted-foreground">Impact summary delivered to partners with before/after visuals shared online.</p>
            </div>
          </div>
        </Card>
      </div>
    </NGOLayout>
  );
};

export default NGOAnalytics;
