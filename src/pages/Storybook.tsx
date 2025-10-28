import { useState } from "react";
import { AppLayout } from "@/components/Layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Share2,
  MapPin,
  Users,
  Clock,
  Recycle,
  TreePine,
  Heart,
  Award,
  TrendingUp,
  Leaf,
  Sparkles,
  CalendarDays,
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import TunisiaMap from "@/assets/Tunisia.png";
import StorybookVideo from "@/assets/storybook.mp4";

const impactReports = [
  {
    city: "Sousse",
    month: "September 2024",
    metrics: {
      totalEvents: 24,
      totalParticipants: 342,
      volunteerHours: 1248,
      kgTrashCollected: 156,
      treesPlanted: 89,
      awarenessReached: 2500,
    },
    events: [
      {
        id: 1,
        title: "Marsa Beach Cleanup",
        participants: 45,
        outcome: "28kg trash collected",
        beforeImage:
          "https://images.unsplash.com/photo-1759240168070-a6ebd35a10f0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
        afterImage:
          "https://images.unsplash.com/photo-1707148280377-6b161bd266e1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1329",
        quote: "Amazing to see our beach restored to its natural beauty!",
      },
      {
        id: 2,
        title: "Madfoun Forest Initiative",
        participants: 67,
        outcome: "89 trees planted",
        beforeImage:
          "https://images.unsplash.com/photo-1586400792375-d6b8f82db2e6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1171",
        afterImage:
          "https://plus.unsplash.com/premium_photo-1681140561074-6efce711739c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
        quote: "Building a greener future, one tree at a time.",
      },
      {
        id: 3,
        title: "Community Fix Series - Sousse",
        participants: 38,
        outcome: "Skills shared with 200+ people",
        beforeImage:
          "https://plus.unsplash.com/premium_photo-1671456124505-697754dcfd0e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1360",
        afterImage:
          "https://images.unsplash.com/photo-1751666526244-40239a251eae?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
        quote: "Event of the week: Sousse School renovation",
      },
    ],
    organizers: [
      { name: "Green Earth NGO", events: 8, hours: 340 },
      { name: "Sarah Mitchell", events: 5, hours: 156 },
      { name: "Urban Farmers Collective", events: 4, hours: 128 },
    ],
    members: [
      { name: "Alex Kumar", points: 2156, attendance: "95%" },
      { name: "Maria Santos", points: 1934, attendance: "92%" },
      { name: "Jordan Lee", points: 1723, attendance: "88%" },
    ],
  },
  {
    city: "Tunis",
    month: "September 2024",
    metrics: {
      totalEvents: 18,
      totalParticipants: 287,
      volunteerHours: 1034,
      kgTrashCollected: 112,
      treesPlanted: 56,
      awarenessReached: 3100,
    },
    events: [
      {
        id: 1,
        title: "Medina Heritage Cleanup",
        participants: 52,
        outcome: "64kg trash collected",
        beforeImage:
          "https://images.unsplash.com/photo-1542822038-3c89b6ef7e90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        afterImage:
          "https://images.unsplash.com/photo-1524499982521-1ffd58dd89ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        quote: "Our historic alleys are shining again.",
      },
      {
        id: 2,
        title: "Smart Mobility Day",
        participants: 61,
        outcome: "200 residents tested eco-friendly transit",
        beforeImage:
          "https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        afterImage:
          "https://images.unsplash.com/photo-1517048676732-d65bc937f952?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        quote: "People are excited to rethink their daily commute.",
      },
      {
        id: 3,
        title: "Lac de Tunis Tree Planting",
        participants: 43,
        outcome: "56 shoreline trees planted",
        beforeImage:
          "https://images.unsplash.com/photo-1473073899705-59bfbc8177e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        afterImage:
          "https://images.unsplash.com/photo-1521791136064-7986c2920216?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        quote: "A greener waterfront for everyone to enjoy.",
      },
    ],
    organizers: [
      { name: "Medina Youth Council", events: 6, hours: 228 },
      { name: "Amal Ben Youssef", events: 4, hours: 164 },
      { name: "Transit Innovators", events: 3, hours: 120 },
    ],
    members: [
      { name: "Layla Gharbi", points: 1980, attendance: "91%" },
      { name: "Karim Haddad", points: 1765, attendance: "87%" },
      { name: "Mouna Trabelsi", points: 1698, attendance: "89%" },
    ],
  },
  {
    city: "Monastir",
    month: "September 2024",
    metrics: {
      totalEvents: 14,
      totalParticipants: 204,
      volunteerHours: 786,
      kgTrashCollected: 94,
      treesPlanted: 42,
      awarenessReached: 1850,
    },
    events: [
      {
        id: 1,
        title: "Marina Plastic Sweep",
        participants: 34,
        outcome: "41kg plastic removed",
        beforeImage:
          "https://images.unsplash.com/photo-1508182311256-e3f7d50c71f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        afterImage:
          "https://images.unsplash.com/photo-1533117404764-2040465121d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        quote: "Visitors noticed the difference immediately.",
      },
      {
        id: 2,
        title: "Coastal Dune Restoration",
        participants: 58,
        outcome: "800 sqm dunes restored",
        beforeImage:
          "https://images.unsplash.com/photo-1526481280695-3c469368018b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        afterImage:
          "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        quote: "Protecting our coastline is protecting our future.",
      },
      {
        id: 3,
        title: "Makerspace Youth Labs",
        participants: 47,
        outcome: "120 prototypes built & showcased",
        beforeImage:
          "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        afterImage:
          "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        quote: "Young innovators are powering Monastir's tech scene.",
      },
    ],
    organizers: [
      { name: "Blue Coast Collective", events: 5, hours: 210 },
      { name: "Hana Amara", events: 4, hours: 152 },
      { name: "Monastir Makers Hub", events: 3, hours: 118 },
    ],
    members: [
      { name: "Omar Mezri", points: 1820, attendance: "90%" },
      { name: "Selma Ferchichi", points: 1714, attendance: "86%" },
      { name: "Yusef Khelifi", points: 1602, attendance: "84%" },
    ],
  },
] as const;

