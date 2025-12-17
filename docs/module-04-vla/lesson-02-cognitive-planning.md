---
sidebar_position: 3
---

# Cognitive Planning with LLMs

Building upon the ability to understand spoken commands, this chapter explores how Large Language Models (LLMs) can elevate robot intelligence by enabling sophisticated cognitive planning. Instead of rigid, pre-programmed routines, LLMs allow robots to translate high-level natural language goals into dynamic, structured action sequences, particularly within frameworks like ROS 2.

## 1. Translating Natural Language into Structured Plans

The core challenge in cognitive planning is converting an abstract human command into a concrete series of robot actions. LLMs excel here by leveraging their understanding of language and world knowledge.

### The Role of LLMs

LLMs act as intelligent interpreters and planners:
-   **Intent Recognition**: They discern the true goal behind a natural language command, even with ambiguity.
-   **Task Decomposition**: Complex goals are broken down into a series of simpler, achievable sub-tasks.
-   **Contextual Reasoning**: LLMs can factor in environmental context, robot capabilities, and desired outcomes to refine the plan.
-   **Action Sequence Generation**: They can generate sequences of actions, often represented as a plan graph or a list of robot primitives.

### Example: "Clean the Room"

Consider the command: "Clean the room." An LLM-powered cognitive planner might break this down as follows:

1.  **Identify Objects to Clean**: Scan the room visually (using VLA capabilities) for items that are out of place or dirty.
2.  **Prioritize Tasks**: Decide which items to address first (e.g., larger items before smaller ones, or items in the robot's immediate vicinity).
3.  **Generate Action Steps**: For each identified item, generate a sequence of actions:
    -   *For a toy on the floor*: `navigate_to_toy -> detect_toy -> grasp_toy -> navigate_to_toy_box -> place_toy_in_box`.
    -   *For a spilled drink*: `navigate_to_spill -> detect_spill -> grasp_cleaning_cloth -> wipe_spill -> navigate_to_laundry_bin -> place_cloth_in_bin`.
4.  **Handle Dependencies**: Ensure actions are ordered logically (e.g., cannot wipe a spill before grasping a cloth).

## 2. Structured ROS 2 Action Sequences

Robot Operating System 2 (ROS 2) provides a robust framework for building robot applications, including actions that represent long-running, goal-oriented tasks. LLMs can be instrumental in generating and managing these ROS 2 action sequences.

### ROS 2 Actions Overview

A ROS 2 Action typically involves:
-   **Goal**: The desired outcome (e.g., move to a specific pose).
-   **Feedback**: Updates on the action's progress.
-   **Result**: The final outcome of the action.

### LLM-Generated ROS 2 Action Sequences (Conceptual)

An LLM can output a plan that directly translates into a sequence of ROS 2 action calls.

```python
# Natural Language Command
command = "Clean the table by wiping it and putting away the empty cup."

# LLM-generated Plan (structured output, e.g., JSON)
llm_plan = {
    "steps": [
        {"action": "navigate_to_location", "parameters": {"location": "table_center"}},
        {"action": "detect_objects", "parameters": {"objects": ["empty_cup", "spill"]}},
        {"action": "grasp_object", "parameters": {"object": "empty_cup"}},
        {"action": "place_object", "parameters": {"object": "empty_cup", "location": "sink"}},
        {"action": "grasp_cleaning_cloth", "parameters": {}},
        {"action": "wipe_surface", "parameters": {"surface": "table_top", "duration": 5}},
        {"action": "place_object", "parameters": {"object": "cleaning_cloth", "location": "laundry_bin"}}
    ]
}

# Python function to execute LLM plan as ROS 2 actions
def execute_llm_plan(plan):
    for step in plan["steps"]:
        action_client = ros2_action_clients[step["action"]] # Get appropriate ROS 2 action client
        goal_msg = create_goal_message(step["parameters"]) # Create ROS 2 goal message
        action_client.send_goal_async(goal_msg)
        # ... wait for result, handle feedback
```

## 3. Task Decomposition and Reasoning in Robots

LLMs enable robots to perform advanced reasoning for task decomposition:
-   **Hierarchical Planning**: Breaking down a high-level goal into progressively smaller, more manageable sub-goals.
-   **Error Recovery**: If an action fails, the LLM can re-plan or suggest alternative strategies.
-   **Learning from Experience**: Over time, the LLM can refine its planning strategies based on the success or failure of previous attempts.

### Cognitive Planning Flow Diagram

```mermaid
graph TD
    A[Natural Language Goal] --> B{LLM: Intent Recognition};
    B --> C{LLM: Task Decomposition};
    C --> D{LLM: Action Sequence Generation};
    D --> E[Structured Plan (e.g., ROS 2 Actions)];
    E --> F[Robot Controller];
    F --> G[Robot Execution];
    G --> H{Sensor Feedback};
    H --> C;
```

## Conclusion

Cognitive planning with LLMs allows robots to move beyond pre-programmed behaviors towards genuine autonomy and adaptability. By seamlessly translating human intent into executable robot plans, LLMs are paving the way for robots that can understand, reason, and act intelligently in complex, unstructured environments. The next chapter will bring together all these concepts in a capstone example of an autonomous humanoid.
