import { useState } from "react";
import "./ScamSense.css";

const scenarios = [
  {
    id: 1,
    category: "UPI & Payment",
    difficulty: "Beginner",
    channel: "WhatsApp",
    title: "Cashback Reward",
    message:
      "Congratulations! You have been selected for a ₹25,000 cashback reward. Claim your reward immediately by clicking the link below. Offer expires in 10 minutes.",
    correctAnswer: "Scam",
    explanation:
      "Unexpected cashback or reward messages that create urgency and ask you to click a link are common scam patterns.",
    redFlags: [
      "Unexpected reward claim",
      "Urgent deadline",
      "Suspicious link",
      "Pressure to act immediately",
    ],
    safeAction:
      "Do not click the link. Verify the offer through the company's official website or app.",
  },

  {
    id: 2,
    category: "Bank / KYC",
    difficulty: "Beginner",
    channel: "SMS",
    title: "KYC Update Required",
    message:
      "Your bank account KYC is incomplete. Your account will be blocked today. Update your KYC immediately using the link below.",
    correctAnswer: "Scam",
    explanation:
      "Scammers often use account-blocking threats and urgent KYC requests to make people click fake banking links.",
    redFlags: [
      "Account blocking threat",
      "Urgent language",
      "Unexpected KYC request",
      "Unknown link",
    ],
    safeAction:
      "Never use a link from an unexpected message for banking activity. Open your official banking app or website directly.",
  },

  {
    id: 3,
    category: "Fake Jobs",
    difficulty: "Beginner",
    channel: "WhatsApp",
    title: "Work From Home Opportunity",
    message:
      "Earn ₹8,000–₹15,000 every day by working only 1 hour from home. No experience required. Pay a refundable registration fee of ₹499 to activate your account.",
    correctAnswer: "Scam",
    explanation:
      "Requests for upfront payment in exchange for guaranteed or unusually high earnings are a major warning sign of fake job scams.",
    redFlags: [
      "Unrealistic income promise",
      "No experience required",
      "Upfront registration fee",
      "Guaranteed earnings",
    ],
    safeAction:
      "Do not pay money to secure a job. Verify the employer and vacancy through an official company website.",
  },

  {
    id: 4,
    category: "Delivery",
    difficulty: "Intermediate",
    channel: "SMS",
    title: "Package Delivery Issue",
    message:
      "Your parcel could not be delivered because your address is incomplete. Please pay ₹25 to reschedule delivery using the attached link.",
    correctAnswer: "Suspicious",
    explanation:
      "Small payment requests combined with delivery problems and links can be used to steal payment or personal information.",
    redFlags: [
      "Unexpected payment request",
      "Delivery problem",
      "External link",
      "Very small payment used as a lure",
    ],
    safeAction:
      "Check the delivery status directly through the official courier website or app instead of using the message link.",
  },

  {
    id: 5,
    category: "Investment",
    difficulty: "Advanced",
    channel: "Telegram",
    title: "Guaranteed Investment Returns",
    message:
      "Our private investment group guarantees 40% returns in 7 days. Your first investment is fully protected. Send ₹5,000 today to unlock your premium trading account.",
    correctAnswer: "Scam",
    explanation:
      "Guaranteed high returns with pressure to send money are strong indicators of an investment scam.",
    redFlags: [
      "Guaranteed returns",
      "Extremely high profit promise",
      "Pressure to invest immediately",
      "Upfront money transfer",
    ],
    safeAction:
      "Do not transfer money based on guaranteed-return claims. Research the investment and verify the platform independently.",
  },

  {
    id: 6,
    category: "Prize & Rewards",
    difficulty: "Beginner",
    channel: "Email",
    title: "You Won a Prize",
    message:
      "You have won ₹10,00,000 in our annual lucky draw. To receive your prize, submit your bank details and pay a processing charge of ₹2,500.",
    correctAnswer: "Scam",
    explanation:
      "You cannot normally win a legitimate lottery or prize that you never entered. Processing fees and requests for banking information are major warning signs.",
    redFlags: [
      "Prize you did not enter for",
      "Processing fee",
      "Bank information request",
      "Unexpected email",
    ],
    safeAction:
      "Do not pay the fee or share financial information. Delete the message and verify independently if necessary.",
  },

  {
    id: 7,
    category: "Social Media",
    difficulty: "Intermediate",
    channel: "Instagram",
    title: "Account Verification",
    message:
      "Your Instagram account has been selected for verification. Complete verification within 30 minutes or your account will be permanently disabled.",
    correctAnswer: "Suspicious",
    explanation:
      "Social platforms generally provide account notices through their official systems. Urgent verification requests through unexpected messages can lead to phishing pages.",
    redFlags: [
      "Account suspension threat",
      "Very short deadline",
      "Unexpected verification request",
      "Potential phishing link",
    ],
    safeAction:
      "Check your account notifications directly inside the official platform instead of using an external link.",
  },

  {
    id: 8,
    category: "QR Scams",
    difficulty: "Intermediate",
    channel: "WhatsApp",
    title: "Scan to Receive Money",
    message:
      "I am sending you ₹2,000. Please scan this QR code and enter your UPI PIN to receive the payment.",
    correctAnswer: "Scam",
    explanation:
      "A UPI PIN is used to authorize payments, not to receive money. Scammers can use QR codes to trick users into sending money.",
    redFlags: [
      "QR code payment request",
      "UPI PIN request",
      "False receiving-money explanation",
      "Unexpected transaction",
    ],
    safeAction:
      "Never enter your UPI PIN to receive money. Verify the transaction directly in your UPI app.",
  },

  {
    id: 9,
    category: "Social Engineering",
    difficulty: "Advanced",
    channel: "Phone",
    title: "Customer Support Request",
    message:
      "Hello, I am calling from customer support. We detected a problem with your recent payment. Please tell me the OTP you just received so I can cancel the transaction.",
    correctAnswer: "Scam",
    explanation:
      "Legitimate customer support should not require you to disclose an OTP. Scammers use authority and urgency to manipulate victims.",
    redFlags: [
      "Pretending to be customer support",
      "OTP request",
      "Urgent payment problem",
      "Authority-based manipulation",
    ],
    safeAction:
      "Never share an OTP with anyone. End the call and contact the organization through its official support channel.",
  },

  {
    id: 10,
    category: "Bank / KYC",
    difficulty: "Advanced",
    channel: "Email",
    title: "Account Security Alert",
    message:
      "We detected an unauthorized login attempt on your account. Confirm your identity immediately using the secure verification link to prevent account suspension.",
    correctAnswer: "Suspicious",
    explanation:
      "Security alerts can be legitimate, but unexpected links requesting identity verification should be treated carefully until independently verified.",
    redFlags: [
      "Unexpected security alert",
      "Account suspension pressure",
      "Identity verification request",
      "External verification link",
    ],
    safeAction:
      "Do not use the provided link. Open the organization's official website or app yourself and check your account security alerts.",
  },
];

