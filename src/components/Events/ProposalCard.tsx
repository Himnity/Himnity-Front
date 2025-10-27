import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { MessageCircle, Heart, Sparkles, ClipboardCheck } from "lucide-react";

interface ProposalCardProps {
  proposal: {
    id: string;
    title?: string;
    description: string;
    category?: string;
    proposedBy: string;
    proposedDate?: string;
    preferredTime?: string;
    upvotes?: number;
    supports?: number;
    preRegistrations?: number;
    comments?: Array<{
      id: string;
      author: string;
      role?: string;
      body: string;
      createdAt?: string;
    }>;
    likes?: number;
    isUpvoted?: boolean;
    isLiked?: boolean;
    isPreRegistered?: boolean;
    status?: "pending" | "adopted" | "in-progress" | "declined" | string;
    statusDetail?: string;
    avatarUrl?: string;
  };
  onLike?: (proposalId: string) => void;
  onPreRegister?: (proposalId: string) => void;
  onComment?: (proposalId: string) => void;
}

export const ProposalCard = ({ proposal, onLike, onPreRegister, onComment }: ProposalCardProps) => {
  const handleLike = () => {
    if (onLike) onLike(proposal.id);
  };

  const handlePreRegister = () => {
    if (onPreRegister) onPreRegister(proposal.id);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatStatusLabel = (status?: string) => {
    if (!status) return "";
    return status
      .split("-")
      .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
      .join(" ");
  };

  const preRegistrationCount = proposal.preRegistrations ?? proposal.supports ?? 0;
  const commentCount = Array.isArray(proposal.comments) ? proposal.comments.length : proposal.comments ?? 0;
  const likeCount = proposal.likes ?? proposal.upvotes ?? 0;
  const isLiked = proposal.isLiked ?? proposal.isUpvoted ?? false;
  const isPreRegistered = proposal.isPreRegistered ?? false;
  const statusTone = (() => {
    const normalized = proposal.status?.toLowerCase();
    if (!normalized) return "bg-amber-100 text-amber-700 border border-amber-200";
    switch (normalized) {
      case "adopted":
        return "bg-emerald-100 text-emerald-700 border border-emerald-200";
      case "in-progress":
        return "bg-sky-100 text-sky-700 border border-sky-200";
      case "pending":
        return "bg-amber-100 text-amber-700 border border-amber-200";
      case "declined":
        return "bg-rose-100 text-rose-700 border border-rose-200";
      default:
        return "bg-muted text-muted-foreground border border-border";
    }
  })();

  return (
    <Card className="relative overflow-hidden rounded-3xl border border-amber-200 bg-[#FDF8E5] p-5 shadow-sm dark:bg-slate-800 dark:border-slate-700">
      <div className="flex items-start gap-4">
        <Avatar className="h-12 w-12 border border-amber-200">
          {proposal.avatarUrl ? (
            <AvatarImage src={proposal.avatarUrl} alt={proposal.proposedBy} />
          ) : null}
          <AvatarFallback className="bg-amber-100 text-amber-700">
            {getInitials(proposal.proposedBy)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-500">
              <span className="rounded-full bg-amber-100 px-3 py-1 text-[0.65rem] font-semibold text-amber-600 dark:bg-amber-900/30 dark:text-amber-300">#Proposal</span>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-medium text-foreground">
                  {proposal.proposedBy}
                </p>
                {proposal.proposedDate && (
                  <span className="text-xs text-muted-foreground">{proposal.proposedDate}</span>
                )}
              </div>
              {proposal.category && (
                <Badge variant="outline" className="w-fit border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-700 dark:bg-amber-900/20 dark:text-amber-200">
                  {proposal.category}
                </Badge>
              )}
            </div>

            {proposal.title && (
              <h3 className="text-base font-semibold text-foreground">
                {proposal.title}
              </h3>
            )}
            <p className="text-sm leading-relaxed text-foreground">
              {proposal.description}
            </p>
          </div>

          {(proposal.status || proposal.statusDetail) && (
            <div className={`flex flex-wrap items-center gap-2 rounded-2xl px-4 py-2 text-sm shadow-sm ${statusTone} dark:bg-slate-700/40 dark:text-slate-100`}>
              <Sparkles className="h-4 w-4" />
              <div className="flex flex-col gap-1 text-left md:flex-row md:items-center md:gap-2">
                {proposal.status && (
                  <span className="font-semibold">
                    {formatStatusLabel(proposal.status)}
                  </span>
                )}
                {proposal.statusDetail && (
                  <span className="text-xs md:text-sm md:text-inherit">
                    {proposal.statusDetail}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-amber-200 pt-4">
        <Button
          size="sm"
          onClick={handlePreRegister}
          aria-pressed={isPreRegistered}
          className={cn(
            "bg-[#4CAF50] text-white shadow-sm transition hover:bg-[#449a48]",
            isPreRegistered && "bg-emerald-600 hover:bg-emerald-500"
          )}
        >
          <ClipboardCheck className="mr-2 h-4 w-4" />
          {isPreRegistered ? "Pre-registered" : "Pre-register"}
          {preRegistrationCount > 0 && ` (${preRegistrationCount})`}
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => onComment?.(proposal.id)}
          className="border-transparent bg-white/80 text-emerald-800 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50 dark:bg-slate-800/60 dark:text-emerald-300"
        >
          <MessageCircle className="mr-2 h-4 w-4" />
          Comment {commentCount > 0 && `(${commentCount})`}
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={handleLike}
          aria-pressed={isLiked}
          className={cn(
            "ml-auto gap-2 rounded-full border border-transparent px-3 py-2 text-sm font-medium text-rose-500 transition hover:bg-rose-50",
            isLiked && "bg-rose-100 text-rose-600 hover:bg-rose-100"
          )}
        >
          <Heart
            className="h-4 w-4"
            fill={isLiked ? "currentColor" : "none"}
          />
          <span>{isLiked ? "Supported" : "Support"}</span>
          {likeCount > 0 && <span className="text-xs text-muted-foreground">({likeCount})</span>}
        </Button>
      </div>
    </Card>
  );
};
