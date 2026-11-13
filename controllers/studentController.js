import students from "../data/students.js";

// Get all students with search and filtering
export function getStudents(req, res) {
  let result = [...students];

  const { name, email, status, course, minGpa, maxGpa } = req.query;

  if (name) {
    result = result.filter((student) =>
      student.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (email) {
    result = result.filter((student) =>
      student.email.toLowerCase().includes(email.toLowerCase())
    );
  }

  if (status) {
    result = result.filter(
      (student) => student.status.toLowerCase() === status.toLowerCase()
    );
  }

  if (course) {
    result = result.filter((student) =>
      student.course.toLowerCase().includes(course.toLowerCase())
    );
  }

  if (minGpa !== undefined) {
    result = result.filter((student) => student.gpa >= Number(minGpa));
  }

  if (maxGpa !== undefined) {
    result = result.filter((student) => student.gpa <= Number(maxGpa));
  }

  res.status(200).json({
    success: true,
    count: result.length,
    data: result
  });
}

// Get one student
export function getStudentById(req, res, next) {
  const student = students.find(
    (student) => student.id === Number(req.params.id)
  );

  if (!student) {
    const error = new Error("Student not found");
    error.status = 404;
    return next(error);
  }

  res.status(200).json({
    success: true,
    data: student
  });
}

// Create student
export function createStudent(req, res) {
  const newId = students.length
    ? Math.max(...students.map((student) => student.id)) + 1
    : 1;

  const newStudent = {
    id: newId,
    ...req.body
  };

  students.push(newStudent);

  res.status(201).json({
    success: true,
    message: "Student created successfully",
    data: newStudent
  });
}

// Replace student
export function replaceStudent(req, res, next) {
  const index = students.findIndex(
    (student) => student.id === Number(req.params.id)
  );

  if (index === -1) {
    const error = new Error("Student not found");
    error.status = 404;
    return next(error);
  }

  const updatedStudent = {
    id: students[index].id,
    ...req.body
  };

  students[index] = updatedStudent;

  res.status(200).json({
    success: true,
    message: "Student replaced successfully",
    data: updatedStudent
  });
}

// Partially update student
export function updateStudent(req, res, next) {
  const student = students.find(
    (student) => student.id === Number(req.params.id)
  );

  if (!student) {
    const error = new Error("Student not found");
    error.status = 404;
    return next(error);
  }

  Object.assign(student, req.body);

  res.status(200).json({
    success: true,
    message: "Student updated successfully",
    data: student
  });
}

// Delete student
export function deleteStudent(req, res, next) {
  const index = students.findIndex(
    (student) => student.id === Number(req.params.id)
  );

  if (index === -1) {
    const error = new Error("Student not found");
    error.status = 404;
    return next(error);
  }

  const deletedStudent = students.splice(index, 1)[0];

  res.status(200).json({
    success: true,
    message: "Student deleted successfully",
    data: deletedStudent
  });
}

// Student statistics
export function getStudentStats(req, res) {
  const totalStudents = students.length;

  const averageGpa = totalStudents
    ? Number(
        (
          students.reduce((sum, student) => sum + student.gpa, 0) /
          totalStudents
        ).toFixed(2)
      )
    : 0;

  const countByCourse = {};

  students.forEach((student) => {
    countByCourse[student.course] =
      (countByCourse[student.course] || 0) + 1;
  });

  res.status(200).json({
    success: true,
    data: {
      totalStudents,
      averageGpa,
      countByCourse
    }
  });
}