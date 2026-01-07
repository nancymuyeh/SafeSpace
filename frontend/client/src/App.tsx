import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/Navigation";
import Home from "@/pages/Home";
import Community from "@/pages/Community";
import Resources from "@/pages/Resources";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="min-h-screen bg-background font-body text-foreground">
      <Navigation />
      <main>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/community" component={Community} />
          <Route path="/resources" component={Resources} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
