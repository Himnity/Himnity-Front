import { NGOLayout } from "@/components/Layout/NGOLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Search, 
  Filter, 
  TrendingUp, 
  Calendar, 
  MapPin, 
  User,
  CheckCircle,
  Clock,
  Heart
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// Mock proposals data
const proposals = [
  {
    id: "p1",
    title: "Mobile Food Pantry",
    description: "Bring healthy food options to underserved neighborhoods using a mobile distribution system that can reach areas with limited access to fresh groceries.",
    category: "Social Services",
    proposedBy: "Sarah Johnson",
    proposedDate: "Oct 5, 2025",
    preferredTime: "November 2025",
    location: "Tunis",
    upvotes: 24,
    urgency: "High",
    targetGroup: "Families",
    purpose: "Address food insecurity in underserved communities and provide access to fresh, healthy groceries.",
    additionalNotes: "I have connections with local farmers and can help with sourcing fresh produce.",
    contactInfo: "sarah.j@email.com"
  },
  {
    id: "p2",
    title: "Youth Coding Bootcamp",
    description: "Free coding classes for teenagers to learn web development and prepare for tech careers. Would include mentorship from local developers.",
    category: "Education",
    proposedBy: "Alex Chen",
    proposedDate: "Sep 28, 2025",
    preferredTime: "December 2025",
    location: "Sousse",
    upvotes: 18,
    urgency: "Medium",
    targetGroup: "Youth",
    purpose: "Bridge the digital divide and provide tech skills to young people for better career opportunities.",
    additionalNotes: "I can help find volunteer mentors from the local tech community.",
    contactInfo: "alex.chen@email.com"
  },
  {
    id: "p3",
    title: "Community Art Mural Project",
    description: "Create a collaborative mural that represents our diverse community, involving local artists and residents of all ages.",
    category: "Arts",
    proposedBy: "Maria Rodriguez",
    proposedDate: "Oct 12, 2025",
    preferredTime: "January 2026",
    location: "Sfax",
    upvotes: 31,
    urgency: "Low",
    targetGroup: "Everyone",
    purpose: "Foster community unity and celebrate cultural diversity through collaborative art.",
    additionalNotes: "I know several local artists who would love to participate and guide the project.",
    contactInfo: "maria.r@email.com"
  },
  {
    id: "p4",
    title: "Senior Digital Literacy Program",
    description: "Help elderly residents learn to use smartphones, computers, and online services for daily tasks.",
    category: "Education",
    proposedBy: "Ahmed Ben Ali",
    proposedDate: "Oct 1, 2025",
    preferredTime: "October 2025",
    location: "Monastir",
    upvotes: 15,
    urgency: "High",
    targetGroup: "Seniors",
    purpose: "Reduce digital divide among elderly and help them stay connected with family and access essential services.",
    additionalNotes: "I have experience teaching computer skills and can volunteer as an instructor.",
    contactInfo: "ahmed.benali@email.com"
  }
];

