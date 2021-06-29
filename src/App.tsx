import React, { useEffect, useState } from 'react';
import './App.css';
import { API } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { listItems } from './graphql/queries';
import { createItem as createItemMutation, deleteItem as deleteItemMutation } from './graphql/mutations';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { ListItemsQuery, Item, CreateItemInput } from './API';

function App() {
  const [items, setItems] = useState<Array<Item>>([]);

  useEffect(() => {
    fetchItems();
  });

  async function fetchItems() {
    const apiData = await API.graphql({ query: listItems }) as GraphQLResult<ListItemsQuery>;
    if(apiData?.data?.listItems){
      setItems(apiData.data.listItems.items as Array<Item>);
    }
  }

  async function createItem() {
    const newItem : CreateItemInput = {
      name: `Item ${items.length + 1}`,
      detail: 'Newly added item.',
      votes: 0
    }
    await API.graphql({ query: createItemMutation, variables: { input: newItem } });
    await fetchItems();
  }
  
  async function deleteItem(id : String) {
    await API.graphql({ query: deleteItemMutation, variables: { input: { id } }});
    await fetchItems();
  }

  return (
    <div className="App">
      <>
        {
          items.map(item => (
            <div key={item.id || item.name}>
              <h2>{item.name}</h2>
              <p>{`${(item.comments?.items?.length || 0)} Comments`}</p>
              <button onClick={() => deleteItem(item.id)}>Delete</button>
            </div>
          ))
        }
      </>
      <>  
        <button onClick={createItem}>Create Item</button>
      </>
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);
