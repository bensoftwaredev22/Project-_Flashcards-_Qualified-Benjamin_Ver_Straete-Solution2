import React, {useState, useEffect} from "react";
import {readDeck } from "../utils/api/index";
import { useParams, Link, useHistory } from "react-router-dom";


function CardForm({}) {
    const { deckId } = useParams();
    const deckUrl = `/decks/${deckId}`;
    const history = useHistory();
    const [deck, setDeck] = useState();

    useEffect(() => {
        readDeck(deckId)
        .then(setDeck);
    }, [deckId]);

    const handleDataChange = () => {
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
                <form>
                    <h5>Front</h5>
                        <div>
                            <textarea
                            name="front"
                            onChange={handleDataChange}
                            value={formData.front}
                            required
                            />
                        </div>
                    <h5>Back</h5>
                        <div>
                            <textarea
                            name="back"
                            onChange={handleDataChange}
                            value={formData.back}
                            required
                            />
                        </div>
                </form>
            </div>
        )
    }
    return "Loading..."
}

export default CardForm;