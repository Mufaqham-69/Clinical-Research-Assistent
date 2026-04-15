# 🧬 AI Clinical Trial Matcher

An AI-powered medical research assistant that matches patients to relevant clinical trials based on their profile, condition, demographics, and biomarkers.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

**AI Clinical Trial Matcher** helps patients and healthcare professionals discover relevant clinical trials by inputting patient data (condition, age, location, biomarkers) and receiving AI-scored matches with reasoning. The system uses a FastAPI backend for clinical reasoning and a React frontend for an intuitive, step-by-step user experience.

---

## ✨ Features

- **Multi-Step Patient Intake** — Guided form that collects condition, demographics, and optional biomarker data.
- **AI-Powered Matching** — Backend logic scores and ranks clinical trials against the patient profile.
- **Match Reasoning** — Each trial result includes an explanation of why the patient is a good fit.
- **Modern Dark UI** — Sleek, dark-themed interface built with React and custom CSS.
- **RESTful API** — Clean `/match` endpoint for easy integration with other systems.

---

## 🛠 Tech Stack

| Layer    | Technology                  |
| -------- | --------------------------- |
| Frontend | React (JSX), CSS            |
| Backend  | Python, FastAPI, Uvicorn    |
| API      | RESTful JSON over HTTP      |

---

## 📁 Project Structure

```
Medical Research Assistent/
├── backend/
│   ├── app.py               # FastAPI server & /match endpoint
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── App.jsx              # React app with multi-step form
│   └── App.css              # Dark-themed styling
└── README.MD
```

---

## 🚀 Getting Started

### Prerequisites

- **Python 3.9+** — [Download](https://www.python.org/downloads/)
- **Node.js 18+** — [Download](https://nodejs.org/)
- **npm** (comes with Node.js)

### Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Start the FastAPI server (runs on http://localhost:8000)
python app.py
```

> **Note:** The `requirements.txt` should include `fastapi`, `uvicorn`, and `pydantic`. If the file is empty, install them manually:
> ```bash
> pip install fastapi uvicorn pydantic
> ```

### Frontend Setup

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will proxy API requests to the backend at `http://localhost:8000`.

---

## 📡 API Reference

### `GET /`

Health check endpoint.

**Response:**
```json
{
  "status": "AI Assistant Backend Active"
}
```

---

### `POST /match`

Match a patient to clinical trials.

**Request Body:**
```json
{
  "age": 45,
  "condition": "Non-Small Cell Lung Cancer",
  "location": "New York",
  "biomarkers": "EGFR mutation positive"
}
```

| Field       | Type   | Required | Description                        |
| ----------- | ------ | -------- | ---------------------------------- |
| `age`       | int    | Yes      | Patient's age                      |
| `condition` | string | Yes      | Medical condition / diagnosis      |
| `location`  | string | Yes      | Patient's location                 |
| `biomarkers`| string | No       | Relevant biomarker information     |

**Response:**
```json
{
  "matches": [
    {
      "id": "NCT012345",
      "title": "Phase III Study for Non-Small Cell Lung Cancer",
      "match_score": 0.95,
      "reasoning": "Patient's biomarkers align with the inclusion criteria for Non-Small Cell Lung Cancer."
    }
  ]
}
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">
  Built with ❤️ for advancing medical research
</p>
