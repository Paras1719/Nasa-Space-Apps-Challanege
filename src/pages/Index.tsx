import { useState } from "react";
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader";
import { LeftSidebar } from "@/components/Dashboard/LeftSidebar";
import { RightSidebar } from "@/components/Dashboard/RightSidebar";
import { MapComponent } from "@/components/Map/MapComponent";
import { TimeSlider } from "@/components/Dashboard/TimeSlider";
import { CreateAlertDialog } from "@/components/Dialogs/AlertDialog";
import { SettingsDialog } from "@/components/Dialogs/SettingsDialog";
import { toast } from "sonner";

const Index = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [selectedPollutant, setSelectedPollutant] = useState("no2");
  const [opacity, setOpacity] = useState(0.7);
  const [showAQI, setShowAQI] = useState(true);
  const [currentTime, setCurrentTime] = useState(12);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
  const [alertCount] = useState(0);

  const handleExport = () => {
    toast.info("Connect your APIs to enable export functionality");
  };

  const handleStationClick = (stationId: string) => {
    toast.info(`Station ${stationId} selected`);
  };

  const handleTimeChange = (time: number) => {
    setCurrentTime(time);
  };

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-gradient-space">
      <DashboardHeader
        onToggleLeftSidebar={() => setLeftSidebarOpen(!leftSidebarOpen)}
        onToggleRightSidebar={() => setRightSidebarOpen(!rightSidebarOpen)}
        onOpenSettings={() => setSettingsDialogOpen(true)}
        onExport={handleExport}
        alertCount={alertCount}
      />

      <div className="flex flex-1 min-h-0">
        <LeftSidebar
          isOpen={leftSidebarOpen}
          selectedPollutant={selectedPollutant}
          onPollutantChange={setSelectedPollutant}
          opacity={opacity}
          onOpacityChange={setOpacity}
          showAQI={showAQI}
          onToggleAQI={setShowAQI}
          onCreateAlert={() => setAlertDialogOpen(true)}
        />

        <main className="flex-1 min-w-0 p-4">
          <div className="w-full h-full rounded-lg overflow-hidden border border-border shadow-card-custom">
            <MapComponent
              selectedPollutant={selectedPollutant}
              opacity={opacity}
              onStationClick={handleStationClick}
            />
          </div>
        </main>

        <RightSidebar
          isOpen={rightSidebarOpen}
          selectedPollutant={selectedPollutant}
        />
      </div>

      <TimeSlider onTimeChange={handleTimeChange} />

      <CreateAlertDialog
        open={alertDialogOpen}
        onOpenChange={setAlertDialogOpen}
      />

      <SettingsDialog
        open={settingsDialogOpen}
        onOpenChange={setSettingsDialogOpen}
      />
    </div>
  );
};

export default Index;
