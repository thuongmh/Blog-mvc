/**
 * Created by Administrator on 07/12/2016.
 */
var URL = "http://localhost:8000/";
function login() {
    var username = $("#usernameLog").val();
    var password = $("#passwordLog").val();
    $(".errorLog").text("");
    $.ajax({
        method: "post",
        url :"/home/login",
        data: {username: username, password: password, action: "login" },
        success: function (data) {
            data = $.parseJSON(data);
            console.log(data);
            if (data.error == false){
                var html = "<div class='btn-group'> " +
                    "<button type='button' class='btn button_logout '>" + "Xin chào: " + username + "</button> " +
                    "<button type='button' class='btn dropdown-toggle button_logout' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'> <span class='caret'></span> <span class='sr-only'>Toggle Dropdown</span> </button> " +
                    "<ul class='dropdown-menu menu_user'> " +
                    "<li><a href='#' onclick= 'logout()' >Đăng xuất</a></li> " +
                    "<li><a href='/profile'>Profile</a></li></ul></div>"
                $("#login").remove();
                $("#username").html(html);
                $("#myModal").modal("toggle");
            } else {
                $(".errorLog").text(data.message);
            }
        }
    })
}

function register() {
    var username = $("#namerg").val();
    var email = $("#emailrg").val();
    var password = $("#passwordrg").val();
    $(".error").text("");
    $.ajax({
        method: "post",
        url:"/home/register",
        data: {username: username, email: email, password: password, action: "register"},
        success: function (data) {
            data = $.parseJSON(data);
            console.log(data.length);
            if (data.length == 0){
                var html = "<div class='btn-group'> " +
                    "<button type='button' class='btn button_logout '>" + "Xin chào: " + name + "</button> " +
                    "<button type='button' class='btn dropdown-toggle button_logout' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'> <span class='caret'></span> <span class='sr-only'>Toggle Dropdown</span> </button> " +
                    "<ul class='dropdown-menu menu_user'> " +
                    "<li><a href='#' onclick= 'logout()' >Đăng xuất</a></li> " +
                    "<li><a href='/profile' >Profile</a></li> </ul> </div>";
                $("#login").remove();
                $("#username").html(html);
                $("#myModal").modal("toggle");
            } else {
                for (i = 0; i < data.length; i++) {
                    $(".error").append(data[i] + "<br />");
                }
            }
        },
        beforeSend: function () {
            $('.modal-dialog').css('opacity',0.85);
            $('.overlay-loader').css('display','block');
        },
        complete: function () {
            $('.modal-dialog').css('opacity',1);
            $('.overlay-loader').css('display','none');
        }

    })
}

function logout () {
    $.ajax({
        method: "post",
        url:"/home/logout",
        data: {action: "logout"},
        success: function (data) {
            console.log(data);
            var html = "<a class='btn button_login' data-toggle='modal' data-target='#myModal'>Login</a>";
            $(".logout").remove();
            $("#username").html(html);
        }
    });
    window.location.href = URL;
}

// function showModalAvatar(id_user) {
//     $("#myModal_avatar").modal();
// }
// function update_avatar (id_user) {
//     var avatar_new = $("#avatar_new").val();
//     var id_user = id_user;
//     $.ajax({
//         method:"post",
//         url: "http://localhost/blog-mvc/profile/update_ava",
//         data: {
//             action: "update_ava",
//             id_user: id_user,
//             avartar: avatar_new
//         },
//         success:function (data) {
//             data = $.parseJSON(data);
//             console.log(data);
//         }
//     })
//     $("#myModal_avatar").modal("toggle");
// }
function submitComment(blogId, userId) {
    blogId = $("#blog-id-cm").val();
    userId = $("#user-id-cm").val();
    comment = $("#comment-detail").val();
    $.ajax({
        method: "post",
        url: "/blogs/detail/" + blogId,
        data: {
            action: "comment",
            blog_id: blogId,
            user_id: userId,
            comment: comment
        },
        success: function (data) {
            console.log(data);
        }
    })
}

