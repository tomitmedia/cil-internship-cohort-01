window.addEventListener('load', () => {
	const form = document.querySelector("#new-task-form");
	const input = document.querySelector("#new-task-input");
	const list_el = document.querySelector("#tasks");

	form.addEventListener('submit', (e) => {
		e.preventDefault();

		const task = input.value;

		const task_el = document.createElement('div');
		task_el.classList.add('task');

		const task_content_el = document.createElement('div');
		task_content_el.classList.add('content');

		task_el.appendChild(task_content_el);

		const task_input_el = document.createElement('input');
		task_input_el.classList.add('text');
		task_input_el.type = 'text';
		task_input_el.value = task;
		task_input_el.setAttribute('readonly', 'readonly');

		task_content_el.appendChild(task_input_el);

		const task_actions_el = document.createElement('div');
		task_actions_el.classList.add('actions');
		
		const task_edit_el = document.createElement('button');
		task_edit_el.classList.add('edit');
		task_edit_el.innerText = 'Edit';

		const task_delete_el = document.createElement('button');
		task_delete_el.classList.add('delete');
		task_delete_el.innerText = 'Delete';

		task_actions_el.appendChild(task_edit_el);
		task_actions_el.appendChild(task_delete_el);

		task_el.appendChild(task_actions_el);

		list_el.appendChild(task_el);

		input.value = '';

		task_edit_el.addEventListener('click', (e) => {
			if (task_edit_el.innerText.toLowerCase() == "edit") {
				task_edit_el.innerText = "Save";
				task_input_el.removeAttribute("readonly");
				task_input_el.focus();
			} else {
				task_edit_el.innerText = "Edit";
				task_input_el.setAttribute("readonly", "readonly");
			}
		});

		task_delete_el.addEventListener('click', (e) => {
			list_el.removeChild(task_el);
		});
	});
});





let lastId = 200

window.onload = () =>{
    loadDoc()
} 

function loadDoc() {
    let content = ""
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {

        const oldData = this.responseText
        const newData = JSON.parse(oldData);
        content += 
        '<table><tr ><th>ID </th> <th> USER ID </th>  <th> TITLE</th>  <th> ACTIONS </th> </tr>';
        newData.forEach( (datas,index) => {
            content += `<tr class="tr-${index}"> <td>` 
            + datas.id + '</td>' + '<td>' + datas.userId 
            + '</td>'  + '<td>' + datas.title + '</td>'
           +  '<td>' + '<button onclick="editTodo(this)">EDIT</button> '
           + '</td>' +  '</tr>' ;
        });
        content+= '</table>';
        document.getElementById("demo").innerHTML = content;

      }
    };
    xhttp.open("GET", "https://jsonplaceholder.typicode.com/todos");
    xhttp.send();
}

const addTodo = () =>{
        let new_title = document.getElementById("text_input").value;
        if(typeof new_title == 'undefined' || new_title == ''){
            return false;
        }            
	
	fetch('https://jsonplaceholder.typicode.com/todos/', {
		method: 'POST',
		body: JSON.stringify({
		title: new_title,
         completed: false,
		  userId: 11
		}),
		headers: {
		  "Content-type": "application/json; charset=UTF-8"
		}
	  })
	  .then(response => response.json())
	  .then(json => {console.log(json);
        document.getElementById("text_input").value = ""
        addNewTodo(json)
    })
}

const addNewTodo = (arg) => {
    oldContent = document.querySelector("table").innerHTML;
    newRow = `<tr class="tr-${++lastId}"><td>${lastId}</td> <td>${arg.userId}</td> <td>${arg.title}</td> <td><button onclick=\"editTodo(this)\">EDIT</button> </td> </tr>`;
    document.querySelector("table").innerHTML = oldContent + newRow;
}

const editTodo = (arg) => {
    let parentC = arg.parentElement.parentElement.className;
    let oldTitle = document.querySelector(`.${parentC} > td:nth-child(3)`).innerHTML;
    let id = document.querySelector(`.${parentC} > td:nth-child(1)`).innerHTML;
    let userId = document.querySelector(`.${parentC} > td:nth-child(2)`).innerHTML
    document.getElementById('text_input').value = oldTitle
    document.getElementById("btn").setAttribute("onclick", `addEditTodo('${parentC}',${id},${userId})`)
    document.getElementById("btn").innerHTML = "SAVE CHANGES"
}


const addEditTodo = (arg,newId,newUserId) => {

    newTitle = document.getElementById("text_input");
    if(typeof newTitle.value == "undefined" || newTitle.value == ""){
        alert("Please input a valid title")
        return false;
    }

    document.querySelector(`.${arg} > td:nth-child(3)`).innerHTML = newTitle.value;
    document.getElementById("btn").innerHTML = "Add New Todo"
    document.getElementById("btn").setAttribute("onclick", "addTodo()")

    fetch(`https://jsonplaceholder.typicode.com/todos/${newId}`, {
		method: 'PUT',
		body: JSON.stringify({
		title: newTitle.value,
		id:newId,
         completed: false,
		  userId:newUserId
		}),
		headers: {
		  "Content-type": "application/json; charset=UTF-8"
		}
	  })
	  .then(response => response.json())
	  .then(json => {console.log(json);

    })
    newTitle.value = ""
}