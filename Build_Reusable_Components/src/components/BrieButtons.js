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

class BrieButton extends HTMLElement {
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
		return this.getAttribute("variant") || "primary"; // primary, secondary, neutral, text, rounded, floating, outline
	}

	get size() {
		return this.getAttribute("size") || "XS"; // XL, L, M, S, XS
	}

	get disabled() {
		return this.hasAttribute("disabled");
	}

	get loading() {
		return this.hasAttribute("loading");
	}

	get type() {
		return this.getAttribute("type") || "button"; // button, submit, reset
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

		const variantClass = `btn_${variant}`;
		const sizeClass = size !== "btn_size_S" ? `btn_size_${size}` : "";
		const loadingClass = loading ? "btn_loading" : "";
		const disabledClass = disabled ? "btn_disabled" : "";

		// Combine all classes
		const allClasses = [variantClass, sizeClass, loadingClass, disabledClass, "btn_radius_8"].filter(Boolean).join(" ");

		// Create the button HTML
		this.shadowRoot.innerHTML = `
      <style>
       :root {
	/* basic colors  */
	--black: #000;
	--white: #fff;
	--gray10: #f8f8f8;
	--gray20: #f4f4f4;
	--gray30: #eaedf4;
	--gray40: #d7d7d7;
	--gray50: #b4c0d3;
	--gray60: #a0a0a0;
	--gray70: #8491a7;
	--gray80: #666666;
	--gray90: #5c667b;
	--gray100: #49526a;
	--gray110: #373f57;
	--gray120: #292e41;
	--gray130: #151822;
	--orange: #f1af2c;
	--blue30: #cbe1fa;
	--blue70: #71a7ef;
	--blue90: #3d89ec;

	/* app theme colors */
	--colorPrimary: #5d5a88;
	--colorPrimaryLight: #94d1f9;
	--colorSecondary: #23a6f0;
	/* --colorSecondaryLight: #f0a8ae; */

	/* text colors */
	--textPrimary: var(--gray130);
	--textSecondary: var(--gray110);
	--textTertiary: var(--gray70);
	--textQuaternary: var(--gray40);

	/* border colors */
	--borderPrimary: var(--colorPrimary);
	--borderSecondary: var(--gray40);
	--borderGrayDark: var(--gray90);
	--borderGrayLight: var(--gray40);

	/* checkbox colors */
	--checkboxDisableBg: var(--white);
	--checkboxEnableBg: var(--colorPrimary);
	--checkboxBorder: var(--borderGrayDark);
	--checkboxIcon: var(--white);

	/* button colors */
	--buttonPrimaryBg: var(--colorPrimary);
	--buttonPrimaryText: var(--white);
	--buttonSecondaryBg: var(--colorSecondary);
	--buttonSecondaryText: var(--white);
	--buttonDisabledBg: var(--gray40);
	--buttonDisabledText: var(--gray80);

	/* input colors */
	--inputBorder: var(--borderGrayLight);
	--inputPlaceHolder: var(--textTertiary);
	--labelText: var(--textPrimary);

	/* COLORS  */
	/* --colorPrimary: #5d5a88; */
	--colorGray: #dadada;
	--colorGrayLight: #f2f4f8;
	/* --btnPrimaryBg: #5d5a88;
	--btnPrimaryText: #ffffff;
	--btnSecondaryBg: #23a6f0;
	--btnSecondaryText: #ffffff;
	--btnDisabledBg: #dadada;
	--btnDisabledText: #707070; */
	--btnEnabledBg: #5d5a88;
	--btnEnabledText: #ffffff;
	--outlineBtnText: #5d5a88;
	--outlineBtnBorder: #d4d2e3;
	--outlineBtnBg: #ffffff;
	--floatingBtnBg: #23a6f0;
	--floatingBtnText: #ffffff;

	--textPrimaryBg: #f2f2f2;
	/* --borderGray: #d4d2e3;
	--borderPrimary: #e4e5e8;
	--borderSecondary: #d9d9d9; */
	--linkPrimary: #001d6c;
	--linkSecondary: #9a9a9a;
	/* --inputBorder: #dadada;
	--inputPlaceHolder: #b5b5b5;
	--labelText: #21272a; */
	--primaryHeadingText: #313131;
	--radioDisable: #5c667b;
	--radioEnable: #5785ff;
	--radioHover: #eaedf4;
	/* --checkboxDisableBg: #ffffff;
	--checkboxEnableBg: #5785ff;
	--checkboxBorder: #5c667b;
	--checkboxIcon: #ffffff; */

	--modalBg: #ffffff;
	--bannerBg: #eeeeee;
	--outlineText: #d9d9d9;
	--emphasisText: #16c098;
	--hashTagText: #23a6f0;
	--dividerPrimary: #dadada;
	--optionDefaultText: #d9d9d9;
	--essential: #ff6600;
	--deleteAccountText: #23a6f0;
	--tableHeadBg: #f2f4f8;

	/* FONT SIZES Legacy */
	--font-size-primary-heading: 4.8rem;
	--font-size-secondary-heading: 2.4rem;
	--font-size-tertiary-heading: 1.8rem;
	--font-size-tertiary: 1.8rem;
	--font-size-extra-large: 2.4rem;
	--font-size-large: 2rem;
	--font-size-medium-large: 1.8rem;
	--font-size-medium: 1.6rem;
	--font-size-medium-small: 1.4rem;
	--font-size-small: 1.2rem;

	/* font sizes */
	--font_primary_heading: 4.8rem;
	--font_secondary_heading: 3.6rem;
	--font_tertiary_heading: 2.4rem;
	--font_extra_large: 3.6rem;
	--font_large: 2.4rem;
	--font_medium_large: 1.8rem;
	--font_medium: 1.6rem;
	--font_medium_small: 1.4rem;
	--font_small: 1.2rem;
	--font_extra_small: 1rem;

	/* basic colors  */
	--black: #000;
	--white: #fff;

	/* nuetral  */
	--gray50: #f8f8f8;
	--gray100: #f0f0f0;
	--gray200: #e4e4e4;
	--gray300: #d8d8d8;
	--gray400: #c6c6c6;
	--gray500: #8e8e8e;
	--gray600: #717171;
	--gray700: #555555;
	--gray800: #2d2d2d;
	--gray900: #1d1d1d;

	/*primary*/
	--primary50: #eff5ff;
	--primary100: #d3e1fb;
	--primary200: #a7c4f7;
	--primary300: #7ca6f3;
	--primary400: #5089ef;
	--primary500: #246beb;
	--primary600: #1d56bc;
	--primary700: #16408d;
	--primary800: #0e2b5e;
	--primary900: #07152f;

	/*secondary*/
	--secondary50: #edf1f5;
	--secondary100: #cdd7e4;
	--secondary200: #b4c4d6;
	--secondary300: #99b0cb;
	--secondary400: #2a5c96;
	--secondary500: #003675;
	--secondary600: #002b5e;
	--secondary700: #002046;
	--secondary800: #00162f;
	--secondary900: #000b17;

	/* text colors */
	--textTitle: var(--gray900);
	--textBody: var(--gray700);
	--textDisabled: var(--gray500);

	/* back ground colors */
	--backgroundBase: var(--white);
	--backgroundLayer1: var(--gray50);
	--backgroundLayer2: var(--secondary50);

	/* border colors */
	--borderActive: var(--primary500);
	--borderNormal: var(--gray600);
	--borderContents: var(--gray400);

	/* checkbox colors */

	/* button colors */
	--buttonPrimaryNormal: var(--primary500);
	--buttonPrimaryHover: var(--primary600);
	--buttonPrimaryPressed: var(--primary700);
	--buttonPrimaryDisabled: var(--gray200);
	
	--buttonSecondaryNormal: var(--white);
	--buttonSecondaryHover: var(--primary50);
	--buttonSecondaryPressed: var(--primary100);
	--buttonSecondaryDisabled: var(--gray200);
	
	--buttonTextTextNColor: var(--gray700);
	--buttonTextHoverColor: var(--gray50);
	--buttonTextPressedColor: var(--gray100);

	/* input colors */

	/* COLORS  */
	--colorDangerSurface: #feecf0;
	--colorDangerBorder: #fcd4de;
	--colorDangerBase: #eb003b;
	--colorDangerText: #d50136;

	--colorInformationSurface: #e9f0ff;
	--colorInformationBorder: #d4e1ff;
	--colorInformationBase: #2768ff;
	--colorInformationTextr: #1f53cc;

	/* FONT SIZES */
	--font-heading-L: 5rem;
	--font-heading-M: 4rem;
	--font-heading-S: 3.2rem;

	--font-title-XXL: 3.2rem;
	--font-title-XL: 2.5rem;
	--font-title-L: 2.1rem;
	--font-title-M: 1.9rem;
	--font-title-S: 1.7rem;
	--font-title-XS: 1.5rem;

	--font-body-M: 1.7rem;
	--font-body-L: 1.9rem;

	--font-lable-L: 1.9rem;
	--font-lable-M: 1.7rem;
	--font-lable-S: 1.5rem;
	--font-lable-XS: 1.5rem;

	/* spacing system */
}

.btn_primary {
	border: none;
	background-color: var(--buttonPrimaryNormal);
	font-weight: 400;
	color: var(--white);
	cursor: pointer;
}

.btn_primary:hover {
	border: none;
	background-color: var(--buttonPrimaryHover);
	font-weight: 400;
	color: var(--white);
	cursor: pointer;
}

.btn_primary:active {
	border: none;
	background-color: var(--buttonPrimaryPressed);
	font-weight: 400;
	color: var(--white);
	cursor: pointer;
}

.btn_primary:disabled {
	border: none;
	background-color: var(--buttonDisabledBg);
	font-weight: 400;
	color: var(--gray500);
	cursor: pointer;
}

.btn_secondary {
	/* border-style: none; */
	/* border: none; */
	background-color: var(--buttonSecondaryNormal);
	border: 0.1rem solid var(--primary500);
	font-weight: 400;
	color: var(--primary600);
	cursor: pointer;
}

.btn_secondary:hover {
	background-color: var(--buttonSecondaryHover);
	border: 0.1rem solid var(--primary500);
	font-weight: 400;
	color: var(--primary600);
	cursor: pointer;
}

.btn_secondary:active {
	background-color: var(--buttonSecondaryPressed);
	border: 0.1rem solid var(--primary700);
	font-weight: 400;
	color: var(--white);
	cursor: pointer;
}

.btn_secondary:disabled {
	background-color: var(--buttonSecondaryDisabled);
	border: 0.1rem solid var(--primary500);
	font-weight: 400;
	color: var(--gray500);
	cursor: pointer;
}

.btn_neutral {
	background-color: var(--white);
	border: 0.1rem solid var(--gray900);
	font-weight: 400;
	color: var(--gray900);
	cursor: pointer;
}
/*element gray800*/

.btn_neutral:hover {
	background-color: var(--gray50);
	border: 0.1rem solid var(--gray900);
	font-weight: 400;
	color: var(--gray900);
	cursor: pointer;
}
/*element gray800*/

.btn_neutral:active {
	background-color: var(--gray100);
	border: 0.1rem solid var(--gray900);
	font-weight: 400;
	color: var(--gray900);
	cursor: pointer;
}
/*element gray800*/

.btn_neutral:disabled {
	background-color: var(--gray300);
	border: 0.1rem solid var(--gray400);
	font-weight: 400;
	color: var(--gray600);
	cursor: pointer;
} /*element gray500*/

.btn_text {
	color: var(--buttonTextTextNColor);
	cursor: pointer;
	outline: none;
	border: none;
	background-color: rgba(255, 255, 255, 0);
} /*element gray800*/

.btn_text:hover {
	color: var(--buttonTextTextNColor);
	cursor: pointer;
	outline: none;
	border: none;
	background-color: var(--buttonTextHoverColor);
}

.btn_text:active {
	color: var(--buttonTextTextNColor);
	cursor: pointer;
	outline: none;
	border: none;
	background-color: var(--buttonTextPressedColor);
}

.btn_text:disabled {
	color: var(--gray500);
	cursor: pointer;
	outline: none;
	border: none;
	background-color: var(--white);
}

.btn_text_unactive {
	color: var(--gray500);
	cursor: pointer;
	outline: none;
	border: none;
	background-color: rgba(255, 255, 255, 0);
}

.btn_text_unactive:hover {
	color: var(--buttonTextTextNColor);
	cursor: pointer;
	outline: none;
	border: none;
	background-color: var(--buttonTextHoverColor);
}

.btn_text_unactive:active {
	color: var(--buttonTextTextNColor);
	cursor: pointer;
	outline: none;
	border: none;
	background-color: var(--buttonTextPressedColor);
}

.btn_radius_2 {
	border-radius: 0.2rem;
}

.btn_radius_4 {
	border-radius: 0.4rem;
}

.btn_radius_8 {
	border-radius: 0.8rem;
}

.btn_radius_12 {
	border-radius: 1.2rem;
}

.btn_radius_16 {
	border-radius: 1.6rem;
}

.btn_radius_24 {
	border-radius: 2.4rem;
}

.btn_radius_999 {
	border-radius: 999px;
}

/* [btn size] */
.btn_size_XL {
	/* height: 6.4rem; */
	padding: 2.25rem 2.4rem;
	font-size: var(--font-lable-L);
	text-align: center;
}

.btn_size_L {
	/* height: 5.6rem; */
	padding: 1.85rem 2rem;
	font-size: var(--font-lable-L);
	text-align: center;
}

.btn_size_M {
	/* height: 4.8rem; */
	padding: 1.55rem 1.6rem;
	font-size: var(--font-lable-M);
	text-align: center;
}

.btn_size_S {
	/* height: 4rem; */
	padding: 1.65rem 1.2rem;
	font-size: var(--font-lable-S);
	text-align: center;
}

.btn_size_XS {
	/* height: 3.2rem; */
	padding: 0.85rem 1rem;
	font-size: var(--font-lable-S);
	text-align: center;
}

.btn_text_size_L {
	height: 4rem;
	padding: 1.05rem 0.2rem;
	font-size: var(--font-lable-L);
	text-align: center;
}

.btn_text_size_M {
	/* height: 3.2rem; */
	padding: 0.75rem 0.2rem;
	font-size: var(--font-lable-M);
	text-align: center;
}

.btn_text_size_S {
	/* height: 2.4rem; */
	padding: 0.45rem 0.2rem;
	font-size: var(--font-lable-S);
	text-align: center;
}

.btn_text_size_XS {
	/* height: 2rem; */
	padding: 0.25rem 0.2rem;
	font-size: var(--font-lable-S);
	text-align: center;
}
.btn_rounded {
	/* display: block;
  width: 100%; */
	cursor: pointer;
	background-color: #5d5a88;
	padding: 1rem 2rem;
	font-family: inherit;
	color: #ffffff;
	font-size: 1.6rem;
	border: none;
	border-radius: 10rem;
}

.btn_rounded:hover {
	background-color: var(--primary600);
	color: var(--white);
	cursor: pointer;
}

.btn_rounded:active {
	background-color: var(--primary700);
	color: var(--white);
	cursor: pointer;
}

.btn_rounded:disabled {
	background-color: var(--gray200);
	color: var(--gray500);
	cursor: pointer;
}

.btn_floating {

	padding: 2rem 3.2rem;
	background-color: var(--primary500);
	color: var(--white);
	border: none;
	font-size: var(--font-lable-M);
	border-radius: 999rem;
	box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
	cursor: pointer;
}

.btn_floating:hover {
	background-color: var(--primary600);
	color: var(--white);
	cursor: pointer;
}

.btn_floating:active {
	background-color: var(--primary700);
	color: var(--white);
	cursor: pointer;
}

.btn_floating:disabled {
	background-color: var(--gray200);
	color: var(--gray500);
	cursor: pointer;
}

.btn_floating:disabled {
	background-color: var(--gray200);
	color: var(--gray500);
	cursor: pointer;
}

.btn_outline {
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-radius: 999rem;
	border: 1px solid var(--borderContents);
	padding: 2rem 3.2rem;
	cursor: pointer;
	background-color: var(--white);
}

.btn_outline:hover {
	background-color: var(--gray50);
	color: var(--gray900);
	border: 1px solid var(--borderContents);
	cursor: pointer;
}

.btn_outline:active {
	background-color: var(--gray100);
	color: var(--gray900);
	cursor: pointer;
	border: 1px solid var(--borderContents);
}

.btn_outline:disabled {
	background-color: var(--gray200);
	color: var(--gray500);
	cursor: pointer;
}

.btn_outline:disabled {
	background-color: var(--gray200);
	color: var(--gray500);
	cursor: pointer;
	border: 1px solid var(--borderContents);
}

/* Loading spinner styles */
.btn_loading {
	position: relative;
	color: transparent !important;
}

.btn_loading .spinner {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 1.6rem;
	height: 1.6rem;
	border: 2px solid transparent;
	border-top: 2px solid currentColor;
	border-radius: 50%;
	animation: spin 1s linear infinite;
}

@keyframes spin {
	0% { transform: translate(-50%, -50%) rotate(0deg); }
	100% { transform: translate(-50%, -50%) rotate(360deg); }
}

/* Ensure spinner color matches button text color */
.btn_primary .spinner,
.btn_secondary .spinner,
.btn_neutral .spinner,
.btn_rounded .spinner,
.btn_floating .spinner {
	border-top-color: var(--white);
}

.btn_outline .spinner {
	border-top-color: var(--gray900);
}

.btn_text .spinner,
.btn_text_unactive .spinner {
	border-top-color: var(--gray700);
}

.btn_primary:disabled .spinner,
.btn_secondary:disabled .spinner,
.btn_neutral:disabled .spinner,
.btn_rounded:disabled .spinner,
.btn_floating:disabled .spinner,
.btn_outline:disabled .spinner {
	border-top-color: var(--gray500);
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
        ${loading ? '<div class="spinner"></div>' : buttonText}
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

		// For submit buttons, don't prevent default behavior
		// Let the form handle the submission naturally
		if (this.type === "submit") {
			// Don't prevent default - let form submit naturally

			return;
		}

		// For other button types, prevent default to avoid any unwanted behavior
		event.preventDefault();
	}

	// Handle keyboard events
	handleKeyDown(event) {
		if (this.disabled || this.loading) {
			return;
		}

		// Handle Enter and Space key presses
		if (event.key === "Enter" || event.key === " ") {
			// For submit buttons, let the default behavior handle form submission
			if (this.type === "submit" && event.key === "Enter") {
				// Don't prevent default for Enter key on submit buttons
				// Let the form handle the submission naturally
				return;
			}

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
customElements.define("brie-button", BrieButton);

// Export for module usage
export default BrieButton;
