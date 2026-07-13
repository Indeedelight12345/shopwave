package com.shopwave.controller;

import com.shopwave.model.Product;
import com.shopwave.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

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
        // Fetch a list of featured products (e.g., first 3) for the homepage banner
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
            
            // Get related products in the same category
            List<Product> related = productService.getProductsByCategory(product.getCategory());
            related.removeIf(p -> p.getId().equals(id));
            model.addAttribute("relatedProducts", related.subList(0, Math.min(related.size(), 3)));
            
            return "product-details";
        } else {
            model.addAttribute("errorMessage", "Product not found");
            return "error";
        }
    }
}
