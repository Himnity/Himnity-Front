import { MouseEvent, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tag } from "@/components/ui/tag";
import { Calendar, MapPin, Users, Star, Heart, Share2, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { buildOrganizerProfilePath } from "@/lib/utils";
import defaultEventImage from "@/assets/hero-civic-community.jpg";

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
  const [isLiked, setIsLiked] = useState(event.isLiked ?? false);
  const [likesCount, setLikesCount] = useState(event.likes ?? 0);
  const organizerProfilePath = buildOrganizerProfilePath(event.organizer);

  useEffect(() => {
    setIsLiked(event.isLiked ?? false);
    setLikesCount(event.likes ?? 0);
  }, [event.id, event.isLiked, event.likes]);

  const handleJoinClick = (e: MouseEvent) => {
    e.stopPropagation();
    if (onJoin) onJoin(event.id);
  };

  const handleShareClick = (e: MouseEvent) => {
    e.stopPropagation();
    if (onShare) onShare(event);
  };

  const handleLikeClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const nextLiked = !isLiked;
    setIsLiked(nextLiked);
    setLikesCount((current) => {
      const next = (current ?? 0) + (nextLiked ? 1 : -1);
      return next < 0 ? 0 : next;
    });
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
          src={event.imageUrl || defaultEventImage}
          alt={event.title}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="badge-civic bg-card/90 text-foreground">
            {event.category}
          </Badge>
        </div>
        <div className="absolute top-3 right-3 flex items-center space-x-1 rounded-full bg-accent/90 px-2 py-1 text-white">
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
            <p className="text-sm text-muted-foreground">
              Hosted by{" "}
              <Link
                to={organizerProfilePath}
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
              >
                {event.organizer}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </p>
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
          <div className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground sm:text-sm">
            <span className="inline-flex items-center gap-1">
              <Users className="h-4 w-4 text-primary" />
              {event.participants}/{event.maxParticipants}
            </span>
            {(typeof event.likes === "number" || typeof onToggleLike === "function") && (
              <span className="inline-flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-pressed={isLiked}
                  aria-label={isLiked ? "Remove like" : "Like event"}
                  onClick={handleLikeClick}
                  className={`h-7 w-7 rounded-full transition-colors sm:h-8 sm:w-8 ${
                    isLiked
                      ? "text-rose-500 hover:text-rose-600"
                      : "text-muted-foreground hover:text-rose-500"
                  }`}
                >
                  <Heart className="h-5 w-5" fill={isLiked ? "currentColor" : "none"} />
                </Button>
                <span className="text-xs text-muted-foreground sm:text-sm">{likesCount}</span>
              </span>
            )}
            {typeof event.shares === "number" && (
              <span className="inline-flex items-center gap-1 text-xs sm:text-sm">
                <Share2 className="h-4 w-4 text-primary" />
                <span>{event.shares}</span>
              </span>
            )}
          </div>
          <div className="flex w-full items-center gap-2 sm:w-auto">
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
