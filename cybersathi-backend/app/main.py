from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session
from sqlalchemy import func

import re
import uuid

from app.database import engine, Base, get_db
from app.models.threat_check import ThreatCheck
from app.models.scenario_attempt import ScenarioAttempt
from app.models.quiz_attempt import QuizAttempt
from app.models.quiz_answer import QuizAnswer
from app.models import User


app = FastAPI(
    title="CyberSathi API",
    description="Backend API for CyberSathi",
    version="1.0.0"
)


# ---------------------------------------------------------
# CORS
# ---------------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
         "https://cybersathi-pme1.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------------------------------------------------
# DATABASE
# ---------------------------------------------------------

# Base.metadata.create_all(bind=engine)


# ---------------------------------------------------------
# REQUEST MODELS
# ---------------------------------------------------------

class ThreatCheckRequest(BaseModel):
    input_type: str
    content: str
    participant_id: str


class ScamSenseAttemptRequest(BaseModel):
    scenario_id: int
    answer: str
    participant_id: str


class ShieldScoreSubmitRequest(BaseModel):
    answers: list[int]
    participant_id: str


# ---------------------------------------------------------
# SCAMSENSE SCENARIO DATA
# ---------------------------------------------------------

SCAMSENSE_SCENARIOS = {

    1: {
        "category": "UPI & Payment",
        "difficulty": "Beginner",
        "correct_answer": "Scam",
    },

    2: {
        "category": "Bank / KYC",
        "difficulty": "Beginner",
        "correct_answer": "Scam",
    },

    3: {
        "category": "Fake Jobs",
        "difficulty": "Beginner",
        "correct_answer": "Scam",
    },

    4: {
        "category": "Delivery",
        "difficulty": "Intermediate",
        "correct_answer": "Suspicious",
    },

    5: {
        "category": "Investment",
        "difficulty": "Advanced",
        "correct_answer": "Scam",
    },

    6: {
        "category": "Prize & Rewards",
        "difficulty": "Beginner",
        "correct_answer": "Scam",
    },

    7: {
        "category": "Social Media",
        "difficulty": "Intermediate",
        "correct_answer": "Suspicious",
    },

    8: {
        "category": "QR Scams",
        "difficulty": "Intermediate",
        "correct_answer": "Scam",
    },

    9: {
        "category": "Social Engineering",
        "difficulty": "Advanced",
        "correct_answer": "Scam",
    },

    10: {
        "category": "Bank / KYC",
        "difficulty": "Advanced",
        "correct_answer": "Suspicious",
    },

}


# ---------------------------------------------------------
# SECURITY
# ---------------------------------------------------------

def redact_sensitive_content(content: str) -> str:
    """
    Removes common sensitive information before storing
    the message in the database.
    """

    text = content

    # Redact numeric OTP/PIN/CVV-like values
    text = re.sub(
        r"\b\d{4,8}\b",
        "[REDACTED_NUMBER]",
        text
    )

    # Redact sensitive keywords
    sensitive_patterns = [
        r"\botp\b",
        r"\bpassword\b",
        r"\bpin\b",
        r"\bcvv\b",
        r"\bcard number\b",
        r"\bbank account number\b",
        r"\bbank details\b"
    ]

    for pattern in sensitive_patterns:

        text = re.sub(
            pattern,
            "[REDACTED_SENSITIVE_INFO]",
            text,
            flags=re.IGNORECASE
        )

    return text


# ---------------------------------------------------------
# ROOT
# ---------------------------------------------------------

@app.get("/")
def root():

    return {
        "message": "CyberSathi API is running"
    }


# ---------------------------------------------------------
# HEALTH CHECK
# ---------------------------------------------------------

@app.get("/api/health")
def health_check():

    return {
        "status": "healthy"
    }


# ---------------------------------------------------------
# ANONYMOUS PARTICIPANT
# ---------------------------------------------------------

@app.get("/api/participant")
def create_participant(
    db: Session = Depends(get_db)
):

    participant_id = str(uuid.uuid4())

    participant = User(
        participant_id=participant_id
    )

    db.add(participant)

    try:

        db.commit()
        db.refresh(participant)

    except Exception:

        db.rollback()

        raise HTTPException(
            status_code=500,
            detail="Unable to create anonymous participant."
        )

    return {
        "participant_id": participant.participant_id
    }


