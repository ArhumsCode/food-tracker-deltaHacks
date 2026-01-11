import '../App.css'
import './Pages.css'

function HowItWorks() {
  return (
    <div className="app">
      <section className="page-hero">
        <div className="page-hero-content">
          <h1 className="page-title">How It Works</h1>
          <p className="page-subtitle">
            Learn how to effectively track and reduce your food waste
          </p>
        </div>
      </section>

      <section className="page-section">
        <div className="page-container">
          <div className="how-it-works-content">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-content">
                <h2 className="step-title">Track Your Waste</h2>
                <p className="step-description">
                  Start by logging each food waste entry. Simply select the food category, 
                  enter the amount in kilograms, specify the date, and optionally add the location 
                  where the waste occurred.
                </p>
                <div className="step-features">
                  <span className="feature-tag">🍎 Categories</span>
                  <span className="feature-tag">📊 Amount Tracking</span>
                  <span className="feature-tag">📅 Date Logging</span>
                </div>
              </div>
            </div>

            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-content">
                <h2 className="step-title">Monitor Your Progress</h2>
                <p className="step-description">
                  Watch your awareness score grow as you track more entries. The score is calculated 
                  based on the number of entries you log and the variety of food categories you track. 
                  View detailed breakdowns by category to identify patterns.
                </p>
                <div className="step-features">
                  <span className="feature-tag">⭐ Awareness Score</span>
                  <span className="feature-tag">📈 Progress Tracking</span>
                  <span className="feature-tag">📊 Category Analysis</span>
                </div>
              </div>
            </div>

            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-content">
                <h2 className="step-title">Get Personalized Tips</h2>
                <p className="step-description">
                  Receive email summaries with your awareness score and personalized tips based on 
                  your most wasted food categories. Our system compares your score with average 
                  population scores and provides actionable advice.
                </p>
                <div className="step-features">
                  <span className="feature-tag">📧 Email Summaries</span>
                  <span className="feature-tag">💡 Personalized Tips</span>
                  <span className="feature-tag">🎯 Actionable Advice</span>
                </div>
              </div>
            </div>

            <div className="step-card">
              <div className="step-number">4</div>
              <div className="step-content">
                <h2 className="step-title">Make a Difference</h2>
                <p className="step-description">
                  By tracking your food waste, you're taking the first step toward reducing it. 
                  Awareness leads to action, and every entry you log helps you understand your 
                  consumption patterns better, ultimately leading to less waste and a healthier planet.
                </p>
                <div className="step-features">
                  <span className="feature-tag">🌍 Environmental Impact</span>
                  <span className="feature-tag">💰 Cost Savings</span>
                  <span className="feature-tag">🌱 Sustainability</span>
                </div>
              </div>
            </div>
          </div>

          <div className="tips-section">
            <h2 className="section-title">Quick Tips for Reducing Food Waste</h2>
            <div className="tips-grid">
              <div className="tip-card">
                <div className="tip-icon">📝</div>
                <h3 className="tip-title">Plan Your Meals</h3>
                <p className="tip-text">Create a weekly meal plan and shopping list to buy only what you need.</p>
              </div>
              <div className="tip-card">
                <div className="tip-icon">❄️</div>
                <h3 className="tip-title">Store Properly</h3>
                <p className="tip-text">Learn proper storage techniques to extend the shelf life of your food.</p>
              </div>
              <div className="tip-card">
                <div className="tip-icon">♻️</div>
                <h3 className="tip-title">Use Leftovers</h3>
                <p className="tip-text">Transform leftovers into new meals or freeze them for later use.</p>
              </div>
              <div className="tip-card">
                <div className="tip-icon">📦</div>
                <h3 className="tip-title">Buy Smart</h3>
                <p className="tip-text">Purchase smaller quantities more frequently to reduce spoilage.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HowItWorks
