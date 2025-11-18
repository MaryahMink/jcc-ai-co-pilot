import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { Link } from "react-router-dom";

const AutomationDetail = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Navigation */}
        <Link 
          to="/automations" 
          className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Automations
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Gmail Auto-Responder
            </h1>
            <Badge className="bg-accent text-accent-foreground">Active</Badge>
          </div>
          <p className="text-lg text-muted-foreground">
            Intelligent email responses using AI-powered sentiment analysis and priority routing.
          </p>
        </div>

        {/* How It Works */}
        <Card className="mb-8 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="w-5 h-5 text-primary" />
              How It Works
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                1
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Email Monitoring</h4>
                <p className="text-sm text-muted-foreground">
                  The automation continuously monitors your Gmail inbox for new messages matching specified criteria.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                2
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">AI Analysis</h4>
                <p className="text-sm text-muted-foreground">
                  Each message is analyzed for sentiment, urgency, and context using natural language processing.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                3
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Smart Response</h4>
                <p className="text-sm text-muted-foreground">
                  Based on the analysis, an appropriate response is generated and sent, or the message is flagged for human review.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Configuration Example */}
        <Card className="mb-8 shadow-card">
          <CardHeader>
            <CardTitle>Configuration Example</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-secondary rounded-lg p-4 font-mono text-sm space-y-2">
              <div className="flex gap-2">
                <span className="text-muted-foreground">Trigger:</span>
                <span className="text-foreground">New email in inbox</span>
              </div>
              <div className="flex gap-2">
                <span className="text-muted-foreground">Filters:</span>
                <span className="text-foreground">Subject contains "inquiry" OR "question"</span>
              </div>
              <div className="flex gap-2">
                <span className="text-muted-foreground">Action:</span>
                <span className="text-foreground">Analyze sentiment → Generate response → Send</span>
              </div>
              <div className="flex gap-2">
                <span className="text-muted-foreground">Fallback:</span>
                <span className="text-foreground">Flag for manual review if confidence &lt; 85%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Best Practices */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-accent" />
              Best Practices
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-3">
              <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <p className="text-sm text-foreground">
                <strong>Review periodically:</strong> Check flagged messages weekly to ensure AI responses align with your communication standards.
              </p>
            </div>
            <div className="flex gap-3">
              <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <p className="text-sm text-foreground">
                <strong>Update templates:</strong> Refine response templates based on recipient feedback and common inquiry types.
              </p>
            </div>
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <p className="text-sm text-foreground">
                <strong>Data privacy:</strong> Ensure sensitive information is never included in automated responses. Configure exclusion rules accordingly.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AutomationDetail;
