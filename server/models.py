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

    games: List["Game"] = Relationship(back_populates="bowler")

class League(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    center: Optional[str] = None
    season: Optional[str] = None

    games: List["Game"] = Relationship(back_populates="league")

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

# Create/Read schemas (explicit for clarity)
class BowlerCreate(SQLModel):
    name: str
    email: Optional[str] = None
    hand: Optional[str] = None
    speed_mph: Optional[float] = None
    line: Optional[str] = None

class LeagueCreate(SQLModel):
    name: str
    center: Optional[str] = None
    season: Optional[str] = None

class GameCreate(GameBase):
    pass