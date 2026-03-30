from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime
from .. import models, schemas, database

router = APIRouter(prefix="/tareas")

@router.get("/")
def listar(db: Session = Depends(database.SessionLocal)):
    return db.query(models.Tarea).filter(models.Tarea.deleted_at == None).all()

@router.post("/")
def crear(data: schemas.TareaCreate, db: Session = Depends(database.SessionLocal)):
    t = models.Tarea(**data.dict())
    db.add(t)
    db.commit()
    return t

@router.patch("/{id}/complete")
def completar(id: int, db: Session = Depends(database.SessionLocal)):
    t = db.query(models.Tarea).get(id)
    t.completada = not t.completada
    db.commit()
    return t

@router.delete("/{id}")
def eliminar(id: int, db: Session = Depends(database.SessionLocal)):
    t = db.query(models.Tarea).get(id)
    t.deleted_at = datetime.utcnow()
    db.commit()
    return {"msg": "Eliminado lógico"}