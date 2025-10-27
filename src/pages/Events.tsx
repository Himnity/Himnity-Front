import { AppLayout } from "@/components/Layout/AppLayout";
import { EventCard } from "@/components/Events/EventCard";
import { ProposalCard } from "@/components/Events/ProposalCard";
import { ProposalFormDialog } from "@/components/Events/ProposalFormDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { Search, Plus, MapPin, Compass, Clock, CalendarDays, Check, ChevronDown, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const initialUpcomingEvents = [
  {
    id: "1",
    title: "Community Garden Revival",
    description: "Help transform an abandoned lot into a thriving community garden for local families.",
    category: "Environment",
    organizer: "Green Future NGO",
    date: "Nov 6 • 9:00 AM",
    location: "Downtown Community Center, Tunis",
    participants: 34,
    maxParticipants: 60,
    rewardPoints: 250,
    likes: 86,
    shares: 24,
    isLiked: false,
    tags: [
      { label: "Physical Activity", variant: "activity" as const },
      { label: "Outdoors", variant: "location" as const },
      { label: "Gardening", variant: "skill" as const }
    ]
  },
  {
    id: "2",
    title: "Digital Literacy Workshop",
    description: "Teach seniors how to use smartphones and stay connected with family online.",
    category: "Education",
    organizer: "TechForAll",
    date: "Nov 11 • 2:00 PM",
    location: "Central Library, Sfax",
    participants: 18,
    maxParticipants: 24,
    rewardPoints: 150,
    likes: 42,
    shares: 11,
    isLiked: false,
    tags: [
      { label: "Teaching", variant: "activity" as const },
      { label: "Indoors", variant: "location" as const },
      { label: "Technology", variant: "skill" as const }
    ]
  },
  {
    id: "3",
    title: "Neighborhood Cleanup Day",
    description: "Join us for a community-wide effort to beautify our streets and parks.",
    category: "Environment",
    organizer: "Clean Streets Initiative",
    date: "Nov 18 • 8:00 AM",
    location: "City Park Main Entrance",
    participants: 45,
    maxParticipants: 100,
    rewardPoints: 200,
    likes: 58,
    shares: 19,
    isLiked: false,
    tags: [
      { label: "Physical Activity", variant: "activity" as const },
      { label: "Outdoors", variant: "location" as const },
      { label: "Community Service", variant: "default" as const }
    ]
  }
];

const proposedEvents = [
  {
    id: "p1",
    title: "Mobile Food Pantry",
    description: "Bring healthy food options to underserved neighborhoods using a mobile distribution system that can reach areas with limited access to fresh groceries.",
    category: "Social Services",
    proposedBy: "Sarah Johnson",
    proposedDate: "Oct 5, 2025",
    preferredTime: "Weekends, Morning",
    likes: 24,
    upvotes: 24,
    isLiked: false,
    preRegistrations: 9,
    supports: 9,
    isPreRegistered: false
  },
  {
    id: "p2", 
    title: "Youth Coding Bootcamp",
    description: "Free coding classes for teenagers to learn web development and prepare for tech careers. Would include mentorship from local developers.",
    category: "Education",
    proposedBy: "Amine Gharbi",
    proposedDate: "Sep 28, 2025", 
    preferredTime: "Weekday afternoons",
    likes: 18,
    upvotes: 18,
    isLiked: true,
    preRegistrations: 6,
    supports: 6,
    isPreRegistered: false
  },
  {
    id: "p3",
    title: "Community Art Mural Project",
    description: "Create a collaborative mural that represents our diverse community, involving local artists and residents of all ages.",
    category: "Arts",
    proposedBy: "Maria Rodriguez",
    proposedDate: "Oct 12, 2025",
    preferredTime: "Weekend, All day",
    likes: 31,
    upvotes: 31,
    isLiked: false,
    preRegistrations: 12,
    supports: 12,
    isPreRegistered: true
  }
];

const tunisianCities = [
  "Sousse",
  "Tunis",
  "Sfax",
  "Bizerte",
  "Nabeul",
  "Monastir",
  "Gabes",
  "Kairouan",
  "Gafsa",
  "Mahdia",
  "Tozeur"
];

const categories = ["All", "Environment", "Education", "Social Services", "Health", "Arts"];

