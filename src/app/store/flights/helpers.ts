import queryString from "query-string";
import {
  DtoAirlineInfo,
  DtoArrival,
  DtoDeparture,
  DtoFlightInfo,
  RecievFlightInfo
} from "types/flight"
import { formatTime } from "utils/dates";

const getAirlineInfo = ({ logoName, name }: DtoAirlineInfo): DtoAirlineInfo => {
  return { logoName, name };
}

const getRecievFlight = (flight: DtoFlightInfo) => {
  return {
    id: flight.ID,
    airline: {
      en: getAirlineInfo(flight.airline.en),
      uk: getAirlineInfo(flight.airline.ua)
    },
    flightNum: `${flight['carrierID.IATA'] ?? flight['carrierID.code']}${flight.fltNo}`,
    term: flight.term
  }
}

export const getRecievArrival = (arrival: DtoArrival): RecievFlightInfo => {
  return {
    ...getRecievFlight(arrival),
    status: formatTime(arrival.timeLandFact),
    city: {
      uk: arrival["airportFromID.city"],
      en: arrival["airportFromID.city_en"]
    },
    time: formatTime(arrival.timeToStand)
  }
}

export const getRecievDeparture = (departure: DtoDeparture): RecievFlightInfo => {
  return {
    ...getRecievFlight(departure),
    status: formatTime(departure.timeTakeofFact),
    city: {
      uk: departure["airportToID.city"],
      en: departure["airportToID.city_en"]
    },
    time: formatTime(departure.timeDepShedule)
  }
}

export const getDefaultSearchParam = () => {
  const params = queryString.parse(location.search);
  
  return typeof params.search === "string" ? params.search : ''; 
}