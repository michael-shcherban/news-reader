import { Alert, Typography } from "@mui/material";
import { useEffect, useMemo } from "react";

import { ArticlePreview } from "../components/ArticlePreview";
import { useGetNews } from "../hooks/useGetNews";
import { RequestStateHandler } from "../components/RequestStateHandler";
import { useFavorites } from "../Favorites";

export const Dashboard = () => {
  const { isLoading, error, data: articles, refetch } = useGetNews();
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, 0.5 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [refetch]);

  const sortedList = useMemo(() => {
    if (!articles || !articles.length) {
      return [];
    }

    return [...articles].sort(
      (a, b) => new Date(b.published).getTime() - new Date(a.published).getTime()
    );
  }, [articles]);

  if(isLoading || error){
    return <RequestStateHandler isLoading={isLoading} error={error} />
  }
 
  if(!articles?.length){
    return <Alert severity='info'>We don't have any news for you!</Alert>
  }

  const handleChangeFavorites = (id: number) => {
    if(!!(favorites ?? []).find(item => item.id ===id)){
      removeFavorite(id);
      return
    }
    addFavorite(id)
  }

  return (
    <>
      <ArticlePreview isLarge article={sortedList[0]} onButtonClick={() => handleChangeFavorites(sortedList[0].id)} />

      <div>
        <Typography gutterBottom variant='h6' color='GrayText'><b>Latest news</b></Typography>

        {sortedList.slice(1).map((item) => (
          <ArticlePreview key={item.id} article={item} onButtonClick={() => handleChangeFavorites(item.id)} />
        ))}
      </div>
    </>
  );
};