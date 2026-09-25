import { useState } from "react";

import "./ShieldScore.css";

const questions = [
  {
    id: 1,
    category: "Phishing Awareness",
    question:
      "You receive an email saying your bank account will be blocked today unless you verify your account using a link. What should you do?",
    options: [
      "Click the link and complete the verification",
      "Share the OTP if the page asks for it",
      "Open the official bank app or website and verify there",
      "Forward the email to your friends",
    ],
    answer: 2,
  },
  {
    id: 2,
    category: "Scam Recognition",
    question:
      "Someone contacts you claiming you have won a large prize, but you must pay a small processing fee first. What is the safest response?",
    options: [
      "Pay the fee immediately",
      "Share your bank details",
      "Ignore and verify the offer through an official source",
      "Ask them for their UPI PIN",
    ],
    answer: 2,
  },
  {
    id: 3,
    category: "Payment Safety",
    question:
      "A person says they accidentally sent money to your UPI account and asks you to scan a QR code to return it. What should you do?",
    options: [
      "Scan the QR code immediately",
      "Enter your UPI PIN to receive the refund",
      "Verify the transaction in your bank or UPI app before taking action",
      "Send them your OTP",
    ],
    answer: 2,
  },
  {
    id: 4,
    category: "Account Security",
    question: "Which password is generally the strongest choice?",
    options: [
      "password123",
      "Your name and birth year",
      "A long unique password or passphrase",
      "The same password you use everywhere",
    ],
    answer: 2,
  },
  {
    id: 5,
    category: "Phishing Awareness",
    question:
      "A website looks exactly like a popular service, but its URL contains unusual spelling and extra characters. What could this indicate?",
    options: [
      "A faster version of the website",
      "A possible fake or phishing website",
      "A verified security feature",
      "A normal browser setting",
    ],
    answer: 1,
  },
  {
    id: 6,
    category: "Scam Recognition",
    question:
      "You receive a job offer promising very high income with no interview or skills required. They ask for a registration fee. What is the biggest warning sign?",
    options: [
      "The job has a description",
      "The company has a website",
      "The combination of unrealistic income and upfront payment",
      "They contacted you online",
    ],
    answer: 2,
  },
  {
    id: 7,
    category: "Payment Safety",
    question:
      "Which information should you NEVER share with another person?",
    options: [
      "Your public social media username",
      "Your UPI PIN or banking OTP",
      "A company's public email address",
      "A publicly available website URL",
    ],
    answer: 1,
  },
  {
    id: 8,
    category: "Account Security",
    question:
      "What is the main purpose of two-factor authentication (2FA)?",
    options: [
      "To make your internet faster",
      "To provide an additional layer of account security",
      "To remove the need for passwords everywhere",
      "To automatically block every scam",
    ],
    answer: 1,
  },
  {
    id: 9,
    category: "Scam Recognition",
    question:
      "A caller claims to be from customer support and asks you to install a remote-access application to fix your account. What should you do?",
    options: [
      "Install it immediately",
      "Give them remote access",
      "End the call and contact the company through its official support channel",
      "Share your screen first",
    ],
    answer: 2,
  },
  {
    id: 10,
    category: "Payment Safety",
    question:
      "You are asked to approve a UPI payment request that you did not create. What should you do?",
    options: [
      "Approve it to check where it goes",
      "Decline the request",
      "Enter your UPI PIN",
      "Share the request with someone else",
    ],
    answer: 1,
  },
  {
    id: 11,
    category: "Account Security",
    question:
      "What is a good security practice when using a public computer?",
    options: [
      "Save your password in the browser",
      "Stay permanently logged in",
      "Avoid sensitive activities and log out completely",
      "Disable all security settings",
    ],
    answer: 2,
  },
  {
    id: 12,
    category: "Phishing Awareness",
    question:
      "A message says your account will be permanently deleted within 10 minutes unless you click a link. What is this urgency most likely trying to do?",
    options: [
      "Help you secure your account",
      "Create pressure so you act without verifying",
      "Improve account performance",
      "Confirm your identity safely",
    ],
    answer: 1,
  },
];

const categories = [
  "Phishing Awareness",
  "Scam Recognition",
  "Payment Safety",
  "Account Security",
];

