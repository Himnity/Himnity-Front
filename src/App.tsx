import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/contexts/language-context";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import type { ComponentType, LazyExoticComponent } from "react";

type PreloadableComponent<T extends ComponentType<any>> = LazyExoticComponent<T> & {
  preload?: () => Promise<{ default: T }>;
};

const lazyWithPreload = <T extends ComponentType<any>>(importer: () => Promise<{ default: T }>): PreloadableComponent<T> => {
  const Component = lazy(importer) as PreloadableComponent<T>;
  Component.preload = importer;
  return Component;
};

// Route-level code splitting
const Home = lazyWithPreload(() => import("@/pages/Home"));
const Events = lazyWithPreload(() => import("@/pages/Events"));
const EventDetails = lazyWithPreload(() => import("@/pages/EventDetails"));
const Storybook = lazyWithPreload(() => import("@/pages/Storybook"));
const HallOfFame = lazyWithPreload(() => import("@/pages/HallOfFame"));
const Profile = lazyWithPreload(() => import("@/pages/Profile"));
const NotFound = lazyWithPreload(() => import("@/pages/NotFound"));
// NGO Pages
const NGODashboard = lazyWithPreload(() => import("@/pages/NGO/NGODashboard"));
const NGOProposals = lazyWithPreload(() => import("@/pages/NGO/NGOProposals"));
const NGOEvents = lazyWithPreload(() => import("@/pages/NGO/NGOEvents"));
const NGOCreateEvent = lazyWithPreload(() => import("@/pages/NGO/NGOCreateEvent"));
const NGOAttendees = lazyWithPreload(() => import("@/pages/NGO/NGOAttendees"));
const NGOEventRequests = lazyWithPreload(() => import("@/pages/NGO/NGOEventRequests"));
const NGOProfile = lazyWithPreload(() => import("@/pages/NGO/NGOProfile"));
const NGOPublicProfile = lazyWithPreload(() => import("@/pages/NGO/NGOPublicProfile"));

const lazyRoutesToWarm = [
  Events,
  EventDetails,
  Storybook,
  HallOfFame,
  Profile,
  NGODashboard,
  NGOProposals,
  NGOEvents,
  NGOCreateEvent,
  NGOAttendees,
  NGOEventRequests,
  NGOProfile,
  NGOPublicProfile,
] as const;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      lazyRoutesToWarm.forEach((Component) => {
        Component.preload?.();
      });
    }, 1200);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
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
};

export default App;
