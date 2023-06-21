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
                if ( $serverResponse->data = pullUserData($uid, $connection) ) {
                    $serverResponse->success = true;
                } else {
                    $serverResponse->error = 'Data not recieved!';
                }
            } else {
                //USER NOT LOGGED IN
                $serverResponse->error = 'Authentication failed!';
            }

            echo json_encode($serverResponse);
        }
    } catch ( Exception $e ) {

    }

    $connection->close();