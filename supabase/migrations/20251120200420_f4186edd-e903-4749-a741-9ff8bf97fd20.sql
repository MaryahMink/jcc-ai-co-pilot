-- Add DELETE policy for workflows table
-- Allow workflow creators and admins to delete workflows

CREATE POLICY "Workflow creators and admins can delete workflows"
ON public.workflows
FOR DELETE
USING (
  created_by = auth.uid() 
  OR EXISTS (
    SELECT 1 
    FROM public.workflow_permissions
    WHERE workflow_permissions.workflow_id = workflows.id
      AND workflow_permissions.user_id = auth.uid()
      AND workflow_permissions.role = 'admin'::app_role
  )
);