function ShieldScore() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);

  // Backend submission states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Backend result
  const [backendResult, setBackendResult] = useState(null);

  const question = questions[currentQuestion];

  const handleStart = () => {
    setStarted(true);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setFinished(false);
    setIsSubmitting(false);
    setSubmitError("");
    setBackendResult(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleAnswer = (index) => {
    if (isSubmitting) return;

    setSelectedAnswer(index);
    setSubmitError("");
  };

  const submitAssessment = async (finalAnswers) => {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Get anonymous participant ID
      const participantId = localStorage.getItem(
        "cybersathi_participant_id"
      );

      if (!participantId) {
        throw new Error(
          "Anonymous participant setup is not ready. Please refresh the page and try again."
        );
      }

      const response = await fetch(
        "https://cybersathi-backend-fresh.vercel.app/api/shieldscore/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            answers: finalAnswers,
            participant_id: participantId,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.detail ||
            "Unable to submit ShieldScore assessment."
        );
      }

      setBackendResult(data);
      setFinished(true);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error(
        "ShieldScore submission error:",
        error
      );

      setSubmitError(
        error.message ||
          "Unable to connect to the ShieldScore server. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = async () => {
    if (
      selectedAnswer === null ||
      isSubmitting
    ) {
      return;
    }

    const updatedAnswers = [...answers];

    updatedAnswers[currentQuestion] = selectedAnswer;

    setAnswers(updatedAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);

      setSelectedAnswer(null);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      // Final question:
      // Send the complete answer array to FastAPI.
      await submitAssessment(updatedAnswers);
    }
  };

  const calculateScore = () => {
    // Prefer backend score after successful submission.
    if (backendResult) {
      return backendResult.score;
    }

    return answers.reduce(
      (score, answer, index) => {
        if (
          answer === questions[index].answer
        ) {
          return score + 1;
        }

        return score;
      },
      0
    );
  };

  const getPercentage = () => {
    // Prefer backend percentage after successful submission.
    if (backendResult) {
      return Math.round(
        backendResult.percentage
      );
    }

    return Math.round(
      (calculateScore() / questions.length) *
        100
    );
  };

  const getCategoryScore = (category) => {
    // Prefer backend category scores after successful submission.
    if (
      backendResult?.category_scores?.[
        category
      ] !== undefined
    ) {
      return Math.round(
        backendResult.category_scores[category]
      );
    }

    const categoryQuestions =
      questions.filter(
        (item) =>
          item.category === category
      );

    let correct = 0;

    categoryQuestions.forEach((item) => {
      const questionIndex =
        questions.findIndex(
          (questionItem) =>
            questionItem.id === item.id
        );

      if (
        answers[questionIndex] ===
        item.answer
      ) {
        correct++;
      }
    });

    return Math.round(
      (correct / categoryQuestions.length) *
        100
    );
  };

  const getScoreLabel = () => {
    const percentage = getPercentage();

    if (percentage >= 85) {
      return "EXCELLENT AWARENESS";
    }

    if (percentage >= 70) {
      return "GOOD AWARENESS";
    }

    if (percentage >= 50) {
      return "NEEDS IMPROVEMENT";
    }

    return "HIGHER AWARENESS NEEDED";
  };

  const getWeakAreas = () => {
    return categories.filter(
      (category) =>
        getCategoryScore(category) < 70
    );
  };

  const getRecommendedTopics = () => {
    const weakAreas = getWeakAreas();

    const recommendations = [];

    if (
      weakAreas.includes(
        "Phishing Awareness"
      )
    ) {
      recommendations.push("Phishing");
      recommendations.push(
        "Malicious Links"
      );
      recommendations.push(
        "Fake Websites"
      );
    }

    if (
      weakAreas.includes(
        "Scam Recognition"
      )
    ) {
      recommendations.push(
        "Social Engineering"
      );
      recommendations.push(
        "Fake Job Scams"
      );
      recommendations.push(
        "Investment Scams"
      );
    }

    if (
      weakAreas.includes(
        "Payment Safety"
      )
    ) {
      recommendations.push(
        "UPI & Payment Fraud"
      );
      recommendations.push(
        "QR Code Scams"
      );
      recommendations.push(
        "OTP & Banking Scams"
      );
    }

    if (
      weakAreas.includes(
        "Account Security"
      )
    ) {
      recommendations.push(
        "Social Media Safety"
      );
    }

    return [
      ...new Set(recommendations),
    ].slice(0, 4);
  };

  const restartAssessment = () => {
    setStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setFinished(false);
    setIsSubmitting(false);
    setSubmitError("");
    setBackendResult(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="shield-score-page">

      {/* NAVBAR */}
      <nav className="ss-navbar">
        <div className="ss-navbar-inner">
          <a href="/" className="ss-brand">
            CyberSathi
          </a>

          <div className="ss-nav-links">
            <a href="/">Home</a>

            <a href="/threatcheck">
              ThreatCheck
            </a>

            <a href="/scamsense">
              ScamSense
            </a>

            <a href="/cyberguide">
              CyberGuide
            </a>

            <a
              href="/shieldscore"
              className="ss-active"
            >
              ShieldScore
            </a>

            <a
              href="/"
              className="ss-get-started"
            >
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* START SCREEN */}
      {!started && !finished && (
        <main className="ss-start-screen">
          <div className="ss-start-content">

            <span className="ss-badge">
              Cybersecurity Awareness Assessment
            </span>

            <h1>
              How Cyber-Safe Are You?
            </h1>

            <p className="ss-start-description">
              Test your ability to recognize
              common cyber threats, scams,
              phishing attempts, and unsafe
              digital behavior.
            </p>

            <div className="ss-start-info">

              <div className="ss-info-item">
                <strong>12</strong>
                <span>Questions</span>
              </div>

              <div className="ss-info-divider"></div>

              <div className="ss-info-item">
                <strong>4</strong>
                <span>Categories</span>
              </div>

              <div className="ss-info-divider"></div>

              <div className="ss-info-item">
                <strong>5–7</strong>
                <span>Minutes</span>
              </div>

            </div>

            <button
              className="ss-primary-btn"
              onClick={handleStart}
            >
              Start Assessment
            </button>

            <p className="ss-start-note">
              No personal information required
            </p>

          </div>
        </main>
      )}

      {/* QUESTION SCREEN */}
      {started && !finished && (
        <main className="ss-assessment-screen">

          <div className="ss-assessment-container">

            <div className="ss-assessment-top">

              <div>
                <span className="ss-assessment-label">
                  ShieldScore Assessment
                </span>

                <h1>
                  Question{" "}
                  {currentQuestion + 1}{" "}
                  <span>
                    of {questions.length}
                  </span>
                </h1>
              </div>

              <div className="ss-question-category">
                {question.category}
              </div>

            </div>

            <div className="ss-progress-area">

              <div className="ss-progress-track">

                <div
                  className="ss-progress-fill"
                  style={{
                    width: `${
                      ((currentQuestion + 1) /
                        questions.length) *
                      100
                    }%`,
                  }}
                ></div>

              </div>

              <span>
                {Math.round(
                  ((currentQuestion + 1) /
                    questions.length) *
                    100
                )}
                %
              </span>

            </div>

            <section className="ss-question-card">

              <div className="ss-question-number">
                0{currentQuestion + 1}
              </div>

              <h2>
                {question.question}
              </h2>

              <div className="ss-options">

                {question.options.map(
                  (option, index) => (

                    <button
                      key={index}
                      className={`ss-option ${
                        selectedAnswer === index
                          ? "ss-option-selected"
                          : ""
                      }`}
                      onClick={() =>
                        handleAnswer(index)
                      }
                      disabled={
                        isSubmitting
                      }
                    >

                      <span className="ss-option-letter">
                        {String.fromCharCode(
                          65 + index
                        )}
                      </span>

                      <span className="ss-option-text">
                        {option}
                      </span>

                      <span className="ss-option-radio"></span>

                    </button>

                  )
                )}

              </div>

              {/* Backend submission error */}
              {submitError && (
                <div className="threat-error">
                  {submitError}
                </div>
              )}

              <div className="ss-question-footer">

                <span>
                  {isSubmitting
                    ? "Saving your assessment..."
                    : selectedAnswer === null
                    ? "Select one answer to continue"
                    : "Answer selected"}
                </span>

                <button
                  className="ss-next-btn"
                  onClick={handleNext}
                  disabled={
                    selectedAnswer === null ||
                    isSubmitting
                  }
                >
                  {isSubmitting
                    ? "Submitting..."
                    : currentQuestion ===
                      questions.length - 1
                    ? "Finish Assessment"
                    : "Next Question"}
                </button>

              </div>

            </section>

          </div>

        </main>
      )}

      {/* RESULT SCREEN */}
      {finished && (
        <main className="ss-result-screen">

          <div className="ss-result-container">

            <div className="ss-result-header">

              <span className="ss-badge">
                Assessment Complete
              </span>

              <h1>
                Your ShieldScore
              </h1>

              <p>
                Here is a breakdown of your
                cybersecurity awareness based
                on this assessment.
              </p>

            </div>

            <section className="ss-score-card">

              <div className="ss-score-circle">

                <div>
                  <strong>
                    {getPercentage()}
                  </strong>

                  <span>/ 100</span>
                </div>

              </div>

              <div className="ss-score-content">

                <span className="ss-score-label">
                  {getScoreLabel()}
                </span>

                <h2>
                  {calculateScore()} out of{" "}
                  {questions.length} answers
                  correct
                </h2>

                <p>
                  Your score reflects how well
                  you recognized common
                  cybersecurity risks in this
                  assessment.
                </p>

              </div>

            </section>

            {/* CATEGORY BREAKDOWN */}
            <section className="ss-section">

              <div className="ss-section-heading">

                <span>01</span>

                <div>
                  <h2>
                    Category Breakdown
                  </h2>

                  <p>
                    See how you performed across
                    different security areas.
                  </p>
                </div>

              </div>

              <div className="ss-category-grid">

                {categories.map(
                  (category) => {

                    const score =
                      getCategoryScore(
                        category
                      );

                    return (
                      <div
                        className="ss-category-card"
                        key={category}
                      >

                        <div className="ss-category-top">

                          <h3>
                            {category}
                          </h3>

                          <strong>
                            {score}%
                          </strong>

                        </div>

                        <div className="ss-category-track">

                          <div
                            className="ss-category-fill"
                            style={{
                              width: `${score}%`,
                            }}
                          ></div>

                        </div>

                        <span>
                          {score >= 85
                            ? "Strong"
                            : score >= 70
                            ? "Good"
                            : "Needs attention"}
                        </span>

                      </div>
                    );
                  }
                )}

              </div>

            </section>

            {/* WEAK AREAS */}
            <section className="ss-section">

              <div className="ss-section-heading">

                <span>02</span>

                <div>

                  <h2>
                    Areas to Improve
                  </h2>

                  <p>
                    Focus on these areas to
                    strengthen your
                    cybersecurity awareness.
                  </p>

                </div>

              </div>

              {getWeakAreas().length > 0 ? (

                <div className="ss-weak-area">

                  {getWeakAreas().map(
                    (area) => (

                      <div
                        className="ss-weak-item"
                        key={area}
                      >

                        <div className="ss-weak-icon">
                          !
                        </div>

                        <div>

                          <h3>
                            {area}
                          </h3>

                          <p>
                            Your score in this
                            category is below
                            70%. Consider
                            learning more about
                            this area.
                          </p>

                        </div>

                      </div>

                    )
                  )}

                </div>

              ) : (

                <div className="ss-no-weak-area">

                  <div className="ss-success-icon">
                    ✓
                  </div>

                  <div>

                    <h3>
                      No major weak areas
                    </h3>

                    <p>
                      You demonstrated a strong
                      understanding across all
                      assessment categories.
                    </p>

                  </div>

                </div>

              )}

            </section>

            {/* RECOMMENDED LEARNING */}
            <section className="ss-section">

              <div className="ss-section-heading">

                <span>03</span>

                <div>

                  <h2>
                    Recommended Learning
                  </h2>

                  <p>
                    Continue learning to improve
                    your cybersecurity awareness.
                  </p>

                </div>

              </div>

              <div className="ss-recommendations">

                {getRecommendedTopics()
                  .length > 0 ? (

                  getRecommendedTopics().map(
                    (topic, index) => (

                      <a
                        href="/cyberguide"
                        className="ss-recommendation-card"
                        key={topic}
                      >

                        <span>
                          0{index + 1}
                        </span>

                        <div>

                          <h3>
                            {topic}
                          </h3>

                          <p>
                            Learn more in
                            CyberGuide
                          </p>

                        </div>

                        <strong>
                          →
                        </strong>

                      </a>

                    )
                  )

                ) : (

                  <a
                    href="/cyberguide"
                    className="ss-recommendation-card"
                  >

                    <span>
                      01
                    </span>

                    <div>

                      <h3>
                        Explore CyberGuide
                      </h3>

                      <p>
                        Keep building your
                        cybersecurity knowledge
                      </p>

                    </div>

                    <strong>
                      →
                    </strong>

                  </a>

                )}

              </div>

            </section>

            {/* RESULT ACTIONS */}
            <div className="ss-result-actions">

              <button
                className="ss-primary-btn"
                onClick={restartAssessment}
              >
                Take Assessment Again
              </button>

              <a
                href="/cyberguide"
                className="ss-secondary-btn"
              >
                Explore CyberGuide
              </a>

            </div>

          </div>

        </main>
      )}

      {/* FOOTER */}
      <footer className="ss-footer">

        <div className="ss-footer-inner">

          <div className="ss-footer-brand">

            <h3>
              CyberSathi
            </h3>

            <p>
              Your Digital Safety Companion
            </p>

          </div>

          <div className="ss-footer-column">

            <h4>
              Explore
            </h4>

            <a href="/">
              Home
            </a>

            <a href="/threatcheck">
              ThreatCheck
            </a>

            <a href="/scamsense">
              ScamSense
            </a>

            <a href="/cyberguide">
              CyberGuide
            </a>

            <a href="/shieldscore">
              ShieldScore
            </a>

          </div>

          <div className="ss-footer-column">

            <h4>
              Emergency Help
            </h4>

            <p>
              Cyber Crime Helpline
            </p>

            <strong>
              1930
            </strong>

            <a
              href="https://cybercrime.gov.in/"
              target="_blank"
              rel="noreferrer"
            >
              cybercrime.gov.in
            </a>

          </div>

        </div>

        <div className="ss-footer-bottom">
          © 2026 CyberSathi. Stay aware.
          Stay secure.
        </div>

      </footer>

    </div>
  );
}

export default ShieldScore;