from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import models, schemas, database

router = APIRouter()

@router.post("/register")
def register(user: schemas.UsuarioCreate, db: Session = Depends(database.SessionLocal)):
    nuevo = models.Usuario(email=user.email, password=user.password)
    db.add(nuevo)
    db.commit()
    return {"msg": "Usuario creado"}

@router.post("/login")
def login(user: schemas.UsuarioCreate, db: Session = Depends(database.SessionLocal)):
    u = db.query(models.Usuario).filter_by(email=user.email, password=user.password).first()
    if not u:
        return {"error": "Credenciales incorrectas"}
    return {"id": u.id, "email": u.email}