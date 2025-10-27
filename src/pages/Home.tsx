import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lightbulb, MessageSquare, Sparkles } from "lucide-react";

import { AppLayout } from "@/components/Layout/AppLayout";
import { EventCard } from "@/components/Events/EventCard";
import { ProposalCard } from "@/components/Events/ProposalCard";
import { ProposalFormDialog } from "@/components/Events/ProposalFormDialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const SectionDivider = ({ label, subtitle }: { label: string; subtitle?: string }) => (
  <div className="space-y-2 text-center">
    <div className="flex items-center gap-3">
      <div className="h-px flex-1 bg-border" />
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{label}</span>
      <div className="h-px flex-1 bg-border" />
    </div>
    {subtitle ? <p className="text-sm text-muted-foreground">{subtitle}</p> : null}
  </div>
);

const initialEvents = [
  {
    id: "1",
    title: "Community Garden Revival",
    description: "Help transform an abandoned lot into a thriving community garden for local families.",
    category: "Environment",
    organizer: "Green Future NGO",
    date: "Nov 6 • 9:00 AM",
    location: "Downtown Community Center, Tunis",
    participants: 34,
    maxParticipants: 60,
    rewardPoints: 250,
    likes: 86,
    shares: 24,
    tags: [
      { label: "Physical Activity", variant: "activity" as const },
      { label: "Outdoors", variant: "location" as const },
      { label: "Gardening", variant: "skill" as const }
    ]
  },
  {
    id: "2",
    title: "Digital Literacy Workshop",
    description: "Teach seniors how to use smartphones and stay connected with family online.",
    category: "Education",
    organizer: "TechForAll",
    date: "Nov 11 • 2:00 PM",
    location: "Central Library, Sfax",
    participants: 18,
    maxParticipants: 24,
    rewardPoints: 150,
    likes: 42,
    shares: 11,
    tags: [
      { label: "Teaching", variant: "activity" as const },
      { label: "Indoors", variant: "location" as const },
      { label: "Technology", variant: "skill" as const }
    ]
  },
  {
    id: "3",
    title: "Beach Clean-Up Sprint",
    description: "Join a fast-paced cleanup to protect our coastlines before tourist season.",
    category: "Environment",
    organizer: "BlueWave Collective",
    date: "Nov 14 • 7:30 AM",
    location: "La Marsa Beach",
    participants: 54,
    maxParticipants: 120,
    rewardPoints: 320,
    likes: 133,
    shares: 39,
    tags: [
      { label: "Outdoors", variant: "location" as const },
      { label: "Waste Reduction", variant: "skill" as const }
    ]
  },
  {
    id: "4",
    title: "Community Coding Night",
    description: "Pair up with teens to build mini apps that solve everyday neighborhood problems.",
    category: "Technology",
    organizer: "OpenSource Youth",
    date: "Nov 19 • 5:30 PM",
    location: "FabLab Ariana",
    participants: 27,
    maxParticipants: 40,
    rewardPoints: 210,
    likes: 58,
    shares: 17,
    tags: [
      { label: "Mentorship", variant: "activity" as const },
      { label: "Indoors", variant: "location" as const },
      { label: "Coding", variant: "skill" as const }
    ]
  },
  {
    id: "5",
    title: "Hope4All Family Food Weekend",
    description: "Coordinate donations and cooking circles to serve 200 warm meals for families across the medina.",
    category: "Food Security",
    organizer: "Hope4All NGO",
    date: "Nov 23 • 10:00 AM",
    location: "Maison de la Culture, Tunis Medina",
    participants: 62,
    maxParticipants: 80,
    rewardPoints: 280,
    likes: 104,
    shares: 33,
    tags: [
      { label: "Food Relief", variant: "skill" as const },
      { label: "Community", variant: "activity" as const }
    ]
  },
  {
    id: "6",
    title: "Green Commute Challenge Kickoff",
    description: "Launch bike-to-work teams with weekly coaching, safety checks, and digital badges.",
    category: "Mobility",
    organizer: "MoveForward Collective",
    date: "Nov 28 • 7:00 AM",
    location: "Habib Bourguiba Avenue, Tunis",
    participants: 88,
    maxParticipants: 150,
    rewardPoints: 340,
    likes: 119,
    shares: 41,
    tags: [
      { label: "Cycling", variant: "activity" as const },
      { label: "Outdoors", variant: "location" as const },
      { label: "Mobility", variant: "skill" as const }
    ]
  }
];

