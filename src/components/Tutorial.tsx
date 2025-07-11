import { useState, useEffect } from 'react';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';
import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';

const steps: Step[] = [
  {
    target: '.gradient-preview',
    content: 'Welcome to NekoGradients! 🐾 This is your live gradient preview area where you can see your gradient in real-time.',
    placement: 'bottom',
    disableBeacon: true,
  },
  {
    target: '.color-controls',
    content: 'Here you can add, remove, and customize color stops. Click on a color to open the color picker and adjust opacity with the sliders.',
    placement: 'left',
    disableBeacon: true,
  },
  {
    target: '.direction-controls',
    content: 'Control your gradient direction here! Use preset directions or create custom angles with the slider.',
    placement: 'left',
    disableBeacon: true,
  },
  {
    target: '.css-output',
    content: 'Your CSS code is generated automatically! Click the copy button to use it in your projects.',
    placement: 'left',
    disableBeacon: true,
  },
  {
    target: '.saved-gradients',
    content: 'Save your favorite gradients here for quick access later. Perfect for building a personal gradient library!',
    placement: 'left',
    disableBeacon: true,
  },
  {
    target: '.theme-selector',
    content: 'Customize your workspace with different themes! Choose the one that matches your vibe. 🎨',
    placement: 'bottom',
    disableBeacon: true,
  },
];

export function Tutorial() {
  const [runTour, setRunTour] = useState(false);
  const [hasSeenTutorial, setHasSeenTutorial] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem('neko-tutorial-seen');
    if (!seen) {
      // Show tutorial after a short delay for first-time users
      const timer = setTimeout(() => {
        setRunTour(true);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      setHasSeenTutorial(true);
    }
  }, []);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setRunTour(false);
      setHasSeenTutorial(true);
      localStorage.setItem('neko-tutorial-seen', 'true');
    }
  };

  const startTutorial = () => {
    setRunTour(true);
  };

  return (
    <>
      <Joyride
        steps={steps}
        run={runTour}
        continuous
        showProgress
        showSkipButton
        hideCloseButton
        disableOverlayClose
        spotlightClicks
        callback={handleJoyrideCallback}
        styles={{
          options: {
            primaryColor: 'var(--theme-primary)',
            backgroundColor: 'var(--theme-surface)',
            textColor: 'var(--theme-text)',
            arrowColor: 'var(--theme-surface)',
            overlayColor: 'rgba(0, 0, 0, 0.4)',
            beaconSize: 0,
            zIndex: 10000,
          },
          tooltip: {
            borderRadius: '12px',
            fontSize: '14px',
            maxWidth: '400px',
          },
          tooltipContainer: {
            textAlign: 'left',
          },
          tooltipTitle: {
            fontSize: '16px',
            fontWeight: '600',
            marginBottom: '8px',
          },
          buttonNext: {
            backgroundColor: 'var(--theme-primary)',
            borderRadius: '8px',
            fontSize: '14px',
            padding: '8px 16px',
            fontWeight: '500',
          },
          buttonBack: {
            color: 'var(--theme-muted)',
            fontSize: '14px',
            marginRight: '8px',
          },
          buttonSkip: {
            color: 'var(--theme-muted)',
            fontSize: '14px',
          },
          beacon: {
            display: 'none',
          },
          spotlight: {
            borderRadius: '8px',
          },
        }}
      />
      
      {hasSeenTutorial && (
        <Button
          variant="outline"
          size="sm"
          onClick={startTutorial}
          className="gap-2"
        >
          <HelpCircle className="w-4 h-4" />
          Tutorial
        </Button>
      )}
    </>
  );
}