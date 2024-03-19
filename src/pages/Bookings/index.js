import React, { useEffect, useState } from 'react';
import ApiService from '../../until/api';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const Bookings = () => {
  const navigate = useNavigate();
  const [bookFlight, setBookFlight] = useState(0);
  const [isToggled, setIsToggled] = useState(false);
  const [isopen, setIsopen] = useState();
  const [selectedId, setSelectedId] = useState();
  useEffect(() => {
    handleFetchData();
  }, []);

  const handleClick = () => {
    setIsToggled(!isToggled);
    // Perform action based on the new state
  };
  const handleFetchData = () => {
    ApiService.request('book-flight', 'get').then((response) => {
      setBookFlight(response.flightBookDetails);
    });
  };
  const handleCancel = (id) => {
    ApiService.request(`book-flight/${selectedId}`, 'delete').then(
      (response) => {
        if (response) {
          console.log('deleted success');
          setIsopen(false);
          handleFetchData();
        }
      }
    );
  };
  const importData = () => {
    ApiService.request(`book-flight/dummy/import-record`, 'post').then(
      (response) => {
        if (response) {
          console.log('import data success');
          setTimeout(() => {
            handleFetchData();
          }, 2000);
        }
      }
    );
  };
  const deleteData = () => {
    ApiService.request(`book-flight/dummy/clear-record`, 'delete').then(
      (response) => {
        if (response) {
          console.log('Record delete success');
          handleFetchData();
        }
      }
    );
  };

  return (
    <>
      {/* Common Banner Area  */}
      <section id="common_banner">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="common_bannner_text">
                <h2>Flight submission</h2>
                <ul>
                  <li>
                    <a href="index.html">Home</a>
                  </li>
                  <li>
                    <span>
                      <i className="fas fa-circle"></i>
                    </span>
                  </li>
                  <li>
                    <span>
                      <i className="fas fa-circle"></i>
                    </span>{' '}
                    Flight booking
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>{' '}
      {/*  */}
      <section id="dashboard_main_arae" className="section_padding">
        <div className="container ">
          <div className="row">
            <div className="col-lg-12">
              <div className="dashboard_common_table ">
                <div className="d-flex justify-content-between">
                  <h3>Flight booking</h3>
                  <div className="d-flex gap-4 align-items-center justify-content-center">
                    <button
                      className="btn btn_navber"
                      type="button"
                      onClick={importData}
                    >
                      Import Data
                    </button>
                    <button
                      className="btn btn-danger"
                      type="button"
                      onClick={deleteData}
                    >
                      Clear Data
                    </button>
                  </div>
                </div>
                <div className="table-responsive-lg table_common_area">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Sl no.</th>
                        <th>PNR Number</th>
                        <th>Flight Number</th>
                        <th>Status</th>
                        <th>Departure Time</th>
                        <th>Departure Airpot</th>
                        <th>Arrival Airpot</th>
                        <th>Passenger Name</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookFlight?.length ? (
                        <>
                          {bookFlight.map((item, index) => {
                            return (
                              <tr>
                                <td>0{index + 1}.</td>
                                <td>{item?.PNRNumber}</td>
                                <td>{item?.flightId?.name}</td>
                                <td
                                  style={{
                                    color:
                                      item?.status === 'Confirmed'
                                        ? '#80C482'
                                        : item?.status === 'Cancelled'
                                        ? '#DC3444'
                                        : '#FFD81C',
                                  }}
                                >
                                  {item?.status}
                                </td>
                                <td>
                                  {moment(item?.departureDate).format(
                                    'DD-MM-YYYY hh:mm a'
                                  )}
                                </td>

                                <td>
                                  {item?.departureAirport.slice(0, 27) + '...'}
                                </td>
                                <td>
                                  {item?.arrivalAirport.slice(0, 27) + '...'}
                                </td>
                                <td>
                                  {item?.firstName} {item?.lastName}
                                </td>
                                <td className="d-flex gap-4 align-items-center justify-content-center">
                                  {moment(item?.departureDate)?.isAfter() && (
                                    <>
                                      <button
                                        className="btn btn_navber"
                                        type="button"
                                        aria-expanded="true"
                                        onClick={() =>
                                          navigate(`/flight/${item?.PNRNumber}`)
                                        }
                                      >
                                        Reschedule
                                      </button>

                                      <button
                                        className="btn btn-danger"
                                        type="button"
                                        aria-expanded="true"
                                        onClick={
                                          () => {
                                            setIsopen(true);
                                            setSelectedId(item?.PNRNumber);
                                          }
                                          // handleCancel(item?.PNRNumber)
                                        }
                                      >
                                        Cancel
                                      </button>
                                    </>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </>
                      ) : (
                        <></>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Model */}
      <div
        className={`modal modal-bg fade ${isopen ? 'show d-block' : 'd-none'}`}
        tabindex="-1"
        aria-hidden="true"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body logout_modal_content">
              <div className="btn_modal_closed">
                <button
                  type="button"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setIsopen(false)}
                >
                  X
                </button>
              </div>
              <h3>
                Are you sure? <br />
                you want to cancel.
              </h3>
              <div className="logout_approve_button">
                <button
                  data-bs-dismiss="modal"
                  className="btn btn_theme btn_md"
                  onClick={handleCancel}
                >
                  Yes Confirm
                </button>
                <button
                  data-bs-dismiss="modal"
                  className="btn btn_border btn_md"
                  onClick={() => setIsopen(false)}
                >
                  No Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bookings;
