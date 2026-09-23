from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.sql import func

from app.database import Base


class ThreatCheck(Base):
    __tablename__ = "threat_checks"

    id = Column(Integer, primary_key=True, index=True)

    participant_id = Column(
        String(100),
        ForeignKey("users.participant_id"),
        nullable=False,
        index=True
    )

    input_type = Column(String(50), nullable=False)

    content = Column(Text, nullable=False)

    risk_score = Column(Integer, nullable=False)

    risk_level = Column(String(20), nullable=False)

    threat_type = Column(String(100), nullable=False)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False
    )