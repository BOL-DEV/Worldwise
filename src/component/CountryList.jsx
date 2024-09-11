import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../Contexts/CitiesContext";

const CountryList = () => {

  const { cities, isLoading } = useCities()

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
        );
    
    const countries = cities.reduce((arr, city) => {
      return arr.find((el) => el.country === city.country)
        ? arr
        : [...arr, { country: city.country, emoji: city.emoji }];
    }, []);


  return (
    <div className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </div>
  );
};

export default CountryList;
