<?php
require_once 'db.php';
require_once 'auth.php';
$Auth = new Auth;
$data = [];

if(isset($_REQUEST['key'])){
    $APIKEY = htmlspecialchars($_REQUEST['key']);
    $AuthCheck = $Auth->CheckAPIKEY($conn, $APIKEY);
    if($AuthCheck){
        $stmt = $conn->prepare("SELECT * FROM auth_key WHERE key=? LIMIT 1");
        $stmt->bind_param('s', $APIKEY);
        $stmt->execute();
        $result = $stmt->get_result();
        $user = mysqli_fetch_assoc($result);
        $data = [
            "context" => [
                "content" => [
                    
                ]
            ]
        ];
    } else {
        $data['error'] = "Invalid API Key!";
    }
} else {
    $data['error'] = "No API Key Provided!";
}

header('Content-type: application/json');
echo json_encode($data, JSON_PRETTY_PRINT);