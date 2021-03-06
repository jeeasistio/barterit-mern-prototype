import { useState ,useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import moment from 'moment';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 'bold',
  },
  container: {
    width: '100%',
  },
  cardContent: {
    padding: theme.spacing(1, .5, 1, .5),
  },
  note: {
    textAlign: 'center',
  }
}));

const PostedItems = ({ user }) => {
  const classes = useStyles();
  const params = useParams();

  const [ posts, setPosts ] = useState([]);
  const [ showLoader, setShowLoader ] = useState(true);
  const [ note, setNote ] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/api/post/user/${params.id}`, { 
      headers: { 'Content-Type': 'application/json' }, 
      credentials: 'include', 
    })
    .then(res => res.json())
    .then(data => {
      if (!data.posts[0]) {
        setNote(`The user has no items posted in Marketplace`);
      }
      setPosts(data.posts);
      setShowLoader(false);
    })
    .catch(err => {
      console.log(err);
      setNote('An error has occured');
      setShowLoader(false);
    });
  }, []);

  return (  
    <>
      <Typography
        color="primary"
        variant="h6"
        className={classes.title}
        gutterBottom
      >
        Posted Items in Marketplace
      </Typography>
      { showLoader && <Loader /> }
      { !posts[0] && !showLoader && 
        <Typography
          variant="body2"
          className={classes.note}
        >
          { note }
        </Typography> }
      <Grid container className={classes.container}>
        {posts.map((post,i) => (
          <PostCard title={post.title} image={post.images[0]} date={post.createdAt} id={post._id} key={i} />
        ))} 
      </Grid>
    </>
  );
}
 
function PostCard({ title, image, date, id }) {
  const classes = useStyles();

  return (
    <Grid item xs={6} sm={4} lg={3} 
      component={Link}
      to={`/item/${id}`}
      style={{textDecoration:'none'}}
    >
      <Card style={{margin:'0 4px 0 4px'}} elevation={0}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="post"
            height="180"
            image={image}
            style={{borderRadius: 7}}
          />
          <CardContent className={classes.cardContent}>
            <Typography variant="h6" component="h3" style={{fontSize: '1rem', lineHeight: 1.1 }}>
              { title }
            </Typography>
            <Typography variant="body1" component="p" style={{fontSize: '.8rem',}}>
              { moment(date).fromNow() }
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  )
}

function Loader() {
  const classes = useStyles();

  return(
    <div style={{textAlign: 'center'}}>
      <CircularProgress 
        style={{color: '#999'}}
      />
    </div>
  )

}

export default PostedItems;