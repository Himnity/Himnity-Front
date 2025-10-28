import { AppLayout } from "@/components/Layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tag } from "@/components/ui/tag";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Calendar,
  MapPin,
  Users,
  Star,
  Clock,
  Phone,
  Mail,
  Award,
  Heart,
  Share2,
  ArrowUpRight,
  ArrowLeft
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import communityEventImage from "@/assets/community-gardens.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { buildOrganizerProfilePath } from "@/lib/utils";
import { getLastMainRoute, getPreviousMainRoute } from "@/hooks/useNavHistory";

// Mock event data - in real app, this would come from router params or API
const eventData = {
  id: "1",
  title: "Community Garden Revival",
  description: "Help transform an abandoned lot into a thriving community garden for local families. This initiative aims to provide fresh produce access, create a beautiful community space, and bring neighbors together through the shared activity of gardening.",
  fullDescription: `Join us for an exciting community transformation project! We're converting a neglected lot into a vibrant community garden that will serve as both a source of fresh produce and a gathering space for neighbors.

What we'll be doing:
• Clearing debris and preparing the soil
• Building raised garden beds
• Installing a compost system
• Setting up irrigation
• Planting seasonal vegetables and herbs
• Creating pathways and seating areas

This is a great opportunity to learn about sustainable gardening practices, meet your neighbors, and contribute to a lasting positive change in our community. No gardening experience required - we'll have experienced volunteers to guide everyone!

The garden will be maintained by community volunteers and the fresh produce will be available for all participants and their families.`,
  category: "Environment",
  organizer: {
    name: "Green Future NGO",
    avatar: "GF",
    description: "Dedicated to environmental conservation and community sustainability projects.",
    rating: 4.8,
    eventsOrganized: 45
  },
  date: "October 15, 2025",
  time: "9:00 AM - 3:00 PM",
  location: "Downtown Community Center - 123 Main Street",
  participants: 23,
  maxParticipants: 50,
  rewardPoints: 250,
  imageUrl: communityEventImage,
  likes: 186,
  tags: [
    { label: "Physical Activity", variant: "activity" as const },
    { label: "Outdoors", variant: "location" as const },
    { label: "Gardening", variant: "skill" as const }
  ],
  requirements: [
    "Comfortable clothes that can get dirty",
    "Water bottle and sun protection",
    "Enthusiasm for community building!"
  ],
  whatToBring: [
    "Work gloves (if you have them)",
    "Garden tools (shovels, rakes)",
    "Lunch or snacks to share",
    "Seeds or seedlings",
    "Wheelbarrow or wagon"
  ]
};

