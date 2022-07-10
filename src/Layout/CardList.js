import React from "react";
import { deleteCard } from "../utils/api/index";
import { Link } from "react-router-dom";
/*
Used to display the list of cards in a deck
each card has a edit and delete button
shows front and back of the card.
Used by the Deck.js component
*/

function CardList( {card} ) {
    function confirmDelete() {
        let confirm = window.confirm("Delete this card?\n\nYou will not be able to recover it.");
        if (confirm) {
            deleteCard(card.id);
        }
    }

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className="card-text container">
                        <div className="row">
                            <div className="col">
                                <p>{card.front}</p>
                            </div>
                            <div className="col">
                                <p>{card.back}</p>
                            </div>
                        </div>
                    </div>
                    <button style={{float:"right"}} className="btn btn-danger" onClick={confirmDelete}>Delete</button>
                    <Link to={`/decks/${card.deckId}/cards/${card.id}/edit`} style={{float:"right"}} className="btn btn-secondary mr-2">Edit</Link>
                </div>
            </div>
        </>
    );
}
export default CardList;