import React from "react";
import { marked } from "marked";

interface PreviewProps {
  content: string;
}

const Preview: React.FC<PreviewProps> = ({ content }) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: marked(content) }} />
  );
};

export default Preview;
