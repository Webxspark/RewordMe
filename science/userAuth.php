<?php
require_once 'db.php';
require_once 'auth.php';
$Auth = new Auth;
$data = [];
//user signup system
if (isset($_REQUEST['signup']) && isset($_REQUEST['email']) && isset($_REQUEST['password']) && isset($_REQUEST['username'])) {
    if (!$Auth->isLoggedIn()) {
        $email = htmlspecialchars($_REQUEST['email']);
        //generate username with email
        $username = htmlspecialchars($_REQUEST['username']);
        $password = htmlspecialchars($_REQUEST['password']);
        $password = password_hash($password, PASSWORD_DEFAULT);
        $credits = 20;
        $api_key = $Auth->generate_license("WXP-AI");
        if (!$Auth->checkEmailExists($conn, $email)) {
            $stmt = $conn->prepare("INSERT INTO auth (username, email, pass, credits, auth_key) VALUES (?, ?, ?, ?, ?)");
            $stmt->bind_param('sssss', $username, $email, $password, $credits, $api_key);
            if ($stmt->execute()) {
                $data = [
                    "status" => 200,
                    "message" => "Account created successfully!",
                    "context" => [
                        "content" => [
                            "username" => $username,
                            "key" => $api_key,
                            "email" => $email
                        ]
                    ]
                ];
                $_SESSION['__auth'] = $data['context']['content']['key'];
            } else {
                $data['message'] = "Something went wrong. Please try again later!";
            }
        } else {
            $data['message'] = "Account already exists. Please login to continue!";
        }
    } else {
        $data['message'] = "You're already logged in!";
    }
}
//user login system
if (isset($_REQUEST['login']) && isset($_REQUEST['email']) && isset($_REQUEST['password'])) {
    if (!$Auth->isLoggedIn()) {
        $email = htmlspecialchars($_REQUEST['email']);
        $password = htmlspecialchars($_REQUEST['password']);
        if ($Auth->checkEmailExists($conn, $email)) {
            //authenticate user
            $stmt = $conn->prepare("SELECT * FROM auth WHERE email=? LIMIT 1");
            $stmt->bind_param('s', $email);
            $stmt->execute();
            $res = $stmt->get_result();
            $user = mysqli_fetch_assoc($res);
            if (password_verify($password, $user['pass'])) {
                $data = [
                    "status" => 200,
                    "message" => "You're Logged in :)",
                    "context" => [
                        "content" => [
                            "username" => $user['username'],
                            "key" => $user['auth_key'],
                            "email" => $user['email']
                        ]
                    ]
                ];
                $_SESSION['__auth'] = $data['context']['content']['key'];
            } else {
                $data['message'] = "Access denied. Invalid credentials!";
            }
        } else {
            $data['message'] = "No account exists. Please create a new account!";
        }
    } else {
        $data['message'] = "You're already logged in!";
    }
}
//user logout system
if (isset($_REQUEST['logout'])) {
    if ($Auth->isLoggedIn()) {
        session_destroy();
        $data = [
            "status" => 200,
            "message" => "You're Logged out!",
        ];
    } else {
        $data['message'] = "Access denied. You're not logged in!";
    }
}
header("Content-type: application/json");
echo json_encode($data);
