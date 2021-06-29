import React from 'react';
import { AmplifySignOut } from '@aws-amplify/ui-react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: '5px',
      borderBottom: '2px solid #f1f3f4'
  },
  username: {
    padding: '15px',
  }
});

type HeaderProps = {
  username: string,
};

const Header = ({username} : HeaderProps) => {

  const classes = useStyles();

  return (
      <div className={classes.root}>
          <span className={classes.username}>{username}</span>
          <AmplifySignOut />
      </div>
  );
}

export default Header;