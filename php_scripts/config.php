<?php
    $servername = "localhost";
    $username = "root";
    $passwd = "";
    $dbname = "mahjong";

    define('EMPTY_FIELD_ERROR', 'Pole jest puste!');
    define('PROFILE_PICTURE_PATH', 'userData/profile_pictures/');

    function auth(string $token, mysqli $connection) {
        if ( empty($token) ) return false;
        if ( $connection->connect_errno ) return false;

        $query = "SELECT user_id FROM session WHERE token = '$token'";
        $response = $connection->query($query);
        if ( !$userRow = $response->fetch_assoc() ) {
            return false;
        } else {
            return $userRow['user_id'];
        }
    }

    function pullUserData($uid, mysqli $connection) {
        $query = "SELECT username, email, profile_picture, concat(DAY(joined),' ',MONTHNAME(joined),' ',YEAR(joined)) as joined_date, games_played, wins, loses FROM user WHERE `user_id`=$uid";
        $response = $connection->query($query);
        if ( $userRow = $response->fetch_assoc() ) {
            return [
                'username' => $userRow['username'],
                'email' => $userRow['email'],
                'pfp' => PROFILE_PICTURE_PATH.$userRow['profile_picture'],
                'joined' => $userRow['joined_date'],
                'gamesPlayed' => $userRow['games_played'],
                'wins' => $userRow['wins'],
                'loses' => $userRow['loses']
            ];
        } else {
            return false;
        }
    }

    class Response {
        public $success;
        public $error;
        public $notification;
        public $data;

        public function __construct(bool $success = false, array $error = [], array $notification = [], array $data = [])
        {
            $this->success = $success;
            $this->error = $error;
            $this->notification = $notification;
            $this->data = $data;
        }
    }

    //function createSession

    /* function colToString(array $arr, mixed $col, string $separator) {
        $toString = array();
        foreach ($arr as $el) {
            array_push($toString, $el[$col]);
        }

        return implode($separator,$toString);
    }

    function fetchAllToArray(array &$arr, $response) {
        $i=0;
        while ( $row = $response->fetch_assoc() ) {
            $arr[$i] = $row;
            $i++;
        }
    }

    function getRowByValueAtIndex(array $arr, mixed $index, mixed $value) {
        foreach ( $arr as $el ) {
            if ( $el[$index] == $value ) return $el;
        }

        return null;
    }

    function unionArraysByCommonIndex(array &$main, array $secondary, mixed $newIndex, mixed $commonIndex, mixed $secondaryIndex) {
        for ( $i=0; $i<count($main); $i++ ) {
            $main[$i][$newIndex] = getRowByValueAtIndex($secondary, $commonIndex, $main[$i][$commonIndex])[$secondaryIndex];
        }
    }

    function cartSum(array $cartEntires) {
        $sum = 0;
        foreach( $cartEntires as $cartEntire ) {
            $sum += floatval($cartEntire['price'])*intval($cartEntire['quantity']);
        }
        return number_format($sum, 2, '.', '');
    }

    function generateCode() {
        $chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVZYabcdefghijklmnopqrstuvwxyz';
        $code = substr(str_shuffle($chars), 0, 10);
        return $code;
    }

    function generateIdentifier($connection, string $table) {
        do {
            $identifier = generateCode();
            $query = "SELECT identifier FROM $table WHERE identifier = $identifier";
            $result = $connection->query($query);
        } while ( $result );

        return $identifier;
    } */