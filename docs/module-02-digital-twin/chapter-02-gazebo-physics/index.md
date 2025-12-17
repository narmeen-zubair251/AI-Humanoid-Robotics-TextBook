---
title: Physics Simulation in Gazebo
sidebar_label: Gazebo Physics
slug: /gazebo-physics
---

# Physics Simulation in Gazebo

Gazebo is a powerful 3D robotics simulator that accurately models environments and robot dynamics, making it invaluable for testing robotic algorithms in a safe, virtual setting. At its core, Gazebo relies on a robust physics engine to simulate real-world interactions.

## Gazebo's Physics Engine

Gazebo is designed to be physics engine agnostic, supporting several popular options including:
-   **Open Dynamics Engine (ODE)**: The default and most commonly used engine, known for its stability and speed in rigid body dynamics.
-   **Bullet**: Offers good performance and a wide range of features, particularly for soft body dynamics and more complex collision shapes.
-   **DART**: Dynamic Animation and Robotics Toolkit, often used in academic research for its advanced control and contact modeling features.
-   **Simbody**: Focuses on biomechanics and human movement, providing highly accurate contact and joint dynamics.

These engines allow Gazebo to simulate forces, torques, gravity, collisions, and joint constraints, bringing virtual robots to life.

## Gravity and its Configuration

Gravity is a fundamental force in any realistic physics simulation. In Gazebo, it's defined within the `world` tag of a Simulation Description Format (SDF) file, which is the primary XML format used to describe worlds, robots, and other objects in Gazebo.

### Configuring Gravity

You can specify the gravity vector (x, y, z) in meters per second squared (m/s²). The default Earth gravity is `0 0 -9.8`.

```xml
<world name="default">
  <gravity>0 0 -9.8</gravity>
  <!-- Other world elements -->
</world>
```

-   **`x`, `y`**: Typically set to `0` for Earth-like gravity.
-   **`z`**: The magnitude of gravity along the vertical axis. A negative value indicates downward force.

You can also disable gravity entirely by setting all components to `0 0 0`, which can be useful for testing specific scenarios or objects in a zero-G environment.

## Collision Detection and Response

Accurate collision modeling is critical for realistic robot behavior. Gazebo distinguishes between visual models (for rendering) and collision models (for physics interactions).

### Collision Shapes

Collision models are typically simplified geometric shapes to reduce computational overhead for collision detection. Common shapes include:
-   **Box**: Defined by size (x, y, z).
-   **Sphere**: Defined by radius.
-   **Cylinder**: Defined by radius and length.
-   **Mesh**: More complex shapes, often simplified versions of the visual mesh. These are computationally more expensive.

### Defining Collisions in SDF

Collision properties are defined within the `<collision>` tag for a `link`.

```xml
<link name="base_link">
  <collision name="base_collision">
    <geometry>
      <box>
        <size>0.1 0.1 0.1</size>
      </box>
    </geometry>
    <surface>
      <friction>
        <ode>
          <mu>0.9</mu>   <!-- Coefficient of friction -->
          <mu2>0.9</mu2>  <!-- Second coefficient of friction -->
        </ode>
      </friction>
    </surface>
  </collision>
  <!-- Visual and other elements -->
</link>
```

-   **`geometry`**: Defines the shape of the collision body.
-   **`surface`**: Specifies physical properties like friction, restitution (bounciness), and contact parameters.

## Joints and their Properties

Joints connect links (rigid bodies) in a robot model, defining their relative motion. Gazebo supports various joint types, essential for articulated robots.

### Common Joint Types

-   **Revolute**: Allows rotation around a single axis (e.g., a wheel, a shoulder joint). Defined by a `limit` for range of motion.
-   **Continuous**: A revolute joint without limits (e.g., a continuously rotating motor).
-   **Prismatic**: Allows translation along a single axis (e.g., a linear actuator). Defined by a `limit` for range of motion.
-   **Fixed**: Constrains two links together, allowing no relative motion. Useful for connecting static parts.
-   **Ball**: Allows 3 degrees of freedom rotation around a point.
-   **Universal**: Allows 2 degrees of freedom rotation around two axes.

