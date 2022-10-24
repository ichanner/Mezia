
<?php

error_reporting(0);
session_start();

function readable_random_string($length = 6)
{
    $string = '';
    $vowels = array("a","e","i","o","u");
    $consonants = array(
        'a', 'b', 'c', 'd', 'g', 'h', 'j', 'k', 'l', 'm', 
        'n', 'p', 'r', 's', 'l', 'v', 'w', 'x', 'y', 'z'
    );

    $max = $length / 2;
    for ($i = 1; $i <= $max; $i++)
    {
        $string .= $consonants[rand(0,19)];
        $string .= $vowels[rand(0,4)];
    }

    return $string;
}

if(isset($_POST['submit'])){

    $name = readable_random_string();

	$_SESSION['owner'] = true;
	$_SESSION['room'] = $name;

	header("Location: room?id=".$name);
	exit();
}

?>

<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>

<form method="post">

<input type="submit" value="Create Room" name="submit">

</form>

</body>
</html>