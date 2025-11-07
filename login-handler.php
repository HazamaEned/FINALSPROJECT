<?php
session_start();

$servername = "mysql-18bfd082-posinvpharmacy-9d2e.e.aivencloud.com";
$db_username = "avnadmin";
$db_password = "AVNS_jMqzcfpifezlsxUITOU";
$dbname = "pos_db";
$port = 18792;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    if (empty($_POST['username']) || empty($_POST['password'])) {
        header("Location: login.php?error=missing_credentials");
        exit();
    }

    $input_username = trim($_POST['username']);
    $input_password = $_POST['password']; 

    $conn = new mysqli($servername, $db_username, $db_password, $dbname, $port);

    if ($conn->connect_error) {
        error_log("Database Connection Failed: " . $conn->connect_error);
        header("Location: login.php?error=db_error");
        exit();
    }

    $stmt = $conn->prepare("SELECT account_id, username, password, role, status FROM accounts WHERE username = ?");
    
    $stmt->bind_param("s", $input_username);
    
    $stmt->execute();
    
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();
        
        $stored_hash = $user['password'];
        $user_role = $user['role'];
        $user_status = $user['status'];
        
        $input_hash = sha1($input_password);
        
        $authenticated = false;
        
        // --- UPDATED AUTHENTICATION LOGIC ---
        // Checks if the stored password is a hash (40 chars) or plain text.
        
        $stored_length = strlen($stored_hash);

        if ($stored_length === 40) {
            // Case 1: Standard Hashed Password (40 characters)
            if (strcasecmp($input_hash, $stored_hash) === 0) {
                $authenticated = true;
            }
        } else {
            // Case 2: Plain Text Password or Legacy Bypass (non-hash length)
            
            // Check for plain text match (e.g., "hi" == "hi")
            if ($input_password === $stored_hash) {
                $authenticated = true;
            }
            // Check for the existing empty string bypass (any input password grants access if stored is empty)
            elseif ($stored_hash === "" && !empty($input_password)) {
                $authenticated = true; 
            }
        }
        // --- END UPDATED LOGIC ---

        // Final check for authentication and active status
        if ($authenticated && $user_status === 'Active') { 
            
            // Set session variables for successful login
            $_SESSION['user_id'] = $user['account_id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['role'] = $user_role;
            $_SESSION['logged_in'] = TRUE;

            $target_page = '';
            switch ($user_role) {
                // Check role (case-sensitive) and set redirect page
                case 'Cashier': 
                    $target_page = 'cashier-ui.php'; 
                    break;
                case 'Pharmacist':
                    $target_page = 'pharmacist.php';
                    break;
                case 'Admin':
                    $target_page = 'admin.php';
                    break;
                default:
                    // Unknown role
                    session_destroy();
                    header("Location: login.php?error=invalid_role");
                    exit();
            }
            
            header("Location: " . $target_page);
            exit();

        } else {
            // Hash mismatch or status is not Active
            header("Location: login.php?error=invalid_credentials");
            exit();
        }
    } else {
        // User not found
        header("Location: login.php?error=invalid_credentials");
        exit();
    }

    $stmt->close();
    $conn->close();

} else {
    // Direct access to handler denied
    header("Location: login.php");
    exit();
}
?>
