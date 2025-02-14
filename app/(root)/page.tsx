import SearchForm from "../../components/SearchForm";

export default async function Home({ searchParams }: {
  searchParams: Promise<{ query?: string }>
}) {
  const query = (await searchParams).query;

  return (
    <>
      <section className="blue_container">
        <h1 className="heading">
          Mostre sua Startup,<br/> 
          conecte-se com empreendedores
        </h1>
        <p className="sub-heading !max-w-3xl">Submeta suas ideias, Vote e Seja Notado</p>
        <SearchForm query={query} />
      </section>
    </>
  );
}