const EventDetails = () => {
  const navigate = useNavigate();
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [eventLikes, setEventLikes] = useState({
    count: eventData.likes,
    isLiked: false,
  });
  const organizerProfilePath = buildOrganizerProfilePath(eventData.organizer.name);
  const previousMainRoute = getPreviousMainRoute();
  const lastMainRoute = getLastMainRoute();
  const fallbackRoute = previousMainRoute ?? lastMainRoute ?? "/events";
  const [signupForm, setSignupForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    emergencyContact: "",
    dietaryRestrictions: "",
    experience: "",
    bringingItems: [] as string[],
    additionalNotes: ""
  });

  const handleJoinEvent = () => {
    setIsSignupModalOpen(true);
  };

  const handleToggleLike = () => {
    setEventLikes((prev) => {
      const nextLiked = !prev.isLiked;
      const nextCount = nextLiked ? prev.count + 1 : Math.max(0, prev.count - 1);
      return { count: nextCount, isLiked: nextLiked };
    });
  };

  const handleContactNGO = () => {
    toast.info("We'll connect you with the organizer", {
      description: "A dedicated contact channel is coming soon.",
    });
  };

  const handleBackClick = () => {
    navigate(fallbackRoute);
  };

  const handleSubmitSignup = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Join request sent!", {
      description: "The organizer will review your application and notify you."
    });
    setIsSignupModalOpen(false);
  };

  const handleItemToggle = (item: string) => {
    setSignupForm(prev => ({
      ...prev,
      bringingItems: prev.bringingItems.includes(item)
        ? prev.bringingItems.filter(i => i !== item)
        : [...prev.bringingItems, item]
    }));
  };

  const participationPercentage = (eventData.participants / eventData.maxParticipants) * 100;

  return (
    <AppLayout title="Event Details">
      <div className="space-y-6">
        <div className="fixed left-4 top-24 z-50">
          <Button
            variant="secondary"
            size="icon"
            onClick={handleBackClick}
            className="h-11 w-11 rounded-full border border-border/60 bg-card/90 text-foreground shadow-xl backdrop-blur-sm transition hover:-translate-x-0.5 hover:text-primary hover:shadow-2xl"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>

        {/* Event Hero Image */}
        <div className="relative h-64 overflow-hidden">
          <img 
            src={eventData.imageUrl} 
            alt={eventData.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center space-x-2 mb-2">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                {eventData.category}
              </Badge>
              <div className="flex items-center space-x-1 bg-accent/90 px-2 py-1 rounded-full">
                <Star className="h-3 w-3" />
                <span className="text-xs font-medium">{eventData.rewardPoints} XP</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-heading font-bold">{eventData.title}</h1>
              <Button
                size="sm"
                variant="secondary"
                onClick={handleToggleLike}
                aria-pressed={eventLikes.isLiked}
                aria-label={eventLikes.isLiked ? "Remove like" : "Like this event"}
                className={`flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-sm font-medium text-rose-600 shadow-sm transition hover:bg-white/80 ${
                  eventLikes.isLiked ? "ring-1 ring-rose-500" : ""
                }`}
              >
                <Heart className="h-4 w-4" fill={eventLikes.isLiked ? "currentColor" : "none"} />
                {eventLikes.count}
              </Button>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Organizer Spotlight */}
          <Card className="card-civic flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <Avatar className="h-14 w-14">
                <AvatarFallback className="bg-primary text-white font-medium text-lg">
                  {eventData.organizer.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    to={organizerProfilePath}
                    className="inline-flex items-center gap-1 text-lg font-semibold text-primary hover:underline"
                  >
                    {eventData.organizer.name}
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <Badge variant="secondary">Verified NGO</Badge>
                </div>
                <p className="max-w-xl text-sm text-muted-foreground">
                  {eventData.organizer.description}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 text-amber-500" />
                    {eventData.organizer.rating} impact rating
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Award className="h-3.5 w-3.5 text-primary" />
                    {eventData.organizer.eventsOrganized} successful events
                  </span>
                </div>
              </div>
            </div>
            <div className="flex w-full gap-2 md:w-auto">
              <Button asChild variant="outline" className="flex-1 md:flex-none">
                <Link to={organizerProfilePath} className="inline-flex items-center gap-2">
                  Visit profile
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="secondary" className="flex-1 md:flex-none" onClick={handleContactNGO}>
                <Mail className="mr-2 h-4 w-4" />
                Contact NGO
              </Button>
            </div>
          </Card>

          {/* Quick Info Cards */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 card-civic">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium text-sm">Date & Time</div>
                  <div className="text-xs text-muted-foreground">{eventData.date}</div>
                  <div className="text-xs text-muted-foreground">{eventData.time}</div>
                </div>
              </div>
            </Card>
            
            <Card className="p-4 card-civic">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium text-sm">Location</div>
                  <div className="text-xs text-muted-foreground line-clamp-2">{eventData.location}</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Participation Stats */}
          <Card className="p-4 card-civic">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="font-medium">Participation</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {eventData.participants} / {eventData.maxParticipants} joined
                </span>
              </div>
              <Progress value={participationPercentage} className="h-2" />
              <div className="text-xs text-muted-foreground">
                {eventData.maxParticipants - eventData.participants} spots remaining
              </div>
            </div>
          </Card>

          {/* Event Tags */}
          <div className="flex flex-wrap gap-2">
            {eventData.tags.map((tag, index) => (
              <Tag key={index} variant={tag.variant}>
                {tag.label}
              </Tag>
            ))}
          </div>

          {/* Description */}
          <Card className="p-6 card-civic">
            <h2 className="text-lg font-heading font-semibold mb-4">About this Event</h2>
            <div className="prose prose-sm max-w-none">
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {eventData.fullDescription}
              </p>
            </div>
          </Card>

          {/* Event Agenda */}
          <Card className="p-6 card-civic">
            <h3 className="text-lg font-heading font-semibold mb-4 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-primary" />
              Event Agenda
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-3 bg-muted/30 rounded-lg">
                <div className="font-mono text-sm text-primary font-medium mt-0.5">9:00 AM</div>
                <div>
                  <div className="font-medium">Welcome & Registration</div>
                  <div className="text-sm text-muted-foreground">Check in, meet the team, get your tools and safety briefing</div>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-3 bg-muted/30 rounded-lg">
                <div className="font-mono text-sm text-primary font-medium mt-0.5">9:30 AM</div>
                <div>
                  <div className="font-medium">Site Preparation</div>
                  <div className="text-sm text-muted-foreground">Clear debris, measure spaces, and prepare the ground</div>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-3 bg-muted/30 rounded-lg">
                <div className="font-mono text-sm text-primary font-medium mt-0.5">11:00 AM</div>
                <div>
                  <div className="font-medium">Building Garden Beds</div>
                  <div className="text-sm text-muted-foreground">Construct raised beds and set up irrigation system</div>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-3 bg-muted/30 rounded-lg">
                <div className="font-mono text-sm text-primary font-medium mt-0.5">12:30 PM</div>
                <div>
                  <div className="font-medium">Lunch Break</div>
                  <div className="text-sm text-muted-foreground">Community lunch (provided) and socializing</div>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-3 bg-muted/30 rounded-lg">
                <div className="font-mono text-sm text-primary font-medium mt-0.5">1:30 PM</div>
                <div>
                  <div className="font-medium">Planting & Landscaping</div>
                  <div className="text-sm text-muted-foreground">Plant seeds and seedlings, create pathways</div>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-3 bg-muted/30 rounded-lg">
                <div className="font-mono text-sm text-primary font-medium mt-0.5">2:45 PM</div>
                <div>
                  <div className="font-medium">Wrap-up & Celebration</div>
                  <div className="text-sm text-muted-foreground">Group photos, next steps, and celebration!</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Requirements */}
          <Card className="p-6 card-civic">
            <h3 className="font-semibold mb-3">What you'll need:</h3>
            <ul className="space-y-2">
              {eventData.requirements.map((req, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">{req}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Action Buttons */}
          <div className="flex space-x-3 pb-6">
            <Button 
              onClick={handleJoinEvent}
              className="gradient-primary flex-1 h-12"
              size="lg"
            >
              <Heart className="h-4 w-4 mr-2" />
              Request to Join
            </Button>
            <Button variant="outline" size="lg" className="px-4">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Signup Modal */}
        <Dialog open={isSignupModalOpen} onOpenChange={setIsSignupModalOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white text-gray-900 border shadow-lg">
            <DialogHeader>
              <DialogTitle className="text-gray-900 text-xl">Sign Up for {eventData.title}</DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmitSignup} className="space-y-6 text-gray-900">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-gray-900">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName" className="text-gray-700 font-medium">Full Name *</Label>
                    <Input
                      id="fullName"
                      required
                      value={signupForm.fullName}
                      onChange={(e) => setSignupForm({...signupForm, fullName: e.target.value})}
                      placeholder="Your full name"
                      className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-gray-700 font-medium">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={signupForm.email}
                      onChange={(e) => setSignupForm({...signupForm, email: e.target.value})}
                      placeholder="your.email@example.com"
                      className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone" className="text-gray-700 font-medium">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={signupForm.phone}
                      onChange={(e) => setSignupForm({...signupForm, phone: e.target.value})}
                      placeholder="+216 XX XXX XXX"
                      className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="emergencyContact" className="text-gray-700 font-medium">Emergency Contact</Label>
                    <Input
                      id="emergencyContact"
                      value={signupForm.emergencyContact}
                      onChange={(e) => setSignupForm({...signupForm, emergencyContact: e.target.value})}
                      placeholder="Name and phone number"
                      className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                    />
                  </div>
                </div>
              </div>

              {/* Experience & Dietary */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="experience" className="text-gray-700 font-medium">Relevant Experience (Optional)</Label>
                  <Select 
                    value={signupForm.experience}
                    onValueChange={(value) => setSignupForm({...signupForm, experience: value})}
                  >
                    <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-300">
                      <SelectItem value="beginner">Complete Beginner</SelectItem>
                      <SelectItem value="some">Some Experience</SelectItem>
                      <SelectItem value="experienced">Very Experienced</SelectItem>
                      <SelectItem value="expert">Expert/Professional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="dietary" className="text-gray-700 font-medium">Dietary Restrictions/Allergies</Label>
                  <Input
                    id="dietary"
                    value={signupForm.dietaryRestrictions}
                    onChange={(e) => setSignupForm({...signupForm, dietaryRestrictions: e.target.value})}
                    placeholder="Any food allergies or dietary requirements"
                    className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                  />
                </div>
              </div>

              {/* What can you bring */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">What can you bring to help?</h3>
                <div className="space-y-2">
                  {eventData.whatToBring.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Checkbox
                        id={`item-${index}`}
                        checked={signupForm.bringingItems.includes(item)}
                        onCheckedChange={() => handleItemToggle(item)}
                      />
                      <Label htmlFor={`item-${index}`} className="text-sm text-gray-700">
                        {item}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <Label htmlFor="notes" className="text-gray-700 font-medium">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={signupForm.additionalNotes}
                  onChange={(e) => setSignupForm({...signupForm, additionalNotes: e.target.value})}
                  placeholder="Anything else you'd like us to know?"
                  rows={3}
                  className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsSignupModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="gradient-primary"
                >
                  Complete Registration
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
};

export default EventDetails;
