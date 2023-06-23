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
                $query = "DELETE FROM friend WHERE user_id=$uid AND friend_id=".$_POST['fid'];
                
                if ( $connection->query($query) ) {
                    $serverResponse->success = true;
                    $serverResponse->notification = [ 
                        'title' => 'Success!',
                        'msg' => 'Friend removed!',
                        'color' => 'green' 
                    ];
                } else {
                    $serverResponse->error = 'Query failed!';
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