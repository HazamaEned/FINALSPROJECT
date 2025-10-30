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

        if (strcasecmp($input_hash, $stored_hash) === 0 && $user_status === 'Active') { 
            
   
            $_SESSION['user_id'] = $user['account_id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['role'] = $user_role;
            $_SESSION['logged_in'] = TRUE;

            $target_page = '';
            switch ($user_role) {
              
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
                    session_destroy();
                    header("Location: login.php?error=invalid_role");
                    exit();
            }
            
            header("Location: " . $target_page);
            exit();

        } else {
           
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
   
    header("Location: login.php");
    exit();
}
?>
