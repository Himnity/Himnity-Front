import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Storybook from "./pages/Storybook";
import HallOfFame from "./pages/HallOfFame";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
// NGO Pages
import NGODashboard from "./pages/NGO/NGODashboard";
import NGOProposals from "./pages/NGO/NGOProposals";
import NGOEvents from "./pages/NGO/NGOEvents";
import NGOCreateEvent from "./pages/NGO/NGOCreateEvent";
import NGOAttendees from "./pages/NGO/NGOAttendees";
import NGOEventRequests from "./pages/NGO/NGOEventRequests";
import NGOProfile from "./pages/NGO/NGOProfile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Individual User Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/storybook" element={<Storybook />} />
          <Route path="/hall-of-fame" element={<HallOfFame />} />
          <Route path="/profile" element={<Profile />} />
          
          {/* NGO Routes */}
          <Route path="/ngo" element={<NGODashboard />} />
          <Route path="/ngo/proposals" element={<NGOProposals />} />
          <Route path="/ngo/events" element={<NGOEvents />} />
          <Route path="/ngo/events/create" element={<NGOCreateEvent />} />
          <Route path="/ngo/events/edit/:id" element={<NGOCreateEvent />} />
          <Route path="/ngo/events/:id/attendees" element={<NGOAttendees />} />
          <Route path="/ngo/events/:id/requests" element={<NGOEventRequests />} />
          <Route path="/ngo/profile" element={<NGOProfile />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
