import { useState } from 'react';
import styles from './Checkbox.module.scss';

const Checkbox = (props) => {
  const [isChecked, setIsChecked] = useState(false);
  const { id, label, getCheckedStatus, onChange } = props;

  const onChangeHandler = () => {
    setIsChecked((curState) => !curState);
    getCheckedStatus && getCheckedStatus(!isChecked);
    onChange && onChange();
  };

  return (
    <div className={styles.checkbox}>
      <input type="checkbox" id={id} onChange={onChangeHandler} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default Checkbox;
