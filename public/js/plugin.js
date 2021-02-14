$(document).ready(function () {
    $("p").click(function () {
        $(this).hide();
    });

    $.get('/users/',  // url
        function (data, textStatus) {  // success callback
            data.forEach(u => {
                $("#users").append(`
<tr id=${`user` + u.id}>
 <td >${u.id}</td> <td id=${`name` + u.id}>${u.name}</td> <td id=${`address` + u.id} >${u.address}</td> 
 <td> 
 
 
 <a class='dropdown-button btn' href='#' data-activates='dropdown1${u.id}'><i class="large material-icons">arrow_drop_down_circle</i> </a>

  <!-- Dropdown Structure -->
  <ul id='dropdown1${u.id}' class='dropdown-content'>
     <li
    id=${`delete` + u.id}  class="btn-floating btn-large red"> <i class="large material-icons">delete</i>  </li>
     <li
    id=${`edit` + u.id}   data-target="modal2" class="btn-floating btn-large red modal-trigger"> <i class="large material-icons">edit</i>  </li>
    
      
  </ul> 
 </td> </tr>`);
                console.log(u);
                $('.dropdown-button').dropdown({
                        inDuration: 300,
                        outDuration: 225,
                        constrainWidth: false, // Does not change width of dropdown to that of the activator
                        hover: true, // Activate on hover
                        gutter: 5, // Spacing from edge
                        belowOrigin: true, // Displays dropdown below the button
                        alignment: 'left', // Displays dropdown with edge aligned to the left of button
                        stopPropagation: false // Stops event propagation
                    }
                );

            });
            $('li').click(function (event) {
                if (this.id.startsWith("delete")) {

                    console.log(this.id);
                    var idd = this.id.replace("delete", "");
                    console.log(idd)

                    $.ajax({
                        url: "/users/" + idd,
                        type: 'DELETE',
                        success: function (result) {
                            // Do something with the result
                            console.log(idd);
                            //$("tr").attr("id", "12").hide();
                            var x = "user" + idd;

                            $(`tr[id=${x}]`).remove();
                            $(`li[id=${x}]`).remove();
                        }
                    });
                }

                if (this.id.startsWith("edit")) {
                    console.log(this.id);
                    var idd = this.id.replace("edit", "");
                    console.log(idd);

                    $.get('/users/' + idd,  // url
                        function (data, err) {

                            console.log(data)
                            $('#first_name1').val(data[0].name.split(" ")[0]);
                            $('#last_name1').val(data[0].name.split(" ")[1]);
                            $('#address1').val(data[0].address);
                        })
                    saveUser(idd)

                }
            });
        });
    document.addEventListener('DOMContentLoaded', function () {
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, options);
    });

    $('.modal').modal();
    var saveUser = (idd) => {

        $("#save1").click((event) => {

            var firstName = $('#first_name1').val();
            var lastName = $('#last_name1').val();
            var address = $('#address1').val();
            $.ajax({
                url: "/users/" + idd,
                type: 'PUT',
                data: {
                    "name": firstName + " " + lastName, "address": address
                },
                success: function (result) {

                    console.log(idd + " updated");


                    $(`td[id=name${idd}]`).text(firstName + " " + lastName);
                    $(`td[id=address${idd}]`).text(address);


                }
            });

        })
    }

    $("#save").click((res) => {
        var firstName = $('#first_name2').val();
        var lastName = $('#last_name2').val();
        var address = $('#address').val();


        $.post("/users/", {
            "name": firstName + " " + lastName,
            "address": address
        }).done(function (data) {

            $("#users").append(`<tr id=${`user` + data}>
 <td>${data}</td> <td>${firstName + " " + lastName}</td> <td>${address}</td> 
 <td> 
 
 
 <a class='dropdown-button btn' href='#' data-activates='dropdown1${data.trim()}'><i class="large material-icons">arrow_drop_down_circle</i> </a>

  <!-- Dropdown Structure -->
  <ul id='dropdown1${data.trim()}' class='dropdown-content'>
     <li
    id=${`delete` + data}  class="btn-floating btn-large red"> <i class="large material-icons">delete</i>  </li>
     <li
    id=${`edit` + data}   data-target="modal2" class="btn-floating btn-large red modal-trigger"> <i class="large material-icons">edit</i>  </li>
    
      
  </ul> 
 </td> </tr>`);
            $('.dropdown-button').dropdown({
                    inDuration: 300,
                    outDuration: 225,
                    constrainWidth: false, // Does not change width of dropdown to that of the activator
                    hover: true, // Activate on hover
                    gutter: 5, // Spacing from edge
                    belowOrigin: true, // Displays dropdown below the button
                    alignment: 'left', // Displays dropdown with edge aligned to the left of button
                    stopPropagation: false // Stops event propagation
                }
            );


        });


        $("#first_name2").val("");
        $("#last_name2").val("");
        $("#address").val("");

    });

    $("#cancel").click(() => {
        $("#first_name2").val("");
        $("#last_name2").val("");
        $("#address").val("");

    });
    $("#cancel1").click(() => {
        $("#first_name2").val("");
        $("#last_name2").val("");
        $("#address").val("");

    });

});

$('.dropdown-button').dropdown({
        inDuration: 300,
        outDuration: 225,
        constrainWidth: false, // Does not change width of dropdown to that of the activator
        hover: true, // Activate on hover
        gutter: 5, // Spacing from edge
        belowOrigin: true, // Displays dropdown below the button
        alignment: 'left', // Displays dropdown with edge aligned to the left of button
        stopPropagation: false // Stops event propagation
    }
);
