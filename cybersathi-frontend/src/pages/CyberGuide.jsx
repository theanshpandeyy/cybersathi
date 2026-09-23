import { useState } from "react";
import "./CyberGuide.css";

const topics = [
  {
    id: 1,
    title: "Phishing",
    icon: "🎣",
    category: "Communication",
    level: "Beginner",
    description:
      "Learn how attackers use fake emails, messages and websites to steal your information.",
    videoUrl:
      "https://www.youtube.com/results?search_query=phishing+awareness+cyber+security",
    whatIsIt:
      "Phishing is a cyber scam where attackers pretend to be a trusted person or organization to trick you into sharing information or clicking a malicious link.",
    howItWorks: [
      "You receive an unexpected email, SMS or social media message.",
      "The message creates urgency or fear and asks you to take immediate action.",
      "A fake link or website is provided to collect your information.",
      "The attacker uses the captured information for fraud or account takeover.",
    ],
    warningSigns: [
      "Unexpected messages asking you to act immediately",
      "Suspicious or misspelled website addresses",
      "Requests for passwords, OTPs or sensitive information",
      "Unusual rewards, warnings or account suspension messages",
    ],
    scenario:
      "You receive an SMS saying your bank account will be blocked today unless you complete KYC using the attached link.",
    protection: [
      "Never trust unexpected links blindly.",
      "Verify the sender through an official website or app.",
      "Check the complete URL before entering information.",
      "Never share OTPs, PINs or passwords with anyone.",
    ],
  },

  {
    id: 2,
    title: "UPI & Payment Fraud",
    icon: "💳",
    category: "Payments",
    level: "Beginner",
    description:
      "Understand common UPI and digital payment scams and how to avoid losing money.",
    videoUrl:
      "https://www.youtube.com/watch?v=rgykKDxtsOg",
    whatIsIt:
      "UPI and payment fraud involves manipulating users into authorizing unwanted transactions or revealing sensitive payment information.",
    howItWorks: [
      "A scammer contacts you pretending to be a buyer, bank employee or support agent.",
      "They create a believable reason for you to take an action.",
      "You may be asked to scan a QR code, enter a UPI PIN or approve a payment request.",
      "The transaction is then authorized from your own device.",
    ],
    warningSigns: [
      "Someone asks you to enter your UPI PIN to receive money",
      "Unexpected collect/payment requests",
      "Pressure to scan an unknown QR code",
      "Requests to share screen or install remote-access apps",
    ],
    scenario:
      "Someone says they accidentally sent you a payment and asks you to scan a QR code to receive the refund.",
    protection: [
      "Remember: a UPI PIN is used to authorize payments, not receive money.",
      "Verify payment requests before approving them.",
      "Never share your UPI PIN.",
      "Contact your bank immediately if you notice an unauthorized transaction.",
    ],
  },

  {
    id: 3,
    title: "OTP & Banking Scams",
    icon: "🔐",
    category: "Banking",
    level: "Beginner",
    description:
      "Learn how scammers use OTPs and fake banking support calls to target users.",
    videoUrl:
      "https://www.youtube.com/results?search_query=OTP+banking+scam+awareness+India",
    whatIsIt:
      "OTP and banking scams use impersonation and social engineering to convince victims to reveal authentication information or authorize transactions.",
    howItWorks: [
      "The scammer impersonates a bank employee or support representative.",
      "They claim there is a security issue with your account.",
      "You are asked to share an OTP or perform an action.",
      "The attacker attempts to use that information to access or transact from the account.",
    ],
    warningSigns: [
      "Unsolicited calls claiming to be from your bank",
      "Requests for OTP or PIN",
      "Threats that your account will be blocked",
      "Pressure to act immediately",
    ],
    scenario:
      "A caller claims to be from your bank and says they need your OTP to cancel a suspicious transaction.",
    protection: [
      "Never share an OTP with anyone.",
      "End suspicious calls and contact the bank using its official number.",
      "Do not install apps requested by unknown callers.",
      "Monitor your banking notifications regularly.",
    ],
  },

  {
    id: 4,
    title: "Fake Job Scams",
    icon: "💼",
    category: "Jobs",
    level: "Intermediate",
    description:
      "Identify fake job offers, registration-fee scams and fraudulent recruiters.",
    videoUrl:
      "https://www.youtube.com/results?search_query=fake+job+scam+awareness+India",
    whatIsIt:
      "Fake job scams use attractive employment offers to collect money or personal information from job seekers.",
    howItWorks: [
      "The scammer posts or sends an attractive job opportunity.",
      "They may impersonate a known company or recruiter.",
      "The victim is asked to pay registration, training or verification fees.",
      "The scammer disappears after receiving money or information.",
    ],
    warningSigns: [
      "Guaranteed job with unusually high salary",
      "Requests for upfront payment",
      "Recruiter using a suspicious email address",
      "No proper interview or verification process",
    ],
    scenario:
      "You receive a message offering a work-from-home job with a high salary. The recruiter asks for ₹2,500 as a refundable registration fee.",
    protection: [
      "Verify the job on the company's official careers page.",
      "Never pay money just to receive a job offer.",
      "Verify recruiter email addresses.",
      "Be cautious of unrealistic salary promises.",
    ],
  },

  {
    id: 5,
    title: "Investment Scams",
    icon: "📈",
    category: "Finance",
    level: "Advanced",
    description:
      "Learn how fake investment platforms and guaranteed-return schemes operate.",
    videoUrl:
      "https://www.youtube.com/results?search_query=investment+scam+awareness+India+cyber+fraud",
    whatIsIt:
      "Investment scams use unrealistic profit promises, fake platforms or impersonation to convince people to transfer money.",
    howItWorks: [
      "The victim is introduced to an investment opportunity.",
      "The scammer displays fake profits or testimonials.",
      "The victim is encouraged to deposit more money.",
      "When withdrawal is attempted, additional fees may be demanded or access may disappear.",
    ],
    warningSigns: [
      "Guaranteed or risk-free returns",
      "Pressure to invest immediately",
      "Unknown trading or investment platforms",
      "Requests to transfer money to personal accounts",
    ],
    scenario:
      "A social media contact claims they can double your investment within a week using a private trading platform.",
    protection: [
      "Never assume guaranteed returns are legitimate.",
      "Verify financial services through official sources.",
      "Research the company before investing.",
      "Do not transfer money based solely on social media messages.",
    ],
  },

  {
    id: 6,
    title: "QR Code Scams",
    icon: "▦",
    category: "Payments",
    level: "Intermediate",
    description:
      "Understand how malicious QR codes can redirect you to unsafe actions or payments.",
    videoUrl:
      "https://www.youtube.com/watch?v=rgykKDxtsOg",
    whatIsIt:
      "QR scams exploit the convenience of QR codes by directing users to malicious websites or unwanted payment requests.",
    howItWorks: [
      "A scammer sends or places a QR code somewhere convincing.",
      "The victim scans it without checking its destination.",
      "The QR code opens a website or payment request.",
      "The victim may unknowingly share information or authorize a transaction.",
    ],
    warningSigns: [
      "Unexpected QR codes from unknown people",
      "QR codes asking you to receive money",
      "Payment requests appearing after scanning",
      "Unknown websites opened through QR codes",
    ],
    scenario:
      "A stranger says they need to send you money and asks you to scan their QR code and enter your UPI PIN.",
    protection: [
      "Do not scan unknown QR codes casually.",
      "Check what action the QR code triggers.",
      "Never enter your UPI PIN to receive money.",
      "Cancel unexpected payment requests.",
    ],
  },

  {
    id: 7,
    title: "Social Engineering",
    icon: "🧠",
    category: "Human Manipulation",
    level: "Advanced",
    description:
      "Learn how scammers manipulate emotions and trust to make victims act without thinking.",
    videoUrl:
      "https://www.youtube.com/results?search_query=social+engineering+scams+awareness+cyber+security",
    whatIsIt:
      "Social engineering is the psychological manipulation of people into revealing information or performing actions that benefit an attacker.",
    howItWorks: [
      "The attacker establishes trust or creates fear.",
      "They use urgency, authority or emotional pressure.",
      "The victim is encouraged to bypass normal safety checks.",
      "The attacker gets access to information, money or accounts.",
    ],
    warningSigns: [
      "Extreme urgency or emotional pressure",
      "Someone pretending to be an authority figure",
      "Requests to keep the conversation secret",
      "Pressure to bypass normal verification",
    ],
    scenario:
      "Someone calls claiming to be a senior official and tells you that your family member is in trouble unless you immediately transfer money.",
    protection: [
      "Pause before acting under pressure.",
      "Verify the person's identity independently.",
      "Do not allow fear to override safety checks.",
      "Discuss suspicious requests with someone you trust.",
    ],
  },

  {
    id: 8,
    title: "Fake Websites",
    icon: "🌐",
    category: "Web Safety",
    level: "Intermediate",
    description:
      "Learn how fake websites imitate trusted services to steal credentials and payment information.",
    videoUrl:
      "https://www.youtube.com/results?search_query=fake+website+phishing+awareness+cyber+security",
    whatIsIt:
      "Fake websites are fraudulent websites designed to look like legitimate banks, shopping platforms, government services or other trusted organizations.",
    howItWorks: [
      "Attackers create a website that resembles a legitimate service.",
      "A fake link is distributed through messages, advertisements or social media.",
      "The user enters login or payment information.",
      "The information is captured by the attacker.",
    ],
    warningSigns: [
      "Unusual domain names",
      "Misspelled brand names or URLs",
      "Poor website design or broken pages",
      "Unexpected login or payment requests",
    ],
    scenario:
      "You search for a popular service and click an advertisement that opens a website with a slightly different domain name.",
    protection: [
      "Type important websites manually or use bookmarks.",
      "Check the domain carefully.",
      "Do not trust search advertisements automatically.",
      "Use official apps where appropriate.",
    ],
  },

  {
    id: 9,
    title: "Malicious Links",
    icon: "🔗",
    category: "Web Safety",
    level: "Intermediate",
    description:
      "Understand how suspicious links can lead to phishing pages, malware or fraudulent websites.",
    videoUrl:
      "https://www.youtube.com/results?search_query=malicious+links+phishing+awareness+cyber+security",
    whatIsIt:
      "Malicious links are URLs designed to redirect users to harmful, fraudulent or unauthorized destinations.",
    howItWorks: [
      "The link is distributed through email, SMS, social media or messaging apps.",
      "The message gives the user a reason to click.",
      "The link redirects to a malicious or fraudulent destination.",
      "The user may be asked to download something or enter sensitive information.",
    ],
    warningSigns: [
      "Shortened or unfamiliar URLs",
      "Unexpected links",
      "Urgent messages encouraging clicks",
      "Links that do not match the claimed organization",
    ],
    scenario:
      "A message says you have won a reward and asks you to click a shortened link to claim it within 10 minutes.",
    protection: [
      "Do not click unexpected links.",
      "Check the destination before opening it.",
      "Use official websites instead of message links.",
      "Keep your browser and operating system updated.",
    ],
  },

  {
    id: 10,
    title: "Social Media Safety",
    icon: "📱",
    category: "Social Media",
    level: "Beginner",
    description:
      "Protect your accounts, personal information and identity across social platforms.",
    videoUrl:
      "https://www.youtube.com/results?search_query=social+media+safety+cyber+security+awareness",
    whatIsIt:
      "Social media safety involves protecting your account, privacy and personal information from scams, impersonation and unauthorized access.",
    howItWorks: [
      "Attackers may create fake profiles or compromise existing accounts.",
      "They collect publicly available information about victims.",
      "They use this information for impersonation, scams or targeted attacks.",
      "Victims may be contacted through direct messages or fake accounts.",
    ],
    warningSigns: [
      "Unknown accounts asking for personal information",
      "Urgent money requests from friends",
      "Unexpected login alerts",
      "Messages containing suspicious links",
    ],
    scenario:
      "A friend's social media account sends you a message asking for emergency money and includes a new payment number.",
    protection: [
      "Verify unusual requests through another communication channel.",
      "Enable multi-factor authentication.",
      "Keep personal information private.",
      "Review active sessions and account security settings.",
    ],
  },
];

