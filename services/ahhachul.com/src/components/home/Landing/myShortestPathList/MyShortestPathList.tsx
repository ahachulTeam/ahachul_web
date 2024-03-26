import { Theme } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import IconDndBar from 'static/icons/system/IconDndBar';
import { f } from 'styles';

const MyShortestPathList = () => {
  const [items, setItems] = useState([
    { id: 'abcbasd', content: '사당 > 판교' },
    { id: '13ekdsad', content: '녹양 > 교대' },
    { id: 'xczzxcz3', content: '동묘 > 과천정부청사' },
    { id: 'asd2ccs4', content: '성복 > 강남' },
  ]);

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return;

    const _items = JSON.parse(JSON.stringify(items));
    const [targetItem] = _items.splice(source.index, 1);
    _items.splice(destination.index, 0, targetItem);
    setItems(_items);
  };

  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) return null;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div css={listWrap} ref={provided.innerRef} {...provided.droppableProps}>
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <div css={itemWrap}>
                      <span>{item.content}</span>
                      <IconDndBar />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const listWrap = [f.fullWidth, f.sideGutter, f.flexColumn, { margin: '24px 0' }];

const itemWrap = [
  f.fullWidth,
  f.flexAlignCenter,
  f.flexJustifySpaceBetween,
  ({ typography: { fontSize, fontWeight } }: Theme) => ({
    height: '32px',

    '& > span': {
      color: '#c9cedc',
      fontSize: fontSize[14],
      fontWeight: fontWeight[500],
    },
  }),
];

export default MyShortestPathList;
