<?php
require_once 'db.php';
$data = [];
if(isset($_REQUEST['sendMsg'])){
    $name = htmlspecialchars($_REQUEST['name']);
    $email = htmlspecialchars($_REQUEST['email']);
    $subject = htmlspecialchars($_REQUEST['subject']);
    $message = htmlspecialchars($_REQUEST['message']);
    $stmt = $conn->prepare("INSERT INTO contact (name, email, subject, message) VALUES (?, ?, ?, ?)");
    $stmt->bind_param('ssss', $name, $email, $subject, $message);
    if($stmt->execute()){
        $data = [
            "status" => 200,
            "message" => "Message sent successfully!"
        ];
    }else{
        $data['error'] = "Something went wrong. Please try again later!";
    }
}
header("content-type: application/json");
echo json_encode($data);