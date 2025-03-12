import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import SearchForm from "../../components/SearchForm";
import StartupCard, { StartupTypeCard } from "../../components/StartupCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";

export default async function Home({ searchParams }: {
  searchParams: Promise<{ query?: string }>
}) {
  const query = (await searchParams).query;

  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY });

  return (
    <>
      <section className="blue_container">
        <h1 className="heading">
          Mostre sua Startup,<br />
          conecte-se com empreendedores
        </h1>
        <p className="sub-heading !max-w-3xl">Submeta suas ideias, Vote e Seja Notado</p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Resultados da busca por "${query}" ` : "Todas as startups:"}
        </p>

        <ul className="mt-7 card_grid">

          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">Desculpe, nada encontrado</p>
          )}

        </ul>
      </section>
      <SanityLive />
    </>
  );
}
