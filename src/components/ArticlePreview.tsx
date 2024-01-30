import { makeStyles } from "@mui/styles"
import { Box, IconButton, Rating, Theme, Tooltip, Typography } from "@mui/material"
import { Favorite, FavoriteBorder } from '@mui/icons-material'
import cx from 'classnames'
import { red } from "@mui/material/colors"
import { useNavigate } from "react-router-dom";

import { Article } from "../model"
import { SyntheticEvent } from "react"
import { useFavorites } from "../Favorites"

const emptyImg = 'src/assets/no-image.svg'

interface ArticlePreviewProps {
    article: Article,
    isLarge?: boolean,
    votingEnabled?: boolean,
    onButtonClick: () => void
}

export const ArticlePreview = ({ article, isLarge = false, votingEnabled = false, onButtonClick }: ArticlePreviewProps) => {
    const classes = useStyles()
    const navigate = useNavigate()
    const { favorites, voteForFavorite } = useFavorites();

    const listItemClasses = cx(classes.listItem, {
        [classes.largeListItem]: isLarge,
        [classes.voting]: votingEnabled,
    })

    const imageWrapperClasses = cx(classes.imageWrapper, {
        [classes.largeImage]: isLarge
    })

    //TODO: we dont have real images here for now
    //const href = article?.image ?? emptyImg;
    const href = emptyImg;

    const handleClick = () => {
        navigate(`/article`, { state: article })
    }

    const handleButtonClick = (e: SyntheticEvent) => {
        e.stopPropagation();
        onButtonClick();
    }

    const handleVoteForFavorite = (event: SyntheticEvent, value: number | null) => {
        if(!!favorite){
            event.stopPropagation();
            event.preventDefault();
            voteForFavorite(favorite.id, value ?? 0)
        }
    }

    const favorite = favorites.find(item => item.id === article.id) ?? null;

    return (
        <div className={listItemClasses} onClick={handleClick}>
            <Box className={imageWrapperClasses}>
                <img className={classes.image} src={href} />
            </Box>

            <Box paddingX={4} paddingY={2}> 
                <Typography gutterBottom variant='h5'><b>{article?.title}</b></Typography>

                <Typography gutterBottom color='GrayText' variant='caption' component='p'><b>Author: {article?.author}</b></Typography>

                <Typography>{article?.description}</Typography>
            
                <div className={classes.icon}>
                    <Tooltip title={!!favorite ? 'Remove from Favorites' : 'Add to Favorites'}>
                        <IconButton onClick={handleButtonClick}>
                            {!!favorite ? <Favorite color='error' /> : <FavoriteBorder />}
                        </IconButton>
                    </Tooltip>
                </div>

                {votingEnabled && !!favorite ? (
                    <div className={classes.votesWrapper} onClick={(e) => e.stopPropagation()}>
                        <Rating value={favorite.votes} onChange={(event, value) => handleVoteForFavorite(event, value)} />
                    </div>
                ) : null}
            </Box>
        </div>
    )
}

const useStyles = makeStyles((theme: Theme) => ({
    listItem: {
        cursor: 'pointer',
        display: 'grid',
        gridTemplateColumns: theme.spacing(20)+ ' 1fr',
        alignItems: 'start',
        justifyContent: 'flex-start',
        minHeight: theme.spacing(20),
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        padding: 0,
        '&::before': {
            zIndex: -1,
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            borderRadius: theme.shape.borderRadius,
            boxShadow: theme.shadows[6],
            content: "''",
            display: 'block'
        },
        '&::after': {
            zIndex: -1,
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            borderRadius: theme.shape.borderRadius,
            boxShadow: theme.shadows[15],
            content: "''",
            display: 'none'
        },
        '&:hover': {
            '&::before': {
                display: 'none'
            },
            '&::after': {
                display: 'block'
            },
        },
        '&:not(:last-child)': {
            marginBottom: theme.spacing(2),
        }
    },
    button: {
        marginRight: theme.spacing(2),
        width: theme.spacing(4.5),
        height: theme.spacing(4.5),
        border: '1px solid #fff',
        [theme.breakpoints.up('md')]: {
            display: "none",
        }
    },
    largeListItem: {
        minHeight: theme.spacing(40),
        marginBottom: theme.spacing(4),
        gridTemplateColumns: theme.spacing(40)+ ' 1fr',
    },
    image: {
        width: '100%',
        height: 'auto',
        maxHeight: '100%',
        display: 'inline-box'
    },
    imageWrapper: {
        width: theme.spacing(20),
        height: '100%',
        minWidth: theme.spacing(20),
        backgroundColor: red[50],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: theme.shape.borderRadius
    },
    largeImage: {
        width: theme.spacing(40),
        minWidth: theme.spacing(40),
    },
    text: {
        marginBottom: theme.spacing(2)
    },
    icon: {
        position: 'absolute',
        top: theme.spacing(1),
        right: theme.spacing(1)
    },
    voting: {
        paddingRight: theme.spacing(3)
    },
    votesWrapper: {
        display: 'flex',
        marginTop: theme.spacing(1)
    }
}));
