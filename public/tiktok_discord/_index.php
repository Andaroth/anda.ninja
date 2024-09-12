<?php
  $ip = getIpAdress();
  $now = date('c');
  $new_line = "{$now} {$ip}\r\n";
  file_put_contents('ips.log', $new_line, LOCK_EX | FILE_APPEND);
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
<p>Marche pas ? <a href="https://discord.gg/6rRSJhEZ93">clique ici</a> !</p>
  <script>
    window.location.href = "https://discord.gg/6rRSJhEZ93";
    window.open('https://discord.gg/6rRSJhEZ93', '_self');
  </script>
</body>
</html>