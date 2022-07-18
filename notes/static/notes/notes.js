document.addEventListener('DOMContentLoaded', function(){

    var savebtn = document.getElementById('save-button');

    document.querySelectorAll(".note-item").forEach(item => {
        let note_id = item.id.slice(5);
        let note_div = document.getElementById(`note-${note_id}`);
        let del_btn = document.getElementById(`del-btn-${note_id}`);
        let pin_btn = document.getElementById(`pin-btn-${note_id}`);
        let pin_img = document.getElementById(`pin-img-${note_id}`);
        var note_btns = document.getElementById(`note-btns-${note_id}`);

        //var quill = new Quill(`#content-${note_id}`, {theme: 'snow'});

        item.addEventListener("mouseenter", () => {
            note_btns.style.display = 'block';
            pin_img.style.display = 'none';
        });

        item.addEventListener("mouseleave", () => {
            note_btns.style.display = 'none';

            fetch(`/get_info/${note_id}`)
            .then(response => response.json())
            .then(item => {
                if (item.pinned == "True")
                    pin_img.style.display = 'block';
            });

        });

        item.addEventListener('click', () => {
            
            fetch(`/get_quill/${note_id}`)
            .then(response => response.text())
            .then(item => {
                $(`#form-output`).html(item);
                title(note_id);
                openModal();
            });

            savebtn.onclick = function() {
                var new_content = document.getElementsByClassName('ql-editor')[0].innerHTML;
                var new_title = document.getElementById('form-title').value;
                //UPDATE DATABASE WHEN SAVE BUTTON is CLICKED
                fetch(`/update_note/${note_id}`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        title: new_title,
                        content: new_content
                    })
                  })
                $(`#title-${note_id}`).html(new_title);
                $(`#content-${note_id}`).html(new_content);
                modal.style.display = "none";
            }
        }, false);

        del_btn.addEventListener('click', function (event) {
            //Animation for deleting a post
            note_div.style.animationPlayState = 'running';
            note_div.addEventListener('animationend', ()=> {
                note_div.remove();
            });

            fetch(`/update_note/${note_id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    deleted: true
                })
              })
            event.stopPropagation();
        }, false);

        pin_btn.addEventListener("click", function (event) {
            //Animation for deleting a post
            const pin_value = pin_btn.value;
            note_div.style.animationPlayState = 'running';
            note_div.addEventListener('animationend', ()=> {
                note_div.remove();
                note_div.style.animationPlayState = 'paused';
                if (pin_value == 'pin'){
                    ShowAnimation(note_div);
                    $("#notes-div").prepend(note_div);
                    pin_btn.innerHTML = 'Unpin';
                    pin_btn.value = 'unpin';
                    pin_img.style.display = 'block';
                    
                }
                else if (pin_value == 'unpin'){
                    ShowAnimation(note_div);
                    $("#notes-div").append(note_div);
                    pin_btn.innerHTML = 'Pin';
                    pin_btn.value = 'pin';
                    pin_img.style.display = 'none';
                }
            });


            //Update model Pinned to True of False
            fetch(`/update_note/${note_id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    pinned: true
                })
              })

            event.stopPropagation();
        }, false);


    });

    // Get the modal

    var modal = document.getElementById("myModal");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal
    function openModal() {
    modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
    modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    }

    function title(noteid){
        fetch(`/get_info/${noteid}`)
        .then(response => response.json())
        .then(item => {
            document.getElementById('form-title').value = item.title;
            document.getElementById('timecheck').innerHTML = moment(item.date).format('MMMM Do YYYY, h:mm:ss a');
        });
    }

    //FOR SWITCH:
    //initial view: Notes view
    //when clicked, switch to List view
    var sw = document.getElementById('sw');
    var notes_div = document.getElementById('notes-div');
    var sw_desc = document.getElementById('sw-desc');
    
    sw.onclick = function(){
        console.log("Switch was clicked");
        if (notes_div.className == "notes-view"){
            notes_div.className = "list-view";
            sw_desc.innerHTML = "List View";
        }
        else if (notes_div.className == "list-view"){
            notes_div.className = "notes-view";
            sw_desc.innerHTML = "Notes View";
        }
    }

});

function ShowAnimation(ele){
    ele.style.animationName = 'show';
    ele.style.animationPlayState = 'running';
    ele.addEventListener('animationend', ()=> {
        ele.style.animationName = 'hide';
        ele.style.animationPlayState = 'paused';
    });
}


