import axios from 'axios';

const baseUrl = 'https://api.github.com/users/';

export default async function getUsers(searchTerm) {
  const response = await axios.get(`${baseUrl}${searchTerm}`);

  return response.data;
}
