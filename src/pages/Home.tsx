import { AppLayout } from "@/components/Layout/AppLayout";
import { ProposalFormDialog } from "@/components/Events/ProposalFormDialog";
import { EventCard } from "@/components/Events/EventCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

// Home is intentionally minimal and mobile-first: focus on sharing ideas and surfacing featured events.

const featuredEvents = [
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
  }
];



const Home = () => {
  const navigate = useNavigate();
  const [isProposalDialogOpen, setIsProposalDialogOpen] = useState(false);
  
  const handleJoinEvent = (eventId: string) => {
    toast.success("Successfully joined event! You'll get a reminder before it starts.", {
      description: "Check your profile to see all your upcoming events."
    });
  };

  const handleEventClick = (eventId: string) => {
    navigate(`/event/${eventId}`);
  };

  const handleProposeIdea = () => {
    setIsProposalDialogOpen(true);
  };

  return (
    <AppLayout>
      <div className="container px-4 md:px-0 py-6 space-y-6">
        {/* Idea Composer (subtle) */}
        <section className="section">
          <h3 className="text-xs font-medium tracking-wide uppercase text-muted-foreground">Share an idea</h3>
          <Card className="p-4 card-elevated">
            {/* One-sentence description */}
            <p className="text-sm text-muted-foreground mb-3">
              Share a small idea NGOs could adopt into a real event.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); handleProposeIdea(); }} className="flex items-center gap-3">
              <Avatar className="h-10 w-10 ring-1 ring-border">
                <AvatarImage src="" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <Input
                placeholder="What's your idea?"
                className="h-11 flex-1 bg-background"
                onFocus={handleProposeIdea}
                readOnly
              />
            </form>
            <div className="border-t border-border mt-3" />
            <div className="pt-2 flex justify-end">
              <Button onClick={() => navigate("/events?tab=proposed")} variant="link" size="sm" className="px-0 text-primary underline underline-offset-2 hover:text-primary/80">
                See community ideas
              </Button>
            </div>
          </Card>
        </section>

        {/* Featured Events */}
        <section className="section">
          <h2 className="section-title">Featured Events</h2>
          <div className="space-y-4">
            {featuredEvents.map((event) => (
              <EventCard 
                key={event.id} 
                event={event} 
                onJoin={handleJoinEvent}
                onEventClick={handleEventClick}
              />
            ))}
          </div>
        </section>
      </div>

      {/* Proposal Form Dialog */}
      <ProposalFormDialog 
        open={isProposalDialogOpen} 
        onOpenChange={setIsProposalDialogOpen} 
      />
    </AppLayout>
  );
};

export default Home;
