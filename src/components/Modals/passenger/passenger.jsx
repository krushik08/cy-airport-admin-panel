import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/fontawesome-free-solid";
import { useCallback, useState } from "react";
import useOnClickOutside from "../../../hook/outSideClick/outSideClick";
import "./passenger.css";

const PassengerModal = ({
  openModal,
  setIsOpenModal,
  passengerInfo,
  setPassengerInfo,
  preferredClassis,
}) => {
  const [passengersCount, setPassengersCount] = useState({
    adult: passengerInfo.passengers.adult,
    children: passengerInfo.passengers.children,
    infant: passengerInfo.passengers.infant,
  });
  const [selectedType, setSelectedType] = useState(
    preferredClassis[passengerInfo.preferedClass]
  );
  const handleBlur = useCallback(() => {
    setIsOpenModal("");
  }, []);

  const ref = useOnClickOutside(handleBlur);
  const handleApply = (e) => {
    setPassengerInfo({
      ...passengerInfo,
      passengers: passengersCount,
      preferedClass: selectedType.id,
    });
    setIsOpenModal("");
  };
  return (
    <div
      className={`dropdown-menu dropdown_passenger_info ${openModal}`}
      ref={ref}
    >
      <div class="traveller-calulate-persons">
        <div class="passengers">
          <h6>Passengers</h6>
          <div class="passengers-types">
            <div class="passengers-type">
              <div class="text">
                <span class="count pcount">{passengersCount.adult}</span>
                <div class="type-label">
                  <p>Adult</p>
                  <span>12+ yrs</span>
                </div>
              </div>
              <div class="button-set">
                <button
                  type="button"
                  class="btn-add"
                  onClick={(e) => {
                    setPassengersCount({
                      ...passengersCount,
                      adult: passengersCount.adult + 1,
                    });
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
                <button
                  type="button"
                  class="btn-subtract"
                  onClick={(e) => {
                    setPassengersCount({
                      ...passengersCount,
                      adult:
                        passengersCount.adult > 0
                          ? passengersCount.adult - 1
                          : 0,
                    });
                  }}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>
              </div>
            </div>
            <div class="passengers-type">
              <div class="text">
                <span class="count ccount">{passengersCount.children}</span>
                <div class="type-label">
                  <p class="fz14 mb-xs-0">Children</p>
                  <span>2 - Less than 12 yrs</span>
                </div>
              </div>
              <div class="button-set">
                <button
                  type="button"
                  class="btn-add-c"
                  onClick={(e) => {
                    setPassengersCount({
                      ...passengersCount,
                      children: passengersCount.children + 1,
                    });
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
                <button
                  type="button"
                  class="btn-subtract-c"
                  onClick={(e) => {
                    setPassengersCount({
                      ...passengersCount,
                      children:
                        passengersCount.children > 0
                          ? passengersCount.children - 1
                          : 0,
                    });
                  }}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>
              </div>
            </div>
            <div class="passengers-type">
              <div class="text">
                <span class="count incount">{passengersCount.infant}</span>
                <div class="type-label">
                  <p class="fz14 mb-xs-0">Infant</p>
                  <span>Less than 2 yrs</span>
                </div>
              </div>
              <div class="button-set">
                <button
                  type="button"
                  class="btn-add-in"
                  onClick={(e) => {
                    setPassengersCount({
                      ...passengersCount,
                      infant: passengersCount.infant + 1,
                    });
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
                <button
                  type="button"
                  class="btn-subtract-in"
                  onClick={(e) => {
                    setPassengersCount({
                      ...passengersCount,
                      infant:
                        passengersCount.infant > 0
                          ? passengersCount.infant - 1
                          : 0,
                    });
                  }}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="cabin-selection">
          <h6>Cabin Class</h6>
          <div class="cabin-list">
            {preferredClassis.map((item, index) => (
              <>
                <button
                  type="button"
                  class={`label-select-btn ${
                    item.value === selectedType.value ? "active" : ""
                  } `}
                  onClick={() => setSelectedType(preferredClassis[index])}
                >
                  <span class="muiButton-label">
                    {preferredClassis[index].value}
                  </span>
                </button>
              </>
            ))}
          </div>
        </div>
        <div className="top_form_button">
          <button
            type="button"
            className="btn btn_theme btn_md"
            onClick={handleApply}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};
export default PassengerModal;