# ---------------------------------------------------------
# THREATCHECK
# ---------------------------------------------------------

@app.post("/api/threatcheck")
def threat_check(
    request: ThreatCheckRequest,
    db: Session = Depends(get_db)
):

    # Validate anonymous participant
    participant = db.query(User).filter(
        User.participant_id == request.participant_id
    ).first()

    if not participant:

        raise HTTPException(
            status_code=400,
            detail="Invalid participant ID."
        )

    content = request.content.lower()

    risk_score = 0

    red_flags = []

    # High-risk indicators
    high_risk_patterns = {

        "otp": "Request for OTP detected.",

        "password": "Request for password detected.",

        "pin": "Request for PIN detected.",

        "cvv": "Request for card security information detected.",

        "bank details": "Request for banking information detected.",

    }

    # Urgency indicators
    urgency_patterns = [

        "urgent",

        "immediately",

        "act now",

        "account blocked",

        "account will be blocked",

        "account suspended",

        "verify now"

    ]

    # Payment indicators
    payment_patterns = [

        "pay now",

        "send money",

        "payment",

        "upi",

        "transfer money",

        "refund"

    ]

    # Reward/scam indicators
    reward_patterns = [

        "winner",

        "prize",

        "reward",

        "lottery",

        "cashback",

        "you have won"

    ]

    # Suspicious link indicators
    suspicious_link_patterns = [

        "http://",

        "bit.ly",

        "tinyurl",

        "shorturl"

    ]

    # Check high-risk credentials
    for word, message in high_risk_patterns.items():

        if word in content:

            risk_score += 35

            red_flags.append(message)

    # Check urgency
    for word in urgency_patterns:

        if word in content:

            risk_score += 20

            red_flags.append(
                "Urgent or threatening language detected."
            )

            break

    # Check payment
    for word in payment_patterns:

        if word in content:

            risk_score += 20

            red_flags.append(
                "Payment or financial action requested."
            )

            break

    # Check reward
    for word in reward_patterns:

        if word in content:

            risk_score += 20

            red_flags.append(
                "Prize, reward or lottery claim detected."
            )

            break

    # Check suspicious links
    for word in suspicious_link_patterns:

        if word in content:

            risk_score += 20

            red_flags.append(
                "Suspicious or shortened link detected."
            )

            break

    # Prevent score above 100
    risk_score = min(
        risk_score,
        100
    )

    # Risk level
    if risk_score >= 70:

        risk_level = "High"

    elif risk_score >= 35:

        risk_level = "Medium"

    else:

        risk_level = "Low"

    # Threat type
    if any(
        word in content
        for word in [
            "otp",
            "password",
            "pin",
            "cvv",
            "bank details"
        ]
    ):

        threat_type = "Credential Theft"

    elif any(
        word in content
        for word in [
            "upi",
            "payment",
            "send money",
            "transfer money"
        ]
    ):

        threat_type = "Payment Fraud"

    elif any(
        word in content
        for word in [
            "prize",
            "reward",
            "lottery",
            "winner",
            "cashback"
        ]
    ):

        threat_type = "Prize / Reward Scam"

    elif any(
        word in content
        for word in [
            "http://",
            "bit.ly",
            "tinyurl",
            "shorturl"
        ]
    ):

        threat_type = "Suspicious Link"

    else:

        threat_type = "Potential Scam"

    # Recommended action
    if risk_level == "High":

        recommended_action = (
            "Do not click links, make payments, or share OTP, password, PIN, "
            "CVV, or banking information. Verify the request through an official source."
        )

    elif risk_level == "Medium":

        recommended_action = (
            "Be cautious. Verify the sender and request through an official source "
            "before taking any action."
        )

    else:

        recommended_action = (
            "No strong threat indicators were detected. Still remain cautious "
            "with unknown messages, links, and requests."
        )

    # Secure version for database storage
    safe_content = redact_sensitive_content(
        request.content
    )

    # Save threat check in PostgreSQL
    threat_record = ThreatCheck(

        participant_id=request.participant_id,

        input_type=request.input_type,

        content=safe_content,

        risk_score=risk_score,

        risk_level=risk_level,

        threat_type=threat_type

    )

    db.add(threat_record)

    try:

        db.commit()
        db.refresh(threat_record)

    except Exception:

        db.rollback()

        raise HTTPException(
            status_code=500,
            detail="Unable to save threat check."
        )

    return {

        "risk_score": risk_score,

        "risk_level": risk_level,

        "threat_type": threat_type,

        "red_flags": list(
            dict.fromkeys(red_flags)
        ),

        "recommended_action": recommended_action

    }


