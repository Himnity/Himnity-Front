import { AppLayout } from "@/components/Layout/AppLayout";
import { EventCard } from "@/components/Events/EventCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Plus } from "lucide-react";
import { toast } from "sonner";

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
  }
];

const proposedEvents = [
  {
    id: "p1",
    title: "Mobile Food Pantry",
    description: "Bring healthy food options to underserved neighborhoods using a mobile distribution system.",
    category: "Social Services",
    organizer: "Community Member",
    date: "Proposed for November",
    location: "Various Locations",
    participants: 0,
    maxParticipants: 30,
    rewardPoints: 300,
  },
  {
    id: "p2", 
    title: "Youth Coding Bootcamp",
    description: "Free coding classes for teenagers to learn web development and prepare for tech careers.",
    category: "Education",
    organizer: "Student Volunteer",
    date: "Proposed for December", 
    location: "High School Computer Lab",
    participants: 0,
    maxParticipants: 25,
    rewardPoints: 400,
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
  }
];

const categories = ["All", "Environment", "Education", "Social Services", "Health", "Arts"];

const Events = () => {
  const handleJoinEvent = (eventId: string) => {
    toast.success("Successfully joined event! You'll get a reminder before it starts.", {
      description: "Check your profile to see all your upcoming events."
    });
  };

  const handleProposeEvent = () => {
    toast.info("Event proposal feature coming soon!", {
      description: "You'll be able to submit ideas for NGOs to consider."
    });
  };

  return (
    <AppLayout title="Events" showFab={true} fabAction={handleProposeEvent}>
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
          
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={category === "All" ? "default" : "outline"}
                className="whitespace-nowrap cursor-pointer hover:bg-primary/10"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Event Tabs */}
        <Tabs defaultValue="upcoming" className="space-y-4">
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
              <EventCard key={event.id} event={event} onJoin={handleJoinEvent} />
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
            {proposedEvents.map((event) => (
              <EventCard key={event.id} event={event} onJoin={handleJoinEvent} />
            ))}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-heading font-semibold">
                Completed Events
              </h2>
            </div>
            {pastEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Events;