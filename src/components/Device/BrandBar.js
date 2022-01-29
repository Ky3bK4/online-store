import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Row, Card} from "react-bootstrap";
import {Context} from "../../index";

const BrandBar = observer(() => {
  const {device} = useContext(Context)
  return (
    <Row className="mt-3 ps-md-2 mt-md-0 flex-wrap">
      <Card
        className={`brandLink p-2 me-2
              ${device.selectedBrand.id === undefined ? 'bg-dark text-white': '' }
              `}
        style={{cursor: "pointer"}}
        onClick={()=>device.setSelectedBrand({})}
      >
        Все
      </Card>
      {
        device.brands.map(brand=>
          <Card
            className={`brandLink p-2 me-2
              ${device.selectedBrand.id === brand.id ? 'bg-dark text-white': '' }
              `}
            style={{cursor: "pointer"}}
            onClick={()=>device.setSelectedBrand(brand)}
            key={brand.id}
          >
            {brand.name}
          </Card>
        )
      }
    </Row>
  );
});

export default BrandBar;