const categories = [
  "All",
  "UPI & Payment",
  "Bank / KYC",
  "Fake Jobs",
  "Delivery",
  "Investment",
  "Prize & Rewards",
  "Social Media",
  "QR Scams",
  "Social Engineering",
];

const difficulties = [
  "All",
  "Beginner",
  "Intermediate",
  "Advanced",
];

const answerOptions = [
  {
    value: "Safe",
    label: "Safe",
  },
  {
    value: "Suspicious",
    label: "Suspicious",
  },
  {
    value: "Scam",
    label: "Scam",
  },
];

function ScamSense() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");

  const [currentScenarioIndex, setCurrentScenarioIndex] =
    useState(0);

  const [selectedAnswer, setSelectedAnswer] = useState("");

  const [submitted, setSubmitted] = useState(false);

  const [answers, setAnswers] = useState([]);

  const [practiceFinished, setPracticeFinished] =
    useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submitError, setSubmitError] = useState("");

  const filteredScenarios = scenarios.filter((scenario) => {
    const categoryMatch =
      selectedCategory === "All" ||
      scenario.category === selectedCategory;

    const difficultyMatch =
      selectedDifficulty === "All" ||
      scenario.difficulty === selectedDifficulty;

    return categoryMatch && difficultyMatch;
  });

  const currentScenario =
    filteredScenarios[currentScenarioIndex];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentScenarioIndex(0);
    setSelectedAnswer("");
    setSubmitted(false);
    setPracticeFinished(false);
    setSubmitError("");
  };

  const handleDifficultyChange = (difficulty) => {
    setSelectedDifficulty(difficulty);
    setCurrentScenarioIndex(0);
    setSelectedAnswer("");
    setSubmitted(false);
    setPracticeFinished(false);
    setSubmitError("");
  };

  const handleAnswerSelect = (answer) => {
    if (submitted || isSubmitting) return;

    setSelectedAnswer(answer);
    setSubmitError("");
  };

  const handleSubmit = async () => {
    if (
      !selectedAnswer ||
      submitted ||
      !currentScenario ||
      isSubmitting
    ) {
      return;
    }

    const participantId = localStorage.getItem(
      "cybersathi_participant_id"
    );

    if (!participantId) {
      setSubmitError(
        "Anonymous participant setup is not ready. Please refresh the page and try again."
      );
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch(
        "https://cybersathi-backend-fresh.vercel.app/api/scamsense/attempt",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            scenario_id: currentScenario.id,
            answer: selectedAnswer,
            participant_id: participantId,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        throw new Error(
          errorData?.detail ||
            "ScamSense submission failed."
        );
      }

      const data = await response.json();

      const answerRecord = {
        scenarioId: currentScenario.id,
        category: currentScenario.category,
        difficulty: currentScenario.difficulty,
        userAnswer: selectedAnswer,
        correctAnswer:
          data.correct_answer ?? currentScenario.correctAnswer,
        correct:
          typeof data.is_correct === "boolean"
            ? data.is_correct
            : selectedAnswer ===
              currentScenario.correctAnswer,
      };

      setAnswers((previousAnswers) => [
        ...previousAnswers,
        answerRecord,
      ]);

      setSubmitted(true);
    } catch (error) {
      console.error(error);

      setSubmitError(
        error.message ||
          "Unable to save your answer. Please make sure the CyberSathi backend is running and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextScenario = () => {
    if (
      currentScenarioIndex <
      filteredScenarios.length - 1
    ) {
      setCurrentScenarioIndex(
        (previousIndex) => previousIndex + 1
      );

      setSelectedAnswer("");
      setSubmitted(false);
      setSubmitError("");
    } else {
      setPracticeFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentScenarioIndex(0);
    setSelectedAnswer("");
    setSubmitted(false);
    setAnswers([]);
    setPracticeFinished(false);
    setIsSubmitting(false);
    setSubmitError("");
  };

  const totalScenarios = filteredScenarios.length;

  const currentScenarioNumber =
    currentScenarioIndex + 1;

  const correctAnswers = answers.filter(
    (answer) => answer.correct
  ).length;

  const attemptedAnswers = answers.length;

  const scorePercentage =
    attemptedAnswers > 0
      ? Math.round(
          (correctAnswers / attemptedAnswers) * 100
        )
      : 0;

  const categoryPerformance = categories
    .filter((category) => category !== "All")
    .map((category) => {
      const categoryAnswers = answers.filter(
        (answer) => answer.category === category
      );

      if (categoryAnswers.length === 0) {
        return {
          category,
          percentage: null,
        };
      }

      const correct = categoryAnswers.filter(
        (answer) => answer.correct
      ).length;

      return {
        category,
        percentage: Math.round(
          (correct / categoryAnswers.length) * 100
        ),
      };
    });

  if (practiceFinished) {
    return (
      <div className="scamsense-page">
        <nav className="scamsense-navbar">
          <a href="/" className="scamsense-brand">
            CyberSathi
          </a>

          <div className="scamsense-nav-links">
            <a href="/">Home</a>

            <a href="/threatcheck">
              ThreatCheck
            </a>

            <a
              href="/scamsense"
              className="scamsense-active-link"
            >
              ScamSense
            </a>

            <a href="/cyberguide">
              CyberGuide
            </a>

            <a href="/shieldscore">
              ShieldScore
            </a>

            <a
              href="/"
              className="scamsense-nav-button"
            >
              Get Started
            </a>
          </div>
        </nav>

        <main>
          <section className="scamsense-final-result">
            <div className="final-result-badge">
              PRACTICE COMPLETE
            </div>

            <h1>Your ScamSense Result</h1>

            <p className="final-result-subtitle">
              You completed {attemptedAnswers} out of{" "}
              {totalScenarios} scenarios.
            </p>

            <div className="final-score-card">
              <span>Your Score</span>

              <div className="final-score">
                {correctAnswers}
                <small>/{attemptedAnswers}</small>
              </div>

              <strong>
                {scorePercentage}%
              </strong>

              <p>
                Correct answers
              </p>
            </div>

            <div className="category-performance">
              <div className="performance-heading">
                <span className="section-eyebrow">
                  PERFORMANCE
                </span>

                <h2>
                  Category Performance
                </h2>
              </div>

              <div className="performance-list">
                {categoryPerformance.map(
                  (item) => (
                    <div
                      className="performance-item"
                      key={item.category}
                    >
                      <div className="performance-top">
                        <span>
                          {item.category}
                        </span>

                        <strong>
                          {item.percentage !== null
                            ? `${item.percentage}%`
                            : "Not attempted"}
                        </strong>
                      </div>

                      <div className="performance-bar">
                        <div
                          className="performance-fill"
                          style={{
                            width:
                              item.percentage !== null
                                ? `${item.percentage}%`
                                : "0%",
                          }}
                        ></div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="scamsense-learning-card">
              <div>
                <span className="section-eyebrow">
                  KEEP LEARNING
                </span>

                <h2>
                  Strengthen Your Scam Awareness
                </h2>

                <p>
                  Explore CyberGuide to learn how common
                  scams work, recognize warning signs, and
                  protect yourself online.
                </p>
              </div>

              <a
                href="/cyberguide"
                className="scamsense-learning-button"
              >
                Learn in CyberGuide →
              </a>
            </div>

            <button
              type="button"
              className="scamsense-restart-button"
              onClick={handleRestart}
            >
              Practice Again
            </button>
          </section>
        </main>

        <footer className="scamsense-footer">
          <div className="scamsense-footer-brand">
            <h3>CyberSathi</h3>

            <p>
              Your Digital Safety Companion
            </p>
          </div>

          <div className="scamsense-footer-links">
            <h4>Quick Links</h4>

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

            <a href="/shieldscore">
              ShieldScore
            </a>
          </div>

          <div className="scamsense-footer-helpline">
            <h4>OFFICIAL CYBER HELPLINES</h4>

            <div className="scamsense-helpline-card">
              <div className="helpline-title">
                <span>☎</span>
                National Cyber Crime Helpline
              </div>

              <a
                href="tel:1930"
                className="helpline-number"
              >
                Dial 1930
              </a>

              <p>
                Toll-free across India • 24×7 Emergency
                Assistance
              </p>
            </div>

            <a
              href="https://www.cybercrime.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="scamsense-cyber-portal"
            >
              National Portal: cybercrime.gov.in ↗
            </a>
          </div>

          <p className="scamsense-footer-copyright">
            © 2026 CyberSathi. All rights reserved.
          </p>
        </footer>
      </div>
    );
  }

  return (
    <div className="scamsense-page">
      <nav className="scamsense-navbar">
        <a href="/" className="scamsense-brand">
          CyberSathi
        </a>

        <div className="scamsense-nav-links">
          <a href="/">Home</a>

          <a href="/threatcheck">
            ThreatCheck
          </a>

          <a
            href="/scamsense"
            className="scamsense-active-link"
          >
            ScamSense
          </a>

          <a href="/cyberguide">
            CyberGuide
          </a>

          <a href="/shieldscore">
            ShieldScore
          </a>

          <a
            href="/"
            className="scamsense-nav-button"
          >
            Get Started
          </a>
        </div>
      </nav>

      <main>
        <section className="scamsense-hero">
          <div className="scamsense-hero-badge">
            <span></span>
            Scam Awareness Practice
          </div>

          <h1>
            Can You Spot the Scam?
          </h1>

          <p>
            Practice with realistic online scam situations
            and learn how to recognize warning signs before
            they become real problems.
          </p>

          <div className="scamsense-hero-note">
            <span>✓</span>

            Learn through real-world scenarios

            <span className="hero-dot">
              •
            </span>

            Improve your awareness
          </div>
        </section>

        <section className="scamsense-practice-section">
          <div className="scamsense-filters">
            <div className="filter-group">
              <label>
                Category
              </label>

              <div className="filter-options">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={
                      selectedCategory === category
                        ? "filter-button active"
                        : "filter-button"
                    }
                    onClick={() =>
                      handleCategoryChange(category)
                    }
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <label>
                Difficulty
              </label>

              <div className="filter-options">
                {difficulties.map(
                  (difficulty) => (
                    <button
                      key={difficulty}
                      type="button"
                      className={
                        selectedDifficulty ===
                        difficulty
                          ? "filter-button active"
                          : "filter-button"
                      }
                      onClick={() =>
                        handleDifficultyChange(
                          difficulty
                        )
                      }
                    >
                      {difficulty}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>

          {filteredScenarios.length === 0 ? (
            <div className="scamsense-empty-state">
              <h2>
                No scenarios found
              </h2>

              <p>
                Try another category or difficulty.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedDifficulty("All");
                }}
              >
                Show All Scenarios
              </button>
            </div>
          ) : (
            <>
              <div className="scamsense-progress-area">
                <div className="progress-top">
                  <span>
                    Scenario {currentScenarioNumber} of{" "}
                    {totalScenarios}
                  </span>

                  <span>
                    {Math.round(
                      (currentScenarioNumber /
                        totalScenarios) *
                        100
                    )}
                    %
                  </span>
                </div>

                <div className="scamsense-progress">
                  <div
                    className="scamsense-progress-fill"
                    style={{
                      width: `${
                        (currentScenarioNumber /
                          totalScenarios) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="scenario-card">
                <div className="scenario-card-top">
                  <div className="scenario-meta">
                    <span className="scenario-number">
                      SCENARIO{" "}
                      {String(
                        currentScenario.id
                      ).padStart(2, "0")}
                    </span>

                    <span className="scenario-category">
                      {currentScenario.category}
                    </span>

                    <span
                      className={`scenario-difficulty ${currentScenario.difficulty.toLowerCase()}`}
                    >
                      {currentScenario.difficulty}
                    </span>
                  </div>

                  <span className="scenario-channel">
                    {currentScenario.channel}
                  </span>
                </div>

                <div className="scenario-content">
                  <h2>
                    {currentScenario.title}
                  </h2>

                  <div className="scenario-message">
                    <div className="message-label">
                      MESSAGE
                    </div>

                    <p>
                      {currentScenario.message}
                    </p>
                  </div>
                </div>

                {!submitted && (
                  <div className="scenario-question">
                    <h3>
                      What would you do?
                    </h3>

                    <div className="answer-options">
                      {answerOptions.map(
                        (option) => (
                          <button
                            type="button"
                            key={option.value}
                            className={
                              selectedAnswer ===
                              option.value
                                ? "answer-option selected"
                                : "answer-option"
                            }
                            onClick={() =>
                              handleAnswerSelect(
                                option.value
                              )
                            }
                          >
                            <span className="answer-radio">
                              {selectedAnswer ===
                              option.value
                                ? "✓"
                                : ""}
                            </span>

                            {option.label}
                          </button>
                        )
                      )}
                    </div>

                    <button
                      type="button"
                      className="submit-answer-button"
                      disabled={
                        !selectedAnswer ||
                        isSubmitting
                      }
                      onClick={handleSubmit}
                    >
                      {isSubmitting
                        ? "Saving..."
                        : "Submit Answer"}

                      <span>
                        {isSubmitting
                          ? "..."
                          : "→"}
                      </span>
                    </button>

                    {submitError && (
                      <p className="scamsense-submit-error">
                        {submitError}
                      </p>
                    )}
                  </div>
                )}

                {submitted && (
                  <div className="scenario-result">
                    <div
                      className={
                        selectedAnswer ===
                        currentScenario.correctAnswer
                          ? "answer-result correct"
                          : "answer-result incorrect"
                      }
                    >
                      <div className="answer-result-icon">
                        {selectedAnswer ===
                        currentScenario.correctAnswer
                          ? "✓"
                          : "!"}
                      </div>

                      <div>
                        <h3>
                          {selectedAnswer ===
                          currentScenario.correctAnswer
                            ? "Correct! You spotted it."
                            : "Not quite. Let's understand why."}
                        </h3>

                        <p>
                          Correct answer:{" "}
                          <strong>
                            {currentScenario.correctAnswer}
                          </strong>
                        </p>
                      </div>
                    </div>

                    <div className="result-explanation">
                      <h3>
                        Why?
                      </h3>

                      <p>
                        {currentScenario.explanation}
                      </p>
                    </div>

                    <div className="scenario-red-flags">
                      <h3>
                        Red Flags
                      </h3>

                      <div className="scenario-flags-grid">
                        {currentScenario.redFlags.map(
                          (flag, index) => (
                            <div
                              className="scenario-flag"
                              key={index}
                            >
                              <span>!</span>

                              <p>
                                {flag}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    <div className="safe-action">
                      <div className="safe-action-icon">
                        ✓
                      </div>

                      <div>
                        <h3>
                          Safe Action
                        </h3>

                        <p>
                          {currentScenario.safeAction}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="next-scenario-button"
                      onClick={
                        handleNextScenario
                      }
                    >
                      {currentScenarioIndex <
                      filteredScenarios.length - 1
                        ? "Next Scenario →"
                        : "View My Result →"}
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </section>

        <section className="scamsense-info-section">
          <div className="scamsense-info-content">
            <span className="section-eyebrow">
              THINK BEFORE YOU CLICK
            </span>

            <h2>
              Awareness Is Your First Line of Defense.
            </h2>

            <p>
              Scammers rely on urgency, fear, trust,
              and curiosity. Learning to recognize these
              patterns can help you make safer decisions
              online.
            </p>

            <a
              href="/cyberguide"
              className="scamsense-guide-button"
            >
              Explore CyberGuide →
            </a>
          </div>
        </section>
      </main>

      <footer className="scamsense-footer">
        <div className="scamsense-footer-brand">
          <h3>
            CyberSathi
          </h3>

          <p>
            Your Digital Safety Companion
          </p>
        </div>

        <div className="scamsense-footer-links">
          <h4>
            Quick Links
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

        <div className="scamsense-footer-helpline">
          <h4>
            OFFICIAL CYBER HELPLINES
          </h4>

          <div className="scamsense-helpline-card">
            <div className="helpline-title">
              <span>☎</span>
              National Cyber Crime Helpline
            </div>

            <a
              href="tel:1930"
              className="helpline-number"
            >
              Dial 1930
            </a>

            <p>
              Toll-free across India • 24×7 Emergency
              Assistance
            </p>
          </div>

          <a
            href="https://www.cybercrime.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="scamsense-cyber-portal"
          >
            National Portal: cybercrime.gov.in ↗
          </a>
        </div>

        <p className="scamsense-footer-copyright">
          © 2026 CyberSathi. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default ScamSense;