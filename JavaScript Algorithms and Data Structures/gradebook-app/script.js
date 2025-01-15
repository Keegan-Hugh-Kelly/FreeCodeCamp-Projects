const gradebook = [];

function addStudent() {
    const nameInput = document.getElementById('studentName');
    const gradeInput = document.getElementById('studentGrade');
    const name = nameInput.value.trim();
    const grade = parseFloat(gradeInput.value);

    if (!name || isNaN(grade) || grade < 0 || grade > 100) {
        alert('Please enter a valid name and grade (0-100).');
        return;
    }

    // Add student to the gradebook
    gradebook.push({ name, grade });
    nameInput.value = '';
    gradeInput.value = '';
    updateGradebook();
}

function updateGradebook() {
    const tbody = document.getElementById('gradebookBody');
    tbody.innerHTML = '';

    gradebook.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${student.name}</td>
          <td>${student.grade.toFixed(2)}</td>
          <td>
            <button onclick="deleteStudent(${index})">Delete</button>
          </td>
        `;
        tbody.appendChild(row);
    });

    updateSummary();
}

function deleteStudent(index) {
    gradebook.splice(index, 1);
    updateGradebook();
}

function updateSummary() {
    const summaryDiv = document.getElementById('summary');
    if (gradebook.length === 0) {
        summaryDiv.textContent = 'No students in the gradebook.';
        return;
    }

    const totalGrades = gradebook.reduce((sum, student) => sum + student.grade, 0);
    const averageGrade = totalGrades / gradebook.length;
    summaryDiv.textContent = `Total Students: ${gradebook.length}, Average Grade: ${averageGrade.toFixed(2)}`;
}