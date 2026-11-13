const requiredFields = [
  "name",
  "email",
  "age",
  "course",
  "gpa",
  "status"
];

export default function validateStudent(mode) {
  return (req, res, next) => {
    const student = req.body;

    if (!student || typeof student !== "object" || Array.isArray(student)) {
      return res.status(400).json({
        success: false,
        message: "Invalid request body"
      });
    }

    if (mode !== "update") {
      const missing = requiredFields.filter(
        (field) => student[field] === undefined
      );

      if (missing.length) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields",
          errors: missing
        });
      }
    }

    if (mode === "update" && Object.keys(student).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Provide at least one field to update"
      });
    }

    if (
      student.name !== undefined &&
      (typeof student.name !== "string" || student.name.trim().length < 2)
    ) {
      return res.status(400).json({
        success: false,
        message: "Name must contain at least 2 characters"
      });
    }

    if (
      student.email !== undefined &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(student.email)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address"
      });
    }

    if (
      student.age !== undefined &&
      (!Number.isInteger(student.age) || student.age < 1 || student.age > 120)
    ) {
      return res.status(400).json({
        success: false,
        message: "Age must be an integer between 1 and 120"
      });
    }

    if (
      student.course !== undefined &&
      (typeof student.course !== "string" || !student.course.trim())
    ) {
      return res.status(400).json({
        success: false,
        message: "Course cannot be empty"
      });
    }

    if (
      student.gpa !== undefined &&
      (typeof student.gpa !== "number" || student.gpa < 0 || student.gpa > 4)
    ) {
      return res.status(400).json({
        success: false,
        message: "GPA must be between 0 and 4"
      });
    }

    if (
      student.status !== undefined &&
      !["Active", "Inactive"].includes(student.status)
    ) {
      return res.status(400).json({
        success: false,
        message: "Status must be Active or Inactive"
      });
    }

    next();
  };
}