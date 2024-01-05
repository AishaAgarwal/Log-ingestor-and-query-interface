import React from "react";
import LogIngestForm from "../components/LogIngestForm";

const LogIngestPage = () => {
    const handleLogIngest = (logData) => {
        console.log('Log data to be ingested: ', logData);
    };

    return (
        <div>
            <h1>Log Ingestion</h1>
            <LogIngestForm onlogingest={handleLogIngest} />

        </div>
    )

}

export default LogIngestPage;