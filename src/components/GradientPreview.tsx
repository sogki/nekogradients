import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Eye, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GradientPreviewProps {
  gradientCss: string;
  onSave?: () => void;
  className?: string;
}

export function GradientPreview({ 
  gradientCss, 
  onSave,
  className 
}: GradientPreviewProps) {
  return (
    <motion.div 
      className={cn("gradient-preview relative overflow-hidden rounded-xl border border-border/50", className)}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Gradient Display */}
      <motion.div 
        className="w-full h-full min-h-[300px] md:min-h-[400px] relative transition-all duration-500"
        style={{ background: gradientCss }}
        key={gradientCss}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        
        {/* Preview Controls */}
        <div className="absolute top-4 right-4 flex gap-2">
          {onSave && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="secondary"
                size="sm"
                onClick={onSave}
                className="bg-black/40 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 gap-2"
              >
                <Save className="w-4 h-4" />
                <span className="hidden sm:inline">Save</span>
              </Button>
            </motion.div>
          )}
        </div>
        
        {/* Preview Label */}
        <motion.div 
          className="absolute bottom-4 left-4 flex items-center gap-2 text-white/90 text-sm font-medium bg-black/20 backdrop-blur-sm rounded-lg px-3 py-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Eye className="w-4 h-4" />
          Live Preview
        </motion.div>
      </motion.div>
    </motion.div>
  );
}