<?php
session_save_path('./__wxp_secure_-usr_sessions');
session_start();
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
    public function checkEmailExists($conn, $email)
    {
        $stmt = $conn->prepare("SELECT * FROM auth WHERE email =? LIMIT 1");
        $stmt->bind_param('s', $email);
        $stmt->execute();
        $result = $stmt->get_result();
        $count = $result->num_rows;
        if ($count > 0) {
            return true;
        }
        return false;
    }
    public function generate_license($suffix = null)
    {
        // Default tokens contain no "ambiguous" characters: 1,i,0,o
        if (isset($suffix)) {
            // Fewer segments if appending suffix
            $num_segments = 3;
            $segment_chars = 6;
        } else {
            $num_segments = 4;
            $segment_chars = 5;
        }
        $tokens = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        $license_string = '';
        // Build Default License String
        for ($i = 0; $i < $num_segments; $i++) {
            $segment = '';
            for ($j = 0; $j < $segment_chars; $j++) {
                $segment .= $tokens[rand(0, strlen($tokens) - 1)];
            }
            $license_string .= $segment;
            if ($i < ($num_segments - 1)) {
                $license_string .= '-';
            }
        }
        // If provided, convert Suffix
        if (isset($suffix)) {
            if (is_numeric($suffix)) {   // Userid provided
                $license_string .= '-' . strtoupper(base_convert($suffix, 10, 36));
            } else {
                $long = sprintf("%u\n", ip2long($suffix), true);
                if ($suffix === long2ip($long)) {
                    $license_string .= '-' . strtoupper(base_convert($long, 10, 36));
                } else {
                    $license_string .= '-' . strtoupper(str_ireplace(' ', '-', $suffix));
                }
            }
        }
        return $license_string;
    }
    public function isLoggedIn()
    {
        if (isset($_SESSION['__auth'])) {
            return true;
        }
        return false;
    }
}