# ---------------------------------------------------------
# SCAMSENSE ATTEMPT
# ---------------------------------------------------------

@app.post("/api/scamsense/attempt")
def scamsense_attempt(
    request: ScamSenseAttemptRequest,
    db: Session = Depends(get_db)
):

    # Validate anonymous participant
    participant = db.query(User).filter(
        User.participant_id == request.participant_id
    ).first()

    if not participant:

        raise HTTPException(
            status_code=400,
            detail="Invalid participant ID."
        )

    # Find scenario
    scenario = SCAMSENSE_SCENARIOS.get(
        request.scenario_id
    )

    if scenario is None:

        raise HTTPException(
            status_code=404,
            detail="Scenario not found."
        )

    # Validate answer
    allowed_answers = {
        "Safe",
        "Suspicious",
        "Scam"
    }

    if request.answer not in allowed_answers:

        raise HTTPException(
            status_code=400,
            detail="Invalid answer. Use Safe, Suspicious, or Scam."
        )

    # Determine correctness
    correct_answer = scenario["correct_answer"]

    is_correct = (
        request.answer == correct_answer
    )

    # Create database record
    attempt = ScenarioAttempt(

        participant_id=request.participant_id,

        scenario_id=request.scenario_id,

        answer=request.answer,

        is_correct=is_correct,

        category=scenario["category"],

        difficulty=scenario["difficulty"]

    )

    db.add(attempt)

    # Save safely
    try:

        db.commit()
        db.refresh(attempt)

    except Exception:

        db.rollback()

        raise HTTPException(
            status_code=500,
            detail="Unable to save ScamSense attempt."
        )

    # Return result to React
    return {

        "success": True,

        "attempt_id": attempt.id,

        "scenario_id": request.scenario_id,

        "is_correct": is_correct,

        "correct_answer": correct_answer,

        "category": scenario["category"],

        "difficulty": scenario["difficulty"]

    }


# ---------------------------------------------------------
# SHIELDSCORE ASSESSMENT
# ---------------------------------------------------------

