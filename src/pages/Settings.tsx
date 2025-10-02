import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Settings as SettingsIcon, Save, Bell, Zap, Globe } from "lucide-react";
import { toast } from "sonner";

const Settings = () => {
  const [settings, setSettings] = useState({
    animations: true,
    notifications: true,
    autoOptimize: false,
    language: "en",
  });

  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
          System Settings
        </h1>
        <p className="text-muted-foreground">
          Customize your RakeMind experience
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Display Settings */}
          <div className="glass-card p-6 rounded-xl">
            <div className="flex items-center gap-2 mb-6">
              <SettingsIcon className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-semibold">Display Settings</h3>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-lg bg-card/30 hover:bg-card/50 transition-colors">
                <div className="space-y-1">
                  <Label htmlFor="animations" className="text-base font-medium">
                    3D Animations
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Enable visual effects and animations
                  </p>
                </div>
                <Switch
                  id="animations"
                  checked={settings.animations}
                  onCheckedChange={() => handleToggle("animations")}
                />
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="glass-card p-6 rounded-xl">
            <div className="flex items-center gap-2 mb-6">
              <Bell className="w-5 h-5 text-secondary" />
              <h3 className="text-xl font-semibold">Notifications</h3>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-lg bg-card/30 hover:bg-card/50 transition-colors">
                <div className="space-y-1">
                  <Label
                    htmlFor="notifications"
                    className="text-base font-medium"
                  >
                    System Alerts
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications for important events
                  </p>
                </div>
                <Switch
                  id="notifications"
                  checked={settings.notifications}
                  onCheckedChange={() => handleToggle("notifications")}
                />
              </div>
            </div>
          </div>

          {/* AI Settings */}
          <div className="glass-card p-6 rounded-xl glow-border-cyan">
            <div className="flex items-center gap-2 mb-6">
              <Zap className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-semibold">AI Configuration</h3>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-lg bg-card/30 hover:bg-card/50 transition-colors">
                <div className="space-y-1">
                  <Label
                    htmlFor="auto-optimize"
                    className="text-base font-medium"
                  >
                    Auto-Optimization
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically optimize rake formation in real-time
                  </p>
                </div>
                <Switch
                  id="auto-optimize"
                  checked={settings.autoOptimize}
                  onCheckedChange={() => handleToggle("autoOptimize")}
                />
              </div>
            </div>
          </div>

          {/* Language Settings */}
          <div className="glass-card p-6 rounded-xl">
            <div className="flex items-center gap-2 mb-6">
              <Globe className="w-5 h-5 text-secondary" />
              <h3 className="text-xl font-semibold">Language & Region</h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language" className="text-sm font-medium">
                  System Language
                </Label>
                <select
                  id="language"
                  value={settings.language}
                  onChange={(e) =>
                    setSettings({ ...settings, language: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg bg-background/50 border border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                >
                  <option value="en">English</option>
                  <option value="hi">हिन्दी (Hindi)</option>
                  <option value="te">తెలుగు (Telugu)</option>
                  <option value="ta">தமிழ் (Tamil)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <Button
            onClick={handleSave}
            className="w-full gap-2 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 glow-cyan py-6 text-lg"
          >
            <Save className="w-5 h-5" />
            Save Settings
          </Button>
        </div>

        {/* Info Panel */}
        <div className="lg:col-span-1 space-y-6">
          {/* System Info */}
          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-4">System Information</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Version</span>
                <span className="font-mono font-medium">v2.1.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Build</span>
                <span className="font-mono font-medium">2024.10.02</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">AI Model</span>
                <span className="font-mono font-medium">RMO-GPT-4</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Status</span>
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400 font-medium">Online</span>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start border-primary/30 hover:border-primary hover:bg-primary/10"
                onClick={() => toast.info("Cache cleared successfully")}
              >
                Clear Cache
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start border-primary/30 hover:border-primary hover:bg-primary/10"
                onClick={() => toast.info("Checking for updates...")}
              >
                Check for Updates
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start border-primary/30 hover:border-primary hover:bg-primary/10"
                onClick={() => toast.info("Opening documentation...")}
              >
                View Documentation
              </Button>
            </div>
          </div>

          {/* Support */}
          <div className="glass-card p-6 rounded-xl glow-border-orange">
            <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Contact SAIL IT support for assistance
            </p>
            <Button
              variant="outline"
              className="w-full border-secondary hover:border-secondary hover:bg-secondary/10"
            >
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
