import React from "react";
import {Switch, Route} from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import Study from "./Study";
import CreateDeck from "./CreateDeck";
import Deck from "./Deck";
import EditDeck from "./EditDeck";
import AddCard from "./AddCard";
import EditCard from "./EditCard";

function Layout() {
  return (
   <>
    <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/decks/new" >
            <CreateDeck />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study  />
          </Route>
          <Route path="/decks/:deckId/Edit">
            <EditDeck  />  
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard  />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard  />  
          </Route>
          <Route path="/decks/:deckId">
            <Deck />  
          </Route>
          <Route>        
            <NotFound />
          </Route>
        </Switch>
      </div>
   </>
  );
}

export default Layout;