const fallbackImage =
  "https://images.unsplash.com/photo-1523942839745-7848d4b0464f?auto=format&fit=crop&w=800&q=80";

const medalStyles = [
  "bg-yellow-500/20 text-yellow-500",
  "bg-gray-400/20 text-gray-400",
  "bg-orange-500/20 text-orange-500",
];

const medalLabels = ["1st", "2nd", "3rd"];

type TunisiaHeatmapProps = {
  activeCity: string;
  totalEvents: number;
  treesPlanted: number;
};

type BaseHotspot = {
  name: string;
  top: string;
  left: string;
  impactScore: number;
  forestCover: number;
};

const tunisiaBaseHotspots: readonly BaseHotspot[] = [
  { name: "Tunis", top: "18%", left: "49%", impactScore: 28, forestCover: 180 },
  { name: "Bizerte", top: "10%", left: "43%", impactScore: 18, forestCover: 140 },
  { name: "Beja", top: "24%", left: "39%", impactScore: 14, forestCover: 118 },
  { name: "Kairouan", top: "46%", left: "51%", impactScore: 16, forestCover: 104 },
  { name: "Sousse", top: "49%", left: "60%", impactScore: 21, forestCover: 126 },
  { name: "Monastir", top: "55%", left: "63%", impactScore: 17, forestCover: 112 },
  { name: "Sfax", top: "70%", left: "63%", impactScore: 15, forestCover: 96 },
  { name: "Gabes", top: "79%", left: "58%", impactScore: 13, forestCover: 84 },
  { name: "Gafsa", top: "63%", left: "44%", impactScore: 13, forestCover: 92 },
  { name: "Tozeur", top: "75%", left: "37%", impactScore: 11, forestCover: 72 },
] as const;

