import { NavLink } from "@/components/NavLink";
import { Home, Workflow, BookOpen, HelpCircle } from "lucide-react";
import jccLogo from "@/assets/jcc-logo.svg";

const Navigation = () => {
  const navItems = [
    { to: "/", label: "Home", icon: Home },
    { to: "/automations", label: "Automations", icon: Workflow },
    { to: "/guides", label: "Guides", icon: BookOpen },
    { to: "/faq", label: "FAQ", icon: HelpCircle },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-teal-medium backdrop-blur-xl border-b border-primary-dark/20 shadow-elevated">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-4">
            <img 
              src={jccLogo} 
              alt="Jacksonville Civic Council" 
              className="h-10 w-auto object-contain"
            />
            <div className="border-l border-white/30 h-8" />
            <div>
              <h1 className="text-lg font-bold text-white tracking-wide">Jacksonville Civic Council</h1>
              <p className="text-xs text-accent font-semibold uppercase tracking-wider">AI Command Center</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white/90 hover:bg-white/10 hover:text-white transition-all duration-300"
                activeClassName="bg-white/20 text-white shadow-glow"
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
                className="p-3 rounded-xl text-white/90 hover:bg-white/10 hover:text-white transition-all duration-300"
                activeClassName="bg-white/20 text-white shadow-glow"
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
