<?php
ini_set('display_errors', '0');     # don't show any errors...
error_reporting(E_ALL | E_STRICT);  # ...but do log them

#code from http://help.mandrill.com/entries/21746308-Sending-via-SMTP-in-various-programming-languages#code_2

set_include_path('../../daronspe/php/swift/lib/');
 require_once "swift_required.php";

$name = $_POST['name'];
$email = $_POST['email'];
$items = $_POST['items'];
$itemsstring = implode("</li><li>", $items);
 
$subject = $name.', I got your Christmas list!';
$from = array('santa@mailsantacla.us' =>'Santa Claus');
$to = array(
 $email  => $name
);

# add comma and copy recipient address for more


$html = "<p>Seasons greetings ".$name."!</p><p>I hope you are enjoying this Christmas season so far. I still have a lot of work to do before Christmas Eve, but I wanted to let you know that I receieved your list that you submitted on <a href='http://mailsantacla.us'>MailSantaCla.us</a>.</p><p>Just to recap, here is a copy of the list you submitted...</p><ul><li>".$itemsstring."</li></ul><p>If something is wrong, head back to <a href='http://mailsantacla.us'>MailSantaCla.us</a> and submit another list. I'll figure it out!</p><p>Merry Christmas,</p><h3>Santa Claus</h3>";

$transport = Swift_SmtpTransport::newInstance('smtp.mandrillapp.com', 587);
$transport->setUsername('daronspence@gmail.com');
$transport->setPassword('DRsjka_P5KEJt1Kb43dhkg');
$swift = Swift_Mailer::newInstance($transport);

$message = new Swift_Message($subject);
$message->setFrom($from);
$message->setBody($html, 'text/html');
$message->setTo($to);

if ($recipients = $swift->send($message, $failures))
{
 echo 'Message successfully sent!';
} else {
 echo "There was an error:\n";
 print_r($failures);
}

 ?>