let handleOutsideClick = {};

const OutsideClick = {
  bind(el, binding) {
    handleOutsideClick = (e) => {
      e.stopPropagation();
      const { handler, exclude } = binding.value;
      let clickedOnExcludedEl = false;

      if (e.target._prevClass !== undefined) {
        for (const className of exclude) {
          if (e.target.closest(`.${className}`) != null) {
            clickedOnExcludedEl = true;
          }
          if (clickedOnExcludedEl) {
            break;
          }
        }
      }
      if (!(el.contains(e.target) || clickedOnExcludedEl)) {
        handler();
      }
    };

    document.addEventListener("click", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);
  },

  unbind() {
    document.removeEventListener("click", handleOutsideClick);
    document.removeEventListener("touchstart", handleOutsideClick);
    document.onkeydown = null;
  },
};

export default OutsideClick;
