import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { GradientPreview } from './GradientPreview';
import { Save, Trash2, Heart, Share } from 'lucide-react';
import { GradientConfig } from '@/types/gradient';
import { useToast } from '@/hooks/use-toast';

interface SavedGradientsProps {
  savedGradients: GradientConfig[];
  onSave: (name: string) => void;
  onLoad: (gradient: GradientConfig) => void;
  onDelete: (id: string) => void;
  currentGradientCss: string;
}

export function SavedGradients({ 
  savedGradients, 
  onSave, 
  onLoad, 
  onDelete, 
  currentGradientCss 
}: SavedGradientsProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [gradientName, setGradientName] = useState('');
  const { toast } = useToast();

  const handleSave = () => {
    if (gradientName.trim()) {
      onSave(gradientName.trim());
      setGradientName('');
      setIsDialogOpen(false);
      toast({
        title: "Gradient saved! 🐾",
        description: `"${gradientName}" has been added to your collection.`,
      });
    }
  };

  const handleDelete = (gradient: GradientConfig) => {
    onDelete(gradient.id);
    toast({
      title: "Gradient deleted",
      description: `"${gradient.name}" has been removed from your collection.`,
    });
  };

  const handleShare = async (gradient: GradientConfig) => {
    const shareData = {
      title: `${gradient.name} - NekoGradients`,
      text: `Check out this beautiful gradient: ${gradient.name}`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link copied! 🐾",
          description: "Gradient link has been copied to your clipboard.",
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <motion.div
      className="saved-gradients"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <Card className="p-4 space-y-4 bg-surface/50 backdrop-blur-sm border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-primary" />
            <Label className="text-sm font-medium">Saved Gradients</Label>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="sm" variant="outline" className="gap-2">
                  <Save className="w-4 h-4" />
                  Save Current
                </Button>
              </motion.div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Save Gradient</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="gradient-name">Gradient Name</Label>
                  <Input
                    id="gradient-name"
                    value={gradientName}
                    onChange={(e) => setGradientName(e.target.value)}
                    placeholder="Enter gradient name..."
                    className="mt-1"
                    onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                  />
                </div>
                <GradientPreview 
                  gradientCss={currentGradientCss} 
                  className="h-24"
                />
                <div className="flex gap-2">
                  <Button onClick={handleSave} className="flex-1">
                    Save Gradient
                  </Button>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <AnimatePresence>
          {savedGradients.length === 0 ? (
            <motion.div 
              className="text-center py-12 text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="w-12 h-12 mx-auto mb-4 opacity-30" />
              </motion.div>
              <p className="text-sm font-medium">No saved gradients yet</p>
              <p className="text-xs mt-1">Save your favorite gradients to reuse them later</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto">
              {savedGradients.map((gradient, index) => (
                <motion.div
                  key={gradient.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                  layout
                >
                  <Card className="p-3 space-y-3 hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30">
                    <GradientPreview 
                      gradientCss={`linear-gradient(${gradient.direction}, ${gradient.colorStops
                        .sort((a, b) => a.position - b.position)
                        .map(stop => `${stop.color} ${stop.position}%`)
                        .join(', ')})`}
                      className="h-16 rounded-lg"
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{gradient.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(gradient.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-1 ml-2">
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onLoad(gradient)}
                            className="h-8 px-2"
                          >
                            Load
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleShare(gradient)}
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-primary"
                          >
                            <Share className="w-3 h-3" />
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(gradient)}
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-500/10"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}