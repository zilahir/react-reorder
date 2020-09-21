import React, { useState, useRef } from 'react';
import styled from "styled-components";
import './App.css';
import arrayMove from 'array-move';
import {SortableContainer, SortableElement} from '@alexcheuk/react-sortable-hoc';

import { colors } from './coloors';

interface BoxxProps {
  backgroundColor: string;
}

const Boxx = styled.div<BoxxProps>`
  padding: 50px;
  display: flex;
  justify-content: "center";
  align-items: "center";
  text-align: "center";
  background-color: ${props => props.backgroundColor};
  margin: 30px;

  &:hover {
    cursor: pointer;
  }
`

interface BoxProps {
  backgroundColor: string;
  index: number;
}

const Box = ({
  backgroundColor,
  index,
}: BoxProps) => {

  const ref = useRef<HTMLDivElement>(null);
  return (
    <Boxx
      ref={ref}
      backgroundColor={backgroundColor}
    >
      { index + 1}
    </Boxx>
  )
}

const SortableItem = SortableElement(({backgroundColor, index}: BoxProps) => {
  return (
    <Box backgroundColor={backgroundColor} index={index} />
  )
});

const SortableList = SortableContainer(({ items }: any) => {
  return (
    <ul>
      {
        items.map((value: string, index: number) => (
          <SortableItem backgroundColor={value} index={index} />
        ))
      }
    </ul>
  );
});

function App() {
  const [boxes, setBoxes] = useState(colors)
  function onSortEnd ({oldIndex, newIndex}: any) {
    setBoxes(arrayMove(boxes, oldIndex, newIndex))
  };
  return (
    <div className="App">
      <SortableList axis="xy" items={boxes} onSortEnd={({ oldIndex, newIndex}: any) => onSortEnd({oldIndex, newIndex})} />
    </div>
  );
}

export default App;
