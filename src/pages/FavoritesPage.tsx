import { Alert, Typography } from "@mui/material";

import { ArticlePreview } from "../components/ArticlePreview";
import { useGetNews } from "../hooks/useGetNews";
import { RequestStateHandler } from "../components/RequestStateHandler";
import { useFavorites } from "../Favorites";

export const FavoritesPage = () => {
  const { isLoading, error, data: articles } = useGetNews();
  const { favorites, removeFavorite } = useFavorites();

  if(isLoading || error){
    <RequestStateHandler isLoading={isLoading} error={error} />
  }
 
  if(!favorites?.length){
    return <Alert severity='info'>You don't have any favorite news!</Alert>
  }

  if(articles?.length){

    const list = articles.filter(article => {
      return favorites.find(item => item.id === article.id)
    });

    const listWithVotes = list.map(item => {
      const favorite = favorites.find(fav => fav.id === item.id);

      return {
        ...item,
        votes: favorite?.votes ?? 0
      }
    })

    const handleChangeFavorites = (id: number) => {
      if(!!(favorites ?? []).find(item => item.id === id)){
        removeFavorite(id);
      }
    }

    return (
      <div>
        <Typography gutterBottom variant='h4'><b>Favorites</b></Typography>

        {listWithVotes.sort((a, b) => b.votes - a.votes).map((item) => (
          <ArticlePreview key={item.id} article={item} votingEnabled onButtonClick={() => handleChangeFavorites(item.id)} />
        ))}
      </div>
    );
  }

  return null
};