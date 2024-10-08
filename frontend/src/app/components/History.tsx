import React from "react";

interface HistoryProps {
  undo: () => void;
  redo: () => void;
}

const History: React.FC<HistoryProps> = ({ undo, redo }) => {
  return (
    <div>
      <button onClick={undo}>Undo</button>
      <button onClick={redo}>Redo</button>
    </div>
  );
};

export default History;
