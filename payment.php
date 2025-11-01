<?php
// create_gcash_payment.php
header('Content-Type: application/json');
require_once 'config.php'; // $PAYMONGO_SECRET_KEY must be defined here

if (!isset($_POST['amount'])) {
    echo json_encode(['error' => 'Amount is required']);
    exit;
}

$amount = intval($_POST['amount'] * 100); // Convert PHP peso to centavos

// Use cashier page as the redirect for both success and failure
$returnUrl = "http://localhost:8080/FINALSPROJECT/cashier-ui.php";

$data = [
    "data" => [
        "attributes" => [
            "type" => "gcash",
            "amount" => $amount,
            "currency" => "PHP",
            "redirect" => [
                "success" => $returnUrl,
                "failed" => $returnUrl
            ],
            "description" => "Apollo Pharmacy Purchase"
        ]
    ]
];

$ch = curl_init("https://api.paymongo.com/v1/sources");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Basic " . base64_encode("$PAYMONGO_SECRET_KEY:"),
    "Content-Type: application/json"
]);

$response = curl_exec($ch);

if (curl_errno($ch)) {
    echo json_encode(['error' => curl_error($ch)]);
    curl_close($ch);
    exit;
}

curl_close($ch);

// Return raw response (contains id, client_key, checkout URL)
echo $response;
