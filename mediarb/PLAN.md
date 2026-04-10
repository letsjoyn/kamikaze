# MediArb Execution Plan

## Project Structure
- index.html
- engine/conflict.js
- api/verdict.js
- components/fairness.js
- components/queue.js
- components/voice.js
- styles/main.css

## Feature Roadmap
1. Conflict engine with CIS + adaptive strategy (Consensus/Weighted/Triage)
2. Transparent verdict output with factor-level breakdown
3. Priority queue + rejected claimant ETA
4. Fairness metrics (Gini + fairness percent)
5. Voice-assisted input parsing
6. Domain swap (Hospital/Corporate/University)
7. PDF export for audit/reporting
8. Live demo flow: Input -> Processing -> Output

## Mandatory Constraints Mapping
1. Edge case handling
- Handle incomplete inputs with defaults/re-entry
- Flag contradictory inputs
- Guard unusual values with validation

2. Decision transparency
- Show winner reason, factor contributions, rejection reasons, and ETA

3. AI usage restriction
- Keep decision logic deterministic and non-AI
- Use AI only for structured input conversion or optional narrative text

4. Full flow demonstration
- Run an end-to-end live flow from request input to final logged verdict

5. Fairness constraint
- Prevent repeated dominance and show fairness score each run

6. Conflict intensity handling
- Auto-switch strategy using CIS bands

7. Custom preference weighting
- Add user-configurable importance sliders and apply normalized weights

8. Satisfaction and fairness metrics
- Output individual satisfaction score per claimant (0-100)
- Output overall system fairness score

## Judge Demo Script (Short)
1. Load 3-way conflict scenario
2. Show CIS rise and strategy auto-switch
3. Resolve and explain winner + rejected reasons
4. Show fairness metric + immutable log
5. Export report
