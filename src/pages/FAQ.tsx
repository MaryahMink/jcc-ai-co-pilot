import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Shield, Lock, Zap, AlertCircle } from "lucide-react";

const FAQ = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Common questions about AI automation, data safety, and best practices for using JCC AI Hub.
          </p>
        </section>

        {/* Best Practices Callout */}
        <Card className="mb-8 shadow-card bg-accent/5 border-accent/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Responsible AI Usage</h3>
                <p className="text-sm text-muted-foreground">
                  All automations follow strict data safety protocols. Your information is encrypted in transit and at rest, 
                  and AI responses are continuously monitored for accuracy and appropriateness. We never share your data with 
                  third parties or use it to train external models.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* General Questions */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Zap className="w-6 h-6 text-primary" />
            General Questions
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-card rounded-lg shadow-card border-0 px-6">
              <AccordionTrigger className="text-foreground hover:text-primary">
                What types of automations can I create?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                You can create automations for email responses, calendar management, Slack notifications, task creation, 
                and more. Each workflow can be customized with triggers, conditions, and actions tailored to your specific needs.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="bg-card rounded-lg shadow-card border-0 px-6">
              <AccordionTrigger className="text-foreground hover:text-primary">
                How do I test an automation before deploying it?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Every automation includes a test mode where you can simulate triggers and review AI-generated responses 
                before activating. We recommend running at least 5-10 test scenarios to ensure accuracy.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="bg-card rounded-lg shadow-card border-0 px-6">
              <AccordionTrigger className="text-foreground hover:text-primary">
                Can I pause or modify a running automation?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes, all automations can be paused, edited, or deleted at any time. Changes take effect immediately, 
                and you'll receive a confirmation notification when modifications are successfully deployed.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* Security Questions */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Lock className="w-6 h-6 text-primary-dark" />
            Data Safety & Security
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-4" className="bg-card rounded-lg shadow-card border-0 px-6">
              <AccordionTrigger className="text-foreground hover:text-primary">
                How is my data protected?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                All data is encrypted using AES-256 encryption at rest and TLS 1.3 in transit. Access is restricted to 
                authorized JCC staff only, and we conduct regular security audits to maintain the highest standards.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5" className="bg-card rounded-lg shadow-card border-0 px-6">
              <AccordionTrigger className="text-foreground hover:text-primary">
                What information does the AI have access to?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                AI models only access data explicitly authorized for each workflow. For example, an email automation can 
                only read messages matching your specified filters. No AI has access to your entire inbox or organizational data.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-6" className="bg-card rounded-lg shadow-card border-0 px-6">
              <AccordionTrigger className="text-foreground hover:text-primary">
                Are AI responses monitored for quality?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes, all AI-generated responses go through quality checks for accuracy, tone, and appropriateness. 
                Messages with low confidence scores are automatically flagged for human review before being sent.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* Prompt Best Practices */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-accent" />
            Prompt Best Practices
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-7" className="bg-card rounded-lg shadow-card border-0 px-6">
              <AccordionTrigger className="text-foreground hover:text-primary">
                How do I write effective AI prompts?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Be specific and provide context. Instead of "respond to email," try "write a professional response to 
                member inquiries about event registration, including next steps and a link to the registration page."
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-8" className="bg-card rounded-lg shadow-card border-0 px-6">
              <AccordionTrigger className="text-foreground hover:text-primary">
                Can I use examples in my prompts?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Absolutely! Providing example inputs and desired outputs helps the AI understand your expectations. 
                Include 2-3 examples for best results: "If the inquiry asks about membership, respond like this..."
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-9" className="bg-card rounded-lg shadow-card border-0 px-6">
              <AccordionTrigger className="text-foreground hover:text-primary">
                What if the AI makes a mistake?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Use the feedback system to report issues. This helps improve the model over time. You can also adjust 
                your prompt's specificity or add additional conditions to prevent similar mistakes in the future.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </main>
    </div>
  );
};

export default FAQ;
