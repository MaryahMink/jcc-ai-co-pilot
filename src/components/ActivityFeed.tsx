import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  FileEdit, 
  Play, 
  Pause, 
  Settings, 
  UserPlus, 
  Workflow,
  Clock
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ActivityItem {
  id: string;
  action: string;
  user: string;
  workflow?: string;
  timestamp: Date;
  type: 'created' | 'updated' | 'activated' | 'deactivated' | 'permission' | 'trigger';
}

const activities: ActivityItem[] = [
  {
    id: '1',
    action: 'created workflow',
    user: 'Sarah Chen',
    workflow: 'Permit Application Processor',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    type: 'created',
  },
  {
    id: '2',
    action: 'updated step',
    user: 'Mike Torres',
    workflow: 'License Renewal Alert',
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    type: 'updated',
  },
  {
    id: '3',
    action: 'activated workflow',
    user: 'Lisa Wang',
    workflow: 'Inspection Scheduler',
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    type: 'activated',
  },
  {
    id: '4',
    action: 'changed permissions',
    user: 'David Kim',
    workflow: 'Complaint Handler',
    timestamp: new Date(Date.now() - 1000 * 60 * 180),
    type: 'permission',
  },
  {
    id: '5',
    action: 'changed trigger',
    user: 'Sarah Chen',
    workflow: 'Document Approval Flow',
    timestamp: new Date(Date.now() - 1000 * 60 * 240),
    type: 'trigger',
  },
  {
    id: '6',
    action: 'deactivated workflow',
    user: 'Mike Torres',
    workflow: 'Old Payment System',
    timestamp: new Date(Date.now() - 1000 * 60 * 300),
    type: 'deactivated',
  },
];

const getActivityIcon = (type: ActivityItem['type']) => {
  switch (type) {
    case 'created':
      return <Workflow className="w-4 h-4" />;
    case 'updated':
      return <FileEdit className="w-4 h-4" />;
    case 'activated':
      return <Play className="w-4 h-4" />;
    case 'deactivated':
      return <Pause className="w-4 h-4" />;
    case 'permission':
      return <UserPlus className="w-4 h-4" />;
    case 'trigger':
      return <Settings className="w-4 h-4" />;
    default:
      return <Clock className="w-4 h-4" />;
  }
};

const getActivityColor = (type: ActivityItem['type']) => {
  switch (type) {
    case 'created':
      return 'bg-accent/10 text-accent border-accent/20';
    case 'updated':
      return 'bg-primary/10 text-primary border-primary/20';
    case 'activated':
      return 'bg-success/10 text-success border-success/20';
    case 'deactivated':
      return 'bg-muted text-muted-foreground border-border';
    case 'permission':
      return 'bg-primary-dark/10 text-primary-dark border-primary-dark/20';
    case 'trigger':
      return 'bg-teal-medium/10 text-teal-medium border-teal-medium/20';
    default:
      return 'bg-muted text-muted-foreground border-border';
  }
};

export const ActivityFeed = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Activity Feed</CardTitle>
        <CardDescription>Recent team actions and workflow changes</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex gap-4 p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${getActivityColor(activity.type)} border`}>
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">
                    <span className="font-semibold">{activity.user}</span>{' '}
                    <span className="text-muted-foreground">{activity.action}</span>
                  </p>
                  {activity.workflow && (
                    <p className="text-sm font-medium text-primary mt-1">{activity.workflow}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                  </p>
                </div>
                <Badge variant="outline" className={getActivityColor(activity.type)}>
                  {activity.type}
                </Badge>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
