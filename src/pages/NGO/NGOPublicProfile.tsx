import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppLayout } from "@/components/Layout/AppLayout";
import { EventCard } from "@/components/Events/EventCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, Award, CalendarDays, Globe, Heart, Mail, MapPin, Share2, Sparkles, Star, TrendingUp, Users } from "lucide-react";
import { toast } from "sonner";

import heroImage from "@/assets/community-gardens.jpeg";
import digitalLiteracyImage from "@/assets/DigitalLiteracyWorkshop.jpg";
import communityCleanupImage from "@/assets/clean-up-party.jpg";
import { getLastMainRoute, getPreviousMainRoute } from "@/hooks/useNavHistory";

const organizationProfile = {
  name: "Green Future NGO",
  tagline: "Empowering neighborhoods through sustainable action",
  summary:
    "Green Future partners with communities to transform public spaces, educate new youth leaders, and build practical skills around environmental stewardship.",
  focusAreas: ["Environment", "Education", "Community Building"],
  email: "team@greenfuture.ngo",
  phone: "+216 71 123 456",
  website: "www.greenfuture.ngo",
  headquarters: "Avenue Habib Bourguiba, Tunis",
  founded: "2015",
};

const impactHighlights = [
  {
    label: "Events led",
    value: "47",
    icon: TrendingUp,
    tone: "text-primary",
  },
  {
    label: "Neighbors engaged",
    value: "1.2K",
    icon: Users,
    tone: "text-emerald-500",
  },
  {
    label: "Proposals adopted",
    value: "23",
    icon: Award,
    tone: "text-amber-500",
  },
  {
    label: "Impact score",
    value: "4.8",
    icon: Star,
    tone: "text-accent",
  },
];

const initialEvents = [
  {
    id: "garden-revival",
    title: "Community Garden Revival",
    description: "Help neighbors build raised beds, plan irrigation, and launch a shared compost hub.",
    category: "Environment",
    organizer: "Green Future NGO",
    date: "Nov 6 • 9:00 AM",
    location: "Downtown Community Center, Tunis",
    participants: 34,
    maxParticipants: 60,
    rewardPoints: 250,
    likes: 186,
    shares: 32,
    isLiked: false,
    imageUrl: heroImage,
    tags: [
      { label: "Gardening", variant: "skill" as const },
      { label: "Outdoors", variant: "location" as const },
    ],
  },
  {
    id: "digital-mentors",
    title: "Digital Mentors Weekend",
    description: "Pair volunteers with seniors for a two-day smartphone and safety bootcamp.",
    category: "Education",
    organizer: "Green Future NGO",
    date: "Nov 16 • 10:00 AM",
    location: "Municipal Library, Sfax",
    participants: 18,
    maxParticipants: 32,
    rewardPoints: 180,
    likes: 92,
    shares: 17,
    isLiked: false,
    imageUrl: digitalLiteracyImage,
    tags: [
      { label: "Teaching", variant: "activity" as const },
      { label: "Community", variant: "default" as const },
    ],
  },
  {
    id: "coastal-clean",
    title: "Coastal Cleanup Sprint",
    description: "Join a rapid-response crew to keep the La Marsa shoreline ready for families and fishers.",
    category: "Environment",
    organizer: "Green Future NGO",
    date: "Nov 23 • 7:30 AM",
    location: "La Marsa Beach",
    participants: 52,
    maxParticipants: 90,
    rewardPoints: 320,
    likes: 143,
    shares: 28,
    isLiked: false,
    imageUrl: communityCleanupImage,
    tags: [
      { label: "Waste Reduction", variant: "skill" as const },
      { label: "Outdoors", variant: "location" as const },
    ],
  },
];

const communityHighlights = [
  {
    id: "impact-1",
    title: "Neighborhood Composting Coop",
    description:
      "Residents in Bab Bhar diverted 2 tons of organic waste last quarter through a daily compost rota organized by local teens.",
    icon: Sparkles,
  },
  {
    id: "impact-2",
    title: "Youth Eco Leaders",
    description:
      "18 students completed a mentorship track, earning certifications in sustainable design and public speaking.",
    icon: CalendarDays,
  },
  {
    id: "impact-3",
    title: "Green Rooftops Pilot",
    description:
      "Five buildings in downtown Tunis now harvest rainwater and grow herbs that feed nearby soup kitchens.",
    icon: Globe,
  },
];

const volunteerStories = [
  {
    id: "story-1",
    author: "Samar, 22",
    role: "Architecture student",
    message:
      "I joined one Saturday and never left. Green Future gave me my first project lead, and now our rooftop garden feeds 40 families weekly.",
  },
  {
    id: "story-2",
    author: "Imed, 37",
    role: "Cycling advocate",
    message:
      "Their events are prepared down to the last detail. You show up, feel welcomed, and leave with the sense that change is possible.",
  },
];

