from fastapi import FastAPI, HTTPException
import mysql.connector
import logging
from pydantic import BaseModel

app = FastAPI()

connection = mysql.connector.connect(
  host = "gateway01.ap-southeast-1.prod.aws.tidbcloud.com",
  port = 4000,
  user = "47SDPsuoo9emjmh.root",
  password = "KbrsgxA3RLmHMbPg",
  database = "test",
  ssl_ca = "F:\F Drive backup\Backup\Downloads\isrgrootx1.pem",
  ssl_verify_cert = True,
  ssl_verify_identity = True
)

logging.basicConfig(level=logging.INFO)
logging.info("Connected to TiDB Cloud successfully.")

class LogIngestPayload(BaseModel):
    log_type: str
    message: str
   

class LogQueryPayload(BaseModel):
    log_type: str

@app.get("/")
def read_root():
    return {"message" : "Welcome to your FastAPI application"}



@app.post("/logIngest")
def log_ingest(payload: LogIngestPayload):
    try:
        cursor = connection.cursor()
        insert_query = "INSERT INTO logs (log_type, message) VALUES (%s, %s)"
        cursor.execute(insert_query, (payload.message, payload.log_type))
        connection.commit()
        logging.info("Log data ingested successfully")
        return {"message": "Log data ingested successfully"}
    
    except Exception as e:
        logging.error(f"Error during log ingestion: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail="Error during log ingestion: {str(e)}")
    
    finally:
        cursor.close()

@app.post("/logQuery")
def log_query(log_type: str):
    try:
        cursor = connection.cursor(dictionary=True)
        query = "SELECT * FROM logs WHERE log_type = %s"
        logging.info(f"Executing query: {query} with parameters: {log_type}")
        cursor.execute(query, (log_type,))
        result = cursor.fetchall();
        logging.info("Log data queried successfully : {result}")
        return {"logs" : result}
    
    except Exception as e:
        logging.error(f"Error during log ingestion: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Error during log query: {str(e)}")
    
    finally:
        cursor.close()