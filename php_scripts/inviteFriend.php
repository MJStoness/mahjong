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
                $query = "INSERT INTO friend (user_id, friend_id) VALUES ($uid, ".$_POST['fid'].")";
                echo $query;
                
                if ( $response = $connection->query($query) ) {
                    $serverResponse->success = true;
                    $serverResponse->notification = [ 
                        'title' => 'Success!',
                        'msg' => 'Invite sent!',
                        'color' => 'green' 
                    ];
                } else {
                    $serverResponse->error = 'Friend not added!';
                    $serverResponse->notification = [ 
                        'title' => 'Error!',
                        'msg' => 'Something wenth wrong!',
                        'color' => 'red' 
                    ];
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