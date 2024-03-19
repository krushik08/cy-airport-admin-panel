import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Google from '../../assets/img/icon/google.png';
import Facebook from '../../assets/img/icon/facebook.png';
import Twitter from '../../assets/img/icon/twitter.png';
import ApiService from '../../until/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  let navigation = useNavigate();
  const [newUserData, setNewUserData] = useState();
  const handleRegister = (e) => {
    e.preventDefault();
    ApiService.request('app/v1/auth', 'post', newUserData).then((response) => {
      if (response && response.codes === 200) {
        toast.success('User Credited Successfully.', {
          position: 'Bottom-left',
        });

        navigation('/');
      } else {
        toast.error(response.message);
      }
    });
  };
  return (
    <>
      {/* <!--  Common Author Area --> */}
      <section id="common_author_area" className="section_padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="common_author_boxed">
                <div className="common_author_heading">
                  <h3>Register account</h3>
                  <h2>Register your account</h2>
                </div>
                <div className="common_author_form">
                  <form action="#" id="main_author_form">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter first name*"
                        value={newUserData?.firstName}
                        onChange={(e) =>
                          setNewUserData({
                            ...newUserData,
                            firstName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter last name*"
                        value={newUserData?.lastName}
                        onChange={(e) =>
                          setNewUserData({
                            ...newUserData,
                            lastName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter middle name*"
                        value={newUserData?.middleName}
                        onChange={(e) =>
                          setNewUserData({
                            ...newUserData,
                            middleName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Your email address (Optional)"
                        value={newUserData?.email}
                        onChange={(e) =>
                          setNewUserData({
                            ...newUserData,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Mobile Number*"
                        value={newUserData?.phoneNumber}
                        onChange={(e) =>
                          setNewUserData({
                            ...newUserData,
                            phoneNumber: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={newUserData?.passwords}
                        onChange={(e) =>
                          setNewUserData({
                            ...newUserData,
                            passwords: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="common_form_submit">
                      <button
                        className="btn btn_theme btn_md"
                        onClick={handleRegister}
                      >
                        Register
                      </button>
                    </div>
                    <div className="have_acount_area other_author_option">
                      <div className="line_or">
                        <span>or</span>
                      </div>
                      <ul>
                        <li>
                          <a href="#!">
                            <img src={Google} alt="icon" />
                          </a>
                        </li>
                        <li>
                          <a href="#!">
                            <img src={Facebook} alt="icon" />
                          </a>
                        </li>
                        <li>
                          <a href="#!">
                            <img src={Twitter} alt="icon" />
                          </a>
                        </li>
                      </ul>
                      <p>
                        Already have an account?{' '}
                        <a href="login.html">Log in now</a>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
