import { CSSProperties } from 'react';


//
// MUST keep in sync with the `spacings.css`
//
export const spacings = {
  'none': 0,
  'small-xs': 2,
  'small-s': 4,
  'small-m': 6,
  'small-l': 8,
  'medium-xs': 12,
  'medium-s': 16,
  'medium-m': 20,
  'medium-l': 24,
  'large-xxs': 32,
  'large-xs': 40,
  'large-s': 48,
  'large-m': 64,
  'large-l': 80,
};


export type Spacing = keyof typeof spacings;

export interface PropsWithSpacing {
  /**
   * - none: 0px
   * - small:
   *      - 'small-xs': 2px
   *      - 'small-s': 4px
   *      - 'small-m': 6px
   *      - 'small-l': 8px
   * - medium:
   *      - 'medium-xs': 12px
   *      - 'medium-s': 16px
   *      - 'medium-m': 20px
   *      - 'medium-l': 24px
   * - large:
   *      - 'large-xxs': 32px
   *      - 'large-xs': 40px
   *      - 'large-s': 48px
   *      - 'large-m': 64px
   *      - 'large-l': 80px
   */
  spacing?: Spacing;
}

export function getSpacing(spacing: Spacing | undefined): number | undefined {
  if (!spacing) {
    return undefined;
  }

  return spacings[spacing];
}

export function getSpacingStyles(spacing: Spacing | undefined): CSSProperties {
  return {
    gap: `var(--spacing-${spacing})`,
  };
}
