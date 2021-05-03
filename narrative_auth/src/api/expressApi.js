import axios from 'axios';

const instance =axios.create({
    baseURL: 'https://narrative-auth-api.herokuapp.com/'
});

export default instance;