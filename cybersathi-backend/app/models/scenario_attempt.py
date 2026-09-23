from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.sql import func

from app.database import Base


class ScenarioAttempt(Base):
    __tablename__ = "scenario_attempts"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    participant_id = Column(
        String(100),
        ForeignKey("users.participant_id"),
        nullable=False,
        index=True
    )

    scenario_id = Column(
        Integer,
        nullable=False,
        index=True
    )

    answer = Column(
        String(30),
        nullable=False
    )

    is_correct = Column(
        Boolean,
        nullable=False
    )

    category = Column(
        String(100),
        nullable=False,
        index=True
    )

    difficulty = Column(
        String(30),
        nullable=False,
        index=True
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
        index=True
    )