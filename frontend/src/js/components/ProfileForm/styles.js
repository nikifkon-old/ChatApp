import styled from "styled-components";

export const StyledForm = styled.form`
  min-width: 80%;
  display: grid;
  grid-template-columns: 100px 1fr;
  grid-template-rows: repeat(4, auto);
  gap: 10px;

  & > label {
    place-self: center;
    text-align: center;
  }
`