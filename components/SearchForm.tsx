import { Search } from "lucide-react";
import SearchFormReset from "./SearchFormReset";
import Form from "next/form";

const SearchForm = ({ query }: { query?: string }) => {

    return (
        <Form action="/" scroll={false} className="search-form">
            <input
                name="query" defaultValue={query}
                className="search-input" placeholder="Procure startups"
            />

            <div className="flex gap-2">
                {query && <SearchFormReset />}
                <button type="submit" className="search-btn text-white">
                    <Search className="size-6"/>
                </button>
            </div>
        </Form>
    )
}

export default SearchForm;
