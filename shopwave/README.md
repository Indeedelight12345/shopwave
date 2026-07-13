# 🌊 ShopWave — Java Spring Boot E-Commerce Web Application (Phase 1)

ShopWave is a modern, high-performance, single-view e-commerce portal engineered with **Spring Boot 3**, **Thymeleaf**, and **PostgreSQL**.

---

## 🛠️ Technology Stack
* **Backend**: Java 17, Spring Boot, Spring MVC, Spring Data JPA, Hibernate, Maven
* **Frontend**: Thymeleaf Engine, HTML5, Tailwind CSS, Lucide / FontAwesome, JavaScript
* **Database**: PostgreSQL (v15+)
* **DevOps**: Multi-stage secure Dockerfiles, Orchestrated Docker Compose

---

## ⚙️ Environment Variables
The application references database credentials from environment variables to prevent credentials hardcoding:
* `DATABASE_HOST`: Address of the PostgreSQL engine (e.g. `localhost` or `postgres-database`).
* `DATABASE_PORT`: Port of the database service (default `5432`).
* `DATABASE_NAME`: Database schema name (default `shopwave`).
* `DATABASE_USERNAME`: PostgreSQL username (default `postgres`).
* `DATABASE_PASSWORD`: PostgreSQL connection password.

---

## 🚀 How to Run the Application Locally

### Method 1: Running with Native Java and Local PostgreSQL (Manual)

#### 1. Start PostgreSQL
Install and start a local PostgreSQL server. Create a schema called `shopwave`:
```bash
# Run PostgreSQL locally in Docker if you don't have it installed
docker run --name local-postgres -e POSTGRES_DB=shopwave -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres_secure_pass -p 5432:5432 -d postgres:15-alpine
```

#### 2. Configure Environment Variables
Copy `.env.example` to `.env` or set them in your terminal session:
```bash
export DATABASE_HOST=localhost
export DATABASE_PORT=5432
export DATABASE_NAME=shopwave
export DATABASE_USERNAME=postgres
export DATABASE_PASSWORD=postgres_secure_pass
```

#### 3. Start Spring Boot using Maven
Compile and boot the server locally:
```bash
# Navigate to the shopwave folder
cd shopwave

# Compile and start the app
./mvnw spring-boot:run
```
Once started, the seeder will auto-populate products into your database. Access the site at:
* **UI Website**: `http://localhost:8080`
* **JSON API products list**: `http://localhost:8080/api/products`

---

### Method 2: Running with Docker (Single Container Build)

#### 1. Build the Docker Image
To package and build the multi-stage optimized image:
```bash
docker build -t shopwave-app:latest .
```

#### 2. Launch the Application Container
Execute the container and map internal Spring Boot `8080` to host `8080`:
```bash
docker run -p 8080:8080 \
  -e DATABASE_HOST=host.docker.internal \
  -e DATABASE_PORT=5432 \
  -e DATABASE_NAME=shopwave \
  -e DATABASE_USERNAME=postgres \
  -e DATABASE_PASSWORD=postgres_secure_pass \
  shopwave-app:latest
```

---

### Method 3: Running the Entire Stack with Docker Compose (Recommended)

This is the easiest and most robust option, orchestrating the Spring Boot application container, PostgreSQL database container, shared bridges, and volume persistence in one command.

#### 1. Run Docker Compose
```bash
# From the directory containing docker-compose.yml
docker compose up --build -d
```

#### 2. Check Service Health
```bash
docker compose ps
```

#### 3. Review Startup Logs
Check database initialization and database seeding progress:
```bash
docker compose logs -f shopwave-app
```

#### 4. Access the App
Open your browser and visit:
* **ShopWave Web Portal**: `http://localhost:8888` (or `http://localhost:8080` depending on port mappings)

#### 5. Stop the Stack
```bash
docker compose down -v
```
*(The `-v` flag also deletes the database storage. Omit it if you want your products and customer cart states to persist across restarts).*
