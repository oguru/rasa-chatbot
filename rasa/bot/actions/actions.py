# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions


# This is a simple example for a custom action which utters "Hello World!"

from typing import Any, Text, Dict, List

from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher

import requests

cache = dict()

pokemon_api_url = "https://pokeapi.co/api/v2/pokemon/"

def get_pokemon_from_server(url):
    print("Fetching pokemon from server...")
    response = requests.get(url)
    return response.text

def get_pokemon(url):
    print("Getting pokemon...")
    if url not in cache:
        cache[url] = get_pokemon_from_server(url)

    return cache[url]


# class ExtractFoodEntity(Action):

#     def name(self) -> Text:
#         return "action_extract_food_entity"

#     def run(self, dispatcher: CollectingDispatcher,
#             tracker: Tracker,
#             domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

#         food_entity = next(tracker.get_latest_entity_values("food"), None)

#         if food_entity:
#             dispatcher.utter_message(text = f"You have seleted {food_entity}")
#         else:
#             dispatcher.utter_message(text="Sorry, I could not detect the food choice")

class OrderFoodAction(Action):

    def name(self) -> Text:
        return "action_order_food"
    
    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

            dispatcher.utter_message(text="Sure, what kind of food would you like?")

            return []
    
class ConfirmOrderAction(Action):
        def name(self) -> Text:
            return "action_confirm_order"
        
        def run(self, dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

            food_entity = next(tracker.get_latest_entity_values("food"), None)

            if food_entity:
                dispatcher.utter_message(text = f"I have ordered {food_entity} for you")
            else:
                dispatcher.utter_message(text="Sorry, I could not detect the food choice")

class GetPokemonAction(Action):
    def name(self): 
        return "action_get_pokemon"
    
    def run(self, dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
          
        pokemon = next(tracker.get_latest_entity_values("pokemon"), None)
        
        if pokemon:
            url = f"{pokemon_api_url}{pokemon}"
            pokemonData = get_pokemon(url)
            dispatcher.utter_message(text = f"You chose {pokemon}!")
            print(pokemonData)
        else:
            dispatcher.utter_message(text="Sorry, I could not detect the pokemon choice")