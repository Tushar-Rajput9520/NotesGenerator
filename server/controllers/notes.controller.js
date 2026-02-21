import Notes from "../models/notes.model.js";

/* ---------------- GET ALL NOTES ---------------- */

export const getMyNotes = async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.userId })
      .select(
        "topic classLevel examType revisionMode includeDiagram includeChart createdAt"
      )
      .sort({ createdAt: -1 });

    if (!notes || notes.length === 0) {
      return res.status(404).json({
        error: "No notes found",
      });
    }

    return res.status(200).json(notes);
  } catch (error) {
    return res.status(500).json({
      message: `Get current user notes error: ${error.message}`,
    });
  }
};

/* ---------------- GET SINGLE NOTE ---------------- */

export const getSingleNotes = async (req, res) => {
  try {
    const note = await Notes.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!note) {
      return res.status(404).json({
        error: "Note not found",
      });
    }

    return res.status(200).json({
      content: note.content,
      topic:note.topic,
      createdAt:note.createdAt
    });
  } catch (error) {
    return res.status(500).json({
      message: `Get single note error: ${error.message}`,
    });
  }
};