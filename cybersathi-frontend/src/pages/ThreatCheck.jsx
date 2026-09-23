import { useState } from "react";

import "./ThreatCheck.css";

const inputTypes = ["URL", "SMS", "WhatsApp", "Email"];

const placeholders = {
  URL: "Paste the suspicious URL here...",
  SMS: "Paste the suspicious SMS here...",
  WhatsApp: "Paste the suspicious WhatsApp message here...",
  Email: "Paste the suspicious email content here...",
};

function getRiskLevel(score) {
  if (score <= 29) return "LOW RISK";
  if (score <= 59) return "MEDIUM RISK";
  if (score <= 79) return "HIGH RISK";
  return "CRITICAL RISK";
}

function getExplanation(threatType, redFlags) {
  if (!redFlags || redFlags.length === 0) {
    return `The analysis did not detect strong threat indicators. The content should still be handled carefully, especially if it comes from an unknown sender.`;
  }

  return `The analysis identified ${threatType.toLowerCase()} indicators. The detected warning signs include ${redFlags
    .map((flag) => flag.toLowerCase())
    .join(", ")}.`;
}

function ThreatCheck() {
  const [selectedType, setSelectedType] = useState("URL");
  const [inputValue, setInputValue] = useState("");
  const [analysisState, setAnalysisState] = useState("IDLE");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    const trimmedValue = inputValue.trim();

    if (!trimmedValue) {
      setError("Please enter something to analyze.");
      return;
    }

    if (selectedType === "URL") {
      const looksLikeUrl =
        /^(https?:\/\/|www\.)/i.test(trimmedValue) ||
        /\.[a-z]{2,}(\/|$)/i.test(trimmedValue);

      if (!looksLikeUrl) {
        setError("Please enter a valid-looking URL.");
        return;
      }
    }

    if (trimmedValue.length < 8) {
      setError("Please enter a little more content to analyze.");
      return;
    }

    const participantId = localStorage.getItem(
      "cybersathi_participant_id"
    );

    if (!participantId) {
      setError(
        "Anonymous participant setup is not ready. Please refresh the page and try again."
      );
      return;
    }

    setError("");
    setAnalysisState("LOADING");
    setResult(null);

    try {
      const response = await fetch(
        "http://127.0.0.1:8001/api/threatcheck",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            input_type: selectedType.toLowerCase(),
            content: trimmedValue,
            participant_id: participantId,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        throw new Error(
          errorData?.detail || "Threat analysis request failed."
        );
      }

      const data = await response.json();

      const formattedResult = {
        score: data.risk_score,
        level: getRiskLevel(data.risk_score),
        threatType: data.threat_type,
        redFlags: data.red_flags || [],
        explanation: getExplanation(
          data.threat_type,
          data.red_flags || []
        ),
        action: data.recommended_action,
      };

      setResult(formattedResult);
      setAnalysisState("RESULT");
    } catch (err) {
      console.error(err);

      setError(
        err.message ||
          "Unable to connect to the CyberSathi threat detection service. Please make sure the backend server is running."
      );

      setAnalysisState("IDLE");
    }
  };

  const handleReset = () => {
    setInputValue("");
    setResult(null);
    setError("");
    setAnalysisState("IDLE");
  };

  return (
    <div className="threat-page">
      {/* ================= NAVBAR ================= */}

      <nav className="threat-navbar">
        <a href="/" className="threat-brand">
          CyberSathi
        </a>

        <div className="threat-nav-links">
          <a href="/">Home</a>

          <a
            href="/threatcheck"
            className="threat-active-link"
          >
            ThreatCheck
          </a>

          <a href="/scamsense">ScamSense</a>
          <a href="/cyberguide">CyberGuide</a>
          <a href="/shieldscore">ShieldScore</a>

          <a href="/" className="threat-nav-button">
            Get Started
          </a>
        </div>
      </nav>

      {/* ================= HERO ================= */}

      <main>
        <section className="threat-hero">
          <div className="threat-hero-badge">
            <span></span>
            Threat Detection
          </div>

          <h1>Check Before You Trust.</h1>

          <p>
            Analyze suspicious messages, links, and online content
            to identify potential cyber threats before you take action.
          </p>

          <div className="threat-safe-note">
            <span>✓</span>
            Safe Analysis
            <span className="safe-dot">•</span>
            No Passwords Required
          </div>
        </section>

        {/* ================= ANALYZER ================= */}

        <section className="threat-analyzer-section">
          <div className="threat-analyzer-card">
            <div className="analyzer-heading">
              <span className="section-eyebrow">
                ANALYZE
              </span>

              <h2>Check a Threat</h2>

              <p>
                Choose what you want to analyze and paste the
                suspicious content below.
              </p>
            </div>

            {/* Input Type Selector */}

            <div className="input-type-wrapper">
              <label>What do you want to check?</label>

              <div className="input-type-selector">
                {inputTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    className={
                      selectedType === type
                        ? "input-type active"
                        : "input-type"
                    }
                    onClick={() => {
                      setSelectedType(type);
                      setError("");
                    }}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Text Input */}

            <div className="threat-input-wrapper">
              <label htmlFor="threat-input">
                Suspicious Content
              </label>

              <textarea
                id="threat-input"
                value={inputValue}
                onChange={(event) => {
                  setInputValue(event.target.value);
                  setError("");
                }}
                placeholder={placeholders[selectedType]}
                rows="7"
              />

              <div className="input-footer">
                <span className="safety-warning">
                  Do not share passwords, OTPs, PINs, card numbers,
                  or banking credentials.
                </span>

                <span className="character-count">
                  {inputValue.length} characters
                </span>
              </div>
            </div>

            {/* Error */}

            {error && (
              <div className="threat-error">
                <span>!</span>
                {error}
              </div>
            )}

            {/* Analyze Button */}

            <button
              type="button"
              className="analyze-button"
              onClick={handleAnalyze}
              disabled={analysisState === "LOADING"}
            >
              {analysisState === "LOADING" ? (
                <>
                  <span className="loading-spinner"></span>
                  Analyzing...
                </>
              ) : (
                <>
                  Analyze Threat
                  <span>→</span>
                </>
              )}
            </button>

            <p className="demo-notice">
              Analysis is powered by the CyberSathi backend threat
              detection engine.
            </p>
          </div>

          {/* ================= RESULT ================= */}

          {analysisState === "RESULT" && result && (
            <div className="analysis-result">
              <div className="result-header">
                <div>
                  <span className="section-eyebrow">
                    ANALYSIS COMPLETE
                  </span>

                  <h2>Analysis Result</h2>
                </div>

                <div className="result-status">
                  ● Analysis Complete
                </div>
              </div>

              {/* Risk Overview */}

              <div className="risk-overview">
                <div className="risk-score-box">
                  <span className="risk-label">
                    Risk Score
                  </span>

                  <div className="risk-score">
                    {result.score}
                    <span>/100</span>
                  </div>

                  <div className="risk-progress">
                    <div
                      className="risk-progress-fill"
                      style={{
                        width: `${result.score}%`,
                      }}
                    ></div>
                  </div>

                  <strong className="critical-risk">
                    {result.level}
                  </strong>
                </div>

                <div className="threat-summary">
                  <div className="summary-item">
                    <span>Threat Type</span>
                    <strong>{result.threatType}</strong>
                  </div>

                  <div className="summary-item">
                    <span>Input Type</span>
                    <strong>{selectedType}</strong>
                  </div>
                </div>
              </div>

              {/* Red Flags */}

              <div className="result-section">
                <h3>Red Flags Detected</h3>

                <div className="red-flags">
                  {result.redFlags.length > 0 ? (
                    result.redFlags.map((flag, index) => (
                      <div
                        className="red-flag"
                        key={index}
                      >
                        <span>!</span>
                        <p>{flag}</p>
                      </div>
                    ))
                  ) : (
                    <div className="red-flag">
                      <span>✓</span>
                      <p>
                        No strong red flags were detected.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Explanation */}

              <div className="result-section">
                <h3>Why is this suspicious?</h3>

                <p className="result-description">
                  {result.explanation}
                </p>
              </div>

              {/* Recommended Action */}

              <div className="recommended-action">
                <div className="recommendation-icon">
                  ✓
                </div>

                <div>
                  <h3>Recommended Action</h3>

                  <p>
                    {result.action}
                  </p>
                </div>
              </div>

              {/* Learn More */}

              <div className="learn-more-card">
                <div>
                  <span className="section-eyebrow">
                    LEARN MORE
                  </span>

                  <h3>
                    Want to understand this threat?
                  </h3>

                  <p>
                    Learn how common cyber threats work, how to
                    recognize warning signs, and how to protect
                    yourself.
                  </p>
                </div>

                <a
                  href="/cyberguide"
                  className="learn-button"
                >
                  Learn in CyberGuide →
                </a>
              </div>

              {/* Reset */}

              <button
                type="button"
                className="check-another-button"
                onClick={handleReset}
              >
                ← Check Another
              </button>
            </div>
          )}
        </section>

        {/* ================= CYBERGUIDE CTA ================= */}

        <section className="threat-guide-cta">
          <div className="guide-cta-content">
            <span className="section-eyebrow">
              CYBERGUIDE
            </span>

            <h2>Know the Signs. Stay Safer.</h2>

            <p>
              Understanding common cyber threats is one of the
              simplest ways to protect yourself online.
            </p>

            <a
              href="/cyberguide"
              className="guide-cta-button"
            >
              Explore CyberGuide →
            </a>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}

      <footer className="threat-footer">
        <div className="footer-brand">
          <h3>CyberSathi</h3>

          <p>
            Your Digital Safety Companion
          </p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>

          <a href="/">Home</a>
          <a href="/threatcheck">ThreatCheck</a>
          <a href="/scamsense">ScamSense</a>
          <a href="/cyberguide">CyberGuide</a>
          <a href="/shieldscore">ShieldScore</a>
        </div>

        <div className="footer-helpline">
          <h4>OFFICIAL CYBER HELPLINES</h4>

          <div className="helpline-card">
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
              Toll-free across India • 24×7 Emergency Assistance
            </p>
          </div>

          <a
            href="https://www.cybercrime.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="cyber-portal"
          >
            National Portal: cybercrime.gov.in ↗
          </a>
        </div>

        <p className="footer-copyright">
          © 2026 CyberSathi. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default ThreatCheck;