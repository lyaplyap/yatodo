import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.css';

export const Input = ({ add }) => {
    const [value, setValue] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handleEnter = async (event) => {
        if (event.code !== 'Enter' || !value) {
            return;
        }

        await add(value);
        setValue('');
    };

    return (
        <div className={styles.container}>
            <input
                ref={inputRef}
                className={styles.input}
                placeholder="Your todo here..."
                value={value}
                onChange={handleChange}
                onKeyDown={handleEnter}
            />
        </div>
    );
};

Input.propTypes = {
    add: PropTypes.func
};
