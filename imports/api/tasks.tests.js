import { Meteor } from 'meteor/meteor';

import { Random } from 'meteor/random';
 
import { Tasks } from './data.js';

var assert = require('assert');

if (Meteor.isServer) {

   describe('Tasks', () => {

    describe('delete_method', () => {

      var userId = Random.id();        //let and const has block scope, var has global scope
      var taskId;                   
 
      beforeEach(() => {              //to ensure the database is in the state we expect ..so we are removing all tasks and 
        Tasks.remove({});               //inserting one in the beginning and then removing this while testing

        taskId = Tasks.insert({       //creating a task to test on this
          text: 'task_to_test',
          createdAt: new Date(),
          owner: userId,
          username: 'bhargavi',
        });
      });
 
      it('deletes task', () => {         // Tasks has a method that deletes tasks

      	const deleteTask = Meteor.server.method_handlers['tasks.remove'];
        deleteTask.apply( this.userId, [taskId]);      
        assert.equal(Tasks.find().count(), 0);          // Verify that the method does what we expected
      });
    });

  	describe('insert_method', () =>{

  		var userId = Random.id();

        beforeEach(()=>{
          Tasks.remove({});
        });

        it('inserts task',() => {

        	Tasks.insert({
              text:'bhagi',
              createdAt: new Date(),
              owner: userId,
              username: 'bhargavi',
            });
           

        	assert.equal(Tasks.find().count(), 1);
        });            
    });

    describe('update_method',() => {

    	var userId = Random.id();
    	var taskId;                           

    	beforeEach(() => {
    		Tasks.remove({});

    		taskId =Tasks.insert({
              text:'bhagi',
              createdAt: new Date(),
              owner: userId,
              username: 'bhargavi',
            });
    	});

    	it('updates task',() => {
        
    		Tasks.update({"_id": taskId },{ $set:{"text": "bhargavi", "createdAt": new Date()}});
    		var newtext=Tasks.findOne({"_id":taskId}).text;
    		console.log(newtext);
            assert.equal(newtext, 'bhargavi');
        });
    });
    
  });
}


