<?php

class Auth
{
    public function CheckAPIKEY($conn, $APIKEY)
    {
        $stmt = $conn->prepare("SELECT * FROM auth WHERE auth_key = ? LIMIT 1");
        $stmt->bind_param('s', $APIKEY);
        $stmt->execute();
        $result = $stmt->get_result();
        $count = $result->num_rows;
        if ($count == 1) {
            return true;
        } else {
            return false;
        }
    }
    public function fetchAPIKEYData($conn, $APIKEY)
    {
        $stmt = $conn->prepare("SELECT * FROM auth WHERE auth_key = ? LIMIT 1");
        $stmt->bind_param('s', $APIKEY);
        $stmt->execute();
        $result = $stmt->get_result();
        return mysqli_fetch_assoc($result);
    }
    public function ValidateKeyCredits($conn, $APIKEY)
    {
        $KEYData = $this->fetchAPIKEYData($conn, $APIKEY);
        if (isset($KEYData['credits'])) {
            if ((int)$KEYData['credits'] !== 0) {
                return true;
            }
        }
        return false;
    }
    public static function fetch_ip()
    {
        if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
            $ip = $_SERVER['HTTP_CLIENT_IP'];
        } else {
            $ip = $_SERVER['REMOTE_ADDR'];
        }
        return $ip;
    }
    public function getDomainWithSSL()
    {
        if (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') {
            $url = "https://";
        } else {
            $url = "http://";
        }
        // Append the host(domain name, ip) to the URL.
        $url .= $_SERVER['HTTP_HOST'];

        return $url;
    }
}
