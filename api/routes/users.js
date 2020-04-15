var express = require("express");
var router = express.Router();
const dbUsers = require("./../db/users.json");

function isAgeValid(age, minAge, maxAge) {
  return age >= minAge && age <= maxAge;
}

function isAddress(address, inputAddress) {
  const completedAddress = !!address ? address.city + address.road : undefined

  return !!completedAddress && !!inputAddress ? completedAddress.toLowerCase().indexOf(inputAddress.toLowerCase()) > -1 : true
}

function isEmail(email, inputEmail) {
  return !!email && !!inputEmail ? email.toLowerCase().indexOf(inputEmail.toLowerCase()) > -1 : true
}

function filterUsers(minAge, maxAge, address, email) {
  return dbUsers.filter(
    user => isAgeValid(user.age, minAge, maxAge)
      && isAddress(user.address, address)
      && isEmail(user.email, email)
    );
}

router.get("/", function(req, res, next) {
  const { minAge, maxAge, address, email } = req.query;

  const users = filterUsers(parseInt(minAge), parseInt(maxAge), address, email);

  res.json({ users: users });
});

module.exports = {
  router,
  filterUsers,
  isAgeValid
};
