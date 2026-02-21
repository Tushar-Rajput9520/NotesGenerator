import mongoose from "mongoose";

const notesSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    topic: {
      type: String,
      required: true,
      trim: true,
    },

    classLevel: {
      type: String,
      default: "",
    },

    examType: {
      type: String,
      default: "",
    },

    revisionMode: {
      type: Boolean,
      default: false,
    },

    includeDiagram: {
      type: Boolean,
      default: false,
    },

    includeChart: {
      type: Boolean,
      default: false,
    },

    content: {
      type: mongoose.Schema.Types.Mixed, // AI response JSON
      required: true,
    },
  },
  { timestamps: true } // ✅ adds createdAt & updatedAt
);

const Notes = mongoose.model("Notes", notesSchema);

export default Notes;
