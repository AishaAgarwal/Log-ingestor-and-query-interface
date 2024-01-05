export default async function handler(req, res) {
    if (req.method === 'POST'){
        try{
            const {logData} = req.body;

            const response = await fetch('http://localhost:8000/logQuery', {
                method : 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({query}),
            });

            const data = await response.json();

            if (response.ok){
                res.status(200).json(data);
            }
            else{
                res.status(response.status).json({error: data.message});
            }
        }
        catch(error){
            res.staus(500).json({error: 'Internal server Error'});
        }
    }
    else{
        res.status(405).json({error: 'Method Not Allowed'});
    }
}