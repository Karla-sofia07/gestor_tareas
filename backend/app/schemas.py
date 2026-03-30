from pydantic import BaseModel

class UsuarioCreate(BaseModel):
    email: str
    password: str

class MateriaCreate(BaseModel):
    nombre: str

class TareaCreate(BaseModel):
    titulo: str
    prioridad: str
    materia_id: int