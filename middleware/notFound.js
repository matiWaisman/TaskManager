const notFound = (req, res) => {
  res.status(404).send("Rout doesnt exist");
};

module.exports = notFound;
