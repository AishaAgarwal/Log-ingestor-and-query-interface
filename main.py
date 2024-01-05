from fastapi import FastAPI, HTTPException
import mysql.connector
import logging

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

@app.get("/")
def read_root():
    return {"message" : "Welcome to your FastAPI application"}

@app.post("/logIngest")
def log_ingest(log_data: str):
    try:
        cursor = connection.cursor()
        return {"message": "Log data ingested successfully"}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error during log ingestion: {str(e)}")
    
    finally:
        cursor.close()

@app.post("/logQuery")
def log_query(query: str):
    try:
        cursor = connection.cursor()
        return {"message": f"Query executed: {query}"}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error during log query: {str(e)}")
    
    finally:
        cursor.close()