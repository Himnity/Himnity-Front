import { NGOLayout } from "@/components/Layout/NGOLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  QrCode,
  Users,
  Download,
  Search,
  Filter,
  CheckCircle,
  Clock,
  Calendar,
  MapPin,
  Smartphone,
  ArrowLeft,
  X,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";

// Mock events data
const eventsData = {
  "e1": {
    id: "e1",
    title: "Community Garden Revival",
    date: "October 15, 2025",
    time: "9:00 AM - 3:00 PM",
    location: "Downtown Community Center",
    qrCode: "QR-CGR-001",
    totalRegistrations: 23,
    checkedInCount: 8,
  status: "live"
  },
  "e2": {
    id: "e2",
    title: "Digital Literacy Workshop",
    date: "October 18, 2025",
    time: "2:00 PM - 5:00 PM",
    location: "Central Library",
    qrCode: "QR-DLW-002",
    totalRegistrations: 15,
    checkedInCount: 12,
  status: "scheduled"
  },
  "c1": {
    id: "c1",
    title: "Beach Cleanup Success!",
    date: "September 28, 2025",
    time: "9:00 AM - 2:00 PM",
    location: "Sunset Beach",
    qrCode: "QR-BCS-003",
    totalRegistrations: 75,
    checkedInCount: 75,
  status: "completed"
  }
};

// Mock attendees data by event
const attendeesData = {
  "e1": [
    {
      id: "u1",
      name: "Ahmed Ben Ali",
      email: "ahmed.benali@email.com",
      registrationDate: "Oct 10, 2025",
      checkedIn: true,
      checkInTime: "9:15 AM",
      avatar: "/placeholder.svg"
    },
    {
      id: "u2",
      name: "Fatima Zahra",
      email: "fatima.zahra@email.com",
      registrationDate: "Oct 8, 2025",
      checkedIn: true,
      checkInTime: "9:08 AM",
      avatar: "/placeholder.svg"
    },
    {
      id: "u4",
      name: "Amina Hassan",
      email: "amina.hassan@email.com",
      registrationDate: "Oct 9, 2025",
      checkedIn: false,
      checkInTime: null,
      avatar: "/placeholder.svg"
    },
    {
      id: "u5",
      name: "Youssef Mahmoud",
      email: "youssef.mahmoud@email.com",
      registrationDate: "Oct 13, 2025",
      checkedIn: false,
      checkInTime: null,
      avatar: "/placeholder.svg"
    }
  ],
  "e2": [
    {
      id: "u6",
      name: "Sarah Ahmed",
      email: "sarah.ahmed@email.com",
      registrationDate: "Oct 15, 2025",
      checkedIn: true,
      checkInTime: "2:05 PM",
      avatar: "/placeholder.svg"
    },
    {
      id: "u7",
      name: "Omar Khedri",
      email: "omar.khedri@email.com",
      registrationDate: "Oct 14, 2025",
      checkedIn: false,
      checkInTime: null,
      avatar: "/placeholder.svg"
    }
  ],
  "c1": [
    {
      id: "u8",
      name: "Leila Mansouri",
      email: "leila.mansouri@email.com",
      registrationDate: "Sep 25, 2025",
      checkedIn: true,
      checkInTime: "9:00 AM",
      avatar: "/placeholder.svg"
    },
    {
      id: "u9",
      name: "Karim Bouaziz",
      email: "karim.bouaziz@email.com",
      registrationDate: "Sep 24, 2025",
      checkedIn: true,
      checkInTime: "9:10 AM",
      avatar: "/placeholder.svg"
    }
  ]
};

