var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var AutoIncrement = require('mongoose-sequence')(mongoose);

var itemSchema = new Schema(
  {
    model: {
      type: mongoose.Schema.Types.Mixed,
    },
    part_number: {
      type: mongoose.Schema.Types.Mixed,
    },
    project_type: {
      type: mongoose.Schema.Types.Mixed,
    },
    quantity: {
      type: mongoose.Schema.Types.Mixed,
      default: 1,
    },
    priority: {
      type: mongoose.Schema.Types.Mixed,
      default: 1,
    },
    id: { type: Number},
  },
  { collection: "dataItems" }
);
itemSchema.plugin(AutoIncrement, {id:'order_seq',inc_field: 'id'});

module.exports = mongoose.model("Item", itemSchema);