-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create app_role enum for user permissions
CREATE TYPE public.app_role AS ENUM ('viewer', 'editor', 'admin');

-- Create teams table
CREATE TABLE public.teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create team_members table
CREATE TABLE public.team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL DEFAULT 'viewer',
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(team_id, user_id)
);

-- Create team_folders table
CREATE TABLE public.team_folders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  parent_folder_id UUID REFERENCES public.team_folders(id) ON DELETE CASCADE,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create workflows table
CREATE TABLE public.workflows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  workflow_data JSONB NOT NULL DEFAULT '{}',
  is_active BOOLEAN DEFAULT false,
  team_id UUID REFERENCES public.teams(id) ON DELETE SET NULL,
  folder_id UUID REFERENCES public.team_folders(id) ON DELETE SET NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create workflow_permissions table
CREATE TABLE public.workflow_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id UUID NOT NULL REFERENCES public.workflows(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL DEFAULT 'viewer',
  granted_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(workflow_id, user_id)
);

-- Create activity_feed table
CREATE TABLE public.activity_feed (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE,
  workflow_id UUID REFERENCES public.workflows(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  details JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_folders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workflow_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_feed ENABLE ROW LEVEL SECURITY;

-- Create helper function to check team membership
CREATE OR REPLACE FUNCTION public.is_team_member(_team_id UUID, _user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.team_members
    WHERE team_id = _team_id AND user_id = _user_id
  )
$$;

-- Create helper function to check team role
CREATE OR REPLACE FUNCTION public.has_team_role(_team_id UUID, _user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.team_members
    WHERE team_id = _team_id 
    AND user_id = _user_id 
    AND role = _role
  )
$$;

-- RLS Policies for teams
CREATE POLICY "Users can view teams they are members of"
ON public.teams FOR SELECT
TO authenticated
USING (public.is_team_member(id, auth.uid()));

CREATE POLICY "Admins can update their teams"
ON public.teams FOR UPDATE
TO authenticated
USING (public.has_team_role(id, auth.uid(), 'admin'));

CREATE POLICY "Authenticated users can create teams"
ON public.teams FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = created_by);

-- RLS Policies for team_members
CREATE POLICY "Users can view team members of their teams"
ON public.team_members FOR SELECT
TO authenticated
USING (public.is_team_member(team_id, auth.uid()));

CREATE POLICY "Team admins can manage members"
ON public.team_members FOR ALL
TO authenticated
USING (public.has_team_role(team_id, auth.uid(), 'admin'));

-- RLS Policies for team_folders
CREATE POLICY "Users can view folders in their teams"
ON public.team_folders FOR SELECT
TO authenticated
USING (public.is_team_member(team_id, auth.uid()));

CREATE POLICY "Editors and admins can manage folders"
ON public.team_folders FOR ALL
TO authenticated
USING (
  public.has_team_role(team_id, auth.uid(), 'admin') OR
  public.has_team_role(team_id, auth.uid(), 'editor')
);

-- RLS Policies for workflows
CREATE POLICY "Users can view workflows they have access to"
ON public.workflows FOR SELECT
TO authenticated
USING (
  created_by = auth.uid() OR
  (team_id IS NOT NULL AND public.is_team_member(team_id, auth.uid())) OR
  EXISTS (
    SELECT 1 FROM public.workflow_permissions
    WHERE workflow_id = workflows.id AND user_id = auth.uid()
  )
);

CREATE POLICY "Users can create workflows"
ON public.workflows FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Workflow creators and editors can update workflows"
ON public.workflows FOR UPDATE
TO authenticated
USING (
  created_by = auth.uid() OR
  EXISTS (
    SELECT 1 FROM public.workflow_permissions
    WHERE workflow_id = workflows.id 
    AND user_id = auth.uid() 
    AND role IN ('editor', 'admin')
  )
);

-- RLS Policies for workflow_permissions
CREATE POLICY "Users can view permissions for their workflows"
ON public.workflow_permissions FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.workflows
    WHERE id = workflow_id AND created_by = auth.uid()
  )
);

CREATE POLICY "Workflow admins can manage permissions"
ON public.workflow_permissions FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.workflows
    WHERE id = workflow_id AND created_by = auth.uid()
  )
);

-- RLS Policies for activity_feed
CREATE POLICY "Users can view activity for their teams and workflows"
ON public.activity_feed FOR SELECT
TO authenticated
USING (
  (team_id IS NOT NULL AND public.is_team_member(team_id, auth.uid())) OR
  (workflow_id IS NOT NULL AND EXISTS (
    SELECT 1 FROM public.workflows
    WHERE id = workflow_id AND (
      created_by = auth.uid() OR
      (team_id IS NOT NULL AND public.is_team_member(team_id, auth.uid()))
    )
  ))
);

CREATE POLICY "Users can create activity entries"
ON public.activity_feed FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER update_teams_updated_at
BEFORE UPDATE ON public.teams
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_team_folders_updated_at
BEFORE UPDATE ON public.team_folders
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_workflows_updated_at
BEFORE UPDATE ON public.workflows
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();