const NGOProposals = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedUrgency, setSelectedUrgency] = useState("all");
  const [selectedProposal, setSelectedProposal] = useState<any>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  const categories = ["all", "Education", "Social Services", "Arts", "Environment", "Health"];
  const urgencyLevels = ["all", "High", "Medium", "Low"];

  const filteredProposals = proposals.filter(proposal => {
    const matchesSearch = proposal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         proposal.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || proposal.category === selectedCategory;
    const matchesUrgency = selectedUrgency === "all" || proposal.urgency === selectedUrgency;
    
    return matchesSearch && matchesCategory && matchesUrgency;
  });

  const handleViewDetails = (proposal: any) => {
    setSelectedProposal(proposal);
    setIsDetailDialogOpen(true);
  };

  const handleAdoptProposal = (proposalId: string) => {
    toast.success("Proposal adopted successfully!", {
      description: "You can now create an event based on this proposal."
    });
    setIsDetailDialogOpen(false);
    // In real app, would navigate to create event with pre-filled data
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "High": return "bg-red-100 text-red-800 border-red-200";
      case "Medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <NGOLayout title="Community Proposals">
      <div className="space-y-4 p-4">
        {/* Search and Filters */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search proposals..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedUrgency} onValueChange={setSelectedUrgency}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Urgency" />
              </SelectTrigger>
              <SelectContent>
                {urgencyLevels.map((urgency) => (
                  <SelectItem key={urgency} value={urgency}>
                    {urgency === "all" ? "All Priority" : urgency}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-heading font-semibold">
            {filteredProposals.length} Proposal{filteredProposals.length !== 1 ? 's' : ''} Found
          </h2>
        </div>

        {/* Proposals List */}
        <div className="space-y-4">
          {filteredProposals.map((proposal) => (
            <Card key={proposal.id} className="p-4 card-civic border-l-4 border-l-primary">
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-heading font-semibold text-foreground text-lg leading-tight">
                      {proposal.title}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline">{proposal.category}</Badge>
                      <Badge className={getUrgencyColor(proposal.urgency)}>
                        {proposal.urgency} Priority
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 bg-muted/50 px-2 py-1 rounded-full">
                    <TrendingUp className="h-3 w-3 text-primary" />
                    <span className="text-sm font-medium">{proposal.upvotes} votes</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {proposal.description}
                </p>

                {/* Details */}
                <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{proposal.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{proposal.preferredTime}</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs bg-muted">
                        {getInitials(proposal.proposedBy)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <span className="text-sm text-muted-foreground">by {proposal.proposedBy}</span>
                      <div className="text-xs text-muted-foreground">{proposal.proposedDate}</div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetails(proposal)}
                    >
                      View Details
                    </Button>
                    <Button
                      size="sm"
                      className="gradient-primary"
                      onClick={() => handleAdoptProposal(proposal.id)}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Adopt
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Proposal Details Dialog */}
        {selectedProposal && (
          <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white text-gray-900 border shadow-lg">
              <DialogHeader>
                <DialogTitle className="text-gray-900 text-xl">{selectedProposal.title}</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6 text-gray-900">
                {/* Proposal Info */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{selectedProposal.category}</Badge>
                    <Badge className={getUrgencyColor(selectedProposal.urgency)}>
                      {selectedProposal.urgency} Priority
                    </Badge>
                    <div className="flex items-center space-x-1 bg-muted/50 px-2 py-1 rounded-full">
                      <TrendingUp className="h-3 w-3 text-primary" />
                      <span className="text-sm">{selectedProposal.upvotes} community votes</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed">{selectedProposal.description}</p>
                </div>

                {/* Event Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Target Audience</label>
                    <p className="text-gray-900">{selectedProposal.targetGroup}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Preferred Location</label>
                    <p className="text-gray-900">{selectedProposal.location}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Preferred Timing</label>
                    <p className="text-gray-900">{selectedProposal.preferredTime}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Proposed Date</label>
                    <p className="text-gray-900">{selectedProposal.proposedDate}</p>
                  </div>
                </div>

                {/* Purpose */}
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">Purpose & Goals</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedProposal.purpose}</p>
                </div>

                {/* Additional Notes */}
                {selectedProposal.additionalNotes && (
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">Additional Notes</h3>
                    <p className="text-gray-700 leading-relaxed">{selectedProposal.additionalNotes}</p>
                  </div>
                )}

                {/* Proposer Info */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">Proposed By</h3>
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-primary text-white">
                        {getInitials(selectedProposal.proposedBy)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-900">{selectedProposal.proposedBy}</p>
                      <p className="text-sm text-gray-600">{selectedProposal.contactInfo}</p>
                      <p className="text-xs text-gray-500">Submitted {selectedProposal.proposedDate}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsDetailDialogOpen(false)}
                  >
                    Close
                  </Button>
                  <Button
                    className="gradient-primary"
                    onClick={() => handleAdoptProposal(selectedProposal.id)}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Adopt Proposal
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </NGOLayout>
  );
};

export default NGOProposals;