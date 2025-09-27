import { useState } from "react";
import { AppLayout } from "@/components/Layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  Share2,
  MapPin,
  Users,
  Clock,
  Recycle,
  TreePine,
  Heart,
  Award,
  TrendingUp,
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

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
        title: "Great Beach Cleanup",
        participants: 45,
        outcome: "78kg trash collected",
        beforeImage:
          "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        afterImage:
          "https://images.unsplash.com/photo-1589627762073-9aca94506fa1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        quote: "Amazing to see our beach restored to its natural beauty!",
      },
      {
        id: 2,
        title: "Urban Forest Initiative",
        participants: 67,
        outcome: "89 trees planted",
        beforeImage:
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        afterImage:
          "https://images.unsplash.com/photo-1633975531445-94aa5f8d5a26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        quote: "Building a greener future, one tree at a time.",
      },
      {
        id: 3,
        title: "Community Workshop Series",
        participants: 38,
        outcome: "Skills shared with 200+ people",
        beforeImage:
          "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        afterImage:
          "https://images.unsplash.com/photo-1555069855-e580a9adbf43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        quote: "Knowledge shared is knowledge multiplied!",
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
  const handleExport = () => toast.success(`Exporting ${city} impact report to PDF...`);

  return (
    <AppLayout title="Impact Storybook">
      <div className="space-y-6 pb-20">
        <div className="px-4 pt-6 md:px-6">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Impact Storybook</h1>
              <p className="text-muted-foreground">{month}</p>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <Select value={selectedCity} onValueChange={(value: string) => setSelectedCity(value as typeof selectedCity)}>
                <SelectTrigger className="w-full md:w-56">
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
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-accent text-accent hover:bg-accent/10"
                  onClick={handleShare}
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
                <Button
                  size="sm"
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                  onClick={handleExport}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export PDF
                </Button>
              </div>
            </div>
          </div>

          <Card className="overflow-hidden border-accent/30 bg-gradient-to-r from-accent/20 to-accent/10">
            <CardContent className="p-0">
              <div className="relative flex h-32 items-center justify-center bg-gradient-to-r from-accent to-accent/80">
                <div className="text-center text-accent-foreground">
                  <h2 className="text-2xl font-bold">{city} Civic Impact</h2>
                  <p className="text-accent-foreground/80">{month}</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="px-4 md:px-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Key Impact Metrics</h2>
            <Button variant="outline" size="sm" className="text-xs">
              Show All
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <Card className="border-border bg-card">
              <CardContent className="px-4 pb-4 pt-4 text-center">
                <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
                  <Users className="h-5 w-5" />
                </div>
                <div className="text-xl font-bold text-foreground">{metrics.totalParticipants}</div>
                <div className="text-sm text-muted-foreground">Total Participants</div>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="px-4 pb-4 pt-4 text-center">
                <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/20 text-purple-400">
                  <Clock className="h-5 w-5" />
                </div>
                <div className="text-xl font-bold text-foreground">{metrics.volunteerHours}</div>
                <div className="text-sm text-muted-foreground">Volunteer Hours</div>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="px-4 pb-4 pt-4 text-center">
                <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20 text-green-400">
                  <Recycle className="h-5 w-5" />
                </div>
                <div className="text-xl font-bold text-foreground">{metrics.kgTrashCollected}kg</div>
                <div className="text-sm text-muted-foreground">Trash Collected</div>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="px-4 pb-4 pt-4 text-center">
                <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/20 text-orange-400">
                  <TreePine className="h-5 w-5" />
                </div>
                <div className="text-xl font-bold text-foreground">{metrics.treesPlanted}</div>
                <div className="text-sm text-muted-foreground">Trees Planted</div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="px-4 md:px-6">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Spotlight Events</h2>
          <div className="space-y-6">
            {events.map((event) => (
              <Card key={event.id} className="border-border bg-card">
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
                        className="h-24 w-full rounded-lg object-cover"
                      />
                    </div>
                    <div>
                      <p className="mb-2 text-sm text-muted-foreground">After</p>
                      <ImageWithFallback
                        src={event.afterImage}
                        alt={`${event.title} after`}
                        className="h-24 w-full rounded-lg object-cover"
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

        <div className="px-4 md:px-6">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Hall of Fame</h2>
          <Card className="border-border bg-card">
            <CardHeader className="flex items-center gap-2 p-4 pb-0">
              <Award className="h-5 w-5 text-accent" />
              <CardTitle className="text-base text-foreground">Top Organizers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-4 pt-4">
              {organizers.map((organizer, index) => (
                <div key={organizer.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-sm ${
                        medalStyles[index] ?? medalStyles[2]
                      }`}
                    >
                      {medalLabels[index] ?? medalLabels[2]}
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{organizer.name}</div>
                      <div className="text-sm text-muted-foreground">{organizer.events} events</div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-accent/20 text-accent">
                    {organizer.hours}h
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="mt-4 border-border bg-card">
            <CardHeader className="flex items-center gap-2 p-4 pb-0">
              <Heart className="h-5 w-5 text-accent" />
              <CardTitle className="text-base text-foreground">Trusted Members</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-4 pt-4">
              {members.map((member, index) => (
                <div key={member.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-sm ${
                        medalStyles[index] ?? medalStyles[2]
                      }`}
                    >
                      {medalLabels[index] ?? medalLabels[2]}
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{member.name}</div>
                      <div className="text-sm text-muted-foreground">{member.attendance} attendance</div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-accent/20 text-accent">
                    {member.points} pts
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="px-4 md:px-6">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Event Locations</h2>
          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex h-40 items-center justify-center rounded-lg bg-secondary">
                <div className="text-center text-muted-foreground">
                  <MapPin className="mx-auto mb-2 h-8 w-8" />
                  <p className="text-sm">Interactive Map Heatmap</p>
                  <p className="text-xs">
                    Showing {metrics.totalEvents} events across {city}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Storybook;