const NGOPublicProfile = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [events, setEvents] = useState(initialEvents);
  const focusAreas = useMemo(() => organizationProfile.focusAreas, []);
  const previousMainRoute = getPreviousMainRoute();
  const lastMainRoute = getLastMainRoute();
  const fallbackRoute = previousMainRoute ?? lastMainRoute ?? "/events";

  const handleFollow = () => {
    toast.success("You're now following Green Future NGO", {
      description: "We'll keep you updated when new events launch.",
    });
  };

  const handleShareProfile = () => {
    const shareUrl = typeof window !== "undefined" ? window.location.href : `/ngo/${slug ?? "green-future-ngo"}`;
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator
        .share({
          title: `${organizationProfile.name} on Himnity`,
          text: organizationProfile.tagline,
          url: shareUrl,
        })
        .catch(() => {
          /* user dismissed */
        });
      return;
    }

    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        toast.success("Link copied", {
          description: "Share it with a teammate or community channel.",
        });
      });
    }
  };

  const handleJoinEvent = (eventId: string) => {
    toast.success("Join request sent!", {
      description: "The organizer will review your application soon.",
    });
    setEvents((previous) =>
      previous.map((event) =>
        event.id === eventId
          ? { ...event, participants: Math.min(event.maxParticipants, event.participants + 1) }
          : event,
      ),
    );
  };

  const handleEventClick = (eventId: string) => {
    navigate(`/event/${eventId}`);
  };

  const handleToggleLikeEvent = (eventId: string) => {
    setEvents((previous) =>
      previous.map((event) => {
        if (event.id !== eventId) return event;
        const alreadyLiked = event.isLiked ?? false;
        const nextLikes = alreadyLiked ? Math.max(0, (event.likes ?? 0) - 1) : (event.likes ?? 0) + 1;
        return { ...event, likes: nextLikes, isLiked: !alreadyLiked };
      }),
    );
  };

  const handleBackClick = () => {
    navigate(fallbackRoute);
  };

  return (
    <AppLayout title={`${organizationProfile.name} profile`}>
      <div className="space-y-8 px-4 py-6">
        <div className="fixed left-4 top-24 z-50">
          <Button
            variant="secondary"
            size="icon"
            onClick={handleBackClick}
            className="h-11 w-11 rounded-full border border-border/60 bg-card/90 text-foreground shadow-xl backdrop-blur-sm transition hover:-translate-x-0.5 hover:text-primary hover:shadow-2xl"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>
        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-r from-primary/10 via-background to-background p-6 sm:p-8">
          <img
            src={heroImage}
            alt="Community volunteers tending a shared garden"
            className="absolute inset-0 h-full w-full object-cover opacity-10"
          />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-4">
              <Badge variant="secondary" className="bg-white/40 text-primary">
                Community Partner
              </Badge>
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14 border border-white/60">
                  <AvatarFallback className="bg-primary/20 text-primary font-semibold">GF</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-heading font-bold text-foreground sm:text-3xl">
                    {organizationProfile.name}
                  </h1>
                  <p className="text-sm text-muted-foreground sm:text-base">
                    {organizationProfile.tagline}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {focusAreas.map((area) => (
                  <Badge key={area} variant="outline" className="border-dashed">
                    {area}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:items-end">
              <div className="flex w-full gap-2 sm:w-auto">
                <Button onClick={handleFollow} className="flex-1 sm:flex-none sm:px-6">
                  <Heart className="mr-2 h-4 w-4" />
                  Follow
                </Button>
                <Button
                  variant="outline"
                  onClick={handleShareProfile}
                  className="flex-1 border-primary/30 text-primary hover:bg-primary/10 sm:flex-none"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Active since {organizationProfile.founded} • Updates twice a month
              </p>
            </div>
          </div>
        </section>

        {/* Impact Highlights */}
        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {impactHighlights.map(({ label, value, icon: Icon, tone }) => (
            <Card key={label} className="card-civic flex items-center gap-3 p-4">
              <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-muted ${tone}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">{value}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">{label}</p>
              </div>
            </Card>
          ))}
        </section>

        {/* About & Contact */}
        <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="card-civic space-y-4 p-6">
            <h2 className="text-lg font-heading font-semibold text-foreground">About this organization</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">{organizationProfile.summary}</p>
            <div className="rounded-2xl bg-muted/40 p-4">
              <h3 className="text-sm font-semibold text-foreground">Why volunteers love working with us</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                <li>Hands-on roles with clear impact metrics and mentorship</li>
                <li>Rotating leadership pods so every volunteer can grow</li>
                <li>Evidence-based projects with transparent reporting</li>
              </ul>
            </div>
          </Card>
          <Card className="card-civic space-y-4 p-6">
            <h2 className="text-lg font-heading font-semibold text-foreground">Quick contact</h2>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href={`mailto:${organizationProfile.email}`} className="hover:underline">
                  {organizationProfile.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>{organizationProfile.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <a href={`https://${organizationProfile.website}`} target="_blank" rel="noreferrer" className="hover:underline">
                  {organizationProfile.website}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>{organizationProfile.headquarters}</span>
              </div>
            </div>
          </Card>
        </section>

        {/* Upcoming Events */}
        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-heading font-semibold text-foreground">Upcoming events</h2>
              <p className="text-sm text-muted-foreground">
                Join the next opportunity to amplify this NGO's mission.
              </p>
            </div>
            <Button variant="outline" size="sm" className="border-primary/30 text-primary hover:bg-primary/10">
              Browse all events
            </Button>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onJoin={handleJoinEvent}
                onEventClick={handleEventClick}
                onToggleLike={handleToggleLikeEvent}
              />
            ))}
          </div>
        </section>

        {/* Community highlights */}
        <section className="space-y-4">
          <h2 className="text-lg font-heading font-semibold text-foreground">Community highlights</h2>
          <div className="grid gap-4 lg:grid-cols-3">
            {communityHighlights.map(({ id, title, description, icon: Icon }) => (
              <Card key={id} className="card-civic space-y-2 p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3 className="text-sm font-semibold text-foreground">{title}</h3>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">{description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Volunteer voices */}
        <section className="space-y-4">
          <h2 className="text-lg font-heading font-semibold text-foreground">Volunteer voices</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {volunteerStories.map((story) => (
              <Card key={story.id} className="card-civic space-y-3 p-5">
                <p className="text-sm italic text-muted-foreground">“{story.message}”</p>
                <div>
                  <p className="text-sm font-semibold text-foreground">{story.author}</p>
                  <p className="text-xs text-muted-foreground">{story.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </AppLayout>
  );
};

export default NGOPublicProfile;
