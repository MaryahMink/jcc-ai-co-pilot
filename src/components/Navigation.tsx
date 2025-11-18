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
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border shadow-depth">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-teal flex items-center justify-center shadow-glow">
              <span className="text-primary-foreground font-bold text-xl">J</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">JCC AI Hub</h1>
              <p className="text-xs text-primary font-medium">Automation Command Center</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-foreground hover:bg-primary/5 transition-all duration-300"
                activeClassName="bg-gradient-teal text-primary-foreground shadow-glow"
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
                className="p-3 rounded-xl text-foreground hover:bg-primary/5 transition-all duration-300"
                activeClassName="bg-gradient-teal text-primary-foreground shadow-glow"
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
