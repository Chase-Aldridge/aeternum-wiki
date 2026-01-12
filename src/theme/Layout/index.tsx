import React, { type ReactNode } from 'react';
import Layout from '@theme-original/Layout';
import type LayoutType from '@theme/Layout';
import type { WrapperProps } from '@docusaurus/types';
import { BackgroundProvider, useBackground } from '../../context/BackgroundContext';

type Props = WrapperProps<typeof LayoutType>;

function BackgroundLayer({ children }: { children: ReactNode }) {
  const { currentImage, currentOverlay } = useBackground();

  return (
    <div className="background-wrapper">
      {currentImage && (
        <>
          <div
            className="background-image"
            style={{
              backgroundImage: `url(${currentImage})`,
            }}
          />
          <div
            className="background-overlay"
            style={{
              backgroundColor: currentOverlay,
            }}
          />
        </>
      )}
      {children}
    </div>
  );
}

export default function LayoutWrapper(props: Props): ReactNode {
  return (
    <BackgroundProvider>
      <BackgroundLayer>
        <Layout {...props} />
      </BackgroundLayer>
    </BackgroundProvider>
  );
}
