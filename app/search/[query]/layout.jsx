export async function generateMetadata({ params }) {
  const query = params?.query ? decodeURIComponent(params.query) : "";
  return {
    title: query ? `Search: ${query}` : "Search",
    description: query
      ? `Search results for "${query}" - Find tech articles and tutorials at xplodivity.`
      : "Search tech articles and tutorials at xplodivity.",
    robots: { index: true, follow: true },
  };
}

export default function SearchLayout({ children }) {
  return children;
}
