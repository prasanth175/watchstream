import styled from 'styled-components'

export const MainContainer = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`

export const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  box-shadow: 4px 8px 16px 0px black;
  padding: 20px;
`

export const FormContainer = styled.form`
  color: #0070c1;
  font-family: 'Roboto';
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  width: 300px;

  @media (max-width: 350px) {
    width: 100%;
    padding: 0px;
  }
`

export const Logo = styled.img`
  height: 30px;
  width: 130px;
`

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  background-color: transparent;
  border-radius: 3px;
  border: 1px solid #cccccc;
`

export const Label = styled.label`
  padding-bottom: 3px;
  font-weight: 500;
  font-family: 'Roboto';
  font-size: 10px;
  margin-top: 15px;
  color: grey;
`

export const CheckBox = styled.input`
  margin-bottom: 0px;
  cursor: pointer;
`

export const LoginButton = styled.button`
  background-color: #3b82f6;
  border-radius: 5px;
  padding: 8px 15px;
  margin-top: 20px;
  color: #ffffff;
`

export const NavBar = styled.div`
  background-color: ${props => (props.bgColor ? 'black' : 'white')};
`
