import { Link } from 'react-router-dom'
import '../App.css'
import './Pages.css'

function About() {
  return (
    <div className="app">
      <section className="page-hero">
        <div className="page-hero-content">
          <h1 className="page-title">About Food Waste Tracker</h1>
          <p className="page-subtitle">
            Empowering individuals to reduce food waste and create a sustainable future
          </p>
        </div>
      </section>

      <section className="page-section">
        <div className="page-container">
          <div className="about-content">
            <div className="about-section">
              <h2 className="section-title">Our Mission</h2>
              <p className="about-text">
                Food Waste Tracker is dedicated to helping individuals and communities reduce food waste 
                through awareness and tracking. We believe that by understanding our consumption patterns, 
                we can make informed decisions that benefit both our wallets and the environment.
              </p>
              <p className="about-text">
                Every year, billions of tons of food are wasted globally, contributing to greenhouse gas 
                emissions and wasting precious resources. Our platform makes it easy to track, understand, 
                and reduce food waste in your daily life.
              </p>
            </div>

            <div className="about-section">
              <h2 className="section-title">Why Food Waste Matters</h2>
              <div className="stats-row">
                <div className="stat-box">
                  <div className="stat-box-number">1.3B</div>
                  <div className="stat-box-label">Tons of food wasted globally each year</div>
                </div>
                <div className="stat-box">
                  <div className="stat-box-number">8%</div>
                  <div className="stat-box-label">Of global greenhouse gas emissions</div>
                </div>
                <div className="stat-box">
                  <div className="stat-box-number">$1T</div>
                  <div className="stat-box-label">Economic cost of food waste annually</div>
                </div>
              </div>
            </div>

            <div className="about-section">
              <h2 className="section-title">How We Help</h2>
              <div className="features-list">
                <div className="feature-item">
                  <div className="feature-icon">📊</div>
                  <div className="feature-content">
                    <h3 className="feature-title">Easy Tracking</h3>
                    <p className="feature-description">
                      Simple and intuitive interface to log your food waste entries quickly and efficiently.
                    </p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">📈</div>
                  <div className="feature-content">
                    <h3 className="feature-title">Visual Analytics</h3>
                    <p className="feature-description">
                      See your waste patterns through detailed breakdowns and awareness scores.
                    </p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">💡</div>
                  <div className="feature-content">
                    <h3 className="feature-title">Personalized Tips</h3>
                    <p className="feature-description">
                      Receive actionable advice based on your specific waste patterns and categories.
                    </p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">🌍</div>
                  <div className="feature-content">
                    <h3 className="feature-title">Environmental Impact</h3>
                    <p className="feature-description">
                      Understand how your actions contribute to a more sustainable food system.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="about-section">
              <h2 className="section-title">Our Vision</h2>
              <p className="about-text">
                We envision a world where food waste is minimized through awareness, education, and 
                technology. By making it easy for everyone to track and reduce their food waste, 
                we're contributing to a more sustainable future where resources are valued and 
                nothing goes to waste.
              </p>
              <p className="about-text">
                Join us in the fight against food waste. Every entry you log, every pattern you identify, 
                and every change you make brings us closer to a world where food waste is a thing of the past.
              </p>
            </div>

            <div className="cta-section">
              <h2 className="section-title">Ready to Get Started?</h2>
              <p className="cta-text">
                Start tracking your food waste today and make a positive impact on the environment.
              </p>
              <Link to="/" className="cta-button">Start Tracking Now</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
