from contextlib import asynccontextmanager

from fastapi import APIRouter, Depends, FastAPI
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.api.routes.main import api_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    yield


app = FastAPI(lifespan=lifespan)

app.include_router(api_router, prefix="/api")


@app.get("/")
async def hello_word():
    return {"Idan": "Paguio"}


# @app.get("/health/db")
# def database_health(db: Session = Depends(get_db)):
#     db.execute(text("SELECT 1"))
#     return {"database": "ok"}
