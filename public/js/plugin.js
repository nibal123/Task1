$(document).ready(function(){
    $("p").click(function(){
        $(this).hide();
    });

    $.get('/users/',  // url
        function (data, textStatus) {  // success callback
         data.forEach(u=>{
             $("#users").append(`<tr id={u.id}> <td>${u.id}</td> <td>${u.name}</td> <td>${u.address}</td> <td> <a  id=${`delete${u.id}`} name="delete" class="btn-floating btn-large red"> <i class="large material-icons">delete</i> </a> </td> </tr>`);
             console.log(u);
         })
        });

    $('a[id^="delete"]').click(function(){

        console.log("gggg" );
    });
    $("a").click(function(event) {
        alert(event.target.id);
    });


});

