from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware  # 1. Importar CORS
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import get_db
import models

app = FastAPI()

# 2. CONFIGURAR CORS (Abrir la puerta al Frontend)
origins = [
    "http://localhost:3000",  # La dirección de tu Next.js
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. MODELO PARA RECIBIR DATOS DEL LOGIN


class LoginRequest(BaseModel):
    username: str
    password: str


@app.get("/")
def read_root():
    return {"mensaje": "Backend listo "}


@app.get("/users")
def get_users(db: Session = Depends(get_db)):
    users = db.query(models.User).all()
    return users

# 4. EL ENDPOINT REAL DE LOGIN


@app.post("/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):
    # Buscar usuario en la BD
    user = db.query(models.User).filter(
        models.User.username == request.username).first()

    if not user:
        raise HTTPException(status_code=400, detail="Usuario no encontrado")

    # Verificar contraseña (en un caso real usaríamos hash, aquí es directo)
    if user.password != request.password:
        raise HTTPException(status_code=400, detail="Contraseña incorrecta")

    return {"mensaje": "Login exitoso", "usuario": user.username, "id": user.id}
