import { Client, ID, Query, TablesDB } from 'react-native-appwrite';
import { TMDB_CONFIG } from './api';

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const METRICS_TABLE = process.env.EXPO_PUBLIC_APPWRITE_METRICS_TABLE!;
const ENDPOINT = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!;
const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;

const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID);
const tablesDB = new TablesDB(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
    try {
        const result = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: METRICS_TABLE,
            queries: [Query.equal('searchTerm', query)],
            total: false,
        });

        if (result.rows.length > 0) {
            const existingMovie = result.rows[0];

            await tablesDB.updateRow({
                databaseId: DATABASE_ID,
                tableId: METRICS_TABLE,
                rowId: existingMovie.$id,
                data: {
                    count: existingMovie.count + 1,
                },
            });
        } else {
            await tablesDB.createRow({
                databaseId: DATABASE_ID,
                tableId: METRICS_TABLE,
                rowId: ID.unique(),

                data: {
                    title: movie.title,
                    searchTerm: query,
                    movie_id: movie.id,
                    count: 1,
                    poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                },
            });
        }
    } catch (error) {
        console.error('Error updating search count:', error);
        throw error;
    }
};

export const getTrendingMovies = async (): Promise<
    TrendingMovie[] | undefined
> => {
    try {
        const result = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: METRICS_TABLE,
            queries: [Query.limit(5), Query.orderDesc('count')],
            total: false,
        });

        return result.rows as unknown as TrendingMovie[];
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        return undefined;
    }
};

export const getMovieDetails = async (
    movieId: string,
): Promise<MovieDetails> => {
    try {
        const response = await fetch(
            `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,
            { method: 'GET', headers: TMDB_CONFIG.headers },
        );

        if (!response.ok) {
            throw new Error('Failed to fetch movie details');
        }

        const data = await response.json();
        return data as MovieDetails;
    } catch (error) {
        console.error('Error fetching movie details:', error);
        throw error;
    }
};
