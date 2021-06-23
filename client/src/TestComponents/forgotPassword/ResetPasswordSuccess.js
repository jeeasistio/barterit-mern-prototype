import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Button from '@material-ui/core/Button';



const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '75vh',
  },
  login: {
    marginTop: theme.spacing(1),
    display: 'block',
  },
  link: {
    color: '#009688',
  },
}));

const ResetPasswordSuccess = () => {
  const classes = useStyles();

  return (  
    <div className={classes.container}>
      <Alert 
        severity="success"
        className={classes.alert}
      >
        <AlertTitle>
          Password changed successfully
        </AlertTitle>
          You have successfully changed your password to a new one.<br />
          You may now <Link to="/signin" className={classes.link}>log in</Link> with your new password.
      </Alert> 
    </div>
    
  );
}
 
export default ResetPasswordSuccess;