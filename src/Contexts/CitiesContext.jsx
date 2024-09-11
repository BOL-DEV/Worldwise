import { createContext, useContext, useEffect, useReducer } from "react";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };

    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...action.cities, action.payload],
        currentCity: action.payload
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {}
      };

    case "rejected":
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error("Unknown action type");
  }
}

const CitiesProvider = ({ children }) => {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

 

  useEffect(() => {
    async function getData() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch("http://localhost:9000/cities");
        const data = await res.json();

        dispatch({ type: "cities/loaded", payload: data }); //  console.log(data);
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading data",
        });
      }
    }

    getData();
  }, []);

  async function getCityData(id) {

    if(+id === currentCity.id) return

    dispatch({ type: "loading" });

    try {
      const res1 = await fetch(`http://localhost:9000/cities/${id}`);
      const data1 = await res1.json();

      dispatch({ type: "city/loaded", payload: data1 });
      //    console.log(data);
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error loading a city",
      });
    }
  }

  async function createCity(newCity) {
    dispatch({ type: "loading" });

    try {
      const res1 = await fetch(`http://localhost:9000/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });
      const data1 = await res1.json();

      dispatch({ type: "city/created", payload: data1 });
      //  console.log(data1);
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error creating a city",
      });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });

    try {
      await fetch(`http://localhost:9000/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "city/deleted", payload: id });
      //  console.log(data1);
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting a city",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCityData,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

const useCities = () => {
  const context = useContext(CitiesContext);

  if (context === undefined)
    throw new Error("CitiesContext was used outside the citiesProvider");

  return context;
};

export { CitiesProvider, useCities };
