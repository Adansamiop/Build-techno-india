<?php
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
$name = $data["name"];
$email = $data["email"];
$password = password_hash($data["password"], PASSWORD_DEFAULT);
$mobile = $data["mobile"];
$address = $data["address"];

// Store User Data in Database (not implemented here, use MySQL)
$to = "adanbinsami21@gmail.com";
$subject = "New Signup";
$message = "Name: $name\nEmail: $email\nMobile: $mobile\nAddress: $address";
$headers = "From: no-reply@buildtechnoindia.com";

if (mail($to, $subject, $message, $headers)) {
    echo json_encode(["success" => true, "message" => "Signup successful✅!"]);
} else {
    echo json_encode(["success" => false, "message" => "Signup failed."]);
}
?>
