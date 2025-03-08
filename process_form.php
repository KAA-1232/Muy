<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Получаем данные из формы
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = trim($_POST["message"]);

    // Проверяем данные
    if (empty($name) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Пожалуйста, заполните все поля формы и укажите корректный email.";
        exit;
    }

    // Настраиваем параметры письма
    $recipient = "volchitsa.a.ak@gmail.com"; // Замените на свой email
    $subject = "Новое сообщение с вашего сайта";
    $email_content = "Имя: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Сообщение:\n$message\n";
    $email_headers = "From: $name <$email>";

    // Отправляем письмо
    if (mail($recipient, $subject, $email_content, $email_headers)) {
        http_response_code(200);
        echo "Спасибо! Ваше сообщение отправлено.";
    } else {
        http_response_code(500);
        echo "Произошла ошибка при отправке сообщения. Попробуйте позже.";
    }

} else {
    http_response_code(403);
    echo "Произошла ошибка. Попробуйте еще раз.";
}
?>