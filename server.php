<?php
//header('Content-type: application/json');

if(trim($_GET['getMessages']) == "yup"){   
    $myfile = fopen("./chathist/history.txt", "r") or die("Unable to open file!");
    $jsonOutput = "";//array();
    while(!feof($myfile)) {
      $jsonOutput.=fgets($myfile);
    }
    echo substr($jsonOutput,0,strlen($jsonOutput)-1);
    
    fclose($myfile);
}else{
    newMsg($_POST['u'],$_POST['m']);
}

function newMsg($userName, $content){
    if(!is_null($userName) && !is_null($content)){
        $message->ts = microtime(true);
        $message->u = $userName;
        $message->data = $content;
        
        //clean(userName)
        //clean Content;
        
        $myfile = fopen("./chathist/history.txt", "a") or die("Unable to open file!");
        fwrite($myfile,json_encode($message)."\n");
        //fwrite($myfile,"\n");
        fclose($myfile);
    }
    

}