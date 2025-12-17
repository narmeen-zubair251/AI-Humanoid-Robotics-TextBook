---
sidebar_position: 3
title: Using rclpy - Connecting Python Agents to ROS 2
---

Now that we understand the core concepts of ROS 2 (Nodes, Topics, and Services), let's explore how to interact with them using Python. ROS 2 provides a powerful client library called `rclpy` that allows Python developers to easily create ROS 2 Nodes and communicate with the rest of the robotic system.

## Setting up Your Python Environment

Before writing code, ensure you have ROS 2 and `rclpy` installed. You'll typically activate your ROS 2 environment first.

```bash
source /opt/ros/humble/setup.bash # Replace 'humble' with your ROS 2 distribution
```

## 1. Creating a Simple ROS 2 Node with `rclpy`

Every ROS 2 application starts with a Node. Here’s how to create a basic Node in Python:

```python
import rclpy
from rclpy.node import Node

class MinimalPublisher(Node):
    def __init__(self):
        super().__init__('minimal_publisher') # Node name
        self.publisher_ = self.create_publisher(String, 'topic', 10) # Topic name, QoS
        timer_period = 0.5  # seconds
        self.timer = self.create_timer(timer_period, self.timer_callback)
        self.i = 0

    def timer_callback(self):
        msg = String()
        msg.data = 'Hello ROS 2: %d' % self.i
        self.publisher_.publish(msg)
        self.get_logger().info('Publishing: "%s"' % msg.data)
        self.i += 1

def main(args=None):
    rclpy.init(args=args)

    minimal_publisher = MinimalPublisher()

    rclpy.spin(minimal_publisher) # Keep node alive

    # Destroy the node explicitly
    # (optional - otherwise it will be done automatically
    # when the garbage collector destroys the node object)
    minimal_publisher.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```
*To run this:* Save it as `minimal_publisher.py` and execute `python3 minimal_publisher.py`.
*In another terminal:* `ros2 topic echo /topic`

## 2. Publishing Messages to a Topic

Nodes communicate by publishing messages to topics. Let’s create a publisher that sends "Hello ROS 2" messages.

```python
# (Code example same as above for simplicity, highlighting the publisher_ and publish() lines)
# ... inside MinimalPublisher class ...
        self.publisher_ = self.create_publisher(String, 'chatter', 10) # Create a publisher
# ... inside timer_callback method ...
        msg = String()
        msg.data = 'Hello ROS 2: %d' % self.i
        self.publisher_.publish(msg) # Publish the message
```
Here, `String` is the message type (from `std_msgs.msg`), and `'chatter'` is the topic name. The `10` is the QoS (Quality of Service) history depth.

## 3. Subscribing to Messages from a Topic

Now, let's create a subscriber Node that listens to the messages published on the `'chatter'` topic.

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class MinimalSubscriber(Node):
    def __init__(self):
        super().__init__('minimal_subscriber')
        self.subscription = self.create_subscription(
            String,
            'chatter',
            self.listener_callback,
            10)
        self.subscription  # prevent unused variable warning

    def listener_callback(self, msg):
        self.get_logger().info('I heard: "%s"' % msg.data)

def main(args=None):
    rclpy.init(args=args)

    minimal_subscriber = MinimalSubscriber()

    rclpy.spin(minimal_subscriber)

    minimal_subscriber.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```
*To run this:* Save it as `minimal_subscriber.py` and execute `python3 minimal_subscriber.py`.
*In another terminal:* Run the `minimal_publisher.py` from the previous example. You should see the subscriber printing "I heard:..." messages.

## 4. Understanding Services with `rclpy`

Services provide a way for Nodes to send a request and receive a response. Let's look at a simple service example.

First, define a custom service type (e.g., in a `my_package/srv/AddTwoInts.srv` file):
```
int64 a
int64 b
---
int64 sum
```
Then, a service server:
```python
import rclpy
from rclpy.node import Node
from my_package.srv import AddTwoInts # Custom service type

class MinimalService(Node):
    def __init__(self):
        super().__init__('minimal_service')
        self.srv = self.create_service(AddTwoInts, 'add_two_ints', self.add_two_ints_callback)

    def add_two_ints_callback(self, request, response):
        response.sum = request.a + request.b
        self.get_logger().info('Incoming request: a: %d b: %d' % (request.a, request.b))
        return response

def main(args=None):
    rclpy.init(args=args)
    minimal_service = MinimalService()
    rclpy.spin(minimal_service)
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```
And a service client:
```python
import sys
import rclpy
from rclpy.node import Node
from my_package.srv import AddTwoInts # Custom service type

class MinimalClientAsync(Node):
    def __init__(self):
        super().__init__('minimal_client_async')
        self.cli = self.create_client(AddTwoInts, 'add_two_ints')
        while not self.cli.wait_for_service(timeout_sec=1.0):
            self.get_logger().info('service not available, waiting again...')
        self.req = AddTwoInts.Request()

    def send_request(self, a, b):
        self.req.a = a
        self.req.b = b
        self.future = self.cli.call_async(self.req)
        rclpy.spin_until_future_complete(self, self.future)
        return self.future.result()

def main(args=None):
    rclpy.init(args=args)
    minimal_client = MinimalClientAsync()
    response = minimal_client.send_request(int(sys.argv[1]), int(sys.argv[2]))
    minimal_client.get_logger().info(
        'Result of add_two_ints: for %d + %d = %d' %
        (int(sys.argv[1]), int(sys.argv[2]), response.sum))
    minimal_client.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```
*To run this:* Start the server: `python3 minimal_service.py`. In another terminal, run the client: `python3 minimal_client_async.py 2 3`.

These examples provide a solid foundation for building interactive Python applications within the ROS 2 ecosystem. Remember to check the official ROS 2 documentation for more advanced features and best practices!