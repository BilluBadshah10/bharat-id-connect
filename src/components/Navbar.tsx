import { Link, useLocation } from "react-router-dom";
import { Shield, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import emblem from "@/assets/ashoka-emblem.png";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: "/", label: "Home" },
    { to: "/enroll", label: "Enroll" },
    { to: "/login", label: "Login" },
    { to: "/dashboard", label: "Dashboard" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      {/* Tricolor stripe */}
      <div className="h-1 bg-tricolor-stripe" />

      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 group">
          <img src={emblem} alt="National Emblem" className="h-9 w-9 transition-transform group-hover:scale-105" />
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-foreground leading-tight">
              DigiVerify
            </span>
            <span className="text-[10px] text-muted-foreground leading-tight">
              National Identity Verification
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground ${
                location.pathname === link.to
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/login">
            <Button size="sm" className="ml-2 shadow-[var(--shadow-saffron)] transition-all duration-200 hover:scale-105">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-md text-foreground hover:bg-accent transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-card animate-fade-in">
          <div className="flex flex-col p-4 gap-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
