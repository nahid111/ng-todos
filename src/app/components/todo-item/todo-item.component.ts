import { TodoService } from './../../services/todo.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/models/Todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo:Todo;
  @Output() deleteTodoEvent: EventEmitter<Todo> = new EventEmitter();

  constructor(private todoService:TodoService) { }

  ngOnInit(): void {
  }

  setClasses(){
    let classes = {
      todo: true,
      'is-complete': this.todo.completed
    }

    return classes
  }

  onToggle(todo){
    // toogel in UI
    todo.completed = !todo.completed;
    // toggle in Server
    this.todoService.toggleCompleted(todo).subscribe(todo=>{
      console.log(todo);
    });
  }

  onDelete(todo){
    this.deleteTodoEvent.emit(todo);
  }

}
 