$(document).ready(function(){
    $("p").click(function(){
        $(this).hide();
    });

    $.get('/users/',  // url
        function (data, textStatus) {  // success callback
         data.forEach(u=>{
             $("#users").append(`<tr id=${`user`+u.id}>
 <td>${u.id}</td> <td>${u.name}</td> <td>${u.address}</td> 
 <td> 
 
 
 <a class='dropdown-button btn' href='#' data-activates='dropdown1${u.id}'><i class="large material-icons">arrow_drop_down_circle</i> </a>

  <!-- Dropdown Structure -->
  <ul id='dropdown1${u.id}' class='dropdown-content'>
     <li
    id=${u.id}  class="btn-floating btn-large red"> <i class="large material-icons">delete</i>  </li>
     <li
    id=${u.id}  class="btn-floating btn-large red"> <i class="large material-icons">edit</i>  </li>
    
      
  </ul> 
 </td> </tr>`);
             console.log(u);
             $('.dropdown-button').dropdown({
                     inDuration: 300,
                     outDuration: 225,
                     constrainWidth: false, // Does not change width of dropdown to that of the activator
                     hover: true, // Activate on hover
                     gutter: 5   , // Spacing from edge
                     belowOrigin: true, // Displays dropdown below the button
                     alignment: 'left', // Displays dropdown with edge aligned to the left of button
                     stopPropagation: false // Stops event propagation
                 }
             );

         })


            $('li').click(function(event) {
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

                         $(`tr[id=${x}]`).remove();
                        $(`li[id=${x}]`).remove();
                    }
                });
            });
        });



});

