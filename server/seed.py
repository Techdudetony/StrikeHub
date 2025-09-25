from datetime import date
from sqlmodel import Session
from .database import engine
from .models import Bowler, League, Game

# Quick seed for local development
def run():
    with Session() as session:
        if not session.exec(Bowler.select()).first():
            me = Bowler(name="Antonio Lee", email="antonio@example.com", hand="Left", speed_mph=13.0, line="Center to 10-right")
            league = League(name="Tuesday Night Mixers", center="River City Lanes", season="2025 Fall")
            session.add(me)
            session.add(league)
            session.commit()
            session.refresh(me); session.refresh(league)
            
            session.add_all([
                Game(bowler_id=me.id, league_id=league.id, series_date=date(2024, 9, 3), game_no=1, score=200, notes="Good start"),
                Game(bowler_id=me.id, league_id=league.id, series_date=date(2024, 9, 3), game_no=2, score=180, notes="Fouled in 10th"),
                Game(bowler_id=me.id, league_id=league.id, series_date=date(2024, 9, 10), game_no=3, score=220, notes="Great spares"),
                Game(bowler_id=me.id, league_id=league.id, series_date=date(2024, 9, 10), game_no=4, score=190, notes="Tough lane"),
                Game(bowler_id=me.id, league_id=league.id, series_date=date(2024, 9, 17), game_no=5, score=210, notes="Consistent"),
                Game(bowler_id=me.id, league_id=league.id, series_date=date(2024, 9, 17), game_no=6, score=205, notes="Close game"),
                Game(bowler_id=me.id, league_id=league.id, series_date=date(2024, 9, 24), game_no=7, score=195, notes="Challenging conditions"),
                Game(bowler_id=me.id, league_id=league.id, series_date=date(2024, 9, 24), game_no=8, score=215, notes="Strong finish"),
            ])
            session.commit()
            
if __name__ == "__main__":
    run()