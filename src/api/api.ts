import axios from 'axios';

export const fetchData = async (pageNumber = 1) =>
    (
        await axios.get(
            `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=${pageNumber}`,
            {
                headers: {
                    'Content-Type': 'aplication/json',
                    'X-API-KEY': '8ccb0f71-adf6-4b8f-9927-980b4f08e9d5',
                },
            },
        )
    ).data;
/* .then((response) => {
            this.data = response.data;
            this.isFetching = false;
            console.log('Success');
        })
        .catch((err) => {
            this.error = err;
            this.isFetching = false;
            console.log('Error');
        }) */
