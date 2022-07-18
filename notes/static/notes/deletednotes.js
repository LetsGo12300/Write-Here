document.addEventListener('DOMContentLoaded', function(){

    document.querySelectorAll(".note-item").forEach(item => {
        let note_id = item.id.slice(5);
        let note_div = document.getElementById(`note-${note_id}`);
        let res_btn = document.getElementById(`restore-btn-${note_id}`);
        var note_btns = document.getElementById(`note-btns-${note_id}`);
        
        item.addEventListener("mouseenter", () => {
            note_btns.style.display = 'block';
        });

        item.addEventListener("mouseleave", () => {
            note_btns.style.display = 'none';
        });


        res_btn.addEventListener("click", function (event) {
            //Animation for restoring a post
            note_div.style.animationPlayState = 'running';
            note_div.addEventListener('animationend', ()=> {
                note_div.remove();
            });
            
            fetch(`/update_note/${note_id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    deleted: false
                })
              })
            event.stopPropagation();
        }, false);
    

        

    });

    let del_btn = document.getElementById('delete-btn');


    del_btn.onclick = function() {
        if (confirm("Are you sure to delete all notes in the trash permanently?")){
            fetch('/deleteall',{
                method: 'PUT',
                body: JSON.stringify({
                    deleted_ids: getDeletedIDs()
                })
            })

            document.querySelectorAll(".note-item").forEach(item => {
                item.style.animationPlayState = 'running';
                item.addEventListener('animationend', ()=> {
                    item.remove();
                });
            });
            
        }
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

function getDeletedIDs(){
    const L = [];
    document.querySelectorAll(".note-item").forEach(item => {
        L.push(parseInt(item.id.slice(5)));
        //item.style.display = 'none';
    });
    return L;
    
}