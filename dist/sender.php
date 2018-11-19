<?
 //если проблемы с кодировкой файла сохранить его в другой
    $name = $_POST['name']; // пришедшие переменные
    $phone = $_POST['phone'];
    $text = $_POST['adres'];

    echo $name;
    echo $phone;
    echo $text;

    //$to = 'kuznecovs45@gmail.com';
    $to = 'info@sniper-m.ru';
    if ($name) {$mainName="Имя: <strong>$name</strong><br>"  ;}
    if ($phone) {$mainPhone="Телефон: <strong>$phone</strong><br>"  ;}
    if ($text) {$mainText="Адрес сайта: <strong>$text</strong><br>"  ;}
    $subject = 'Заявка с сайта sniper-m.ru';
    $body = "Информация:<br><br>          
            $mainName
            $mainPhone
            $mainText
            ";
    $headers = array();
    $headers[] = "MIME-Version: 1.0";
    $headers[] = "Content-type: text/html; charset=utf-8";
    $headers[] = "Subject: {$subject}";
    $headers[] = "From: mail@sniper-m.ru";
    $headers[] = "X-Mailer: PHP/".phpversion();

    mail($to,  $subject, $body, implode("\r\n", $headers));

?>