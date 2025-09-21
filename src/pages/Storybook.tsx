import { AppLayout } from "@/components/Layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Heart, Share, Users, Clock, MapPin } from "lucide-react";
import communityEventImage from "@/assets/community-event.jpg";
import { toast } from "sonner";

// Mock story data
const stories = [
  {
    id: "1",
    title: "Beach Cleanup Transforms Coastline",
    description: "75 volunteers removed 500 lbs of trash, making our beach beautiful again.",
    beforeImage: communityEventImage,
    afterImage: communityEventImage, 
    event: "Sunset Beach Cleanup",
    organizer: "Ocean Guardians",
    participants: 75,
    hoursContributed: 150,
    impact: "500 lbs trash removed, 2 miles of coastline cleaned",
    date: "Sep 28, 2025",
    location: "Sunset Beach",
    likes: 124,
    contributors: [
      { name: "Alex", avatar: "A" },
      { name: "Maria", avatar: "M" },
      { name: "David", avatar: "D" },
      { name: "Sarah", avatar: "S" }
    ]
  },
  {
    id: "2", 
    title: "Community Garden Feeds 50 Families",
    description: "Transformed empty lot into thriving garden providing fresh produce for local families.",
    beforeImage: communityEventImage,
    afterImage: communityEventImage,
    event: "Downtown Garden Project", 
    organizer: "Green Future NGO",
    participants: 32,
    hoursContributed: 96,
    impact: "50 families fed, 200+ vegetables harvested monthly",
    date: "Aug 15, 2025",
    location: "Downtown Community Center",
    likes: 89,
    contributors: [
      { name: "John", avatar: "J" },
      { name: "Emma", avatar: "E" },
      { name: "Carlos", avatar: "C" }
    ]
  }
];

const Storybook = () => {
  const handleLike = (storyId: string) => {
    toast.success("Liked this impact story! ❤️");
  };

  const handleShare = (storyId: string) => {
    toast.success("Story shared successfully! 🎉", {
      description: "Help inspire others to get involved in their community."
    });
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
            See the real difference we're making together
          </p>
        </div>

        {/* Story Feed */}
        <div className="space-y-6">
          {stories.map((story) => (
            <Card key={story.id} className="card-elevated overflow-hidden">
              {/* Story Header */}
              <div className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h2 className="text-lg font-heading font-semibold text-foreground">
                      {story.title}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {story.description}
                    </p>
                  </div>
                  <Badge variant="outline" className="ml-2">
                    {story.event}
                  </Badge>
                </div>

                {/* Event Info */}
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {story.date}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {story.location}
                  </div>
                </div>
              </div>

              {/* Before/After Images */}
              <div className="grid grid-cols-2 gap-1">
                <div className="relative">
                  <img 
                    src={story.beforeImage}
                    alt="Before"
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                    Before
                  </div>
                </div>
                <div className="relative">
                  <img 
                    src={story.afterImage}
                    alt="After"
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-success/90 text-white px-2 py-1 rounded text-xs">
                    After
                  </div>
                </div>
              </div>

              {/* Impact Stats */}
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-primary">{story.participants}</div>
                    <div className="text-xs text-muted-foreground">Volunteers</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-secondary">{story.hoursContributed}</div>
                    <div className="text-xs text-muted-foreground">Hours</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-accent">✨</div>
                    <div className="text-xs text-muted-foreground">Impact</div>
                  </div>
                </div>

                {/* Impact Description */}
                <div className="bg-muted/50 p-3 rounded-lg">
                  <p className="text-sm text-foreground font-medium">
                    🎯 {story.impact}
                  </p>
                </div>

                {/* Contributors */}
                <div className="space-y-2">
                  <div className="text-sm font-medium text-foreground">Contributors</div>
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {story.contributors.map((contributor, index) => (
                        <Avatar key={index} className="w-8 h-8 border-2 border-background">
                          <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                            {contributor.avatar}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      <div className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">+{story.participants - story.contributors.length}</span>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      organized by {story.organizer}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleLike(story.id)}
                    className="text-muted-foreground hover:text-red-500"
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    {story.likes}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleShare(story.id)}
                    className="text-muted-foreground"
                  >
                    <Share className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Storybook;