
import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import EmptyState from '@/components/dashboardtwo/EmptyState';


const Settings = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Host Settings</h1>
      
      <EmptyState 
        icon={SettingsIcon}
        title="Settings"
        description="Configure your hosting preferences, commission models, and notification settings"
        actionLabel="Update Settings"
        onAction={() => alert('Settings configuration coming soon!')}
      />
    </div>
  );
};

export default Settings;
