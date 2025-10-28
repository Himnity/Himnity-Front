import { NGOLayout } from "@/components/Layout/NGOLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  MapPin,
  Users,
  Plus,
  QrCode,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  Clock,
  Star,
  Share2,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import communityGardenImage from "@/assets/community-gardens.jpeg";
import digitalLiteracyImage from "@/assets/DigitalLiteracyWorkshop.jpg";
import foodForFamiliesImage from "@/assets/food4fams.jpg";
import beachCleanupImage from "@/assets/clean-up-party.jpg";

type EventStatus = "live" | "scheduled" | "draft" | "completed";

interface NGOEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time?: string;
  location: string;
  status: EventStatus;
  coverImage?: string;
  category: string;
  rewardPoints?: number;
  requestsPending?: number;
  volunteersCheckedIn?: number;
  totalRegistrations?: number;
  capacity?: number;
  qrCode?: string;
  socialActivities?: string[];
  impactSummary?: string;
  rating?: number;
  stageNotes?: string;
}

const events: NGOEvent[] = [
  {
    id: "e1",
    title: "Community Garden Revival",
    description:
      "Volunteers are rebuilding raised beds, setting up drip irrigation, and welcoming new families to the space.",
    date: "October 15, 2025",
    time: "9:00 AM – 3:00 PM",
    location: "Downtown Community Center — 123 Main Street",
    status: "live",
    coverImage: communityGardenImage,
    category: "Environment",
    rewardPoints: 250,
    requestsPending: 4,
    volunteersCheckedIn: 12,
    totalRegistrations: 36,
    capacity: 50,
    qrCode: "QR-CGR-001",
    socialActivities: ["Community Lunch", "Group Photos", "Seed Swap"]
  },
  {
    id: "e2",
    title: "Digital Literacy Workshop",
    description:
      "Teach seniors how to stay safe online, manage messaging apps, and video-call their families.",
    date: "October 18, 2025",
    time: "2:00 PM – 5:00 PM",
    location: "Central Library — Innovation Lab",
    status: "scheduled",
    coverImage: digitalLiteracyImage,
    category: "Education",
    rewardPoints: 150,
    requestsPending: 7,
    totalRegistrations: 18,
    capacity: 24,
    socialActivities: ["Welcome Tea", "Mentor Pairing", "Certificate Ceremony"],
    stageNotes: "Review mentor assignments and send reminder email Friday morning."
  },
  {
    id: "d1",
    title: "Mobile Food Pantry",
    description: "Bring healthy groceries to three underserved neighborhoods in one afternoon run.",
    date: "November 5, 2025",
    location: "El Menzah ➔ Bab Souika ➔ La Goulette",
    status: "draft",
    coverImage: foodForFamiliesImage,
    category: "Social Services",
    stageNotes: "Waiting on route confirmation from partner municipality."
  },
  {
    id: "c1",
    title: "Beach Cleanup Sprint",
    description: "Removed microplastics and fishing debris with 75 volunteers across 2 km of shoreline.",
    date: "September 28, 2025",
    time: "7:30 AM – 12:30 PM",
    location: "La Marsa Beach",
    status: "completed",
    coverImage: beachCleanupImage,
    category: "Environment",
    rewardPoints: 320,
    volunteersCheckedIn: 75,
    totalRegistrations: 82,
    capacity: 90,
    impactSummary: "Collected 520 kg of waste and catalogued 312 pieces of plastic for research partners.",
    rating: 4.8
  }
];

const statusBadgeStyles: Record<EventStatus, string> = {
  live: "bg-emerald-600 text-white",
  scheduled: "bg-amber-100 text-amber-900 border border-amber-200",
  draft: "bg-muted text-muted-foreground",
  completed: "bg-sky-100 text-sky-900 border border-sky-200"
};

