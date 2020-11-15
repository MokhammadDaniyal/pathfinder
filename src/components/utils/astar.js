const traverse = ({ grid, start, end, maxRow, maxCol }) => {
  let current = grid[start[0]][start[1]];
  current.distance = 0;

  let endNode = grid[end[0]][end[1]];
  let queue = [current];
  const visitOrder = [];

  while (current != endNode || queue.length == 0) {
    current = queue.shift();
    if (current == null) {
      break;
    }
    if (current.isVisited) {
      continue;
    }
    const neighbours = findNeighbours(
      current.row,
      current.col,
      grid,
      maxRow,
      maxCol
    );
    neighbours.forEach((node) => {
      updateDistance(node, current, endNode);
    });
    queue = [...neighbours, ...queue];
    queue.sort((a, b) => a.distance - b.distance);
    current.isVisited = true;
    visitOrder.push(current);
  }
  let path = [];
  if (queue.length != 0) {
    path = constructPath({ grid, end, start });
  }
  return { visitOrder, path };
};

const findNeighbours = (row, col, grid, maxRow, maxCol) => {
  if (row == 0 || col == 0 || row + 1 >= maxRow || col + 1 >= maxCol) {
    return [];
  }
  const up = grid[row - 1][col];
  const down = grid[row + 1][col];
  const left = grid[row][col - 1];
  const right = grid[row][col + 1];
  const ans = [];
  if (!up.isWall) {
    ans.push(up);
  }
  if (!down.isWall) {
    ans.push(down);
  }
  if (!left.isWall) {
    ans.push(left);
  }
  if (!right.isWall) {
    ans.push(right);
  }

  return ans;
};

const updateDistance = (node, current, endNode) => {
  let possibleDistance =
    current.distance + 1 + calculateHeuristicDistance(node, endNode);
  if (node.distance > possibleDistance) {
    node.distance = possibleDistance;
    node["via"] = current;
  }
};

const calculateHeuristicDistance = (start, end) => {
  let xDif = end.col - start.col;
  let yDif = end.row - start.row;
  let fullDiff = Math.sqrt(xDif * xDif + yDif * yDif);
  return fullDiff * fullDiff; //Increase distance to fisualize A* property better
};

const constructPath = ({ grid, end, start }) => {
  let path = [];
  let current = grid[end[0]][end[1]];
  let startNode = grid[start[0]][start[1]];
  let acc = 1000;
  while (current != startNode) {
    if (acc == 0) break;
    path.push(current);
    current = current.via;
    acc--;
  }
  return path.reverse();
};
export default { traverse };
