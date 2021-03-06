import { useHistory } from 'react-router';
import * as vars from '../../shared/globalVars';
import Section from '../Layout/Section';
import ProductsListSummary from './ProductsListSummary';

const Equipment = () => {
  const history = useHistory();
  const gotoMachinesPageHandler = () => history.push(vars.EQUIP_MACHINES);
  const gotoManualPageHandler = () => history.push(vars.EQUIP_MANUAL);
  const gotoGrindersPageHandler = () => history.push(vars.EQUIP_GRINDERS);

  return (
    <>
      <Section light>
        <h1>Coffee Machines</h1>
        <ProductsListSummary
          subcategory={vars.MACHINES}
          clicked={gotoMachinesPageHandler}
          cardStyle={vars.CARD_DARK}
        />
      </Section>
      <Section>
        <h1> Manual Coffee Makers</h1>
        <ProductsListSummary
          subcategory={vars.MANUAL}
          clicked={gotoManualPageHandler}
          btnStyle={vars.BTN_SEMILIGHT}
        />
      </Section>
      <Section light>
        <h1> CoffeeGrinders</h1>
        <ProductsListSummary
          subcategory={vars.GRINDERS}
          clicked={gotoGrindersPageHandler}
          cardStyle={vars.CARD_DARK}
        />
      </Section>
    </>
  );
};

export default Equipment;
