import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api/index";

function EditDeck() {
  
  const { deckId } = useParams();
  const history = useHistory();
  const [formData, setFormData] = useState({
    name: "name",
    description: "description"
  });
  
  useEffect(() => {
    readDeck(deckId)
    .then(response => setFormData({
      name: response.name,
      description: response.description
    }));
  }, [deckId]);
  
  if(formData) {
    const deckUrl = `/decks/${deckId}`;
    const handleChange = ({ target }) => {
      setFormData({
        ...formData,
        [target.name]: target.value,
      });
    };
    
    const handleSubmit = async (event) => {
      event.preventDefault();
    
      const newDeck = {
        name: formData.name,
        description: formData.description,
        id: deckId
      };
      await updateDeck(newDeck);
      history.push(deckUrl);
    };

    return (
        <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{formData.name}</Link></li>
                <li className="breadcrumb-item active">Edit Deck</li>
            </ol>
            <form onSubmit={handleSubmit}>
              <h1>Edit Deck</h1>
                <h5>Name</h5>
                    <div>
                        <textarea
                        name="name"
                        onChange={handleChange}
                        value={formData.name}
                        rows="4"
                        required
                        />
                    </div>
                <h5>Description</h5>
                    <div>
                        <textarea
                        name="description"
                        onChange={handleChange}
                        value={formData.description}
                        rows="4"
                        required
                        />
                    </div>
                <Link to={`/decks/${deckId}`} className="btn btn-secondary mr-1">Cancel</Link>
                <button type="submit" className="btn btn-success">Submit</button>
            </form>
        </div>
    )
    }
    return "Loading...";
}
export default EditDeck;