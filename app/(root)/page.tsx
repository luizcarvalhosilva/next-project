import SearchForm from "../../components/SearchForm";
import StartupCard from "../../components/StartupCard";

export default async function Home({ searchParams }: {
  searchParams: Promise<{ query?: string }>
}) {
  const query = (await searchParams).query;

  const posts = [
    {
      _created: new Date(),
      views: 55,
      author: { _id: 1, name: "Jose" },
      _id: 1,
      description: "lorem lorem lorem",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Eficiência",
      title: "Trabalho expresso"
    },
  ]

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
            posts.map((post: StartupCardType) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">Desculpe, nada encontrado</p>
          )}

        </ul>
      </section>
    </>
  );
}
