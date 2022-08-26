const { createSessions } = require('./signin');

const handleRegister = (req, res, db, bcrypt) => {
  const { name, email, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json('incorrect form submission');
  }
  const hash = bcrypt.hashSync(password, 12);
  db.transaction((trx) => {
    trx
      .insert({
        hash: hash,
        email: email,
      })
      .into('login')
      .returning('email')
      .then((loginEmail) => {
        return trx('users')
          .returning('*')
          .insert({
            email: loginEmail[0].email,
            name: name,
            joined: new Date(),
          })
          .then((data) => {
            return data[0].id && data[0].email
              ? createSessions(data[0])
              : Promise.reject(data[0]);
          })
          .then((session) => res.json(session))
          .catch((err) => res.status(400).json(err));
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => res.status(400).json('unable to register'));
};

module.exports = {
  handleRegister,
};
