import Navigation from '@/components/Navigation';
import { TeamFolders } from '@/components/TeamFolders';
import { ActivityFeed } from '@/components/ActivityFeed';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { BarChart3 } from 'lucide-react';

const TeamCollaboration = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Team Collaboration</h1>
            <p className="text-muted-foreground mt-2">Manage shared workflows and team activity</p>
          </div>
          <Button 
            onClick={() => navigate('/team/analytics')}
            className="bg-gradient-to-r from-primary to-teal-medium"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            View Analytics
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <TeamFolders />
          </div>
          
          <div className="lg:col-span-1">
            <ActivityFeed />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCollaboration;
