const db = require("./data/db");
const express = require("express");
const app = express();

app.get("/api/users", (req, res) => {
  db.find()
  .then((
    users => res.json(users))
  )
  .catch(err => {
    res.status(500).json({ message: "An error occured..." });
  })
});

app.get("/api/users/:id", (req, res) => {
  db.findById(req.params.id)
  .then((
    user => res.json(user))
  )
  .catch(err => {
    res.status(500).json({ message: "An error occured..." });
  })  
});

app.post('/api/users', (req, res) => {
    const { name, bio } = req.body
    if (!name || !bio) {
        return res.status(400).json({message: "An error occured..." })
    }

    db.insert({ name, bio })
    .then((
      data => res.status(201).json(data))
    )
    .catch(err => {
      res.status(500).json({ message: "An error occured..." });
    })  
})

app.put('/api/users/:id', (req, res) => {
    const { name, bio } = req.body
    if (!name || !bio) {
        return res.status(400).json({message: "An error occured..." })
    }

    db.findById(req.params.id)
    .then(
      user => {
          if (user) {
              return db.update(req.params.id, { name, bio })
          }
          res.status(404).json({ message: "User not found" })
      })
      .then(() => db.findById(req.params.id))
      .then(data => res.json(data))
    .catch(err => {
      res.status(500).json({ message: "An error occured..." });
    })  
})

app.delete('/api/users/:id', async (req, res) => {
     db.findById(req.params.id)
    .then(
      user => {
          if (user) {
              return (
                db.remove(req.params.id)
                .then(() => user)
              )
          }
          res.status(404).json({ message: "User not found" })
      })
      .then(data => res.json(data))
      .catch(err => {
      res.status(500).json({ message: "An error occured..." });
    })  
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App is listening on port ${port}`));
