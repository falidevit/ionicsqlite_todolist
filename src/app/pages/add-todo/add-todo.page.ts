import { Component, OnInit } from '@angular/core';
import { StorageService, Todo } from '../../services/storage.service';
import { Platform, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.page.html',
  styleUrls: ['./add-todo.page.scss'],
})
export class AddTodoPage implements OnInit {
  todos: Todo[] = [];
  todoId = null;

  newTodo: Todo = <Todo>{};

  constructor(private storageService: StorageService,
              private plt: Platform,
              private route: ActivatedRoute,
              private loadingController: LoadingController,
              private toastController: ToastController
              ) 
              {}
  ngOnInit() {
    this.todoId = this.route.snapshot.params['id'];
   
  }


  
    // CREATE
    addTodo() {
      this.newTodo.id = Date.now();
      this.newTodo.createdAt= new Date(),

  
      this.storageService.addTodo(this.newTodo)
      .then(todo => {
        this.newTodo = <Todo>{};
        this.showToast('Todo Ajouté!')
      });
    }

      // Helper
  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
