import { Component, ViewChild } from '@angular/core';
import { StorageService, Todo } from '../services/storage.service';
import { Platform, ToastController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  todos: Todo[] = [];

  newTodo: Todo = <Todo>{};

  @ViewChild('mylist')mylist: IonList;

  constructor(private storageService: StorageService, private plt: Platform, private toastController: ToastController) {
    this.plt.ready().then(() => {
      this.loadTodos();
    });
  }

  // READ
  loadTodos() {
    this.storageService.getTodos().then(todos => {
      this.todos = todos;
    });
  }

  // UPDATE
  updateTodo(todo: Todo) {
    todo.task = `UPDATED: ${todo.task}`;
    todo.status = "";

    this.storageService.updateTodo(todo).then(todo => {
      this.showToast('Item modifié!');
      this.mylist.closeSlidingItems(); // Fix or sliding is stuck afterwards
      this.loadTodos(); // Or update it inside the array directly
    });
  }

  // DELETE
  deleteTodo(todo: Todo) {
    this.storageService.deleteTodo(todo.id).then(todo => {
      this.showToast('Todo supprimé!');
      this.mylist.closeSlidingItems(); // Fix or sliding is stuck afterwards
      this.loadTodos(); // Or splice it from the array directly
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