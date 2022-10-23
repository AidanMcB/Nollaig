import { memo } from 'react';
import { ButtonProps } from './Button.interfase';
import './Button.scss';

function Button( props: ButtonProps ) {
    const { label, func, classProp, type } = props;

    return( 
        <button className={classProp} 
            onClick={func}
            title={label}
            type={type}>
            { label } 
        </button>
    )
}

export default memo(Button);