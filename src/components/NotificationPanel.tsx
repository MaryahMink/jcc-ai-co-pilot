import { useState, useEffect } from "react";
import { Bell, X, Check, Mail, MessageSquare, Workflow, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

type NotificationType = "email" | "slack" | "workflow" | "system";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "workflow",
      title: "Email Automation Completed",
      message: "Successfully processed 25 emails",
      timestamp: "2 minutes ago",
      read: false,
    },
    {
      id: "2",
      type: "slack",
      title: "New Slack Integration",
      message: "Slack workspace connected successfully",
      timestamp: "1 hour ago",
      read: false,
    },
    {
      id: "3",
      type: "system",
      title: "New Template Available",
      message: "Check out the Meeting Prep Workflow template",
      timestamp: "3 hours ago",
      read: true,
    },
    {
      id: "4",
      type: "email",
      title: "Gmail Sync Complete",
      message: "All emails synchronized",
      timestamp: "5 hours ago",
      read: true,
    },
  ]);

  const [open, setOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case "email":
        return <Mail className="w-4 h-4" />;
      case "slack":
        return <MessageSquare className="w-4 h-4" />;
      case "workflow":
        return <Workflow className="w-4 h-4" />;
      case "system":
        return <Info className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: NotificationType) => {
    switch (type) {
      case "email":
        return "bg-primary/10 text-primary border-primary/20";
      case "slack":
        return "bg-accent/10 text-accent border-accent/20";
      case "workflow":
        return "bg-teal-medium/10 text-teal-medium border-teal-medium/20";
      case "system":
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-xl text-white/90 hover:bg-white/10 hover:text-white transition-all duration-300"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-accent text-accent-foreground border-0 text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md bg-card border-border">
        <SheetHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-2xl font-bold text-foreground">
              Notifications
            </SheetTitle>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="text-xs text-primary hover:text-primary hover:bg-primary/10"
              >
                <Check className="w-3 h-3 mr-1" />
                Mark all read
              </Button>
            )}
          </div>
        </SheetHeader>
        
        <ScrollArea className="h-[calc(100vh-120px)] mt-6 pr-4">
          <div className="space-y-3">
            {notifications.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Bell className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>No notifications</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`relative p-4 rounded-xl border transition-all duration-300 hover:shadow-card ${
                    notification.read
                      ? "bg-card/50 border-border/50"
                      : "bg-card border-primary/20 shadow-sm"
                  }`}
                  onClick={() => !notification.read && markAsRead(notification.id)}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-6 w-6 text-muted-foreground hover:text-foreground"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeNotification(notification.id);
                    }}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                  
                  <div className="flex items-start gap-3 pr-6">
                    <div
                      className={`p-2 rounded-lg border ${getTypeColor(notification.type)}`}
                    >
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-sm text-foreground truncate">
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <div className="w-2 h-2 rounded-full bg-accent shrink-0" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {notification.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default NotificationPanel;
