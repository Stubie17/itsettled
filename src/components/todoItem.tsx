import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Item } from '../API';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '5px',
        borderBottom: '2px solid #f1f3f4'
    },
    header: {
      fontSize: '24px',
    },
    actionRow: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    }
  });

type ItemProps = {
  item: Item,
  isDeletable: boolean,
  onClick: (item : Item) => void,
  onDelete: (event: React.MouseEvent<HTMLButtonElement>) => void,
};

const TodoItem = ({item, isDeletable, onClick, onDelete} : ItemProps) => {

  const classes = useStyles();

  const commentCount = item.comments?.items?.length || 0;
  return (
      <div key={item.id} className={classes.root} onClick={() => onClick(item)}>
          <span className={classes.header}>{item.name}</span>
          <div className={classes.actionRow}>
            <span>{!commentCount ? '0 Comments' : commentCount === 1 ? '1 Comment' : `${commentCount} Comments`}</span>
            {
              isDeletable ? <button onClick={onDelete}>Delete</button> : null
            }
          </div>
      </div>
  );
}

export default TodoItem;