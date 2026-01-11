import { useState } from 'react'
import '../App.css'

function Home() {
  const [wasteEntries, setWasteEntries] = useState([])
  const [formData, setFormData] = useState({
    type: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    location: ''
  })
  const [subscriptionEmail, setSubscriptionEmail] = useState('')
  const [subscriptionName, setSubscriptionName] = useState('')
  const [subscriptionStatus, setSubscriptionStatus] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.type && formData.amount) {
      setWasteEntries([...wasteEntries, {
        id: Date.now(),
        ...formData
      }])
      setFormData({
        type: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        location: ''
      })
    }
  }

  const handleDelete = (id) => {
    setWasteEntries(wasteEntries.filter(entry => entry.id !== id))
  }

  const getFoodIcon = (type) => {
    const iconMap = {
      'Fruits': '🍎',
      'Vegetables': '🥬',
      'Grains': '🍞',
      'Dairy': '🥛',
      'Meat': '🍗',
      'Prepared Food': '🍱',
      'Leftovers': '🍽️',
      'Other': '🍴'
    }
    return iconMap[type] || '🍴'
  }

  const handleSubscribe = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubscriptionStatus(null)

    // Calculate score and most wasted category
    const totalWaste = wasteEntries.reduce((sum, entry) => sum + parseFloat(entry.amount || 0), 0)
    const wasteByType = wasteEntries.reduce((acc, entry) => {
      acc[entry.type] = (acc[entry.type] || 0) + parseFloat(entry.amount || 0)
      return acc
    }, {})
    const awarenessScore = wasteEntries.length * 10 + Object.keys(wasteByType).length * 5
    const mostWastedCategory = Object.keys(wasteByType).length > 0 
      ? Object.entries(wasteByType).sort((a, b) => b[1] - a[1])[0][0]
      : null

    try {
      const response = await fetch('http://localhost:3001/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: subscriptionEmail,
          name: subscriptionName,
          awarenessScore: awarenessScore,
          mostWastedCategory: mostWastedCategory
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSubscriptionStatus({ type: 'success', message: data.message || 'Summary sent! Check your email.' })
        setSubscriptionEmail('')
        setSubscriptionName('')
      } else {
        setSubscriptionStatus({ type: 'error', message: data.error || 'Subscription failed' })
      }
    } catch (error) {
      setSubscriptionStatus({ type: 'error', message: 'Failed to connect to server. Please make sure the server is running.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const totalWaste = wasteEntries.reduce((sum, entry) => sum + parseFloat(entry.amount || 0), 0)
  const wasteByType = wasteEntries.reduce((acc, entry) => {
    acc[entry.type] = (acc[entry.type] || 0) + parseFloat(entry.amount || 0)
    return acc
  }, {})

  // Calculate dynamic score based on entries
  // Points for tracking awareness: 10 points per entry + 5 points per unique category
  const awarenessScore = wasteEntries.length * 10
  const categoryBonus = Object.keys(wasteByType).length * 5
  const totalScore = awarenessScore + categoryBonus

  return (
    <div className="app">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Fight Food Waste, Feed the Future</h1>
          <p className="hero-subtitle">
            Every meal saved is a step toward ending hunger and protecting our planet. 
            Track your food waste and make a meaningful impact on sustainability.
          </p>
          <p className="hero-description">
            Monitor your food waste patterns, reduce unnecessary disposal, and contribute to a world 
            where no good food goes to waste. Together, we can create a more sustainable food system.
          </p>
          
          {/* Subscription Form */}
          <form className="subscription-form" onSubmit={handleSubscribe}>
            <div className="subscription-input-group">
              <input
                type="text"
                placeholder="Enter your name"
                value={subscriptionName}
                onChange={(e) => setSubscriptionName(e.target.value)}
                required
                className="subscription-input"
              />
              <input
                type="email"
                placeholder="Enter your email for summary and tips"
                value={subscriptionEmail}
                onChange={(e) => setSubscriptionEmail(e.target.value)}
                required
                className="subscription-input"
              />
              <button 
                type="submit" 
                className="subscription-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Summary & Tips'}
              </button>
            </div>
            {subscriptionStatus && (
              <div className={`subscription-message ${subscriptionStatus.type}`}>
                {subscriptionStatus.message}
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Food Waste Tracker */}
      <section className="tracker-section">
        <div className="tracker-container">
          <h2 className="tracker-title">Food Waste Tracker</h2>
          
          {/* Stats Overview */}
          <div className="stats-grid">
            <div className="stat-card score-card">
              <div className="stat-value">{totalScore}</div>
              <div className="stat-label">Awareness Score</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{wasteEntries.length}</div>
              <div className="stat-label">Total Entries</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{totalWaste.toFixed(1)}</div>
              <div className="stat-label">Total Food Waste (kg)</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{Object.keys(wasteByType).length}</div>
              <div className="stat-label">Food Categories</div>
            </div>
          </div>

          {/* Add Food Waste Form */}
          <form className="waste-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="type">Food Category</label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  required
                >
                  <option value="">Select category</option>
                  <option value="Fruits">Fruits</option>
                  <option value="Vegetables">Vegetables</option>
                  <option value="Grains">Grains & Bread</option>
                  <option value="Dairy">Dairy Products</option>
                  <option value="Meat">Meat & Poultry</option>
                  <option value="Prepared Food">Prepared Food</option>
                  <option value="Leftovers">Leftovers</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="amount">Amount (kg)</label>
                <input
                  type="number"
                  id="amount"
                  step="0.1"
                  min="0"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  id="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="location">Location (optional)</label>
                <input
                  type="text"
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="e.g., Kitchen, Restaurant"
                />
              </div>
            </div>
            <button type="submit" className="submit-btn">Add Food Waste Entry</button>
          </form>

          {/* Waste Entries List */}
          {wasteEntries.length > 0 && (
            <div className="entries-section">
              <h3 className="entries-title">Recent Entries</h3>
              <div className="entries-list">
                {wasteEntries.map(entry => (
                  <div key={entry.id} className="entry-card">
                    <div className="entry-header">
                      <span className="entry-type">{getFoodIcon(entry.type)} {entry.type}</span>
                      <button 
                        className="delete-btn"
                        onClick={() => handleDelete(entry.id)}
                        aria-label="Delete entry"
                      >
                        ×
                      </button>
                    </div>
                    <div className="entry-details">
                      <div className="entry-amount">{entry.amount} kg</div>
                      <div className="entry-meta">
                        <span>{new Date(entry.date).toLocaleDateString()}</span>
                        {entry.location && <span>• {entry.location}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Food Waste Breakdown */}
          {Object.keys(wasteByType).length > 0 && (
            <div className="breakdown-section">
              <h3 className="breakdown-title">Food Waste Breakdown by Category</h3>
              <div className="breakdown-list">
                {Object.entries(wasteByType)
                  .sort((a, b) => b[1] - a[1])
                  .map(([type, amount]) => (
                    <div key={type} className="breakdown-item">
                      <div className="breakdown-type">{type}</div>
                      <div className="breakdown-bar">
                        <div 
                          className="breakdown-fill"
                          style={{ width: `${(amount / totalWaste) * 100}%` }}
                        ></div>
                      </div>
                      <div className="breakdown-amount">{amount.toFixed(1)} kg</div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Home
