<?php
include 'functions.php';

$amount = $_POST['amount'];
$method = $_POST['method'];

$data = [
    "data" => [
        "attributes" => [
            "amount" => $amount,
            "payment_method_allowed" => [$method],
            "currency" => "PHP",
            "description" => "Order #12345"
        ]
    ]
];

$response = paymongo_request('POST', 'payment_intents', $data);

// Create a GCash source
$payment_intent_id = $response['data']['id'];

$source_data = [
    "data" => [
        "attributes" => [
            "type" => $method,
            "amount" => $amount,
            "currency" => "Php",
            "redirect" => [
                "success" => "http:localhost/redirect.php?status=success",
                "failed" => "http:localhost/redirect.php?status=failed"
            ]
        ]
    ]
];

$source = paymongo_request('POST', 'sources', $source_data);
$checkout_url = $source['data']['attributes']['redirect']['checkout_url'];

// Redirect user to PayMongo checkout
header("Location: " . $checkout_url);
exit;
?>
