export default ({ axios }) => ({
  getUsers: page => axios.get(`?page=${page}&results=100&seed=abc`),
});
// https://randomuser.me/api/?page=3&results=10&seed=abc
