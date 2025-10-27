import { AppLayout } from "@/components/Layout/AppLayout";
import { EventCard } from "@/components/Events/EventCard";
import { ProposalCard } from "@/components/Events/ProposalCard";
import { ProposalFormDialog } from "@/components/Events/ProposalFormDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Plus } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

// Mock events data
const upcomingEvents = [
  {
    id: "1",
    title: "Community Garden Revival",
    description: "Help transform an abandoned lot into a thriving community garden for local families.",
    category: "Environment",
    organizer: "Green Future NGO",
    date: "Oct 15, 2025 • 9:00 AM",
    location: "Downtown Community Center",
    participants: 23,
    maxParticipants: 50,
    rewardPoints: 250,
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
    date: "Oct 18, 2025 • 2:00 PM",
    location: "Central Library", 
    participants: 8,
    maxParticipants: 20,
    rewardPoints: 150,
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
    date: "Oct 22, 2025 • 8:00 AM",
    location: "City Park Main Entrance",
    participants: 45,
    maxParticipants: 100,
    rewardPoints: 200,
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
    upvotes: 24,
    isUpvoted: false
  },
  {
    id: "p2", 
    title: "Youth Coding Bootcamp",
    description: "Free coding classes for teenagers to learn web development and prepare for tech careers. Would include mentorship from local developers.",
    category: "Education",
    proposedBy: "Amine Gharbi",
    proposedDate: "Sep 28, 2025", 
    preferredTime: "Weekday afternoons",
    upvotes: 18,
    isUpvoted: true
  },
  {
    id: "p3",
    title: "Community Art Mural Project",
    description: "Create a collaborative mural that represents our diverse community, involving local artists and residents of all ages.",
    category: "Arts",
    proposedBy: "Maria Rodriguez",
    proposedDate: "Oct 12, 2025",
    preferredTime: "Weekend, All day",
    upvotes: 31,
    isUpvoted: false
  }
];

const pastEvents = [
  {
    id: "past1",
    title: "Beach Cleanup Success!",
    description: "Removed 500 lbs of trash and debris from the coastline with 75 amazing volunteers.",
    category: "Environment", 
    organizer: "Ocean Guardians",
    date: "Completed • Sep 28, 2025",
    location: "Sunset Beach",
    participants: 75,
    maxParticipants: 75,
    rewardPoints: 200,
    tags: [
      { label: "Physical Activity", variant: "activity" as const },
      { label: "Outdoors", variant: "location" as const },
      { label: "Environmental", variant: "skill" as const }
    ]
  },
  {
    id: "past2",
    title: "Senior Tech Help Day",
    description: "Successfully taught 30 seniors how to use smartphones and video calling apps.",
    category: "Education", 
    organizer: "TechForAll",
    date: "Completed • Sep 15, 2025",
    location: "Community Library",
    participants: 15,
    maxParticipants: 15,
    rewardPoints: 180,
    tags: [
      { label: "Teaching", variant: "activity" as const },
      { label: "Indoors", variant: "location" as const },
      { label: "Technology", variant: "skill" as const }
    ]
  }
];

const categories = ["All", "Environment", "Education", "Social Services", "Health", "Arts"];

const Events = () => {
  const navigate = useNavigate();
  const [isProposalDialogOpen, setIsProposalDialogOpen] = useState(false);
  const [proposals, setProposals] = useState(proposedEvents);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [searchParams] = useSearchParams();
  const initialTab = (searchParams.get("tab") as "upcoming" | "proposed" | "past") || "upcoming";

  const handleJoinEvent = (eventId: string) => {
    toast.success("Join request sent! You'll be notified when the organizer reviews your request.", {
      description: "Check your profile to see your pending requests."
    });
  };

  const handleEventClick = (eventId: string) => {
    navigate(`/event/${eventId}`);
  };

  const handleUpvoteProposal = (proposalId: string) => {
    setProposals(prevProposals =>
      prevProposals.map(p => {
        if (p.id === proposalId) {
          const wasUpvoted = p.isUpvoted;
          return {
            ...p,
            upvotes: wasUpvoted ? p.upvotes - 1 : p.upvotes + 1,
            isUpvoted: !wasUpvoted,
          };
        }
        return p;
      })
    );
    toast.success("Vote updated!", {
      description: "Your support helps NGOs see which ideas the community wants most."
    });
  };

  const handleProposeEvent = () => {
    setIsProposalDialogOpen(true);
  };

  return (
    <AppLayout title="Events">
      <div className="space-y-4 p-4">
        {/* Search and Filters */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search events..."
              className="pl-10"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {(showAllCategories ? categories : categories.slice(0, 4)).map((category) => (
                <Badge
                  key={category}
                  variant={category === "All" ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/10 transition-colors"
                >
                  {category}
                </Badge>
              ))}
              {categories.length > 4 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAllCategories(!showAllCategories)}
                  className="h-6 px-2 text-xs text-muted-foreground hover:text-primary"
                >
                  {showAllCategories ? 'Less' : `+${categories.length - 4} More`}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Event Tabs */}
        <Tabs defaultValue={initialTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="proposed">Proposed</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-heading font-semibold">
                {upcomingEvents.length} Events Available
              </h2>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
            {upcomingEvents.map((event) => (
              <EventCard 
                key={event.id} 
                event={event} 
                onJoin={handleJoinEvent} 
                onEventClick={handleEventClick}
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
              <ProposalCard key={proposal.id} proposal={proposal} onUpvote={handleUpvoteProposal} />
            ))}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-heading font-semibold">
                Completed Events
              </h2>
            </div>
            {pastEvents.map((event) => (
              <EventCard 
                key={event.id} 
                event={event} 
                onEventClick={handleEventClick}
              />
            ))}
          </TabsContent>
        </Tabs>
      </div>

      {/* Proposal Form Dialog */}
      <ProposalFormDialog 
        open={isProposalDialogOpen} 
        onOpenChange={setIsProposalDialogOpen} 
      />
    </AppLayout>
  );
};

export default Events;
