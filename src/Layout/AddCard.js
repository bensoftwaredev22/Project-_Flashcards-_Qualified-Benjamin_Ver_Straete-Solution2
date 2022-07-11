import React, { useState, useEffect } from "react";
import { Link, useParams, } from "react-router-dom";
import { createCard, readDeck } from "../utils/api/index";

/*
displays textareas to create a new card and add it to the current deck.
Has a done button which brings the user to the deck screen.
Has a save button to save the new card to the deck.
*/

function AddCard() {
    const {deckId} = useParams();
    const initialCardState = {
        front: "",
        back: "",
        deckId: Number(deckId)
    }
    //const history = useHistory();
    const [newCard, setNewCard] = useState({...initialCardState});
    const [deck, setDeck] = useState({});
    //const handleDataChange = (event) => (event.target.value);

    //const [front, setFront] = useState();
    //const handleFrontChange = (event) => setFront(event.target.value);

    //const [back, setBack] = useState();
    //const handleBackChange = (event) => setBack(event.target.value);



    useEffect(() => {
        readDeck(deckId)
        .then(setDeck);
    }, [deckId]);

    //const deckUrl = `/decks/${deckId}`;
   // const handleDone = () => history.push(deckUrl);

    const handleDataChange = ({ target }) => {
        setNewCard({
          ...newCard,
          [target.name]: target.value,
        });
      };


    const handleSave = async (event) => {
        event.preventDefault();
        await createCard(newCard)
        setNewCard(initialCardState)
    }




    return (
        <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                <li className="breadcrumb-item active">Add Card</li>
            </ol>
        <h1>{deck.name}: Add Card</h1>
        <form onSubmit={handleSave}>
            <div>
                <h5>Front</h5>
                <textarea
                name="front"
                rows="3"
                placeholder="Front side of card"
                onChange={handleDataChange}
                value={newCard.front}
                required
                />
            </div>
            <div>
                <h5>Back</h5>
                <textarea
                name="back"
                rows="4"
                placeholder="back side of card"
                onChange={handleDataChange}
                value={newCard.back}
                required
                />
            </div>
            <Link to={`/decks/${deck.id}`} className="btn btn-secondary mr-1">Done</Link>
            <button type="submit" className="btn btn-success">Save</button>
        </form>
        </div>
    )
}
export default AddCard;