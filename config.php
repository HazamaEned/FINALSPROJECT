<?php
// Your secret key from PayMongo dashboard
$secret_key = 'sk_test_1HZRL3QtuRNxshHnVTMqvNvS';

// Helper function for PayMongo API calls
function paymongo_request($method, $endpoint, $data = null) {
    global $secret_key;

    $url = "https://api.paymongo.com/v1/" . $endpoint;

    $headers = [
        "Authorization: Basic " . base64_encode($secret_key . ":"),
        "Content-Type: application/json"
    ];

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, strtoupper($method));
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    if ($data) {
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    }

    $response = curl_exec($ch);
    $error = curl_error($ch);
    curl_close($ch);

    if ($error) {
        return ["error" => $error];
    }
    return json_decode($response, true);
}
?>
