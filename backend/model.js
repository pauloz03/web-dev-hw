import mongoose from "mongoose";

//Schemas represent types of data rather than specific values. App Services 
// supports many built-in schema types. These include primitives, like strings
//  and numbers, as well as structural types, like objects and arrays, which you 
// can combine to create schemas that represent custom object types.

//Schemas are the specification for your application's data model. Once you've 
// defined a schema, App Services provides you with additional tools and services 
// to work with data that conforms to the schema.

const Schema = mongoose.Schema;

const MenuSchema = new Schema({
    Order: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // adds createdAt & updatedAt automatically
);



