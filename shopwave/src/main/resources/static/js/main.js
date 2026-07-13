/**
 * ShopWave E-Commerce Client Scripts
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log("ShopWave Thymeleaf frontend loaded successfully.");

    // Simple interaction to simulate adding items to a basket
    const cartCountElement = document.querySelector('.relative span');
    const addToCartButtons = document.querySelectorAll('button');

    addToCartButtons.forEach(button => {
        if (button.textContent.includes('Add to WaveBag') || button.querySelector('.fa-cart-shopping')) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Visual feedback
                const originalContent = button.innerHTML;
                button.disabled = true;
                button.innerHTML = `<i class="fa-solid fa-circle-check animate-pulse"></i> Added!`;
                button.classList.add('bg-emerald-600', 'hover:bg-emerald-500');
                
                // Increment cart counter mock
                if (cartCountElement) {
                    let currentCount = parseInt(cartCountElement.textContent) || 0;
                    cartCountElement.textContent = currentCount + 1;
                }

                setTimeout(() => {
                    button.disabled = false;
                    button.innerHTML = originalContent;
                    button.classList.remove('bg-emerald-600', 'hover:bg-emerald-500');
                }, 2000);
            });
        }
    });
});
