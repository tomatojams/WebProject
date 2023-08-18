
const colors = ["#1abc9c", "#3498db", "#9b59b6", "#f39c12", "#e74c3c"];
// <⚠️ /DONT DELETE THIS ⚠️>


const h2 = document.querySelector("h2"); // Select the <h2> element

const superEventHandler = {
  enter: function enter() {
    h2.innerText = "The mouse is here!";
    h2.style.color = colors[0];
  },

  out: function out() {
    h2.innerText = "The mouse is gone!";
    h2.style.color = colors[1];
  },

  resize: function resize() {
    h2.innerText = "You just resized!";
    h2.style.color = colors[2];
  },

  rightClick: function rightClick() {
    h2.innerText = "That was right-clicked!";
    h2.style.color = colors[3];
  },
};

h2.addEventListener("mouseenter", superEventHandler.enter);
h2.addEventListener("mouseleave", superEventHandler.out);
window.addEventListener("resize", superEventHandler.resize);
window.addEventListener("contextmenu", superEventHandler.rightClick);
