import React, {useState, useEffect} from "react";
import {useParams, Link } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import CardStudy from "./CardStudy";

/*
This component will display the title of the deck selected through the study button.
This will also display the flash Cards ready to study and flip through by using the CardStudy component
*/


function Study() {
    const [deck, setDeck] = useState();
    const { deckId } = useParams();

    useEffect(() => {
        readDeck(deckId)
        .then(response => setDeck(response));
    }, [deckId]);


  if(deck) {
    return (
        <div>
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link>/</li>
          <li className="breadcrum-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link>/</li>
          <li className="breadcrum-item active" aria-current="page">Study</li>
        </ol>
        <h1>Study: {deck.name}</h1>
        <CardStudy cards={deck.cards} />
      </div>
    )
  }
    return "Loading..."   
}

export default Study;