<?php
    // create connection
    $conn = mysqli_connect("localhost", "root", "", "users");
    // check connection
    if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
    }
    // register user
    $sql = "INSERT INTO students (username, password) VALUES
    ('$username', '$password')";
    $results = mysqli_query($conn, $sql);
    if ($results) {
    echo "The user has been registered";
    } else {
    echo mysqli_error($conn);
    }
    mysqli_close($conn); // close connection
?>