const TunisiaHeatmap = ({ activeCity, totalEvents, treesPlanted }: TunisiaHeatmapProps) => {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="w-full h-56 md:h-64 lg:h-72 overflow-hidden rounded-xl border border-border bg-card">
        <img
          src={TunisiaMap}
          alt="Tunisia heatmap"
          className="h-full w-full object-contain"
          loading="eager"
          decoding="async"
        />
      </div>
    </div>
  );
};


type ImageProps = {
  src: string;
  alt: string;
  className?: string;
};

const ImageWithFallback = ({ src, alt, className }: ImageProps) => {
  const [currentSrc, setCurrentSrc] = useState(src);

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => setCurrentSrc(fallbackImage)}
    />
  );
};

const Storybook = () => {
  const [selectedCity, setSelectedCity] = useState(impactReports[0].city);

  const activeReport =
    impactReports.find((report) => report.city === selectedCity) ?? impactReports[0];

  const { city, month, metrics, events, organizers, members } = activeReport;

  const handleShare = () => toast.success(`${city} impact report ready to share!`);

  return (
    <AppLayout title="Storybook">
      <div className="space-y-8 pb-24">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-none bg-gradient-to-br from-amber-50 via-emerald-50 to-teal-100 px-4 pt-10 pb-14 md:px-6">
          {/* subtle floating leaves */}
          <Leaf className="absolute left-6 top-8 h-6 w-6 text-emerald-400/40 animate-pulse" />
          <Leaf className="absolute right-10 top-14 h-8 w-8 text-emerald-500/30 animate-pulse" />
          <Leaf className="absolute left-1/2 bottom-6 h-5 w-5 -translate-x-1/2 text-emerald-400/40 animate-pulse" />
          <div className="relative mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">By us, For us</p>
            <h1 className="mt-2 bg-gradient-to-r from-emerald-700 to-emerald-500 bg-clip-text text-3xl font-heading font-extrabold text-transparent md:text-4xl">
              A Story of Impact and Unity
            </h1>
            <p className="mt-3 text-sm text-emerald-900/70">
              A dive into this month's impact
            </p>
            <div className="mt-5 flex flex-col items-center justify-center gap-3 md:flex-row md:gap-4">
              <Select value={selectedCity} onValueChange={(value: string) => setSelectedCity(value as typeof selectedCity)}>
                <SelectTrigger className="w-56">
                  <SelectValue placeholder="Choose a region" />
                </SelectTrigger>
                <SelectContent>
                  {impactReports.map((report) => (
                    <SelectItem key={report.city} value={report.city}>
                      {report.city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="sm"
                className="border-emerald-500 text-emerald-700 hover:bg-emerald-500/10"
                onClick={handleShare}
              >
                <Share2 className="mr-2 h-4 w-4" /> Share {city}
              </Button>
            </div>
          </div>
        </section>

        <div className="px-4 md:px-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Highlights & Achievements</h2>
          </div>
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
            <Card className="border-border bg-card">
              <CardContent className="px-4 pb-4 pt-4 text-center">
                <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div className="text-xl font-bold text-foreground">1,200+</div>
                <div className="text-sm text-muted-foreground">Ideas Proposed</div>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="px-4 pb-4 pt-4 text-center">
                <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                  <Users className="h-5 w-5" />
                </div>
                <div className="text-xl font-bold text-foreground">700+</div>
                <div className="text-sm text-muted-foreground">Active Volunteers</div>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="px-4 pb-4 pt-4 text-center">
                <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="text-xl font-bold text-foreground">60+</div>
                <div className="text-sm text-muted-foreground">Communities Impacted</div>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="px-4 pb-4 pt-4 text-center">
                <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                  <Award className="h-5 w-5" />
                </div>
                <div className="text-xl font-bold text-foreground">25</div>
                <div className="text-sm text-muted-foreground">NGOs Partnered</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Month's Summary */}
        <div className="px-4 md:px-6">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Month's Summary</h2>
          <Card className="border-border bg-card">
            <CardContent className="p-4 md:p-5">
              <div className="mx-auto w-full max-w-2xl">
                <div className="h-56 md:h-64 lg:h-72 overflow-hidden rounded-xl border border-border bg-muted/10">
                  <video
                    src={StorybookVideo}
                    controls
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Impact Stories */}
        <div className="px-4 md:px-6">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Notable Mentions</h2>
          <div className="space-y-6">
            {events.map((event) => (
              <Card key={event.id} className="border-border bg-card/80 backdrop-blur">
                <CardHeader className="p-4 pb-0">
                  <CardTitle className="text-lg text-foreground">{event.title}</CardTitle>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{event.participants} participants</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" />
                      <span>{event.outcome}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 p-4 pt-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="mb-2 text-sm text-muted-foreground">Before</p>
                      <ImageWithFallback
                        src={event.beforeImage}
                        alt={`${event.title} before`}
                        className="h-40 md:h-48 lg:h-56 w-full rounded-xl object-cover my-2"
                      />
                    </div>
                    <div>
                      <p className="mb-2 text-sm text-muted-foreground">After</p>
                      <ImageWithFallback
                        src={event.afterImage}
                        alt={`${event.title} after`}
                        className="h-40 md:h-48 lg:h-56 w-full rounded-xl object-cover my-2"
                      />
                    </div>
                  </div>
                  <blockquote className="border-l-4 border-accent pl-4 italic text-muted-foreground">
                    "{event.quote}"
                  </blockquote>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Notable Contributions section removed per request */}

        <div className="px-4 md:px-6">
          <h2 className="mb-1 text-lg font-semibold text-foreground">Impact Across Regions</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Interactive map — click a city to explore.
          </p>
          <Card className="border-border bg-card">
            <CardContent className="p-4 md:p-5">
              <TunisiaHeatmap
                activeCity={city}
                totalEvents={metrics.totalEvents}
                treesPlanted={metrics.treesPlanted}
              />
              <div className="mt-4 grid gap-3 text-xs text-muted-foreground sm:grid-cols-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-emerald-500" />
                  <span>Tunisia</span>
                </div>
                <div className="flex items-center gap-2">
                  <TreePine className="h-4 w-4 text-emerald-500" />
                  <span>1 tree = 1 event</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Closing CTA — Polished split choices */}
        <section className="px-4 pb-8 md:px-6">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card/80 p-5 backdrop-blur">
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-emerald-400/20 blur-3xl" />
            <div className="pointer-events-none absolute -left-16 bottom-0 h-40 w-40 rounded-full bg-amber-300/20 blur-3xl" />

            <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
              {/* Propose */}
              <div className="relative overflow-hidden rounded-xl border border-border/60 bg-gradient-to-br from-emerald-50 to-white p-5">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 ring-2 ring-emerald-300/60">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div className="text-base font-heading font-semibold text-foreground">Propose a New Idea</div>
                </div>
                <p className="text-sm text-muted-foreground">Got a spark? Share it with us to be included in the next Storybook.</p>
                <div className="mt-4">
                  <Button onClick={() => (window.location.href = "/events?tab=proposed")} className="gradient-gamification text-white">
                    Share your experience
                  </Button>
                </div>
              </div>

              {/* Join */}
              <div className="relative overflow-hidden rounded-xl border border-border/60 bg-gradient-to-br from-amber-50 to-white p-5">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-700 ring-2 ring-amber-300/60">
                    <CalendarDays className="h-5 w-5" />
                  </div>
                  <div className="text-base font-heading font-semibold text-foreground">Join an Upcoming Event</div>
                </div>
                <p className="text-sm text-muted-foreground">A unique blend of experiences: Discover Storybook library</p>
                <div className="mt-4">
                  <Button variant="outline" onClick={() => (window.location.href = "/events?tab=upcoming")} className="border-emerald-300/60 text-foreground hover:bg-emerald-50">
                    Browse past Storybooks
                  </Button>
                </div>
              </div>
            </div>

            {/* Quote */}
            <div className="mx-auto mt-6 max-w-2xl text-center">
              <p className="text-sm font-heading text-foreground/90">“Every event is a page in our shared story. Let’s write the next one — together.”</p>
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
};

export default Storybook;
