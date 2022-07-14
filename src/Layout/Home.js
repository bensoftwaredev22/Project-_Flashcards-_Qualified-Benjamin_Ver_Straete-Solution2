import React, { useState, useEffect } from "react";
import { listDecks } from "../utils/api/index";
import {useHistory} from "react-router-dom";
import DeckListItem from "./DeckListItem";

/*
This compont will display the home screen and the list of decks available to study
Will have a create deck button
Will use the DeckListItem to display each deck
*/

function Home() {
    const [decks, setDecks] = useState();
    const history = useHistory();

    useEffect(() =>{
        listDecks()
        .then(setDecks);
    }, []);

    if(decks) {
        const deckList = decks.map(
            (deck, index) => <tr key={`${index}`}><td><DeckListItem deck={deck}/></td></tr>
        )
        const handleCreate = () => history.push("/decks/new");
    
        return (
        <div className="container">
            <table>
              <tbody> 
                 <tr><td>
                  <button type="button" className="btn btn-success" onClick={handleCreate}>Create Deck</button>
                 </td></tr>
                {deckList}
              </tbody>
            </table>
        </div>
        );
    }
    return "Loading...";
}
export default Home;