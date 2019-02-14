<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" type="text/css" href="css/chat.css">
</head>

<body>

<?php
$myfile = fopen("./chathist/history.txt", "r") or die("Unable to open file!");
//while(!feof($myfile)) {
  //echo fgets($myfile) . "<br>";
//}
//fclose($myfile);


//fwrite($myfile, "00000008, GOD, Let there be burn.world chat.");
newMsg("GOD", "Let there be burn.world chat.");

function newMsg($userName, $content){
    //clean(userName)
    //clean Content;
    $message->ts = microtime(true);
    $message->u = $userName;
    $message->data = $content;
    
    $myfile = fopen("./chathist/history.txt", "a") or die("Unable to open file!");
    fwrite($myfile,json_encode($message)."\n");
    //fwrite($myfile,"\n");
    fclose($myfile);
}
?>
    <script
      src="https://code.jquery.com/jquery-3.3.1.min.js"
      integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
      crossorigin="anonymous"></script>
    <script src="./js/chat.js"></script>
    
</body>
</html>