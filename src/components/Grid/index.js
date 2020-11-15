import React, { useState, useEffect } from "react";
import Cell from "../Cell";
import "./Grid.css";

import dijkstra from "../utils/dijkstra";

const MAX_COL = 30;
const MAX_ROW = 15;
const START = [5, 5];
const END = [10, 15];
const initGrid = (setStart, setCellAsWall) => {
  let i = 0;

  let grid = [[]];
  while (i < MAX_ROW) {
    let row = [];
    let j = 0;
    while (j < MAX_COL) {
      const isStart = i == START[0] && j == START[1];
      const isEnd = i == END[0] && j == END[1];
      const cellObj = {
        col: j,
        row: i,
        isVisited: false,
        shouldAnimate: false,
        distance: Infinity,
        isStart: isEnd,
        isEnd: isStart,
        isPath: false,
        isDraging: false,
        isWall: false,
        renderFunc: (props) => (
          <Cell
            setStart={setStart}
            setCellAsWall={(data) => {
              setCellAsWall({ ...data, grid });
            }}
            {...props}
          />
        ),
      };
      row.push(cellObj);
      j++;
    }
    grid[i] = row;
    i++;
  }
  return grid;
};

const Grid = () => {
  const [grid, setGrid] = useState([[]]);
  const [start, setStart] = useState(START);
  const [end, setEnd] = useState(END);
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    // const newGrid = [...grid];
    // setGrid(newGrid);
  }, [start]);

  useEffect(() => {
    const grid = initGrid(setStart, setCellAsWall);
    setGrid(grid);
  }, []);

  useEffect(() => {
    window.addEventListener(
      "mousedown",
      (e) => {
        setIsMouseDown(true);
      },
      false
    );
    window.addEventListener(
      "mouseup",
      (e) => {
        setIsMouseDown(false);
      },
      false
    );
    return () => {
      window.removeEventListener("mousedown", () => {});
      window.removeEventListener("mouseup", () => {});
    };
  }, []);

  const setCellAsWall = ({ col, row, grid }) => {
    const node = grid[row][col];
    const newGrid = [...grid];
    const newNode = { ...node, isWall: !node.isWall };
    newGrid[row][col] = newNode;
    setGrid(newGrid);
  };

  const animateVisits = (visitOrder, grid, callback) => {
    visitOrder.forEach((node, i) => {
      setTimeout(() => {
        const newGrid = [...grid];
        const newNode = { ...node, shouldAnimate: true };
        newGrid[node.row][node.col] = newNode;
        setGrid(newGrid);
        if (i == visitOrder.length - 1) {
          callback();
        }
      }, 100 * i);
    });
  };

  const visualizeDijkstra = () => {
    const { visitOrder, path } = dijkstra.traverse({
      start: start,
      grid: grid,
      end: end,
      maxRow: MAX_ROW,
      maxCol: MAX_COL,
    });

    animateVisits(visitOrder, grid, () => {
      if (path.length == 0) {
        // alert("no Path");
      } else {
        animatePath(path);
      }
    });
  };

  const animatePath = (path) => {
    path.forEach((node, i) => {
      setTimeout(() => {
        const newGrid = [...grid];
        const newNode = { ...node, isPath: true };
        newGrid[node.row][node.col] = newNode;
        setGrid(newGrid);
      }, 50 * i);
    });
  };

  return (
    <div
      style={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1>
        The platform is under development. Come back later for better more
        algorithms and improved UI.
      </h1>
      <h3>Hold Left mouse button and hover over grid to create a wall.</h3>
      <button
        onClick={() => {
          visualizeDijkstra();
        }}
      >
        Visiualise dijkstra
      </button>
      {renderGrid(grid, isMouseDown)}
    </div>
  );
};

const renderGrid = (grid, isMouseDown) => {
  return (
    <>
      {grid.map((row) => {
        return <div className="row">{renderRow(row, isMouseDown)}</div>;
      })}
    </>
  );
};

const renderRow = (row, isMouseDown) => {
  return (
    <>
      {row.map((cell) => {
        return cell.renderFunc({ ...cell, ...{ isMouseDown: isMouseDown } });
      })}
    </>
  );
};

export default Grid;
