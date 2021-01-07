import React from 'react';

// Material U-I imports
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 260,
    padding: 4,
    margin: 4,
  },
  media: {
    height: 250,
  },
});

const Album = () => {
  const classes = useStyles();
  return (
    <>
      <h1>I AM AN ALBUM!!</h1>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image="https://w7.pngwing.com/pngs/162/283/png-transparent-vinyl-disc-art-phonograph-record-lp-record-vinyl-record-miscellaneous-desktop-wallpaper-sound-recording-and-reproduction-thumbnail.png"
          title="Vinyl Record Stock Thumbnail"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Album Title
          </Typography>
          <Typography gutterBottom variant="h6" component="h3">
            Artist Name
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default Album;
