
import PropTypes from 'prop-types';
import styles from './Button.module.css';
// css 코드를 자바스크립트 오브젝트로 변환해서 일부분만 사용할 수 있게 해줌

export default function Button({text, onClick}) {

    return <button className={styles.btn}
        onClick={ onClick}// styles에서 btn 클래스만 적용
        > { text }</button >;
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}