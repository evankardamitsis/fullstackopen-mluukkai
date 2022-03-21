import React from "react";

const Search = ({filter, handleFilter}) => (
    <div>
        <form>
            <div>filter shown with
                <input  value={filter} onChange={handleFilter} />
            </div>
        </form>
    </div>
)

export default Search