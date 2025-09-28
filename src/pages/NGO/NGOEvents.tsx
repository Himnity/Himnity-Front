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
  Star
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Mock events data
const activeEvents = [
  {
    id: "e1",
    title: "Community Garden Revival",
    description: "Transform an abandoned lot into a thriving community garden for local families.",
    date: "October 15, 2025",
    time: "9:00 AM - 3:00 PM",
    location: "Downtown Community Center - 123 Main Street",
    registrations: 23,
    maxParticipants: 50,
    category: "Environment",
    status: "Active",
    qrCode: "QR-CGR-001",
    socialActivities: ["Community Lunch", "Group Photos", "Networking Session"],
    rewardPoints: 250
  },
  {
    id: "e2",
    title: "Digital Literacy Workshop",
    description: "Teach seniors how to use smartphones and stay connected with family online.",
    date: "October 18, 2025",
    time: "2:00 PM - 5:00 PM",
    location: "Central Library - Meeting Room A",
    registrations: 8,
    maxParticipants: 20,
    category: "Education",
    status: "Active",
    qrCode: "QR-DLW-002",
    socialActivities: ["Welcome Tea", "Q&A Session", "Certificate Ceremony"],
    rewardPoints: 150
  }
];

const draftEvents = [
  {
    id: "d1",
    title: "Mobile Food Pantry",
    description: "Bring healthy food to underserved neighborhoods.",
    date: "November 5, 2025",
    location: "Various locations in Tunis",
    status: "Draft",
    category: "Social Services"
  }
];

const completedEvents = [
  {
    id: "c1",
    title: "Beach Cleanup Success!",
    description: "Removed 500 lbs of trash from the coastline with 75 volunteers.",
    date: "September 28, 2025",
    location: "Sunset Beach",
    participants: 75,
    category: "Environment",
    status: "Completed",
    impact: "500 lbs of trash removed",
    rating: 4.8
  }
];

const NGOEvents = () => {
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const handleCreateEvent = () => {
    navigate("/ngo/events/create");
  };

  const handleViewQRCode = (event: any) => {
    toast.success("QR Code displayed!", {
      description: `Attendees can scan ${event.qrCode} to check in`
    });
  };

  const handleEditEvent = (eventId: string) => {
    navigate(`/ngo/events/edit/${eventId}`);
  };

  const handleViewDetails = (eventId: string) => {
    navigate(`/ngo/events/${eventId}/attendees`);
  };

  const handleViewRequests = (eventId: string) => {
    navigate(`/ngo/events/${eventId}/requests`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800 border-green-200";
      case "Draft": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Completed": return "bg-blue-100 text-blue-800 border-blue-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <NGOLayout title="Events Management">
      <div className="space-y-4 p-4">
        {/* Header Actions */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-heading font-semibold">Your Events</h2>
          <Button 
            onClick={handleCreateEvent}
            className="gradient-primary"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Event
          </Button>
        </div>

        {/* Events Tabs */}
        <Tabs defaultValue="active" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">Active ({activeEvents.length})</TabsTrigger>
            <TabsTrigger value="drafts">Drafts ({draftEvents.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedEvents.length})</TabsTrigger>
          </TabsList>

          {/* Active Events */}
          <TabsContent value="active" className="space-y-4">
            {activeEvents.map((event) => (
              <Card key={event.id} className="p-4 card-civic">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-heading font-semibold text-foreground text-lg">
                        {event.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {event.description}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant="outline">{event.category}</Badge>
                        <Badge className={getStatusColor(event.status)}>
                          {event.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 bg-accent/10 px-2 py-1 rounded-full">
                      <Star className="h-3 w-3 text-accent" />
                      <span className="text-sm font-medium">{event.rewardPoints} XP</span>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      <span>{event.registrations}/{event.maxParticipants} registered</span>
                    </div>
                  </div>

                  {/* Social Activities */}
                  <div>
                    <h4 className="font-medium text-sm text-foreground mb-2">Social Activities</h4>
                    <div className="flex flex-wrap gap-1">
                      {event.socialActivities.map((activity, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {activity}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Registration Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Registration Progress</span>
                      <span className="text-foreground">
                        {Math.round((event.registrations / event.maxParticipants) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(event.registrations / event.maxParticipants) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewRequests(event.id)}
                      className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                    >
                      <Users className="h-4 w-4 mr-1" />
                      Requests
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetails(event.id)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Attendees
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewQRCode(event)}
                    >
                      <QrCode className="h-4 w-4 mr-1" />
                      QR Code
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditEvent(event.id)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Draft Events */}
          <TabsContent value="drafts" className="space-y-4">
            {draftEvents.map((event) => (
              <Card key={event.id} className="p-4 card-civic border-dashed">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-heading font-semibold text-foreground">
                        {event.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {event.description}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant="outline">{event.category}</Badge>
                        <Badge className={getStatusColor(event.status)}>
                          {event.status}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{event.date}</span>
                    <MapPin className="h-4 w-4 ml-4" />
                    <span>{event.location}</span>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditEvent(event.id)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Continue Editing
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Completed Events */}
          <TabsContent value="completed" className="space-y-4">
            {completedEvents.map((event) => (
              <Card key={event.id} className="p-4 card-civic bg-muted/30">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-heading font-semibold text-foreground">
                        {event.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {event.description}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant="outline">{event.category}</Badge>
                        <Badge className={getStatusColor(event.status)}>
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {event.status}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      <span>{event.participants} participants</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-2 fill-current text-accent" />
                      <span>{event.rating} rating</span>
                    </div>
                  </div>

                  <div className="p-3 bg-success/10 rounded-lg">
                    <div className="font-medium text-success text-sm mb-1">Impact Achieved</div>
                    <div className="text-sm text-muted-foreground">{event.impact}</div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewDetails(event.id)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View Report
                  </Button>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </NGOLayout>
  );
};

export default NGOEvents;
