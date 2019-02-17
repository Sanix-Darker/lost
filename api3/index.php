<?php 

    // Access Control
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Credentials: true");
    header('Access-Control-Allow-Methods: GET, POST');
    header('Access-Control-Max-Age: 1000');
    header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');
    // Cache control
    header("Cache-Control: no-store, no-cache, must-revalidate"); 
    header("Cache-Control: post-check=0, pre-check=0", false); 
    header("Cache-Control: private");
    header("Pragma: no-cache");
    header('Content-Type:application/json; Charset=UTF-8');

    $result = array();
    $allow = array("jpg", "jpeg", "gif", "png");
    $todir = 'uploads/';
    if (isset($_FILES['file']['tmp_name']) ) // is the file uploaded yet?
    {
        if($_FILES["file"]["size"] < 200000){ // < 200Kb
            $info = explode('.', strtolower( $_FILES['file']['name']) ); // whats the extension of the file

            if ( in_array( end($info), $allow) ) // is this file allowed
            {
                $path = $todir . basename($_FILES['file']['name'] );
                if ( move_uploaded_file( $_FILES['file']['tmp_name'], $path ) )
                {
                    // the file has been moved correctly
                    $result['status'] = 'success';
                    $result['url'] = $_SERVER['SERVER_NAME']."/".$path;
                }
            }
            else
            {
                // error this file ext is not allowed
                $result['status'] = 'error';
                $result['reason'] = 'Error this file ext is not allowed';
            }
        }else{
            $result['status'] = 'error';
            $result['reason'] = 'Error this file size need to be under 200kb';
        }
    }else{
        $result['message'] = 'Welcome to LostImage API';
        $result['reason'] = 'Please provide a valid image file to this url';
    }

    echo json_encode($result);
?>