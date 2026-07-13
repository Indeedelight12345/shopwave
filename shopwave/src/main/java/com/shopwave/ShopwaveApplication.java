package com.shopwave;

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
                        "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=800"
                ));
                
                repository.save(new Product(
                        "WavePhone 15 Pro Max",
                        "Stunning titanium design smartphone with 6.7-inch Super Retina display, A17 Pro bionic chip, and 48MP triple camera system.",
                        1099.00,
                        "Electronics",
                        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800"
                ));
                
                repository.save(new Product(
                        "Chronos Smart Watch Ultra",
                        "Premium adventure and sports watch with dual-frequency GPS, 36-hour battery life, titanium case, and ocean bands.",
                        399.50,
                        "Accessories",
                        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800"
                ));
                
                repository.save(new Product(
                        "AeroPods Studio Pro",
                        "Over-ear high fidelity audio headphones with active hybrid noise cancellation, transparency modes, and spatial theater acoustics.",
                        299.99,
                        "Audio",
                        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800"
                ));

                repository.save(new Product(
                        "Minimalist Leather Wallet",
                        "Handcrafted slim bifold wallet made of full grain Italian leather with RFID blocking tech and quick card access slots.",
                        45.00,
                        "Accessories",
                        "https://images.unsplash.com/photo-1627124765135-56c33fc36eab?auto=format&fit=crop&q=80&w=800"
                ));

                repository.save(new Product(
                        "Ergonomic Active Task Chair",
                        "Fully adjustable premium office chair designed with orthopedic mesh backing and dynamic lumbar support to keep your posture straight.",
                        349.00,
                        "Home & Office",
                        "https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&q=80&w=800"
                ));

                System.out.println("PostgreSQL database successfully seeded with initial products catalog.");
            } else {
                System.out.println("Products catalog database already has data (" + repository.count() + " items). Skipping seed.");
            }
        };
    }
}
