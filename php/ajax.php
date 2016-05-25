<?php
/**
 * Created by PhpStorm.
 * User: Loana
 * Date: 23.05.2016
 * Time: 06:40
 */
include_once 'ClassImports.php';
include 'dbAdapter.php';

    $response = $_POST['id'];
    //$insertID = -1;
    $insertID = array();
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
        case 'getAllBlogs':
            $dbAdapter = new dbAdapter();
            $dbAdapter->connect();            
            $insertID = $dbAdapter->getAllBlogs();
            $dbAdapter->disconnect();
            break;
        case 'getBlogById':
            $dbAdapter = new dbAdapter();
            $dbAdapter->connect();
            $blogId = $_POST['blogId'];
            $insertID = $dbAdapter->getBlogByID($blogId);
            $dbAdapter->disconnect();
            break;
        case 'deleteBlog':
            $dbAdapter = new dbAdapter();
            $dbAdapter->connect();
            $blogId = $_POST["blogid"];
            //$insertID = $dbAdapter->de($tblogentry);
            $dbAdapter->disconnect();
        case 'updateBlog':
            $dbAdapter = new dbAdapter();
            $dbAdapter->connect();
            $blogId = $_POST["blogid"];
            $tblog = $dbAdapter -> getBlogByID($blogId);
            $insertID = $dbAdapter->updateBlog($tblog);
            $dbAdapter->disconnect();
        case 'insertBlogEntry':
            $tblogentry = new tblogentry();
            $tblogentry ->blogid = $_POST['blogid'];
            $tblogentry ->titel= $_POST['title'];
            $tblogentry ->picture= $_POST['picture'];
            $tblogentry ->description = $_POST['description'];
            $tblogentry ->createdate = $_POST['createdate'];
            $dbAdapter = new dbAdapter();
            $dbAdapter->connect();
            $insertID = $dbAdapter->insertBlogEntry($tblogentry);
            $dbAdapter->disconnect();
            break;
        case 'getBlogEntries':
            $dbAdapter = new dbAdapter();
            $dbAdapter->connect();
            $blogId = $_POST["blogId"];
            $tblogentry = new tblogentry();
            $tblogentry ->blogid = 1;
            $tblogentry ->titel= "einTitel";
            $tblogentry ->description = "Eine Beschreibung";
            $tblogentry ->createdate = "12.12.2016";
            $tblogentry2 = new tblogentry();
            $tblogentry2 ->blogid = 1;
            $tblogentry2 ->titel= "einTitel2";
            $tblogentry2 ->description = "Eine Beschreibung2";
            $tblogentry2 ->createdate = "14.12.2016";
            $allBlog[0] = $tblogentry;
            $allBlog[1] = $tblogentry;
            $insertID = $allBlog;//$dbAdapter->getAllBlogEntryByBlogID($blogId);
            $dbAdapter->disconnect();
            break;
        case  'deleteBlogEntries':
            $dbAdapter = new dbAdapter();
            $dbAdapter->connect();
            $blogEntryId = $_POST["blogEntryId"];
            $insertID = $dbAdapter->deleteEntry($blogEntryId);
            $dbAdapter->disconnect();
            break;
        case  'updateBlogEntry':
            $dbAdapter = new dbAdapter();
            $dbAdapter->connect();
            $blogEntryId = $_POST["blogEntryId"];
            $tblogEntry = $dbAdapter->getBlogEntryByID($blogEntryId);
            $insertID = $dbAdapter->updateBlogEntry($tblogEntry);
            $dbAdapter->disconnect();
            break;
        case 'login':
            break;
    }
//echo print_r($_POST);
//echo print_r($insertID);
echo json_encode($insertID);
?>