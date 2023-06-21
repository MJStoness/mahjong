<?php

    require_once 'config.php';

    mysqli_report(MYSQLI_REPORT_STRICT);
    error_reporting(0);

    $connection = new mysqli($servername, $username, $passwd, $dbname);

    try {
        if ( $connection->connect_errno ) {
            throw new Exception();
        } else {
            $serverResponse = new Response();

            $username = $_POST['username'];
            $email = $_POST['email'];
            $passwd1 = $_POST['passwd1'];
            $passwd2 = $_POST['passwd2'];

            $usernameRegex = '/^[a-zA-Z0-9]+$/';
            $passwdRegex = '/^(?=.*[a-zA-Z])(?=.*[0-9!@#$%^&*])(?=.{6,25}$).*/';

            $validationFlag = true;
            if ( !filter_var($email, FILTER_VALIDATE_EMAIL) ) {
                $validationFlag = false;
                $serverResponse->error['emailerror'] = 'Wrong email!';
            }
            if ( !preg_match($usernameRegex, $username) ) {
                $validationFlag = false;
                $serverResponse->error['usernameerror'] = 'Username can contain only letters and numbers!';
            }
            if ( strlen($username) < 4 ) {
                $validationFlag = false;
                $serverResponse->error['usernameerror'] = 'Username has to be longer than 4 characters!';
            }
            if ( strlen($username) > 16 ) {
                $validationFlag = false;
                $serverResponse->error['usernameerror'] = 'Username cannot be longer than 16 characters!';
            }
            if ( $passwd1 != $passwd2 ) {
                $validationFlag = false;
                $serverResponse->error['passwderror'] = 'Passwords do not match!';
            }
            if ( !preg_match($passwdRegex, $passwd1) ) {
                $validationFlag = false;
                $serverResponse->error['passwderror'] = 'Password has to contain 6 to 25 characters and contain at lest one letter and special sign or a number!';
            }

            if ( $validationFlag ) {
                //$serverResponse->success = true;
                $query = "INSERT INTO user (`username`, `email`, `passwd`, `profile_picture`, `games_played`, `wins`, `loses`) VALUES (
                    '".mysqli_real_escape_string($connection, htmlentities($username, ENT_QUOTES, "UTF-8"))."',
                    '".mysqli_real_escape_string($connection, htmlentities($email, ENT_QUOTES, "UTF-8"))."',
                    '".password_hash($passwd1, PASSWORD_DEFAULT)."',
                    'default.webp',
                    0,
                    0,
                    0)";
                if ( $connection->query($query) ) {
                    $serverResponse->success = true;
                    $serverResponse->notification = [ 
                        'title' => 'Success!',
                        'msg' => 'Account created!',
                        'color' => 'green' 
                    ];
                }
            }

            echo json_encode($serverResponse);
        }
    } catch ( Exception $e ) {

    }

    $connection->close();