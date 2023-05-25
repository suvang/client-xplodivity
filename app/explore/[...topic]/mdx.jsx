import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import "@styles/highlight-js/github-dark-dimmed.css";
import rehypeSlug from "rehype-slug";

// `
// ## Hello, world!

// Here is some code:
// \`\`\` js
// //strings
// const names = ["Seema", "Rekha", "Jaya"];
// names.sort();
// //['Jaya', 'Rekha', 'Seema' ]

// console.log(\`Lets meet at the $\{foo}\`)

// //Numbers
// const numbers = [101, 8, 87];
// numbers.sort((a, b) => {
// return a - b;
// });
// //[ 8, 87, 101 ]
// \`\`\`

// ## second heading

// Here is some code:
// \`\`\` js
// //strings
// const names = ["Seema", "Rekha", "Jaya"];
// names.sort();
// //['Jaya', 'Rekha', 'Seema' ]

// console.log(\`Lets meet at the $\{foo}\`)

// //Numbers
// const numbers = [101, 8, 87];
// numbers.sort((a, b) => {
// return a - b;
// });
// //[ 8, 87, 101 ]
// \`\`\`

// ## third heading

// Here is some code:
// \`\`\` js
// //strings
// const names = ["Seema", "Rekha", "Jaya"];
// names.sort();
// //['Jaya', 'Rekha', 'Seema' ]

// console.log(\`Lets meet at the $\{foo}\`)

// //Numbers
// const numbers = [101, 8, 87];
// numbers.sort((a, b) => {
// return a - b;
// });
// //[ 8, 87, 101 ]
// \`\`\`

// ## fourth heading

// Here is some code:
// \`\`\` js
// //strings
// const names = ["Seema", "Rekha", "Jaya"];
// names.sort();
// //['Jaya', 'Rekha', 'Seema' ]

// console.log(\`Lets meet at the $\{foo}\`)

// //Numbers
// const numbers = [101, 8, 87];
// numbers.sort((a, b) => {
// return a - b;
// });
// //[ 8, 87, 101 ]
// \`\`\`
// `

const Mdx = async ({ source }) => {
  const options = {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [rehypeHighlight, rehypeSlug],
    },
  };

  return <MDXRemote source={source} options={options} />;
};

export default Mdx;
