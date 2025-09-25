from sqlmodel import SQLModel, create_engine, Session

DATABASE_URL = "sqlite:///./strikehub.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

def init_db() -> None:
    SQLModel.metadata.create_all(engine)

# FastAPI dependency
def get_session():
    with Session(engine) as session:
        yield session