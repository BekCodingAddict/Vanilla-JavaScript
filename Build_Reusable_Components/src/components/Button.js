/**
 * Reusable Button Custom Element Component
 *
 * Usage:
 * <custom-button
 *   variant="primary"
 *   size="medium"
 *   disabled="false"
 *   loading="false"
 *   onclick="handleClick()"
 * >
 *   Button Text
 * </custom-button>
 */

class CustomButton extends HTMLElement {
	constructor() {
		super();

		// Create shadow DOM for encapsulation
		this.attachShadow({ mode: "open" });

		// Bind methods
		this.handleClick = this.handleClick.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
	}

	// Define which attributes to observe for changes
	static get observedAttributes() {
		return ["variant", "size", "disabled", "loading", "type", "class"];
	}

	// Called when the element is added to the DOM
	connectedCallback() {
		this.render();
		this.attachEventListeners();
	}

	// Called when the element is removed from the DOM
	disconnectedCallback() {
		this.removeEventListeners();
	}

	// Called when observed attributes change
	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue !== newValue) {
			this.render();
		}
	}

	// Get component properties
	get variant() {
		return this.getAttribute("variant") || "primary";
	}

	get size() {
		return this.getAttribute("size") || "medium";
	}

	get disabled() {
		return this.hasAttribute("disabled");
	}

	get loading() {
		return this.hasAttribute("loading");
	}

	get type() {
		return this.getAttribute("type") || "button";
	}

	get buttonText() {
		return this.textContent.trim();
	}

	// Render the component
	render() {
		const variant = this.variant;
		const size = this.size;
		const disabled = this.disabled;
		const loading = this.loading;
		const type = this.type;
		const buttonText = this.buttonText;

		// Create CSS classes
		const baseClass = "btn";
		const variantClass = `btn_${variant}`;
		const sizeClass = size !== "medium" ? `btn_${size}` : "";
		const loadingClass = loading ? "btn_loading" : "";
		const disabledClass = disabled ? "btn_disabled" : "";

		// Combine all classes
		const allClasses = [baseClass, variantClass, sizeClass, loadingClass, disabledClass].filter(Boolean).join(" ");

		// Create the button HTML
		this.shadowRoot.innerHTML = `
      <style>
        :root {
	/* Button Primary Colors */
	--buttonPrimaryNormal: #3b82f6;
	--buttonPrimaryHover: #2563eb;
	--buttonPrimaryPressed: #1d4ed8;

	/* Button Disabled Colors */
	--buttonDisabledBg: #e5e7eb;
	--gray500: #6b7280;

	/* White */
	--white: #ffffff;

	/* Button Secondary Colors */
	--buttonSecondaryNormal: #f3f4f6;
	--buttonSecondaryHover: #e5e7eb;
	--buttonSecondaryPressed: #d1d5db;
	--buttonSecondaryText: #111827;

	/* Button Danger Colors */
	--buttonDangerNormal: #ef4444;
	--buttonDangerHover: #dc2626;
	--buttonDangerPressed: #b91c1c;

	/* Button Success Colors */
	--buttonSuccessNormal: #10b981;
	--buttonSuccessHover: #059669;
	--buttonSuccessPressed: #047857;

	/* Button Warning Colors */
	--buttonWarningNormal: #f59e0b;
	--buttonWarningHover: #d97706;
	--buttonWarningPressed: #b45309;
	--buttonWarningText: #ffffff;

	/* Button Sizes */
	--buttonPaddingSmall: 0.25rem 0.75rem;
	--buttonPaddingMedium: 0.5rem 1rem;
	--buttonPaddingLarge: 0.75rem 1.5rem;

	--buttonFontSizeSmall: 0.875rem;
	--buttonFontSizeMedium: 1rem;
	--buttonFontSizeLarge: 1.125rem;

	/* Border Radius */
	--buttonBorderRadius: 0.375rem;

	/* Transitions */
	--buttonTransition: all 0.2s ease-in-out;
}


/* Base Button Styles */
.btn_primary,
.btn_secondary,
.btn_danger,
.btn_success,
.btn_warning {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: var(--buttonPaddingMedium);
	font-size: var(--buttonFontSizeMedium);
	font-weight: 400;
	border: none;
	border-radius: var(--buttonBorderRadius);
	cursor: pointer;
	transition: var(--buttonTransition);
	text-decoration: none;
	user-select: none;
	outline: none;
	position: relative;
	overflow: hidden;
}

.btn_primary:focus,
.btn_secondary:focus,
.btn_danger:focus,
.btn_success:focus,
.btn_warning:focus {
	outline: 2px solid var(--buttonPrimaryNormal);
	outline-offset: 2px;
}

.btn_primary:active,
.btn_secondary:active,
.btn_danger:active,
.btn_success:active,
.btn_warning:active {
	transform: scale(0.97);
}

/* Primary Button */
.btn_primary {
	background-color: var(--buttonPrimaryNormal);
	color: var(--white);
}

.btn_primary:hover {
	background-color: var(--buttonPrimaryHover);
}

.btn_primary:active {
	background-color: var(--buttonPrimaryPressed);
}

.btn_primary:disabled {
	background-color: var(--buttonDisabledBg);
	color: var(--gray500);
	cursor: not-allowed;
	transform: none;
}

/* Secondary Button */
.btn_secondary {
	background-color: var(--buttonSecondaryNormal);
	color: var(--buttonSecondaryText);
	border: 1px solid var(--buttonSecondaryHover);
}

.btn_secondary:hover {
	background-color: var(--buttonSecondaryHover);
}

.btn_secondary:active {
	background-color: var(--buttonSecondaryPressed);
}

.btn_secondary:disabled {
	background-color: var(--buttonDisabledBg);
	color: var(--gray500);
	border-color: var(--buttonDisabledBg);
	cursor: not-allowed;
	transform: none;
}

/* Danger Button */
.btn_danger {
	background-color: var(--buttonDangerNormal);
	color: var(--white);
}

.btn_danger:hover {
	background-color: var(--buttonDangerHover);
}

.btn_danger:active {
	background-color: var(--buttonDangerPressed);
}

.btn_danger:disabled {
	background-color: var(--buttonDisabledBg);
	color: var(--gray500);
	cursor: not-allowed;
	transform: none;
}

/* Success Button */
.btn_success {
	background-color: var(--buttonSuccessNormal);
	color: var(--white);
}

.btn_success:hover {
	background-color: var(--buttonSuccessHover);
}

.btn_success:active {
	background-color: var(--buttonSuccessPressed);
}

.btn_success:disabled {
	background-color: var(--buttonDisabledBg);
	color: var(--gray500);
	cursor: not-allowed;
	transform: none;
}

/* Warning Button */
.btn_warning {
	background-color: var(--buttonWarningNormal);
	color: var(--buttonWarningText);
}

.btn_warning:hover {
	background-color: var(--buttonWarningHover);
}

.btn_warning:active {
	background-color: var(--buttonWarningPressed);
}

.btn_warning:disabled {
	background-color: var(--buttonDisabledBg);
	color: var(--gray500);
	cursor: not-allowed;
	transform: none;
}

/* Button Sizes */
.btn_small {
	padding: var(--buttonPaddingSmall);
	font-size: var(--buttonFontSizeSmall);
}

.btn_large {
	padding: var(--buttonPaddingLarge);
	font-size: var(--buttonFontSizeLarge);
}

/* Button States */
.btn_loading {
	position: relative;
	color: transparent;
}

.btn_loading::after {
	content: "";
	position: absolute;
	width: 16px;
	height: 16px;
	top: 50%;
	left: 50%;
	margin-left: -8px;
	margin-top: -8px;
	border: 2px solid transparent;
	border-top-color: currentColor;
	border-radius: 50%;
	animation: button-spin 1s linear infinite;
}

@keyframes button-spin {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}

/* Icon Support */
.btn_icon {
	display: inline-flex;
	align-items: center;
	gap: 0.5rem;
}

.btn_icon svg {
	width: 1rem;
	height: 1rem;
	fill: currentColor;
}

        
        /* Additional shadow DOM specific styles */
        :host {
          display: inline-block;
        }
        
        button {
          width: 100%;
          height: 100%;
        }
        
        /* Ensure proper focus handling */
        :host(:focus-within) button {
          outline: 2px solid var(--buttonPrimaryNormal);
          outline-offset: 2px;
        }
      </style>
      
      <button 
        type="${type}"
        class="${allClasses}"
        ${disabled ? "disabled" : ""}
        ${loading ? 'aria-busy="true"' : ""}
        tabindex="${disabled ? "-1" : "0"}"
      >
        ${loading ? "" : buttonText}
      </button>
    `;
	}

	// Attach event listeners
	attachEventListeners() {
		const button = this.shadowRoot.querySelector("button");
		if (button) {
			button.addEventListener("click", this.handleClick);
			button.addEventListener("keydown", this.handleKeyDown);
		}
	}

	// Remove event listeners
	removeEventListeners() {
		const button = this.shadowRoot.querySelector("button");
		if (button) {
			button.removeEventListener("click", this.handleClick);
			button.removeEventListener("keydown", this.handleKeyDown);
		}
	}

	// Handle click events
	handleClick(event) {
		if (this.disabled || this.loading) {
			event.preventDefault();
			event.stopPropagation();
			return;
		}

		// Dispatch custom event
		const customEvent = new CustomEvent("button-click", {
			detail: {
				variant: this.variant,
				text: this.buttonText,
				originalEvent: event,
			},
			bubbles: true,
			cancelable: true,
		});

		this.dispatchEvent(customEvent);

		// Call onclick if defined
		const onclick = this.getAttribute("onclick");
		if (onclick) {
			try {
				// Create a function from the onclick string
				const func = new Function("event", onclick);
				func.call(this, event);
			} catch (error) {
				console.error("Error executing onclick handler:", error);
			}
		}
	}

	// Handle keyboard events
	handleKeyDown(event) {
		if (this.disabled || this.loading) {
			return;
		}

		// Handle Enter and Space key presses
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			this.handleClick(event);
		}
	}

	// Public methods for programmatic control
	setLoading(loading) {
		if (loading) {
			this.setAttribute("loading", "");
		} else {
			this.removeAttribute("loading");
		}
	}

	setDisabled(disabled) {
		if (disabled) {
			this.setAttribute("disabled", "");
		} else {
			this.removeAttribute("disabled");
		}
	}

	setVariant(variant) {
		this.setAttribute("variant", variant);
	}

	setSize(size) {
		this.setAttribute("size", size);
	}

	// Method to get button state
	getState() {
		return {
			variant: this.variant,
			size: this.size,
			disabled: this.disabled,
			loading: this.loading,
			text: this.buttonText,
		};
	}
}

// Register the custom element
customElements.define("custom-button", CustomButton);

// Export for module usage
export default CustomButton;
