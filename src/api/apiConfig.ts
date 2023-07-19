const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '4a3ffa85f3d56c98b69c502e11dbe2cf', // 9c5ed94f68dc1803bd88036a28870dd2
    token: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YTNmZmE4NWYzZDU2Yzk4YjY5YzUwMmUxMWRiZTJjZiIsInN1YiI6IjY0OGRmZmY5YzNjODkxMDBlYjMyOTE5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wnWcbWLpyTvQqPaZBO5i2mQjmFis3rK3TYs8JuAFBsI',
    originalImage: (imgPath: string) => `https://image.tmdb.org/t/p/original${imgPath}`,
    w500Image: (imgPath: string) => `https://image.tmdb.org/t/p/w500${imgPath}`,
    w185Image: (imgPath: string) => `https://image.tmdb.org/t/p/w185${imgPath}`,
};

export default apiConfig;
