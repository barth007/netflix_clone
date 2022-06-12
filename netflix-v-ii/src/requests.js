const API_KEY ="c3bd6176a8fe7147cfb85ffe6edd5c93";



const requests={
    fetchTest: `genre/movie/list?${API_KEY}&language=en-US`,
    fetchTrending:`/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals:`/discover/tv?api_key=${API_KEY}&with_networks=213`,
    fetchTopRated:`/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies:`/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies:`/discover/movie?api_key=${API_KEY}&with_generes=10749`,
    fetchDocumentaries:`/discover/movie?api_key=${API_KEY}&with_generes=99`,
}

export default requests;