const NGOEvents = () => {
  const navigate = useNavigate();

  const liveEvents = events.filter((event) => event.status === "live");
  const scheduledEvents = events.filter((event) => event.status === "scheduled");
  const draftEvents = events.filter((event) => event.status === "draft");
  const completedEvents = events.filter((event) => event.status === "completed");

  const handleCreateEvent = () => {
    navigate("/ngo/events/create");
  };

  const handleEditEvent = (eventId: string) => {
    navigate(`/ngo/events/edit/${eventId}`);
  };

  const handleViewRequests = (eventId: string) => {
    navigate(`/ngo/events/${eventId}/requests`);
  };

  const handleViewAttendance = (event: NGOEvent) => {
    if (event.status !== "live") {
      toast.info("Attendance opens once the event is live", {
        description: "Tap ‘Start event’ from your run sheet to unlock the attendance board."
      });
      return;
    }
    navigate(`/ngo/events/${event.id}/attendees`);
  };

  const handleShowQRCode = (event: NGOEvent) => {
    if (event.status !== "live") {
      toast.info("QR check-in unlocks on the day", {
        description: "Activate the event to display the live QR code for volunteers."
      });
      return;
    }
    toast.success("QR code ready for check-in", {
      description: `Ask volunteers to scan ${event.qrCode} at the welcome desk.`
    });
  };

  const handlePromoteEvent = (event: NGOEvent) => {
    toast.success("Promotion draft created", {
      description: `We prepared a shareable update for ${event.title}. You can tweak it before posting.`
    });
  };

  const handleDeleteDraft = (eventId: string) => {
    toast.info("Draft removed", {
      description: "The event stays archived in case you need to restore it later."
    });
  };

  return (
    <NGOLayout title="Events Management">
      <div className="container space-y-6 px-4 py-6 md:px-0">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-heading font-semibold text-foreground">Your Events</h2>
            <p className="text-sm text-muted-foreground">
              Track live operations, upcoming launches, and drafts from one place.
            </p>
          </div>
          <Button onClick={handleCreateEvent} className="gradient-primary">
            <Plus className="mr-2 h-4 w-4" /> Create Event
          </Button>
        </div>

        <Tabs defaultValue="live" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="live">Live ({liveEvents.length})</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled ({scheduledEvents.length})</TabsTrigger>
            <TabsTrigger value="drafts">Drafts ({draftEvents.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedEvents.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="live" className="space-y-4">
            {liveEvents.length === 0 ? (
              <Card className="card-civic flex items-center gap-3 border-dashed p-6">
                <AlertCircle className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">No event is live right now.</p>
                  <p className="text-sm text-muted-foreground">
                    Mark your next scheduled event as live to unlock real-time attendance tools.
                  </p>
                </div>
              </Card>
            ) : (
              liveEvents.map((event) => (
                <Card key={event.id} className="card-civic overflow-hidden p-0">
                  {event.coverImage ? (
                    <div className="relative h-48 w-full overflow-hidden">
                      <img
                        src={event.coverImage}
                        alt={event.title}
                        className="h-full w-full object-cover"
                      />
                      <Badge className={`absolute left-4 top-4 flex items-center gap-1 ${statusBadgeStyles[event.status]}`}>
                        <CheckCircle className="h-3 w-3" /> Live Now
                      </Badge>
                    </div>
                  ) : null}
                  <div className="space-y-4 p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{event.category}</Badge>
                          <span className="text-xs uppercase tracking-wide text-muted-foreground">
                            {event.time}
                          </span>
                        </div>
                        <h3 className="text-xl font-heading font-semibold text-foreground">
                          {event.title}
                        </h3>
                        <p className="text-sm text-muted-foreground max-w-3xl">
                          {event.description}
                        </p>
                      </div>
                      <div className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                        <Star className="mr-1 inline h-4 w-4" />
                        {event.rewardPoints} XP
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                      <div>
                        <p className="text-xs uppercase text-muted-foreground">Requests waiting</p>
                        <p className="text-lg font-semibold text-foreground">{event.requestsPending ?? 0}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase text-muted-foreground">Checked in</p>
                        <p className="text-lg font-semibold text-foreground">
                          {event.volunteersCheckedIn ?? 0}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs uppercase text-muted-foreground">Registrations</p>
                        <p className="text-lg font-semibold text-foreground">
                          {event.totalRegistrations ?? 0}/{event.capacity ?? 0}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs uppercase text-muted-foreground">Location</p>
                        <p className="text-sm text-foreground flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span className="line-clamp-2">{event.location}</span>
                        </p>
                      </div>
                    </div>

                    {event.socialActivities && event.socialActivities.length > 0 ? (
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-foreground">Social touches today</h4>
                        <div className="flex flex-wrap gap-2">
                          {event.socialActivities.map((activity) => (
                            <Badge key={activity} variant="secondary" className="rounded-full text-xs">
                              {activity}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        onClick={() => handleViewRequests(event.id)}
                        className="border-blue-200 text-blue-700 hover:bg-blue-50"
                      >
                        <Users className="mr-2 h-4 w-4" /> Manage Requests
                      </Button>
                      <Button onClick={() => handleViewAttendance(event)}>
                        <Eye className="mr-2 h-4 w-4" /> Open Attendance Board
                      </Button>
                      <Button variant="outline" onClick={() => handleShowQRCode(event)}>
                        <QrCode className="mr-2 h-4 w-4" /> Show QR Check-in
                      </Button>
                      <Button variant="ghost" onClick={() => handlePromoteEvent(event)}>
                        <Share2 className="mr-2 h-4 w-4" /> Share Update
                      </Button>
                      <Button variant="outline" onClick={() => handleEditEvent(event.id)}>
                        <Edit className="mr-2 h-4 w-4" /> Edit Details
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="scheduled" className="space-y-4">
            {scheduledEvents.length === 0 ? (
              <Card className="card-civic border-dashed p-6 text-sm text-muted-foreground">
                You don’t have upcoming events yet. Draft an idea or adopt a community proposal to get started.
              </Card>
            ) : (
              scheduledEvents.map((event) => (
                <Card key={event.id} className="card-civic overflow-hidden p-0 md:flex">
                  {event.coverImage ? (
                    <div className="relative h-48 w-full md:h-auto md:w-1/3">
                      <img
                        src={event.coverImage}
                        alt={event.title}
                        className="h-full w-full object-cover"
                      />
                      <Badge className={`absolute left-4 top-4 ${statusBadgeStyles[event.status]}`}>
                        Scheduled
                      </Badge>
                    </div>
                  ) : null}
                  <div className="flex-1 space-y-4 p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="space-y-1">
                        <Badge variant="outline">{event.category}</Badge>
                        <h3 className="text-lg font-heading font-semibold text-foreground">
                          {event.title}
                        </h3>
                        <p className="text-sm text-muted-foreground max-w-2xl">
                          {event.description}
                        </p>
                      </div>
                      {event.rewardPoints ? (
                        <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                          Reward: {event.rewardPoints} XP
                        </span>
                      ) : null}
                    </div>

                    <div className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                      <span className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" /> {event.date}
                      </span>
                      {event.time ? (
                        <span className="flex items-center gap-2">
                          <Clock className="h-4 w-4" /> {event.time}
                        </span>
                      ) : null}
                      <span className="flex items-center gap-2 sm:col-span-2">
                        <MapPin className="h-4 w-4" />
                        <span className="line-clamp-2">{event.location}</span>
                      </span>
                    </div>

                    {event.socialActivities && event.socialActivities.length ? (
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-foreground">Enhance the experience</h4>
                        <div className="flex flex-wrap gap-2">
                          {event.socialActivities.map((activity) => (
                            <Badge key={activity} variant="secondary" className="rounded-full text-xs">
                              {activity}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    {event.stageNotes ? (
                      <div className="rounded-lg border border-dashed border-amber-200 bg-amber-50/60 p-3 text-sm text-amber-900">
                        {event.stageNotes}
                      </div>
                    ) : null}

                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        onClick={() => handleViewRequests(event.id)}
                        className="border-blue-200 text-blue-700 hover:bg-blue-50"
                      >
                        <Users className="mr-2 h-4 w-4" /> Review Requests
                      </Button>
                      <Button variant="ghost" onClick={() => handlePromoteEvent(event)}>
                        <Share2 className="mr-2 h-4 w-4" /> Draft Announcement
                      </Button>
                      <Button variant="outline" disabled>
                        <Eye className="mr-2 h-4 w-4" /> Attendance (locks until live)
                      </Button>
                      <Button variant="outline" onClick={() => handleEditEvent(event.id)}>
                        <Edit className="mr-2 h-4 w-4" /> Edit Details
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Mark the event as live from your run sheet when doors open to enable QR check-in and attendance tracking.
                    </p>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="drafts" className="space-y-4">
            {draftEvents.length === 0 ? (
              <Card className="card-civic border-dashed p-6 text-sm text-muted-foreground">
                No drafts yet. Save an idea in progress and come back when you’re ready to publish.
              </Card>
            ) : (
              draftEvents.map((event) => (
                <Card key={event.id} className="card-civic border border-dashed border-border/70 p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{event.category}</Badge>
                        <Badge className={statusBadgeStyles[event.status]}>Draft</Badge>
                      </div>
                      <h3 className="text-lg font-heading font-semibold text-foreground">{event.title}</h3>
                      <p className="text-sm text-muted-foreground max-w-2xl">{event.description}</p>
                      <p className="text-xs text-muted-foreground">Proposed route: {event.location}</p>
                      {event.stageNotes ? (
                        <p className="text-xs text-muted-foreground">Next step: {event.stageNotes}</p>
                      ) : null}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" onClick={() => handleEditEvent(event.id)}>
                        <Edit className="mr-2 h-4 w-4" /> Continue Editing
                      </Button>
                      <Button
                        variant="outline"
                        className="border-red-200 text-red-600 hover:bg-red-50"
                        onClick={() => handleDeleteDraft(event.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Delete Draft
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedEvents.length === 0 ? (
              <Card className="card-civic border-dashed p-6 text-sm text-muted-foreground">
                Completed events will appear here when you wrap a project and publish the report.
              </Card>
            ) : (
              completedEvents.map((event) => (
                <Card key={event.id} className="card-civic overflow-hidden bg-muted/40 p-0">
                  {event.coverImage ? (
                    <div className="h-40 w-full overflow-hidden">
                      <img
                        src={event.coverImage}
                        alt={event.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : null}
                  <div className="space-y-4 p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{event.category}</Badge>
                          <Badge className={statusBadgeStyles[event.status]}>
                            <CheckCircle className="mr-1 h-3 w-3" /> Completed
                          </Badge>
                        </div>
                        <h3 className="text-lg font-heading font-semibold text-foreground">
                          {event.title}
                        </h3>
                        <p className="text-sm text-muted-foreground max-w-2xl">
                          {event.description}
                        </p>
                      </div>
                      {event.rating ? (
                        <div className="rounded-full bg-white px-3 py-1 text-sm font-medium text-accent shadow-sm">
                          <Star className="mr-1 inline h-4 w-4" /> {event.rating}
                        </div>
                      ) : null}
                    </div>

                    <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                      <span className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" /> {event.date}
                      </span>
                      {event.time ? (
                        <span className="flex items-center gap-2">
                          <Clock className="h-4 w-4" /> {event.time}
                        </span>
                      ) : null}
                      <span className="flex items-center gap-2">
                        <Users className="h-4 w-4" /> Volunteers: {event.volunteersCheckedIn ?? 0}
                      </span>
                      <span className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" /> {event.location}
                      </span>
                      <span className="flex items-center gap-2 sm:col-span-2">
                        <CheckCircle className="h-4 w-4 text-success" /> Impact: {event.impactSummary}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" onClick={() => navigate(`/ngo/events/${event.id}/attendees`)}>
                        <Eye className="mr-2 h-4 w-4" /> View Report
                      </Button>
                      <Button variant="outline">
                        <Users className="mr-2 h-4 w-4" /> Export Attendance CSV
                      </Button>
                      <Button variant="ghost" onClick={() => handlePromoteEvent(event)}>
                        <Share2 className="mr-2 h-4 w-4" /> Share Highlights
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </NGOLayout>
  );
};

export default NGOEvents;
