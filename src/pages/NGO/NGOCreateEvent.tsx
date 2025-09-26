import { NGOLayout } from "@/components/Layout/NGOLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Plus,
  Clock,
  Star,
  Trash2,
  ArrowLeft,
  Save,
  Send
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface AgendaItem {
  id: string;
  time: string;
  title: string;
  description: string;
  duration: number; // in minutes
}

interface SocialActivity {
  id: string;
  name: string;
  description: string;
  timing: "before" | "during" | "after";
}

const initialAgendaItem: AgendaItem = {
  id: "",
  time: "",
  title: "",
  description: "",
  duration: 30
};

const defaultSocialActivities: SocialActivity[] = [
  { id: "1", name: "Welcome & Registration", description: "Check-in and welcome refreshments", timing: "before" },
  { id: "2", name: "Networking Session", description: "Participants get to know each other", timing: "before" },
  { id: "3", name: "Group Photos", description: "Capture memories together", timing: "during" },
  { id: "4", name: "Appreciation Ceremony", description: "Thank participants and celebrate achievements", timing: "after" },
  { id: "5", name: "Feedback Collection", description: "Gather insights for future events", timing: "after" }
];

const NGOCreateEvent = () => {
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    address: "",
    maxParticipants: "",
    rewardPoints: "",
    requirements: "",
    whatToBring: ""
  });

  // Agenda state
  const [agenda, setAgenda] = useState<AgendaItem[]>([]);
  const [currentAgendaItem, setCurrentAgendaItem] = useState<AgendaItem>(initialAgendaItem);

  // Social activities state
  const [selectedSocialActivities, setSelectedSocialActivities] = useState<string[]>([]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addAgendaItem = () => {
    if (!currentAgendaItem.time || !currentAgendaItem.title) {
      toast.error("Please fill in time and title for agenda item");
      return;
    }

    const newItem: AgendaItem = {
      ...currentAgendaItem,
      id: Date.now().toString()
    };

    setAgenda(prev => [...prev].sort((a, b) => a.time.localeCompare(b.time)));
    setCurrentAgendaItem(initialAgendaItem);
  };

  const removeAgendaItem = (id: string) => {
    setAgenda(prev => prev.filter(item => item.id !== id));
  };

  const toggleSocialActivity = (activityId: string) => {
    setSelectedSocialActivities(prev => 
      prev.includes(activityId)
        ? prev.filter(id => id !== activityId)
        : [...prev, activityId]
    );
  };

  const handleSaveDraft = () => {
    toast.success("Event saved as draft!");
    navigate("/ngo/events");
  };

  const handlePublishEvent = () => {
    if (!formData.title || !formData.date || !formData.location) {
      toast.error("Please fill in required fields: Title, Date, and Location");
      return;
    }
    
    toast.success("Event published successfully!");
    navigate("/ngo/events");
  };

  return (
    <NGOLayout title="Create Event">
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate("/ngo/events")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-lg font-heading font-semibold">Create New Event</h2>
        </div>

        {/* Basic Information */}
        <Card className="p-4 card-civic">
          <h3 className="font-heading font-semibold text-foreground mb-4">Basic Information</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Event Title *</Label>
              <Input
                id="title"
                placeholder="Enter event title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe your event and its purpose"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows={3}
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Category *</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Environment">Environment</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Health">Health</SelectItem>
                    <SelectItem value="Social Services">Social Services</SelectItem>
                    <SelectItem value="Community Development">Community Development</SelectItem>
                    <SelectItem value="Arts & Culture">Arts & Culture</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="rewardPoints">Reward Points</Label>
                <Input
                  id="rewardPoints"
                  type="number"
                  placeholder="100"
                  value={formData.rewardPoints}
                  onChange={(e) => handleInputChange("rewardPoints", e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Date, Time & Location */}
        <Card className="p-4 card-civic">
          <h3 className="font-heading font-semibold text-foreground mb-4">Date, Time & Location</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="date">Event Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="startTime">Start Time *</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => handleInputChange("startTime", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="endTime">End Time *</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => handleInputChange("endTime", e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="location">Venue Name *</Label>
              <Input
                id="location"
                placeholder="e.g., Community Center, Local Park"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="address">Full Address *</Label>
              <Textarea
                id="address"
                placeholder="Enter complete address with city"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                rows={2}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="maxParticipants">Maximum Participants</Label>
              <Input
                id="maxParticipants"
                type="number"
                placeholder="50"
                value={formData.maxParticipants}
                onChange={(e) => handleInputChange("maxParticipants", e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </Card>

        {/* Event Agenda Builder */}
        <Card className="p-4 card-civic">
          <h3 className="font-heading font-semibold text-foreground mb-4">Event Agenda</h3>
          
          {/* Add Agenda Item */}
          <div className="space-y-3 mb-4 p-3 border border-dashed border-muted-foreground rounded-lg">
            <h4 className="font-medium text-sm">Add Agenda Item</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">Time</Label>
                <Input
                  type="time"
                  placeholder="10:00"
                  value={currentAgendaItem.time}
                  onChange={(e) => setCurrentAgendaItem(prev => ({ ...prev, time: e.target.value }))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-xs">Duration (minutes)</Label>
                <Input
                  type="number"
                  placeholder="30"
                  value={currentAgendaItem.duration}
                  onChange={(e) => setCurrentAgendaItem(prev => ({ ...prev, duration: parseInt(e.target.value) || 0 }))}
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label className="text-xs">Activity Title</Label>
              <Input
                placeholder="e.g., Opening Ceremony"
                value={currentAgendaItem.title}
                onChange={(e) => setCurrentAgendaItem(prev => ({ ...prev, title: e.target.value }))}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-xs">Description</Label>
              <Textarea
                placeholder="Brief description of the activity"
                value={currentAgendaItem.description}
                onChange={(e) => setCurrentAgendaItem(prev => ({ ...prev, description: e.target.value }))}
                rows={2}
                className="mt-1"
              />
            </div>
            <Button onClick={addAgendaItem} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add to Agenda
            </Button>
          </div>

          {/* Agenda Items List */}
          {agenda.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Event Schedule</h4>
              {agenda
                .sort((a, b) => a.time.localeCompare(b.time))
                .map((item) => (
                  <div key={item.id} className="flex items-start justify-between p-3 border border-border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <Badge variant="outline" className="text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          {item.time} ({item.duration}min)
                        </Badge>
                      </div>
                      <h5 className="font-medium text-sm">{item.title}</h5>
                      {item.description && (
                        <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAgendaItem(item.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
            </div>
          )}
        </Card>

        {/* Social Activities */}
        <Card className="p-4 card-civic">
          <h3 className="font-heading font-semibold text-foreground mb-4">Social Activities</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Select activities to enhance community engagement and make your event more interactive.
          </p>
          
          <div className="space-y-3">
            {["before", "during", "after"].map((timing) => (
              <div key={timing}>
                <h4 className="font-medium text-sm mb-2 capitalize">{timing} Event</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {defaultSocialActivities
                    .filter(activity => activity.timing === timing)
                    .map((activity) => (
                      <div
                        key={activity.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-all ${
                          selectedSocialActivities.includes(activity.id)
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                        onClick={() => toggleSocialActivity(activity.id)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h5 className="font-medium text-sm">{activity.name}</h5>
                            <p className="text-xs text-muted-foreground mt-1">{activity.description}</p>
                          </div>
                          {selectedSocialActivities.includes(activity.id) && (
                            <div className="w-2 h-2 bg-primary rounded-full mt-1"></div>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
                {timing !== "after" && <Separator className="mt-3" />}
              </div>
            ))}
          </div>
        </Card>

        {/* Requirements & Instructions */}
        <Card className="p-4 card-civic">
          <h3 className="font-heading font-semibold text-foreground mb-4">Additional Information</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="requirements">Requirements (Optional)</Label>
              <Textarea
                id="requirements"
                placeholder="e.g., Physical fitness level, age restrictions, skills needed"
                value={formData.requirements}
                onChange={(e) => handleInputChange("requirements", e.target.value)}
                rows={2}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="whatToBring">What to Bring (Optional)</Label>
              <Textarea
                id="whatToBring"
                placeholder="e.g., Comfortable clothes, water bottle, gloves"
                value={formData.whatToBring}
                onChange={(e) => handleInputChange("whatToBring", e.target.value)}
                rows={2}
                className="mt-1"
              />
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" onClick={handleSaveDraft} className="flex-1">
            <Save className="h-4 w-4 mr-2" />
            Save as Draft
          </Button>
          <Button onClick={handlePublishEvent} className="gradient-primary flex-1">
            <Send className="h-4 w-4 mr-2" />
            Publish Event
          </Button>
        </div>
      </div>
    </NGOLayout>
  );
};

export default NGOCreateEvent;