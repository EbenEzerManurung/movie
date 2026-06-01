import apiClient from "@/services/api-client";
import { useEffect, useState } from "react";

export interface MovieResult {
    media_type: string;
    adult: boolean;
    id: number;
    original_language: string;
    original_title: string;
    title: string;
    name?: string;
    backdrop_path: string;
    poster_path: string;
    overview: string;
    vote_average?: number;
    release_date?: string;
}

const useMovieList = () => {

    const [movieLists, setMovieLists] = useState<MovieResult[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchMovieList = async () => {

        try {

            setLoading(true);

            // NETFLIX STYLE TRENDING MOVIES
            const res = await apiClient.get(
                "trending/all/week"
            );

            setMovieLists(res.data.results);

            console.log(res.data.results);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        fetchMovieList();
    }, []);

    return {
        movieLists,
        loading,
    };
};

export default useMovieList;