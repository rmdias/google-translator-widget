<?php
	 error_reporting(E_ALL);
	 ini_set("display_errors", 1);
	// Basic request parameters:
	// s = source language
	// d = destination language
	// q = Text to be translated

	if (isset($s)) {
	 	$s = $_REQUEST['s'];
		$d = $_REQUEST['d'];
		$lang_pair = urlencode($s.'|'.$d);
	}else{
		$d = $_REQUEST['d'];
		$lang_pair = urlencode('|'.$d);
	}

	$q = urlencode($_REQUEST['q']);

	// Google's API translator URL
	$url = urldecode("http://ajax.googleapis.com/ajax/services/language/translate?v=1.0&q=".$q."&langpair=".$lang_pair);

	// http://rmdias.com/google-translator/translate.php?d=pt&q=car

	// Make sure to set CURLOPT_REFERER because Google doesn't like if you leave the referrer out
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_REFERER, "http://rmdias.com/google-translator/translate.php");
	$body = curl_exec($ch);
	curl_close($ch);

	$json = json_decode($body, true);
	echo $body;
	// echo $json['responseData']['translatedText'];
?>