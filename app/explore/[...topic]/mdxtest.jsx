"use client";

import React, { useEffect } from "react";
import hljs from "highlight.js/lib/core";
import "highlight.js/styles/github-dark.css";
import javascript from "highlight.js/lib/languages/javascript";
hljs.registerLanguage("javascript", javascript);

const Mdxtest = ({ source }) => {
  useEffect(() => {
    const content = document.getElementById("content");
    const heading = content.getElementsByTagName("h1");
    //   content.innerHTML = `<h1>hello world</h1>
    //   <pre><code >
    //     //strings
    //     const names = ["Seema", "Rekha", "Jaya"];
    //     names.sort();
    //     //['Jaya', 'Rekha', 'Seema' ]

    //     console.log(\`Lets meet at the $\{foo}\`)

    //     //Numbers
    //     const numbers = [101, 8, 87];
    //     numbers.sort((a, b) => {
    //     return a - b;
    //     });
    //     //[ 8, 87, 101 ]
    //   </code></pre>
    // `;
    content.innerHTML = source;
    // Array.from(heading).forEach((h) => (h.style.color = "white"));

    hljs.highlightAll();
  }, [source]);
  return <div id="content" />;
};

export default Mdxtest;
