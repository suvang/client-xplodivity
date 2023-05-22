import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import "@styles/highlight-js/github-dark-dimmed.css";
import rehypeSlug from "rehype-slug";
import Link from "next/link";

const options = {
  mdxOptions: {
    remarkPlugins: [],
    rehypePlugins: [rehypeHighlight, rehypeSlug],
  },
};

const TopicPage = ({ params }) => {
  return (
    <div className="w-full flex-between">
      <div className="flex-start flex-col gap-10">
        <div>
          <iframe
            width="1022"
            height="575"
            src="https://www.youtube.com/embed/u1e4z92ClsI"
            title="10 JavaScript One Liners to save 1000+ hours"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
        <h1 className="text-3xl font-bold">
          10 JavaScript One Liners to save 1000+ hours
        </h1>

        <article className="prose prose-DEFAULT">
          <MDXRemote
            source={`
          ## Hello, world! 

          Here is some code:
          \`\`\` js
          //strings
          const names = ["Seema", "Rekha", "Jaya"];
          names.sort();
          //['Jaya', 'Rekha', 'Seema' ]

          console.log(\`Lets meet at the $\{foo}\`)

          //Numbers
          const numbers = [101, 8, 87];
          numbers.sort((a, b) => {
          return a - b;
          });
          //[ 8, 87, 101 ]
          \`\`\`

          ## second heading 

          Here is some code:
          \`\`\` js
          //strings
          const names = ["Seema", "Rekha", "Jaya"];
          names.sort();
          //['Jaya', 'Rekha', 'Seema' ]

          console.log(\`Lets meet at the $\{foo}\`)

          //Numbers
          const numbers = [101, 8, 87];
          numbers.sort((a, b) => {
          return a - b;
          });
          //[ 8, 87, 101 ]
          \`\`\`

          ## third heading 

          Here is some code:
          \`\`\` js
          //strings
          const names = ["Seema", "Rekha", "Jaya"];
          names.sort();
          //['Jaya', 'Rekha', 'Seema' ]

          console.log(\`Lets meet at the $\{foo}\`)

          //Numbers
          const numbers = [101, 8, 87];
          numbers.sort((a, b) => {
          return a - b;
          });
          //[ 8, 87, 101 ]
          \`\`\`

          ## fourth heading 

          Here is some code:
          \`\`\` js
          //strings
          const names = ["Seema", "Rekha", "Jaya"];
          names.sort();
          //['Jaya', 'Rekha', 'Seema' ]

          console.log(\`Lets meet at the $\{foo}\`)

          //Numbers
          const numbers = [101, 8, 87];
          numbers.sort((a, b) => {
          return a - b;
          });
          //[ 8, 87, 101 ]
          \`\`\`
        `}
            options={options}
          />
        </article>
      </div>

      <div className="flex-start flex-col gap-2">
        <Link href={`/explore/${params}#hello-world`}>Hello, world!</Link>
        <Link href={`/explore/${params}#second-heading`}>second heading</Link>
        <Link href={`/explore/${params}#third-heading`}>third heading</Link>
        <Link href={`/explore/${params}#fourth-heading`}>fourth heading</Link>
      </div>
    </div>
  );
};

export default TopicPage;
