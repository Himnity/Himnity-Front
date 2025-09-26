import { NGOLayout } from "@/components/Layout/NGOLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Check,
  X,
  Users, 
  Search,
  Filter,
  Calendar,
  MapPin,
  ArrowLeft,
  Eye,
  CheckCircle,
  Clock,
  UserPlus,
  UserMinus
} from "lucide-react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Mock events data
const eventsData = {
  "e1": {
    id: "e1",
    title: "Community Garden Revival",
    date: "October 15, 2025",
    time: "9:00 AM - 3:00 PM",
    location: "Downtown Community Center",
    maxParticipants: 50,
    acceptedCount: 23,
    pendingCount: 12,
    rejectedCount: 3,
    status: "Active"
  },
  "e2": {
    id: "e2",
    title: "Digital Literacy Workshop",
    date: "October 18, 2025",
    time: "2:00 PM - 5:00 PM",
    location: "Central Library",
    maxParticipants: 20,
    acceptedCount: 8,
    pendingCount: 5,
    rejectedCount: 1,
    status: "Active"
  }
};

// Mock join requests data
const joinRequestsData = {
  "e1": [
    {
      id: "r1",
      user: {
        name: "Ahmed Ben Ali",
        email: "ahmed.benali@email.com",
        avatar: "/placeholder.svg",
        joinedEvents: 5,
        rating: 4.8
      },
      requestDate: "Oct 10, 2025",
      status: "pending",
      message: "I'm very passionate about community gardening and have experience with organic farming. Would love to contribute to this project!",
      skills: ["Gardening", "Organic Farming", "Community Work"],
      availability: "Full day available"
    },
    {
      id: "r2",
      user: {
        name: "Fatima Zahra",
        email: "fatima.zahra@email.com",
        avatar: "/placeholder.svg",
        joinedEvents: 12,
        rating: 4.9
      },
      requestDate: "Oct 8, 2025",
      status: "accepted",
      message: "I've participated in similar events and am excited to help create a green space for our community.",
      skills: ["Environmental Science", "Teamwork", "Leadership"],
      availability: "Morning session only"
    },
    {
      id: "r3",
      user: {
        name: "Mohamed Khaled",
        email: "mohamed.khaled@email.com",
        avatar: "/placeholder.svg",
        joinedEvents: 3,
        rating: 4.2
      },
      requestDate: "Oct 12, 2025",
      status: "pending",
      message: "New to community service but eager to learn and contribute.",
      skills: ["Enthusiasm", "Quick Learner"],
      availability: "Flexible"
    },
    {
      id: "r4",
      user: {
        name: "Sara Ahmed",
        email: "sara.ahmed@email.com",
        avatar: "/placeholder.svg",
        joinedEvents: 8,
        rating: 3.8
      },
      requestDate: "Oct 6, 2025",
      status: "rejected",
      message: "I want to join this event.",
      skills: ["Basic gardening"],
      availability: "Afternoons only"
    }
  ],
  "e2": [
    {
      id: "r5",
      user: {
        name: "Omar Khedri",
        email: "omar.khedri@email.com",
        avatar: "/placeholder.svg",
        joinedEvents: 7,
        rating: 4.6
      },
      requestDate: "Oct 15, 2025",
      status: "pending",
      message: "I work in IT and would love to help seniors learn technology. I have experience teaching elderly people.",
      skills: ["IT Support", "Teaching", "Patience"],
      availability: "Available for the full workshop"
    }
  ]
};

