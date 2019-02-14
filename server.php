<?php
//header('Content-type: application/json');
if(is_null($_POST['userName'])||is_null($_POST['content'])){
    $myfile = fopen("./chathist/history.txt", "r") or die("Unable to open file!");
    $jsonOutput = "";//array();
    while(!feof($myfile)) {
      $jsonOutput.=fgets($myfile);
    }
    
    echo substr($jsonOutput,0,strlen($jsonOutput)-1);
    
    fclose($myfile);
}