import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { 
  ArrowUp, 
  ArrowDown, 
  ArrowLeft, 
  ArrowRight, 
  ArrowUpRight, 
  ArrowDownRight, 
  ArrowDownLeft, 
  ArrowUpLeft,
  RotateCw
} from 'lucide-react';

interface DirectionControlsProps {
  direction: string;
  onDirectionChange: (direction: string) => void;
}

const directionPresets = [
  { name: 'Right', value: 'to right', icon: ArrowRight },
  { name: 'Left', value: 'to left', icon: ArrowLeft },
  { name: 'Bottom', value: 'to bottom', icon: ArrowDown },
  { name: 'Top', value: 'to top', icon: ArrowUp },
  { name: 'Bottom Right', value: 'to bottom right', icon: ArrowDownRight },
  { name: 'Bottom Left', value: 'to bottom left', icon: ArrowDownLeft },
  { name: 'Top Right', value: 'to top right', icon: ArrowUpRight },
  { name: 'Top Left', value: 'to top left', icon: ArrowUpLeft },
];

export function DirectionControls({ direction, onDirectionChange }: DirectionControlsProps) {
  const getDegreeFromDirection = (dir: string): number => {
    const angleMatch = dir.match(/(\d+)deg/);
    if (angleMatch) return parseInt(angleMatch[1]);
    
    const presetAngles: { [key: string]: number } = {
      'to right': 90,
      'to left': 270,
      'to bottom': 180,
      'to top': 0,
      'to bottom right': 135,
      'to bottom left': 225,
      'to top right': 45,
      'to top left': 315,
    };
    
    return presetAngles[dir] || 90;
  };

  const handleAngleChange = (angle: number) => {
    onDirectionChange(`${angle}deg`);
  };

  const currentAngle = getDegreeFromDirection(direction);

  return (
    <motion.div
      className="direction-controls"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="p-4 space-y-4 bg-surface/50 backdrop-blur-sm border-border/50">
        <div className="flex items-center gap-2">
          <RotateCw className="w-4 h-4 text-primary" />
          <Label className="text-sm font-medium">Direction Control</Label>
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          {directionPresets.map((preset, index) => {
            const Icon = preset.icon;
            const isActive = direction === preset.value;
            
            return (
              <motion.div
                key={preset.value}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  onClick={() => onDirectionChange(preset.value)}
                  className={`flex flex-col items-center gap-1 h-auto py-3 transition-all duration-300 ${
                    isActive 
                      ? 'bg-primary text-primary-foreground shadow-lg' 
                      : 'hover:border-primary/50 hover:bg-primary/5'
                  }`}
                >
                  <motion.div
                    animate={isActive ? { rotate: 360 } : { rotate: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.div>
                  <span className="text-xs font-medium">{preset.name}</span>
                </Button>
              </motion.div>
            );
          })}
        </div>

        <motion.div 
          className="space-y-3"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          <div className="flex items-center justify-between">
            <Label htmlFor="angle-slider" className="text-sm">Custom Angle</Label>
            <motion.span 
              className="text-sm font-mono bg-primary/10 px-2 py-1 rounded"
              key={currentAngle}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              {currentAngle}°
            </motion.span>
          </div>
          <Slider
            id="angle-slider"
            value={[currentAngle]}
            onValueChange={([value]) => handleAngleChange(value)}
            max={360}
            step={1}
            className="w-full"
          />
        </motion.div>
      </Card>
    </motion.div>
  );
}