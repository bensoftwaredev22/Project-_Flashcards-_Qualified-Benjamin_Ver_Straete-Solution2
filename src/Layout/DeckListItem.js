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
            <td> <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button> </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default DeckListItem;