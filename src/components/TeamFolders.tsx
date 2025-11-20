import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Folder, FileText, Plus, Users, Lock, Eye, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface WorkflowItem {
  id: string;
  name: string;
  permission: 'viewer' | 'editor' | 'admin';
  isActive: boolean;
  lastModified: string;
  owner: string;
}

interface FolderItem {
  id: string;
  name: string;
  workflows: WorkflowItem[];
  members: number;
}

const mockFolders: FolderItem[] = [
  {
    id: '1',
    name: 'Permit Processing',
    members: 5,
    workflows: [
      {
        id: 'w1',
        name: 'Building Permit Automation',
        permission: 'editor',
        isActive: true,
        lastModified: '2 hours ago',
        owner: 'Sarah Chen',
      },
      {
        id: 'w2',
        name: 'Zoning Review Flow',
        permission: 'viewer',
        isActive: true,
        lastModified: '1 day ago',
        owner: 'Mike Torres',
      },
    ],
  },
  {
    id: '2',
    name: 'License Management',
    members: 3,
    workflows: [
      {
        id: 'w3',
        name: 'License Renewal Alerts',
        permission: 'admin',
        isActive: true,
        lastModified: '3 hours ago',
        owner: 'Lisa Wang',
      },
    ],
  },
];

const getPermissionIcon = (permission: string) => {
  switch (permission) {
    case 'admin':
      return <Lock className="w-3 h-3" />;
    case 'editor':
      return <Edit className="w-3 h-3" />;
    default:
      return <Eye className="w-3 h-3" />;
  }
};

const getPermissionColor = (permission: string) => {
  switch (permission) {
    case 'admin':
      return 'bg-primary text-primary-foreground';
    case 'editor':
      return 'bg-accent text-accent-foreground';
    default:
      return 'bg-secondary text-secondary-foreground';
  }
};

export const TeamFolders = () => {
  const navigate = useNavigate();
  const [folders] = useState<FolderItem[]>(mockFolders);
  const [expandedFolder, setExpandedFolder] = useState<string | null>('1');

  const toggleFolder = (folderId: string) => {
    setExpandedFolder(expandedFolder === folderId ? null : folderId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Team Folders</h2>
          <p className="text-muted-foreground">Shared workflows organized by team</p>
        </div>
        <Button className="bg-gradient-to-r from-accent to-accent/80">
          <Plus className="w-4 h-4 mr-2" />
          New Folder
        </Button>
      </div>

      <div className="space-y-4">
        {folders.map((folder) => (
          <Card key={folder.id} className="overflow-hidden">
            <div
              className="flex items-center justify-between p-6 cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => toggleFolder(folder.id)}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-teal-medium flex items-center justify-center">
                  <Folder className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{folder.name}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <Badge variant="outline" className="flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      {folder.workflows.length} workflows
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {folder.members} members
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {expandedFolder === folder.id && (
              <div className="border-t border-border bg-muted/20 p-4">
                <div className="space-y-3">
                  {folder.workflows.map((workflow) => (
                    <div
                      key={workflow.id}
                      className="flex items-center justify-between p-4 bg-card rounded-lg hover:shadow-card transition-all cursor-pointer"
                      onClick={() => navigate(`/automations/${workflow.id}`)}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{workflow.name}</h4>
                          <Badge
                            variant="outline"
                            className={`${getPermissionColor(workflow.permission)} flex items-center gap-1 text-xs`}
                          >
                            {getPermissionIcon(workflow.permission)}
                            {workflow.permission}
                          </Badge>
                          {workflow.isActive && (
                            <Badge variant="default" className="bg-success text-success-foreground">
                              Active
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Owner: {workflow.owner} • {workflow.lastModified}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};
