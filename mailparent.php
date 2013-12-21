<?php
ini_set('display_errors', '0');     # don't show any errors...
error_reporting(E_ALL | E_STRICT);  # ...but do log them

#code from http://help.mandrill.com/entries/21746308-Sending-via-SMTP-in-various-programming-languages#code_2
if(isset($_POST['name'], $_POST['parents'], $_POST['items'], $_POST['notBot'])) {

	$notBot = $_POST['notBot'];
	if ($notBot == true) {
		set_include_path('../../daronspe/php/swift/lib/');
		 require_once "swift_required.php";

		$name = $_POST['name'];
		$parentemail = $_POST['parents'];
		$items = $_POST['items'];
		$itemsstring = implode("</li><li>", $items);
		 
		$subject = $name . ' sent me a Christmas list!';
		$from = array('santa@mailsantacla.us' =>'Santa Claus');
		$to = array(
		 $parentemail  => $name."'s Parent/Guardian"
		);

		# add comma and copy recipient address for more


		$html = "<p>Seasons greetings!</p><p>".$name." submitted a Christmas list on <a href='http://mailsantacla.us'>MailSantaCla.us</a> and listed you as their Parent/Guardian.</p><p>If you are not the intended recipient, please ignore this message.</p><p>Here is a copy of the list ".$name." submitted...</p><ul><li>".$itemsstring."</li></ul><p>We at <a href='http://mailsantacla.us'>MailSantaCla.us</a>, created this site to help parents out in this stressful time of year. Hopefully we acheived our goal!</p><p>Merry Christmas,</p><h3>The MailSantaCla.us Team</h3>";

		$transport = Swift_SmtpTransport::newInstance('smtp.mandrillapp.com', 587);
		$transport->setUsername('daronspence@gmail.com');
		$transport->setPassword('fuN8INJVVImZuORdouFcog');
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
		}else {
		echo $error;
		die();
	}
} else {
	echo $error;
	die();
}

 ?>