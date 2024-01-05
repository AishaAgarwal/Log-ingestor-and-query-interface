import React from "react";
import LogQueryInterface from "../components/LogQueryInterface";

const LogQueryPage = () => {
    const handleLogQuery = (query) => {
        console.log('Log query to be executed: ', query);
    }

    return (
        <div>
            <h1>Log Query</h1>
            <LogQueryInterface onLogQuery={handleLogQuery} />
        </div>
    )
}

export default LogQueryPage;