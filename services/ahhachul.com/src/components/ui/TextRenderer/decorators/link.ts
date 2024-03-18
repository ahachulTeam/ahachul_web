import { CompositeDecorator } from 'draft-js';

import { InnerLink } from '../InnerLink';

export const linkDecorator = new CompositeDecorator([
  {
    strategy: (contentBlock, callback, contentState) => {
      contentBlock.findEntityRanges((character) => {
        const entityKey = character.getEntity();
        return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK';
      }, callback);
    },
    component: InnerLink,
  },
]);
