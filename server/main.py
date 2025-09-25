from contextlib import asynccontextmanager
import os

from fastapi import FastAPI, Depends, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session

from .database import init_db, get_session
from .models import Bowler, BowlerCreate, League, LeagueCreate, Game, GameCreate
from .auth import verify_supabase_jwt, set_supabase_url
from . import crud

# Configure Supabase URL (set SUPABASE_URL in your env for other environments)
set_supabase_url(os.getenv("SUPABASE_URL", "https://dmvllbepyhxzyqpdziok.supabase.co"))

# --- Auth dependency ---
def get_current_user(authorization: str | None = Header(None)):
    if not authorization or not authorization.lower().startswith("bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid bearer token")
    token = authorization.split(" ", 1)[1]
    try:
        return verify_supabase_jwt(token)  # returns JWT payload
    except Exception as e:
        # fix f-string so the error shows
        raise HTTPException(status_code=401, detail=f"Invalid token: {e}")

# ---- Lifespan (startup/shutdown) ----
@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    try:
        from .seed import run as seed_run
        seed_run()
    except Exception:
        pass
    yield

app = FastAPI(title="Strikehub API", lifespan=lifespan)

# CORS for Vite dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"name": "Strikehub API", "docs": "/docs", "health": "/health"}

@app.get("/health")
def health():
    return {"ok": True}

# --- Bowlers ---
@app.get("/bowlers", response_model=list[Bowler])
def get_bowlers(session: Session = Depends(get_session)):
    return crud.list_bowlers(session)

@app.post("/bowlers", response_model=Bowler)
def add_bowler(
    payload: BowlerCreate,
    user=Depends(get_current_user),                 # 🔒 require auth
    session: Session = Depends(get_session),
):
    # You can map user["sub"] (Supabase UUID) to a Bowler row here later
    return crud.create_bowler(session, payload)

# --- Leagues ---
@app.get("/leagues", response_model=list[League])
def get_leagues(session: Session = Depends(get_session)):
    return crud.list_leagues(session)

@app.post("/leagues", response_model=League)
def add_league(
    payload: LeagueCreate,
    user=Depends(get_current_user),                 # 🔒 require auth (commissioners later)
    session: Session = Depends(get_session),
):
    return crud.create_league(session, payload)

# --- Games ---
@app.get("/games", response_model=list[Game])
def get_games(
    bowler_id: int | None = None,
    league_id: int | None = None,
    user=Depends(get_current_user),                 # 🔒 require auth to view scores
    session: Session = Depends(get_session),
):
    if bowler_id is None:
        me = crud.get_bowler_by_user_id(session, user["sub"])
        bowler_id = me.id if me else None
    return crud.list_games(session, bowler_id=bowler_id, league_id=league_id)

@app.post("/games", response_model=Game)
def add_game(
    payload: GameCreate,
    user=Depends(get_current_user),                 # 🔒 require auth to post a score
    session: Session = Depends(get_session),
):
    me = crud.get_bowler_by_user_id(session, user["sub"], user.get("email", "Bowler"))
    payload.bowler_id = me.id                       # Enforce Ownership
    return crud.create_game(session, payload)

# --- Stats ---
@app.get("/stats/bowler/{bowler_id}")
def get_bowler_stats(bowler_id: int, session: Session = Depends(get_session)):
    return crud.bowler_stats(session, bowler_id)

@app.get("/rankings/top-averages")
def rankings_top(limit: int = 10, session: Session = Depends(get_session)):
    return crud.top_averages(session, limit)

@app.get("/me")
def me(user=Depends(get_current_user), session: Session = Depends(get_session)):
    supa_id = user["sub"]
    meta = user.get("user_metadata") or {}
    display_name = meta.get("name") or (user.get("email") or "Bowler").split("@")[0]
    bowler = crud.ensure_bowler_for_user(session, supa_id, display_name)
    return {
        "user": {
            "id": supa_id,
            "email": user-get("email"),
            "name": display_name,
            "role": meta.get("role", "bowler"),
        },
        "bowler": bowler,
    }