<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title>Moodle Course</title>
        <link rel="stylesheet" href="css/boots.css" type="text/css"/>
        <link rel="stylesheet" href="css/bootstrap.css" type="text/css"/>
        <link rel="stylesheet" href="css/jquery-ui.css" type="text/css"/>
    </head>
    <body style="background-color: #EEEEEE">
        <div class="container-fluid " id="scope">
            <span>this is it the beginning of the test</span>
        </div>
    <?php
        include './php/parcoursArbre.php';
    ?>
        <script type="text/javascript"> 
            //on renvoie le json pour l'affichage 
            //array est la variable de hierachie.php contenant notre arbre
            var test = <?php echo json_encode($array); ?>;
            console.log(test);
        </script>
        <script type="text/javascript" src="js/jquery.js"> </script>
        <script type="text/javascript" src="js/bootstrap.min.js"> </script>
        <script type="text/javascript" src="js/ie-emulation-modes-warning.js"> </script>
        <script type="text/javascript" src="js/jquery-ui.js"> </script>
        <script type="text/javascript" src="js/handleNodes.js"> </script>
    </body>
</html>
