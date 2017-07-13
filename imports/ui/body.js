import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
 
import { Tasks } from '../api/data.js';
import {Completedtasks } from '../api/data.js'
import {Deletedtasks} from '../api/data.js'

 
import './body.html';


Template.body.onCreated(function bodyOnCreated() {
  Meteor.subscribe('tasks');
  Meteor.subscribe('completedtasks');
  Meteor.subscribe('deletedtasks');
});
 
Template.body.helpers({

  tasks() {
     return Tasks.find({"username":Meteor.user().username}, { sort: { createdAt: -1 } } );
  },

  completedtasks(){
    return Completedtasks.find({"username":Meteor.user().username});
  },

  deletedtasks(){
    return Deletedtasks.find({"username":Meteor.user().username});
  },

});


Template.body.events({

  'submit .new-task'(event) {
 
       event.preventDefault();     //prevent the browser from submitting
       const target = event.target;
       const text = target.text.value;
 
       Meteor.call('tasks.insert', text);
 
       target.text.value = '';   //clears the form after submiting the new task
  },

  'click .edit'(event){
       event.target.closest("li").contentEditable=true; 
  },

  'click .save'(event){
     event.preventDefault();
     var newtext = $(event.target).closest('li.note').find('.text').text();
     console.log(newtext);
       Meteor.call('tasks.update',this._id,newtext);
  },

  'click .delete'(event) {
      var deletedtext = $(event.target).closest('li.note').find('.text').text();  
       var result = confirm("Delete the task!"); //confirm before deleting the task
       if (result){
           Meteor.call('deletedtasks.insert',deletedtext);
           Meteor.call('tasks.remove', this._id);
       }
  },

  'click .completed'(event){

      var completedtext = $(event.target).closest('li.note').find('.text').text(); 
      var result = confirm("Is the task completed!");
      if(result){
      Meteor.call('completedtasks.insert', completedtext);
      Meteor.call(Meteor.call('tasks.remove', this._id));
    }
  },

  'click .delete_complete'(event){
    var result = confirm("Remove from completed list!"); //confirm before deleting the task
       if (result){
           Meteor.call('completedtasks.remove', this._id);
       }
  },

  'click .delete_delete'(event){
    var result = confirm("Remove from deleted list!"); //confirm before deleting the task
       if (result){
           Meteor.call('deletedtasks.remove', this._id);
       }
  },



  'click .opennav'(event){
    console.log('in click event');
  	document.getElementById("mySidenav").style.width="280px";
  },

  'click .closenav'(event){
  	   document.getElementById("mySidenav").style.width="0px";
  }, 
  
  'click .finish'(event){
      $('.showfinish').css('display','block');
  },
  
  'dblclick .finish'(event){
    $('.showfinish').css('display','none');
  },

  'click .trash'(event){
    $('.showdelete').css('display','block');
  },

  'dblclick .trash'(event){
    $('.showdelete').css('display','none');
  },

  'mouseenter li.note'(event){
  	$(event.target).css('height' , '120px');
  },

   'mouseleave li.note'(event){
  	$(event.target).css('height' , '18px');

    var list = document.querySelector('li.note');
       list.contentEditable = false;
    
  },

  });
  
 /* function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
*/
  /*
  'click .toggle-checked'() {
    
       Tasks.update(this._id, {
        $set: { checked: ! this.checked },  // Set checked property to the opposite of its value
       });
  },
  */

  







