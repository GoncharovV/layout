import { CSSProperties, ElementType } from 'react';
import cn from 'classnames';

import { BaseStackProps, createStack } from './factory';

import styles from './Stack.module.css';


export type StackDirection = 'vertical' | 'horizontal';


export interface StackProps<TElementType extends ElementType = 'div'> extends BaseStackProps<TElementType> {
  vertical?: boolean;
  horizontal?: boolean;
  direction?: CSSProperties['flexDirection'];
}

export const Stack = createStack<StackProps>('Stack', {
  overrideProps: (props: StackProps) => {
    const { direction, horizontal, vertical, className, style, ...rest } = props;

    return {
      ...rest,
      ...getStackClassesAndStyles({ direction, horizontal, vertical, className, style }),
    } as StackProps;
  },
});

export function getStackClassesAndStyles(
  props: Pick<StackProps, 'direction' | 'horizontal' | 'vertical' | 'className' | 'style'>,
): { className: string; style: CSSProperties; } {
  const { direction, horizontal, vertical, className, style } = props;

  return {
    className: cn(
      {
        [styles.vertical]: vertical && !horizontal && !direction,
        [styles.horizontal]: horizontal && !direction,
      },
      className,
    ),
    style: {
      flexDirection: direction,
      ...style,
    },
  };
}
