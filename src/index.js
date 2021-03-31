import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));

const slider = document.querySelector(".swatch-images");
let isDown = false;
let startX = 0;
let scrollLeft = 0;

slider.addEventListener("mousedown", (e) => {
    alert();
    isDown = true;
    slider.classList.add("active");
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});
slider.addEventListener("mouseleave", () => {
    isDown = false;
    slider.classList.remove("active");
});
slider.addEventListener("mouseup", () => {
    isDown = false;
    slider.classList.remove("active");
});
slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = x - startX;
    slider.scrollLeft = scrollLeft - walk;
});
