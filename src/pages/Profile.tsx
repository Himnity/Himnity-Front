import { AppLayout } from "@/components/Layout/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { ImpactTree } from "@/components/Gamification/ImpactTree";
import { MilestoneTracker } from "@/components/Gamification/MilestoneTracker";
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

const earnedBadges = [
  { id: "1", name: "Helper", description: "First event joined", unlocked: true, icon: "🤝", earnedDate: "March 15, 2025" },
  { id: "2", name: "Green Warrior", description: "5 environmental events", unlocked: true, icon: "🌱", earnedDate: "April 2, 2025" },
  { id: "3", name: "Leader", description: "Organized an event", unlocked: true, icon: "⭐", earnedDate: "May 10, 2025" },
  { id: "4", name: "Innovator", description: "Idea adopted by NGO", unlocked: true, icon: "💡", earnedDate: "June 5, 2025" },
];

const availableBadges = [
  { 
    id: "5", 
    name: "Champion", 
    description: "Complete 50 events", 
    icon: "🏆", 
    progress: 22, 
    requirement: 50, 
    howToObtain: "Join and complete 50 community events"
  },
  { 
    id: "6", 
    name: "Community Builder", 
    description: "Help 100+ people", 
    icon: "❤️", 
    progress: 127, 
    requirement: 100, 
    howToObtain: "Participate in events that directly help community members",
    unlocked: true
  },
  { 
    id: "7", 
    name: "Mentor", 
    description: "Lead 10 workshops", 
    icon: "👨‍�", 
    progress: 0, 
    requirement: 10, 
    howToObtain: "Organize or lead educational workshops and training sessions"
  },
  { 
    id: "8", 
    name: "Environmental Hero", 
    description: "Join 20 eco events", 
    icon: "🌍", 
    progress: 7, 
    requirement: 20, 
    howToObtain: "Participate in environmental cleanup, gardening, and conservation events"
  },
  { 
    id: "9", 
    name: "Tech4Good", 
    description: "Complete 15 tech events", 
    icon: "💻", 
    progress: 2, 
    requirement: 15, 
    howToObtain: "Join digital literacy workshops, coding bootcamps, and tech training events"
  },
  { 
    id: "10", 
    name: "Social Champion", 
    description: "Host 5 social events", 
    icon: "🎉", 
    progress: 0, 
    requirement: 5, 
    howToObtain: "Organize community gatherings, cultural events, and social activities"
  }
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

const milestones = [
  { 
    id: "1", 
    title: "First Steps", 
    description: "events joined", 
    progress: 5, 
    target: 5, 
    completed: true, 
    icon: "🎯", 
    category: "participation" 
  },
  { 
    id: "2", 
    title: "Team Player", 
    description: "collaborations", 
    progress: 2, 
    target: 10, 
    completed: false, 
    icon: "🤝", 
    category: "collaboration" 
  },
  { 
    id: "3", 
    title: "Green Champion", 
    description: "environmental events", 
    progress: 7, 
    target: 10, 
    completed: false, 
    icon: "🌱", 
    category: "environment" 
  },
  { 
    id: "4", 
    title: "Innovator", 
    description: "proposals adopted", 
    progress: 1, 
    target: 3, 
    completed: false, 
    icon: "💡", 
    category: "innovation" 
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

const pendingRequests = [
  {
    id: "r1",
    eventTitle: "Community Garden Revival",
    organizer: "Green Future Tunisia",
    requestDate: "Oct 10, 2025",
    status: "Pending Review",
    eventDate: "Oct 15, 2025"
  },
  {
    id: "r2",
    eventTitle: "Digital Literacy Workshop", 
    organizer: "TechForAll",
    requestDate: "Oct 15, 2025",
    status: "Pending Review",
    eventDate: "Oct 18, 2025"
  },
  {
    id: "r3",
    eventTitle: "Beach Cleanup Drive",
    organizer: "EcoWarriors",
    requestDate: "Sep 25, 2025",
    status: "Accepted",
    eventDate: "Oct 1, 2025"
  },
  {
    id: "r4",
    eventTitle: "Coding Workshop",
    organizer: "DevCommunity",
    requestDate: "Sep 20, 2025",
    status: "Rejected",
    eventDate: "Oct 5, 2025",
    reason: "Event is full"
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
    <AppLayout title="Profile">
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
            <ImpactTree 
              impactPoints={user.currentXP}
              level={user.level}
            />
          </Card>
          <Card className="p-4 card-civic">
            <MilestoneTracker milestones={milestones} />
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
            <TabsTrigger value="my-events">My Events</TabsTrigger>
            <TabsTrigger value="proposals">Proposals</TabsTrigger>
          </TabsList>

          <TabsContent value="badges" className="space-y-4">
            {/* Earned Badges Section */}
            <Card className="p-6 card-civic">
              <div className="space-y-4">
                <h3 className="text-lg font-heading font-semibold flex items-center">
                  <Award className="h-5 w-5 mr-2 text-accent" />
                  Earned Badges ({earnedBadges.length})
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {earnedBadges.map((badge) => (
                    <div key={badge.id} className="flex items-center p-3 bg-muted/50 rounded-lg border">
                      <div className="text-2xl mr-3">{badge.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm">{badge.name}</div>
                        <div className="text-xs text-muted-foreground line-clamp-1">{badge.description}</div>
                        <div className="text-xs text-accent mt-1">Earned {badge.earnedDate}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Available Badges Section */}
            <Card className="p-6 card-civic">
              <div className="space-y-4">
                <h3 className="text-lg font-heading font-semibold flex items-center">
                  <Star className="h-5 w-5 mr-2 text-muted-foreground" />
                  Available Badges ({availableBadges.length})
                </h3>
                <div className="space-y-3">
                  {availableBadges.map((badge) => {
                    const isCompleted = badge.progress >= badge.requirement;
                    const progressPercentage = Math.min((badge.progress / badge.requirement) * 100, 100);
                    
                    return (
                      <div key={badge.id} className={`p-4 rounded-lg border ${isCompleted ? 'bg-success/10 border-success/30' : 'bg-muted/30'}`}>
                        <div className="flex items-start space-x-3">
                          <div className={`text-2xl ${isCompleted ? '' : 'grayscale opacity-50'}`}>
                            {badge.icon}
                          </div>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium">{badge.name}</div>
                                <div className="text-sm text-muted-foreground">{badge.description}</div>
                              </div>
                              {isCompleted && (
                                <Badge className="bg-success text-success-foreground">
                                  Ready to claim!
                                </Badge>
                              )}
                            </div>
                            
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Progress</span>
                                <span className="font-medium">{badge.progress} / {badge.requirement}</span>
                              </div>
                              <div className="w-full bg-muted rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full transition-all ${isCompleted ? 'bg-success' : 'bg-primary'}`}
                                  style={{ width: `${progressPercentage}%` }}
                                />
                              </div>
                            </div>
                            
                            <div className="text-xs text-muted-foreground">
                              <strong>How to obtain:</strong> {badge.howToObtain}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="my-events" className="space-y-4">
            <Tabs defaultValue="requests" className="space-y-3">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="requests">Join Requests ({pendingRequests.length})</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="past">Past Events</TabsTrigger>
              </TabsList>
              
              <TabsContent value="requests">
                <div className="space-y-3">
                  {pendingRequests.map((request) => (
                    <Card key={request.id} className="p-4 card-civic">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="font-medium text-foreground">{request.eventTitle}</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            by {request.organizer} • Event: {request.eventDate}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Requested: {request.requestDate}
                          </div>
                          {request.status === "Rejected" && request.reason && (
                            <div className="text-xs text-red-600 mt-1">
                              Reason: {request.reason}
                            </div>
                          )}
                        </div>
                        <Badge className={
                          request.status === "Pending Review" 
                            ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                            : request.status === "Accepted"
                            ? "bg-green-100 text-green-800 border-green-200"
                            : "bg-red-100 text-red-800 border-red-200"
                        }>
                          {request.status}
                        </Badge>
                      </div>
                    </Card>
                  ))}
                  {pendingRequests.length === 0 && (
                    <Card className="p-8 text-center">
                      <p className="text-muted-foreground">No join requests yet</p>
                    </Card>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="upcoming">
                <div className="space-y-3">
                  {eventHistory.filter(event => event.status === "Upcoming" || event.status === "Joined").map((event) => (
                    <Card key={event.id} className="p-4 card-civic">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Calendar className="h-4 w-4 text-primary" />
                          <div>
                            <div className="font-medium text-foreground">{event.title}</div>
                            <div className="text-sm text-muted-foreground">{event.date}</div>
                          </div>
                        </div>
                        <Badge className={getStatusColor(event.status)}>
                          {event.status}
                        </Badge>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="past">
                <div className="space-y-3">
                  {eventHistory.filter(event => event.status === "Completed").map((event) => (
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
                          <div className="flex items-center text-sm text-accent">
                            <Star className="h-3 w-3 mr-1" />
                            {event.points} pts
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
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