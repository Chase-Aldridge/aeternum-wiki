import React, { type ReactNode } from 'react';
import ColorModeToggle from '@theme-original/ColorModeToggle';
import type ColorModeToggleType from '@theme/ColorModeToggle';
import type { WrapperProps } from '@docusaurus/types';
import BackgroundSwitcher from '../../components/BackgroundSwitcher';

type Props = WrapperProps<typeof ColorModeToggleType>;

export default function ColorModeToggleWrapper(props: Props): ReactNode {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <BackgroundSwitcher />
      <ColorModeToggle {...props} />
    </div>
  );
}
