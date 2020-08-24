import { combineReducers } from 'redux';
import errors from './errors';
import messages from './messages';
import auth from './auth';
import management from './management';
import questions from './questions';
import aquest from './aquest';
import apost from './apost';
import posts from './posts';

export default combineReducers({
    errors,
    messages,
    auth,
    management,
    questions,
    aquest,
    apost,
    posts
});