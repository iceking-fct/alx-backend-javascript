/**
 * Controller Class
 */
class AppController {
  static getHomepage(request, response) {
    response.status(200).send('Hello ALX!');
  }
}

export default AppController;
