import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { LucideIcon, Play, Zap, CheckCircle, Clock, Users } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface WorkflowDetailSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workflow: {
    title: string;
    description: string;
    icon: LucideIcon;
    howItWorks: string[];
    valueProposition: string[];
    createdBy?: string;
  } | null;
}

const WorkflowDetailSheet = ({
  open,
  onOpenChange,
  workflow,
}: WorkflowDetailSheetProps) => {
  if (!workflow) return null;

  const handleActivateWorkflow = () => {
    toast({
      title: "Workflow Activation Requested",
      description: `The ${workflow.title} workflow activation has been initiated. Connect your n8n instance to complete setup.`,
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="bg-card border-border overflow-y-auto w-full sm:max-w-lg">
        <SheetHeader className="pb-6">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-4 rounded-xl bg-primary/10">
              <workflow.icon className="w-8 h-8 text-primary" />
            </div>
            <div>
              <SheetTitle className="text-2xl text-foreground">{workflow.title}</SheetTitle>
              {workflow.createdBy && (
                <p className="text-sm text-muted-foreground mt-1">
                  Created by <span className="text-primary font-medium">{workflow.createdBy}</span>
                </p>
              )}
            </div>
          </div>
          <SheetDescription className="text-muted-foreground text-base">
            {workflow.description}
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6">
          {/* Activation Button */}
          <Button
            onClick={handleActivateWorkflow}
            className="w-full bg-accent hover:bg-accent/90 text-white font-semibold py-6 text-lg rounded-xl shadow-glow"
          >
            <Play className="w-5 h-5 mr-2" />
            Activate n8n Workflow
          </Button>

          {/* How It Works */}
          <div className="bg-muted/30 rounded-xl p-5 border border-border/50">
            <h3 className="flex items-center gap-2 font-bold text-lg text-foreground mb-4">
              <Zap className="w-5 h-5 text-accent" />
              How It Works
            </h3>
            <ol className="space-y-3">
              {workflow.howItWorks.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="text-muted-foreground text-sm leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Value Proposition */}
          <div className="bg-primary/5 rounded-xl p-5 border border-primary/20">
            <h3 className="flex items-center gap-2 font-bold text-lg text-foreground mb-4">
              <CheckCircle className="w-5 h-5 text-primary" />
              Value for Jacksonville Civic Council
            </h3>
            <ul className="space-y-3">
              {workflow.valueProposition.map((value, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                  </span>
                  <span className="text-muted-foreground text-sm leading-relaxed">{value}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer Info */}
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border/50">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>Automated workflow</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>Team-wide access</span>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default WorkflowDetailSheet;
