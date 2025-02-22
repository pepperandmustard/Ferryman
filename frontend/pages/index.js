import client from "../lib/contentful";

export async function getStaticProps() {
  const res = await client.getEntries({ content_type: "article" });

  return {
    props: {
      articles: res.items,
    },
    revalidate: 60,
  };
}

export default function Home({ articles }) {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center">Welcome to Ferry Booking</h1>
      
      <section className="mt-8">
        <h2 className="text-xl font-semibold">Latest News</h2>
        {articles.length === 0 ? (
          <p>No news available.</p>
        ) : (
          articles.map((article) => (
            <div key={article.sys.id} className="p-4 border rounded-lg mt-2">
              <h3 className="text-lg font-semibold">{article.fields.title}</h3>
              <p>{article.fields.description}</p>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
