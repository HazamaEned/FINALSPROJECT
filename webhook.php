<?php
$payload = file_get_contents('php://input');
$event = json_decode($payload, true);

if ($event && isset($event['data']['attributes']['type'])) {
    $type = $event['data']['attributes']['type'];

    if ($type === 'payment.paid') {
        $payment_id = $event['data']['id'];
        // Example: Update order status in your database
        file_put_contents("logs.txt", "Payment paid: " . $payment_id . "\n", FILE_APPEND);
    }
}

http_response_code(200);
?>
