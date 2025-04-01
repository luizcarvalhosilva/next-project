import { auth } from "@/auth";
import StartupForm from "@/components/StartupForm";
import { redirect } from "next/dist/server/api-utils";

async function Page() {

    const session = await auth();
    if(!session) redirect("/");

    return(
        <>
            <section className="blue_container !min-h-[230px]">
                <h1 className="heading">Mostre sua Startup!</h1>
            </section>
            <StartupForm/>
        </>
    );
}

export default Page;