import React from "react";
import "./Cell.css";

const Cell = ({
  col,
  row,
  isStart,
  isEnd,
  shouldAnimate,
  isPath,
  isMouseDown,
  setCellAsWall,
  isWall,
}) => {
  return (
    <div
      className={`cell ${selectColor({
        isStart,
        isEnd,
        shouldAnimate,
        isPath,
        isWall,
      })}`}
      onMouseEnter={() => {
        if (isMouseDown) setCellAsWall({ row, col });
      }}
      onClick={() => {
        setCellAsWall({ row, col });
      }}
      onMouseDown={() => {}}
      onMouseUp={() => {
        // setIsMouseDown(false);
      }}
    ></div>
  );
};
const selectColor = ({ isStart, isEnd, shouldAnimate, isPath, isWall }) => {
  if (isStart) return "start";
  if (isEnd) return "end";
  if (isWall) return "wall";
  if (isPath) return "path-node";
  if (shouldAnimate) return "visited";
};
export default Cell;
