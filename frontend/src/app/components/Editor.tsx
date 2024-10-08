import React from "react";

interface EditorProps {
  markDown: string;
  onChange: (value: string) => void;
}

const Editor: React.FC<EditorProps> = ({ markDown, onChange }) => {
  return (
    <textarea
      value={markDown}
      onChange={(e) => onChange(e.target.value)}
      style={{ width: "100%", height: "200px" }}
    />
  );
};

export default Editor;
