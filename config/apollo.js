import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client';
import {setContext} from 'apollo-link-context';
import fetch from 'node-fetch';

const httpLink = createHttpLink({
    uri: 'https://whispering-woodland-63446.herokuapp.com/',
    fetch
});

const authLink = setContext((_, {headers}) => {

    //Leer el storage
    const token = localStorage.getItem('token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    }
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink) //Dónde está instalado apollo server
});

export default client;