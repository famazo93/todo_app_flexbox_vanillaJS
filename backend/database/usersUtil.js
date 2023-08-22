const fs = require('fs');

exports.findByUsername = (username, cb) => {
  fs.readFile('./users.json', 'utf8', (err, data) => {
    if (err) {
      throw err
    } else {
      const { users } = JSON.parse(data);
      users.forEach(user => {
        if (user.username === username) {
          return cb(null, user);
        } else {
            return cb(null, null);
        }
      })
    }
  })
};

exports.addUser = (username, password) => {
  fs.readFile('backend/database/users.json', 'utf8', (err, data) => {
    if (err) {
      throw err
    } else {
      const { users } = JSON.parse(data);
      const lastId = users[users.length - 1].id;
      users.push({
        id: Number(lastId) + 1,
        username,
        password
      })

      fs.writeFile('./users.json', JSON.stringify({users}), err => {
        if (err) {
          throw err;
        }
      })
    }
  })
}