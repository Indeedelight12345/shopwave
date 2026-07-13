// Simulated Product Database
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "EliteBook Gaming Pro",
    description: "High performance gaming laptop with 32GB RAM, 1TB SSD, and NVIDIA RTX 4080 graphic card for ultimate gaming and development.",
    price: 1499.99,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    name: "WavePhone 15 Pro Max",
    description: "Stunning titanium design smartphone with 6.7-inch Super Retina display, A17 Pro bionic chip, and 48MP triple camera system.",
    price: 1099.00,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    name: "Chronos Smart Watch Ultra",
    description: "Premium adventure and sports watch with dual-frequency GPS, 36-hour battery life, titanium case, and ocean bands.",
    price: 399.50,
    category: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    name: "AeroPods Studio Pro",
    description: "Over-ear high fidelity audio headphones with active hybrid noise cancellation, transparency modes, and spatial theater acoustics.",
    price: 299.99,
    category: "Audio",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 5,
    name: "Minimalist Leather Wallet",
    description: "Handcrafted slim bifold wallet made of full grain Italian leather with RFID blocking tech and quick card access slots.",
    price: 45.00,
    category: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1627124765135-56c33fc36eab?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 6,
    name: "Ergonomic Active Task Chair",
    description: "Fully adjustable premium office chair designed with orthopedic mesh backing and dynamic lumbar support to keep your posture straight.",
    price: 349.00,
    category: "Home & Office",
    imageUrl: "https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 7,
    name: "Spectra Pro OLED Monitor",
    description: "34-inch curved ultra-wide OLED display with 240Hz refresh rate, true 10-bit color depth, and high-speed Thunderbolt 4 connectivity.",
    price: 699.99,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 8,
    name: "AcousticWave Soundbar Duo",
    description: "Premium room-filling soundbar pairing with a dynamic wireless subwoofer, full Dolby Atmos rendering, and dual-band Wi-Fi connection.",
    price: 180.00,
    category: "Audio",
    imageUrl: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 9,
    name: "Lumina Ambient Desk Light",
    description: "Smart architectural desk lamp featuring full RGB color settings, schedule-based focus timers, integrated fast MagSafe charger, and simple gestures.",
    price: 89.00,
    category: "Home & Office",
    imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 10,
    name: "Titanium Mechanical Keyboard",
    description: "Full-anodized metal enclosure hot-swappable gaming keyboard featuring linear silent dampening switches and artisan coiled cable bindings.",
    price: 220.00,
    category: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 11,
    name: "HydroGrip Thermal Flask",
    description: "Double-walled vacuum insulated premium stainless steel bottle carrying zero heat leakage, complete with magnetic latch cap and anti-skid grip.",
    price: 35.00,
    category: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 12,
    name: "AeroCharge Multi-Power Pad",
    description: "3-in-1 fast-charging hub machined from a single block of aerospace aluminum, designed to safely power phones, buds, and smartwatches.",
    price: 75.00,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1622445262465-2481c4574875?auto=format&fit=crop&q=80&w=800"
  }
];

export interface FileNode {
  name: string;
  path: string;
  content: string;
  description: string;
  language: string;
}

