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
    <Link to={to}>
      <Card className="shadow-card hover:shadow-card-hover transition-all duration-200 hover:-translate-y-1">
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h4 className="font-semibold text-foreground">{title}</h4>
            <span className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent font-medium whitespace-nowrap">
              {category}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{description}</p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>{date}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RecentUpdate;
