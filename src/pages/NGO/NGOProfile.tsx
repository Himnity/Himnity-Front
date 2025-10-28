import { NGOLayout } from "@/components/Layout/NGOLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Mail,
  Phone,
  MapPin,
  Globe,
  Calendar,
  Users,
  Award,
  Heart,
  Edit,
  Save,
  Camera,
  Star,
  TrendingUp,
  Target
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const NGOProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    organizationName: "Green Future Tunisia",
    description: "Dedicated to environmental conservation and sustainable development across Tunisia. We organize community cleanups, tree planting, and environmental education programs.",
    email: "contact@greenfuturetunisia.org",
    phone: "+216 71 123 456",
    website: "www.greenfuturetunisia.org",
    address: "Avenue Habib Bourguiba, Tunis 1001, Tunisia",
    foundedYear: "2015",
    registrationNumber: "NGO-TN-2015-0123",
    focusAreas: ["Environment", "Education", "Community Development"],
    mission: "To create sustainable communities through environmental education and action, empowering citizens to protect Tunisia's natural heritage for future generations."
  });

  // Mock statistics
  const stats = {
    eventsOrganized: 47,
    totalParticipants: 1248,
    proposalsAdopted: 23,
    impactScore: 4.8,
    yearsActive: 10,
    partnersOrganizations: 15
  };

  // Mock recent achievements
  const achievements = [
    {
      id: 1,
      title: "Environmental Champion",
      description: "Organized 25+ environmental events",
      icon: "🌱",
      earnedDate: "September 2025"
    },
    {
      id: 2,
      title: "Community Builder",
      description: "Engaged 1000+ community members",
      icon: "🤝",
      earnedDate: "August 2025"
    },
    {
      id: 3,
      title: "Innovation Leader",
      description: "Adopted and implemented 20+ proposals",
      icon: "💡",
      earnedDate: "July 2025"
    }
  ];

  // Mock recent events
  const recentEvents = [
    {
      id: 1,
      title: "Beach Cleanup Marathon",
      date: "Sept 28, 2025",
      participants: 75,
      status: "Completed"
    },
    {
      id: 2,
      title: "Urban Garden Workshop",
      date: "Oct 5, 2025",
      participants: 32,
      status: "Completed"
    },
    {
      id: 3,
      title: "Community Garden Revival",
      date: "Oct 15, 2025",
      participants: 23,
      status: "Active"
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const handleImageUpload = () => {
    toast.info("Image upload functionality would be implemented here");
  };

  return (
    <NGOLayout title="Organization Profile">
      <div className="container space-y-6 px-4 py-6 md:px-0">
        {/* Profile Header */}
        <Card className="p-6 card-civic">
          <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
            {/* Avatar */}
            <div className="relative">
              <Avatar className="h-20 w-20 md:h-24 md:w-24">
                <AvatarImage src="/placeholder.svg" alt="Organization Logo" />
                <AvatarFallback className="text-lg">GF</AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                variant="secondary"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                onClick={handleImageUpload}
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>

            {/* Basic Info */}
            <div className="flex-1 space-y-3">
              {isEditing ? (
                <>
                  <div>
                    <Label htmlFor="orgName">Organization Name</Label>
                    <Input
                      id="orgName"
                      value={profileData.organizationName}
                      onChange={(e) => handleInputChange("organizationName", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={profileData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      rows={3}
                      className="mt-1"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h1 className="text-2xl font-heading font-bold text-foreground">
                      {profileData.organizationName}
                    </h1>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="secondary">NGO</Badge>
                      <Badge variant="outline">Verified</Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        Founded {profileData.foundedYear}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{profileData.description}</p>
                </>
              )}

              {/* Focus Areas */}
              <div>
                <h3 className="font-medium text-sm text-foreground mb-2">Focus Areas</h3>
                <div className="flex flex-wrap gap-1">
                  {profileData.focusAreas.map((area, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex space-x-2">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave} className="gradient-primary">
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </>
              ) : (
                <Button variant="outline" onClick={() => setIsEditing(true)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card className="p-4 text-center card-civic">
            <TrendingUp className="h-6 w-6 mx-auto text-primary mb-2" />
            <div className="text-2xl font-bold text-foreground">{stats.eventsOrganized}</div>
            <div className="text-xs text-muted-foreground">Events Organized</div>
          </Card>
          <Card className="p-4 text-center card-civic">
            <Users className="h-6 w-6 mx-auto text-primary mb-2" />
            <div className="text-2xl font-bold text-foreground">{stats.totalParticipants.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Total Participants</div>
          </Card>
          <Card className="p-4 text-center card-civic">
            <Target className="h-6 w-6 mx-auto text-primary mb-2" />
            <div className="text-2xl font-bold text-foreground">{stats.proposalsAdopted}</div>
            <div className="text-xs text-muted-foreground">Proposals Adopted</div>
          </Card>
          <Card className="p-4 text-center card-civic">
            <Star className="h-6 w-6 mx-auto text-accent mb-2" />
            <div className="text-2xl font-bold text-foreground">{stats.impactScore}</div>
            <div className="text-xs text-muted-foreground">Impact Score</div>
          </Card>
          <Card className="p-4 text-center card-civic">
            <Calendar className="h-6 w-6 mx-auto text-primary mb-2" />
            <div className="text-2xl font-bold text-foreground">{stats.yearsActive}</div>
            <div className="text-xs text-muted-foreground">Years Active</div>
          </Card>
          <Card className="p-4 text-center card-civic">
            <Heart className="h-6 w-6 mx-auto text-primary mb-2" />
            <div className="text-2xl font-bold text-foreground">{stats.partnersOrganizations}</div>
            <div className="text-xs text-muted-foreground">Partners</div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact Information */}
          <Card className="p-6 card-civic">
            <h3 className="font-heading font-semibold text-foreground mb-4">Contact Information</h3>
            <div className="space-y-4">
              {isEditing ? (
                <>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={profileData.website}
                      onChange={(e) => handleInputChange("website", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      value={profileData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      rows={2}
                      className="mt-1"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{profileData.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{profileData.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{profileData.website}</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <span className="text-sm">{profileData.address}</span>
                  </div>
                </>
              )}
            </div>
          </Card>

          {/* Mission & Legal Info */}
          <Card className="p-6 card-civic">
            <h3 className="font-heading font-semibold text-foreground mb-4">Mission & Legal</h3>
            <div className="space-y-4">
              {isEditing ? (
                <>
                  <div>
                    <Label htmlFor="mission">Mission Statement</Label>
                    <Textarea
                      id="mission"
                      value={profileData.mission}
                      onChange={(e) => handleInputChange("mission", e.target.value)}
                      rows={3}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="regNumber">Registration Number</Label>
                    <Input
                      id="regNumber"
                      value={profileData.registrationNumber}
                      onChange={(e) => handleInputChange("registrationNumber", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h4 className="font-medium text-sm text-foreground mb-2">Mission Statement</h4>
                    <p className="text-sm text-muted-foreground">{profileData.mission}</p>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-medium text-sm text-foreground mb-2">Registration Number</h4>
                    <p className="text-sm text-muted-foreground">{profileData.registrationNumber}</p>
                  </div>
                </>
              )}
            </div>
          </Card>
        </div>

        {/* Achievements */}
        <Card className="p-6 card-civic">
          <h3 className="font-heading font-semibold text-foreground mb-4">Recent Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="p-4 border border-border rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm text-foreground">{achievement.title}</h4>
                    <p className="text-xs text-muted-foreground">{achievement.earnedDate}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{achievement.description}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Events */}
        <Card className="p-6 card-civic">
          <h3 className="font-heading font-semibold text-foreground mb-4">Recent Events</h3>
          <div className="space-y-3">
            {recentEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-sm text-foreground">{event.title}</h4>
                  <p className="text-xs text-muted-foreground">{event.date}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-sm font-medium">{event.participants}</div>
                    <div className="text-xs text-muted-foreground">participants</div>
                  </div>
                  <Badge 
                    variant={event.status === "Completed" ? "secondary" : "outline"}
                    className={event.status === "Completed" ? "bg-green-100 text-green-800 border-green-200" : ""}
                  >
                    {event.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </NGOLayout>
  );
};

export default NGOProfile;