### Defining Joints in SDF

Joints are defined by connecting a `parent` link to a `child` link.

```xml
<joint name="shoulder_joint" type="revolute">
  <parent>base_link</parent>
  <child>arm_link</child>
  <axis>
    <xyz>0 0 1</xyz> <!-- Axis of rotation -->
    <limit lower="-1.57" upper="1.57" velocity="10" effort="100"/>
  </axis>
</joint>
```

-   **`type`**: Specifies the joint type.
-   **`parent`** and **`child`**: The names of the links being connected.
-   **`axis`**: Defines the joint's axis of motion.
-   **`limit`**: For revolute and prismatic joints, defines the `lower` and `upper` position limits, `velocity` limits, and `effort` limits.

## Robot Movement Mechanisms in Gazebo

Controlling a robot's movement in Gazebo often involves a combination of plugins, controllers, and interfaces. The Robot Operating System (ROS) provides a powerful ecosystem for this.

### Actuators and Controllers

-   **Motor Actuation**: In simulations, motors are typically modeled as applying torques or forces to joints. Gazebo plugins (e.g., `libgazebo_ros_force_system.so` or `libgazebo_ros_joint_state_publisher.so`) can be used to interface with these actuators.
-   **ROS Control**: A set of ROS packages that provide a generic controller architecture for robots. It allows you to define different types of controllers (e.g., position, velocity, effort controllers) and switch between them dynamically.

### Example: Moving a Simple Joint with ROS Control

1.  **Define a transmission**: In your robot's URDF/SDF, specify how a joint is actuated.
    ```xml
    <transmission name="shoulder_trans">
      <type>transmission_interface/SimpleTransmission</type>
      <joint name="shoulder_joint">
        <hardwareInterface>hardware_interface/PositionJointInterface</hardwareInterface>
      </joint>
      <actuator name="shoulder_motor">
        <hardwareInterface>hardware_interface/PositionJointInterface</hardwareInterface>
        <mechanicalReduction>1</mechanicalReduction>
      </actuator>
    </transmission>
    ```
2.  **Load a controller**: Use `ros_control` to load a joint position controller.
    ```bash
    roslaunch my_robot_gazebo my_robot_control.launch
    ```
3.  **Publish commands**: Send position commands to the controller via a ROS topic.
    ```bash
    rostopic pub /shoulder_joint_controller/command std_msgs/Float64 "data: 0.5"
    ```

## Setting up a Gazebo World

A Gazebo world is an SDF file that defines the environment, including static objects, light sources, and spawned robots.

### Key Steps for a Gazebo World

1.  **Create a `.world` file**: This XML file will contain all the world elements.
    ```xml
    <?xml version="1.0" ?>
    <sdf version="1.6">
      <world name="my_simple_world">
        <include>
          <uri>model://sun</uri>
        </include>
        <include>
          <uri>model://ground_plane</uri>
        </include>
        <!-- Add more models here -->
        <model name="my_box">
          <pose>0 0 0.5 0 0 0</pose>
          <link name="box_link">
            <visual name="visual">
              <geometry><box><size>1 1 1</size></box></geometry>
            </visual>
            <collision name="collision">
              <geometry><box><size>1 1 1</size></box></geometry>
            </collision>
          </link>
        </model>
      </world>
    </sdf>
    ```
2.  **Include models**: Use `<include>` tags to add pre-existing models (e.g., `sun`, `ground_plane`) or your custom robot models.
3.  **Define static objects**: Create `<model>` elements to define static objects in your environment (e.g., walls, furniture).
4.  **Configure light sources**: Adjust properties of included lights or define new ones.
5.  **Spawn your robot**: Often done via a separate ROS launch file that loads the robot's URDF/SDF and spawns it into the Gazebo world.

By mastering these foundational elements, you can create and manipulate realistic physics simulations within Gazebo, a critical step towards building effective Digital Twins for robotics.
