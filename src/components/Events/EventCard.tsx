import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tag } from "@/components/ui/tag";
import { Calendar, MapPin, Users, Star } from "lucide-react";
import communityEventImage from "@/assets/community-event.jpg";

interface EventCardProps {
  event: {
    id: string;
    title: string;
    description: string;
    category: string;
    organizer: string;
    date: string;
    location: string;
    participants: number;
    maxParticipants: number;
    rewardPoints: number;
    imageUrl?: string;
    tags?: Array<{
      label: string;
      variant?: "default" | "activity" | "skill" | "location";
    }>;
  };
  onJoin?: (eventId: string) => void;
}

export const EventCard = ({ event, onJoin }: EventCardProps) => {
  const handleJoinClick = () => {
    if (onJoin) onJoin(event.id);
  };

  return (
    <div className="card-civic overflow-hidden">
      {/* Event Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={event.imageUrl || communityEventImage} 
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="badge-civic bg-card/90 text-foreground">
            {event.category}
          </Badge>
        </div>
        <div className="absolute top-3 right-3 flex items-center space-x-1 bg-accent/90 text-white px-2 py-1 rounded-full">
          <Star className="h-3 w-3" />
          <span className="text-xs font-medium">{event.rewardPoints} XP</span>
        </div>
      </div>

      {/* Event Content */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-heading font-semibold text-foreground text-lg line-clamp-2">
            {event.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {event.description}
          </p>
        </div>

        {/* Event Details */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Users className="h-4 w-4 mr-2" />
            <span>{event.participants} / {event.maxParticipants} participants</span>
          </div>
        </div>

        {/* Event Tags (under participants) */}
        {event.tags && event.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {event.tags.map((tag, index) => (
              <Tag key={index} variant={tag.variant || "default"}>
                {tag.label}
              </Tag>
            ))}
          </div>
        )}

        {/* Organizer & Action */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-sm text-muted-foreground">
            by {event.organizer}
          </span>
          <Button 
            onClick={handleJoinClick}
            className="gradient-primary hover:scale-105 transition-transform"
            size="sm"
          >
            Join Event
          </Button>
        </div>
      </div>
    </div>
  );
};