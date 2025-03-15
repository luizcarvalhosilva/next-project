async function Page({ params }: { params: Promise<{ id: string }> }) {

    const id = (await params).id;

    return (
        <>
            <h1 className="text-3xl">Esse é o número de uma startup: {id}</h1>
        </>
    )

}

export default Page;