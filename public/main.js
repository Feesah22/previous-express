
const toDoListDelete = document.getElementsByClassName("fa-trash")


Array.from(toDoListDelete).forEach(function (element) {

    element.addEventListener('click', function () {
        console.log(this.parentNode.parentNode.childNodes[1].innerText)
        const description = this.parentNode.parentNode.childNodes[1].innerText
      console.log('You clicked on', element)

       let completed = false
        if (element.classList.contains('completed')) {
            completed = true
        }
        fetch('toDoDelete', {
            method: 'delete',
            headers: {
                 'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                 "input" :description
             })
         }).then(function (response) {
             window.location.reload()
         })
    });
 });

