import React from "react";
import {Filter, Bar,  KPI, Box, useScreenSize, CurrentSelections } from "@motor-js/core";


const MainContent = () => {
  const { screen } = useScreenSize();

  let flexDirection = "column";
  if (screen === "desktop" || screen === "largeDesktop") flexDirection = "row";

  const boxProps = {
    backgroundColor: "white",
    border: { color: "white" },
    margin: "5px",
    borderRadius: "2px",
  };

  const dynamicWidth = "calc(50% - 10px)";

  return (
    <Box padding="10px" width="100%" overflow="scroll" direction="column">
      <Box width="100%" direction={flexDirection}>
      <Filter dimension={['Porte']}  label="PORTE" single />
      <Filter dimension={['Descrição Setor']}  label="SETOR" single />
      </Box>
      

      <CurrentSelections minHeight="60px" width="100%" size="medium" />
      <Box width="100%" direction={flexDirection}>
        <Box flex={true} height={{min: '120px'}} {...boxProps}>
        <KPI roundNum={false} label='Número de Empresas' cols={[ "=num(Count({<TIPO_ESTAB = {'1'}, [%CODSITCADST]={'02'}>} NUM_CNPJ), '#.##0', ',', '.')"]} />
        </Box>
        <Box flex={true} height={{min: '120px'}} {...boxProps}>
        <KPI roundNum={false} label='Número de Estabelecimentos' cols={[ "=num(Count({<[%CODSITCADST]={'02'}>} NUM_CNPJ), '#.##0', ',', '.')"]} />
        </Box>
        <Box flex={true} height={{min: '120px'}} {...boxProps}>
        <KPI roundNum={false} label='Participação (%)' cols={[ "=(Count( NUM_CNPJ)/count({1} NUM_CNPJ))*100"]} />
        </Box>
      </Box>

      <Box width="100%" flex="grow" wrapProp={true} overflow="visible" >
        {/* <Box width={dynamicWidth} height={{min: '200px'}} {...boxProps} overflow="visble"></Box>
        <Box width={dynamicWidth} height={{min: '200px'}} {...boxProps} overflow="visble"></Box> */}
        <Box width={dynamicWidth} height={{min: '200px'}} {...boxProps} overflow="visble">
        <Bar
            width={850}
            height={550}
            roundNum={false}
            title="Empresas por Setor"
            size='medium'
            legendLabelStyle={{fontFamily: 'MontSerrat', fontWeight: 400}}
            valueLabelStyle={{fontSize: "large", fontWeight: "bold", fontFamily: 'Montserrat'}}
            colorTheme='eco'
            
                cols={[
                  "[Descrição Setor]",
                  { qField: "=Count([NUM_CNPJ])", qLabel: "Empresas Ativas" }
       
                ]}
        />
        </Box>
        <Box width={dynamicWidth} height={{min: '200px'}} {...boxProps} overflow="visble">

        <Bar
            width={950}
            height={550}
            roundNum={false}
            legendLabelStyle={{fontFamily: 'MontSerrat', fontWeight: 400}}
            valueLabelStyle={{fontSize: "large", fontWeight: "bold", fontFamily: 'Montserrat'}}
            xAxisStyles={{
              
              fontFamily: 'Oswald'
            
              }}
            title="Empresas por Porte"
            size='medium'
            colorTheme='eco'
            
            
                cols={[
                  "Porte",
                  { qField: "=Num(Count([NUM_CNPJ]), '#.##0', ',', '.')", qLabel: "Empresas Ativas" }
       
                ]}
        />
        </Box>
      </Box>

      

    </Box>

    
  );
};

export default MainContent;
