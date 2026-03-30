from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime
from sqlalchemy.sql import func
from .database import Base

class Usuario(Base):
    __tablename__ = "usuarios"
    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True)
    password = Column(String)

class Materia(Base):
    __tablename__ = "materias"
    id = Column(Integer, primary_key=True)
    nombre = Column(String)
    deleted_at = Column(DateTime, nullable=True)

class Tarea(Base):
    __tablename__ = "tareas"
    id = Column(Integer, primary_key=True)
    titulo = Column(String)
    completada = Column(Boolean, default=False)
    prioridad = Column(String)
    materia_id = Column(Integer, ForeignKey("materias.id"))
    deleted_at = Column(DateTime, nullable=True)