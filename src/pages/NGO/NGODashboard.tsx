import { NGOLayout } from "@/components/Layout/NGOLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Users, 
  TrendingUp, 
  Star, 
  Plus,
  Eye,
  CheckCircle,
  Clock,
  MapPin
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Mock NGO data
const ngoData = {
  name: "Green Future NGO",
  logo: "GF",
  eventsOrganized: 45,
  totalParticipants: 1250,
  impactScore: 9.2,
  activeEvents: 3,
  pendingProposals: 8,
  completedEvents: 42
};

const recentProposals = [
  {
    id: "p1",
    title: "Mobile Food Pantry",
    proposedBy: "Sarah Johnson",
    upvotes: 24,
    category: "Social Services",
    urgency: "High",
    submittedDate: "2 days ago"
  },
  {
    id: "p2",
    title: "Community Art Mural Project",
    proposedBy: "Maria Rodriguez",
    upvotes: 31,
    category: "Arts",
    urgency: "Medium",
    submittedDate: "5 days ago"
  },
  {
    id: "p3",
    title: "Youth Coding Bootcamp",
    proposedBy: "Alex Chen",
    upvotes: 18,
    category: "Education",
    urgency: "Low",
    submittedDate: "1 week ago"
  }
];

const upcomingEvents = [
  {
    id: "e1",
    title: "Community Garden Revival",
    date: "Oct 15, 2025",
    time: "9:00 AM",
    location: "Downtown Community Center",
    registrations: 23,
    maxParticipants: 50
  },
  {
    id: "e2",
    title: "Digital Literacy Workshop",
    date: "Oct 18, 2025", 
    time: "2:00 PM",
    location: "Central Library",
    registrations: 8,
    maxParticipants: 20
  }
];

const NGODashboard = () => {
  const navigate = useNavigate();

  const handleCreateEvent = () => {
    navigate("/ngo/events/create");
  };

  const handleViewProposals = () => {
    navigate("/ngo/proposals");
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "High": return "bg-red-100 text-red-800 border-red-200";
      case "Medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <NGOLayout>
      <div className="space-y-6 p-4">
        {/* Welcome Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-heading font-bold text-foreground">
                Welcome back! 👋
              </h1>
              <p className="text-muted-foreground">
                Manage your organization's community impact
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg gradient-civic flex items-center justify-center">
              <span className="text-white font-heading font-bold text-lg">{ngoData.logo}</span>
            </div>
          </div>
        </section>

        {/* Stats Overview */}
        <section className="grid grid-cols-2 gap-4">
          <Card className="p-4 card-civic">
            <div className="flex items-center space-x-3">
              <Calendar className="h-8 w-8 text-primary" />
              <div>
                <div className="text-2xl font-bold text-foreground">{ngoData.eventsOrganized}</div>
                <div className="text-sm text-muted-foreground">Events Organized</div>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 card-civic">
            <div className="flex items-center space-x-3">
              <Users className="h-8 w-8 text-secondary" />
              <div>
                <div className="text-2xl font-bold text-foreground">{ngoData.totalParticipants}</div>
                <div className="text-sm text-muted-foreground">Total Participants</div>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 card-civic">
            <div className="flex items-center space-x-3">
              <Star className="h-8 w-8 text-accent" />
              <div>
                <div className="text-2xl font-bold text-foreground">{ngoData.impactScore}</div>
                <div className="text-sm text-muted-foreground">Impact Score</div>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 card-civic">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-8 w-8 text-success" />
              <div>
                <div className="text-2xl font-bold text-foreground">{ngoData.activeEvents}</div>
                <div className="text-sm text-muted-foreground">Active Events</div>
              </div>
            </div>
          </Card>
        </section>

        {/* Quick Actions */}
        <section className="space-y-3">
          <h2 className="text-xl font-heading font-bold text-foreground">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Button 
              onClick={handleCreateEvent}
              className="h-16 gradient-primary hover:scale-105 transition-transform flex-col space-y-1"
            >
              <Plus className="h-5 w-5" />
              <span className="text-sm">Create Event</span>
            </Button>
            <Button 
              onClick={handleViewProposals}
              variant="outline" 
              className="h-16 flex-col space-y-1 border-primary text-primary hover:bg-primary/10"
            >
              <Eye className="h-5 w-5" />
              <span className="text-sm">Review Proposals</span>
            </Button>
          </div>
        </section>

        {/* Pending Proposals */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-heading font-bold text-foreground">
              Pending Proposals ({ngoData.pendingProposals})
            </h2>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleViewProposals}
              className="text-primary"
            >
              View All
            </Button>
          </div>
          
          <div className="space-y-3">
            {recentProposals.map((proposal) => (
              <Card key={proposal.id} className="p-4 card-civic">
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{proposal.title}</h3>
                      <p className="text-sm text-muted-foreground">by {proposal.proposedBy}</p>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <Badge className={getUrgencyColor(proposal.urgency)}>
                        {proposal.urgency}
                      </Badge>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {proposal.upvotes} votes
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{proposal.category}</Badge>
                    <span className="text-xs text-muted-foreground">{proposal.submittedDate}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-heading font-bold text-foreground">
              Upcoming Events ({ngoData.activeEvents})
            </h2>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/ngo/events")}
              className="text-primary"
            >
              Manage All
            </Button>
          </div>
          
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="p-4 card-civic">
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-foreground">{event.title}</h3>
                    <Badge className="bg-success/10 text-success border-success/20">
                      Active
                    </Badge>
                  </div>
                  
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {event.date} at {event.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.location}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      {event.registrations}/{event.maxParticipants} registered
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </NGOLayout>
  );
};

export default NGODashboard;