const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '9c5ed94f68dc1803bd88036a28870dd2',
    originalImage: (imgPath: string) =>
        `https://image.tmdb.org/t/p/original${imgPath}`,
    w500Image: (imgPath: string) => `https://image.tmdb.org/t/p/w500${imgPath}`,
};

export default apiConfig;
