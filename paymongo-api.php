<?php
$secret_key = "sk_test_1HZRL3QtuRNxshHnVTMqvNvS";

function paymongo_request($method, $endpoint, $data = null) {
    global $secret_key;

    $url = "https://api.paymongo.com/v1/" . $endpoint;

    $headers = [
        "Authorization: Basic " . base64_encode($secret_key . ":"),
        "Content-Type: application/json"
    ];

    $cURL = curl_init($url);
    curl_setopt($cURL, CURLOPT_CUSTOMREQUEST, strtoupper($method));
    curl_setopt($cURL, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($cURL, CURLOPT_RETURNTRANSFER, true);

    if($data) {
        curl_setopt($cURL, CURLOPT_POSTFIELDS, json_encode($data));
    }

    $response = curl_exec($cURL);
    $error = curl_error($cURL);
    curl_close($cURL);

    if($error){
        return ["error" => $error];
    }
    return json_decode($response, true);
}
?>