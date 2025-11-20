import { useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Play, Plus, Trash2, Save, ZoomIn, ZoomOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';

const nodeTypes = {
  trigger: { label: 'Trigger', color: 'from-accent to-accent/80' },
  action: { label: 'Action', color: 'from-primary to-teal-medium' },
  condition: { label: 'Condition', color: 'from-primary-dark to-primary' },
};

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'default',
    data: { label: 'When form is submitted', type: 'trigger' },
    position: { x: 250, y: 50 },
    className: 'bg-gradient-to-br from-accent to-accent/80 text-white border-accent/50 rounded-xl shadow-glow',
  },
];

const initialEdges: Edge[] = [];

const WorkflowBuilder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [nodeConfig, setNodeConfig] = useState({ name: '', description: '', type: 'action' });

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, animated: true, className: 'stroke-accent stroke-2' }, eds)),
    [setEdges]
  );

  const addNode = (type: keyof typeof nodeTypes) => {
    const newNode: Node = {
      id: `${nodes.length + 1}`,
      type: 'default',
      data: { label: `New ${nodeTypes[type].label}`, type },
      position: { x: Math.random() * 400 + 100, y: Math.random() * 300 + 100 },
      className: `bg-gradient-to-br ${nodeTypes[type].color} text-white border-2 border-primary/30 rounded-xl shadow-card hover:shadow-card-hover transition-all`,
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
    setNodeConfig({
      name: String(node.data.label || ''),
      description: String(node.data.description || ''),
      type: String(node.data.type || 'action'),
    });
  }, []);

  const deleteNode = () => {
    if (!selectedNode) return;
    setNodes((nds) => nds.filter((n) => n.id !== selectedNode.id));
    setEdges((eds) => eds.filter((e) => e.source !== selectedNode.id && e.target !== selectedNode.id));
    setSelectedNode(null);
  };

  const testNode = () => {
    if (!selectedNode) return;
    toast({
      title: 'Testing Node',
      description: `Testing "${selectedNode.data.label}"...`,
    });
    
    setTimeout(() => {
      toast({
        title: 'Test Successful',
        description: `Node "${selectedNode.data.label}" executed successfully!`,
        variant: 'default',
      });
    }, 1500);
  };

  const saveWorkflow = () => {
    toast({
      title: 'Workflow Saved',
      description: 'Your workflow has been saved successfully.',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate('/automations')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Workflow Builder</h1>
              <p className="text-muted-foreground">Design your automation flow</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={saveWorkflow}>
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* Node Palette */}
          <Card className="lg:col-span-1 bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg">Add Nodes</CardTitle>
              <CardDescription>Drag or click to add</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(nodeTypes).map(([key, { label, color }]) => (
                <Button
                  key={key}
                  onClick={() => addNode(key as keyof typeof nodeTypes)}
                  className={`w-full bg-gradient-to-br ${color} hover:opacity-90`}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {label}
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Canvas */}
          <div className="lg:col-span-2 border border-border rounded-xl overflow-hidden bg-background-layer-1">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodeClick={onNodeClick}
              fitView
              className="bg-background-layer-1"
            >
              <Background variant={BackgroundVariant.Dots} gap={16} size={1} className="opacity-30" />
              <Controls className="bg-card border-border" />
              <MiniMap className="bg-card border-border" nodeColor="#208591" />
            </ReactFlow>
          </div>

          {/* Node Configuration Panel */}
          <Card className="lg:col-span-1 bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg">Node Configuration</CardTitle>
              <CardDescription>
                {selectedNode ? `Editing: ${selectedNode.data.label}` : 'Select a node to configure'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedNode ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="node-type">Type</Label>
                    <Select value={nodeConfig.type} onValueChange={(v) => setNodeConfig({ ...nodeConfig, type: v })}>
                      <SelectTrigger id="node-type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="trigger">Trigger</SelectItem>
                        <SelectItem value="action">Action</SelectItem>
                        <SelectItem value="condition">Condition</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="node-name">Name</Label>
                    <Input
                      id="node-name"
                      value={nodeConfig.name}
                      onChange={(e) => setNodeConfig({ ...nodeConfig, name: e.target.value })}
                      placeholder="Node name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="node-description">Description</Label>
                    <Textarea
                      id="node-description"
                      value={nodeConfig.description}
                      onChange={(e) => setNodeConfig({ ...nodeConfig, description: e.target.value })}
                      placeholder="Describe what this node does"
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" onClick={testNode} className="flex-1">
                      <Play className="w-4 h-4 mr-2" />
                      Test
                    </Button>
                    <Button variant="destructive" onClick={deleteNode} className="flex-1">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <h4 className="text-sm font-semibold mb-2">Test Results</h4>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>Click "Test" to run this node</p>
                      <Badge variant="outline" className="mt-2">Ready to test</Badge>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">Click on a node in the canvas to configure it.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WorkflowBuilder;
