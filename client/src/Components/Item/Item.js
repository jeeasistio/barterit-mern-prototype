import Container from '@material-ui/core/Container';

import { makeStyles } from '@material-ui/core/styles';

import ItemCarousel from './ItemCarousel';
import Title from './Title';
import Owner from './Owner';
import Description from './Description';
import InReturn from './InReturn';
import SubmitButton from './SubmitButton';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 2, 5, 2),
  }
}));

const Item = () => {
  const classes = useStyles();

  return (  
    <Container maxWidth="md" className={classes.root}>
      <ItemCarousel />
      <Title />
      <Owner />
      <Description />
      <InReturn />
      <SubmitButton />
    </Container>
  );
}
 
export default Item;