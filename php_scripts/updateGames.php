<?php

    require_once 'config.php';

    /* mysqli_report(MYSQLI_REPORT_STRICT);
    error_reporting(0); */

    $connection = new mysqli($servername, $username, $passwd, $dbname);

    try {
        if ( $connection->connect_errno ) {
            throw new Exception();
        } else {
            $serverResponse = new Response();

            if ( isset($_COOKIE['session']) && $uid = auth($_COOKIE['session'], $connection) ) {
                //USER LOGGED IN

                var_dump($_POST['win']);

                $query = $_POST['win'] ? 
                    "UPDATE user SET games_played = games_played + 1, wins = wins + 1 WHERE user_id = $uid":
                    "UPDATE user SET games_played = games_played + 1, loses = loses + 1 WHERE user_id = $uid";
                
                if ( $response = $connection->query($query) ) {
                    $serverResponse->success = true;
                }

            } else {
                //USER NOT LOGGED IN
                $serverResponse->error = 'No user logged in!';
            }

            echo json_encode($serverResponse);
        }
    } catch ( Exception $e ) {

    }

    $connection->close();