function CyberGuide() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");

  const categories = [
    "All",
    ...new Set(topics.map((topic) => topic.category)),
  ];

  const levels = ["All", "Beginner", "Intermediate", "Advanced"];

  const filteredTopics = topics.filter((topic) => {
    const categoryMatch =
      selectedCategory === "All" || topic.category === selectedCategory;

    const levelMatch =
      selectedLevel === "All" || topic.level === selectedLevel;

    return categoryMatch && levelMatch;
  });

  const openTopic = (topic) => {
    setSelectedTopic(topic);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeTopic = () => {
    setSelectedTopic(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="cyberguide-page">
      {/* ==================== NAVBAR ==================== */}

      <nav className="cyberguide-navbar">
        <a href="/" className="cyberguide-brand">
          CyberSathi
        </a>

        <div className="cyberguide-nav-links">
          <a href="/">Home</a>
          <a href="/threatcheck">ThreatCheck</a>
          <a href="/scamsense">ScamSense</a>

          <a
            href="/cyberguide"
            className="cyberguide-active-link"
          >
            CyberGuide
          </a>

          <a href="/shieldscore">ShieldScore</a>

          <a href="#topics" className="cyberguide-nav-button">
            Get Started
          </a>
        </div>
      </nav>

      {/* ==================== TOPIC DETAIL ==================== */}

      {selectedTopic ? (
        <main className="cyberguide-detail-page">
          <section className="cyberguide-detail-hero">
            <button
              className="cyberguide-back-button"
              onClick={closeTopic}
            >
              ← Back to CyberGuide
            </button>

            <div className="cyberguide-detail-icon">
              {selectedTopic.icon}
            </div>

            <div className="cyberguide-detail-badges">
              <span>{selectedTopic.category}</span>

              <span
                className={`level-${selectedTopic.level.toLowerCase()}`}
              >
                {selectedTopic.level}
              </span>
            </div>

            <h1>{selectedTopic.title}</h1>

            <p>{selectedTopic.description}</p>
          </section>

          <section className="cyberguide-detail-content">
            {/* WHAT IS IT */}

            <div className="cyberguide-detail-card">
              <span className="section-eyebrow">WHAT IS IT?</span>

              <h2>Understanding {selectedTopic.title}</h2>

              <p>{selectedTopic.whatIsIt}</p>
            </div>

            {/* HOW IT WORKS */}

            <div className="cyberguide-detail-card">
              <span className="section-eyebrow">HOW IT WORKS</span>

              <h2>How Does It Work?</h2>

              <div className="guide-step-list">
                {selectedTopic.howItWorks.map((step, index) => (
                  <div className="guide-step" key={index}>
                    <span>{index + 1}</span>
                    <p>{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* WARNING SIGNS */}

            <div className="cyberguide-detail-card">
              <span className="section-eyebrow">WARNING SIGNS</span>

              <h2>Common Warning Signs</h2>

              <div className="warning-sign-list">
                {selectedTopic.warningSigns.map((sign, index) => (
                  <div className="warning-sign" key={index}>
                    <span>!</span>
                    <p>{sign}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* REAL WORLD SCENARIO */}

            <div className="cyberguide-scenario-card">
              <span className="section-eyebrow">
                REAL-WORLD SCENARIO
              </span>

              <h2>Could You Spot It?</h2>

              <p>{selectedTopic.scenario}</p>
            </div>

            {/* STAY PROTECTED */}

            <div className="cyberguide-detail-card">
              <span className="section-eyebrow">STAY PROTECTED</span>

              <h2>How to Protect Yourself</h2>

              <div className="protection-list">
                {selectedTopic.protection.map((tip, index) => (
                  <div className="protection-item" key={index}>
                    <span>✓</span>
                    <p>{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* WATCH & LEARN */}

            <div className="cyberguide-video-card">
              <div className="cyberguide-video-content">
                <span className="section-eyebrow">
                  WATCH & LEARN
                </span>

                <h2>Prefer Learning Through Video?</h2>

                <p>
                  Watch a video about {selectedTopic.title} to understand
                  the concept through practical examples and visual
                  explanations.
                </p>

                <a
                  href={selectedTopic.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="cyberguide-video-button"
                >
                  <span className="video-play-icon">▶</span>
                  Watch on YouTube
                  <span>↗</span>
                </a>
              </div>
            </div>

            {/* CHECKLIST */}

            <div className="cyberguide-checklist-card">
              <div>
                <span className="section-eyebrow">
                  QUICK SAFETY CHECKLIST
                </span>

                <h2>Think Before You Act</h2>

                <p>
                  Pause, verify the source and never share sensitive
                  information under pressure.
                </p>
              </div>

              <button
                className="cyberguide-back-button"
                onClick={closeTopic}
              >
                Explore More Topics
              </button>
            </div>
          </section>
        </main>
      ) : (
        <main>
          {/* ==================== HERO ==================== */}

          <section className="cyberguide-hero">
            <div className="cyberguide-hero-badge">
              <span></span>
              Cyber Security Learning Hub
            </div>

            <h1>
              Learn Today.
              <br />
              Stay Safer Tomorrow.
            </h1>

            <p>
              Understand common cyber threats, recognize warning signs,
              and learn practical ways to protect yourself online.
            </p>

            <div className="cyberguide-hero-note">
              <span>✓</span>
              Simple explanations

              <span className="hero-dot">•</span>

              Real-world scenarios

              <span className="hero-dot">•</span>

              Practical safety tips
            </div>
          </section>

          {/* ==================== TOPICS ==================== */}

          <section
            className="cyberguide-topics-section"
            id="topics"
          >
            <div className="cyberguide-section-heading">
              <span className="section-eyebrow">
                EXPLORE CYBER SAFETY
              </span>

              <h2>What Do You Want to Learn?</h2>

              <p>
                Choose a topic and build your understanding of the most
                common digital threats.
              </p>
            </div>

            {/* Filters */}

            <div className="cyberguide-filters">
              <div className="cyberguide-filter-group">
                <label>Topic Category</label>

                <div className="cyberguide-filter-options">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={`cyberguide-filter-button ${
                        selectedCategory === category ? "active" : ""
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="cyberguide-filter-group">
                <label>Difficulty</label>

                <div className="cyberguide-filter-options">
                  {levels.map((level) => (
                    <button
                      key={level}
                      className={`cyberguide-filter-button ${
                        selectedLevel === level ? "active" : ""
                      }`}
                      onClick={() => setSelectedLevel(level)}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Topic Cards */}

            {filteredTopics.length > 0 ? (
              <div className="cyberguide-topic-grid">
                {filteredTopics.map((topic) => (
                  <article
                    className="cyberguide-topic-card"
                    key={topic.id}
                  >
                    <div className="cyberguide-topic-card-top">
                      <div className="cyberguide-topic-icon">
                        {topic.icon}
                      </div>

                      <span
                        className={`cyberguide-level level-${topic.level.toLowerCase()}`}
                      >
                        {topic.level}
                      </span>
                    </div>

                    <div className="cyberguide-topic-content">
                      <div className="cyberguide-topic-category">
                        {topic.category}
                      </div>

                      <h3>{topic.title}</h3>

                      <p>{topic.description}</p>
                    </div>

                    <button
                      className="cyberguide-learn-button"
                      onClick={() => openTopic(topic)}
                    >
                      Learn More
                      <span>→</span>
                    </button>
                  </article>
                ))}
              </div>
            ) : (
              <div className="cyberguide-empty-state">
                <h3>No topics found</h3>

                <p>
                  Try changing the category or difficulty filter.
                </p>

                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSelectedLevel("All");
                  }}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </section>

          {/* ==================== LEARNING PATH ==================== */}

          <section className="cyberguide-learning-path">
            <div className="cyberguide-section-heading">
              <span className="section-eyebrow">LEARNING PATH</span>

              <h2>Build Your Cyber Safety Knowledge</h2>

              <p>
                Follow a simple progression from recognizing threats to
                responding safely.
              </p>
            </div>

            <div className="cyberguide-path-grid">
              <div className="cyberguide-path-card">
                <span className="path-number">01</span>

                <h3>Recognize</h3>

                <p>
                  Learn how common scams and cyber threats look in real
                  situations.
                </p>
              </div>

              <div className="cyberguide-path-card">
                <span className="path-number">02</span>

                <h3>Verify</h3>

                <p>
                  Build the habit of checking links, sources, requests
                  and identities.
                </p>
              </div>

              <div className="cyberguide-path-card">
                <span className="path-number">03</span>

                <h3>Protect</h3>

                <p>
                  Apply practical security habits to your accounts,
                  devices and payments.
                </p>
              </div>

              <div className="cyberguide-path-card">
                <span className="path-number">04</span>

                <h3>Respond</h3>

                <p>
                  Know what to do when something suspicious or unsafe
                  happens.
                </p>
              </div>
            </div>
          </section>

          {/* ==================== CTA ==================== */}

          <section className="cyberguide-cta">
            <div className="cyberguide-cta-content">
              <span className="section-eyebrow">
                PUT YOUR KNOWLEDGE TO THE TEST
              </span>

              <h2>Think You Can Spot a Scam?</h2>

              <p>
                Practice with realistic scenarios in ScamSense and see
                how well you recognize common scams.
              </p>

              <a
                href="/scamsense"
                className="cyberguide-cta-button"
              >
                Try ScamSense
                <span>→</span>
              </a>
            </div>
          </section>
        </main>
      )}

      {/* ==================== FOOTER ==================== */}

      <footer className="cyberguide-footer">
        <div className="cyberguide-footer-brand">
          <h3>CyberSathi</h3>

          <p>Your Digital Safety Companion.</p>

          <p>
            Learn, verify and stay safer in the digital world.
          </p>
        </div>

        <div className="cyberguide-footer-links">
          <h4>Explore</h4>

          <a href="/">Home</a>
          <a href="/threatcheck">ThreatCheck</a>
          <a href="/scamsense">ScamSense</a>
          <a href="/cyberguide">CyberGuide</a>
          <a href="/shieldscore">ShieldScore</a>
        </div>

        <div className="cyberguide-footer-help">
          <h4>Need Help?</h4>

          <div className="cyberguide-helpline-card">
            <span>Cyber Crime Helpline</span>

            <strong>1930</strong>

            <p>
              For reporting cyber financial fraud in India.
            </p>
          </div>

          <a
            href="https://cybercrime.gov.in/"
            target="_blank"
            rel="noreferrer"
          >
            Visit Cyber Crime Portal →
          </a>
        </div>

        <div className="cyberguide-footer-copyright">
          © 2026 CyberSathi. Built for safer digital awareness.
        </div>
      </footer>
    </div>
  );
}

export default CyberGuide;