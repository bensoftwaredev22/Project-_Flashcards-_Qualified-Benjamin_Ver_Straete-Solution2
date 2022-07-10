import React, {useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api/index";


/*
This Screen will display an input field to name a new deck and a textarea to give it a description
This component will use the createDeck function from ../utils/api/index
*/


function CreateDeck() {
    const history = useHistory();
    const initialFormState = {
        name: "",
        description: ""
    };

    const [formData, setFormData] = useState({...initialFormState});
    //const handleChange = (event) => (event.target.value);
    const handleChange = ({ target }) => {
        setFormData({
          ...formData,
          [target.name]: target.value,
        });
      };
    const handleCancel =() => history.push("/")
    const handleSubmit = async (event) => {
        event.preventDefault();
        const newDeck = {
            name: formData.name,
            description: formData.description
        };
        const deck = await createDeck(newDeck);
        history.push(`/decks/${deck.id}`);
    };





    return (
        <div>
          <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item active">Create Deck</li>
          </ol>
          <h1>Create Deck</h1>
          <form>
            <h5>Name</h5>
            <div>
             <input
              id="deckName"
              type="text"
              name="name"
              placeholder="Deck Name"
              onChange={handleChange} 
              value={formData.name}
             />
            </div>
            <div>
             <h5>Description</h5>
             <textarea
              name="description"
              rows="3"
              placeholder="Description"
              onChange={handleChange}
              value={formData.description}
             />
            </div>
            <div>
               <button type="button" className="btn btn-secondary mr-2" onClick={handleCancel}>Cancel</button>
               <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </div>
          </form>
        </div>

    )   
}

export default CreateDeck;