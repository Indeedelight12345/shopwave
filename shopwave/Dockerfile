# ==========================================
# Build Stage (Compile and package JAR)
# ==========================================
FROM maven:3.8.5-openjdk-17-slim AS build
WORKDIR /app

# Copy pom.xml and download dependencies (cached layer)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source code and build package
COPY src ./src
RUN mvn package -DskipTests

# ==========================================
# Run Stage (Lightweight JRE runtime)
# ==========================================
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Create a non-root group and user for security compliance
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

# Copy built JAR from compile stage
COPY --from=build /app/target/shopwave-1.0.0.jar app.jar

# Spring Boot default port
EXPOSE 8080

# Environment variables with sensible fallbacks
ENV DATABASE_HOST=postgres-db
ENV DATABASE_PORT=5432
ENV DATABASE_NAME=shopwave
ENV DATABASE_USERNAME=postgres
ENV DATABASE_PASSWORD=postgres

# Execution command
ENTRYPOINT ["java", "-jar", "app.jar"]
