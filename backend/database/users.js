const users = [
    {
        id: 1,
        username: 'famazo',
        password: 'admin'
    },
]

exports.findByUsername = (username, cb) => {
      users.forEach(user => {
        if (user.username === username) {
          return cb(null, user);
        } else {
            return cb(null, null);
        }
      })
  };