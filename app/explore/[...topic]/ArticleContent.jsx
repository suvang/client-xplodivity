export default function ArticleContent({ html }) {
  if (!html) return null;
  return <div id="content" dangerouslySetInnerHTML={{ __html: html }} />;
}
