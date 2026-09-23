(() => {
  const toggle = document.querySelector(".nav-toggle");
  const mobile = document.querySelector("#mobile-nav");

  if (toggle && mobile) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      mobile.hidden = open;
    });
    mobile.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        toggle.setAttribute("aria-expanded", "false");
        mobile.hidden = true;
      });
    });
  }

  const tabs = document.querySelectorAll(".tabs__btn");
  const blocks = document.querySelectorAll(".block");

  tabs.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.block;
      tabs.forEach((other) => {
        other.classList.toggle("is-active", other === btn);
        other.setAttribute("aria-selected", other === btn ? "true" : "false");
      });
      blocks.forEach((block) => {
        block.classList.toggle("is-hidden", id !== "all" && block.dataset.block !== id);
      });
    });
  });

  const form = document.querySelector("#lead-form");
  const status = document.querySelector(".form__status");
  if (form && status) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.checkValidity()) {
        status.textContent = "Заполните обязательные поля.";
        form.reportValidity();
        return;
      }
      const data = new FormData(form);
      const lines = [
        `Имя: ${data.get("name")}`,
        `Компания: ${data.get("company")}`,
        `Почта: ${data.get("email")}`,
        "",
        String(data.get("message") || ""),
      ];
      const subject = encodeURIComponent("Заявка: стабилизация delivery · PATH");
      const body = encodeURIComponent(lines.join("\n"));
      status.textContent = "Открываем письмо в почтовом клиенте…";
      window.location.href = `mailto:sorvanovon@yandex.ru?subject=${subject}&body=${body}`;
      form.reset();
    });
  }
})();
