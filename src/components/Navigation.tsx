import { NavLink } from "@/components/NavLink";
import { Home, Workflow, BookOpen, HelpCircle } from "lucide-react";

const Navigation = () => {
  const navItems = [
    { to: "/", label: "Home", icon: Home },
    { to: "/automations", label: "Automations", icon: Workflow },
    { to: "/guides", label: "Guides", icon: BookOpen },
    { to: "/faq", label: "FAQ", icon: HelpCircle },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">J</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">JCC AI Hub</h1>
              <p className="text-xs text-muted-foreground">Automation Command Center</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                activeClassName="bg-primary/10 text-primary"
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Mobile menu */}
          <div className="flex md:hidden gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className="p-2 rounded-lg text-foreground hover:bg-secondary transition-colors"
                activeClassName="bg-primary/10 text-primary"
              >
                <item.icon className="w-5 h-5" />
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