const NGOEventRequests = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [requests, setRequests] = useState(joinRequestsData[id as keyof typeof joinRequestsData] || []);

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

  const filteredRequests = requests.filter(request =>
    request.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingRequests = filteredRequests.filter(r => r.status === "pending");
  const acceptedRequests = filteredRequests.filter(r => r.status === "accepted");
  const rejectedRequests = filteredRequests.filter(r => r.status === "rejected");

  const handleAcceptRequest = (requestId: string) => {
    setRequests(prev => prev.map(request =>
      request.id === requestId
        ? { ...request, status: "accepted" }
        : request
    ));
    toast.success("Request accepted!");
  };

  const handleRejectRequest = (requestId: string) => {
    setRequests(prev => prev.map(request =>
      request.id === requestId
        ? { ...request, status: "rejected" }
        : request
    ));
    toast.success("Request rejected");
  };

  const handleAcceptAll = () => {
    setRequests(prev => prev.map(request =>
      request.status === "pending"
        ? { ...request, status: "accepted" }
        : request
    ));
    toast.success(`Accepted ${pendingRequests.length} pending requests!`);
  };

  const handleRejectAll = () => {
    setRequests(prev => prev.map(request =>
      request.status === "pending"
        ? { ...request, status: "rejected" }
        : request
    ));
    toast.success(`Rejected ${pendingRequests.length} pending requests`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted": return "bg-green-100 text-green-800 border-green-200";
      case "rejected": return "bg-red-100 text-red-800 border-red-200";
      case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "accepted": return <CheckCircle className="h-3 w-3" />;
      case "rejected": return <X className="h-3 w-3" />;
      case "pending": return <Clock className="h-3 w-3" />;
      default: return null;
    }
  };

  return (
    <NGOLayout title="Join Requests">
      <div className="space-y-4 p-4">
        {/* Back Button and Header */}
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate("/ngo/events")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-lg font-heading font-semibold">Join Requests</h2>
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
              <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                <CheckCircle className="h-3 w-3 mr-1" />
                {eventData.status}
              </Badge>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-3 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{eventData.acceptedCount}</div>
                <div className="text-sm text-muted-foreground">Accepted</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{eventData.pendingCount}</div>
                <div className="text-sm text-muted-foreground">Pending</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{eventData.rejectedCount}</div>
                <div className="text-sm text-muted-foreground">Rejected</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-muted-foreground">{eventData.maxParticipants}</div>
                <div className="text-sm text-muted-foreground">Max Capacity</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Bulk Actions */}
        {pendingRequests.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleAcceptAll} className="bg-green-600 hover:bg-green-700 text-white">
              <UserPlus className="h-4 w-4 mr-2" />
              Accept All Pending ({pendingRequests.length})
            </Button>
            <Button onClick={handleRejectAll} variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
              <UserMinus className="h-4 w-4 mr-2" />
              Reject All Pending
            </Button>
          </div>
        )}

        {/* Search */}
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search requests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Requests Tabs */}
        <Tabs defaultValue="pending" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pending">Pending ({pendingRequests.length})</TabsTrigger>
            <TabsTrigger value="accepted">Accepted ({acceptedRequests.length})</TabsTrigger>
            <TabsTrigger value="rejected">Rejected ({rejectedRequests.length})</TabsTrigger>
            <TabsTrigger value="all">All ({filteredRequests.length})</TabsTrigger>
          </TabsList>

          {/* Pending Requests */}
          <TabsContent value="pending" className="space-y-3">
            {pendingRequests.map((request) => (
              <Card key={request.id} className="p-4 card-civic bg-yellow-50/30">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={request.user.avatar} alt={request.user.name} />
                        <AvatarFallback>{request.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-foreground">{request.user.name}</h3>
                        <p className="text-sm text-muted-foreground">{request.user.email}</p>
                        <div className="flex items-center space-x-3 mt-1 text-xs text-muted-foreground">
                          <span>{request.user.joinedEvents} events joined</span>
                          <span>★ {request.user.rating} rating</span>
                          <span>Requested: {request.requestDate}</span>
                        </div>
                      </div>
                    </div>
                    <Badge className={getStatusColor(request.status)}>
                      {getStatusIcon(request.status)}
                      <span className="ml-1 capitalize">{request.status}</span>
                    </Badge>
                  </div>

                  <div className="pl-15">
                    <p className="text-sm text-muted-foreground mb-2 italic">
                      "{request.message}"
                    </p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {request.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Availability: {request.availability}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedRequest(request)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                    
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => handleRejectRequest(request.id)}
                        variant="outline"
                        className="border-red-200 text-red-600 hover:bg-red-50"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleAcceptRequest(request.id)}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Accept
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
            {pendingRequests.length === 0 && (
              <Card className="p-8 text-center">
                <Clock className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No pending requests</p>
              </Card>
            )}
          </TabsContent>

          {/* Accepted Requests */}
          <TabsContent value="accepted" className="space-y-3">
            {acceptedRequests.map((request) => (
              <Card key={request.id} className="p-4 card-civic bg-green-50/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={request.user.avatar} alt={request.user.name} />
                      <AvatarFallback>{request.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-foreground">{request.user.name}</h3>
                      <p className="text-sm text-muted-foreground">{request.user.email}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(request.status)}>
                    {getStatusIcon(request.status)}
                    <span className="ml-1 capitalize">{request.status}</span>
                  </Badge>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Rejected Requests */}
          <TabsContent value="rejected" className="space-y-3">
            {rejectedRequests.map((request) => (
              <Card key={request.id} className="p-4 card-civic bg-red-50/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={request.user.avatar} alt={request.user.name} />
                      <AvatarFallback>{request.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-foreground">{request.user.name}</h3>
                      <p className="text-sm text-muted-foreground">{request.user.email}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(request.status)}>
                    {getStatusIcon(request.status)}
                    <span className="ml-1 capitalize">{request.status}</span>
                  </Badge>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* All Requests */}
          <TabsContent value="all" className="space-y-3">
            {filteredRequests.map((request) => (
              <Card key={request.id} className="p-4 card-civic">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={request.user.avatar} alt={request.user.name} />
                      <AvatarFallback>{request.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-foreground">{request.user.name}</h3>
                      <p className="text-sm text-muted-foreground">{request.user.email}</p>
                      <p className="text-xs text-muted-foreground">Requested: {request.requestDate}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(request.status)}>
                    {getStatusIcon(request.status)}
                    <span className="ml-1 capitalize">{request.status}</span>
                  </Badge>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Request Detail Dialog */}
        <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
          <DialogContent className="max-w-2xl bg-white text-gray-900">
            <DialogHeader>
              <DialogTitle className="text-gray-900">Request Details</DialogTitle>
            </DialogHeader>
            {selectedRequest && (
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={selectedRequest.user.avatar} alt={selectedRequest.user.name} />
                    <AvatarFallback className="text-lg">{selectedRequest.user.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{selectedRequest.user.name}</h3>
                    <p className="text-gray-600">{selectedRequest.user.email}</p>
                    <div className="flex items-center space-x-3 text-sm text-gray-500">
                      <span>{selectedRequest.user.joinedEvents} events joined</span>
                      <span>★ {selectedRequest.user.rating} rating</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Message</h4>
                  <p className="text-gray-600 bg-gray-50 p-3 rounded-lg italic">
                    "{selectedRequest.message}"
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Skills & Experience</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedRequest.skills.map((skill: string, index: number) => (
                      <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Availability</h4>
                  <p className="text-gray-600">{selectedRequest.availability}</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Request Date</h4>
                  <p className="text-gray-600">{selectedRequest.requestDate}</p>
                </div>

                {selectedRequest.status === "pending" && (
                  <div className="flex space-x-2 pt-4 border-t border-gray-200">
                    <Button
                      onClick={() => {
                        handleRejectRequest(selectedRequest.id);
                        setSelectedRequest(null);
                      }}
                      variant="outline"
                      className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Reject Request
                    </Button>
                    <Button
                      onClick={() => {
                        handleAcceptRequest(selectedRequest.id);
                        setSelectedRequest(null);
                      }}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Accept Request
                    </Button>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </NGOLayout>
  );
};

export default NGOEventRequests;