const quickFilters = [
  { id: "for-you", label: "For you", icon: Compass },
  { id: "local", label: "Local", icon: MapPin },
  { id: "this-week", label: "This week", icon: CalendarDays },
  { id: "following", label: "Following", icon: Clock }
];

const Events = () => {
  const navigate = useNavigate();
  const [isProposalDialogOpen, setIsProposalDialogOpen] = useState(false);
  const [upcoming, setUpcoming] = useState(initialUpcomingEvents);
  const [proposals, setProposals] = useState(proposedEvents);
  const [searchParams] = useSearchParams();
  const initialTabParam = searchParams.get("tab");
  const initialTab = initialTabParam === "proposed" ? "proposed" : "upcoming";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [selectedCity, setSelectedCity] = useState(tunisianCities[0]);
  const [locationPopoverOpen, setLocationPopoverOpen] = useState(false);
  const [activeQuickFilters, setActiveQuickFilters] = useState<string[]>(["for-you"]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["All"]);
  const [categoriesPopoverOpen, setCategoriesPopoverOpen] = useState(false);
  const [showCategoryBadges, setShowCategoryBadges] = useState(false);
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);

  const toggleQuickFilter = (id: string) => {
    setActiveQuickFilters((prev) =>
      prev.includes(id) ? prev.filter((filterId) => filterId !== id) : [...prev, id]
    );
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) => {
      if (category === "All") {
        return ["All"];
      }

      const nextWithoutAll = prev.filter((item) => item !== "All");
      const isAlreadySelected = nextWithoutAll.includes(category);
      let updated = isAlreadySelected
        ? nextWithoutAll.filter((item) => item !== category)
        : [...nextWithoutAll, category];

      if (updated.length === 0) {
        updated = ["All"];
      }

      return updated;
    });
  };

  const selectedCategoriesLabel = selectedCategories.includes("All")
    ? "All categories"
    : selectedCategories.join(", ");

  const handleJoinEvent = (eventId: string) => {
    toast.success("Join request sent! You'll be notified when the organizer reviews your request.", {
      description: "Check your profile to see your pending requests."
    });
  };

  const handleEventClick = (eventId: string) => {
    navigate(`/event/${eventId}`);
  };

  const handleToggleLikeEvent = (eventId: string) => {
    setUpcoming((previous) =>
      previous.map((event) => {
        if (event.id !== eventId) return event;
        const alreadyLiked = event.isLiked ?? false;
        const baseLikes = event.likes ?? 0;
        const nextLikes = alreadyLiked ? Math.max(0, baseLikes - 1) : baseLikes + 1;
        return { ...event, likes: nextLikes, isLiked: !alreadyLiked };
      })
    );
  };

  const handleShareEvent = async (event: typeof initialUpcomingEvents[number]) => {
    const isBrowser = typeof window !== "undefined";
    const shareUrl = isBrowser ? `${window.location.origin}/event/${event.id}` : `/event/${event.id}`;
    const payload = {
      title: event.title,
      text: event.description,
      url: shareUrl
    };

    let shared = false;

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(payload);
        toast.success("Shared with your network!", {
          description: "Invite friends and neighbors to join this event."
        });
        shared = true;
      } catch (error) {
        if ((error as DOMException)?.name === "AbortError") {
          return;
        }
      }
    }

    if (!shared && typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        toast.success("Link copied", {
          description: "Paste it anywhere to keep the momentum going."
        });
        shared = true;
      } catch {
        // Ignore and fall through to error state
      }
    }

    if (!shared) {
      toast.error("Unable to share", {
        description: "Try copying the link manually."
      });
      return;
    }

    setUpcoming((previous) =>
      previous.map((item) =>
        item.id === event.id ? { ...item, shares: (item.shares ?? 0) + 1 } : item
      )
    );
  };

  const handleToggleLikeProposal = (proposalId: string) => {
    const current = proposals.find((proposal) => proposal.id === proposalId);
    const wasLiked = current?.isLiked ?? false;

    setProposals((previous) =>
      previous.map((proposal) => {
        if (proposal.id !== proposalId) return proposal;
        const alreadyLiked = proposal.isLiked ?? false;
        const baseLikes = proposal.likes ?? proposal.upvotes ?? 0;
        const nextLikes = alreadyLiked ? Math.max(0, baseLikes - 1) : baseLikes + 1;
        return {
          ...proposal,
          likes: nextLikes,
          upvotes: nextLikes,
          isLiked: !alreadyLiked
        };
      })
    );

    toast.success(wasLiked ? "Support withdrawn" : "Support added", {
      description: wasLiked
        ? "We'll dial back your cheers for this idea."
        : "Thanks for cheering on this proposal!"
    });
  };

  const handleTogglePreRegisterProposal = (proposalId: string) => {
    const current = proposals.find((proposal) => proposal.id === proposalId);
    const wasPreRegistered = current?.isPreRegistered ?? false;

    setProposals((previous) =>
      previous.map((proposal) => {
        if (proposal.id !== proposalId) return proposal;
        const alreadyRegistered = proposal.isPreRegistered ?? false;
        const baseCount = proposal.preRegistrations ?? proposal.supports ?? 0;
        const nextCount = alreadyRegistered ? Math.max(0, baseCount - 1) : baseCount + 1;
        return {
          ...proposal,
          preRegistrations: nextCount,
          supports: nextCount,
          isPreRegistered: !alreadyRegistered
        };
      })
    );

    toast.success(wasPreRegistered ? "Pre-registration canceled" : "Pre-registered", {
      description: wasPreRegistered
        ? "No worries, your spot is freed up for now."
        : "Great! We'll loop you in if the community needs to self-organize."
    });
  };

  const handleProposeEvent = () => {
    setIsProposalDialogOpen(true);
  };

  return (
    <AppLayout>
      <div className="space-y-4 pb-4">
        <div className="sticky top-[4.5rem] z-30 space-y-2 bg-background/95 px-4 py-3 backdrop-blur-md">
          {/* Top row: Search (left) + horizontally scrollable Location + Quick Filters */}
          <div className="flex items-center gap-2">
            {/* Search button on the left */}
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsSearchDialogOpen(true)}
              className="shrink-0 h-10 w-10 rounded-full border border-border/60 bg-muted/40 text-muted-foreground transition hover:text-foreground"
              aria-label="Search events and proposals"
            >
              <Search className="h-4 w-4" />
            </Button>

            {/* Scrollable row containing Location and Quick Filters */}
            <div className="flex-1 flex items-center gap-2 overflow-x-auto pb-1" style={{ msOverflowStyle: "none" }}>
              {/* Location picker (click city name to open list) */}
              <Popover open={locationPopoverOpen} onOpenChange={setLocationPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="shrink-0 flex items-center gap-2 whitespace-nowrap rounded-full border border-border/60 bg-muted/50 px-4 py-2 text-sm font-medium shadow-sm transition hover:bg-muted/70"
                  >
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-primary">{selectedCity}</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Search cities..." />
                    <CommandList>
                      <CommandEmpty>No city found.</CommandEmpty>
                      <CommandGroup heading="Tunisia">
                        {tunisianCities.map((city) => {
                          const isActive = selectedCity === city;
                          return (
                            <CommandItem
                              key={city}
                              value={city}
                              onSelect={() => {
                                setSelectedCity(city);
                                setLocationPopoverOpen(false);
                              }}
                            >
                              <Check className={`mr-2 h-4 w-4 transition ${isActive ? "opacity-100" : "opacity-0"}`} />
                              {city}
                            </CommandItem>
                          );
                        })}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              {/* Quick filters */}
              {quickFilters.map((option) => {
                const Icon = option.icon;
                const isActive = activeQuickFilters.includes(option.id);
                return (
                  <Button
                    key={option.id}
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleQuickFilter(option.id)}
                    className={`shrink-0 rounded-full border border-border/50 px-3 py-2 text-sm font-medium transition hover:shadow ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted/50 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {option.label}
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <Popover open={categoriesPopoverOpen} onOpenChange={setCategoriesPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-full border-dashed px-4 py-2 text-sm font-medium"
                  >
                    Categories ({selectedCategories.includes("All") ? "All" : selectedCategories.length})
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Search categories..." />
                    <CommandList>
                      <CommandEmpty>No category found.</CommandEmpty>
                      <CommandGroup>
                        {categories.map((category) => {
                          const isChecked = selectedCategories.includes(category);
                          return (
                            <CommandItem
                              key={category}
                              value={category}
                              onSelect={() => toggleCategory(category)}
                            >
                              <Check className={`mr-2 h-4 w-4 transition ${isChecked ? "opacity-100" : "opacity-0"}`} />
                              {category}
                            </CommandItem>
                          );
                        })}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                  <div className="flex items-center justify-between border-t border-border/60 p-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8"
                      onClick={() => setSelectedCategories(["All"])}
                    >
                      Clear
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8"
                      onClick={() => setCategoriesPopoverOpen(false)}
                    >
                      Done
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>

              <button
                type="button"
                aria-expanded={showCategoryBadges}
                onClick={() => setShowCategoryBadges((previous) => !previous)}
                className="flex items-center gap-1 rounded-full border border-border/60 bg-muted/50 px-3 py-1 text-xs font-medium uppercase tracking-wide text-muted-foreground transition hover:text-foreground"
              >
                <ChevronDown className={`h-3 w-3 transition-transform ${showCategoryBadges ? "rotate-180" : ""}`} />
                <span className="max-w-[12rem] truncate">{selectedCategoriesLabel}</span>
              </button>
            </div>

            {showCategoryBadges && (
              selectedCategories.includes("All") ? (
                <Badge
                  variant="secondary"
                  className="w-fit rounded-full bg-muted px-3 py-1 text-xs font-medium uppercase tracking-wide"
                >
                  All categories
                </Badge>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {selectedCategories.map((category) => (
                    <Badge
                      key={category}
                      variant="outline"
                      className="rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wide"
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              )
            )}
          </div>
        </div>

        {/* Event Tabs */}
  <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 px-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="proposed">Proposed Ideas</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            <div className="flex items-center justify-start">
              <h2 className="text-lg font-heading font-semibold">
                {upcoming.length} Events Available
              </h2>
            </div>
            {upcoming.map((event) => (
              <EventCard 
                key={event.id} 
                event={event} 
                onJoin={handleJoinEvent} 
                onEventClick={handleEventClick}
                onShare={handleShareEvent}
                onToggleLike={handleToggleLikeEvent}
              />
            ))}
          </TabsContent>

          <TabsContent value="proposed" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-heading font-semibold">
                Community Proposals
              </h2>
              <Button 
                onClick={handleProposeEvent}
                size="sm"
                className="gradient-primary"
              >
                <Plus className="h-4 w-4 mr-2" />
                Propose
              </Button>
            </div>
            <div className="bg-muted/50 p-4 rounded-xl border border-dashed border-border">
              <p className="text-sm text-muted-foreground text-center">
                💡 These are event ideas from community members waiting for NGOs to adopt them
              </p>
            </div>
            {proposals.map((proposal) => (
              <div key={proposal.id} id={`proposal-${proposal.id}`} className="scroll-mt-[7.5rem]">
                <ProposalCard
                  proposal={proposal}
                  onLike={handleToggleLikeProposal}
                  onPreRegister={handleTogglePreRegisterProposal}
                />
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      <CommandDialog open={isSearchDialogOpen} onOpenChange={setIsSearchDialogOpen}>
        <CommandInput placeholder="Search events or proposals..." />
        <CommandList>
          <CommandEmpty>No matches found.</CommandEmpty>
          <CommandGroup heading="Events">
            {upcoming.map((event) => (
              <CommandItem
                key={`search-event-${event.id}`}
                value={event.title}
                onSelect={() => {
                  setIsSearchDialogOpen(false);
                  handleEventClick(event.id);
                }}
              >
                <CalendarDays className="mr-2 h-4 w-4" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{event.title}</span>
                  <span className="text-xs text-muted-foreground">{event.date} • {event.location}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Proposals">
            {proposals.map((proposal) => (
              <CommandItem
                key={`search-proposal-${proposal.id}`}
                value={proposal.title ?? proposal.description}
                onSelect={() => {
                  setIsSearchDialogOpen(false);
                  setActiveTab("proposed");
                  setTimeout(() => {
                    const target = document.getElementById(`proposal-${proposal.id}`);
                    target?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }, 150);
                }}
              >
                <Sparkles className="mr-2 h-4 w-4" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{proposal.title ?? "Community Proposal"}</span>
                  <span className="text-xs text-muted-foreground">Proposed by {proposal.proposedBy}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      {/* Proposal Form Dialog */}
      <ProposalFormDialog 
        open={isProposalDialogOpen} 
        onOpenChange={setIsProposalDialogOpen} 
      />
    </AppLayout>
  );
};

export default Events;
