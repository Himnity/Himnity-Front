import { AppLayout } from "@/components/Layout/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { XPProgressBar } from "@/components/Gamification/XPProgressBar";
import { StreakCounter } from "@/components/Gamification/StreakCounter";
import { BadgeGallery } from "@/components/Gamification/BadgeGallery";
import { Edit, Calendar, Clock, Star, Award } from "lucide-react";
import { toast } from "sonner";

// Mock user data
const user = {
  name: "Alex Chen",
  avatar: "AC",
  level: 5,
  currentXP: 750,
  nextLevelXP: 1000,
  streakCount: 12,
  joinDate: "March 2025",
  location: "San Francisco, CA",
  bio: "Passionate about environmental causes and community building. Love organizing clean-up events!"
};

const userStats = {
  eventsJoined: 22,
  hoursContributed: 75,
  peopleHelped: 127,
  eventsProposed: 3,
  proposalsAdopted: 1
};

const badges = [
  { id: "1", name: "Helper", description: "First event joined", unlocked: true, icon: "🤝" },
  { id: "2", name: "Green Warrior", description: "5 environmental events", unlocked: true, icon: "🌱" },
  { id: "3", name: "Leader", description: "Organized an event", unlocked: true, icon: "⭐" },
  { id: "4", name: "Innovator", description: "Idea adopted by NGO", unlocked: true, icon: "💡" },
  { id: "5", name: "Champion", description: "50 events completed", unlocked: false, icon: "🏆" },
  { id: "6", name: "Community", description: "100 people helped", unlocked: false, icon: "❤️" },
];

const eventHistory = [
  {
    id: "1",
    title: "Beach Cleanup Success",
    date: "Sep 28, 2025",
    status: "Completed",
    points: 200,
    category: "Environment"
  },
  {
    id: "2", 
    title: "Digital Literacy Workshop",
    date: "Oct 18, 2025",
    status: "Upcoming",
    points: 150,
    category: "Education"
  },
  {
    id: "3",
    title: "Community Garden Revival", 
    date: "Oct 15, 2025",
    status: "Joined",
    points: 250,
    category: "Environment"
  }
];

const proposedEvents = [
  {
    id: "p1",
    title: "Mobile Food Pantry",
    date: "Proposed Oct 5, 2025",
    status: "Under Review",
    description: "Bring healthy food to underserved neighborhoods"
  },
  {
    id: "p2",
    title: "Senior Tech Help",
    date: "Proposed Sep 20, 2025", 
    status: "Adopted",
    adoptedBy: "TechForAll NGO"
  }
];

const Profile = () => {
  const handleEditProfile = () => {
    toast.info("Profile editing feature coming soon!");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-success text-success-foreground";
      case "Upcoming": return "bg-primary text-primary-foreground";
      case "Joined": return "bg-secondary text-secondary-foreground";
      case "Adopted": return "bg-success text-success-foreground";
      case "Under Review": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <AppLayout title="Profile" showFab={false}>
      <div className="space-y-6 p-4">
        {/* Profile Header */}
        <Card className="p-6 card-elevated gradient-civic">
          <div className="flex items-start space-x-4 text-white">
            <Avatar className="w-20 h-20 border-4 border-white/20">
              <AvatarFallback className="text-2xl font-bold bg-white/20 text-white">
                {user.avatar}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-heading font-bold">{user.name}</h1>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={handleEditProfile}
                  className="text-white hover:bg-white/20"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-white/90 text-sm">{user.bio}</p>
              <div className="flex items-center space-x-4 text-sm text-white/75">
                <span>📍 {user.location}</span>
                <span>📅 Joined {user.joinDate}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 card-civic">
            <XPProgressBar 
              currentXP={user.currentXP}
              nextLevelXP={user.nextLevelXP}
              level={user.level}
            />
          </Card>
          <Card className="p-4 card-civic">
            <StreakCounter streakCount={user.streakCount} />
          </Card>
        </div>

        {/* Impact Stats */}
        <Card className="p-6 card-civic">
          <h3 className="text-lg font-heading font-semibold mb-4">Your Impact</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{userStats.eventsJoined}</div>
              <div className="text-sm text-muted-foreground">Events Joined</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">{userStats.hoursContributed}</div>
              <div className="text-sm text-muted-foreground">Hours Contributed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">{userStats.peopleHelped}</div>
              <div className="text-sm text-muted-foreground">People Helped</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">{userStats.proposalsAdopted}</div>
              <div className="text-sm text-muted-foreground">Ideas Adopted</div>
            </div>
          </div>
        </Card>

        {/* Detailed Tabs */}
        <Tabs defaultValue="badges" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="badges">Badges</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="proposals">Proposals</TabsTrigger>
          </TabsList>

          <TabsContent value="badges">
            <Card className="p-6 card-civic">
              <BadgeGallery badges={badges} />
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <h3 className="text-lg font-heading font-semibold">Event History</h3>
            <div className="space-y-3">
              {eventHistory.map((event) => (
                <Card key={event.id} className="p-4 card-civic">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium text-foreground">{event.title}</div>
                        <div className="text-sm text-muted-foreground">{event.date}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(event.status)}>
                        {event.status}
                      </Badge>
                      {event.status === "Completed" && (
                        <div className="flex items-center text-sm text-accent">
                          <Star className="h-3 w-3 mr-1" />
                          {event.points} XP
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="proposals" className="space-y-4">
            <h3 className="text-lg font-heading font-semibold">Your Event Proposals</h3>
            <div className="space-y-3">
              {proposedEvents.map((event) => (
                <Card key={event.id} className="p-4 card-civic">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-foreground">{event.title}</div>
                      <Badge className={getStatusColor(event.status)}>
                        {event.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {event.description || `Proposed on ${event.date}`}
                    </div>
                    {event.status === "Adopted" && (
                      <div className="flex items-center text-sm text-success">
                        <Award className="h-3 w-3 mr-1" />
                        Adopted by {event.adoptedBy}
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Profile;