from contextlib import asynccontextmanager

from fastapi import APIRouter, Depends, FastAPI
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.api.routes.main import api_router
from app.core.db import engine
from app.core.init_db import init_db


@asynccontextmanager
async def lifespan(app: FastAPI):
    # TODO: optimize implementation of initial data seeding
    await init_db()
    yield
    await engine.dispose()


app = FastAPI(lifespan=lifespan)

app.include_router(api_router, prefix="/api")


@app.get("/")
async def hello_word():
    return {"Idan": "Paguio"}


# @app.get("/health/db")
# def database_health(db: Session = Depends(get_db)):
#     db.execute(text("SELECT 1"))
#     return {"database": "ok"}
