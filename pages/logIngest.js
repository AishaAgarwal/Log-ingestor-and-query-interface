import React from "react";
import LogIngestForm from "../components/LogIngestForm";

const LogIngestPage = () => {
    const handleLogIngest = async (logData) => {
        try{
            const response = await fetch('/api/logIngest', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({logData}),
            })
            const data = await response.json();

            if (response.ok){
                console.log('Log ingestion successful: ',data);
            }
            else{
                console.error('Log ingestion failed: ', data.error);
            }
        }
        catch(error){
            console.error('Error during log ingestion: ', error);
        }
       
    };

    return (
        <div>
            <h1>Log Ingestion</h1>
            <LogIngestForm onlogingest={handleLogIngest} />

        </div>
    )

}

export default LogIngestPage;