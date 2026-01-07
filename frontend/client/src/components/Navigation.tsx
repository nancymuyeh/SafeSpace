import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { HeartHandshake, Home, MessageCircle, LogIn, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navigation() {
  const [location] = useLocation();
  const { user, logout, isLoggingOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location === path;

  const links = [
    { href: "/", label: "Home", icon: Home },
    { href: "/community", label: "Community", icon: MessageCircle },
    { href: "/resources", label: "Get Help", icon: HeartHandshake },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary/10 p-2 rounded-full group-hover:bg-primary/20 transition-colors">
            <HeartHandshake className="w-6 h-6 text-primary" />
          </div>
          <span className="font-display text-xl font-bold text-foreground">SafeSpace</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive(link.href) ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          
          <div className="h-6 w-px bg-border mx-2" />

          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-muted-foreground">
                Hi, Stranger
              </span>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => logout()}
                disabled={isLoggingOut}
                className="text-muted-foreground hover:text-destructive"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          ) : (
            <Button variant="outline" size="sm" asChild className="rounded-full">
              <a href="/api/login">
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </a>
            </Button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b bg-background"
          >
            <nav className="flex flex-col p-4 gap-2">
              {links.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    isActive(link.href) 
                      ? "bg-primary/10 text-primary" 
                      : "hover:bg-muted text-muted-foreground"
                  }`}
                >
                  <link.icon className="w-5 h-5" />
                  {link.label}
                </Link>
              ))}
              <div className="h-px bg-border my-2" />
              {user ? (
                <button
                  onClick={() => logout()}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors w-full text-left"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              ) : (
                <a 
                  href="/api/login"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary text-primary-foreground font-medium justify-center"
                >
                  <LogIn className="w-5 h-5" />
                  Login
                </a>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
