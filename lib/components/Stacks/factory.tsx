import { ComponentProps, CSSProperties, ElementType, PropsWithChildren, ReactNode } from 'react';
import cn from 'classnames';

import { getPaddingStyles, PropsWithPaddings } from '../../shared/paddings';
import { getSpacingStyles, PropsWithSpacing } from '../../shared/spacings';
import { Prettify } from '../../shared/types';

import styles from './Stack.module.css';


export interface BaseStackProps<TElementType extends ElementType = 'div'>
  extends PropsWithChildren, PropsWithSpacing, PropsWithPaddings {
  as?: TElementType;

  alignItems?: CSSProperties['alignItems'];
  /**
   * shortcut for `alignItems`
   */
  align?: CSSProperties['alignItems'];

  justifyContent?: CSSProperties['justifyContent'];
  /**
   * shortcut for `justifyContent`
   */
  justify?: CSSProperties['justifyContent'];

  /**
   * `flex-wrap` property
   *
   * If value equals `true`, add css property `flex-wrap: wrap`;
   */
  wrap?: true | CSSProperties['flexWrap'];

  /**
   * Custom gap. This is uncommon prop. Consider using `spacing` instead.
   */
  gap?: number;

  /**
   * Alias for:
   * ```css
   * justify-content: center;
   * align-items: center;
   * ```
   */
  centered?: boolean;

  width?: CSSProperties['width'];

  style?: CSSProperties;
  className?: string;
}


/**
 * `_TPropsHint` is used only to show in IDE list of own Stack props
 */
export type StackPropsBuilder<TElementType extends ElementType, TProps, _TPropsHint = Prettify<TProps>> =
  { as?: TElementType; } &
  Omit<TProps, 'as'> &
  Omit<ComponentProps<TElementType>, keyof Omit<TProps, 'as'>>;

export function createStack<TProps extends BaseStackProps>(
  name: string,
  options: { overrideProps?: (props: TProps) => BaseStackProps; },
) {
  const Component = function GenericStack(
    _props: StackPropsBuilder<'div', TProps>,
  ) {
    const props = options.overrideProps ? options.overrideProps(_props as TProps) : _props;

    // WARNING: Avoid proxying *component props* to real DOM
    const {
      as: Element = 'div',
      align,
      alignItems,
      centered,
      gap,
      justify,
      justifyContent,
      spacing,
      style,
      wrap,
      className,
      children,
      p,
      pv,
      ph,
      width,
      ...rest
    } = props;

    return (
      <Element
        {...rest}
        className={cn(
          styles.stack,
          {
            [styles.centered]: centered,
          },
          className,
        )}
        style={{
          gap: spacing ? getSpacingStyles(spacing).gap : gap,
          flexWrap: wrap === true ? 'wrap' : wrap,
          alignItems: centered ? undefined : (alignItems ?? align),
          justifyContent: centered ? undefined : (justifyContent ?? justify),
          width,
          ...getPaddingStyles({ p, pv, ph }),
          ...style,
        }}
      >
        {children}
      </Element>
    );
  };

  Component.displayName = name;

  /**
   * Typing for better DX
   */
  return Component as <TElementType extends ElementType = 'div'>(
    props: StackPropsBuilder<TElementType, TProps>
  ) => ReactNode;
}
