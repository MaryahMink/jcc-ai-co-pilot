import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, CheckCircle2, Circle, Play, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const WorkflowSetup = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isActivated, setIsActivated] = useState(false);

  const workflow = {
    name: "Gmail Auto-Responder",
    description: "Intelligent email responses using AI-powered sentiment analysis",
    requiredConnections: ["Gmail", "Google Calendar"],
    steps: [
      {
        id: 1,
        title: "Connect Gmail Account",
        description: "Authorize access to your Gmail account for monitoring and sending emails.",
      },
      {
        id: 2,
        title: "Configure Email Filters",
        description: "Set up rules to identify which emails should trigger automated responses.",
      },
      {
        id: 3,
        title: "Customize Response Templates",
        description: "Create or customize AI response templates for different scenarios.",
      },
      {
        id: 4,
        title: "Set Confidence Threshold",
        description: "Define minimum confidence level for auto-sending (recommended: 85%).",
      },
    ],
  };

  const progress = (completedSteps.length / workflow.steps.length) * 100;

  const toggleStep = (stepId: number) => {
    setCompletedSteps((prev) =>
      prev.includes(stepId)
        ? prev.filter((id) => id !== stepId)
        : [...prev, stepId]
    );
  };

  const handleTest = () => {
    toast({
      title: "Test Started",
      description: "Running workflow test with sample data...",
    });
    setTimeout(() => {
      toast({
        title: "Test Successful",
        description: "Your workflow is working correctly!",
      });
    }, 2000);
  };

  const handleActivate = () => {
    if (completedSteps.length === workflow.steps.length) {
      setIsActivated(true);
      toast({
        title: "Workflow Activated",
        description: `${workflow.name} is now running automatically.`,
      });
    } else {
      toast({
        title: "Complete All Steps",
        description: "Please complete all setup steps before activating.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <Link 
          to="/automations" 
          className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Automations
        </Link>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar Progress */}
          <aside className="lg:col-span-1">
            <Card className="sticky top-24 shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Setup Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Completed</span>
                    <span className="font-semibold text-foreground">
                      {completedSteps.length}/{workflow.steps.length}
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
                <div className="space-y-2">
                  {workflow.steps.map((step) => (
                    <div
                      key={step.id}
                      className={cn(
                        "flex items-center gap-2 text-sm",
                        completedSteps.includes(step.id)
                          ? "text-success"
                          : "text-muted-foreground"
                      )}
                    >
                      {completedSteps.includes(step.id) ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <Circle className="w-4 h-4" />
                      )}
                      <span className="truncate">{step.title}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Header */}
            <Card className="shadow-card">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                      {workflow.name}
                    </h1>
                    <p className="text-muted-foreground">{workflow.description}</p>
                  </div>
                  {isActivated && (
                    <Badge className="bg-success text-success-foreground">Active</Badge>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Required Connections:</Badge>
                  {workflow.requiredConnections.map((conn) => (
                    <Badge key={conn} className="bg-primary/10 text-primary">
                      {conn}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Steps */}
            <div className="space-y-4">
              {workflow.steps.map((step, index) => (
                <Card
                  key={step.id}
                  className={cn(
                    "shadow-card transition-all duration-300",
                    completedSteps.includes(step.id) &&
                      "ring-2 ring-success/30 bg-success/5"
                  )}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <button
                        onClick={() => toggleStep(step.id)}
                        className={cn(
                          "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all",
                          completedSteps.includes(step.id)
                            ? "bg-success text-success-foreground"
                            : "bg-primary/10 text-primary"
                        )}
                      >
                        {completedSteps.includes(step.id) ? (
                          <CheckCircle2 className="w-6 h-6" />
                        ) : (
                          index + 1
                        )}
                      </button>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground mb-4">{step.description}</p>
                        <Button
                          onClick={() => toggleStep(step.id)}
                          variant={completedSteps.includes(step.id) ? "outline" : "default"}
                          size="sm"
                        >
                          {completedSteps.includes(step.id) ? "Undo" : "Complete Step"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Button
                onClick={handleTest}
                variant="outline"
                size="lg"
                className="flex-1"
              >
                <Play className="w-4 h-4 mr-2" />
                Test Workflow
              </Button>
              <Button
                onClick={handleActivate}
                disabled={isActivated}
                size="lg"
                className="flex-1"
              >
                <Zap className="w-4 h-4 mr-2" />
                {isActivated ? "Workflow Active" : "Activate Workflow"}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WorkflowSetup;
