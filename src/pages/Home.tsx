import { AppLayout } from "@/components/Layout/AppLayout";
import { ImpactTree } from "@/components/Gamification/ImpactTree";
import { MilestoneTracker } from "@/components/Gamification/MilestoneTracker";
import { EventCard } from "@/components/Events/EventCard";
import { ProposalFormDialog } from "@/components/Events/ProposalFormDialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Lightbulb, Users } from "lucide-react";
import heroCivicImage from "@/assets/hero-civic-community.jpg";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";

// Mock data
const mockUser = {
  name: "Amine Gharbi",
  level: 5,
  currentXP: 750,
  nextLevelXP: 1000,
  streakCount: 12,
};



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

const mockMilestones = [
  { 
    id: "1", 
    title: "First Steps", 
    description: "events joined", 
    progress: 3, 
    target: 5, 
    completed: false, 
    icon: "🎯", 
    category: "participation" 
  },
  { 
    id: "2", 
    title: "Green Champion", 
    description: "environmental events", 
    progress: 2, 
    target: 5, 
    completed: false, 
    icon: "🌱", 
    category: "environment" 
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
      <div className="space-y-6 p-4">
        {/* Hero Section */}
        <section className="relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={heroCivicImage}
              alt="Community engagement"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 gradient-hero" />
          </div>
          <div className="relative p-6 text-white space-y-4">
            <div>
              <h1 className="text-2xl font-heading font-bold">
                Welcome back, {mockUser.name}! 👋
              </h1>
              <p className="text-white/90">
                Ready to make a difference in your community today?
              </p>
            </div>
          </div>
        </section>

        {/* Gamification Dashboard */}
        <section className="grid grid-cols-2 gap-4">
          <Card className="p-4 card-civic">
            <ImpactTree 
              impactPoints={mockUser.currentXP}
              level={mockUser.level}
            />
          </Card>
          <Card className="p-4 card-civic cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => navigate("/profile")}>
            <MilestoneTracker milestones={mockMilestones} />
          </Card>
        </section>

        {/* Quick Actions */}
        <section className="space-y-3">
          <h2 className="text-xl font-heading font-bold text-foreground">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Button 
              onClick={() => navigate("/events")}
              className="h-16 gradient-primary hover:scale-105 transition-transform flex-col space-y-1"
            >
              <Calendar className="h-5 w-5" />
              <span className="text-sm">Browse Events</span>
            </Button>
            <Button 
              onClick={handleProposeIdea}
              variant="outline" 
              className="h-16 flex-col space-y-1 border-primary text-primary hover:bg-primary/10"
            >
              <Lightbulb className="h-5 w-5" />
              <span className="text-sm">Propose Idea</span>
            </Button>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="space-y-4">
          <h2 className="text-xl font-heading font-bold text-foreground">Your Impact</h2>
          <div className="grid grid-cols-3 gap-3">
            <Card className="p-3 card-civic text-center">
              <div className="text-2xl font-bold text-primary">12</div>
              <div className="text-xs text-muted-foreground">Events Joined</div>
            </Card>
            <Card className="p-3 card-civic text-center">
              <div className="text-2xl font-bold text-secondary">45</div>
              <div className="text-xs text-muted-foreground">Hours Contributed</div>
            </Card>
            <Card className="p-3 card-civic text-center">
              <div className="text-2xl font-bold text-accent">127</div>
              <div className="text-xs text-muted-foreground">People Helped</div>
            </Card>
          </div>
        </section>



        {/* Featured Events */}
        <section className="space-y-3">
          <h2 className="text-xl font-heading font-bold text-foreground">Featured Events</h2>
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
