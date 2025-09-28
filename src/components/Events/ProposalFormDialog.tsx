import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";

interface ProposalFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ProposalFormDialog = ({ open, onOpenChange }: ProposalFormDialogProps) => {
  const [proposalForm, setProposalForm] = useState({
    name: "",
    email: "",
    eventTitle: "",
    description: "",
    purpose: "",
    targetGroup: "",
    location: "",
    timing: "",
    additional: ""
  });

  const handleSubmitProposal = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Event proposal submitted successfully!", {
      description: "NGOs will review your idea and may contact you if they're interested in organizing it."
    });
    onOpenChange(false);
    setProposalForm({
      name: "",
      email: "",
      eventTitle: "",
      description: "",
      purpose: "",
      targetGroup: "",
      location: "",
      timing: "",
      additional: ""
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card text-card-foreground border shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-foreground text-xl">Event Idea Proposal Form</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmitProposal} className="space-y-6">
          {/* Your Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-foreground">Your Information</h3>
            <div className="space-y-3">
              <div>
                <Label htmlFor="name" className="text-foreground">Name *</Label>
                <Input
                  id="name"
                  required
                  value={proposalForm.name}
                  onChange={(e) => setProposalForm({...proposalForm, name: e.target.value})}
                  placeholder="Your full name"
                  className="bg-background text-foreground border-border"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-foreground">Email / Phone (optional)</Label>
                <Input
                  id="email"
                  value={proposalForm.email}
                  onChange={(e) => setProposalForm({...proposalForm, email: e.target.value})}
                  placeholder="your.email@example.com or phone number"
                  className="bg-background text-foreground border-border"
                />
              </div>
            </div>
          </div>

          {/* Event Idea */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-foreground">Event Idea</h3>
            <div className="space-y-3">
              <div>
                <Label htmlFor="eventTitle" className="text-foreground">Event Title / Name *</Label>
                <Input
                  id="eventTitle"
                  required
                  value={proposalForm.eventTitle}
                  onChange={(e) => setProposalForm({...proposalForm, eventTitle: e.target.value})}
                  placeholder="What's your event called?"
                  className="bg-background text-foreground border-border"
                />
              </div>
              <div>
                <Label htmlFor="description" className="text-foreground">Brief Description *</Label>
                <Textarea
                  id="description"
                  required
                  value={proposalForm.description}
                  onChange={(e) => setProposalForm({...proposalForm, description: e.target.value})}
                  placeholder="Tell us about your idea in a few sentences"
                  rows={3}
                  className="bg-background text-foreground border-border"
                />
              </div>
            </div>
          </div>

          {/* Purpose */}
          <div className="space-y-3">
            <Label htmlFor="purpose" className="text-foreground">What's the goal of this event? *</Label>
            <Textarea
              id="purpose"
              required
              value={proposalForm.purpose}
              onChange={(e) => setProposalForm({...proposalForm, purpose: e.target.value})}
              placeholder="e.g., raise awareness, bring people together, support a cause"
              rows={2}
              className="bg-background text-foreground border-border"
            />
          </div>

          {/* Target Group */}
          <div className="space-y-3">
            <Label htmlFor="targetGroup" className="text-foreground">Who should this event be for? *</Label>
            <Select 
              required
              value={proposalForm.targetGroup}
              onValueChange={(value) => setProposalForm({...proposalForm, targetGroup: value})}
            >
              <SelectTrigger className="bg-background text-foreground border-border">
                <SelectValue placeholder="Select target audience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="students">Students</SelectItem>
                <SelectItem value="youth">Youth</SelectItem>
                <SelectItem value="families">Families</SelectItem>
                <SelectItem value="seniors">Seniors</SelectItem>
                <SelectItem value="community">General Community</SelectItem>
                <SelectItem value="professionals">Professionals</SelectItem>
                <SelectItem value="everyone">Everyone</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Location Preference */}
          <div className="space-y-3">
            <Label htmlFor="location" className="text-foreground">Which city in Tunisia? *</Label>
            <Select 
              required
              value={proposalForm.location}
              onValueChange={(value) => setProposalForm({...proposalForm, location: value})}
            >
              <SelectTrigger className="bg-background text-foreground border-border">
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tunis">Tunis</SelectItem>
                <SelectItem value="sousse">Sousse</SelectItem>
                <SelectItem value="monastir">Monastir</SelectItem>
                <SelectItem value="sfax">Sfax</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Timing */}
          <div className="space-y-3">
            <Label htmlFor="timing" className="text-foreground">What time period would be best for this event? *</Label>
            <Select 
              required
              value={proposalForm.timing}
              onValueChange={(value) => setProposalForm({...proposalForm, timing: value})}
            >
              <SelectTrigger className="bg-background text-foreground border-border">
                <SelectValue placeholder="Select time period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="october-2025">October 2025</SelectItem>
                <SelectItem value="november-2025">November 2025</SelectItem>
                <SelectItem value="december-2025">December 2025</SelectItem>
                <SelectItem value="january-2026">January 2026</SelectItem>
                <SelectItem value="february-2026">February 2026</SelectItem>
                <SelectItem value="march-2026">March 2026</SelectItem>
                <SelectItem value="flexible">Flexible</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Additional Notes */}
          <div className="space-y-3">
            <Label htmlFor="additional" className="text-foreground">Anything Else?</Label>
            <Textarea
              id="additional"
              value={proposalForm.additional}
              onChange={(e) => setProposalForm({...proposalForm, additional: e.target.value})}
              placeholder="Do you want to add anything else about your idea?"
              rows={2}
              className="bg-background text-foreground border-border"
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="gradient-primary"
            >
              Submit Proposal
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
