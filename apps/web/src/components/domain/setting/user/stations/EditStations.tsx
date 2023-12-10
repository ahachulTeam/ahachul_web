import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd'
import { MinusCircleIcon, WaffleIcon } from '@/assets/icons'
import { UserStationsModel } from '@/types'

interface EditStationsProps {
  userStations: UserStationsModel
}

export type TItemStatus = 'todo'

export type TItem = {
  id: string
  status: TItemStatus
  title: string
}

export type TItems = {
  [key in TItemStatus]: TItem[]
}

const EditStations = ({ userStations }: EditStationsProps) => {
  const [items, setItems] = useState<TItems>({
    todo: userStations.stationInfoList.map(station => ({
      id: `${station.stationId}`,
      title: station.stationName,
      status: 'todo',
    })),
  })

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) {
      return
    }

    const scourceKey = source.droppableId as TItemStatus
    const destinationKey = destination.droppableId as TItemStatus

    const _items = JSON.parse(JSON.stringify(items)) as typeof items
    const [targetItem] = _items[scourceKey].splice(source.index, 1)
    _items[destinationKey].splice(destination.index, 0, targetItem)
    setItems(_items)
  }

  // --- requestAnimationFrame 초기화
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true))

    return () => {
      cancelAnimationFrame(animation)
      setEnabled(false)
    }
  }, [])

  if (!enabled) {
    return null
  }

  return (
    <StationBox>
      <DragDropContext onDragEnd={onDragEnd}>
        {Object.keys(items).map(key => (
          <>
            {items[key as TItemStatus].map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {provided => (
                  <Station
                    color="#60B157"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <MinusCircleIcon />
                    <b>1</b>
                    <span>{item.title}</span>
                    <DragButton>
                      <WaffleIcon />
                    </DragButton>
                  </Station>
                )}
              </Draggable>
            ))}
          </>
        ))}
      </DragDropContext>
    </StationBox>
  )
}

const StationBox = styled.div`
  padding: 16px 0;
`

const Station = styled.div<{ color: string }>`
  ${({ theme, color }) => css`
    position: relative;
    height: 72px;
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    border-bottom: 1px solid #ededed;

    & > b {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 8px;
      width: 24px;
      height: 24px;
      border-radius: 12px;
      background-color: ${color};
      color: ${theme.colors.white};
      ${theme.fonts.regular12};
    }

    & > span {
      ${theme.fonts.regular16};
      color: ${theme.colors.black};
    }
  `}
`

const DragButton = styled.button`
  all: unset;
  position: absolute;
  width: max-content;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
`

export default EditStations
