import styled from 'styled-components';

const CommonContainerStyled = styled.div`

  display: flex;

`;

export default CommonContainerStyled;


export const HomeContainerStyled = styled(CommonContainerStyled)`

  flex-direction: column;
  justify-content: center;
  align-content: center;

`;

export const MainContainer = styled(CommonContainerStyled)`

  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border-radius: 10px;
  color: #ec8442;
  text-transform: uppercase;
  letter-spacing: 0.4rem;

`;

export const FormInputContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 20%;
  width: 100%;
  margin: 2rem 0 2rem 0;
`;



