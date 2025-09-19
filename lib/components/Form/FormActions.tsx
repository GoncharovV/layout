
import { ComponentProps, FunctionComponent } from 'react';

import { StackProps } from '../Stacks';
import { createStack } from '../Stacks/factory';
import { getStackClassesAndStyles } from '../Stacks/Stack';


type StackFormProps = Omit<StackProps<'div'>, 'as'>;

export interface FormActionsProps extends StackFormProps, Omit<ComponentProps<'div'>, keyof StackFormProps> {
}

export const FormActions = createStack<FormActionsProps>('FormActions', {
  overrideProps: (props) => {
    const { direction, horizontal, vertical, className, style, ...rest } = props;

    const stackClassesAndStyles = getStackClassesAndStyles({ direction, horizontal, vertical, className, style });

    return {
      as: 'div',
      ...rest,
      ...stackClassesAndStyles,
    };
  },
}) as FunctionComponent<FormActionsProps>;
