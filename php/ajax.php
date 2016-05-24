<?php
/**
 * Created by PhpStorm.
 * User: Loana
 * Date: 23.05.2016
 * Time: 06:40
 */
include_once 'ClassImports.php';
include 'dbAdapter.php';

/*try{
    $response = array();

    switch ($_GET['action']){
        case 'insertBlog':
            $tblog = new tblog();
            $tblog ->title = $_POST['title'];
            $tblog ->description= $_POST['description'];
            $tblog ->destination= $_POST['destination'];
            $tblog ->date = $_POST['startdate'];
            $response= dbAdapter::insertBlog($tblog);
            break;
            
        default:
            throw new Exception('Wrong Action');
    }
    echo json_encode($response);
} catch (Exception $e){
    die(json_encode(array('error' => $e->getMessage())));
}*/
    $response = $_POST['id'];
    $insertID = -1;
    switch ($response){
        case 'insertBlog':
            $tblog = new tblog();
            $tblog ->titel = $_POST['title'];
            $tblog ->description= $_POST['description'];
            $tblog ->destination= $_POST['destination'];
            $tblog ->startdate = $_POST['startdate'];
            $dbAdapter = new dbAdapter();
            $dbAdapter->connect();
            $insertID = $dbAdapter->insertBlog($tblog);
            $dbAdapter->disconnect();
            break;
            
    }
echo print_r($_POST);
?>