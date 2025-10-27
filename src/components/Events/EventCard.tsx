import { MouseEvent } from "react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tag } from "@/components/ui/tag";
import { Calendar, MapPin, Users, Star, Heart, Share2 } from "lucide-react";
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
    likes?: number;
    shares?: number;
    isLiked?: boolean;
  };
  onJoin?: (eventId: string) => void;
  onEventClick?: (eventId: string) => void;
  onShare?: (event: EventCardProps["event"]) => void;
  onToggleLike?: (eventId: string) => void;
}

export const EventCard = ({ event, onJoin, onEventClick, onShare, onToggleLike }: EventCardProps) => {
  const handleJoinClick = (e: MouseEvent) => {
    e.stopPropagation();
    if (onJoin) onJoin(event.id);
  };

  const handleShareClick = (e: MouseEvent) => {
    e.stopPropagation();
    if (onShare) onShare(event);
  };

  const handleLikeClick = (e: MouseEvent) => {
    e.stopPropagation();
    if (onToggleLike) onToggleLike(event.id);
  };

  const handleCardClick = () => {
    if (onEventClick) onEventClick(event.id);
  };

  return (
    <div
      className="card-civic overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleCardClick}
    >
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

      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <div>
            <h3 className="font-heading font-semibold text-foreground text-lg leading-snug line-clamp-2">
              {event.title}
            </h3>
            <p className="text-sm text-muted-foreground">Hosted by {event.organizer}</p>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {event.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            <Calendar className="h-4 w-4 text-primary" />
            {event.date}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            {event.location}
          </span>
        </div>

        {event.tags && event.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {event.tags.map((tag, index) => (
              <Tag key={index} variant={tag.variant || "default"}>
                {tag.label}
              </Tag>
            ))}
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Users className="h-4 w-4 text-primary" />
              {event.participants}/{event.maxParticipants}
            </span>
            {typeof event.likes === "number" && (
              onToggleLike ? (
                <span className="inline-flex items-center gap-2 text-sm">
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-pressed={event.isLiked}
                    onClick={handleLikeClick}
                    className={`h-8 w-8 rounded-full transition-colors ${
                      event.isLiked ? "text-rose-500 hover:text-rose-600" : "text-muted-foreground hover:text-rose-500"
                    }`}
                  >
                    <Heart
                      className="h-5 w-5"
                      fill={event.isLiked ? "currentColor" : "none"}
                    />
                    <span className="sr-only">{event.isLiked ? "Remove like" : "Like event"}</span>
                  </Button>
                  <span className="text-sm text-muted-foreground">{event.likes}</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1">
                  <Heart className="h-4 w-4 text-rose-500" />
                  {event.likes}
                </span>
              )
            )}
            {typeof event.shares === "number" && (
              <span className="inline-flex items-center gap-1">
                <Share2 className="h-4 w-4 text-primary" />
                {event.shares}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={handleShareClick}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 border-primary/30 text-primary hover:bg-primary/10 dark:border-primary/40 dark:text-primary"
            >
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button
              onClick={handleJoinClick}
              className="bg-[#4CAF50] hover:bg-[#449a48] text-white shadow-sm"
              size="sm"
            >
              Join
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
