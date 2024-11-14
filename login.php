<?php
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
$email = $data["email"];
$password = $data["password"];

// Authenticate User (dummy user for example)
$stored_password_hash = password_hash("userpassword", PASSWORD_DEFAULT);
if ($email === "test@example.com" && password_verify($password, $stored_password_hash)) {
    $userData = [
        "name" => "Test User",
        "email" => "test@example.com",
        "mobile" => "1234567890",
        "address" => "123 Main St"
    ];
    echo json_encode(["success" => true, "userData" => $userData]);
} else {
    echo json_encode(["success" => false, "message" => "Login failed."]);
}
?>
