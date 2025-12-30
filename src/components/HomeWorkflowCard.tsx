import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { useState } from "react";
import WorkflowConfirmationDialog from "./WorkflowConfirmationDialog";
import WorkflowDetailSheet from "./WorkflowDetailSheet";

interface WorkflowDetails {
  howItWorks: string[];
  valueProposition: string[];
  createdBy?: string;
  webhookUrl?: string;
}

interface HomeWorkflowCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
  comingSoon?: boolean;
  workflowDetails: WorkflowDetails;
}

const HomeWorkflowCard = ({
  title,
  description,
  icon: Icon,
  iconColor = "text-primary",
  comingSoon = false,
  workflowDetails,
}: HomeWorkflowCardProps) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleCardClick = () => {
    if (!comingSoon) {
      setShowConfirmation(true);
    }
  };

  const handleConfirm = () => {
    setShowConfirmation(false);
    setShowDetails(true);
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        className={`block ${!comingSoon && "cursor-pointer group"}`}
      >
        <Card
          className={`h-full bg-teal-medium text-white shadow-elevated transition-all duration-300 border-0 relative overflow-hidden ${
            !comingSoon && "hover:shadow-glow hover:-translate-y-2"
          } ${comingSoon && "opacity-75"}`}
        >
          {!comingSoon && (
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          )}

          <CardContent className="p-8 relative z-10 text-center">
            <div className="flex flex-col items-center gap-6">
              <div
                className={`p-6 rounded-2xl bg-white/10 backdrop-blur-sm ${iconColor} transition-all duration-300 ${
                  !comingSoon && "group-hover:scale-110 group-hover:bg-white/20"
                }`}
              >
                <Icon className="w-12 h-12" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <h3 className="font-bold text-2xl">{title}</h3>
                  {comingSoon && (
                    <span className="text-xs px-3 py-1.5 rounded-full bg-accent text-white font-semibold uppercase tracking-wide">
                      Coming Soon
                    </span>
                  )}
                </div>
                <p className="text-base text-white/80 leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <WorkflowConfirmationDialog
        open={showConfirmation}
        onOpenChange={setShowConfirmation}
        onConfirm={handleConfirm}
        workflowTitle={title}
      />

      <WorkflowDetailSheet
        open={showDetails}
        onOpenChange={setShowDetails}
        workflow={{
          title,
          description,
          icon: Icon,
          ...workflowDetails,
        }}
      />
    </>
  );
};

export default HomeWorkflowCard;
