from fastapi import FastAPI
from .database import Base, engine
from .routers import auth, materias, tareas

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(auth.router)
app.include_router(materias.router)
app.include_router(tareas.router)