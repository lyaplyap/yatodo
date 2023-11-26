import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './index.module.css';

export const Button = ({ className, ...props }) => {
    return (
        <button className={cn(styles.button, className)} {...props} />
    );
};

Button.propTypes = {
    className: PropTypes.string
};
