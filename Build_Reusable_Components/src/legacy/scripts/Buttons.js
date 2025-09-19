export class Button {
  constructor({ text, onClick = () => {}, classList, parent = "body" }) {
    this.button = document.createElement("button");
    this.button.innerText = text;
    this.parent = parent;

    // Event listener
    this.button.addEventListener(`click`, (event) => onClick(event));

    //Add CSS classes
    if (classList && typeof classList === "string") {
      classList.split(" ").forEach((className) => {
        if (className.trim()) {
          this.button.classList.add(className);
        }
      });
    }
  }

  render() {
    const target = document[this.parent];
    if (target && typeof target.appendChild === "function") {
      target.appendChild(this.button);
    } else {
      console.log(`Invalid parient ${this.parent}`);
      throw new Error(`Invalid parient ${this.parent}`);
    }
    return this.button;
  }
}

// Using Shadow DOM
export class SecondaryBtn extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    const button = document.createElement("button");
    button.textContent = button.textContent || "Secondary Button";

    //Default Styles
    // button.style.display = "inline-flex";
    // button.style.alignItems = "ceneter";
    // button.style.justifyContent = "center";
    // button.style.padding="0.5"

    //Event Listerner
    const onClick = button.getAttribute("onclick");
    if (onClick) {
      button.addEventListener(`click`, (event) => onClick(event));
    }

    //Add CSS classes
    const classList = button.getAttribute("class");
    if (classList && typeof classList === "string") {
      classList.split(" ").forEach((className) => {
        if (className.trim()) {
          button.classList.add(className);
        }
      });
    }

    shadow.appendChild(button);
  }
}

//
export class DangerBtn extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <button class="btn-danger">${this.innerText}</button>
    `;
  }
}
