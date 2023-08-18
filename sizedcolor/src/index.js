const superEventHandler = {
  resize: function resize() {
    let wWidth = window.innerWidth;
    if (wWidth > 1200) {
      document.body.classList.add("size1200");
      document.body.classList.remove("size1000");
    } else if (wWidth > 1000) {
      document.body.classList.add("size1000");
      document.body.classList.remove("size800");
      document.body.classList.remove("size1200");
    } else if (wWidth > 800) {
      document.body.classList.add("size800");
      document.body.classList.remove("size600");
      document.body.classList.remove("size1000");
    } else if (wWidth > 600) {
      document.body.classList.remove("sizeUnder");
      document.body.classList.add("size600");
      document.body.classList.remove("size800");
    } else {
      document.body.classList.remove("size600");
      if (!document.body.classList.contains("sizeUnder")) {
        document.body.classList.add("sizeUnder");
      }
    }
  }
};

window.addEventListener("resize", superEventHandler.resize);
