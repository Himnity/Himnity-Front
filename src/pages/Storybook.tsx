import { AppLayout } from "@/components/Layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Users, Clock, Heart, Filter } from "lucide-react";
import communityEventImage from "@/assets/community-event.jpg";
import { toast } from "sonner";

// Mock data for stories
const stories = [
  {
    id: "1",
    title: "Downtown Community Garden Revival",
    organizer: "Green Future NGO",
    date: "Sep 28, 2025",
    location: "Downtown Community Center",
    category: "Environment",
    participants: 45,
    hoursContributed: 180,
    impact: "Transformed 500sq ft abandoned lot into thriving garden",
    beforeImage: communityEventImage,
    afterImage: communityEventImage,
    description: "Community came together to create a beautiful space for growing fresh food and bringing neighbors together.",
    userParticipated: true,
    region: "San Francisco"
  },
  {
    id: "2", 
    title: "Digital Literacy for Seniors",
    organizer: "TechForAll",
    date: "Sep 15, 2025",
    location: "Central Library",
    category: "Education", 
    participants: 24,
    hoursContributed: 96,
    impact: "24 seniors now confidently use smartphones and email",
    beforeImage: communityEventImage,
    afterImage: communityEventImage,
    description: "Bridging the digital divide by teaching essential tech skills to our senior community members.",
    userParticipated: false,
    region: "San Francisco"
  },
  {
    id: "3",
    title: "Beach Cleanup Success",
    organizer: "Ocean Guardians",
    date: "Aug 20, 2025", 
    location: "Ocean Beach",
    category: "Environment",
    participants: 78,
    hoursContributed: 234,
    impact: "Collected 450 lbs of trash and recyclables",
    beforeImage: communityEventImage,
    afterImage: communityEventImage,
    description: "Amazing turnout for our monthly beach cleanup. The difference was incredible!",
    userParticipated: true,
    region: "San Francisco"
  }
];

const categories = ["All", "Environment", "Education", "Health", "Community"];

const Storybook = () => {
  const handleShare = (storyId: string) => {
    toast.success("Story shared successfully!");
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Environment": return "bg-success text-success-foreground";
      case "Education": return "bg-primary text-primary-foreground";
      case "Health": return "bg-accent text-accent-foreground";
      case "Community": return "bg-secondary text-secondary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const filteredStories = {
    all: stories,
    participated: stories.filter(story => story.userParticipated),
    region: stories.filter(story => story.region === "San Francisco")
  };

  return (
    <AppLayout title="Impact Stories" showFab={false}>
      <div className="space-y-6 p-4">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-heading font-bold text-foreground">
            Community Impact Stories
          </h1>
          <p className="text-muted-foreground">
            See the amazing changes we've made together
          </p>
        </div>

        {/* Filter Tabs */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Stories</TabsTrigger>
            <TabsTrigger value="participated">My Events</TabsTrigger>
            <TabsTrigger value="region">My Region</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="space-y-4">
              {filteredStories.all.map((story) => (
                <Card key={story.id} className="overflow-hidden card-civic">
                  <div className="relative">
                    <img 
                      src={story.beforeImage}
                      alt={story.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className={getCategoryColor(story.category)}>
                        {story.category}
                      </Badge>
                    </div>
                    {story.userParticipated && (
                      <div className="absolute top-3 right-3">
                        <Badge variant="outline" className="bg-white/90 text-primary border-primary">
                          <Heart className="h-3 w-3 mr-1" />
                          Participated
                        </Badge>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="text-lg font-heading font-semibold text-foreground">
                        {story.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        by {story.organizer}
                      </p>
                    </div>

                    <p className="text-sm text-foreground">
                      {story.description}
                    </p>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{story.participants}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{story.hoursContributed}h</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{story.date}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div className="text-sm font-medium text-foreground mb-1">
                        Impact Achieved:
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {story.impact}
                      </div>
                    </div>

                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleShare(story.id)}
                      className="w-full"
                    >
                      Share This Story
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="participated">
            <div className="space-y-4">
              {filteredStories.participated.length > 0 ? (
                filteredStories.participated.map((story) => (
                  <Card key={story.id} className="overflow-hidden card-civic">
                    <div className="relative">
                      <img 
                        src={story.beforeImage}
                        alt={story.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className={getCategoryColor(story.category)}>
                          {story.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="p-4 space-y-3">
                      <div>
                        <h3 className="text-lg font-heading font-semibold text-foreground">
                          {story.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          You participated • {story.date}
                        </p>
                      </div>

                      <div className="p-3 bg-success/10 rounded-lg border border-success/20">
                        <div className="text-sm font-medium text-success mb-1">
                          Your Contribution:
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Part of {story.participants} volunteers who achieved: {story.impact}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                  <div className="text-lg font-medium mb-2">No stories yet</div>
                  <div className="text-sm">Join events to create your impact story!</div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="region">
            <div className="space-y-4">
              {filteredStories.region.map((story) => (
                <Card key={story.id} className="overflow-hidden card-civic">
                  <div className="relative">
                    <img 
                      src={story.beforeImage}
                      alt={story.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className={getCategoryColor(story.category)}>
                        {story.category}
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge variant="outline" className="bg-white/90 text-secondary border-secondary">
                        <MapPin className="h-3 w-3 mr-1" />
                        {story.region}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="text-lg font-heading font-semibold text-foreground">
                        {story.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {story.location} • {story.date}
                      </p>
                    </div>

                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div className="text-sm font-medium text-foreground mb-1">
                        Local Impact:
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {story.impact}
                      </div>
                    </div>
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

export default Storybook;