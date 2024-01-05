import React, {useState} from "react";

const LogQueryInterface = ({onLogQuery}) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        onLogQuery(query);
        setQuery('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Log Query:
                <input type="text" value={query} onChange={handleInputChange} />
            </label>
            <button type="submit"> Query Logs</button>
        </form>
    )
}

export default LogQueryInterface;