const initialProposals = [
  {
    id: "p1",
    title: "Weekend Food Donation Drive",
    description: "Let's organize a weekend food donation event for families in need across the medina.",
    category: "Food Security",
    proposedBy: "Amina Chaker",
    proposedDate: "3h ago",
    supports: 82,
  preRegistrations: 82,
    likes: 32,
  upvotes: 32,
  isLiked: false,
  isPreRegistered: false,
    status: "adopted",
    statusDetail: "Adopted by Hope4All NGO",
    comments: [
      {
        id: "p1-c1",
        author: "Hope4All NGO",
        role: "NGO",
        body: "We are mapping donation routes now. Volunteers for packaging are welcome!",
        createdAt: "1h ago"
      },
      {
        id: "p1-c2",
        author: "Salma B.",
        role: "Volunteer",
        body: "Count me in for sorting dry goods on Saturday morning.",
        createdAt: "55m ago"
      }
    ]
  },
  {
    id: "p2",
    title: "Neighborhood Repair Café",
    description: "Set up monthly repair stations so volunteers can fix appliances for free.",
    category: "Circular Economy",
    proposedBy: "Yassine Ben Salem",
    proposedDate: "Yesterday",
    supports: 47,
  preRegistrations: 47,
    likes: 21,
  upvotes: 21,
  isLiked: false,
  isPreRegistered: false,
    status: "in-progress",
    statusDetail: "Pilot with FixIt NGO starts next week",
    comments: [
      {
        id: "p2-c1",
        author: "FixIt NGO",
        role: "NGO",
        body: "We booked the community hall for Saturday. Tool donations still needed!",
        createdAt: "6h ago"
      },
      {
        id: "p2-c2",
        author: "Noura K.",
        role: "Volunteer",
        body: "I can lead a quick tutorial on rewiring lamps.",
        createdAt: "2h ago"
      }
    ]
  },
  {
    id: "p3",
    title: "Sunset Storytelling Series",
    description: "Invite elders to share inspirational stories in public parks with youth.",
    category: "Community",
    proposedBy: "Leila Ferjani",
    proposedDate: "2 days ago",
    supports: 64,
  preRegistrations: 64,
    likes: 27,
  upvotes: 27,
  isLiked: false,
  isPreRegistered: false,
    status: "pending",
    statusDetail: "Awaiting review by Heritage Voices",
    comments: [
      {
        id: "p3-c1",
        author: "Hedi R.",
        role: "Volunteer",
        body: "I can record audio stories for the NGO archive.",
        createdAt: "20h ago"
      }
    ]
  },
  {
    id: "p5",
    title: "Neighborhood Pollinator Path",
    description: "Plant flowering corridors between apartment blocks to support bees and butterflies.",
    category: "Environment",
    proposedBy: "Rania Mezri",
    proposedDate: "4 days ago",
    supports: 58,
  preRegistrations: 58,
    likes: 19,
  upvotes: 19,
  isLiked: false,
  isPreRegistered: false,
    status: "pending",
    statusDetail: "Looking for partner NGO to provide seedlings",
    comments: [
      {
        id: "p5-c1",
        author: "EcoRise Club",
        role: "NGO",
        body: "We can donate native seeds if volunteers help prep the soil.",
        createdAt: "3d ago"
      },
      {
        id: "p5-c2",
        author: "Karim D.",
        role: "Volunteer",
        body: "I have spare planters we could reuse along the alley.",
        createdAt: "1d ago"
      }
    ]
  }
];

type CommunityEvent = (typeof initialEvents)[number];
type CommunityProposal = (typeof initialProposals)[number];

type FeedMixItem =
  | { type: "event"; item: CommunityEvent }
  | { type: "proposal"; item: CommunityProposal };

