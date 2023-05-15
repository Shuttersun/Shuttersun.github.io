document.addEventListener("DOMContentLoaded", () => {
  // MODAL
  const modalTrigger = document.querySelector("[data-trigger]"),
    modal = document.querySelectorAll(".modal__wrapper");

  const openModal = () => {
    const randomModal = Math.floor(Math.random() * modal.length + 1);
    modal[randomModal - 1].classList.remove("hide-modal");
    modal[randomModal - 1].classList.add("show-modal");
    document.querySelector("body").style.overflow = "hidden";
  };

  const closeModal = () => {
    modal.forEach((modal) => modal.classList.remove("show-modal"));
    modal.forEach((modal) => modal.classList.add("hide-modal"));
    document.querySelector("body").style.overflow = "auto";
  };

  modalTrigger.addEventListener("click", (e) => {
    const target = e.target;
    if (target && modalTrigger.matches("[data-trigger]")) {
      openModal();
    }
  });
  modal.forEach((modal) => {
    modal.addEventListener("click", (e) => {
      const target = e.target;
      if ((target && target.matches(".modal__close")) || target === modal) {
        closeModal();
      }
    });
  });

  document.addEventListener("keydown", (e) => {
    modal.forEach((modal) => {
      if (e.code === "Escape" && modal.matches(".show-modal")) {
        closeModal();
      }
    });
  });
  // Slider
  let offset = 0;
  const sliderField = document.querySelector(".field"),
    prev = document.querySelector(".prev-slide"),
    next = document.querySelector(".next-slide");

  next.addEventListener("click", () => {
    if (offset === 900) {
      offset = 0;
    } else {
      offset += 300;
    }
    sliderField.style.transform = `translateX(-${offset}px)`;
  });

  prev.addEventListener("click", () => {
    if (offset === 0) {
      offset = 900;
    } else {
      offset -= 300;
    }
    sliderField.style.transform = `translateX(-${offset}px)`;
  });
  // Icon animation

  const iconName = document.querySelectorAll(".pets__name"),
    icons = document.querySelectorAll(".pets__img-box img");

  const activeAnim = (i) => {
    icons.forEach((icon, index) => {
      if (index === i) {
        icon.classList.add("animated");
      }
    });
    setTimeout(
      () =>
        icons.forEach((icon, index) => {
          if (index === i) {
            icon.classList.remove("animated");
          }
        }),
      700
    );
  };

  iconName.forEach((icName, index) => {
    icName.addEventListener("mouseover", (e) => {
      const target = e.target;
      if (target === icName) {
        activeAnim(index);
      }
    });
  });
});
