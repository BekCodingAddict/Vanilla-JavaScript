export const Toast = (message, icon = "⚠️", removeTime = 3000) => {
  const wrapper = document.createElement("div");
  const div = document.createElement("div");

  const span = document.createElement("span");
  span.textContent = icon;

  const p = document.createElement("p");
  p.textContent = message;
  p.style.display = "inline-block";

  div.appendChild(span);
  div.appendChild(p);
  div.style.display = "flex";
  div.style.alignItems = "center";
  div.style.justifyContent = "center";
  div.style.verticalAlign = "middle";

  wrapper.style.width = "20rem";
  wrapper.style.height = "4rem";
  wrapper.style.position = "fixed";
  wrapper.style.bottom = "20px";
  wrapper.style.right = "20px";
  wrapper.style.padding = "10px 15px";
  wrapper.style.background = "#333";
  wrapper.style.color = "#fff";
  wrapper.style.borderRadius = "8px";
  wrapper.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)";
  wrapper.style.zIndex = 9999;
  wrapper.style.display = "flex";
  wrapper.style.alignItems = "start";
  wrapper.style.justifyContent = "start";

  wrapper.appendChild(div);
  document.body.appendChild(wrapper);

  setTimeout(() => {
    wrapper.remove();
  }, removeTime);
};
