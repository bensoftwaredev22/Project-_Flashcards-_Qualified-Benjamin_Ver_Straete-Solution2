import React, { useState } from "react";
import { createCard } from "../utils/api/index";
import CardForm from "./CardForm";
import { useParams } from "react-router-dom";

function AddCard() {
  const { deckId } = useParams();

  const initialCardState = {
    front: "",
    back: "",
    deckId: Number(deckId)
  };

  const [addCard, setAddCard] = useState( {...initialCardState} );

  const handleSave = async (event) => {
    event.preventDefault();
    //console.log(initialCardState);
    await createCard(deckId, addCard);
    //console.log(addCard);
    setAddCard(initialCardState);
  };

  return (
    <div>
      <CardForm formData={addCard} setFormData={setAddCard} handleSave={handleSave} />
    </div>
  );
}
export default AddCard;