@app.post("/api/shieldscore/submit")
def submit_shieldscore(
    request: ShieldScoreSubmitRequest,
    db: Session = Depends(get_db)
):

    # Validate anonymous participant
    participant = db.query(User).filter(
        User.participant_id == request.participant_id
    ).first()

    if not participant:

        raise HTTPException(
            status_code=400,
            detail="Invalid participant ID."
        )

    # ShieldScore question data
    questions = [

        {
            "id": 1,
            "category": "Phishing Awareness",
            "answer": 2,
        },

        {
            "id": 2,
            "category": "Scam Recognition",
            "answer": 2,
        },

        {
            "id": 3,
            "category": "Payment Safety",
            "answer": 2,
        },

        {
            "id": 4,
            "category": "Account Security",
            "answer": 2,
        },

        {
            "id": 5,
            "category": "Phishing Awareness",
            "answer": 1,
        },

        {
            "id": 6,
            "category": "Scam Recognition",
            "answer": 2,
        },

        {
            "id": 7,
            "category": "Payment Safety",
            "answer": 1,
        },

        {
            "id": 8,
            "category": "Account Security",
            "answer": 1,
        },

        {
            "id": 9,
            "category": "Scam Recognition",
            "answer": 2,
        },

        {
            "id": 10,
            "category": "Payment Safety",
            "answer": 1,
        },

        {
            "id": 11,
            "category": "Account Security",
            "answer": 2,
        },

        {
            "id": 12,
            "category": "Phishing Awareness",
            "answer": 1,
        },

    ]

    # -----------------------------------------------------
    # VALIDATE ANSWERS
    # -----------------------------------------------------

    if len(request.answers) != len(questions):

        raise HTTPException(
            status_code=400,
            detail=f"Exactly {len(questions)} answers are required."
        )

    # Make sure answer indexes are valid
    for answer in request.answers:

        if answer not in [0, 1, 2, 3]:

            raise HTTPException(
                status_code=400,
                detail="Each answer must be between 0 and 3."
            )

    # -----------------------------------------------------
    # CALCULATE SCORE
    # -----------------------------------------------------

    correct_count = 0

    category_totals = {}

    category_correct = {}

    for index, question in enumerate(questions):

        category = question["category"]

        selected_answer = request.answers[index]

        correct_answer = question["answer"]

        # Category total
        category_totals[category] = (
            category_totals.get(category, 0) + 1
        )

        # Category correct counter
        category_correct.setdefault(
            category,
            0
        )

        # Check answer
        is_correct = (
            selected_answer == correct_answer
        )

        if is_correct:

            correct_count += 1

            category_correct[category] += 1

    total_questions = len(questions)

    percentage = round(
        (correct_count / total_questions) * 100,
        2
    )

    # -----------------------------------------------------
    # CATEGORY SCORES
    # -----------------------------------------------------

    category_scores = {}

    for category, total in category_totals.items():

        correct = category_correct.get(
            category,
            0
        )

        category_scores[category] = round(
            (correct / total) * 100,
            2
        )

    # -----------------------------------------------------
    # SAVE ASSESSMENT
    # -----------------------------------------------------

    attempt = QuizAttempt(

        participant_id=request.participant_id,

        score=correct_count,

        total_questions=total_questions,

        percentage=percentage

    )

    db.add(attempt)

    try:

        # Generate attempt ID before saving answers
        db.flush()

        # -------------------------------------------------
        # SAVE INDIVIDUAL ANSWERS
        # -------------------------------------------------

        for index, question in enumerate(questions):

            selected_answer = request.answers[index]

            correct_answer = question["answer"]

            answer_record = QuizAnswer(

                attempt_id=attempt.id,

                question_id=question["id"],

                selected_answer=selected_answer,

                correct_answer=correct_answer,

                is_correct=(
                    selected_answer == correct_answer
                ),

                category=question["category"]

            )

            db.add(answer_record)

        # Commit assessment + all answers together
        db.commit()

        db.refresh(attempt)

    except Exception:

        # Rollback everything if any database operation fails
        db.rollback()

        raise HTTPException(
            status_code=500,
            detail="Unable to save ShieldScore assessment."
        )

    # -----------------------------------------------------
    # RETURN RESULT TO REACT
    # -----------------------------------------------------

    return {

        "success": True,

        "attempt_id": attempt.id,

        "score": correct_count,

        "total_questions": total_questions,

        "percentage": percentage,

        "category_scores": category_scores

    }


# ---------------------------------------------------------
# HOME STATISTICS
# ---------------------------------------------------------

@app.get("/api/stats")
def get_stats(
    db: Session = Depends(get_db)
):

    # Total threats analyzed
    threats_analyzed = db.query(
        ThreatCheck
    ).count()

    # Total ScamSense attempts
    scenarios_attempted = db.query(
        ScenarioAttempt
    ).count()

    # Total ShieldScore assessments
    assessments_completed = db.query(
        QuizAttempt
    ).count()

    # Average ShieldScore awareness percentage
    average_score = db.query(
        func.avg(QuizAttempt.percentage)
    ).scalar()

    if average_score is None:

        average_score = 0

    # People reached
    # For now, count anonymous activity across the platform.
    # People reached
# Count unique anonymous participants.
    people_reached = db.query(User).count()

    return {

        "people_reached": people_reached,

        "scenarios_attempted": scenarios_attempted,

        "threats_analyzed": threats_analyzed,

        "assessments_completed": assessments_completed,

        "average_awareness_score": round(
            float(average_score),
            2
        )

    }