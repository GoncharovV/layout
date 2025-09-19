
import cn from 'classnames';

import { BaseStackProps, createStack } from './factory';

import styles from './Stack.module.css';


export interface VStackProps extends BaseStackProps {
  reversed?: boolean;
}


export const VStack = createStack<VStackProps>('VStack', {
  overrideProps: (props) => {
    const { reversed, className, ...rest } = props;

    return {
      ...rest,
      className: cn(styles.vertical, {
        [styles.reversed]: reversed,
      }, className),
    };
  },
});
