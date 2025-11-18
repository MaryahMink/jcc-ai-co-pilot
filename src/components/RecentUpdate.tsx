import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface RecentUpdateProps {
  title: string;
  description: string;
  date: string;
  category: string;
  to: string;
}

const RecentUpdate = ({ title, description, date, category, to }: RecentUpdateProps) => {
  return (
    <Link to={to} className="group">
      <Card className="bg-gradient-card shadow-card hover:shadow-depth transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-teal opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
        
        <CardContent className="p-6 relative z-10">
          <div className="flex items-start justify-between gap-3 mb-3">
            <h4 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">{title}</h4>
            <span className="text-xs px-3 py-1.5 rounded-full bg-accent/15 text-accent font-semibold whitespace-nowrap border border-accent/20">
              {category}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{description}</p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{date}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RecentUpdate;
