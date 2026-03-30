from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime
from .. import models, schemas, database

router = APIRouter(prefix="/materias")

@router.get("/")
def listar(db: Session = Depends(database.SessionLocal)):
    return db.query(models.Materia).filter(models.Materia.deleted_at == None).all()

@router.post("/")
def crear(data: schemas.MateriaCreate, db: Session = Depends(database.SessionLocal)):
    m = models.Materia(nombre=data.nombre)
    db.add(m)
    db.commit()
    return m

@router.put("/{id}")
def editar(id: int, data: schemas.MateriaCreate, db: Session = Depends(database.SessionLocal)):
    m = db.query(models.Materia).get(id)
    m.nombre = data.nombre
    db.commit()
    return m

@router.delete("/{id}")
def eliminar(id: int, db: Session = Depends(database.SessionLocal)):
    m = db.query(models.Materia).get(id)
    m.deleted_at = datetime.utcnow()
    db.commit()
    return {"msg": "Eliminado lógico"}