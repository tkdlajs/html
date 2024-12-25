$(document).ready(function(){
    $("#btnHide").click(function(){
        $("h2").fadeOut(300);
    })
    //--------------------------------------------
    $("#btnShow").click(function(){
        $("h2").fadeIn(300);
    })
    //--------------------------------------------
    $("#btnToggle").click(function(){
        $("h2").fadetoggle(300);

    })
    //--------------------------------------------
    $("h2").click(function(){
        $(this).fadeTo(500,0.5, function(){
           $(this).fadeTo(500,500);
            //alert("clicked!!" + this.innerHTML);

        });
    })


}
)
//--------------------------------------------

