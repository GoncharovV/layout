import { CSSProperties } from 'react';

import { getSpacingStyleVariable, Spacing } from '../spacings';


export interface PropsWithPaddings {
  /**
   * padding 
   */
  p?: Spacing;
  /**
   * padding-horizontal. applies to `padding-left` and `padding-right`
   */
  ph?: Spacing;
  /**
   * padding-vertical. applies to `padding-top` and `padding-bottom`
   */
  pv?: Spacing;
}

export function getPaddingStyles(props: PropsWithPaddings): CSSProperties {
  const { p, ph, pv } = props;

  if (p) {
    return {
      padding: getSpacingStyleVariable(p),
    };
  }

  if (!ph && !pv) {
    return {};
  }

  const horizontal = getSpacingStyleVariable(ph) ?? 0;
  const vertical = getSpacingStyleVariable(pv) ?? 0;

  return {
    padding: `${vertical} ${horizontal}`,
  };
}
