import React, { useEffect, useState } from 'react';
import './App.css';
import { API } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react'
import { listItems, user as userQuery } from './graphql/queries';
import { createItem as createItemMutation, deleteItem as deleteItemMutation, createComment as createCommentMutation } from './graphql/mutations';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { ListItemsQuery, Item, CreateItemInput, UserQuery } from './API';
import { makeStyles } from '@material-ui/styles';

import Header from './components/header';
import TodoItem from './components/todoItem';
import CreateItemModal from './components/createItemModal';
import ViewItemModal from './components/viewItemModal';

const useStyles = makeStyles({
  root: {
    width: '500px',
    height: '80vh',
    margin: 'auto',
    marginTop: '10vh',
    marginBottom: '10vh',
    backgroundColor: '#fff',
  },
  container: {
    padding: '15px',
    display: 'flex',
    flexDirection: 'column',
  }
});


function App() {
  const classes = useStyles();
  const [username, setUsername] = useState<string>('');
  const [items, setItems] = useState<Array<Item>>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [viewedItem, setViewedItem] = useState<Item>();

  useEffect(() => {
    fetchUser();
    fetchItems();
  }, []);

  async function fetchUser() {
    const apiData = await API.graphql({ query: userQuery }) as GraphQLResult<UserQuery>;
    console.log(apiData);
    if(apiData?.data?.user?.Username){
        setUsername(apiData.data.user.Username);
    }
  }

  async function fetchItems() {
    const apiData = await API.graphql({ query: listItems }) as GraphQLResult<ListItemsQuery>;
    if(apiData?.data?.listItems){
      setItems(apiData.data.listItems.items as Array<Item>);
    }
  }

  async function createItem(item : CreateItemInput) {
    setModalOpen(false);
    await API.graphql({ query: createItemMutation, variables: { input: item } });
    await fetchItems();
  }
  
  async function deleteItem(id : string) {
    await API.graphql({ query: deleteItemMutation, variables: { input: { id } }});
    await fetchItems();
  }

  return (
    <div className={classes.root}>
      <Header username={username} />
      <div className={classes.container}>
        <span>Todo List:</span>
        {
          items.map(item => (
            <TodoItem 
              item={item}
              isDeletable={item.owner === username}
              onClick={() => setViewedItem(item)}
              onDelete={() => deleteItem(item.id)}
            />
          ))
        }
      </div>
      <>  
        <button onClick={() => setModalOpen(true)}>Create Item</button>
      </>
      <CreateItemModal 
        open={modalOpen}
        onCreateItem={(item) => createItem(item)}
        onClose={() => setModalOpen(false)}
      />
      <ViewItemModal
        open={!!viewedItem}
        item={viewedItem}
        onClose={() => setViewedItem(undefined)}
      />
    </div>
  );
}

export default withAuthenticator(App);
