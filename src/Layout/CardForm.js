import React, {useState, useEffect} from "react";
import {readDeck } from "../utils/api/index";
import { useParams, Link, useHistory } from "react-router-dom";


function CardForm({ formData, setFormData, handleSave}) {
    const { deckId } = useParams();
    const deckUrl = `/decks/${deckId}`;
    const history = useHistory();
    const [deck, setDeck] = useState({});

    useEffect(() => {
        readDeck(deckId)
        .then(setDeck);
    }, [deckId]);

    const handleDataChange = ( {target} ) => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        });
    };

    if (deck) {
        const handleDone = () => history.push(deckUrl);
        const add = !(formData.id)

        return (
            <div>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={deckUrl}>{deck.name}</Link></li>
                    {add ? <li className="breadcrumb-item active">Add Card</li> : <li className="breadcrumb-item active">Edit Card {formData.id} </li>}
                </ol>
                {add ? <h1>{deck.name}: Add Card</h1> : <h1>Edit Card</h1>}
                <form name="addCard" onSubmit={handleSave}>
                    <h5>Front</h5>
                        <div>
                            <textarea
                            name="front"
                            onChange={handleDataChange}
                            value={formData.front}
                            placeholder="Front side of card"
                            required
                            />
                        </div>
                    <h5>Back</h5>
                        <div>
                            <textarea
                            name="back"
                            onChange={handleDataChange}
                            value={formData.back}
                            placeholder="Back side of card"
                            required
                            />
                        </div>
                    <button type="button" className="btn btn-secondary" onClick={handleDone}>Done</button>
                    <button type="submit" className="btn btn-success">Save</button>
                </form>
            </div>
        )
    }
    return "Loading..."
}

export default CardForm;