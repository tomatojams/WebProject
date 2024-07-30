
import PropTypes from 'prop-types';

export default function Button({ text }) {
    return <button>{text}</button>;
}

Button.propTypes = {
text: PropTypes.string.isRequired
}