const NGOAttendees = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showQRCode, setShowQRCode] = useState(false);
  const [attendees, setAttendees] = useState(attendeesData[id as keyof typeof attendeesData] || []);

  // Get event data
  const eventData = eventsData[id as keyof typeof eventsData];
  
  if (!eventData) {
    return (
      <NGOLayout title="Event Not Found">
        <div className="p-4">
          <Card className="p-6 text-center">
            <h2 className="text-lg font-semibold mb-2">Event Not Found</h2>
            <p className="text-muted-foreground mb-4">The event you're looking for doesn't exist.</p>
            <Button onClick={() => navigate("/ngo/events")}>Back to Events</Button>
          </Card>
        </div>
      </NGOLayout>
    );
  }

  const filteredAttendees = attendees.filter(attendee =>
    attendee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    attendee.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const checkedInAttendees = filteredAttendees.filter((attendee) => attendee.checkedIn);
  const noShowAttendees = filteredAttendees.filter((attendee) => !attendee.checkedIn);
  const isEventLive = eventData.status === "live";
  const isEventCompleted = eventData.status === "completed";

  const handleDownloadList = () => {
    toast.success("Attendance list downloaded!");
  };

  const handleShowQRCode = () => {
    if (!isEventLive) {
      toast.info("QR code unlocks once the event is live", {
        description: "Mark the event as live from your run sheet to display the check-in code."
      });
      return;
    }
    setShowQRCode(true);
  };

  // Manual check-in for an existing attendee
  const handleCheckIn = (attendeeId: string) => {
    setAttendees((prev) => {
      const updated = prev.map((a) => {
        if (a.id === attendeeId) {
          return {
            ...a,
            checkedIn: true,
            checkInTime: format(new Date(), "h:mm a"),
          };
        }
        return a;
      });
      toast.success("Attendee checked in");
      return updated;
    });
  };

  const handleUndoCheckIn = (attendeeId: string) => {
    setAttendees((prev) => {
      const updated = prev.map((a) => {
        if (a.id === attendeeId) {
          return {
            ...a,
            checkedIn: false,
            checkInTime: null,
          };
        }
        return a;
      });
      toast.success("Check-in reverted");
      return updated;
    });
  };

  const statusBadge = () => {
    switch (eventData.status) {
      case "live":
        return {
          label: "Live",
          className: "bg-emerald-600 text-white"
        };
      case "scheduled":
        return {
          label: "Scheduled",
          className: "bg-amber-100 text-amber-900 border border-amber-200"
        };
      case "completed":
        return {
          label: "Completed",
          className: "bg-sky-100 text-sky-900 border border-sky-200"
        };
      default:
        return {
          label: eventData.status,
          className: "bg-muted text-muted-foreground"
        };
    }
  };

  // Real QR Code component using a simple pattern
  const QRCodeDisplay = () => (
    <div className="flex flex-col items-center space-y-4 p-6">
      <div className="w-48 h-48 bg-white border-2 border-border rounded-lg p-2">
        <div className="w-full h-full grid grid-cols-21 gap-px bg-black">
          {/* Simple QR-like pattern */}
          {Array.from({ length: 441 }, (_, i) => {
            const row = Math.floor(i / 21);
            const col = i % 21;
            const isBlack = (row + col + Math.sin(row * 0.5) * 5 + Math.cos(col * 0.3) * 3) % 2 < 1;
            return (
              <div
                key={i}
                className={`aspect-square ${isBlack ? 'bg-black' : 'bg-white'}`}
              />
            );
          })}
        </div>
      </div>
      <div className="text-center">
        <p className="font-medium">Event Check-in QR Code</p>
        <p className="text-sm text-muted-foreground">Code: {eventData.qrCode}</p>
        <p className="text-xs text-muted-foreground mt-2">
          Attendees scan this code to check in
        </p>
      </div>
    </div>
  );

  return (
    <NGOLayout title="Event Attendees">
      <div className="container space-y-6 px-4 py-6 md:px-0">
        {/* Back Button and Header */}
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate("/ngo/events")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-lg font-heading font-semibold">Event Attendees</h2>
        </div>

        {/* Event Header */}
        <Card className="p-4 card-civic">
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-heading font-semibold text-foreground">
                  {eventData.title}
                </h3>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{eventData.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{eventData.time}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{eventData.location}</span>
                  </div>
                </div>
              </div>
              <Badge className={`${statusBadge().className} flex items-center gap-1`}>
                <CheckCircle className="h-3 w-3" />
                {statusBadge().label}
              </Badge>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-3 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{attendees.length}</div>
                <div className="text-sm text-muted-foreground">Registered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{checkedInAttendees.length}</div>
                <div className="text-sm text-muted-foreground">Checked In</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-muted-foreground">
                  {noShowAttendees.length}
                </div>
                <div className="text-sm text-muted-foreground">No Show</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">
                  {attendees.length > 0 ? Math.round((checkedInAttendees.length / attendees.length) * 100) : 0}%
                </div>
                <div className="text-sm text-muted-foreground">Attendance</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <Button 
            onClick={handleShowQRCode} 
            className="gradient-primary"
            disabled={!isEventLive}
          >
            <QrCode className="h-4 w-4 mr-2" />
            Show QR Code
          </Button>
          <Button
            variant="outline"
            onClick={handleDownloadList}
            disabled={!isEventLive && !isEventCompleted}
          >
            <Download className="h-4 w-4 mr-2" />
            Download List
          </Button>
        </div>

        {/* QR Dialog (popup) */}
        <Dialog open={showQRCode} onOpenChange={setShowQRCode}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>Event Check-in QR Code</DialogTitle>
              <DialogDescription className="mb-4">Code: {eventData.qrCode}</DialogDescription>
            </DialogHeader>
            <div className="flex items-center justify-center">
              <div className="w-60 h-60 bg-white border-2 border-border rounded p-2">
                <div className="w-full h-full grid grid-cols-21 gap-px bg-black">
                  {Array.from({ length: 441 }, (_, i) => {
                    const row = Math.floor(i / 21);
                    const col = i % 21;
                    const isBlack = (row + col + Math.sin(row * 0.5) * 5 + Math.cos(col * 0.3) * 3) % 2 < 1;
                    return (
                      <div
                        key={i}
                        className={`aspect-square ${isBlack ? 'bg-black' : 'bg-white'}`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {!isEventLive && !isEventCompleted && (
          <Card className="card-civic flex items-start gap-3 border border-dashed border-amber-200 bg-amber-50/50 p-4">
            <AlertCircle className="h-5 w-5 text-amber-700" />
            <div className="space-y-1 text-sm">
              <p className="font-medium text-amber-900">Attendance tools are locked</p>
              <p className="text-amber-800">
                Start the event when volunteers arrive to unlock QR check-in and live attendance tracking.
              </p>
            </div>
          </Card>
        )}

        {isEventCompleted && (
          <Card className="card-civic flex items-start gap-3 border border-sky-200 bg-sky-50/40 p-4">
            <CheckCircle className="h-5 w-5 text-sky-700" />
            <div className="space-y-1 text-sm">
              <p className="font-medium text-sky-900">Event closed</p>
              <p className="text-sky-800">
                The QR code is no longer available. Export the final attendance list for your records or impact report.
              </p>
            </div>
          </Card>
        )}

        {/* QR Code Display */}
        {showQRCode && isEventLive && (
          <Card className="card-civic relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 z-10"
              onClick={() => setShowQRCode(false)}
            >
              <X className="h-4 w-4" />
            </Button>
            <QRCodeDisplay />
          </Card>
        )}

        {/* Search and Filter */}
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search attendees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Manual walk-in registration removed; use per-attendee status dropdowns (click badge) */}

        {/* Attendees Tabs */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All ({filteredAttendees.length})</TabsTrigger>
            <TabsTrigger value="checked-in" disabled={!isEventLive && !isEventCompleted}>
              Checked In ({checkedInAttendees.length})
            </TabsTrigger>
            <TabsTrigger value="no-show" disabled={!isEventLive && !isEventCompleted}>
              No Show ({noShowAttendees.length})
            </TabsTrigger>
          </TabsList>

          {/* All Attendees */}
          <TabsContent value="all" className="space-y-3">
            {filteredAttendees.map((attendee) => (
              <Card key={attendee.id} className="p-4 card-civic">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={attendee.avatar} alt={attendee.name} />
                      <AvatarFallback>{attendee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">{attendee.name}</h3>
                      <p className="text-sm text-muted-foreground">{attendee.email}</p>
                      <p className="text-xs text-muted-foreground">
                        Registered: {attendee.registrationDate}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                      {attendee.checkedIn ? (
                        <div className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Badge className="bg-green-100 text-green-800 border-green-200 cursor-pointer">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Checked In
                              </Badge>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem onSelect={() => handleUndoCheckIn(attendee.id)}>Undo Check In</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                          <p className="text-xs text-muted-foreground mt-1">
                            {attendee.checkInTime}
                          </p>
                        </div>
                      ) : (
                        <div className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Badge variant="outline" className="text-red-600 border-red-200 cursor-pointer">
                                <X className="h-3 w-3 mr-1" />
                                No Show
                              </Badge>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem onSelect={() => handleCheckIn(attendee.id)}>Mark as Checked In</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      )}
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Checked In Attendees */}
          <TabsContent value="checked-in" className="space-y-3">
            {checkedInAttendees.map((attendee) => (
              <Card key={attendee.id} className="p-4 card-civic bg-green-50/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={attendee.avatar} alt={attendee.name} />
                      <AvatarFallback>{attendee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">{attendee.name}</h3>
                      <p className="text-sm text-muted-foreground">{attendee.email}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Checked In
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {attendee.checkInTime}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* No Show Attendees */}
          <TabsContent value="no-show" className="space-y-3">
            {noShowAttendees.map((attendee) => (
              <Card key={attendee.id} className="p-4 card-civic bg-amber-50/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={attendee.avatar} alt={attendee.name} />
                      <AvatarFallback>{attendee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">{attendee.name}</h3>
                      <p className="text-sm text-muted-foreground">{attendee.email}</p>
                      <p className="text-xs text-muted-foreground">
                        Registered: {attendee.registrationDate}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <Badge variant="outline" className="text-red-600 border-red-200">
                      <X className="h-3 w-3 mr-1" />
                      No Show
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Instructions Card */}
        <Card className="p-4 card-civic bg-blue-50/30">
          <div className="flex items-start space-x-3">
            <Smartphone className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-900">QR Code Check-in Instructions</h3>
              <p className="text-sm text-blue-700 mt-1">
                Attendees can scan the QR code with their smartphone camera or QR code app to automatically check in. 
                You can also manually check in attendees using the "Check In" button next to their name.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </NGOLayout>
  );
};

export default NGOAttendees;
