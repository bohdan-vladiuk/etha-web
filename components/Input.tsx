// Dependencies
import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import style from '../styles/ContactModal.module.css';

interface InputProps {
    label: string;
    type: string;
    value: string;
    click?: () => void;
    placeHolder: string | '';
    val?: (e: any) => void;
}

export const CustomInput: React.FC<InputProps> = (props: InputProps) => {
    const { click, label, type, placeHolder, val, value } = props;
    const [viewing, setViewing] = useState(false);

    function handleChange(e: any) {
        val !== undefined && val(e.target.value);
    }

    const cn = viewing ? style.input_label_animate : style.input_label;
    return (
        <Form.Group
            className={`${style.input_container}`}
            onClick={() => setViewing(true)}
            controlId={`formBasic${type}`}
            onMouseLeave={() => {
                if (value.length === 0) {
                    setViewing(false);
                }
            }}
        >
            <Form.Label className={`${viewing ? style.input_label_animate : cn} p-0 m-0`}>{label}</Form.Label>
            {viewing && (
                <Form.Control
                    tabIndex={0}
                    className={`p-0 m-0`}
                    autoFocus={viewing}
                    style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        outline: 'none',
                        fontSize: '14px',
                        fontWeight: '700',
                        color: 'black',
                    }}
                    type={type}
                    value={value}
                    placeholder={placeHolder}
                    onChange={handleChange}
                    onMouseLeave={() => {
                        if (value.length === 0) {
                            setViewing(false);
                        }
                    }}
                />
            )}
        </Form.Group>
    );
};
