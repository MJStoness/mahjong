<?php

    require_once 'config.php';

    /* mysqli_report(MYSQLI_REPORT_STRICT);
    error_reporting(0); */

    $connection = new mysqli($servername, $username, $passwd, $dbname);

    try {
        if ( $connection->connect_errno ) {
            throw new Exception();
        } else {
            $friends = [];
            $serverResponse = new Response();

            if ( isset($_COOKIE['session']) && $uid = auth($_COOKIE['session'], $connection) ) {
                //USER LOGGED IN
                $query = "SELECT friend_id as id, user.username, user.profile_picture as profilePicture FROM friend JOIN user ON ( user.user_id = friend.friend_id ) WHERE friend.user_id =$uid";
                
                if ( $response = $connection->query($query) ) {
                    fetchAllToArray($friends, $response);
                    $serverResponse->success = true;
                    $serverResponse->data = $friends;
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