const Home = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState(initialEvents);
  const [proposals, setProposals] = useState(initialProposals);
  const [isProposalDialogOpen, setIsProposalDialogOpen] = useState(false);
  const [activeFeedFilter, setActiveFeedFilter] = useState<"all" | "events" | "proposals">("all");
  const [commentDialog, setCommentDialog] = useState<{ open: boolean; proposal: CommunityProposal | null }>({
    open: false,
    proposal: null
  });

  const proposalsSectionRef = useRef<HTMLDivElement | null>(null);

  const handleJoinEvent = (_eventId: string) => {
    toast.success("You joined the event!", {
      description: "We'll remind you a day before it starts."
    });
  };

  const handleEventClick = (eventId: string) => {
    navigate(`/event/${eventId}`);
  };

  const handleProposeIdea = () => {
    setIsProposalDialogOpen(true);
  };

  const handleToggleLikeProposal = (proposalId: string) => {
    const current = proposals.find((proposal) => proposal.id === proposalId);
    const wasLiked = current?.isLiked ?? false;

    setProposals((previous) =>
      previous.map((proposal) => {
        if (proposal.id !== proposalId) return proposal;
        const alreadyLiked = proposal.isLiked ?? false;
        const baseLikes = proposal.likes ?? proposal.upvotes ?? 0;
        const nextLikes = alreadyLiked ? Math.max(0, baseLikes - 1) : baseLikes + 1;
        return {
          ...proposal,
          likes: nextLikes,
          upvotes: nextLikes,
          isLiked: !alreadyLiked
        };
      })
    );

    toast.success(wasLiked ? "Support withdrawn" : "Support added", {
      description: wasLiked
        ? "Momentum adjusted. You can always cheer it on again."
        : "Thanks for cheering on this idea!"
    });
  };

  const handleTogglePreRegisterProposal = (proposalId: string) => {
    const current = proposals.find((proposal) => proposal.id === proposalId);
    const wasPreRegistered = current?.isPreRegistered ?? false;

    setProposals((previous) =>
      previous.map((proposal) => {
        if (proposal.id !== proposalId) return proposal;
        const alreadyRegistered = proposal.isPreRegistered ?? false;
        const baseCount = proposal.preRegistrations ?? proposal.supports ?? 0;
        const nextCount = alreadyRegistered ? Math.max(0, baseCount - 1) : baseCount + 1;
        return {
          ...proposal,
          preRegistrations: nextCount,
          supports: nextCount,
          isPreRegistered: !alreadyRegistered
        };
      })
    );

    toast.success(wasPreRegistered ? "Pre-registration canceled" : "Pre-registered", {
      description: wasPreRegistered
        ? "Spot released. Jump back in any time."
        : "Amazing! We'll share DIY details if the community self-organises."
    });
  };

  const handleOpenComments = (proposalId: string) => {
    const currentProposal = proposals.find((proposal) => proposal.id === proposalId) ?? null;
    setCommentDialog({ open: true, proposal: currentProposal });
  };

  const handleCloseComments = () => {
    setCommentDialog({ open: false, proposal: null });
  };

  const handleSubmitComment = (proposalId: string, message: string) => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      return;
    }

    const newComment = {
      id:
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `comment-${Date.now()}`,
      author: "You",
      role: "Volunteer",
      body: trimmedMessage,
      createdAt: "just now"
    } satisfies CommunityProposal["comments"][number];

    setProposals((previous) => {
      const updated = previous.map((proposal) =>
        proposal.id === proposalId
          ? { ...proposal, comments: [...proposal.comments, newComment] }
          : proposal
      );

      const refreshedProposal = updated.find((proposal) => proposal.id === proposalId) ?? null;
      setCommentDialog((current) =>
        current.proposal?.id === proposalId ? { open: true, proposal: refreshedProposal } : current
      );

      return updated;
    });

    toast.success("Comment posted", {
      description: "Thanks for keeping the idea moving forward."
    });
  };

  const handleShareEvent = async (event: CommunityEvent) => {
    const isBrowser = typeof window !== "undefined";
    const shareUrl = isBrowser ? `${window.location.origin}/event/${event.id}` : `/event/${event.id}`;
    const sharePayload = {
      title: event.title,
      text: event.description,
      url: shareUrl
    };

    let sharedSuccessfully = false;

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(sharePayload);
        toast.success("Shared with your network!", {
          description: "Spread the word so more neighbors can join."
        });
        sharedSuccessfully = true;
      } catch (error) {
        if ((error as DOMException)?.name === "AbortError") {
          return;
        }
      }
    }

    if (!sharedSuccessfully && typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        toast.success("Link copied", {
          description: "Paste it anywhere to invite others."
        });
        sharedSuccessfully = true;
      } catch {
        // ignore and fall through to error toast
      }
    }

    if (sharedSuccessfully) {
      setEvents((previous) =>
        previous.map((item) =>
          item.id === event.id ? { ...item, shares: (item.shares ?? 0) + 1 } : item
        )
      );
    } else {
      toast.error("Unable to share", {
        description: "Try copying the event link manually."
      });
    }
  };

  const handleSeeProposals = () => {
    if (activeFeedFilter !== "proposals") {
      setActiveFeedFilter("proposals");
      return;
    }

    if (proposalsSectionRef.current) {
      proposalsSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    if (activeFeedFilter === "proposals" && proposalsSectionRef.current) {
      proposalsSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [activeFeedFilter]);

  const filterOptions: Array<{ label: string; value: "all" | "events" | "proposals" }> = [
    { label: "All", value: "all" },
    { label: "Events", value: "events" },
    { label: "Proposals", value: "proposals" }
  ];

  const visibleProposals = proposals.filter((proposal) => proposal.status?.toLowerCase() !== "adopted");

  const topEvents = events.slice(0, 2);
  const additionalEvents = events.slice(2);
  const topProposals = visibleProposals.slice(0, 3);
  const additionalProposals = visibleProposals.slice(3);

  const eventsToShow = activeFeedFilter === "events" ? events : topEvents;
  const proposalsToShow = activeFeedFilter === "proposals" ? visibleProposals : topProposals;

  const interestMix: FeedMixItem[] = (() => {
    const mix: FeedMixItem[] = [];
    const longest = Math.max(additionalEvents.length, additionalProposals.length);
    for (let index = 0; index < longest; index += 1) {
      if (additionalEvents[index]) {
        mix.push({ type: "event", item: additionalEvents[index] });
      }
      if (additionalProposals[index]) {
        mix.push({ type: "proposal", item: additionalProposals[index] });
      }
    }
    return mix;
  })();

  return (
    <AppLayout>
      <div className="container space-y-10 px-4 py-6 md:px-0">
        <section>
          <Card className="rounded-3xl border border-emerald-200 bg-[#F9FAF6] p-6 shadow-sm dark:bg-slate-900 dark:border-emerald-700 dark:text-slate-100">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="flex items-center gap-3 md:flex-1">
                  <Avatar className="h-12 w-12 border border-emerald-200">
                    <AvatarFallback className="bg-emerald-100 text-emerald-700">U</AvatarFallback>
                  </Avatar>
                  <button
                    type="button"
                    onClick={handleProposeIdea}
                    className="flex w-full items-center justify-between rounded-2xl border border-emerald-200 bg-white px-5 py-3 text-left text-sm text-muted-foreground shadow-sm transition hover:border-emerald-300 hover:text-emerald-700 md:w-4/5"
                  >
                    <span>What&apos;s your idea today?</span>
                    <Lightbulb className="h-5 w-5 text-emerald-500" />
                  </button>
                </div>
                <p className="text-sm text-muted-foreground md:max-w-sm">
                  Share a quick proposal and discover how others are sparking real community impact this week.
                </p>
              </div>

              <div className="border-t border-emerald-100" />

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-500">Quick links</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={handleSeeProposals}
                    className="rounded-full border-emerald-200 bg-white text-emerald-700 hover:bg-emerald-50"
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    See other proposals
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    onClick={handleProposeIdea}
                    className="rounded-full bg-[#F7B500] text-white shadow-sm hover:bg-[#e6a400]"
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Start new idea
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </section>

        <section className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Discover community action</h2>
              <p className="text-sm text-muted-foreground">A smart blend of events and proposals tailored to your interests.</p>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-muted/60 p-1">
              {filterOptions.map((option) => (
                <Button
                  key={option.value}
                  type="button"
                  size="sm"
                  variant="ghost"
                  aria-pressed={activeFeedFilter === option.value}
                  onClick={() => setActiveFeedFilter(option.value)}
                  className={`rounded-full px-4 ${
                    activeFeedFilter === option.value
                      ? "bg-[#4CAF50] text-white shadow-sm hover:bg-[#449a48]"
                      : "text-muted-foreground hover:bg-white"
                  }`}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-10">
            {activeFeedFilter !== "proposals" && (
              <div className="space-y-4">
                <SectionDivider label="Recommended Events" subtitle="Volunteer opportunities with strong community demand." />
                <div className="space-y-4">
                  {eventsToShow.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onJoin={handleJoinEvent}
                      onEventClick={handleEventClick}
                      onShare={handleShareEvent}
                    />
                  ))}
                </div>
              </div>
            )}

            {activeFeedFilter !== "events" && (
              <div ref={proposalsSectionRef} className="space-y-4">
                <SectionDivider label="New Proposals" subtitle="Fresh ideas from neighbors and NGOs." />
                <div className="space-y-4">
                  {proposalsToShow.length > 0 ? (
                    proposalsToShow.map((proposal) => (
                      <ProposalCard
                        key={proposal.id}
                        proposal={proposal}
                        onLike={handleToggleLikeProposal}
                        onPreRegister={handleTogglePreRegisterProposal}
                        onComment={handleOpenComments}
                      />
                    ))
                  ) : (
                    <Card className="rounded-2xl border border-dashed border-emerald-200 bg-white/60 p-6 text-center text-sm text-muted-foreground">
                      All shared ideas are now live events. Explore the event feed to join what&apos;s next.
                    </Card>
                  )}
                </div>
              </div>
            )}

            {activeFeedFilter === "all" && interestMix.length > 0 && (
              <div className="space-y-4">
                <SectionDivider label="Based on your interests" subtitle="A curated mix to keep your momentum going." />
                <div className="space-y-4">
                  {interestMix.map((item) =>
                    item.type === "event" ? (
                      <EventCard
                        key={`mix-event-${item.item.id}`}
                        event={item.item}
                        onJoin={handleJoinEvent}
                        onEventClick={handleEventClick}
                        onShare={handleShareEvent}
                      />
                    ) : (
                      <ProposalCard
                        key={`mix-proposal-${item.item.id}`}
                        proposal={item.item}
                        onLike={handleToggleLikeProposal}
                        onPreRegister={handleTogglePreRegisterProposal}
                        onComment={handleOpenComments}
                      />
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
      {/* Comment dialog for proposals */}
      <Dialog open={commentDialog.open} onOpenChange={(open) => setCommentDialog({ open, proposal: open ? commentDialog.proposal : null })}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-white text-gray-900 border shadow-lg dark:bg-slate-900 dark:text-slate-100">
          <DialogHeader>
            <DialogTitle className="text-lg">Discussion</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {!commentDialog.proposal ? (
              <p className="text-sm text-muted-foreground">No proposal selected.</p>
            ) : (
              <div>
                <h3 className="text-base font-semibold">{commentDialog.proposal.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">by {commentDialog.proposal.proposedBy}</p>

                <div className="space-y-3">
                  {Array.isArray(commentDialog.proposal.comments) && commentDialog.proposal.comments.length > 0 ? (
                    commentDialog.proposal.comments.map((c) => (
                      <div key={c.id} className="rounded-lg border border-border p-3 bg-white dark:bg-slate-800">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium">{c.author} <span className="text-xs text-muted-foreground">{c.role}</span></div>
                          <div className="text-xs text-muted-foreground">{c.createdAt}</div>
                        </div>
                        <div className="text-sm text-muted-foreground mt-2">{c.body}</div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No comments yet — be the first to start the discussion.</p>
                  )}
                </div>

                <div className="mt-4">
                  <Textarea id="comment-input" placeholder="Write a supportive comment or suggestion..." />
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <div className="flex w-full justify-between">
              <Button variant="ghost" onClick={() => setCommentDialog({ open: false, proposal: null })}>Close</Button>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => {
                    const el = document.getElementById("comment-input") as HTMLTextAreaElement | null;
                    if (!commentDialog.proposal || !el) return;
                    handleSubmitComment(commentDialog.proposal.id, el.value);
                    el.value = "";
                  }}
                >
                  Post comment
                </Button>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ProposalFormDialog open={isProposalDialogOpen} onOpenChange={setIsProposalDialogOpen} />
    </AppLayout>
  );
};

export default Home;
