import { Mongo } from "meteor/mongo";

//** This function returns 5 */
let a = () => 5;

export const Messages = new Mongo.Collection("messages");
