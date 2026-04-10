# 🏥 MediArb — Hospital Resource Conflict Resolver
 
<div align="center">
 
![MediArb Banner](https://img.shields.io/badge/MediArb-Hospital%20Resource%20Conflict%20Resolver-2ecc71?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTYgMTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTggMkwxNCA1LjVWMTAuNUw4IDE0TDIgMTAuNVY1LjVMOCAyWiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxjaXJjbGUgY3g9IjgiIGN5PSI4IiByPSIyIiBmaWxsPSIjZmZmIi8+PC9zdmc+)
 
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![jsPDF](https://img.shields.io/badge/jsPDF-2.5.1-red?style=flat-square)](https://github.com/parallax/jsPDF)
[![Google Gemini](https://img.shields.io/badge/Gemini-2.0%20Flash-4285F4?style=flat-square&logo=google&logoColor=white)](https://deepmind.google/technologies/gemini/)
[![Claude](https://img.shields.io/badge/Claude-Sonnet%204-8B5CF6?style=flat-square)](https://anthropic.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![Zero Backend](https://img.shields.io/badge/Backend-Zero%20Dependencies-brightgreen?style=flat-square)]()
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=flat-square)](CONTRIBUTING.md)
 
**A deterministic, AI-augmented, real-time conflict resolution engine for critical hospital resources.**  
Built for hackathons. Designed for real-world triage. No backend. No database. No compromise.
 
[🚀 Live Demo](#-quick-start) · [📐 Architecture](#-system-architecture) · [📖 How It Works](#-how-it-works) · [🤝 Contributing](#-contributing)
 
</div>
 
---
 
## 📋 Table of Contents
 
- [Overview](#-overview)
- [The Problem](#-the-problem)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Project Structure](#-project-structure)
- [Module Breakdown](#-module-breakdown)
- [How It Works](#-how-it-works)
- [Conflict Intensity Score (CIS)](#-conflict-intensity-score-cis)
- [Resolution Strategies](#-resolution-strategies)
- [Fairness Engine](#-fairness-engine)
- [Priority Queue & ETA](#-priority-queue--eta)
- [Voice Input](#-voice-input)
- [AI Narrative Verdicts](#-ai-narrative-verdicts)
- [Domain Switching](#-domain-switching)
- [Edge Case Handling](#-edge-case-handling)
- [Dominance Penalty System](#-dominance-penalty-system)
- [Persistence & State Management](#-persistence--state-management)
- [PDF Export & Audit](#-pdf-export--audit)
- [UI / UX Design System](#-ui--ux-design-system)
- [Quick Start](#-quick-start)
- [Configuration & Customisation](#-configuration--customisation)
- [Constraint Compliance](#-constraint-compliance)
- [Known Limitations & Future Work](#-known-limitations--future-work)
- [Contributing](#-contributing)
- [License](#-license)
 
---
 
## 🌐 Overview
 
**MediArb** is a fully client-side, zero-backend, real-time arbitration engine that resolves resource conflicts in hospitals — and, via domain switching, in corporate and university environments as well.
 
When multiple doctors simultaneously request a scarce resource (an ICU Bed, Ventilator, OT Slot, MRI Scanner, or Blood Bank unit), MediArb computes a **Conflict Intensity Score (CIS)**, automatically selects the most appropriate resolution strategy, scores every claimant across four weighted factors, produces a transparent verdict, calculates fairness metrics, queues rejected claimants with ETAs, and exports an immutable PDF audit report — all in real time, deterministically, with optional AI-generated narrative explanations.
 
> 💡 **Design philosophy:** The decision logic is fully deterministic and explainable. AI is used only as a narrative layer on top of an already-complete algorithmic decision — never as the decision-maker itself.
 
---
 
## 🚨 The Problem
 
Hospital resource allocation failures are a daily crisis in under-resourced healthcare systems. When two attending physicians simultaneously need the one available ICU Bed for their respective critical patients, there is typically no systematic, transparent, or fair mechanism to resolve that conflict. Decisions are made informally, based on seniority, proximity, or whoever called first — with no audit trail, no fairness tracking, and no ETA feedback to the rejected party.
 
**MediArb solves this with:**
- A principled, multi-factor scoring model
- Automatic escalation of conflict intensity
- A fairness layer that prevents repeated winner dominance
- A full audit log with immutable timestamps
- An exportable PDF verdict for accountability
 
---
 
## ✨ Key Features
 
| Feature | Description |
|---|---|
| 🧮 **Conflict Intensity Score** | A dynamic 0–100 score computed from urgency gap, resource criticality, claimant count, and wait time |
| 🔀 **Adaptive Strategy Selection** | Automatically switches between FIFO+Urgency, Weighted Scoring, and Triage Protocol based on CIS band |
| ⚖️ **Multi-Factor Weighted Scoring** | Four configurable factors: Urgency, Wait Time, Severity, Age Risk — with user-adjustable sliders |
| 📊 **Gini-Based Fairness Metric** | Computes the Gini coefficient over composite scores, outputs a fairness percentage, flags imbalance |
| 🔔 **Dominance Penalty** | Tracks historical wins per claimant; applies a progressive penalty to prevent repeat domination |
| 🗂️ **Priority Queue** | Rejected claimants are enqueued by score; each gets an ETA estimate and a manual escalation button |
| 🎙️ **Voice Input** | Web Speech API integration to parse urgency, severity, wait time, age, and diagnosis from speech |
| 🤖 **AI Narrative Verdicts** | Optional Gemini 2.0 Flash or Claude Sonnet 4 integration to generate 3-sentence clinical reasoning |
| 🏢 **Domain Switching** | One-click switch between Hospital (MediArb), Corporate (OrgArb), and University (EduArb) contexts |
| 🧪 **Edge Case Detection** | Flags missing values, invalid ranges, urgency-severity contradictions, and scoring ties |
| 📄 **PDF Export** | jsPDF-powered audit report: session ID, verdict, AI reasoning, rejection reasons, timestamps |
| 🗒️ **Immutable Audit Log** | Timestamped in-session log of every event — inputs, decisions, penalties, errors |
| 💾 **LocalStorage Persistence** | Dominance win history and preference weights survive page refreshes |
| 👥 **Up to 6 Claimants** | Supports 2–6 simultaneous competing requests with full per-claimant detail cards |
| 🎭 **Demo Mode** | One-click load of a 3-way HIGH-conflict hospital scenario for judging/demo purposes |
 
---
 
## 🛠 Tech Stack
 
### Core
| Layer | Technology | Purpose |
|---|---|---|
| **Markup** | HTML5 (Semantic) | Single-page application shell, all UI panels |
| **Styling** | CSS3 (Custom Properties, Grid, Flexbox) | Dark-mode design system, responsive layout |
| **Logic** | Vanilla JavaScript (ES2022 Modules) | All conflict logic, state management, rendering |
| **Module system** | ES Modules (`import`/`export`) | Clean separation of engine, API, and components |
 
### Libraries
| Library | Version | Usage |
|---|---|---|
| **jsPDF** | 2.5.1 (CDN) | PDF generation for audit/conflict reports |
| **Google Fonts** | DM Sans + DM Mono | Typography — UI text and monospace data display |
| **Web Speech API** | Browser native | Voice input parsing for claimant data |
 
### AI / API Integrations (Optional)
| Provider | Model | Integration Type |
|---|---|---|
| **Google Gemini** | gemini-2.0-flash | REST API, browser-compatible, recommended |
| **Anthropic Claude** | claude-sonnet-4-20250514 | REST API, may require CORS proxy in browser |
 
### Design & Tooling
| Tool | Purpose |
|---|---|
| **CSS Custom Properties** | Full design token system (`--bg`, `--green`, `--amber`, `--red`, etc.) |
| **CSS Grid + Flexbox** | Responsive two-column layout (sidebar + main) |
| **`localStorage`** | Persistence for dominance history and preference weights |
| **`sessionStorage`** | (Not used — all session state is in-memory JS) |
 
---
 
## 🏗 System Architecture
 
```
┌─────────────────────────────────────────────────────────────────┐
│                        BROWSER (Client-Only)                     │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                     index.html (UI Shell)                  │   │
│  │                                                            │   │
│  │  ┌─────────────┐  ┌──────────────┐  ┌─────────────────┐  │   │
│  │  │   TOPBAR     │  │   SIDEBAR    │  │   MAIN PANEL    │  │   │
│  │  │  Domain swap │  │  Resource    │  │  CIS Meter      │  │   │
│  │  │  AI toggle   │  │  tabs        │  │  Method cards   │  │   │
│  │  │  PDF export  │  │  Claimant    │  │  Verdict panel  │  │   │
│  │  │  Demo load   │  │  cards       │  │  Score breakdown│  │   │
│  │  └─────────────┘  │  Weight      │  │  Fairness panel │  │   │
│  │                    │  sliders     │  │  Rejections     │  │   │
│  │                    │  History     │  │  Audit log      │  │   │
│  │                    └──────────────┘  └─────────────────┘  │   │
│  └──────────────────────────────────────────────────────────┘   │
│                               │                                   │
│           ┌───────────────────┼───────────────────┐              │
│           ▼                   ▼                   ▼              │
│  ┌──────────────┐   ┌──────────────────┐  ┌────────────────┐    │
│  │ engine/      │   │ components/      │  │ api/           │    │
│  │ conflict.js  │   │ fairness.js      │  │ verdict.js     │    │
│  │              │   │ queue.js         │  │                │    │
│  │ computeScore │   │ voice.js         │  │ callClaude()   │    │
│  │ computeCIS   │   │                  │  │ callGemini()   │    │
│  │ detectEdges  │   │ computeGini()    │  │ getAIVerdict() │    │
│  │ resolveConf  │   │ renderFairness() │  │                │    │
│  │ genVerdict   │   │ PriorityQueue    │  └───────┬────────┘    │
│  │ getMethod    │   │ estimateETA()    │          │              │
│  └──────────────┘   │ initVoice()     │          │              │
│                      └──────────────────┘          │              │
│                                                     ▼              │
│                               ┌─────────────────────────────┐    │
│                               │  External AI APIs (Optional) │    │
│                               │  • Gemini 2.0 Flash          │    │
│                               │  • Claude Sonnet 4           │    │
│                               └─────────────────────────────┘    │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    State Management                        │   │
│  │                                                            │   │
│  │  In-Memory State (state{})      localStorage              │   │
│  │  • doctors[]                    • mediarb:dominanceWins   │   │
│  │  • selectedResource             • mediarb:preferenceWeights│  │
│  │  • history[]                                               │   │
│  │  • logs[]                                                  │   │
│  │  • dominanceWins{}                                         │   │
│  │  • preferenceWeights{}                                     │   │
│  │  • latestResolution                                        │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```
 
### Data Flow (Single Resolution Cycle)
 
```
User Input (Claimant cards)
        │
        ▼
  Input Validation & Defaulting
  (missing severity → 7, age → 45, caps enforced)
        │
        ▼
  Edge Case Detection (conflict.js: detectEdgeCases)
  • Out-of-range values
  • Urgency-severity contradictions
  • Score ties
        │
        ▼
  CIS Computation (conflict.js: computeCIS)
  • Urgency gap factor (35%)
  • Claimant count factor (30%)
  • Resource criticality factor (20%)
  • Max wait time factor (15%)
        │
        ▼
  Strategy Selection (conflict.js: getResolutionMethod)
  CIS 0–39  → FIFO + Urgency
  CIS 40–74 → Weighted Scoring
  CIS 75–100 → Triage Protocol
        │
        ▼
  Score Computation per Claimant (conflict.js: computeScore)
  • Normalized weights applied
  • Dominance penalty subtracted
  • Tie → seniority override
        │
        ▼
  Priority Queue Construction (queue.js: PriorityQueue)
  Rejected claimants enqueued by score
        │
        ▼
  Satisfaction Score per Claimant
  (winner: 60 + 0.4*score, others: 0.6*score + 0.4*competitiveness)
        │
        ▼
  Fairness Metric (fairness.js: computeGini)
  Gini coefficient → fairness %
        │
        ▼
  AI Narrative (verdict.js: getAIVerdict) [optional]
  Falls back to deterministic text if no key / API error
        │
        ▼
  Render All UI Panels
  + Audit log entry
  + History append
  + Dominance win tracked & persisted
```
 
---
 
## 📁 Project Structure
 
```
kamikaze/
└── mediarb/
    ├── index.html              # Application shell — UI, state, orchestration
    ├── styles/
    │   └── main.css            # Full design system — tokens, layout, components
    ├── engine/
    │   └── conflict.js         # Core decision engine (deterministic)
    ├── components/
    │   ├── fairness.js         # Gini coefficient + fairness panel renderer
    │   ├── queue.js            # Priority queue data structure + ETA calculator
    │   └── voice.js            # Web Speech API voice input integration
    └── api/
        └── verdict.js          # AI narrative layer (Gemini + Claude integration)
```
 
> 📝 **Note:** All JavaScript uses ES Module syntax (`import`/`export`). The entry point is `index.html` which uses `<script type="module">` to import from the above paths.
 
---
 
## 🔬 Module Breakdown
 
### `engine/conflict.js`
 
The heart of MediArb. Fully deterministic — no AI, no randomness.
 
| Export | Signature | Description |
|---|---|---|
| `computeScore` | `(doctor, weights?) → ScoreObject` | Computes per-claimant composite score across 4 factors |
| `computeCIS` | `(doctors[], resourceType) → number` | Computes the 0–100 Conflict Intensity Score |
| `detectEdgeCases` | `(doctors[], weights?) → string[]` | Returns array of edge case warnings |
| `getResolutionMethod` | `(cis) → string` | Maps CIS band to resolution strategy string |
| `generateVerdict` | `(winner, method, cis, weights?) → string` | Produces deterministic fallback verdict text |
| `resolveConflict` | `(doctors[], method, options?) → Result` | Full resolution: scoring, sorting, tie-breaking, penalties |
| `normalizeWeights` | `(weights?) → NormalizedWeights` | Normalises raw slider values to sum to 100 |
 
**Score formula:**
```
urgScore   = (urgency / 10)          × normalizedUrgencyWeight
waitScore  = (min(waitHrs, 12) / 12) × normalizedWaitWeight
sevScore   = (severity / 10)         × normalizedSeverityWeight
ageScore   = (ageRisk / 10)          × normalizedAgeWeight
 
ageRisk:
  age > 65  → 10
  age > 50  → 7
  age < 5   → 9
  else      → 5
 
total = urgScore + waitScore + sevScore + ageScore
      - dominancePenalty (min(priorWins × 2, 12))
```
 
**Resource criticality constants:**
```
ICU Bed    : 1.00
Blood Bank : 0.90
Ventilator : 1.00
OT Slot    : 0.85
MRI Scanner: 0.65
```
 
---
 
### `components/fairness.js`
 
| Export | Signature | Description |
|---|---|---|
| `computeGini` | `(scores[]) → number` | Gini coefficient (0 = perfect equality, 1 = max inequality) |
| `renderFairnessPanel` | `(scored[]) → HTML string` | Renders the fairness panel with progress bar and label |
| `giniCoefficient` | `(values[]) → number` | Alias for `computeGini` |
 
**Fairness labels:**
- `> 70%` → Fair distribution (green)
- `40–70%` → Moderate imbalance (amber)
- `< 40%` → High imbalance — review required (red)
 
---
 
### `components/queue.js`
 
| Export | Signature | Description |
|---|---|---|
| `PriorityQueue` | Class | Insertion-sorted queue; higher priority = earlier position |
| `PriorityQueue.enqueue` | `(item, priority)` | Inserts at correct position |
| `PriorityQueue.dequeue` | `() → item` | Removes and returns highest-priority item |
| `PriorityQueue.peek` | `() → item` | Reads highest-priority item without removing |
| `PriorityQueue.toArray` | `() → item[]` | Returns all items in priority order |
| `estimateQueueEtaHours` | `(position) → number` | Returns `max(1, position × 2)` hours |
 
---
 
### `components/voice.js`
 
| Export | Signature | Description |
|---|---|---|
| `isVoiceSupported` | `() → boolean` | Checks for `SpeechRecognition` / `webkitSpeechRecognition` |
| `initVoice` | `(doctorId, state, renderDoctors, addLog) → rec` | Starts recognition session for a specific claimant |
 
**Parsed fields from speech:**
- `urgency <1–10>` or word-form (`urgency eight`)
- `waiting/waited <n>` → waitHrs
- `severity <1–10>` or word-form
- `age <n>`
- Keywords: `cardiac`, `heart`, `sepsis`, `trauma`, `stroke` → auto-sets diagnosis
 
**Language:** `en-IN` (Indian English, configurable)
 
---
 
### `api/verdict.js`
 
| Export | Signature | Description |
|---|---|---|
| `getAIVerdict` | `async (winner, rejected[], method, cis, resource) → string` | Queries AI or returns deterministic fallback |
 
**Provider selection:** reads `window.MEDIARB_AI_PROVIDER` (`"gemini"` or `"claude"`)  
**API Key:** reads `window.MEDIARB_AI_API_KEY`  
**Fallback:** if no key or API error, returns a pre-written deterministic verdict
 
**Prompt design:** Structured role prompt with full claimant data, instructs the model to produce exactly 3 sentences: (1) why winner won, (2) why each rejected claimant was not selected, (3) next steps.
 
---
 
## ⚙️ How It Works
 
### Step-by-Step Flow
 
1. **Select Resource Type** — Choose from ICU Bed, Ventilator, OT Slot, MRI Scanner, or Blood Bank via sidebar tabs.
 
2. **Add Claimants** — Add 2–6 doctor/claimant cards. Each card captures:
   - Name, Department, Rank (Attending / Senior Resident / Junior Resident)
   - Diagnosis (dropdown, resource-specific options)
   - Urgency (1–10 slider)
   - Wait Time (0–12h slider)
   - Patient Age (number input)
   - Severity (1–10 number input)
 
3. **Configure Weights** *(optional)* — Adjust the four preference weight sliders. Values are automatically normalised to sum to 100%.
 
4. **Press Resolve** — The system:
   - Validates all inputs, applies defaults and caps
   - Detects edge cases and contradictions
   - Computes CIS
   - Selects resolution method
   - Scores all claimants
   - Applies dominance penalties
   - Resolves ties via seniority
   - Builds priority queue for rejected claimants
   - Computes satisfaction scores
   - Computes Gini/fairness
   - Generates verdict (deterministic or AI)
   - Renders all output panels
   - Logs event to audit trail
   - Persists dominance data
 
5. **Review Output** — View verdict, factor breakdown, score comparison, fairness metric, rejected claimant queue with ETAs.
 
6. **Escalate** *(if needed)* — Click "Escalate" on any rejected claimant to boost their urgency (+2) and severity (+1), then re-resolve.
 
7. **Export PDF** — Download a full audit-ready PDF report.
 
---
 
## 📈 Conflict Intensity Score (CIS)
 
The CIS is a 0–100 integer score measuring how contentious a resource conflict is. It drives automatic strategy selection.
 
**Formula:**
```
CIS = min(
  round(nFactor + gapFactor + critFactor + waitFactor),
  100
)
 
nFactor    = min((claimantCount - 1) / 5, 1) × 30
             (more claimants → higher conflict)
 
gapFactor  = (maxUrgency - minUrgency) / 9 × 35
             (wider urgency spread → higher conflict)
 
critFactor = resourceCriticality × 20
             (ICU Bed, Ventilator = max criticality)
 
waitFactor = min(maxWaitHrs / 12, 1) × 15
             (longer waits → higher conflict)
```
 
**Bands:**
| CIS Range | Label | Strategy |
|---|---|---|
| 0 – 39 | 🟢 LOW | FIFO + Urgency |
| 40 – 74 | 🟡 MEDIUM | Weighted Scoring |
| 75 – 100 | 🔴 HIGH | Triage Protocol |
 
---
 
## 🔀 Resolution Strategies
 
### 1. FIFO + Urgency (`CIS < 40`)
Claimants sorted first by request order (arrival time index), then by urgency as a tie-breaker. Used when conflict is low and fairness of queue position is most important.
 
### 2. Weighted Scoring (`CIS 40–74`)
Multi-factor composite score applied with user-defined (normalised) weights. Four factors contribute: urgency, wait time, severity, and age risk. Dominance penalties are applied. Ties broken by rank seniority.
 
### 3. Triage Protocol (`CIS ≥ 75`)
Strict medical priority aligned with SALT/START triage principles. Composite score still drives ranking, but the verdict framing reflects emergency medical severity. Highest urgency and severity profiles take absolute precedence.
 
---
 
## ⚖️ Fairness Engine
 
MediArb implements two complementary fairness mechanisms:
 
### Gini Coefficient (Output Metric)
The Gini coefficient measures inequality in the distribution of composite scores across all claimants in a given resolution round.
 
```
G = Σᵢ Σⱼ |xᵢ - xⱼ| / (2 × n² × mean)
 
fairness% = (1 - G) × 100
```
 
A fairness score above 70% is considered acceptable. Below 40% triggers a visible red warning.
 
### Dominance Penalty (Cross-Session Fairness)
Claimants who have won previous resolutions in the same browser session (persisted via `localStorage`) receive a progressive score penalty:
 
```
penalty = min(priorWins × 2, 12)
finalScore = baseScore - penalty
```
 
This prevents the same claimant from repeatedly winning purely due to a structural scoring advantage. The penalty is capped at 12 points to avoid unfairly blocking genuinely high-priority cases.
 
---
 
## 🗂 Priority Queue & ETA
 
Rejected claimants are not simply dismissed. They are inserted into a `PriorityQueue` ordered by composite score (descending). Each rejected claimant receives:
 
- **Queue position** (1 = next in line)
- **ETA estimate**: `max(1, position × 2)` hours
- **Rejection reason**: identifies the weakest factor and score gap vs winner
- **Escalation button**: raises urgency by 2 and severity by 1, then prompts re-resolution
 
The queue is rebuilt fresh on each resolution call using insertion-sort for O(n²) simplicity appropriate to n ≤ 6.
 
---
 
## 🎙 Voice Input
 
Each claimant card has a **Mic** button that activates the Web Speech API for that specific claimant.
 
**Supported browsers:** Chrome (recommended), Edge. Firefox does not support `SpeechRecognition`.
 
**Language model:** `en-IN` (Indian English)
 
**Parsed patterns:**
```
"urgency 8"          → urgency = 8
"urgency eight"      → urgency = 8
"waiting 3"          → waitHrs = 3
"severity 9"         → severity = 9
"age 65"             → age = 65
"cardiac arrest"     → diagnosis = "Cardiac Arrest"
"sepsis"             → diagnosis = "Septic Shock"
"trauma"             → diagnosis = "Multi-organ Failure"
"stroke"             → diagnosis = "Stroke"
```
 
All parsed values are clamped to valid ranges after parsing.
 
---
 
## 🤖 AI Narrative Verdicts
 
MediArb supports optional AI-generated clinical reasoning to supplement the deterministic verdict.
 
### Enabling AI Narratives
1. Check the **AI narrative** checkbox in the topbar
2. Select provider: **Gemini** (recommended for browser use) or **Claude**
3. Enter your API key in the password field
4. Resolve a conflict — the verdict section will include the AI-generated text
 
### Providers
 
**Gemini 2.0 Flash** (default, recommended)
- Endpoint: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`
- Temperature: 0.2, maxOutputTokens: 300
- Works directly in browser (no CORS issues)
 
**Claude Sonnet 4**
- Endpoint: `https://api.anthropic.com/v1/messages`
- Model: `claude-sonnet-4-20250514`, max_tokens: 300
- May require a CORS proxy in browser environments
 
### Fallback Behaviour
If no API key is provided, or if the API call fails for any reason, MediArb falls back to a deterministic template-based verdict. **The system never fails to produce a verdict.**
 
### Prompt Structure
```
System role: MediArb hospital resource conflict resolver
Context: resource, CIS, method
Winner: name, dept, rank, urgency, severity, waitHrs, age, diagnosis, score
Rejected: name, score, urgency, diagnosis (for each)
Instruction: Write exactly 3 sentences covering (1) winner rationale,
             (2) rejection rationale, (3) next steps for rejected claimants
```
 
---
 
## 🏢 Domain Switching
 
MediArb supports three operational domains, switchable via the topbar buttons. Switching clears all current claimants and resets the resource list.
 
| Domain Button | App Title | Subtitle | Resource Examples | Claimant Label | Priority Label |
|---|---|---|---|---|---|
| **Hospital** | MediArb | Hospital Resource Conflict Resolver | ICU Bed, Ventilator, OT Slot, MRI Scanner, Blood Bank | Doctor | Patient urgency |
| **Corporate** | OrgArb | Corporate Resource Conflict Resolver | Meeting Room, Budget Allocation, Dev Resource, Cloud Credits, Server | Manager | Business priority |
| **University** | EduArb | University Resource Conflict Resolver | Lab Slot, Research Grant, Faculty Time, Equipment, Library Room | Professor | Deadline pressure |
 
All scoring, fairness, and queue logic is domain-agnostic — only labels and resource lists change.
 
---
 
## 🚧 Edge Case Handling
 
`detectEdgeCases()` runs before every resolution and catches:
 
| Edge Case | Detection | Handling |
|---|---|---|
| Urgency out of range | `urgency < 1 or > 10` | Warning flag + log |
| Missing severity | `severity < 1 or null` | Default to 7, log amber warning |
| Invalid age | `age < 1 or > 110` | Default to 45, log amber warning |
| Urgency-severity contradiction | `urgency ≥ 9 AND severity ≤ 3` | Flagged, user prompted to confirm or cancel |
| Score tie | `scored[0].total === scored[1].total` | Seniority override (Attending > Senior Resident > Junior Resident) |
| Incomplete inputs (missing fields) | Pre-resolution validation | Defaults applied + amber log entry |
| Max 6 claimants | `doctors.length >= 6` | Add button hidden |
| Min 2 claimants | `valid count < 2` | Resolve button disabled |
 
For contradiction cases, a `window.confirm()` dialog gives the user the choice to proceed or cancel and correct inputs.
 
---
 
## 🏆 Dominance Penalty System
 
To prevent any single claimant from systematically winning every resolution round, MediArb tracks wins per named claimant in `localStorage` under `mediarb:dominanceWins`.
 
**Penalty calculation:**
```
penalty = min(wins × dominancePenaltyStep, dominancePenaltyCap)
        = min(wins × 2, 12)
 
adjustedScore = max(0, baseScore - penalty)
```
 
**Transparency:** The factor contribution panel always shows:
```
Winner: Dr. Sharma · Base: 87.50 · Penalty: -4.00 · Final: 83.50
```
 
Penalties are logged to the audit trail and visible in the UI.
 
**Storage key:** `mediarb:dominanceWins` (JSON object, survives page refresh)  
**Reset:** Clearing `localStorage` resets all dominance history.
 
---
 
## 💾 Persistence & State Management
 
### In-Memory State (`state` object)
All session data lives in a single JavaScript object:
 
```javascript
state = {
  doctors[],           // Active claimant cards
  selectedResource,    // Current resource type string
  history[],           // Array of past resolutions (last 5 shown)
  logs[],              // Audit log entries (up to 40 shown)
  nextId,              // Incrementing ID for claimant cards
  domain,              // 'hospital' | 'corporate' | 'university'
  latestResolution,    // Full result object for PDF export
  dominanceWins{},     // Cross-session win counts (synced from localStorage)
  preferenceWeights{}, // urgency, wait, severity, age
  aiNarrativeEnabled,  // boolean
  sessionId            // Random 6-char uppercase string
}
```
 
### localStorage Keys
| Key | Contents | When Updated |
|---|---|---|
| `mediarb:dominanceWins` | JSON object `{name: wins}` | After every resolution |
| `mediarb:preferenceWeights` | JSON object with 4 weight values | When sliders change |
 
### Session ID
A fresh 6-character alphanumeric session ID (e.g. `A3F7K2`) is generated on page load via `Math.random().toString(36)`. It appears in the topbar and is embedded in exported PDFs.
 
---
 
## 📄 PDF Export & Audit
 
### Exported Report Contents
1. **Header** — MediArb title, session ID, timestamp, resource type
2. **Verdict section** — Winner name, CIS value and band, resolution method, composite score
3. **AI Reasoning** — Full AI or deterministic verdict text (word-wrapped)
4. **Rejected Claimants** — Numbered list with score, urgency, severity for each
5. **Multi-page support** — Automatic page break if rejected claimants exceed one page
 
### File Naming
```
MediArb_{sessionId}_{timestamp}.pdf
e.g. MediArb_A3F7K2_1714300000000.pdf
```
 
### Audit Log (In-App)
- Kept in memory for the session (up to 40 entries shown)
- Timestamped in `HH:MM:SS` format (Indian locale, 24h)
- Colour-coded: green (success), amber (warning/edge), red (error), default (info)
- Marked `immutable` in the UI header to signal it is append-only
 
---
 
## 🎨 UI / UX Design System
 
### Colour Tokens
```css
--bg:     #0f0f0f   /* Page background */
--s1:     #161616   /* Topbar, panels */
--s2:     #1c1c1c   /* Input backgrounds */
--s3:     #222222   /* Tags, chips */
--s4:     #2a2a2a   /* Slider tracks, dividers */
--border: #2e2e2e   /* Default borders */
--t1:     #f0f0f0   /* Primary text */
--t2:     #a0a0a0   /* Secondary text */
--t3:     #606060   /* Tertiary / placeholder text */
--green:  #2ecc71   /* Winner, success, LOW CIS */
--red:    #e74c3c   /* Error, rejection, HIGH CIS */
--amber:  #f39c12   /* Warning, MEDIUM CIS */
--blue:   #3498db   /* Info, wait time factor */
```
 
### Typography
- **Primary font:** DM Sans (300, 400, 500, 600, italic)
- **Monospace font:** DM Mono (400, 500) — used for scores, CIS numbers, timestamps
- **Base size:** 14px, line-height 1.5
 
### Layout
- **Topbar:** Sticky, 52px height, flex row
- **Body:** Sidebar (260px fixed) + Main (flex-1), CSS Grid
- **Panels:** Rounded corners (`--radius: 6px`), `--s1` background, `--border` outline
- **Transitions:** Smooth `fade-in` animations on verdict render; `cubic-bezier(0.4,0,0.2,1)` for progress bars
- **Tooltips:** CSS-only hover tooltips (`.tooltip > .tt`) on the CIS "?" badge
 
### Responsive Design
The layout uses `display: grid` and `flex` throughout, with a two-column inner grid (`grid-2`) for score breakdown and factor contributions panels.
 
---
 
## 🚀 Quick Start
 
### Prerequisites
- A modern browser (Chrome recommended for voice input support)
- No Node.js, no npm, no server — it's purely static HTML/CSS/JS
 
### Running Locally
 
```bash
# Clone the repo
git clone https://github.com/letsjoyn/kamikaze.git
cd kamikaze/mediarb
 
# Option 1: Use VS Code Live Server
# Right-click index.html → Open with Live Server
 
# Option 2: Python simple server
python3 -m http.server 8080
# Open http://localhost:8080
 
# Option 3: npx serve
npx serve .
# Open http://localhost:3000
```
 
> ⚠️ **Important:** The app uses ES Modules (`import`/`export`), which require an HTTP server. Opening `index.html` directly via `file://` will fail due to CORS restrictions on module imports.
 
### Demo Mode
Click the **"Load demo"** button in the topbar to instantly load a 3-way HIGH-conflict ICU Bed scenario with pre-filled claimant data (Dr. Sharma, Dr. Mehta, Dr. Patel). This is the recommended starting point for judges and demos.
 
---
 
## ⚙️ Configuration & Customisation
 
### Preference Weights
Adjust the four sliders in the sidebar before resolving:
- **Urgency** (default: 45) — clinical urgency of the patient case
- **Wait Time** (default: 25) — how long the doctor has been waiting
- **Severity** (default: 20) — medical severity of the underlying condition
- **Age Risk** (default: 10) — actuarial risk modifier based on patient age
 
Weights are normalised automatically — setting them all to equal values gives equal weight.
 
### AI Provider
Set via the topbar dropdown and API key field. Can be toggled at any time; the next resolution will use the current setting.
 
### Adding New Resource Types
In `index.html`, extend the `DIAGNOSES` object and add a new `rtab` button:
```javascript
DIAGNOSES['Dialysis Unit'] = ['Acute Kidney Injury', 'End-stage Renal Disease', ...];
```
 
### Adding New Domains
Extend the `DOMAINS` object in `index.html`:
```javascript
DOMAINS['legal'] = {
  title: 'LegalArb',
  subtitle: 'Legal Resource Conflict Resolver',
  resources: ['Courtroom', 'Legal Aid', 'Expert Witness', ...],
  claimantLabel: 'Lawyer',
  field1: 'Case type',
  urgencyLabel: 'Case urgency'
};
```
 
### Dominance Penalty Tuning
In the `resolve()` call in `index.html`:
```javascript
resolveConflict(docs, method, {
  weights: state.preferenceWeights,
  dominanceMap: state.dominanceWins,
  dominancePenaltyStep: 2,   // Penalty per win (default: 2)
  dominancePenaltyCap: 12    // Maximum total penalty (default: 12)
});
```
 
---
 
## ✅ Constraint Compliance
 
As specified in `PLAN.md`, MediArb satisfies all 8 mandatory constraints:
 
| Constraint | Implementation |
|---|---|
| **1. Edge case handling** | `detectEdgeCases()` — covers missing inputs, invalid ranges, contradictions, ties |
| **2. Decision transparency** | Winner reason, per-factor scores, rejection reasons, ETA, dominance penalty all shown |
| **3. AI usage restriction** | All decisions are deterministic; AI is used only for optional narrative text generation |
| **4. Full flow demonstration** | `loadDemo()` → resolve → verdict → PDF covers the complete end-to-end flow |
| **5. Fairness constraint** | Gini coefficient + fairness % shown each run; dominance penalty prevents repeat wins |
| **6. Conflict intensity handling** | CIS computed every run; strategy auto-switches across 3 bands |
| **7. Custom preference weighting** | Four user-configurable sliders with real-time normalisation |
| **8. Satisfaction & fairness metrics** | Per-claimant satisfaction score (0–100) shown in score breakdown; overall fairness % shown |
 
---
 
## 🔭 Known Limitations & Future Work
 
### Current Limitations
- **Voice input** requires Chrome or Chromium-based browsers; Firefox is unsupported
- **Claude AI narrative** may face CORS issues when called directly from browser without a proxy
- **No real-time collaboration** — multi-user scenarios require separate browser sessions
- **ETA formula** is a simple linear estimate; real queuing theory (M/M/1 etc.) not implemented
- **Max 6 claimants** per resolution cycle
- **No backend** — all state is ephemeral per-session (except `localStorage` keys)
 
### Potential Enhancements
- [ ] Real-time multi-user support via WebSockets or WebRTC
- [ ] Backend persistence with a conflict resolution audit database
- [ ] FHIR/HL7 integration for pulling live patient data
- [ ] M/D/1 or M/M/c queuing model for ETA accuracy
- [ ] Role-based access control (admin vs. requesting doctor)
- [ ] Email/SMS notification to rejected claimants
- [ ] Dark/light theme toggle
- [ ] Accessibility (ARIA labels, keyboard navigation, screen-reader support)
- [ ] Mobile-responsive layout
- [ ] Internationalisation (i18n) for multi-language support
- [ ] Unit test suite (Jest or Vitest)
 
---
 
## 🤝 Contributing
 
Contributions are welcome! Please follow these steps:
 
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Ensure no ES Module import paths are broken
5. Test in Chrome (for voice) and at least one other browser
6. Commit with a clear message: `git commit -m "feat: add X"`
7. Push and open a Pull Request
 
### Code Style
- Vanilla JS only — no frameworks, no bundlers
- Use `const`/`let`, no `var`
- All new logic functions should be exported from appropriate module files
- Keep `index.html` orchestration-only; business logic belongs in modules
 
---
 
## 📜 License
 
MIT License — see [LICENSE](LICENSE) for details.
 
---
 
## 👥 Authors
 
Built with ⚡ for the **Kamikaze hackathon*.
 
---
 
<div align="center">
 
**MediArb** — Because every second counts, and every decision must be justified.
 
[![GitHub](https://img.shields.io/badge/GitHub-letsjoyn%2Fkamikaze-181717?style=flat-square&logo=github)](https://github.com/letsjoyn/kamikaze)
 
</div>