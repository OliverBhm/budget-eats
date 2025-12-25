import { Fragment } from "react/jsx-runtime";

interface HighlightedTextProps {
  text: string;
  highlights: string[];
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function HighlightedText({ text, highlights }: HighlightedTextProps) {
  if (!highlights || highlights.length === 0) {
    return <p>{text}</p>;
  }

  const sortHighlights = [...highlights].sort((a, b) => b.length - a.length);
  const pattern = new RegExp(
    `(${sortHighlights.map(escapeRegExp).join("|")})`,
    "gi"
  );
  const parts = text.split(pattern);

  return (
    <p>
      {parts.map((part, index) => {
        const isHighlight = sortHighlights.some(
          (h) => h.toLowerCase() === part.toLowerCase()
        );

        return isHighlight ? (
          <strong key={index}>{part}</strong>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        );
      })}
    </p>
  );
}

export { HighlightedText };