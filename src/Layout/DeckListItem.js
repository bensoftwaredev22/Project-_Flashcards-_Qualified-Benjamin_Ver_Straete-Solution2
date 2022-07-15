import React from "react";
import { useHistory } from "react-router-dom";
import { deleteDeck } from "../utils/api/index";

/*
This component will be used on the home screen to display each deck that is available to study
Each deck will have a title and description
number of cards in the deck
view button
study button
delete button
*/

function DeckListItem({ deck }) {

  const handleView = () => history.push(`/decks/${deck.id}`);
  const handleStudy = () => history.push(`/decks/${deck.id}/study`);

  const history = useHistory();
  const handleDelete = async () => {
    if (window.confirm("Do you really want to delete this deck?")) await deleteDeck(deck.id);
    history.go(0); // refresh
  };

  return (
    <div className="container text-blue">
      <table>
        <thead>
          <tr>
            <td>
              <h1>{deck.name}</h1>
            </td>
            <td>
              <small>{deck.cards.length} cards</small>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <p>{deck.description}</p>
            </td>
          </tr>
          <tr>
            <td> <button type="button" className="btn btn-info" onClick={handleView}>View</button> </td>
            <td> <button type="button" className="btn btn-primary" onClick={handleStudy}>Study</button> </td>
            <td> <button type="button" className="btn btn-danger"  onClick={handleDelete}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash mr-1" viewBox="0 0 16 16">
                   <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                   <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                  </svg>
                    Delete 
                </button> 
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default DeckListItem;