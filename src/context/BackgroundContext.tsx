import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode, useMemo } from 'react';
import { useLocation } from '@docusaurus/router';
import useIsBrowser from '@docusaurus/useIsBrowser';

// Background configurations for each world
export const WORLD_BACKGROUNDS = {
  aeternum: {
    name: 'Aeternum',
    images: [
      '/img/backgrounds/aeternum/castle-sunset.jpg',
      '/img/backgrounds/aeternum/ancient-ruins.jpg',
      '/img/backgrounds/aeternum/great-houses.jpg',
      '/img/backgrounds/aeternum/battlefield.jpg',
    ],
    overlay: 'rgba(26, 26, 46, 0.85)', // Dark blue overlay
  },
  gulrath: {
    name: "Gul'Rath",
    images: [
      '/img/backgrounds/gulrath/yuan-ti-temple.jpg',
      '/img/backgrounds/gulrath/dwarven-forge.jpg',
      '/img/backgrounds/gulrath/jungle-ruins.jpg',
      '/img/backgrounds/gulrath/desert-expanse.jpg',
    ],
    overlay: 'rgba(46, 26, 26, 0.85)', // Dark red overlay
  },
  plagas: {
    name: 'Plagas',
    images: [
      '/img/backgrounds/plagas/jungle-canopy.jpg',
      '/img/backgrounds/plagas/titan-beast.jpg',
      '/img/backgrounds/plagas/colonial-port.jpg',
      '/img/backgrounds/plagas/leonin-village.jpg',
    ],
    overlay: 'rgba(26, 46, 26, 0.85)', // Dark green overlay
  },
  default: {
    name: 'World of LOR',
    images: [
      '/img/backgrounds/default/fantasy-map.jpg',
      '/img/backgrounds/default/starry-sky.jpg',
    ],
    overlay: 'rgba(15, 15, 26, 0.88)', // Very dark overlay
  },
} as const;

export type WorldKey = keyof typeof WORLD_BACKGROUNDS;

interface BackgroundState {
  enabled: boolean;
  currentWorld: WorldKey;
  imageIndex: Record<WorldKey, number>;
}

interface BackgroundContextType {
  state: BackgroundState;
  currentImage: string | null;
  currentOverlay: string;
  worldName: string;
  totalImages: number;
  currentIndex: number;
  toggleEnabled: () => void;
  nextImage: () => void;
  prevImage: () => void;
  setImageIndex: (index: number) => void;
}

const defaultState: BackgroundState = {
  enabled: true,
  currentWorld: 'default',
  imageIndex: {
    aeternum: 0,
    gulrath: 0,
    plagas: 0,
    default: 0,
  },
};

const BackgroundContext = createContext<BackgroundContextType | null>(null);

// Detect which world based on URL path
function detectWorld(pathname: string): WorldKey {
  // Handle both /docs/aeternum/* and /docs/category/aeternum patterns
  if (pathname.includes('/aeternum')) return 'aeternum';
  if (pathname.includes('/gulrath')) return 'gulrath';
  if (pathname.includes('/plagas')) return 'plagas';
  return 'default';
}

// LocalStorage key
const STORAGE_KEY = 'lor-wiki-backgrounds';

export function BackgroundProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const isBrowser = useIsBrowser();

  const [state, setState] = useState<BackgroundState>(defaultState);
  const [isHydrated, setIsHydrated] = useState(false);

  // Derive current world from location (memoized to update on path change)
  const detectedWorld = useMemo(() => {
    return detectWorld(location.pathname);
  }, [location.pathname]);

  // Load from localStorage on mount
  useEffect(() => {
    if (!isBrowser) return;

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setState(prev => ({
          ...prev,
          enabled: parsed.enabled ?? true,
          imageIndex: { ...prev.imageIndex, ...parsed.imageIndex },
        }));
      }
    } catch (e) {
      // Ignore localStorage errors
    }
    setIsHydrated(true);
  }, [isBrowser]);

  // Save to localStorage when state changes
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          enabled: state.enabled,
          imageIndex: state.imageIndex,
        }));
      } catch (e) {
        // Ignore localStorage errors
      }
    }
  }, [state.enabled, state.imageIndex, isHydrated]);

  // Use detectedWorld directly for world config (reactive to URL changes)
  // This avoids state sync issues with SSR/hydration
  const worldConfig = WORLD_BACKGROUNDS[detectedWorld];
  const currentIndex = state.imageIndex[detectedWorld];
  const totalImages = worldConfig.images.length;

  const toggleEnabled = useCallback(() => {
    setState(prev => ({ ...prev, enabled: !prev.enabled }));
  }, []);

  const nextImage = useCallback(() => {
    setState(prev => ({
      ...prev,
      imageIndex: {
        ...prev.imageIndex,
        [detectedWorld]: (prev.imageIndex[detectedWorld] + 1) % WORLD_BACKGROUNDS[detectedWorld].images.length,
      },
    }));
  }, [detectedWorld]);

  const prevImage = useCallback(() => {
    setState(prev => {
      const total = WORLD_BACKGROUNDS[detectedWorld].images.length;
      const newIndex = (prev.imageIndex[detectedWorld] - 1 + total) % total;
      return {
        ...prev,
        imageIndex: {
          ...prev.imageIndex,
          [detectedWorld]: newIndex,
        },
      };
    });
  }, [detectedWorld]);

  const setImageIndex = useCallback((index: number) => {
    setState(prev => ({
      ...prev,
      imageIndex: {
        ...prev.imageIndex,
        [detectedWorld]: Math.max(0, Math.min(index, WORLD_BACKGROUNDS[detectedWorld].images.length - 1)),
      },
    }));
  }, [detectedWorld]);

  const value: BackgroundContextType = {
    state,
    currentImage: state.enabled && isHydrated ? worldConfig.images[currentIndex] : null,
    currentOverlay: worldConfig.overlay,
    worldName: worldConfig.name,
    totalImages,
    currentIndex: currentIndex + 1, // 1-indexed for display
    toggleEnabled,
    nextImage,
    prevImage,
    setImageIndex,
  };

  return (
    <BackgroundContext.Provider value={value}>
      {children}
    </BackgroundContext.Provider>
  );
}

export function useBackground() {
  const context = useContext(BackgroundContext);
  if (!context) {
    throw new Error('useBackground must be used within a BackgroundProvider');
  }
  return context;
}
