document.addEventListener("DOMContentLoaded", function () {
  const navContainer = document.getElementById("nav-container");
  const navScrollable = navContainer.querySelector(".nav-scrollable");
  let scrollAmount = 0.2;
  let autoScrollInterval;
  let isDragging = false;
  let startX = 0;
  let scrollLeft = 0;
  const interval = 20;
  let autoScrolling = true;
  const scrollInstruction = navContainer.querySelector(".scroll-instruction");

  function hideInstruction() {
    scrollInstruction.style.display = "none";
  }

  function startAutoScroll() {
    if (!autoScrolling) return;
    autoScrollInterval = setInterval(function () {
      navScrollable.scrollLeft += scrollAmount;
      if (
        navScrollable.scrollLeft >=
          navScrollable.scrollWidth - navScrollable.clientWidth ||
        navScrollable.scrollLeft <= 0
      ) {
        stopAutoScroll();
      }
    }, interval);
  }

  function stopAutoScroll() {
    clearInterval(autoScrollInterval);
  }

  startAutoScroll();

  navScrollable.addEventListener("touchstart", function (e) {
    stopAutoScroll();
    isDragging = true;
    startX = e.touches[0].clientX;
    scrollLeft = navScrollable.scrollLeft;
    hideInstruction(); // Скрываем инструкцию
  });

  navScrollable.addEventListener("touchmove", function (e) {
    if (!isDragging) return;
    const x = e.touches[0].clientX;
    const walk = (x - startX) * 1;
    navScrollable.scrollLeft = scrollLeft - walk;
  });

  navScrollable.addEventListener("touchend", function (e) {
    isDragging = false;
    if (
      navScrollable.scrollLeft >=
        navScrollable.scrollWidth - navScrollable.clientWidth ||
      navScrollable.scrollLeft <= 0
    ) {
      stopAutoScroll();
    } else {
      startAutoScroll();
      autoScrolling = true;
    }
  });

  navScrollable.addEventListener("mousedown", function (e) {
    stopAutoScroll();
    isDragging = true;
    startX = e.clientX;
    scrollLeft = navScrollable.scrollLeft;
    hideInstruction(); // Скрываем инструкцию
  });

  navScrollable.addEventListener("mousemove", function (e) {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.clientX;
    const walk = (x - startX) * 1;
    navScrollable.scrollLeft = scrollLeft - walk;
  });

  navScrollable.addEventListener("mouseup", function () {
    isDragging = false;
    if (
      navScrollable.scrollLeft >=
        navScrollable.scrollWidth - navScrollable.clientWidth ||
      navScrollable.scrollLeft <= 0
    ) {
      stopAutoScroll();
    } else {
      startAutoScroll();
      autoScrolling = true;
    }
  });

  navScrollable.addEventListener("mouseleave", function () {
    isDragging = false;
    if (
      navScrollable.scrollLeft >=
        navScrollable.scrollWidth - navScrollable.clientWidth ||
      navScrollable.scrollLeft <= 0
    ) {
      stopAutoScroll();
    } else {
      startAutoScroll();
      autoScrolling = true;
    }
  });

  navScrollable.addEventListener("wheel", function (e) {
    e.preventDefault();
    stopAutoScroll();
    scrollAmount = e.deltaY > 0 ? 0.2 : -0.2;
    autoScrolling = false;
    hideInstruction(); // Скрываем инструкцию
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // === Получаем элементы ===
  const carousel = document.querySelector(".portfolio-carousel"); // Карусель
  const track = document.querySelector(".portfolio-track"); // Трек
  const dragInstruction = document.querySelector(".drag-instruction"); // Инструкция (если есть)

  // === Переменные для перетаскивания ===
  let isDragging = false; // Флаг перетаскивания
  let startX = 0; // Начальная позиция курсора
  let scrollLeft = 0; // Начальная позиция прокрутки

  // === Функция для скрытия инструкции ===
  function hideInstruction() {
    if (dragInstruction) {
      // Проверяем, существует ли инструкция
      dragInstruction.style.display = "none"; // Скрываем инструкцию
      localStorage.setItem("portfolio-drag-instruction-shown", "true"); // Сохраняем в localStorage
    }
  }

  // === Показываем/скрываем инструкцию при загрузке страницы ===
  if (dragInstruction) {
    // Проверяем, существует ли инструкция
    // Если в localStorage нет информации, показываем инструкцию
    if (!localStorage.getItem("portfolio-drag-instruction-shown")) {
      dragInstruction.style.display = "block";
    }
  }

  // === Обработчики событий для мыши ===
  if (carousel) {
    // Проверяем, существует ли карусель
    carousel.addEventListener("mousedown", (e) => {
      isDragging = true; // Начинаем перетаскивание
      startX = e.pageX - carousel.offsetLeft; // Запоминаем позицию курсора
      scrollLeft = carousel.scrollLeft; // Запоминаем позицию прокрутки
      carousel.classList.add("dragging"); // Добавляем класс для стилизации
      hideInstruction(); // Скрываем инструкцию
    });

    carousel.addEventListener("mouseleave", () => {
      isDragging = false; // Заканчиваем перетаскивание
      carousel.classList.remove("dragging"); // Убираем класс стилизации
    });

    carousel.addEventListener("mouseup", () => {
      isDragging = false; // Заканчиваем перетаскивание
      carousel.classList.remove("dragging"); // Убираем класс стилизации
    });

    carousel.addEventListener("mousemove", (e) => {
      if (!isDragging) return; // Если не перетаскиваем, выходим
      e.preventDefault(); // Отменяем выделение текста
      const x = e.pageX - carousel.offsetLeft; // Текущая позиция курсора
      const walk = (x - startX) * 1; // Расстояние, которое прошли
      carousel.scrollLeft = scrollLeft - walk; // Прокручиваем карусель
    });
  }

  // === Обработчики событий для касания ===
  if (carousel) {
    // Проверяем, существует ли карусель
    carousel.addEventListener("touchstart", (e) => {
      isDragging = true; // Начинаем перетаскивание
      startX = e.touches[0].pageX - carousel.offsetLeft; // Запоминаем позицию касания
      scrollLeft = carousel.scrollLeft; // Запоминаем позицию прокрутки
      hideInstruction(); // Скрываем инструкцию
    });

    carousel.addEventListener("touchend", () => {
      isDragging = false; // Заканчиваем перетаскивание
    });

    carousel.addEventListener("touchmove", (e) => {
      if (!isDragging) return; // Если не перетаскиваем, выходим
      e.preventDefault(); // Отменяем прокрутку страницы
      const x = e.touches[0].pageX - carousel.offsetLeft; // Текущая позиция касания
      const walk = (x - startX) * 1; // Расстояние, которое прошли
      carousel.scrollLeft = scrollLeft - walk; // Прокручиваем карусель
    });
  }

  // === Отключаем стандартную прокрутку колесиком мыши ===
  if (carousel) {
    // Проверяем, существует ли карусель
    carousel.addEventListener("wheel", function (e) {
      e.preventDefault(); // Отменяем прокрутку страницы
    });
  }
});
