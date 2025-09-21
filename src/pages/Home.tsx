import { AppLayout } from "@/components/Layout/AppLayout";
import { ImpactTree } from "@/components/Gamification/ImpactTree";
import { MilestoneTracker } from "@/components/Gamification/MilestoneTracker";
import { BadgeGallery } from "@/components/Gamification/BadgeGallery";
import { EventCard } from "@/components/Events/EventCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TrendingUp, Users, Calendar, Lightbulb, Heart, Recycle, TreePine } from "lucide-react";
import heroCivicImage from "@/assets/hero-civic-community.jpg";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Mock data
const mockUser = {
  name: "Alex Chen",
  level: 5,
  currentXP: 750,
  nextLevelXP: 1000,
  streakCount: 12,
};

const mockBadges = [
  { id: "1", name: "Helper", description: "First event joined", unlocked: true, icon: "🤝" },
  { id: "2", name: "Green Warrior", description: "5 environmental events", unlocked: true, icon: "🌱" },
  { id: "3", name: "Leader", description: "Organized an event", unlocked: true, icon: "⭐" },
  { id: "4", name: "Innovator", description: "Idea adopted by NGO", unlocked: false, icon: "💡" },
  { id: "5", name: "Champion", description: "50 events completed", unlocked: false, icon: "🏆" },
  { id: "6", name: "Community", description: "100 people helped", unlocked: false, icon: "❤️" },
];

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

const leaderboard = [
  { rank: 1, name: "Maria Santos", points: 2850, avatar: "🌟" },
  { rank: 2, name: "David Kim", points: 2420, avatar: "🚀" },
  { rank: 3, name: "Sarah Johnson", points: 2180, avatar: "💎" },
];

const Home = () => {
  const navigate = useNavigate();

  const handleJoinEvent = (eventId: string) => {
    toast.success("Successfully joined event! You'll get a reminder before it starts.", {
      description: "Check your profile to see all your upcoming events."
    });
  };

  const handleFabClick = () => {
    navigate("/events");
  };

  return (
    <AppLayout showFab={true} fabAction={handleFabClick}>
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
          <Card className="p-4 card-civic">
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
              onClick={() => toast.info("Propose Event feature coming soon!")}
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

        {/* Mini Leaderboard */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-heading font-bold text-foreground">Top Contributors</h2>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/hall-of-fame")}
              className="text-primary"
            >
              View All
            </Button>
          </div>
          <div className="space-y-2">
            {leaderboard.map((user) => (
              <div key={user.rank} className="flex items-center justify-between p-3 card-civic">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                    user.rank === 1 ? 'bg-accent' : user.rank === 2 ? 'bg-muted' : 'bg-secondary'
                  }`}>
                    {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : '🥉'}
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{user.name}</div>
                    <div className="text-xs text-muted-foreground">{user.points} XP</div>
                  </div>
                </div>
                <TrendingUp className="h-4 w-4 text-success" />
              </div>
            ))}
          </div>
        </section>

        {/* Badge Gallery */}
        <section>
          <BadgeGallery badges={mockBadges} />
        </section>

        {/* Featured Events */}
        <section className="space-y-3">
          <h2 className="text-xl font-heading font-bold text-foreground">Featured Events</h2>
          <div className="space-y-4">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} event={event} onJoin={handleJoinEvent} />
            ))}
          </div>
        </section>
      </div>
    </AppLayout>
  );
};

export default Home;