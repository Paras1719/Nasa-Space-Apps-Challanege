import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { Label } from "@/components/ui/label";

interface TimeSliderProps {
  onTimeChange: (time: number) => void;
}

export const TimeSlider = ({ onTimeChange }: TimeSliderProps) => {
  const [currentTime, setCurrentTime] = useState(12);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleTimeChange = (value: number[]) => {
    const time = value[0];
    setCurrentTime(time);
    onTimeChange(time);
  };

  const formatTime = (hour: number) => {
    return `${hour.toString().padStart(2, "0")}:00`;
  };

  return (
    <div className="h-20 border-t border-border bg-card/50 backdrop-blur-sm px-6 py-3">
      <div className="flex items-center gap-4">
        {/* Playback Controls */}
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setCurrentTime(Math.max(0, currentTime - 1))}
          >
            <SkipBack className="h-4 w-4" />
          </Button>
          
          <Button
            size="icon"
            variant="outline"
            onClick={() => setIsPlaying(!isPlaying)}
            className="glow-effect"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setCurrentTime(Math.min(23, currentTime + 1))}
          >
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>

        {/* Time Display */}
        <div className="min-w-[100px]">
          <Label className="text-xs text-muted-foreground">Current Time</Label>
          <p className="text-lg font-bold text-primary">{formatTime(currentTime)}</p>
        </div>

        {/* Time Slider */}
        <div className="flex-1">
          <Slider
            value={[currentTime]}
            onValueChange={handleTimeChange}
            max={23}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between mt-1">
            <span className="text-xs text-muted-foreground">00:00</span>
            <span className="text-xs text-muted-foreground">23:00</span>
          </div>
        </div>

        {/* Frame Info */}
        <div className="min-w-[120px] text-right">
          <Label className="text-xs text-muted-foreground">Frame</Label>
          <p className="text-sm font-medium">{currentTime + 1} / 24</p>
        </div>
      </div>
    </div>
  );
};
