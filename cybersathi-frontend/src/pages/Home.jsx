import { useEffect, useState } from "react";

function Home() {
  const [stats, setStats] = useState({
    people_reached: 0,
    scenarios_attempted: 0,
    threats_analyzed: 0,
    assessments_completed: 0,
    average_awareness_score: 0,
  });

  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setStatsLoading(true);
        setStatsError("");

        const response = await fetch(
          "http://127.0.0.1:8001/api/stats"
        );

        if (!response.ok) {
          throw new Error("Unable to load CyberSathi statistics.");
        }

        const data = await response.json();

        setStats({
          people_reached: data.people_reached ?? 0,
          scenarios_attempted: data.scenarios_attempted ?? 0,
          threats_analyzed: data.threats_analyzed ?? 0,
          assessments_completed: data.assessments_completed ?? 0,
          average_awareness_score:
            data.average_awareness_score ?? 0,
        });
      } catch (error) {
        console.error("Home stats error:", error);

        setStatsError(
          "Live statistics are temporarily unavailable."
        );
      } finally {
        setStatsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      {/* Navbar */}
      <nav>
        <div>CyberSathi</div>

        <div>
          <a href="/">Home</a>
          <a href="/threatcheck">ThreatCheck</a>
          <a href="/scamsense">ScamSense</a>
          <a href="/cyberguide">CyberGuide</a>
          <a href="/shieldscore">ShieldScore</a>

          <a href="/threatcheck">
            <button>Get Started</button>
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section>
          <p>Your Digital Safety Companion</p>

          <h1>Be Aware. Be Secure.</h1>

          <p>
            Learn how to recognize digital threats, identify scams,
            and stay safer in the online world.
          </p>

          <a href="/threatcheck">
            <button>Check a Threat</button>
          </a>

          <a href="/cyberguide">
            <button>Explore CyberGuide</button>
          </a>
        </section>

        {/* Explore CyberSathi */}
        <section>
          <h2>Explore CyberSathi</h2>

          <div>
            <div>
              <h3>ThreatCheck</h3>

              <p>
                Analyze suspicious messages and URLs.
              </p>

              <a href="/threatcheck">
                <button>Check a Threat</button>
              </a>
            </div>

            <div>
              <h3>ScamSense</h3>

              <p>
                Practice identifying real-world scams.
              </p>

              <a href="/scamsense">
                <button>Practice Now</button>
              </a>
            </div>

            <div>
              <h3>CyberGuide</h3>

              <p>
                Learn about common cybersecurity threats.
              </p>

              <a href="/cyberguide">
                <button>Start Learning</button>
              </a>
            </div>

            <div>
              <h3>ShieldScore</h3>

              <p>
                Test your cybersecurity awareness.
              </p>

              <a href="/shieldscore">
                <button>Take Assessment</button>
              </a>
            </div>
          </div>
        </section>

        {/* How CyberSathi Works */}
        <section>
          <h2>How CyberSathi Works</h2>

          <div>
            <div>
              <h3>01. Detect</h3>

              <p>
                Check suspicious messages, links, and online threats
                with ThreatCheck.
              </p>

              <a href="/threatcheck">
                Explore ThreatCheck →
              </a>
            </div>

            <div>
              <h3>02. Learn</h3>

              <p>
                Understand common scams, warning signs, and safe
                online practices.
              </p>

              <a href="/cyberguide">
                Explore CyberGuide →
              </a>
            </div>

            <div>
              <h3>03. Practice</h3>

              <p>
                Test your decisions with realistic scam situations
                in ScamSense.
              </p>

              <a href="/scamsense">
                Practice with ScamSense →
              </a>
            </div>

            <div>
              <h3>04. Assess</h3>

              <p>
                Measure your cybersecurity awareness with ShieldScore.
              </p>

              <a href="/shieldscore">
                Take ShieldScore →
              </a>
            </div>
          </div>
        </section>

        {/* Statistics / Awareness Dashboard */}
        <section>
          <h2>CyberSathi in Action</h2>

          <p>
            See how the community is building better cybersecurity
            awareness.
          </p>

          {statsError && (
            <p>{statsError}</p>
          )}

          <div>
            {/* People Reached */}
            <div>
              <h3>
                {statsLoading
                  ? "..."
                  : stats.people_reached.toLocaleString()}
              </h3>

              <p>People Reached</p>
            </div>

            {/* ScamSense Attempts */}
            <div>
              <h3>
                {statsLoading
                  ? "..."
                  : stats.scenarios_attempted.toLocaleString()}
              </h3>

              <p>Scenarios Attempted</p>
            </div>

            {/* Threats Analyzed */}
            <div>
              <h3>
                {statsLoading
                  ? "..."
                  : stats.threats_analyzed.toLocaleString()}
              </h3>

              <p>Threats Analyzed</p>
            </div>

            {/* Average Awareness Score */}
            <div>
              <h3>
                {statsLoading
                  ? "..."
                  : `${Math.round(
                      stats.average_awareness_score
                    )}%`}
              </h3>

              <p>Average Awareness Score</p>
            </div>
          </div>
        </section>

        {/* Safety CTA */}
        <section>
          <h2>Think Before You Click.</h2>

          <p>
            One careful decision can protect your money, account,
            and personal information.
          </p>

          <a href="/threatcheck">
            <button>Check a Threat</button>
          </a>
        </section>
      </main>

      {/* Footer */}
      <footer>
        <div>
          <h3>CyberSathi</h3>

          <p>Your Digital Safety Companion</p>
        </div>

        <div>
          <h4>Quick Links</h4>

          <a href="/">Home</a>
          <a href="/threatcheck">ThreatCheck</a>
          <a href="/scamsense">ScamSense</a>
          <a href="/cyberguide">CyberGuide</a>
          <a href="/shieldscore">ShieldScore</a>
        </div>

        <div className="cyber-helpline">
          <h4>OFFICIAL CYBER HELPLINES</h4>

          <div className="helpline-card">
            <div className="helpline-title">
              <span className="helpline-icon">☎</span>

              <span>
                National Cyber Crime Helpline
              </span>
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

export default Home;