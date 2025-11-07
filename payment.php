<?php
// create_gcash_payment.php
header('Content-Type: application/json');
require_once 'config.php'; // config may define $PAYMONGO_SECRET_KEY or $secret_key

// Allow either config variable name: if config provides $secret_key, mirror it to
// $PAYMONGO_SECRET_KEY so this script works regardless of the naming used.
if (!isset($PAYMONGO_SECRET_KEY) && isset($secret_key)) {
    $PAYMONGO_SECRET_KEY = $secret_key;
}

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

// Execute request
$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if (curl_errno($ch)) {
    echo json_encode(['error' => curl_error($ch), 'http_code' => $http_code]);
    curl_close($ch);
    exit;
}

curl_close($ch);

// Try to decode PayMongo response and extract a checkout URL if present
$decoded = json_decode($response, true);
$checkout_url = null;
if (json_last_error() === JSON_ERROR_NONE) {
    if (isset($decoded['data']['attributes']['redirect']['checkout_url'])) {
        $checkout_url = $decoded['data']['attributes']['redirect']['checkout_url'];
    }
}

// Build a simplified, predictable response for the frontend
$result = [
    'success' => $checkout_url ? true : false,
    'checkout_url' => $checkout_url,
    'http_code' => $http_code,
    // include the parsed raw data when possible, otherwise include the raw response string
    'raw' => (json_last_error() === JSON_ERROR_NONE) ? $decoded : $response
];

// If PayMongo returned an error structure, surface it in a friendly way
if (!$checkout_url && json_last_error() === JSON_ERROR_NONE && isset($decoded['errors'])) {
    $result['error'] = $decoded['errors'];
}

echo json_encode($result);
