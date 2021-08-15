const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'bistszzsktjpukhwutak-mysql.services.clever-cloud.com',
  user     : 'utyohwxa0kbhfhdh',
  password :'Ml8OcGdEXgxRaTbjYzUi',
  database :'bistszzsktjpukhwutak'
});
 
connection.connect();
 
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
 
module.exports = connection