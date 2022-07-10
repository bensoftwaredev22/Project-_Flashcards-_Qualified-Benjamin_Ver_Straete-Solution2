import React, { useState, useEffect } from "react";
import { readDeck, readCard, updateCard } from "../utils/api/index";
import { Link, useParams, useHistory } from "react-router-dom";
/*
Displays the card information to edit the current card selected through the edit button
*/


function EditCard() {
    const { deckId, cardId } = useParams();
    const [deck, setDeck] = useState({});

    const history = useHistory();

    const initialCardState= {
        front: "Front side of card",
        back: "Back side of card",
        deckId: Number(deckId),
        id: cardId
      };
    
    const [cardInfo, setCardInfo] = useState({ ...initialCardState});

    useEffect(() => {
        readDeck(deckId)
        .then(setDeck);
    }, [deckId]);

    useEffect(() => {
        readCard(cardId)
        .then(setCardInfo);
    }, [cardId]);

    const handleDataChange = ({ target }) => {
        setCardInfo({
          ...cardInfo,
          [target.name]: target.value,
        });
      };

    const handleSave = async (event) => {
        event.preventDefault();
        await updateCard(setCardInfo)
        history.push(`/decks/${deck.id}`)
    }




    return (
        <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                <li className="breadcrumb-item active">Edit Card</li>
            </ol>
            <h1>{deck.name}: Add Card</h1>
            <form onSubmit={handleSave}>
                <h5>Front</h5>
                  <div>
                     <textarea
                      name="front"
                      onChange={handleDataChange}
                      value={cardInfo.front}
                      rows="5"
                      required
                     />
                    </div>
                <h5>Back</h5>
                  <div>
                    <textarea
                      name="back"
                      onChange={handleDataChange}
                      value={cardInfo.back}
                      rows="5"
                      required
                    />
                  </div>
                <Link to={`/decks/${deck.id}`} className="btn btn-secondary mr-1">Done</Link>
                <button tpye="submit" className="btn btn-success">Submit</button>
            </form>
        </div>
    );
}
export default EditCard;