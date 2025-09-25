from typing import List, Dict
from statistics import mean
from sqlmodel import Session, select
from .models import Bowler, BowlerCreate, League, LeagueCreate, Game, GameCreate

# ---- Bowlers ----
def create_bowler(session: Session, data: BowlerCreate) -> Bowler:
    bowler = Bowler.model_validate(data)
    session.add(bowler)
    session.commit()
    session.refresh(bowler)
    return bowler

def list_bowlers(session: Session) -> List[Bowler]:
    return session.exec(select(Bowler)).all()

# ---- Leagues ----
def create_league(session: Session, data: LeagueCreate) -> League:
    league = League.model_validate(data)
    session.add(league)
    session.commit()
    session.refresh(league)
    return league

def list_leagues(session: Session) -> List[League]:
    return session.exec(select(League)).all()

# ---- Games ----
def create_game(session: Session, data: GameCreate) -> Game:
    game = Game.model_validate(data)
    session.add(game)
    session.commit()
    session.refresh(game)
    return game

def list_games(session: Session, bowler_id: int | None = None, league_id: int | None = None) -> List[Game]:
    query = select(Game)
    if bowler_id is not None:
        query = query.where(Game.bowler_id == bowler_id)
    if league_id is not None:
        query = query.where(Game.league_id == league_id)
    query = query.order_by(Game.series_date, Game.game_no)
    return session.exec(query).all()

# ---- Statistics ----
def bowler_stats(session: Session, bowler_id: int) -> Dict:
    games = list_games(session, bowler_id=bowler_id)
    scores = [game.score for game in games]
    if not scores:
        return {"bowler_id": bowler_id, "average": 0, "high": 0, "games": 0}
    return {
        "bowler_id": bowler_id,
        "average": round(mean(scores)),
        "high": max(scores),
        "games": len(scores)
    }
    
def top_averages(session: Session, limit: int = 10):
    bowlers = list_bowlers(session)
    rows = []
    for bowler in bowlers:
        stats = bowler_stats(session, bowler.id)
        rows.append({"bowler_id": bowler.id, "name": bowler.name, **stats})
    rows.sort(key=lambda x: x["average"], reverse=True)
    return rows[:limit]


def get_bowler_by_user_id(session: Session, supabase_user_id: str) -> Bowler | None:
    return session.exec(
        select(Bowler).where(Bowler.supabase_user_id == supabase_user_id)
    ).first()

def ensure_bowler_for_user(session: Session, supabase_user_id: str, name: str) -> Bowler:
    b = get_bowler_by_user_id(session, supabase_user_id)
    if b:
        return b
    # Create a new Bowler owned by this Supabase user
    b = Bowler(name=name or "New Bowler", supabase_user_id=supabase_user_id)
    session.add(b)
    session.commit()
    session.refresh(b)
    return b

# if your existing create_game expects a GameCreate with bowler_id set, no change needed:
def create_game(session: Session, payload: GameCreate) -> Game:
    game = Game(**payload.dict(exclude_unset=True))
    session.add(game)
    session.commit()
    session.refresh(game)
    return game