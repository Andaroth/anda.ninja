<?php

if (!empty($_SERVER['HTTP_CLIENT_IP']))
    {
      $ipaddress = $_SERVER['HTTP_CLIENT_IP']."\r\n";
    }
elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))
    {
      $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR']."\r\n";
    }
else
    {
      $ipaddress = $_SERVER['REMOTE_ADDR']."\r\n";
    }
$useragent = " User-Agent: ";
$browser = $_SERVER['HTTP_USER_AGENT'];


$file = 'ip.txt';
$fp = fopen($file, 'a');

fwrite($fp, "\r\n----- " . date("Y/m/d") . ' - '. date("h:i:sa") . ' -----'."\n");
fwrite($fp, $ipaddress);
fwrite($fp, $useragent . "\n");
fwrite($fp, $browser . "\n");


fclose($fp);
?>
<html>
<head><title>Anda Pirate, go DISCORD yoho</title></head>
<body>
<pre>
                                ▄▄                         ▄▄                                
      ██                      ▀███             ▀███▀▀▀██▄  ██                   ██           
      ▄██▄                       ██               ██   ▀██▄                      ██           
    ▄█▀██▄   ▀████████▄    ▄█▀▀███  ▄█▀██▄       ██   ▄██▀███ ▀███▄███ ▄█▀██▄ ██████  ▄▄█▀██ 
    ▄█  ▀██     ██    ██  ▄██    ██ ██   ██       ███████   ██   ██▀ ▀▀██   ██   ██   ▄█▀   ██
    ████████    ██    ██  ███    ██  ▄█████       ██        ██   ██     ▄█████   ██   ██▀▀▀▀▀▀
  █▀      ██   ██    ██  ▀██    ██ ██   ██       ██        ██   ██    ██   ██   ██   ██▄    ▄
▄███▄   ▄████▄████  ████▄ ▀████▀███▄████▀██▄   ▄████▄    ▄████▄████▄  ▀████▀██▄ ▀████ ▀█████▀
                                                                                                                                                                                  
</pre>
<p>Marche pas ? <a href="https://discord.gg/ktpvVXgWx4">clique ici</a> !</p>
  <script>
    window.location.href = "https://discord.gg/ktpvVXgWx4";
    window.open('https://discord.gg/ktpvVXgWx4', '_self');
  </script>
</body>
</html>