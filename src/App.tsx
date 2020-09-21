import React, { useState, useRef, useEffect } from 'react';
import styled from "styled-components";
import './App.css';
import { motion, useMotionValue } from 'framer-motion'
import move from "array-move";

import { colors } from './coloors';
import { findIndex, Position } from './findIndex';

interface BoxxProps {
  backgroundColor: string;
}

const Boxx = styled(motion.div)<BoxxProps>`
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
  setPosition: (i: number, offset: Position) => Position;
  moveItem: any;
}

const Box = ({
  backgroundColor,
  index,
  moveItem,
  setPosition,
}: BoxProps) => {
  const [isDragging, setDragging] = useState(false);
  const onTop = { zIndex: 1 };
  const flat = {
    zIndex: 0,
    transition: { delay: 0.3 }
  };

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current !== null) {
      setPosition(index, {
        height: ref.current.offsetHeight,
        top: ref.current.offsetTop
      });
    }
  });

  const dragOriginY = useMotionValue(0);

  return (
    <Boxx
      ref={ref}
      animate={isDragging ? onTop : flat}
      backgroundColor={backgroundColor}
      whileHover={{ scale: 1.05 }}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      drag
      dragElastic={1}
      initial={false}
      onDragStart={() => setDragging(true)}
      onDragEnd={() => setDragging(false)}
      onDrag={(e, { point }) => moveItem(index, point.y, point.x)}
      layout="position"
      transition={dragOriginY}
    >
      { index + 1}
    </Boxx>
  )
}

function App() {
  const [boxes, setBoxes] = useState(colors)

  const positions = useRef<Position[]>([]).current;
  const setPosition = (i: number, offset: Position) => (positions[i] = offset);

  const moveItem = (i: number, dragOffsetY: number, dragOffsetX: number) => {
    const targetIndex = findIndex(i, dragOffsetY, dragOffsetX, positions);
    if (targetIndex !== i) setBoxes(move(colors, i, targetIndex));
  };

  return (
    <div className="App">
      {
        boxes.map((currColor, index) => (
          <Box
            key={currColor}
            backgroundColor={currColor}
            index={index}
            setPosition={setPosition}
            moveItem={moveItem}
          />
        ))
      }
    </div>
  );
}

export default App;
