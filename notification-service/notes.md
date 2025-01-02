### Command used to run kafka as a docker container

```
    docker run -d \
    --name kafka \
    -p 9092:9092 \
    -p 9093:9093 \
    -e CLUSTER_ID='kxP81QK5T4a4I5MUj6W4CA' \
    -e KAFKA_PROCESS_ROLES=broker,controller \
    -e KAFKA_NODE_ID=1 \
    -e KAFKA_CONTROLLER_QUORUM_VOTERS=1@localhost:9093 \
    -e KAFKA_LISTENERS=PLAINTEXT://0.0.0.0:9092,CONTROLLER://0.0.0.0:9093 \
    -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092 \
    -e KAFKA_CONTROLLER_LISTENER_NAMES=CONTROLLER \
    -e KAFKA_LOG_DIRS=/tmp/kraft-combined-logs \
    -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 \
    -v /tmp/kraft-combined-logs:/tmp/kraft-combined-logs \
    confluentinc/cp-kafka:latest
```

### Command used to create kafka topic

```
docker exec -it kafka kafka-topics --create \
  --topic appointment-notifications \
  --bootstrap-server localhost:9092 \
  --partitions 1 \
  --replication-factor 1
 ```

