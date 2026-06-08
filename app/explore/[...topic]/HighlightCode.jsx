"use client";

import { useEffect } from "react";
import hljs from "highlight.js/lib/core";
import "highlight.js/styles/github-dark.css";
import javascript from "highlight.js/lib/languages/javascript";

hljs.registerLanguage("javascript", javascript);

export default function HighlightCode() {
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return null;
}
