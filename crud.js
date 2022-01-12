var app = new function(){
    this.el= document.getElementById('tasks');
    this.tasks=[]
    let arraytasks=[];

    this.FetchAll = function(){
        var data='';
        console.log(tasks)

         if (this.tasks.length > 0){
             for(i = 0; i < this.tasks.length; i++) {
               data += '<tr>';
               data += '<td>'+(i+1)+". "+this.tasks[i]+'</td>';
               data += '<td><button onclick="app.Edit(' + i + ')" class="btn btn-warning">Editar</button></td>'; 
               data += '<td><button onclick="app.Delete(' + i + ')" class="btn btn-danger">Eliminar</button></td>'; 
               data += '</tr>'
             }
         }
         this.Count(this.tasks.length);
         return this.el.innerHTML = data
    };
    this.Add = function(){
        el = document.getElementById('add-todo');
        
        var task = el.value;
        if(task){
            this.tasks.push(task.trim());
            el.value='';
            this.FetchAll();
            arraytasks.push(item);
        }
    };
    this.Edit = function(item){
        el = document.getElementById('edit-todo');
        el.value = this.tasks[item]
        document.getElementById('edit-box').style.display ='block';
        self=this;

        document.getElementById('save-edit').onsubmit = function (){
            var task = el.value;
            if(task){
                self.tasks.splice(item, 1, task.trim());
                self.FetchAll();
                CloseInput();
            }
        }
    };
    this.Delete = function(item){
        this.tasks.splice(item,1)
        this.FetchAll();
    };
    this.Count = function(data){
        var el = document.getElementById('counter');
        var name = 'Tareas';
        if(data){
            if(data == 1){
                name = 'Tarea';
            } 
            el.innerHTML = data+' '+name;
        }
        else{
            el.innerHTML = "0 "+ name;
        }
    };
}

app.FetchAll();
function saveBD(){
    localStorage.setItem('tasks',JSON.stringify(arraytasks));
}
document.addEventListener('DOMContentLoaded',showBD);
function showBD(){
   arraytasks=JSON.parse(localStorage.getItem('tasks'));
   for(var i=0;i<arraytasks.length;i++){
       FetchAll.innerHTML=`
     <div id="edit-box" role="aria-hidden">
         <form action="javascript:void(0);" method="post" id="save-edit">
         <input type="text" id="edit-todo">
         <strong>${arraytasks[i].task}</strong>--${arraytasks[i].estado}
         <input type="submit" value="Guardar" class="btn btn-success"/>
           <a onclick="CloseInput()" aria-label="Close">&#10006;</a>
         </form>
     </div>
       `
   }
}

function CloseInput(){
document.getElementById('edit-box').style.display = 'none';
}