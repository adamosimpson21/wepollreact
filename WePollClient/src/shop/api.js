import {fetchErrorHandler} from "../helper/helper";

export async function addItem(item){
  return fetch('/api/items', {
    method: 'post',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({name:item})
  })
    .then(fetchErrorHandler)
}

export async function incrementStack(item){
  return fetch('/api/items/' + item._id, {
    method: 'put',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body:JSON.stringify({stack: ++item.stack})
  })
    .then(fetchErrorHandler)
}