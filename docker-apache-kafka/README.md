# Kafka broker

1. Set up a Kafka broker
   The Docker Compose file below will run everything for you via Docker. Copy and paste it into a file named `docker-compose.yml` on your local filesystem.

```yaml
version: '3'
services:
  zookeeper:
    image: confluentinc/cp-zookeeper:7.3.0
    container_name: zookeeper
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000

  broker:
    image: confluentinc/cp-kafka:7.3.0
    container_name: broker
    ports:
      # To learn about configuring Kafka for access across networks see
      # https://www.confluent.io/blog/kafka-client-cannot-connect-to-broker-on-aws-on-docker-etc/
      - '9092:9092'
    depends_on:
      - zookeeper
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: 'zookeeper:2181'
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: PLAINTEXT:PLAINTEXT,PLAINTEXT_INTERNAL:PLAINTEXT
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://localhost:9092,PLAINTEXT_INTERNAL://broker:29092
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
      KAFKA_TRANSACTION_STATE_LOG_MIN_ISR: 1
      KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR: 1
```

2. Start the Kafka broker
   From a directory containing the `docker-compose.yml` file created in the previous step, run this command to start all services in the correct order.

```sh
docker-compose up -d
```

3. Create a topic
   Kafka stores messages in topics. It’s good practice to explicitly create them before using them, even if Kafka is configured to automagically create them when referenced.

Run this command to create a new topic into which we’ll write and read some test messages.

```sh
docker exec broker \
kafka-topics --bootstrap-server broker:9092 \
             --create \
             --topic quickstart
```

4. Write messages to the topic
   You can use the kafka-console-producer command line tool to write messages to a topic. This is useful for experimentation (and troubleshooting), but in practice you’ll use the Producer API in your application code, or Kafka Connect for pulling data in from other systems to Kafka.

Run this command. You’ll notice that nothing seems to happen—fear not! It is waiting for your input.

```sh
docker exec --interactive --tty broker \
kafka-console-producer --bootstrap-server broker:9092 \
                       --topic quickstart
```

Type in some lines of text. Each line is a new message.

```sh
this is my first kafka message
hello world!
this is my third kafka message. I’m on a roll :-D
```

When you’ve finished, press Ctrl-D to return to your command prompt.

5. Read messages from the topic
   Now that we’ve written message to the topic, we’ll read those messages back. Run this command to launch the kafka-console-consumer. The --from-beginning argument means that messages will be read from the start of the topic.

```sh
docker exec --interactive --tty broker \
kafka-console-consumer --bootstrap-server broker:9092 \
                       --topic quickstart \
                       --from-beginning
```

As before, this is useful for trialling things on the command line, but in practice you’ll use the Consumer API in your application code, or Kafka Connect for reading data from Kafka to push to other systems.

You’ll see the messages that you entered in the previous step.

this is my first kafka message
hello world!
this is my third kafka message. I’m on a roll :-D 6. Write some more messages
Leave the kafka-console-consumer command from the previous step running. If you’ve already closed it, just re-run it.

Now open a new terminal window and run the kafka-console-producer again.

```sh
docker exec --interactive --tty broker \
kafka-console-producer --bootstrap-server broker:9092 \
                       --topic quickstart
```

Enter some more messages and note how they are displayed almost instantaneously in the consumer terminal.

Press Ctrl-D to exit the producer, and Ctrl-C to stop the consumer.

7. Stop the Kafka broker
   Once you’ve finished, you can shut down the Kafka broker. Note that doing this will destroy all messages in the topics that you’ve written.

From a directory containing the docker-compose.yml file created earlier, run this command to stop all services in the correct order.

```sh
docker-compose down
```

[Reference](https://developer.confluent.io/quickstart/kafka-docker/)
