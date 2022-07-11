import React, { useState, useEffect } from "react";
import { readCard, updateCard } from "../utils/api/index";
import CardForm from "./CardForm";
import { useParams, useHistory } from "react-router-dom";

function EditCard() {
  const { deckId, cardId } = useParams();
  const history = useHistory();
  const deckUrl = `/decks/${deckId}`
  const initialCardState = {
    front: "",
    back: "",
    deckId: Number(deckId),
    id: cardId
  };

  const [editCard, setEditCard] = useState({ ...initialCardState });

  useEffect(() => {
    readCard(cardId)
      .then(setEditCard);
  }, [cardId]);

  const handleSave = async (event) => {
    event.preventDefault();
    await updateCard(editCard);
    history.push(deckUrl);
  };

  return (
    <div>
      <CardForm formData={editCard} setFormData={setEditCard} handleSave={handleSave} />
    </div>
  );
}
export default EditCard;