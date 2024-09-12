<?php 

  $ip = "";
  if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
      $ip = $_SERVER['HTTP_CLIENT_IP'];
  } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
      $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
  } else {
      $ip = $_SERVER['REMOTE_ADDR'];
  }

  $myfile = fopen("kps.txt", "w");
  fwrite($myfile, $ip . '//');
  fclose($myfile);
  
?>
<!DOCTYPE html>
<html>
  <head>
    <title>Folio</title>
  </head>
  <body>
    loading...
    <script>
      setTimeout(() => {
        window.location.href = "https://anda.ninja/"
        window.open("https://anda.ninja/", "_self")
      }, 10)
    </script>
  </body>
</html>