<?php
/**
 * Created by PhpStorm.
 * User: Loana
 * Date: 23.05.2016
 * Time: 06:40
 */
include 'tblog.php';
include 'tblogentry.php';
include 'tbuser.php';
include 'dbAdapter.php';

try{
    $response = array();

    switch ($_GET['action']){
        case 'insertBlog':
            $response= dbAdapter::insertBlog($_POST['tblog']);
            break;
        case 'id':
            
        default:
            throw new Exception('Wrong Action');
    }
    echo json_encode($response);
} catch (Exception $e){
    die(json_encode(array('error' => $e->getMessage())));
}
?>