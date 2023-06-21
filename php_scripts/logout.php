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
                
                setcookie('session', '', time() - 3600);
                $serverResponse->success = true;
                $serverResponse->notification = [ 
                    'title' => 'Success!',
                    'msg' => 'You\'ve been logged out!',
                    'color' => 'green'
                ];
            } else {
                //USER NOT LOGGED IN
                $serverResponse->error = 'No user logged in!';
            }

            echo json_encode($serverResponse);
        }
    } catch ( Exception $e ) {

    }

    $connection->close();