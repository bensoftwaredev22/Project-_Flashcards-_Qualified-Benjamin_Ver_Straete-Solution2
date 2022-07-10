import React, {useEffect, useState} from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import {readDeck, deleteDeck} from "../utils/api/index";
import CardList from "./CardList";
/*
This screen will display information on the Deck selected through the view button.
This component will use the CardList component to list all of the flash cards assocaited with this deck
This component will also use the functions readDeck and deleteDeck from ../utils/api/index
*/

function Deck() {
 const {deckId} = useParams();
// const params = useParams();
 const [deck, setDeck] = useState({});

 
 useEffect(() => {
     readDeck(deckId)
     .then(setDeck);
 }, [deckId]);

/*
  useEffect(() => {
      async function loadDeck() {
          const deck = await readDeck(params.deckId);
          setDeck(deck);
      }
      loadDeck();
  }, []);
*/
    const history = useHistory();
    //const url = useRouteMatch();

    function confirmDelete() {
        let confirm = window.confirm("Delete this deck?\n\nYou will not be able to recover it.");
        if (confirm) {
            deleteDeck(deck.id);
            history.push("/")
        }
    }

    const cards = deck.cards ? deck.cards.map((card, index) => <CardList key={`${index}`} card={card} />) : <p>No Cards..</p>;
    //`${url}/cards/new`

    return (
        <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item active">{deck.name}</li>
            </ol>
            <h2>{deck.name}</h2>
            <p>{deck.description}</p>
            <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary mr-2">Edit</Link>
            <Link to={`/decks/${deckId}/study`} className="btn btn-secondary mr-2">Study</Link>
            <Link to={`/decks/${deckId}/cards/new`} className="btn btn-secondary mr-2">Add Cards</Link>
            <button className="btn btn-danger" style={{float:"right"}} onClick={confirmDelete}>Delete</button>
            <h1>Cards</h1>
            {cards}
        </div>
    )
}
export default Deck;