<?
require 'lib/PHPMailerAutoload.php';
if(isset($_POST['email'])){
	$email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
    $css = $_POST['css'];
    $html = $_POST['html'];
    ob_start();
    include 'tmpl_email.php';
    $tmpl = ob_get_clean();
    ob_start();
    include 'tmpl_email_demo.php';
    $tmpl_demo = ob_get_clean();
    $file = uniqid('demo_',true) . '.html';
    file_put_contents('tmp/' . $file, $tmpl_demo);
	if(!$email){
		echo json_encode(array('status' => 'error', 'msg' => 'Неправильный email')); exit();
	}
	$send = email($email, 'Твоя кнопка от css3 button generator', $tmpl, $file);
	if($send){
		echo json_encode(array('status' => 'ok', 'msg' => 'Письмо успешно отправлено')); exit();
	}else{
		echo json_encode(array('status' => 'error', 'msg' => 'Отправка письма не удалась')); exit();
	}
}


function email($email, $subject, $text, $file){
	$mail = new PHPMailer;
	$mail->From = 'css3generator@deeman313.com';
	$mail->FromName = 'css 3 button generator';
	$mail->addAddress($email);
	$mail->isHTML(true);
	$mail->addAttachment('tmp/' . $file);
	$mail->Subject = $subject;
	$mail->Body    = $text;
	$mail->AltBody = 'HTML и CSS вашей кнопки в прикрипленном файле';
	$res =  $mail->send();
    @unlink('tmp/' . $file);
    return $res;
}
?>