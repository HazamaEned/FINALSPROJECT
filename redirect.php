<?php
$status = $_GET['status'] ?? 'unknown';
?>
<!DOCTYPE html>
<html>
<head><title>Payment Result</title></head>
<body style="font-family:Arial; text-align:center; margin-top:100px;">
    <?php if ($status === 'success'): ?>
        <h2>✅ Payment Successful!</h2>
        <p>Thank you for your payment.</p>
    <?php else: ?>
        <h2>❌ Payment Failed</h2>
        <p>Your payment was not completed. Please try again.</p>
    <?php endif; ?>
</body>
</html>
