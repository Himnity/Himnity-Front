import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/contexts/language-context";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

// Route-level code splitting
const Home = lazy(() => import("./pages/Home"));
const Events = lazy(() => import("./pages/Events"));
const EventDetails = lazy(() => import("./pages/EventDetails"));
const Storybook = lazy(() => import("./pages/Storybook"));
const HallOfFame = lazy(() => import("./pages/HallOfFame"));
const Profile = lazy(() => import("./pages/Profile"));
const NotFound = lazy(() => import("./pages/NotFound"));
// NGO Pages
const NGODashboard = lazy(() => import("./pages/NGO/NGODashboard"));
const NGOProposals = lazy(() => import("./pages/NGO/NGOProposals"));
const NGOEvents = lazy(() => import("./pages/NGO/NGOEvents"));
const NGOCreateEvent = lazy(() => import("./pages/NGO/NGOCreateEvent"));
const NGOAttendees = lazy(() => import("./pages/NGO/NGOAttendees"));
const NGOEventRequests = lazy(() => import("./pages/NGO/NGOEventRequests"));
const NGOProfile = lazy(() => import("./pages/NGO/NGOProfile"));
const NGOPublicProfile = lazy(() => import("./pages/NGO/NGOPublicProfile"));

const queryClient = new QueryClient();

const App = () => (
  <LanguageProvider>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<div className="p-6 text-center text-sm text-muted-foreground">Loading…</div>}>
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
              <Route path="/ngo/:slug" element={<NGOPublicProfile />} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </LanguageProvider>
);

export default App;
