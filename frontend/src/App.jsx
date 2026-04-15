import React, { useState } from 'react';
import './App.css';

function App() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        age: '',
        condition: '',
        location: '',
        biomarkers: ''
    });
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch('/match', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    age: parseInt(formData.age) || 0
                }),
            });
            if (!response.ok) throw new Error('Server error');
            const data = await response.json();
            setResults(data.matches);
            setStep(3);
        } catch (err) {
            setError('Failed to fetch trials. Please check the backend is running.');
        } finally {
            setLoading(false);
        }
    };

    const getScoreClass = (score) => {
        if (score >= 0.8) return 'high';
        if (score >= 0.5) return 'medium';
        return 'low';
    };

    const canProceedStep1 = formData.condition.trim().length > 0;
    const canProceedStep2 = formData.age && formData.location.trim().length > 0;

    const handleReset = () => {
        setStep(1);
        setFormData({ age: '', condition: '', location: '', biomarkers: '' });
        setResults([]);
        setError('');
    };

    return (
        <div className="app-wrapper">
            {/* ── Navbar ── */}
            <nav className="navbar">
                <div className="navbar-brand">
                    <div className="brand-icon">🧬</div>
                    <div className="brand-text">
                        <h1>AI Trial Matcher</h1>
                        <span>Clinical Research Assistant</span>
                    </div>
                </div>
                <div className="navbar-status">
                    <span className="status-dot"></span>
                    System Online
                </div>
            </nav>

            {/* ── Main ── */}
            <main className="main-content">
                {/* ── Progress Bar ── */}
                <div className="progress-bar">
                    <div className="progress-step">
                        <div className={`step-circle ${step >= 1 ? (step > 1 ? 'completed' : 'active') : ''}`}>
                            {step > 1 ? '✓' : '1'}
                            <span className="step-label">Condition</span>
                        </div>
                    </div>
                    <div className={`step-line ${step > 1 ? 'completed' : ''}`}></div>
                    <div className="progress-step">
                        <div className={`step-circle ${step >= 2 ? (step > 2 ? 'completed' : 'active') : ''}`}>
                            {step > 2 ? '✓' : '2'}
                            <span className="step-label">Details</span>
                        </div>
                    </div>
                    <div className={`step-line ${step > 2 ? 'completed' : ''}`}></div>
                    <div className="progress-step">
                        <div className={`step-circle ${step >= 3 ? 'active' : ''}`}>
                            3
                            <span className="step-label">Results</span>
                        </div>
                    </div>
                </div>

                {/* ── Step 1: Condition ── */}
                {step === 1 && (
                    <div className="card" key="step1">
                        <div className="card-header">
                            <h2>Patient Condition</h2>
                            <p>Enter the primary medical condition or diagnosis for trial matching.</p>
                        </div>

                        <div className="form-group">
                            <label>Medical Condition</label>
                            <div className="input-wrapper">
                                <span className="input-icon">🔬</span>
                                <input
                                    id="condition-input"
                                    type="text"
                                    placeholder="e.g. Non-Small Cell Lung Cancer"
                                    value={formData.condition}
                                    onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="btn-row">
                            <button
                                id="step1-next"
                                className="btn btn-primary"
                                onClick={() => setStep(2)}
                                disabled={!canProceedStep1}
                            >
                                Continue →
                            </button>
                        </div>
                    </div>
                )}

                {/* ── Step 2: Demographics ── */}
                {step === 2 && (
                    <div className="card" key="step2">
                        <div className="card-header">
                            <h2>Patient Details</h2>
                            <p>Provide demographics and optional biomarker data to improve match accuracy.</p>
                        </div>

                        <div className="form-group">
                            <label>Age</label>
                            <div className="input-wrapper">
                                <span className="input-icon">👤</span>
                                <input
                                    id="age-input"
                                    type="number"
                                    placeholder="e.g. 45"
                                    min="0"
                                    max="120"
                                    value={formData.age}
                                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Location</label>
                            <div className="input-wrapper">
                                <span className="input-icon">📍</span>
                                <input
                                    id="location-input"
                                    type="text"
                                    placeholder="e.g. New York, USA"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Biomarkers (optional)</label>
                            <textarea
                                id="biomarkers-input"
                                placeholder="e.g. EGFR mutation positive, PD-L1 &gt; 50%"
                                value={formData.biomarkers}
                                onChange={(e) => setFormData({ ...formData, biomarkers: e.target.value })}
                            />
                        </div>

                        {error && <p style={{ color: 'var(--danger)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>{error}</p>}

                        <div className="btn-row">
                            <button id="step2-back" className="btn btn-ghost" onClick={() => setStep(1)}>
                                ← Back
                            </button>
                            <button
                                id="step2-submit"
                                className="btn btn-primary"
                                onClick={handleSubmit}
                                disabled={!canProceedStep2 || loading}
                            >
                                {loading ? <><span className="spinner"></span> Matching…</> : <>🔍 Find Trials</>}
                            </button>
                        </div>
                    </div>
                )}

                {/* ── Step 3: Results ── */}
                {step === 3 && (
                    <div>
                        <div className="results-header">
                            <h2>Trial Matches</h2>
                            <p>{results.length} trial{results.length !== 1 ? 's' : ''} found for <strong>{formData.condition}</strong></p>
                        </div>

                        {results.length > 0 ? (
                            results.map((trial) => {
                                const scoreClass = getScoreClass(trial.match_score);
                                return (
                                    <div key={trial.id} className="trial-card">
                                        <div className="trial-card-top">
                                            <span className="trial-id">{trial.id}</span>
                                            <div className={`score-badge ${scoreClass}`}>
                                                {Math.round(trial.match_score * 100)}% Match
                                                <div className="score-bar-track">
                                                    <div
                                                        className={`score-bar-fill ${scoreClass}`}
                                                        style={{ width: `${trial.match_score * 100}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <h3>{trial.title}</h3>
                                        <p className="trial-reasoning">{trial.reasoning}</p>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="empty-state">
                                <div className="empty-icon">🔎</div>
                                <h3>No Matches Found</h3>
                                <p>Try adjusting the patient profile or broadening the condition search.</p>
                            </div>
                        )}

                        <div className="btn-row" style={{ marginTop: '1.5rem' }}>
                            <button id="reset-btn" className="btn btn-secondary" onClick={handleReset}>
                                ↺ New Search
                            </button>
                        </div>
                    </div>
                )}
            </main>

            {/* ── Footer ── */}
            <footer className="footer">
                <p>AI Clinical Trial Matcher · Powered by FastAPI + React</p>
            </footer>
        </div>
    );
}

export default App;