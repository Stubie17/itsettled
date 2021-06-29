import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Modal } from '@material-ui/core';
import { CreateItemInput } from '../API';

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

type CreateItemModalProps = {
  open: boolean,
  onCreateItem: ({name, detail} : CreateItemInput) => void,
  onClose: () => void,
};

const CreateItemModal = ({open, onCreateItem, onClose} : CreateItemModalProps) => {

  const classes = useStyles();
  const [name, setName] = useState<string>('');
  const [detail, setDetail] = useState<string>('');

  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <div className={classes.root}>
        <span>Create Item</span>
        <input
          onChange={e => setName(e.target.value)}
          placeholder="Item Name"
          value={name}
        />
        <input
          onChange={e => setDetail(e.target.value)}
          placeholder="Detail"
          value={detail}
        />
        <button onClick={() => onCreateItem({name, detail, votes: 0})} >Create</button>
      </div>
    </Modal>
  );
}

export default CreateItemModal;