$(document).ready(function () {

    $("#search").keyup(function () {
        var search =  $("#search").val();
        if (search == ""){
            $(".results_search").css("display", "none");
        }else {
            $.ajax({
                method: "post",
                url: "/home/search",
                data: {
                    search: search,
                    action: "search"
                },
                success:function (data) {

                    $(".results_search").css("display", "block");
                    data = JSON.parse(data);

                        var html = "";

                        // console.log(data.length);
                        for (var i = 0; i < data.length; i++)
                        {
                            html += "<li><a>" + data[i].title  +"</a></li>";

                        }
                        $("#results_search").html(html);

                }
            })
        }


    })
    // $("#search_btn").click(function () {
    //     // $("#results_search").css()
    //     var search = $("#search").val();
    //     $.ajax({
    //         method: "post",
    //         url: "http://localhost/blog-mvc/home/search_btn",
    //         data: {
    //             search: search,
    //             action: "search"
    //         },
    //         success:function (data) {
    //             data = JSON.parse(data);
    //             console.log(data);
    //             var html = "";
    //
    //             // console.log(data.length);
    //             for (var i = 0; i < data.length; i++)
    //             {
    //                 html += "<a>" + data[i].title  +"</a></br>";
    //
    //             }
    //             $("#results_search").html(html);
    //         }
    //     })
    // })
    
})

function getReplyTo(user_id, username) {
    $("#reply_to").css("display", "block");
    $("#reply_to_username").val(user_id);
    $("#reply_to").val(username);
}

function submitComment(blogId, userId) {
    blogId = $("#blog-id-cm").val();
    userId = $("#user-id-cm").val();
    comment = $("#comment-detail").val();
    replyTo = $("#reply_to_username").val();
    $.ajax({
        method: "post",
        url: "/blogs/detail/" + blogId,
        data: {
            action: "comment",
            blog_id: blogId,
            user_id: userId,
            comment: comment,
            reply_to: replyTo
        },
        success: function (data) {
            data = $.parseJSON(data);
            console.log(data);
            if (data.reply_to == 0) {
                var html = '<div class="media response-info comment-detail-' + data.user_id +'"><div class="media-left response-text-left"> ' +
                    '<a href="#"> <img src="' + data.avatar + '" class="img-responsive" alt=""> </a> </div>' +
                    ' <div class="media-body response-text-right"> <p>' + data.comment + '</p> <ul> <li>' + data.created_at + '</li> <li><a href="#">Reply</a></li> </ul>' +
                    ' <div class="media response-info comment-reply-' + data.user_id +'"> <div class="media-left response-text-left"> </div> </div></div>';
                $(".comment-detail").append(html);
            } else {
                var html1 = '<div class="media response-info comment-reply-' + data.reply_to + '"><div class="media-left response-text-left">' +
                    ' <a href="#"> <img src="' + data.avatar +'" class="img-responsive" alt=""> </a> </div> ' +
                    '<div class="media-body response-text-right"> <strong>Answers</strong> <p>' + data.comment + '</p> ' +
                    '<ul> <li>' + data.created_at + '</li> <li><a href="javascript:void(0)">Reply</a></li> </ul> </div> ' +
                    '<div class="clearfix"></div>';
                $(".comment-detail").append(html1);
            }
        }
    })
    $("#comment-detail").val("");
    $("#reply_to").val("");
    $("#reply_to").css("display", "none");
}

$(document).ready(function () {

    $user_id = $("#user_id_edit").val();

    $.fn.editable.defaults.mode = 'popup';

    // change profile
    $('#email-edit').editable({
        type: "text",
        url: "/profile",
        pk: $user_id,
        name:  'email_edit',
        title: 'Edit Email',
        success: function(response, newValue) {
            if (response.status == 'error')
                return response.msg; //msg will be shown in editable form
            console.log(newValue);
        }
    });

    $('#description-edit').editable({
        type: "textarea",
        url: "/profile",
        pk: $user_id,
        name:  'description_edit',
        title: 'Edit Description',
        success: function(response, newValue) {
            if (response.status == 'error')
                return response.msg; //msg will be shown in editable form
            console.log(newValue);
        }
    });

    $("#submit-reset").click(function () {
        var email = $("#email-reset").val();
        $.ajax({
            method: "post",
            url: "/reset",
            data: {
                action: "reset",
                email: email
            },
            success: function (data) {
                data = $.parseJSON(data);
                $("#notication").text(data.message);
            },
            beforeSend: function () {
                $('.overlay-loader').css('display','block');
            },
            complete: function () {
                $('.overlay-loader').css('display','none');
            }
        })
    })
})