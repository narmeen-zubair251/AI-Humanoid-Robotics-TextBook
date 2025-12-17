---
sidebar_position: 4
title: URDF for Humanoids - Describing Robot Structures
---

The Unified Robot Description Format (URDF) is an XML format used in ROS to describe all aspects of a robot. It's crucial for visualizing, simulating, and controlling robots. For humanoid robots, URDF allows us to define their complex body structures, joints, and sensors.

## What is URDF?

URDF defines a robot as a set of **links** and **joints**.

*   **Links:** These are the rigid bodies of the robot. Think of them as the robot's limbs, torso, and head. Each link has properties like its visual appearance (color, shape), collision properties (for physics simulation), and inertial properties (mass, center of mass).
*   **Joints:** These connect links together and define their relative motion. Joints can be of different types, such as:
    *   **Revolute:** Allows rotation around a single axis (like an elbow or knee).
    *   **Continuous:** Similar to revolute but without limits (like a wheel).
    *   **Prismatic:** Allows linear motion along a single axis (like a linear actuator).
    *   **Fixed:** No motion allowed between links (e.g., a sensor rigidly attached to a link).

## Basic URDF Structure Example

Let's consider a very simple humanoid-like structure: a torso with a head attached.

```xml
<?xml version="1.0"?>
<robot name="simple_humanoid">

  <!-- ======================== LINKS ======================== -->
  <link name="torso">
    <visual>
      <geometry>
        <box size="0.2 0.4 0.6"/> <!-- width depth height -->
      </geometry>
      <material name="blue">
        <color rgba="0 0 0.8 1"/>
      </material>
    </visual>
    <collision>
      <geometry>
        <box size="0.2 0.4 0.6"/>
      </geometry>
    </collision>
    <inertial>
      <mass value="10.0"/>
      <origin xyz="0 0 0.3"/>
      <inertia ixx="1.0" ixy="0.0" ixz="0.0" iyy="1.0" iyz="0.0" izz="1.0"/>
    </inertial>
  </link>

  <link name="head">
    <visual>
      <geometry>
        <sphere radius="0.1"/>
      </geometry>
      <material name="red">
        <color rgba="0.8 0 0 1"/>
      </material>
    </visual>
    <collision>
      <geometry>
        <sphere radius="0.1"/>
      </geometry>
    </collision>
    <inertial>
      <mass value="1.0"/>
      <origin xyz="0 0 0"/>
      <inertia ixx="0.1" ixy="0.0" ixz="0.0" iyy="0.1" iyz="0.0" izz="0.1"/>
    </inertial>
  </link>

  <!-- ======================== JOINTS ======================== -->
  <joint name="torso_to_head_joint" type="fixed">
    <parent link="torso"/>
    <child link="head"/>
    <origin xyz="0 0 0.4" rpy="0 0 0"/> <!-- Position of the head relative to the torso -->
  </joint>

</robot>
```

### Explaining the Elements

*   `<robot name="simple_humanoid">`: The root tag for the entire robot description.
*   `<link name="torso">`, `<link name="head">`: Defines the rigid bodies.
    *   `<visual>`: Describes how the link looks (e.g., a blue box for the torso, a red sphere for the head).
    *   `<collision>`: Describes the link's physical properties for collision detection.
    *   `<inertial>`: Describes the link's mass and inertia for physics simulation.
*   `<joint name="torso_to_head_joint" type="fixed">`: Connects the `torso` (parent) and `head` (child).
    *   `type="fixed"`: Means there's no movement between these two links. If we wanted the head to turn, we might use `type="revolute"`.
    *   `<parent link="torso"/>`, `<child link="head"/>`: Specifies which links are connected by this joint.
    *   `<origin xyz="0 0 0.4" rpy="0 0 0"/>`: Defines the transform (position and orientation) of the child link relative to the parent link. Here, the head is placed 0.4 meters above the torso's origin.

## Extending to Humanoids

For a full humanoid robot, you would define many more links (upper arms, forearms, hands, thighs, shins, feet) and connect them with appropriate joints (revolute for elbows, knees, shoulders, hips; fixed for sensors).

The power of URDF lies in its ability to describe complex kinematic chains, which are essential for inverse kinematics, motion planning, and simulating the robot's behavior in a virtual environment.

In advanced applications, you might also use Xacro, which is an XML macro language that allows for more concise and reusable URDF definitions, especially for highly articulated robots like humanoids.

This chapter provides a foundational understanding of URDF. As you progress in robotics, you'll find URDF (and Xacro) indispensable tools for defining your robot's physical structure.