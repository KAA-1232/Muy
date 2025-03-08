document.addEventListener("DOMContentLoaded", function () {
  const testimonialsContainer = document.getElementById(
    "testimonials-container"
  );
  const addTestimonialForm = document.getElementById("add-testimonial-form");
  const testimonialNameInput = document.getElementById("testimonial-name");
  const testimonialTextInput = document.getElementById("testimonial-text");
  const testimonialMessageDiv = document.getElementById("testimonial-message");

  // Функция для отображения отзывов
  function displayTestimonials(testimonials) {
    testimonialsContainer.innerHTML = ""; // Очищаем контейнер
    testimonials.forEach((testimonial) => {
      const testimonialDiv = document.createElement("div");
      testimonialDiv.classList.add("testimonial-item");
      testimonialDiv.innerHTML = `
                <p>"${testimonial.text}"</p>
                <p class="author">- ${testimonial.name}</p>
            `;
      testimonialsContainer.appendChild(testimonialDiv);
    });
  }

  // Функция для получения отзывов с сервера (AJAX)
  function loadTestimonials() {
    fetch("/api/testimonials") // Замените на ваш URL
      .then((response) => response.json())
      .then((data) => {
        displayTestimonials(data);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке отзывов:", error);
        testimonialMessageDiv.textContent = "Ошибка при загрузке отзывов.";
        testimonialMessageDiv.style.color = "red";
      });
  }

  // Функция для отправки отзыва на сервер (AJAX)
  function addTestimonial(name, text) {
    fetch("/api/testimonials", {
      // Замените на ваш URL
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, text: text }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          loadTestimonials(); // Обновляем список отзывов
          testimonialMessageDiv.textContent = "Отзыв успешно добавлен!";
          testimonialMessageDiv.style.color = "green";
        } else {
          testimonialMessageDiv.textContent = "Ошибка при добавлении отзыва.";
          testimonialMessageDiv.style.color = "red";
        }
      })
      .catch((error) => {
        console.error("Ошибка при отправке отзыва:", error);
        testimonialMessageDiv.textContent = "Ошибка при отправке отзыва.";
        testimonialMessageDiv.style.color = "red";
      });
  }

  // Загружаем отзывы при загрузке страницы
  loadTestimonials();

  // Обработчик отправки формы
  addTestimonialForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Предотвращаем отправку формы

    const name = testimonialNameInput.value.trim();
    const text = testimonialTextInput.value.trim();

    if (name === "" || text === "") {
      testimonialMessageDiv.textContent = "Пожалуйста, заполните все поля.";
      testimonialMessageDiv.style.color = "red";
      return;
    }

    // Отправляем отзыв на сервер
    addTestimonial(name, text);

    // Очищаем поля формы
    testimonialNameInput.value = "";
    testimonialTextInput.value = "";

    // Убираем сообщение через 3 секунды
    setTimeout(() => {
      testimonialMessageDiv.textContent = "";
    }, 3000);
  });
});
// Function to check if an element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Select all elements you want to animate
const elementsToAnimate = document.querySelectorAll(
  ".benefit, .portfolio-item, .testimonial, h1, h2, h3"
);

// Function to handle scroll event
function handleScroll() {
  elementsToAnimate.forEach((element) => {
    if (isInViewport(element)) {
      element.classList.add("in-view"); // Add a class to trigger the animation
    }
  });
}

// Add scroll event listener
window.addEventListener("scroll", handleScroll);

// Call handleScroll on page load to check initial visibility
handleScroll();
document.addEventListener("DOMContentLoaded", function () {
  // GSAP Animation for Header
  gsap.from("#header h1", {
    duration: 1,
    opacity: 0,
    y: -40,
    ease: "power3.out",
  });
  gsap.from("#header p", {
    duration: 1,
    opacity: 0,
    y: 20,
    ease: "power3.out",
    delay: 0.2,
  });

  // Calculator functionality
  const calculateButton = document.getElementById("calculateButton");
  const resultDiv = document.getElementById("result");

  if (calculateButton && resultDiv) {
    calculateButton.addEventListener("click", function () {
      const pagesValue = document.getElementById("pages").value;
      const designValue = document.getElementById("design").value;
      const cmsValue = document.getElementById("cms").value;

      let basePrice;
      switch (pagesValue) {
        case "1":
          basePrice = 2000;
          break;
        case "3":
          basePrice = 5000;
          break;
        case "5":
          basePrice = 8000;
          break;
        default:
          basePrice = 2000;
      }

      let totalPrice = basePrice + parseInt(designValue) + parseInt(cmsValue);
      resultDiv.textContent = "Примерная стоимость: " + totalPrice + " рублей";
    });
  }

  //Scroll to Top Button
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");

  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      scrollToTopBtn.style.display = "block";
    } else {
      scrollToTopBtn.style.display = "none";
    }
  }

  scrollToTopBtn.addEventListener("click", function () {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  });
});

// Валидация формы (простая проверка email)
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    const emailInput = document.getElementById("email");
    const emailValue = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailValue)) {
      event.preventDefault(); // Отменяем отправку формы
      alert("Пожалуйста, введите корректный email.");
      emailInput.focus();
    }
  });
}
// Атрибуты для элементов, видимость которых зависит от JavaScript,
// должны определяться только с помощью JavaScript.
document.body.className = document.body.className.replace("loading", "loaded");

document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Предотвращаем отправку формы по умолчанию

      const formData = new FormData(contactForm);

      fetch("process_form.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.text();
        })
        .then((data) => {
          // Обрабатываем ответ от сервера
          alert(data); // Отображаем сообщение
          contactForm.reset(); // Очищаем форму
        })
        .catch((error) => {
          console.error("There was an error!", error);
          alert("Произошла ошибка при отправке сообщения. Попробуйте позже.");
        });
    });
  }
});
