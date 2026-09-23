from sqlalchemy import Column, Integer, Boolean, String, ForeignKey

from app.database import Base


class QuizAnswer(Base):
    __tablename__ = "quiz_answers"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    attempt_id = Column(
        Integer,
        ForeignKey("quiz_attempts.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )

    question_id = Column(
        Integer,
        nullable=False,
        index=True
    )

    selected_answer = Column(
        Integer,
        nullable=False
    )

    correct_answer = Column(
        Integer,
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