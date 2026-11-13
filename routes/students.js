import express from "express";

import {
  getStudents,
  getStudentById,
  createStudent,
  replaceStudent,
  updateStudent,
  deleteStudent,
  getStudentStats
} from "../controllers/studentController.js";

import validateStudent from "../middleware/validateStudent.js";

const router = express.Router();

router.get("/stats", getStudentStats);

router.get("/", getStudents);

router.get("/:id", getStudentById);

router.post("/", validateStudent("create"), createStudent);

router.put("/:id", validateStudent("replace"), replaceStudent);

router.patch("/:id", validateStudent("update"), updateStudent);

router.delete("/:id", deleteStudent);

export default router;