---
id: 3
title: Create Module 1 ROS 2 Plan
stage: plan
date: 2025-12-11
surface: agent
model: gemini
feature: 001-module-01-ros2
branch: 001-module-01-ros2
user: narmeen
command: /sp.plan
labels: ["plan", "ros2", "docusaurus", "documentation"]
links:
  spec: specs/001-module-01-ros2/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/001-module-01-ros2/plan.md
tests:
  - none
---

## Prompt

description: Execute the implementation planning workflow using the plan template to generate design artifacts.
---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Outline

1. **Setup**: Run `.specify/scripts/powershell/setup-plan.ps1 -Json` from repo root and parse JSON for FEATURE_SPEC, IMPL_PLAN, SPECS_DIR, BRANCH. For single quotes in args like "I'm Groot", use escape syntax: e.g 'I'\''m Groot' (or double-quote if possible: "I'm Groot").

2. **Load context**: Read FEATURE_SPEC and `.specify/memory/constitution.md`. Load IMPL_PLAN template (already copied).

3. **Execute plan workflow**: Follow the structure in IMPL_PLAN template to:
   - Fill Technical Context (mark unknowns as "NEEDS CLARIFICATION")
   - Fill Constitution Check section from constitution
   - Evaluate gates (ERROR if violations unjustified)
   - Phase 0: Generate research.md (resolve all NEEDS CLARIFICATION)
   - Phase 1: Generate data-model.md, contracts/, quickstart.md
   - Phase 1: Update agent context by running the agent script
   - Re-evaluate Constitution Check post-design

4. **Stop and report**: Command ends after Phase 2 planning. Report branch, IMPL_PLAN path, and generated artifacts.

## Phases

### Phase 0: Outline & Research

1. **Extract unknowns from Technical Context** above:
   - For each NEEDS CLARIFICATION → research task
   - For each dependency → best practices task
   - For each integration → patterns task

2. **Generate and dispatch research agents**:

   ```text
   For each unknown in Technical Context:
     Task: "Research {unknown} for {feature context}"
   For each technology choice:
     Task: "Find best practices for {tech} in {domain}"
   ```

3. **Consolidate findings** in `research.md` using format:
   - Decision: [what was chosen]
   - Rationale: [why chosen]
   - Alternatives considered: [what else evaluated]

**Output**: research.md with all NEEDS CLARIFICATION resolved

### Phase 1: Design & Contracts

**Prerequisites:** `research.md` complete

1. **Extract entities from feature spec** → `data-model.md`:
   - Entity name, fields, relationships
   - Validation rules from requirements
   - State transitions if applicable

2. **Generate API contracts** from functional requirements:
   - For each user action → endpoint
   - Use standard REST/GraphQL patterns
   - Output OpenAPI/GraphQL schema to `/contracts/`

3. **Agent context update**:
   - Run `.specify/scripts/powershell/update-agent-context.ps1 -AgentType gemini`
   - These scripts detect which AI agent is in use
   - Update the appropriate agent-specific context file
   - Add only new technology from current plan
   - Preserve manual additions between markers

**Output**: data-model.md, /contracts/*, quickstart.md, agent-specific file

## Key rules

- Use absolute paths
- ERROR on gate failures or unresolved clarifications

---

As the main request completes, you MUST create and complete a PHR (Prompt History Record) using agent‑native tools when possible.

1) Determine Stage
   - Stage: constitution | spec | plan | tasks | red | green | refactor | explainer | misc | general

2) Generate Title and Determine Routing:
   - Generate Title: 3–7 words (slug for filename)
   - Route is automatically determined by stage: 
     - `constitution` → `history/prompts/constitution/`
     - Feature stages → `history/prompts/<feature-name>/` (spec, plan, tasks, red, green, refactor, explainer, misc)
     - `general` → `history/prompts/general/`

3) Create and Fill PHR (Shell first; fallback agent‑native)
   - Run: `.specify/scripts/bash/create-phr.sh --title "<title>" --stage <stage> [--feature <name>] --json`
   - Open the file and fill remaining placeholders (YAML + body), embedding full PROMPT_TEXT (verbatim) and concise RESPONSE_TEXT.
   - If the script fails:
     - Read `.specify/templates/phr-template.prompt.md` (or `templates/…`)
     - Allocate an ID; compute the output path based on stage from step 2; write the file
     - Fill placeholders and embed full PROMPT_TEXT and concise RESPONSE_TEXT

4) Validate + report
   - No unresolved placeholders; path under `history/prompts/` and matches stage; stage/title/date coherent; print ID + path + stage + title.
   - On failure: warn, don't block. Skip only for `/sp.phr`.


/sp.plan "Module 1: The Robotic Nervous System (ROS 2)

Organize the chapter 'chapter-01-ros2' into detailed lessons with structured learning objectives. Include the following plan:

1. Lesson 1: ROS 2 Basics
   - Explain ROS 2 as middleware for humanoid robots
   - Introduce Nodes, Topics, and Services
   - Include simple diagrams and examples for beginners

2. Lesson 2: Python Agent Integration with ROS 2
   - Bridge Python agents to ROS 2 controllers using rclpy
   - Include step-by-step code examples and explanations

3. Lesson 3: URDF for Humanoids
   - Explain the Unified Robot Description Format (URDF)
   - Show basic humanoid robot structure with examples

4. Lesson 4: Summary and Key Takeaways
   - Recap main concepts
   - Provide references and suggested exercises

Format the plan in a structured, clean markdown suitable for Docusaurus, with headings, bullet points, and code blocks where needed."

## Response snapshot

The implementation plan for `001-module-01-ros2` has been successfully generated.

## Outcome

- ✅ Impact: Created a detailed implementation plan for the ROS 2 module, outlining summary, technical context, constitution check, and project structure based on the spec.
- 🧪 Tests: Constitution Check passed.
- 📁 Files: Created `specs/001-module-01-ros2/plan.md`.
- 🔁 Next prompts: Proceed with `/sp.tasks`.
- 🧠 Reflection: Successfully generated an implementation plan aligned with the project constitution and spec, addressing the `setup-plan.ps1` script issue by making an initial commit.

## Evaluation notes (flywheel)

- Failure modes observed: N/A
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
