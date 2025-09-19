import cn from 'classnames';

import { BaseStackProps, createStack } from './factory';

import styles from './Stack.module.css';


export interface HStackProps extends BaseStackProps {
  reversed?: boolean;
}

export const HStack = createStack<HStackProps>('HStack', {
  overrideProps: (props) => {
    const { reversed, className, ...rest } = props;

    return {
      ...rest,
      className: cn(styles.horizontal, {
        [styles.reversed]: reversed,
      }, className),
    };
  },
});