export const JAVA_FILES: Record<string, FileNode> = {
  "pom.xml": {
    name: "pom.xml",
    path: "shopwave/pom.xml",
    language: "xml",
    description: "Maven configuration declaring Spring Boot starter packs, Thymeleaf engine, JPA, and PostgreSQL drivers.",
    content: `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.5</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>com.shopwave</groupId>
    <artifactId>shopwave</artifactId>
    <version>1.0.0</version>
    <name>shopwave</name>
    <description>ShopWave Java Spring Boot E-Commerce Web Application (Phase 1)</description>
    
    <properties>
        <java.version>17</java.version>
    </properties>
    
    <dependencies>
        <!-- Spring Boot Starters -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-thymeleaf</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        
        <!-- PostgreSQL Driver -->
        <dependency>
            <groupId>org.postgresql</groupId>
            <artifactId>postgresql</artifactId>
            <scope>runtime</scope>
        </dependency>
        
        <!-- DevTools for local development reload -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
        
        <!-- Spring Boot Test -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>`
  },
  "Product.java": {
    name: "Product.java",
    path: "shopwave/src/main/java/com/shopwave/model/Product.java",
    language: "java",
    description: "JPA Hibernate persistence model mapping products catalog records to the PostgreSQL relational table schema.",
    content: `package com.shopwave.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private double price;

    @Column(nullable = false)
    private String category;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "created_date")
    private LocalDateTime createdDate;

    // Constructors
    public Product() {
        this.createdDate = LocalDateTime.now();
    }

    public Product(String name, String description, double price, String category, String imageUrl) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.imageUrl = imageUrl;
        this.createdDate = LocalDateTime.now();
    }

    // Getters and Setters...
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public LocalDateTime getCreatedDate() { return createdDate; }
    public void setCreatedDate(LocalDateTime createdDate) { this.createdDate = createdDate; }
}`
  },
  "ProductRepository.java": {
    name: "ProductRepository.java",
    path: "shopwave/src/main/java/com/shopwave/repository/ProductRepository.java",
    language: "java",
    description: "Spring Data JPA Repository providing transactional CRUD capabilities and specialized query filters.",
    content: `package com.shopwave.repository;

import com.shopwave.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategoryIgnoreCase(String category);
}`
  },
  "ProductService.java": {
    name: "ProductService.java",
    path: "shopwave/src/main/java/com/shopwave/service/ProductService.java",
    language: "java",
    description: "Service layer managing transacted query requests, caching, and custom business workflow operations.",
    content: `package com.shopwave.service;

import com.shopwave.model.Product;
import com.shopwave.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategoryIgnoreCase(category);
    }

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}`
  },
  "ProductController.java": {
    name: "ProductController.java",
    path: "shopwave/src/main/java/com/shopwave/controller/ProductController.java",
    language: "java",
    description: "Spring MVC Web Controller rendering Thymeleaf pages (homepage, catalog, details) with dynamic data injections.",
    content: `package com.shopwave.controller;

import com.shopwave.model.Product;
import com.shopwave.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/")
    public String index(Model model) {
        List<Product> allProducts = productService.getAllProducts();
        List<Product> featured = allProducts.subList(0, Math.min(allProducts.size(), 4));
        model.addAttribute("featuredProducts", featured);
        model.addAttribute("title", "ShopWave - Discover Premium Goods");
        return "index";
    }

    @GetMapping("/products")
    public String products(@RequestParam(value = "category", required = false) String category, Model model) {
        List<Product> products;
        if (category != null && !category.trim().isEmpty()) {
            products = productService.getProductsByCategory(category);
            model.addAttribute("selectedCategory", category);
        } else {
            products = productService.getAllProducts();
            model.addAttribute("selectedCategory", "All");
        }
        model.addAttribute("products", products);
        model.addAttribute("title", "ShopWave - Browse All Products");
        return "products";
    }

    @GetMapping("/products/{id}")
    public String productDetails(@PathVariable("id") Long id, Model model) {
        Optional<Product> productOpt = productService.getProductById(id);
        if (productOpt.isPresent()) {
            Product product = productOpt.get();
            model.addAttribute("product", product);
            model.addAttribute("title", "ShopWave - " + product.getName());
            
            List<Product> related = productService.getProductsByCategory(product.getCategory());
            related.removeIf(p -> p.getId().equals(id));
            model.addAttribute("relatedProducts", related.subList(0, Math.min(related.size(), 3)));
            return "product-details";
        } else {
            model.addAttribute("errorMessage", "Product not found");
            return "error";
        }
    }
}`
  },
  "ProductApiController.java": {
    name: "ProductApiController.java",
    path: "shopwave/src/main/java/com/shopwave/controller/ProductApiController.java",
    language: "java",
    description: "RESTful Controller mapping HTTP API queries, enabling client-side Ajax integrations and machine access.",
    content: `package com.shopwave.controller;

import com.shopwave.model.Product;
import com.shopwave.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
public class ProductApiController {

    private final ProductService productService;

    @Autowired
    public ProductApiController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts(@RequestParam(value = "category", required = false) String category) {
        if (category != null && !category.trim().isEmpty()) {
            return ResponseEntity.ok(productService.getProductsByCategory(category));
        }
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable("id") Long id) {
        Optional<Product> productOpt = productService.getProductById(id);
        return productOpt.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}`
  },
  "ShopwaveApplication.java": {
    name: "ShopwaveApplication.java",
    path: "shopwave/src/main/java/com/shopwave/ShopwaveApplication.java",
    language: "java",
    description: "Application entry point running the Spring IOC micro-kernel and triggering catalog seeders if empty.",
    content: `package com.shopwave;

import com.shopwave.model.Product;
import com.shopwave.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ShopwaveApplication {

    public static void main(String[] args) {
        SpringApplication.run(ShopwaveApplication.class, args);
    }

    @Bean
    public CommandLineRunner demoData(ProductRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                System.out.println("No products found in PostgreSQL. Seeding initial catalog...");
                
                repository.save(new Product(
                    "EliteBook Gaming Pro",
                    "High performance gaming laptop with 32GB RAM, 1TB SSD, and NVIDIA RTX 4080 graphic card for ultimate gaming and development.",
                    1499.99,
                    "Electronics",
                    "https://images.unsplash.com/photo-1603302576837-37561b2e2302"
                ));
                // Add phone, watch, headphones, chair, wallet...
                System.out.println("PostgreSQL database successfully seeded with initial products catalog.");
            }
        };
    }
}`
  },
  "application.properties": {
    name: "application.properties",
    path: "shopwave/src/main/resources/application.properties",
    language: "properties",
    description: "Standard application property configurations mapping ports, Thymeleaf, and externalized env database drivers.",
    content: `# Port Configuration
server.port=8080

# PostgreSQL Connection config using Environment Variables
spring.datasource.url=jdbc:postgresql://\${DATABASE_HOST:localhost}:\${DATABASE_PORT:5432}/\${DATABASE_NAME:shopwave}
spring.datasource.username=\${DATABASE_USERNAME:postgres}
spring.datasource.password=\${DATABASE_PASSWORD:postgres}
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA / Hibernate Configurations
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# Thymeleaf Template Configuration
spring.thymeleaf.prefix=classpath:/templates/
spring.thymeleaf.suffix=.html
spring.thymeleaf.mode=HTML
spring.thymeleaf.encoding=UTF-8
spring.thymeleaf.cache=false`
  },
  "index.html": {
    name: "index.html",
    path: "shopwave/src/main/resources/templates/index.html",
    language: "html",
    description: "Homepage Thymeleaf template rendering the banner, category grids, featured items, and customer reviews.",
    content: `<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org" lang="en">
<head>
    <title th:text="\${title}">ShopWave - Premium Goods</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 text-gray-900 flex flex-col min-h-screen">
    <!-- Navigation -->
    <header class="bg-white/80 border-b border-gray-200 sticky top-0 z-50">...</header>
    
    <!-- Hero Banner -->
    <section class="bg-slate-900 py-24 text-center">
        <h1 th:text="'Ride the Wave of Premium Shopping'"></h1>
        <a href="/products" class="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl">Shop Catalog</a>
    </section>

    <!-- Loop on Featured Products -->
    <section class="py-16">
        <div class="grid grid-cols-4 gap-8">
            <div th:each="product : \${featuredProducts}" class="group bg-white rounded-2xl border">
                <img th:src="\${product.imageUrl}" class="w-full h-full object-cover">
                <h3 th:text="\${product.name}">Product Name</h3>
                <span th:text="'$' + \${product.price}">Price</span>
                <a th:href="@{/products/{id}(id=\${product.id})}">View Details</a>
            </div>
        </div>
    </section>
</body>
</html>`
  },
  "Dockerfile": {
    name: "Dockerfile",
    path: "shopwave/Dockerfile",
    language: "dockerfile",
    description: "Production-style multi-stage file separating the heavy JDK compilation layer from the slim JRE running container.",
    content: `# ==========================================
# Build Stage (Compile and package JAR)
# ==========================================
FROM maven:3.8.5-openjdk-17-slim AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn package -DskipTests

# ==========================================
# Run Stage (Lightweight JRE runtime)
# ==========================================
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring
COPY --from=build /app/target/shopwave-1.0.0.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]`
  },
  "docker-compose.yml": {
    name: "docker-compose.yml",
    path: "shopwave/docker-compose.yml",
    language: "yaml",
    description: "Compose manifest connecting the Spring Boot service to PostgreSQL Alpine with persistent state volumes.",
    content: `version: '3.8'

services:
  postgres-database:
    image: postgres:15-alpine
    container_name: shopwave-postgres
    ports:
      - "5432:5432"
    environment:
      POSTGRES_DB: \${DATABASE_NAME:-shopwave}
      POSTGRES_USER: \${DATABASE_USERNAME:-postgres}
      POSTGRES_PASSWORD: \${DATABASE_PASSWORD:-postgres_secure_pass}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - shopwave-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres -d shopwave"]
      interval: 5s
      timeout: 5s
      retries: 5

  shopwave-app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: shopwave-app
    ports:
      - "8888:8080"
    environment:
      DATABASE_HOST: postgres-database
      DATABASE_PORT: 5432
      DATABASE_NAME: \${DATABASE_NAME:-shopwave}
      DATABASE_USERNAME: \${DATABASE_USERNAME:-postgres}
      DATABASE_PASSWORD: \${DATABASE_PASSWORD:-postgres_secure_pass}
    depends_on:
      postgres-database:
        condition: service_healthy
    networks:
      - shopwave-network

networks:
  shopwave-network:
    driver: bridge

volumes:
  postgres_data:
    driver: local`
  }
};
