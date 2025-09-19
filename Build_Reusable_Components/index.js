// Main entry point for the Reusable UI Components library
import { CustomButton } from "./src/components/index.js";

// Re-export components for easy importing
export { CustomButton, CustomButton as Button } from "./src/components/index.js";

// Auto-register components when this module is loaded
console.log("🎨 Reusable UI Components loaded successfully!");

// Example usage (optional - can be removed in production)
document.addEventListener("DOMContentLoaded", () => {
	console.log("Components are ready to use!");

	// Example: Add some interactive behavior
	const buttons = document.querySelectorAll("custom-button");
	buttons.forEach((button, index) => {
		button.addEventListener("button-click", (event) => {
			console.log(`Button ${index + 1} clicked:`, event.detail);
		});
	});
});
