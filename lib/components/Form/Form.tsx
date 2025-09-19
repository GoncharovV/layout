
import { ComponentProps, FunctionComponent } from 'react';
import cn from 'classnames';

import { StackProps } from '../Stacks';
import { createStack } from '../Stacks/factory';
import { getStackClassesAndStyles } from '../Stacks/Stack';

import styles from './Form.module.css';


type StackFormProps = Omit<StackProps<'form'>, 'as'>;

export interface FormProps extends StackFormProps, Omit<ComponentProps<'form'>, keyof StackFormProps> {
}

export const Form = createStack<FormProps>('Form', {
  overrideProps: (props) => {
    const { direction, horizontal, vertical: _, className, style, ...rest } = props;

    const stackClassesAndStyles = getStackClassesAndStyles({ direction, horizontal, vertical: true, className, style });

    return {
      ...rest,
      as: 'form',
      className: cn(styles.form, stackClassesAndStyles.className),
      style: stackClassesAndStyles.style,
    } as FormProps;
  },
}) as FunctionComponent<FormProps>;
