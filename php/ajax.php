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
        case 'getAllBlogs':
            $dbAdapter = new dbAdapter();
            $dbAdapter->connect();
            //$insertID = $dbAdapter->get($tblogentry);
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
            $tblog = new tblog();
            $tblog ->titel = $_POST['title'];
            $tblog ->description= $_POST['description'];
            $tblog ->destination= $_POST['destination'];
            $tblog ->startdate = $_POST['startdate'];
            $dbAdapter = new dbAdapter();
            $dbAdapter->connect();
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
            $insertID = $dbAdapter->getAllBlogEntryByBlogID($blogId)->description;
            //$tblogentry -> description;
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
            $tblogentry = new tblogentry();
            $tblogentry ->blogid = $_POST['blogid'];
            $tblogentry ->titel= $_POST['title'];
            $tblogentry ->picture= $_POST['picture'];
            $tblogentry ->description = $_POST['description'];
            $tblogentry ->createdate = $_POST['createdate'];
            $insertID = $dbAdapter->updateBlogEntry($blogEntryId);
            $dbAdapter->disconnect();
            break;
        case 'login':
            break;
    }
echo print_r($_POST);
//echo print_r($insertID);
?>