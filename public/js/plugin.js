$(document).ready(function(){
    $("p").click(function(){
        $(this).hide();
    });

    $.get('/users/',  // url
        function (data, textStatus) {  // success callback
         data.forEach(u=>{
             $("#users").append(`<tr id=${`user`+u.id}> <td>${u.id}</td> <td>${u.name}</td> <td>${u.address}</td> <td> <a  id=${u.id} name="delete" class="btn-floating btn-large red"> <i class="large material-icons">delete</i> </a> </td> </tr>`);
             console.log(u);
         })


            $('a').click(function(event) {
             console.log(this.id)
                var idd=this.id;
             var a=this;
                $.ajax({
                    url: "/users/"+idd,
                    type: 'DELETE',
                    success: function(result) {
                        // Do something with the result
                        console.log(idd);
                        //$("tr").attr("id", "12").hide();
                        var x="user"+idd;
                        console.log(typeof (x));
                         $(`tr[id=${x}]`).hide();

                    }
                });
            });
        });





});

