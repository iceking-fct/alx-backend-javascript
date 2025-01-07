/**
 * Student controller class
 */
import readDatabase from '../utils';

class StudentsController {
  /**
   * Fetch all students from the database
   * GET: /students
   */
  static getAllStudents(request, response) {
    const dbName = process.argv[2]; // Retrieve database filename at execution

    readDatabase(dbName)
      .then((fields) => {
        let body = 'This is the list of our students\n';
        const orderedKeys = Object.keys(fields).sort((a, b) =>
          a.toLowerCase().localeCompare(b.toLowerCase())
        );

        orderedKeys.forEach((key) => {
          body += `Number of students in ${key}: ${fields[key].length}. List: ${fields[key].join(', ')}\n`;
        });

        response.status(200).send(body.trim()); // Remove trailing newline
      })
      .catch(() => {
        response.status(500).send('Cannot load the database');
      });
  }

  /**
   * Get all students by major
   * GET: /students/:major
   */
  static getAllStudentsByMajor(request, response) {
    const dbName = process.argv[2]; // Retrieve database filename at execution
    const major = request.params.major;

    if (!['CS', 'SWE'].includes(major)) {
      return response.status(500).send('Major parameter must be CS or SWE');
    }

    readDatabase(dbName)
      .then((fields) => {
        response.status(200).send(`List: ${fields[major].join(', ')}`);
      })
      .catch(() => {
        response.status(500).send('Cannot load the database');
      });
  }
}

export default StudentsController;

