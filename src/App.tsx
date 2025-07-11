import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Toaster } from '@/components/ui/toaster';
import { GradientPreview } from '@/components/GradientPreview';
import { ColorStopControl } from '@/components/ColorStopControl';
import { DirectionControls } from '@/components/DirectionControls';
import { CssOutput } from '@/components/CssOutput';
import { TailwindOutput } from './components/TailwindOutput';
import { SavedGradients } from '@/components/SavedGradients';
import { ThemeSelector } from '@/components/ThemeSelector';
import { Tutorial } from '@/components/Tutorial';
import { Footer } from '@/components/Footer';
import { useGradient } from '@/hooks/useGradient';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useTheme } from '@/hooks/useTheme';
import { useToast } from '@/hooks/use-toast';
import { GradientConfig } from '@/types/gradient';
import { Plus, RefreshCw, Palette, Heart, Sparkles } from 'lucide-react';

function App() {
  const {
    direction,
    colorStops,
    setDirection,
    generateCss,
    addColorStop,
    removeColorStop,
    updateColorStop,
    resetGradient,
    loadGradient
  } = useGradient();

  const [savedGradients, setSavedGradients] = useLocalStorage<GradientConfig[]>('neko-gradients', []);
  const [isQuickSaveOpen, setIsQuickSaveOpen] = useState(false);
  const [quickSaveName, setQuickSaveName] = useState('');
  const { currentTheme } = useTheme();
  const { toast } = useToast();

  const gradientCss = generateCss();

  const generateTailwind = () => {
  const directionMap: Record<string, string> = {
    'to top': 'bg-gradient-to-t',
    'to bottom': 'bg-gradient-to-b',
    'to left': 'bg-gradient-to-l',
    'to right': 'bg-gradient-to-r',
    'to top left': 'bg-gradient-to-tl',
    'to top right': 'bg-gradient-to-tr',
    'to bottom left': 'bg-gradient-to-bl',
    'to bottom right': 'bg-gradient-to-br',
  };

  const directionClass = directionMap[direction] || 'bg-gradient-to-r';
  const fromColor = colorStops[0]?.color.replace(/\s+/g, '') || '#000000';
  const toColor = colorStops[colorStops.length - 1]?.color.replace(/\s+/g, '') || '#ffffff';

  return `${directionClass} from-[${fromColor}] to-[${toColor}]`;
};

const gradientTailwind = generateTailwind();

  const handleSaveGradient = (name: string) => {
    const newGradient: GradientConfig = {
      id: Date.now().toString(),
      name,
      direction,
      colorStops,
      createdAt: new Date(),
    };
    setSavedGradients(prev => [newGradient, ...prev]);
  };

  const handleQuickSave = () => {
    setIsQuickSaveOpen(true);
  };

  const handleQuickSaveSubmit = () => {
    if (quickSaveName.trim()) {
      handleSaveGradient(quickSaveName.trim());
      setQuickSaveName('');
      setIsQuickSaveOpen(false);
      toast({
        title: "Gradient saved! 🐾",
        description: `"${quickSaveName}" has been added to your collection.`,
      });
    }
  };
  const handleLoadGradient = (gradient: GradientConfig) => {
    loadGradient(gradient);
  };

  const handleDeleteGradient = (id: string) => {
    setSavedGradients(prev => prev.filter(g => g.id !== id));
  };

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{ 
        background: `linear-gradient(135deg, ${currentTheme.colors.background} 0%, ${currentTheme.colors.surface} 100%)`,
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Animated Background */}
      <div 
        className="fixed inset-0 opacity-30 animate-gradient"
        style={{ background: currentTheme.gradients.hero }}
      />
      
      {/* Main Content */}
      <div className="relative z-10 flex-1">
        <div className="container mx-auto px-4 py-6 md:py-8">
          {/* Header */}
          <motion.div 
            className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <motion.h1 
                className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                NekoGradients 🐾
              </motion.h1>
              <motion.p 
                className="text-muted-foreground text-sm md:text-base"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Beautiful gradient visualizer and generator for developers
              </motion.p>
            </div>
            <motion.div 
              className="flex items-center gap-2 theme-selector"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Tutorial />
              <ThemeSelector />
            </motion.div>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Gradient Preview */}
            <motion.div
              className="lg:col-span-2 lg:sticky lg:top-6 lg:self-start"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Card className="p-4 md:p-6 space-y-4 glass border-border/50">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <h2 className="text-lg md:text-xl font-semibold">Live Preview</h2>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetGradient}
                    className="gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Reset
                  </Button>
                </div>
                
                <GradientPreview
                  gradientCss={gradientCss}
                  onSave={handleQuickSave}
                  className="h-48 md:h-64 lg:h-80"
                />
                
                {/* Preview Examples */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div 
                    className="space-y-2"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  >
                    <div className="text-sm text-muted-foreground">
                      Preview on button:
                    </div>
                    <Button
                      className="w-full text-white font-medium"
                      style={{ background: gradientCss }}
                    >
                      Sample Button
                    </Button>
                  </motion.div>
                  <motion.div 
                    className="space-y-2"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  >
                    <div className="text-sm text-muted-foreground">
                      Preview on card:
                    </div>
                    <Card 
                      className="p-4 text-center text-white font-medium"
                      style={{ background: gradientCss }}
                    >
                      Sample Card
                    </Card>
                  </motion.div>
                </div>
              </Card>
            </motion.div>

            {/* Controls */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Tabs defaultValue="colors" className="w-full">
                <TabsList className="grid w-full grid-cols-3 glass">
                  <TabsTrigger value="colors" className="gap-2">
                    <Palette className="w-4 h-4" />
                    <span className="hidden sm:inline">Colors</span>
                  </TabsTrigger>
                  <TabsTrigger value="direction">
                    <span className="hidden sm:inline">Direction</span>
                    <span className="sm:hidden">Dir</span>
                  </TabsTrigger>
                  <TabsTrigger value="saved" className="gap-2">
                    <Heart className="w-4 h-4" />
                    <span className="hidden sm:inline">Saved</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="colors" className="space-y-4 color-controls">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base md:text-lg font-medium">Color Stops</h3>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        size="sm"
                        onClick={addColorStop}
                        className="gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Add Color
                      </Button>
                    </motion.div>
                  </div>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    <AnimatePresence>
                      {colorStops.map((stop, index) => (
                        <ColorStopControl
                          key={stop.id}
                          colorStop={stop}
                          onUpdate={updateColorStop}
                          onRemove={removeColorStop}
                          canRemove={colorStops.length > 2}
                          index={index}
                        />
                      ))}
                    </AnimatePresence>
                  </div>
                </TabsContent>

                <TabsContent value="direction">
                  <DirectionControls
                    direction={direction}
                    onDirectionChange={setDirection}
                  />
                </TabsContent>

                <TabsContent value="saved">
                  <SavedGradients
                    savedGradients={savedGradients}
                    onSave={handleSaveGradient}
                    onLoad={handleLoadGradient}
                    onDelete={handleDeleteGradient}
                    currentGradientCss={gradientCss}
                  />
                </TabsContent>
              </Tabs>

              <CssOutput gradientCss={gradientCss} />
              <TailwindOutput gradientTailwind={gradientTailwind}/>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
      
      {/* Tutorial Component */}
      <Tutorial />
      
      {/* Quick Save Dialog */}
      <Dialog open={isQuickSaveOpen} onOpenChange={setIsQuickSaveOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Save Gradient 🐾</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="quick-save-name">Gradient Name</Label>
              <Input
                id="quick-save-name"
                value={quickSaveName}
                onChange={(e) => setQuickSaveName(e.target.value)}
                placeholder="Enter gradient name..."
                className="mt-1"
                onKeyDown={(e) => e.key === 'Enter' && handleQuickSaveSubmit()}
                autoFocus
              />
            </div>
            <GradientPreview 
              gradientCss={gradientCss} 
              className="h-24"
            />
            <div className="flex gap-2">
              <Button onClick={handleQuickSaveSubmit} className="flex-1">
                Save Gradient
              </Button>
              <Button variant="outline" onClick={() => setIsQuickSaveOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
}

export default App;