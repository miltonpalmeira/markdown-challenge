import React, { useEffect, useState } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import styles from "./Preview.module.css";

interface PreviewProps {
  content: string;
}

const Preview: React.FC<PreviewProps> = ({ content }) => {
  const [sanitizedHtml, setSanitizedHtml] = useState<string>("");

  useEffect(() => {
    const processContent = async () => {
      const htmlContent = await Promise.resolve(marked(content));
      const sanitized = DOMPurify.sanitize(htmlContent);
      setSanitizedHtml(sanitized);
    };
    processContent();
  }, [content]);

  return (
    <div
      className={styles.preview_container}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
};

export default Preview;
