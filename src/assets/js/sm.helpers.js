export const $sm_helpers = {
  // top_popup_message: () => {
  //   show: (type, msg) => {
  //     const _template = document.querySelectorAll(
  //       '.top_popup_message[data-type="' + type + '"]'
  //     );
  //   };
  // },
  show_loader: () => {
    document.querySelector(".loader-wrapper").classList.add("active");
    document
      .querySelector(".loader-wrapper #circle-wave-loader")
      .classList.add("active");
  },
  hide_loader: () => {
    document.querySelector(".loader-wrapper").classList.remove("active");
    document
      .querySelector(".loader-wrapper #circle-wave-loader")
      .classList.remove("active");
  },
  show_alert: (type, msg, timeout = 0) => {
    const alert_cont = document.querySelector("#sm-alert-container");
    alert_cont.classList.remove(...alert_cont.classList);
    alert_cont.querySelector(".message > span").innerHTML = msg;
    alert_cont.classList.add(type, "loading");
    if (timeout > 0) {
      setTimeout(() => {
        alert_cont.classList.remove(...alert_cont.classList);
      }, timeout);
    }
  },
  hide_alert: () => {
    const alert_cont = document.querySelector("#sm-alert-container");
    alert_cont.classList.add("close");
  },

  /** Global eventListeners */
  start: () => {
    // Close Alert Banner
    document
      .querySelector("#sm-alert-container > .close")
      .addEventListener("click", () => {
        const alert_cont = document.querySelector("#sm-alert-container");
        alert_cont.classList.add("close");
        alert_cont.classList.remove(
          "error",
          "info",
          "warning",
          "success",
          "loading"
        );
      });
  },
};
