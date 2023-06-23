<?php

    require_once 'config.php';

    /*mysqli_report(MYSQLI_REPORT_STRICT);
    error_reporting(0);*/

    $connection = new mysqli($servername, $username, $passwd, $dbname);

    try {
        if ( $connection->connect_errno ) {
            throw new Exception();
        } else {
            $serverResponse = new Response();

            if ( !isset($_COOKIE['session']) ) {
                $query = "SELECT * FROM user WHERE 
                    `username`='".mysqli_real_escape_string($connection, htmlentities($_POST['username'], ENT_QUOTES, "UTF-8"))."' 
                    OR `email`='".mysqli_real_escape_string($connection, htmlentities($_POST['username'], ENT_QUOTES, "UTF-8"))."'";

                //VALIDATE CREDENTIALS:
                $response = $connection->query($query);
                if ( !$userRow = $response->fetch_assoc() ) $serverResponse->error = [ 'loginerror' => 'That account doesn\'t exist!'];
                else if ( !password_verify($_POST['passwd'], $userRow['passwd']) ) $serverResponse->error = [ 'loginerror' => 'Wrong password!' ];
                else {
                    $session_id = uniqid('', true);
                    $query = "INSERT INTO session (token, user_id) VALUES ('".$session_id."', ".$userRow['user_id'].")";
                    if ( $connection->query($query) ) {

                        // EVERYTHING WENT SMOOTHLY, SESSION CREATED:
                        $serverResponse->success = true;
                        if ( !$serverResponse->data = pullUserData($userRow['user_id'], $connection) ) {
                            $serverResponse->error = 'Data not recieved!';
                        }
                        setcookie('session', $session_id, 0, "", "", false, true);

                    } else {
                        $serverResponse->notification = [ 
                            'title' => 'Error!',
                            'msg' => 'Failure to log in...' 
                        ];
                    }

                } 
            } else {
                $serverResponse->notification = [ 
                    'title' => 'Error!',
                    'msg' => 'You are already loggen in!' 
                ];
            }

            echo json_encode($serverResponse);
        }
    } catch ( Exception $e ) {

    }

    $connection->close();