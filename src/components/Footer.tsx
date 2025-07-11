import { motion } from 'framer-motion';
import { Heart, ExternalLink } from 'lucide-react';

export function Footer() {
  const footerLinks = [
    { name: 'NekoSnippets', url: 'https://nekosnippets.vercel.app', external: true },
    { name: 'NekoLinks', url: 'https://nekolinks.vercel.app', external: true },
    { name: 'Portfolio', url: 'https://sogki.dev', external: true },
    { name: 'GitHub', url: 'https://github.com/sogki', external: true },
  ];

  return (
    <motion.footer 
      className="border-t border-border/50 bg-surface/50 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <motion.div 
              className="flex items-center gap-2 text-sm text-muted-foreground"
              whileHover={{ scale: 1.05 }}
            >
              <span>Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 text-red-500 fill-current" />
              </motion.div>
              <span>for developers and designers by <a className='text-red-500' href='https://sogki.dev'>Sogki</a></span>
            </motion.div>
            <div className="text-sm text-muted-foreground">
              🐾 Purr-fect gradients for your projects.
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {footerLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target={link.external ? '_blank' : '_self'}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                {link.name}
                {link.external && <ExternalLink className="w-3 h-3" />}
              </motion.a>
            ))}
          </div>
        </div>
        
        <motion.div 
          className="mt-6 pt-6 border-t border-border/30 text-center text-xs text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Sogki.dev - © 2025 NekoGradients. All rights reserved. Built with React, Vite & TailwindCSS.
        </motion.div>
      </div>
    </motion.footer>
  );
}