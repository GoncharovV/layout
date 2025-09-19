
import { Fieldset, Form, FormActions } from '../lib';
import { HStack, VStack } from '../lib/components/Stacks';

import '../lib/styles/index.css';


const Block = () => {
  return <div style={{ width: 100, height: 100, backgroundColor: 'coral' }} />;
};


export function Application() {
  return (
    <>
      <HStack spacing="large-l" reversed centered>
        <Block />
        <Block />
      </HStack>

      <VStack spacing="large-l" as="button" disabled>
        <Block />
        <Block />
      </VStack>

      <Form
        spacing="large-l"
        style={{ border: '1px solid black' }}
        ph="large-l"
      >
        <Fieldset spacing="small-xs">
          <Block />
          <Block />
        </Fieldset>

        <Fieldset spacing="small-xs">
          <Block />
          <Block />
        </Fieldset>

        <FormActions spacing="small-xs" justify="flex-end">
          <Block />
          <Block />
        </FormActions>
      </Form>

      <div></div>

    </>
  );
}
