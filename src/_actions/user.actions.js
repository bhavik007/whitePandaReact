import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    register,
    loginWithOtp,
    verifyOtp
};

function verifyOtp(mobile, otp) {
    return dispatch => {
        dispatch(request({ mobile, otp }));

        userService.verifyOtp(mobile, otp)
            .then(
                user => {
                    dispatch(success(user));
                    dispatch(alertActions.success('Login Successfully'));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function loginWithOtp(mobile) {
    return dispatch => {
        dispatch(request({ mobile }));

        userService.loginWithOtp(mobile)
            .then(
                user => {
                    dispatch(success(user));
                    dispatch(alertActions.success(user.message.toString()));
                    // history.push('/');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.ENTER_OTP, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    return dispatch => {
        let user = JSON.parse(localStorage.getItem('user')) || {};
        dispatch(request(user));

        userService.logout(user)
            .then(
                user => {
                    dispatch(success());
                    history.push('/');
                    dispatch(alertActions.success('Sign Out successful'));
                },
                error => {
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGOUT_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGOUT, user } }

}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => {
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}