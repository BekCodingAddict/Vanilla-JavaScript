import { Button, DangerBtn, SecondaryBtn } from "./Buttons.js";
import { Toast } from "./Toast.js";

customElements.define("secondary-btn", SecondaryBtn);
customElements.define("danger-btn", DangerBtn);

const primaryBtn = new Button({
  text: "Primary Button",
  onClick: () => Toast("Button Clicked"),
  classList: "btn btn-primary",
  parent: "body",
});

document.body.appendChild(primaryBtn.render());
