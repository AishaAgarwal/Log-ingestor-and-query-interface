import React, {useState} from "react";

const LogIngestForm = ({ onlogingest}) => {
    const [logData, setLogData] = useState('');

    const handleInputChange = (e) => {
        setLogData(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onlogingest(logData);
        setLogData('');
    };

    return (
        <form onSubmit = {handleSubmit}>
        <label>
        Log Data:
        <textarea value={logData} onChange={handleInputChange} />
        </label>
        <button type="submit">Ingest Log</button>
        </form>
    )
}

export default LogIngestForm;