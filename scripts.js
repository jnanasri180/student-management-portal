const studentForm = document.getElementById("studentForm");
const studentTableBody = document.getElementById("studentTableBody");
const totalStudents = document.getElementById("totalStudents");
const searchInput = document.getElementById("search");

/* =========================
   Local Storage
========================= */

let students = JSON.parse(localStorage.getItem("students")) || [];

function saveToLocalStorage() {
  localStorage.setItem("students", JSON.stringify(students));
}

/* =========================
   Update Dashboard Count
========================= */

function updateStudentCount() {
  totalStudents.textContent = students.length;
}

/* =========================
   Render Students
========================= */

function renderStudents(studentArray = students) {

  studentTableBody.innerHTML = "";

  if (studentArray.length === 0) {

    studentTableBody.innerHTML = `
      <tr>
        <td colspan="4" style="text-align:center;">
          No Students Found
        </td>
      </tr>
    `;

    return;
  }

  studentArray.forEach((student) => {

    const originalIndex = students.indexOf(student);

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.email}</td>
      <td>${student.course}</td>
      <td>
        <button class="delete-btn" onclick="deleteStudent(${originalIndex})">
          Delete
        </button>
      </td>
    `;

    studentTableBody.appendChild(row);

  });

  updateStudentCount();
}

/* =========================
   Add Student
========================= */

studentForm.addEventListener("submit", function (e) {

  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const course = document.getElementById("course").value.trim();

  if (!name || !email || !course) {
    alert("Please fill all fields");
    return;
  }

  const student = {
    name,
    email,
    course
  };

  students.push(student);

  saveToLocalStorage();

  renderStudents();

  studentForm.reset();

});

/* =========================
   Delete Student
========================= */

function deleteStudent(index) {

  const confirmDelete = confirm(
    "Are you sure you want to delete this student?"
  );

  if (!confirmDelete) return;

  students.splice(index, 1);

  saveToLocalStorage();

  renderStudents();

}

/* =========================
   Search Students
========================= */

searchInput.addEventListener("input", function () {

  const searchValue = this.value.toLowerCase();

  const filteredStudents = students.filter((student) => {

    return (
      student.name.toLowerCase().includes(searchValue) ||
      student.email.toLowerCase().includes(searchValue) ||
      student.course.toLowerCase().includes(searchValue)
    );

  });

  renderStudents(filteredStudents);

});

/* =========================
   Initial Render
========================= */

renderStudents();