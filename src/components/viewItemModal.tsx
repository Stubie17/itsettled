import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Modal } from '@material-ui/core';
import { Item } from '../API';
import CommentSection from './commentSection';

const useStyles = makeStyles({
    root: {
      height: '500px',
      width: '400px',
      margin: 'auto',
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'column',
      padding: '15px',
    },
  });

type ViewItemModalProps = {
  open: boolean,
  item: Item | undefined,
  onClose: () => void,
};

const ViewItemModal = ({open, item, onClose} : ViewItemModalProps) => {

  const classes = useStyles();
  
  if(!item)
    return null;

  const comments = (item.comments?.items || []).flatMap(f => !!f ? [f] : []);

  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <div className={classes.root}>
        <span>View Item</span>
        <span>Name</span>
        <span>{item.name}</span>
        <span>Detail</span>
        <span>{item.detail}</span>
        <CommentSection 
          itemID={item.id}
        />
      </div>
    </Modal>
  );
}

export default ViewItemModal;
