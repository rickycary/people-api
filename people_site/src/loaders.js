const URL = 'https://people-api-j1x7.onrender.com'

export const peopleLoader = async () => {
    const response = await fetch(URL + "/people");
    const people = await response.json();
    return people;
}