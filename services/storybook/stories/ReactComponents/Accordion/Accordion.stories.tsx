import '@ahhachul/react-components-accordion/style.css';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel } from '@ahhachul/react-components-accordion';
import React from 'react';

import '@ahhachul/react-components-layout/style.css';
import { Text, Heading } from '@ahhachul/react-components-layout';

export default {
  title: 'React Components/Accordion',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const AccordionStory = {
  render: () => (
    <Accordion defaultActiveItems={['목록1']} style={{ width: '500px' }}>
      <AccordionItem itemName="목록1">
        <AccordionButton>
          <Heading color="gray" fontSize="lg">
            목록 1
          </Heading>
        </AccordionButton>
        <AccordionPanel>
          <Text color="gray" fontSize="md">
            내용입니다.
          </Text>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem itemName="목록2">
        <AccordionButton>
          <Heading color="gray" fontSize="lg">
            목록 2
          </Heading>
        </AccordionButton>
        <AccordionPanel>
          <Text color="gray" fontSize="md">
            내용입니다.
            <br />
            내용입니다.
          </Text>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  ),
};

export const AccordionTestStory = {
  args: {
    items: [
      {
        name: '목록1',
        content: '내용입니다.',
      },
      {
        name: '목록2',
        content: '내용입니다.\n내용입니다.',
      },
    ],
    defaultActiveItems: [],
  },
  render: ({ defaultActiveItems, items }) => (
    <Accordion defaultActiveItems={defaultActiveItems} style={{ width: '500px' }}>
      {items.map((item, index) => (
        <AccordionItem key={item.name} itemName={item.name}>
          <AccordionButton data-testid={`button-${index}`}>
            <Heading color="gray" fontSize="lg">
              {item.name}
            </Heading>
          </AccordionButton>
          <AccordionPanel data-testid={`panel-${index}`}>
            <Text color="gray" fontSize="md">
              {item.content}
            </Text>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  ),
};
