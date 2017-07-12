import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Tasks = new Mongo.Collection('tasks');
export const Completedtasks = new Mongo.Collection('completedtasks');
export const Deletedtasks= new Mongo.Collection('deletedtasks');

if (Meteor.isServer) {
  Meteor.publish('tasks', function tasksPublication() {
    return Tasks.find();
  });

  Meteor.publish('completedtasks', function completedtasksPublication() {
    return Completedtasks.find();
  });

  Meteor.publish('deletedtasks', function deletedtasksPublication() {
    return Deletedtasks.find();
  });
}
 
Meteor.methods({
  'tasks.insert'(text) {
    check(text, String);
 
    Tasks.insert({
      text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
  },

  'tasks.remove'(taskId) {
    check(taskId, String);
    Tasks.remove(taskId);
  },

  'tasks.update'(id,newtext) {
  	Tasks.update({"_id": id },{ $set:{"text":newtext , "createdAt": new Date()}});  //update text and date modified 
  },

  'completedtasks.insert'(completedtext){

  	Completedtasks.insert({
  		completedtext,
  		createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
  	});
  },

  'completedtasks.remove'(completedtaskId){
  	Completedtasks.remove(completedtaskId);
  },

  'deletedtasks.insert'(deletedtext){

  	Deletedtasks.insert({
  		deletedtext,
  		createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
  	});
  },

  'deletedtasks.remove'(deletedtaskId){
  	Deletedtasks.remove(deletedtaskId);
  },

});