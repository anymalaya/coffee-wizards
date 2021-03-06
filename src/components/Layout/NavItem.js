import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useCurrentWidth from '../../hooks/useCurrentWidth';

import arrowDown from '../../assets/icons/arrow-down.svg';
import arrowUp from '../../assets/icons/arrow-up.svg';
import styles from './NavItem.module.scss';

const NavItem = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const width = useCurrentWidth(!showDropdown && !props.mobile);
  const arrowIcon = showDropdown ? arrowUp : arrowDown;

  useEffect(() => width > 600 && setShowDropdown(false), [width]);

  const toggleDropdownHanlder = () => setShowDropdown((curState) => !curState);
  const showDropdownHanlder = (e) => {
    if (e.type === 'mouseenter' && props.mobile) {
      return;
    }
    setShowDropdown(true);
  };
  const closeDropdownHanlder = (e) => {
    if (e.type === 'mouseleave' && props.mobile) {
      return;
    }
    props.clicked();
    setShowDropdown(false);
  };

  let dropdownItems = props.dropdown.map((item) => {
    return (
      <li key={item.title}>
        <Link
          to={{ pathname: item.link, search: '' }}
          onClick={closeDropdownHanlder}
        >
          {item.title}
        </Link>
      </li>
    );
  });

  return (
    <li
      onMouseEnter={showDropdownHanlder}
      onMouseLeave={closeDropdownHanlder}
      className={styles.navItem}
    >
      <NavLink
        to={{ pathname: props.link, search: '' }}
        activeClassName="selected"
        onClick={props.clicked}
      >
        {props.children}
      </NavLink>
      <img src={arrowIcon} alt="arrow icon" onClick={toggleDropdownHanlder} />
      <AnimatePresence>
        {showDropdown && (
          <motion.ul
            key="dropdown"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={styles.dropdownItems}
          >
            {dropdownItems}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
};

export default NavItem;
