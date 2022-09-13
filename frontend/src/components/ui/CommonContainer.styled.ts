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
  color: var(--MenuButtonColor);
  text-transform: uppercase;
  letter-spacing: 0.3rem;
  padding: 7rem 1rem;
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
