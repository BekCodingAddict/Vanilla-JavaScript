# 🎨 Reusable UI Components

A modern, React-like component library built with **Vanilla JavaScript** and **Web Components**. Create reusable, encapsulated UI components without any framework dependencies.

## ✨ Features

-   🧩 **Custom Elements**: Native Web Components with Shadow DOM
-   🎨 **Multiple Variants**: Primary, Secondary, Danger, Success, Warning
-   📏 **Multiple Sizes**: Small, Medium, Large
-   🔄 **States**: Normal, Disabled, Loading
-   ♿ **Accessibility**: Full keyboard navigation and ARIA support
-   🎯 **Event Handling**: Custom events and onclick support
-   🛠️ **Programmatic Control**: Methods to change state dynamically
-   🎭 **Encapsulated Styles**: CSS isolation with Shadow DOM
-   📱 **Responsive**: Works on all devices and screen sizes

## 🚀 Quick Start

### 1. Include the Component

```html
<!DOCTYPE html>
<html>
	<head>
		<link rel="stylesheet" href="src/styles/variables.css" />
		<link rel="stylesheet" href="src/styles/button.css" />
	</head>
	<body>
		<!-- Your content -->

		<script type="module" src="src/components/Button.js"></script>
	</body>
</html>
```

### 2. Use the Component

```html
<!-- Basic usage -->
<custom-button variant="primary">Click me</custom-button>

<!-- With size -->
<custom-button variant="secondary" size="large">Large Button</custom-button>

<!-- With states -->
<custom-button variant="danger" disabled>Disabled</custom-button>
<custom-button variant="success" loading>Loading...</custom-button>
```

## 📖 Component API

### CustomButton

A reusable button component with multiple variants, sizes, and states.

#### Attributes

| Attribute  | Type    | Default     | Description                                                          |
| ---------- | ------- | ----------- | -------------------------------------------------------------------- |
| `variant`  | string  | `"primary"` | Button style: `primary`, `secondary`, `danger`, `success`, `warning` |
| `size`     | string  | `"medium"`  | Button size: `small`, `medium`, `large`                              |
| `disabled` | boolean | `false`     | Whether the button is disabled                                       |
| `loading`  | boolean | `false`     | Whether the button is in loading state                               |
| `type`     | string  | `"button"`  | HTML button type: `button`, `submit`, `reset`                        |

#### Methods

| Method                  | Parameters | Description              |
| ----------------------- | ---------- | ------------------------ |
| `setLoading(loading)`   | `boolean`  | Set loading state        |
| `setDisabled(disabled)` | `boolean`  | Set disabled state       |
| `setVariant(variant)`   | `string`   | Change button variant    |
| `setSize(size)`         | `string`   | Change button size       |
| `getState()`            | -          | Get current button state |

#### Events

| Event          | Detail                             | Description                  |
| -------------- | ---------------------------------- | ---------------------------- |
| `button-click` | `{ variant, text, originalEvent }` | Fired when button is clicked |

## 🎨 Styling

### CSS Variables

The component uses CSS custom properties for easy theming:

```css
:root {
	/* Primary Colors */
	--buttonPrimaryNormal: #3b82f6;
	--buttonPrimaryHover: #2563eb;
	--buttonPrimaryPressed: #1d4ed8;

	/* Disabled Colors */
	--buttonDisabledBg: #e5e7eb;
	--gray500: #6b7280;

	/* Sizes */
	--buttonPaddingSmall: 0.25rem 0.75rem;
	--buttonPaddingMedium: 0.5rem 1rem;
	--buttonPaddingLarge: 0.75rem 1.5rem;

	/* And more... */
}
```

### Custom Styling

You can customize the appearance by overriding CSS variables:

```css
:root {
	--buttonPrimaryNormal: #your-color;
	--buttonBorderRadius: 0.5rem;
}
```

## 💡 Usage Examples

### Basic Usage

```html
<custom-button variant="primary">Save</custom-button>
<custom-button variant="secondary">Cancel</custom-button>
<custom-button variant="danger">Delete</custom-button>
```

### With Event Handling

```html
<custom-button variant="primary" onclick="handleSave()" id="save-btn"> Save Changes </custom-button>

<script>
	function handleSave() {
		console.log("Saving...");
	}

	// Listen for custom events
	document.getElementById("save-btn").addEventListener("button-click", (event) => {
		console.log("Button clicked:", event.detail);
	});
</script>
```

### Programmatic Control

```javascript
const button = document.getElementById("my-button");

// Change state
button.setLoading(true);
button.setDisabled(false);
button.setVariant("success");

// Get current state
const state = button.getState();
console.log(state); // { variant: 'success', size: 'medium', disabled: false, loading: true, text: '...' }
```

### Form Integration

```html
<form onsubmit="handleSubmit(event)">
	<input type="text" name="username" required />

	<custom-button type="submit" variant="primary">Submit</custom-button>
	<custom-button type="reset" variant="secondary">Reset</custom-button>
</form>
```

## 🔧 Development

### Project Structure

```
src/
├── components/
│   ├── Button.js          # Button component
│   └── index.js           # Component exports
├── styles/
│   ├── variables.css      # CSS custom properties
│   └── button.css         # Button styles
└── legacy/                # Legacy components (for reference)
```

### Adding New Components

1. Create a new component file in `src/components/`
2. Extend `HTMLElement` and implement the component
3. Register with `customElements.define()`
4. Export from `src/components/index.js`

### Example Component Structure

```javascript
class CustomComponent extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	static get observedAttributes() {
		return ["prop1", "prop2"];
	}

	connectedCallback() {
		this.render();
	}

	attributeChangedCallback(name, oldValue, newValue) {
		this.render();
	}

	render() {
		this.shadowRoot.innerHTML = `
            <style>
                /* Component styles */
            </style>
            <div>
                <!-- Component HTML -->
            </div>
        `;
	}
}

customElements.define("custom-component", CustomComponent);
export default CustomComponent;
```

## 🌐 Browser Support

-   ✅ Chrome 54+
-   ✅ Firefox 63+
-   ✅ Safari 10.1+
-   ✅ Edge 79+

## 📚 Learn More

-   [Web Components MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
-   [Custom Elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)
-   [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - feel free to use in your projects!

---

**Built with ❤️ using Vanilla JavaScript and Web Components**
