from typing import Optional, List
from datetime import date
from sqlmodel import SQLModel, Field, Relationship


class Bowler(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    email: Optional[str] = Field(default=None, index=True)
    hand: Optional[str] = Field(default=None, description="R or L")
    speed_mph: Optional[float] = None
    line: Optional[str] = None

    # NEW: link Supabase user -> Bowler (unique per user)
    supabase_user_id: Optional[str] = Field(
        default=None, index=True, unique=True
    )

    games: List["Game"] = Relationship(back_populates="bowler")


class League(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    center: Optional[str] = None
    season: Optional[str] = None

    games: List["Game"] = Relationship(back_populates="league")


# DB base for Game table (bowler_id is REQUIRED in the table)
class GameBase(SQLModel):
    bowler_id: int
    league_id: Optional[int] = None
    series_date: date
    game_no: int
    score: int
    notes: Optional[str] = None


class Game(GameBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

    bowler: Optional[Bowler] = Relationship(back_populates="games")
    league: Optional[League] = Relationship(back_populates="games")


# ---------- Create/Read Schemas ----------
class BowlerCreate(SQLModel):
    name: str
    email: Optional[str] = None
    hand: Optional[str] = None
    speed_mph: Optional[float] = None
    line: Optional[str] = None
    # Do NOT accept supabase_user_id from clients; server fills it.


class LeagueCreate(SQLModel):
    name: str
    center: Optional[str] = None
    season: Optional[str] = None


# Allow bowler_id to be omitted by clients; API will set it from token
class GameCreate(SQLModel):
    league_id: Optional[int] = None
    series_date: date
    game_no: int
    score: int
    notes: Optional[str] = None
    bowler_id: Optional[int] = None  # optional in payload; server enforces ownership
