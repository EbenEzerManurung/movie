import apiClient from "@/services/api-client";
import { useEffect, useState } from "react";

export interface TVShowResult {
    media_type: string;
    adult : boolean;
    id: number;
    original_language:  string;
    original_title: string;
    title: string;
    name?:string;
    backdrop_path: string;
    poster_path : string;
    overview : string;
}

const useTVShowList = () => {

    const [tvShows, setTVShows] = useState<TVShowResult[]>();

    const fetchTvShowList = async () => {

        try {

            const res = await apiClient.get(
              "trending/all/week"
            );

            setTVShows(res.data.results)

        } catch (error) {}

    };

    useEffect(() => {
        fetchTvShowList();
    }, []);

    return { tvShows };
};

export default useTVShowList;