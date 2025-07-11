import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HexColorPicker } from 'react-colorful';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2, Palette, Move } from 'lucide-react';
import { ColorStop } from '@/types/gradient';

interface ColorStopControlProps {
  colorStop: ColorStop;
  onUpdate: (id: string, updates: Partial<ColorStop>) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
  index: number;
}

export function ColorStopControl({ 
  colorStop, 
  onUpdate, 
  onRemove, 
  canRemove, 
  index 
}: ColorStopControlProps) {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ delay: index * 0.1 }}
      layout
    >
      <Card className="p-4 space-y-4 bg-surface/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Popover open={isColorPickerOpen} onOpenChange={setIsColorPickerOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-10 h-10 p-0 border-2 relative overflow-hidden group"
                    style={{ backgroundColor: colorStop.color }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                      whileHover={{ opacity: 1 }}
                    >
                      <Palette className="w-4 h-4 text-white" />
                    </motion.div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-4">
                  <div className="space-y-4">
                    <HexColorPicker
                      color={colorStop.color}
                      onChange={(color) => onUpdate(colorStop.id, { color })}
                    />
                    <div>
                      <Label htmlFor={`color-${colorStop.id}`}>Hex Color</Label>
                      <Input
                        id={`color-${colorStop.id}`}
                        value={colorStop.color}
                        onChange={(e) => onUpdate(colorStop.id, { color: e.target.value })}
                        className="mt-1 font-mono"
                      />
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </motion.div>
            
            <div className="flex flex-col">
              <span className="text-sm font-medium font-mono">{colorStop.color}</span>
              <span className="text-xs text-muted-foreground">
                {colorStop.position}% • {Math.round(colorStop.opacity * 100)}%
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-primary"
            >
              <Move className="w-4 h-4" />
            </Button>
            
            <AnimatePresence>
              {canRemove && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemove(colorStop.id)}
                    className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="space-y-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            <Label htmlFor={`position-${colorStop.id}`} className="text-sm">
              Position: <span className="font-mono">{colorStop.position}%</span>
            </Label>
            <Slider
              id={`position-${colorStop.id}`}
              value={[colorStop.position]}
              onValueChange={([value]) => onUpdate(colorStop.id, { position: value })}
              max={100}
              step={1}
              className="mt-2"
            />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            <Label htmlFor={`opacity-${colorStop.id}`} className="text-sm">
              Opacity: <span className="font-mono">{Math.round(colorStop.opacity * 100)}%</span>
            </Label>
            <Slider
              id={`opacity-${colorStop.id}`}
              value={[colorStop.opacity]}
              onValueChange={([value]) => onUpdate(colorStop.id, { opacity: value })}
              max={1}
              step={0.01}
              className="mt-2"
            />
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}