
import { ComponentProps, FunctionComponent } from 'react';
import cn from 'classnames';

import { StackProps } from '../Stacks';
import { createStack } from '../Stacks/factory';
import { getStackClassesAndStyles } from '../Stacks/Stack';

import styles from './Form.module.css';


type StackFieldsetProps = Omit<StackProps<'fieldset'>, 'as'>;

export interface FieldsetProps extends StackFieldsetProps, Omit<ComponentProps<'fieldset'>, keyof StackFieldsetProps> {
}


export const Fieldset = createStack<FieldsetProps>('Fieldset', {
  overrideProps: (props) => {
    const { direction, horizontal, vertical: _, className, style, ...rest } = props;

    const stackClassesAndStyles = getStackClassesAndStyles({ direction, horizontal, vertical: true, className, style });

    return {
      ...rest,
      as: 'fieldset',
      className: cn(styles.fieldset, stackClassesAndStyles.className),
      style: stackClassesAndStyles.style,
    } as FieldsetProps;
  },
}) as FunctionComponent<FieldsetProps>;
