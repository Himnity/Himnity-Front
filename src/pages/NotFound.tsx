import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home as HomeIcon } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-6xl font-heading font-bold text-primary">404</h1>
          <h2 className="text-2xl font-heading font-semibold text-foreground">Page Not Found</h2>
          <p className="text-muted-foreground max-w-md">
            Looks like this page doesn't exist. Let's get you back to making a difference in your community!
          </p>
        </div>
        <Button asChild className="gradient-primary">
          <a href="/" className="inline-flex items-center space-x-2">
            <HomeIcon className="h-4 w-4" />
            <span>Back to Home</span>
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
