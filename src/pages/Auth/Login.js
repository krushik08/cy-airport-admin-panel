import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUserData } from '../../store/userData';
import { toast } from 'react-hot-toast';
import ApiService from '../../until/api';

function Login({ count, setUserData }) {
  const navigation = useNavigate();
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
  });
  const handleLogin = (e) => {
    e.preventDefault();

    ApiService.request('auth/login', 'post', userCredentials).then(
      (response, err) => {
        debugger;
        if (response) {
          setUserData(response.data);
          toast.success('login successfully.', { position: 'top-center' });
          navigation('/flight');
        } else {
          toast.error('Invalid email and password', {
            position: 'top-center',
          });
        }
      }
    );
    // .catch((err) => {
    //   debugger;
    //   toast.error('Invalid UserName and Password', {
    //     position: 'Bottom-left',
    //   });
    // });
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
                  <h3>Login your account</h3>
                  <h2>Logged in to stay in touch</h2>
                </div>
                <div className="common_author_form">
                  <form action="#" id="main_author_form">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter user name"
                        value={userCredentials.email}
                        onChange={(e) =>
                          setUserCredentials({
                            ...userCredentials,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        value={userCredentials.password}
                        onChange={(e) =>
                          setUserCredentials({
                            ...userCredentials,
                            password: e.target.value,
                          })
                        }
                      />
                      <a href="forgot-password.html">Forgot password?</a>
                    </div>
                    <div className="common_form_submit">
                      <button
                        className="btn btn_theme btn_md"
                        onClick={handleLogin}
                      >
                        Log in
                      </button>
                    </div>
                    <div className="have_acount_area"></div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    userData: state?.userData?.userData,
  };
};

export default connect(mapStateToProps, { setUserData })(Login);
