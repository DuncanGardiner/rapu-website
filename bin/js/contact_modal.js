//Modal Popup Controller

//OPEN THE MODAL FROM THE CONTACT BUTTON
function toggle_open(oForm){
    var e = document.getElementById(oForm);
    e.style.display = 'block';
}

//CLOSE THE MODAL FROM THE CLOSE BUTTON WITHIN THE POPUP
function toggle_close(oForm, display, box){
    //First we load the two propertys to some varibles
    var form = document.getElementById(oForm)
    var e = document.getElementById(display)
    document.getElementById(box).setAttribute("style","width:290px");
    // Now we use the form id to clear out the form elements
    form.reset();
    //Then we set the display to none to hide the modal from the view
    e.style.display = 'none';
}

